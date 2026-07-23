#!/usr/bin/env python3
"""Monthly P&L report for Lonestar Tortillas.

Merges three sources into one monthly table:
  1. Neon DB      — gross revenue (retail + wholesale), order counts, actual
                    shipping cost where recorded (Order.shippingCost).
  2. Mercury CSV  — cash reality: Stripe payouts landed, IO credit-card
                    autopay (aggregate expenses), owner draws (Venmo),
                    contractor payments, cashback.
  3. OpenAI Ads   — daily spend via api.ads.openai.com (needs
                    OPENAI_ADS_API_KEY in .env.local).

Usage:
  python3 scripts/pnl-report.py <mercury-transactions.csv>

Known gaps (see report footer):
  - IO card line items are NOT in the checking CSV; export the credit-card
    account from Mercury too for expense detail (ads, hosting, COGS).
  - Google Ads spend not pulled here (lives in google-ads.yaml tooling).
"""
import csv
import json
import os
import re
import subprocess
import sys
import urllib.request
from collections import defaultdict
from datetime import datetime

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def env(name):
    for f in ('.env.local', '.env'):
        p = os.path.join(REPO, f)
        if os.path.exists(p):
            for line in open(p):
                m = re.match(rf'^{name}=(.*)$', line.strip())
                if m:
                    return m.group(1).strip().strip('"')
    return os.environ.get(name)


def neon_monthly() -> dict:
    """month -> {orders, gross, ship_cost, ship_missing} from Neon via psql."""
    db = env('DATABASE_URL')
    if not db:
        sys.exit('DATABASE_URL not found in .env/.env.local')
    sql = """
    SELECT to_char("createdAt",'YYYY-MM'), COUNT(*),
           ROUND(SUM(total)/100.0,2),
           ROUND(SUM(COALESCE("shippingCost",0))/100.0,2),
           COUNT(*) FILTER (WHERE "shippingCost" IS NULL)
    FROM "Order" WHERE "paymentStatus"='SUCCEEDED' GROUP BY 1
    UNION ALL
    SELECT to_char("createdAt",'YYYY-MM'), COUNT(*),
           ROUND(SUM(total)/100.0,2), 0, 0
    FROM "WholesaleOrder" GROUP BY 1;
    """
    out = subprocess.run(['psql', db, '-t', '-A', '-F', '|', '-c', sql],
                         capture_output=True, text=True, check=True).stdout
    months: dict = defaultdict(lambda: dict(orders=0, gross=0.0, ship_cost=0.0, ship_missing=0))
    for line in out.strip().splitlines():
        mo, n, gross, ship, missing = line.split('|')
        m = months[mo]
        m['orders'] += int(n)
        m['gross'] += float(gross)
        m['ship_cost'] += float(ship)
        m['ship_missing'] += int(missing)
    return months


def bank_monthly(csv_path: str) -> dict:
    """month -> {payouts, card_pay, draws, contractor, cashback, other}."""
    months: dict = defaultdict(lambda: defaultdict(float))
    for r in csv.DictReader(open(csv_path)):
        if r['Status'] != 'Sent':
            continue
        mo = datetime.strptime(r['Date (UTC)'], '%m-%d-%Y').strftime('%Y-%m')
        amt = float(r['Amount'])
        d = r['Description'].upper()
        if 'LONESTAR TORTILL' in d:
            months[mo]['payouts'] += amt
        elif 'MERCURY CREDIT' in d:
            months[mo]['card_pay'] += amt
        elif 'CASHBACK' in d:
            months[mo]['cashback'] += amt
        elif 'VENMO' in d:
            months[mo]['draws'] += amt
        elif 'SAVINGS' in d or 'WELLS FARGO' in d or 'BANK OF AMERICA' in d:
            months[mo]['transfers'] += amt  # not P&L: internal/owner funding
        else:
            months[mo]['contractor'] += amt
    return months


def openai_ads_monthly() -> dict:
    """month -> ad spend ($) from the OpenAI Ads API; {} if no key."""
    key = env('OPENAI_ADS_API_KEY')
    if not key:
        return {}
    def get(path):
        req = urllib.request.Request(
            'https://api.ads.openai.com/v1' + path,
            headers={'Authorization': f'Bearer {key}',
                     'User-Agent': 'curl/8.4.0'})  # default urllib UA is blocked (403)
        return json.load(urllib.request.urlopen(req, timeout=20))

    end = datetime.now().strftime('%Y-%m-%d')
    months: dict = defaultdict(float)
    try:
        for c in get('/campaigns').get('data', []):
            rows = get(f"/campaigns/{c['id']}/insights?time_granularity=daily"
                       f"&start_date=2026-01-01&end_date={end}&fields[]=spend")
            for row in rows.get('data', []):
                day = datetime.fromtimestamp(row['start_time']).strftime('%Y-%m')
                months[day] += row.get('spend') or 0
    except Exception as e:  # ads spend is optional; report should still run
        print(f'(openai ads fetch failed: {e})', file=sys.stderr)
        return {}
    return months


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    neon = neon_monthly()
    bank = bank_monthly(sys.argv[1])
    oai = openai_ads_monthly()

    all_months = sorted(set(neon) | set(bank) | set(oai))
    cols = ('month', 'orders', 'gross_rev', 'payouts_in', 'card_out',
            'openai_ads', 'ship_cost', 'draws', 'net_cash')
    print(('{:<9}{:>7}{:>11}{:>12}{:>11}{:>11}{:>11}{:>9}{:>11}').format(*cols))
    tot = defaultdict(float)
    for mo in all_months:
        n, b = neon.get(mo, {}), bank.get(mo, {})
        gross = n.get('gross', 0)
        payouts = b.get('payouts', 0)
        card = b.get('card_pay', 0)
        ads = oai.get(mo, 0)
        ship = n.get('ship_cost', 0)
        draws = b.get('draws', 0)
        # Operating net cash: payouts minus card autopay (which already
        # contains ad/hosting/COGS charges). Draws shown but excluded.
        net = payouts + card + b.get('cashback', 0) + b.get('contractor', 0)
        for k, v in [('gross', gross), ('payouts', payouts), ('card', card),
                     ('ads', ads), ('ship', ship), ('draws', draws), ('net', net)]:
            tot[k] += v
        print(f"{mo:<9}{n.get('orders', 0):>7}{gross:>11,.2f}{payouts:>12,.2f}"
              f"{card:>11,.2f}{ads:>11,.2f}{ship:>11,.2f}{draws:>9,.2f}{net:>11,.2f}")
    print(f"{'TOTAL':<9}{'':>7}{tot['gross']:>11,.2f}{tot['payouts']:>12,.2f}"
          f"{tot['card']:>11,.2f}{tot['ads']:>11,.2f}{tot['ship']:>11,.2f}"
          f"{tot['draws']:>9,.2f}{tot['net']:>11,.2f}")

    ship_missing = sum(m.get('ship_missing', 0) for m in neon.values())
    print('\nNotes:')
    print(' - gross_rev = Neon order totals (retail SUCCEEDED + wholesale).')
    print(' - payouts_in = Stripe payouts landed in checking (net of Stripe fees, lags ~2 days).')
    print(' - card_out = IO credit-card autopay TOTAL; line items (Google Ads, hosting,')
    print('   H-E-B/COGS) need the credit-card account CSV from Mercury.')
    print(' - net_cash = payouts + card autopay + cashback + contractor (owner draws and')
    print('   internal/owner transfers excluded).')
    if ship_missing:
        print(f' - WARNING: {ship_missing} orders have no Order.shippingCost recorded '
              '(import stopped ~May 2026) — real margin is overstated.')


if __name__ == '__main__':
    main()
