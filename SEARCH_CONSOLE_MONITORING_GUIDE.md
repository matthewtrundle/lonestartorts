# Google Search Console Monitoring Guide
## Lone Star Tortillas - SEO Health Tracking

**Status:** ✅ Setup Guide Complete | ⏳ Implementation Needed
**Priority:** High (Task #8, Phase 2)
**Project ID:** `1946cb18-b2ab-4a21-a4c5-595ce894b3e7`

---

## 🎯 Overview

This guide provides step-by-step instructions for setting up comprehensive Google Search Console (GSC) monitoring to track SEO health, detect issues proactively, and identify optimization opportunities.

### Why This Matters

- **Proactive Issue Detection:** Get notified immediately when Google encounters problems
- **Performance Tracking:** Monitor how canonical tag fixes impact indexation and traffic
- **Data-Driven Decisions:** Use real metrics to prioritize future SEO work
- **Baseline Comparison:** Track progress against initial metrics post-Phase 1 deployment

---

## 📋 Pre-Requisites

- [ ] Website deployed with Phase 1 canonical tag fixes
- [ ] Google Search Console account with verified ownership of lonestartortillas.com
- [ ] Sitemap submitted: `https://lonestartortillas.com/sitemap.xml`
- [ ] At least 7 days of post-deployment data for baseline metrics

---

## 🔔 Step 1: Configure Email Alerts

### Access Alert Settings

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `lonestartortillas.com`
3. Click **Settings** (gear icon in left sidebar)
4. Navigate to **Users and permissions**
5. Verify your email is listed

### Enable Critical Alerts

Google Search Console automatically sends email alerts for:

#### ✅ Automatically Enabled
- **Coverage Issues:** When Google can't index pages
- **Manual Actions:** Penalties or violations detected
- **Security Issues:** Hacking, malware, or phishing detected
- **Site-wide Issues:** Major problems affecting multiple pages

#### 📧 What to Expect
- **Frequency:** Immediate for critical issues, weekly summaries for minor issues
- **Recipients:** All verified owners and users with Full permission
- **Action Required:** Review and fix issues within 7-30 days

### Additional Alert Setup (Optional)

For more granular monitoring, consider:

1. **Third-Party Tools:**
   - [Google Analytics Alerts](https://analytics.google.com) - Traffic drops
   - [Ahrefs Alerts](https://ahrefs.com) - Keyword ranking changes
   - [SEMrush Position Tracking](https://semrush.com) - Daily rank tracking

2. **Custom Monitoring:**
   - Set up weekly calendar reminders to check GSC manually
   - Use Google Sheets automation to pull GSC API data

---

## 📊 Step 2: Weekly Reporting Procedures

### Every Monday Morning (15-20 minutes)

#### Report #1: Indexation Status

**Location:** GSC → Pages → Indexed

**Metrics to Track:**
- Total indexed pages (Target: 43 pages)
- Pages not indexed (Goal: 0 orphaned pages)
- Pages with issues (Fix immediately)

**Actions:**
1. Screenshot the "Page indexing" graph
2. Note any sudden drops or increases
3. Click "Not indexed" tab to review any blocked pages
4. If any pages are blocked, investigate and fix within 48 hours

**Expected Baseline (Post-Phase 1):**
- Week 1: ~14-20 indexed pages (gradual increase)
- Week 2: ~25-35 indexed pages
- Week 3-4: ~40-43 indexed pages (target reached)

---

#### Report #2: Top Queries

**Location:** GSC → Performance → Queries

**Metrics to Track:**
- Top 10 performing queries
- Queries with impressions but low CTR (<2%)
- New queries entering top 20
- Position changes for target keywords

**Target Keywords to Monitor:**
```
H-E-B tortillas
H-E-B tortillas delivered
authentic Texas tortillas
corn tortillas online
flour tortillas delivery
breakfast tacos recipe
how to store tortillas
tortilla delivery nationwide
buy H-E-B tortillas online
Texas tortilla brands
```

**Actions:**
1. Export queries data (last 28 days comparison)
2. Identify queries ranking 11-20 (quick win opportunities)
3. Identify queries with good impressions but low CTR (title/description optimization)
4. Note any branded queries for reputation monitoring

---

#### Report #3: Top Pages

**Location:** GSC → Performance → Pages

**Metrics to Track:**
- Top 10 pages by clicks
- Top 10 pages by impressions
- Pages with high impressions but low clicks (<5% CTR)
- New pages entering top 20

**Actions:**
1. Identify best-performing content types (recipes, guides, products, city pages)
2. Look for outliers with excellent CTR to replicate success
3. Identify pages with traffic potential but poor CTR (need title/description optimization)
4. Find pages with zero clicks despite impressions (broken or poor UX)

---

#### Report #4: CTR & Position Trends

**Location:** GSC → Performance → Date range comparison

**Metrics to Track:**
- Average CTR (Target: 3-5% for informational, 5-10% for commercial)
- Average Position (Target: Improve 2-3 positions per month for key queries)
- Total Impressions trend (Target: +20% month-over-month)
- Total Clicks trend (Target: +15% month-over-month)

**Actions:**
1. Compare last 7 days vs previous 7 days
2. Compare last 28 days vs previous 28 days
3. Note significant changes (>20% increases/decreases)
4. Correlate changes with any deployments or SEO changes

---

#### Report #5: Mobile Usability

**Location:** GSC → Mobile Usability

**Metrics to Track:**
- Total mobile-friendly pages (Target: 100%)
- Pages with mobile usability errors
- Clickable elements too close together
- Text too small to read
- Content wider than screen

**Actions:**
1. Check for any new mobile usability errors
2. Test reported pages on actual mobile devices
3. Fix errors within 7 days
4. Retest using Google's Mobile-Friendly Test tool

---

## 📈 Step 3: Performance Benchmarks & Tracking

### Establish Baseline Metrics (Week 1 Post-Deployment)

**Immediately After Phase 1 Deployment:**

Create a Google Sheet or document with these baseline numbers:

#### Indexation Baseline
- Date: _________
- Total Pages: 43
- Indexed Pages: _________
- Not Indexed: _________
- Pages with Warnings: _________

#### Traffic Baseline (28-day period)
- Total Impressions: _________
- Total Clicks: _________
- Average CTR: _________%
- Average Position: _________
- Top Query: _________
- Top Page: _________

#### Coverage Baseline
- Valid Pages: _________
- Excluded Pages: _________
- Error Pages: _________
- Warning Pages: _________

---

### Monthly Performance Goals

Based on canonical tag fixes and ongoing optimization:

| Metric | Month 1 | Month 2 | Month 3 | Month 6 |
|--------|---------|---------|---------|---------|
| Indexed Pages | 40-43 | 43 | 43 | 43+ |
| Total Impressions | +30% | +50% | +100% | +300% |
| Total Clicks | +20% | +40% | +75% | +250% |
| Average CTR | 3-4% | 4-5% | 5-6% | 6-8% |
| Avg Position | 25-30 | 20-25 | 15-20 | 10-15 |
| Top 3 Rankings | 5 keywords | 10 keywords | 15 keywords | 30 keywords |

---

## 📊 Step 4: Dashboard & Metrics Tracking

### Option A: Google Sheets Dashboard (Recommended)

**Template Structure:**

#### Sheet 1: Weekly Metrics
```
| Date | Indexed Pages | Impressions | Clicks | CTR | Avg Position | Notes |
|------|---------------|-------------|--------|-----|--------------|-------|
| 2025-11-04 | 14 | 245 | 12 | 4.9% | 32.5 | Baseline pre-fix |
| 2025-11-11 | 23 | 512 | 28 | 5.5% | 28.2 | Week 1 post-fix |
| 2025-11-18 | 35 | 845 | 52 | 6.2% | 24.8 | Week 2 post-fix |
```

#### Sheet 2: Top Keywords Tracking
```
| Keyword | Week 1 Pos | Week 2 Pos | Week 3 Pos | Change | Impressions | Clicks |
|---------|------------|------------|------------|--------|-------------|--------|
| H-E-B tortillas | 15 | 12 | 10 | ↑5 | 1,234 | 89 |
| breakfast tacos recipe | 22 | 18 | 15 | ↑7 | 892 | 54 |
```

#### Sheet 3: Page Performance
```
| Page | Type | Impressions | Clicks | CTR | Avg Position | Action |
|------|------|-------------|--------|-----|--------------|--------|
| /recipes/breakfast-tacos | Recipe | 2,345 | 156 | 6.7% | 12.3 | Optimize title |
| /guides/how-to-store-tortillas | Guide | 1,876 | 98 | 5.2% | 18.5 | Add more content |
```

**Setup Instructions:**

1. Create new Google Sheet: "Lone Star Tortillas - SEO Metrics"
2. Copy template structure above
3. Set up weekly calendar reminder: "Update SEO Dashboard"
4. Manually enter data from GSC every Monday
5. Add charts for visual trends:
   - Line chart: Indexed Pages over time
   - Line chart: Clicks & Impressions over time
   - Line chart: Average Position over time

---

### Option B: Google Data Studio (Advanced)

For automatic updates from GSC API:

1. Go to [Google Data Studio](https://datastudio.google.com)
2. Create new report: "Lone Star Tortillas SEO"
3. Add data source: Google Search Console
4. Select property: lonestartortillas.com
5. Create dashboards:
   - **Overview:** Total clicks, impressions, CTR, position
   - **Queries:** Top queries table with trends
   - **Pages:** Top pages table with trends
   - **Coverage:** Indexed pages over time
6. Schedule email delivery: Weekly on Monday mornings

---

### Option C: Third-Party Tools

Consider these tools for enhanced monitoring:

#### Free/Freemium
- **Google Analytics 4** - Traffic and engagement metrics
- **Google Search Console Insights** - Content performance highlights
- **Bing Webmaster Tools** - Secondary search engine monitoring

#### Paid (Optional)
- **Ahrefs ($99/mo)** - Comprehensive SEO metrics, rank tracking
- **SEMrush ($119/mo)** - Position tracking, competitor analysis
- **Moz Pro ($99/mo)** - Rank tracking, site audits
- **Screaming Frog (£149/yr)** - Technical SEO audits

---

## 🚨 Alert Thresholds & Action Items

### Critical Issues (Fix Within 24 Hours)

#### Security Issues
- **Alert:** "Security issue detected"
- **Impact:** Site may be de-indexed or flagged as unsafe
- **Action:**
  1. Check GSC → Security & Manual Actions
  2. Identify compromised pages or malware
  3. Remove malicious content immediately
  4. Request reconsideration in GSC
  5. Strengthen server security

#### Manual Actions
- **Alert:** "Manual action issued"
- **Impact:** Pages or entire site may be penalized
- **Action:**
  1. Review manual action details in GSC
  2. Fix violations (thin content, unnatural links, etc.)
  3. Document fixes
  4. Submit reconsideration request
  5. Wait 2-4 weeks for Google review

---

### High Priority Issues (Fix Within 48 Hours)

#### Coverage Errors
- **Alert:** "Coverage error detected"
- **Impact:** Pages can't be indexed
- **Examples:**
  - Server error (5xx)
  - Not found (404)
  - Redirect error
  - Blocked by robots.txt
- **Action:**
  1. Review error details in GSC → Pages → Not indexed
  2. Test affected URLs with URL Inspection tool
  3. Fix technical issues (broken links, server config)
  4. Request re-indexing once fixed

#### Sudden Traffic Drop
- **Threshold:** >30% drop in clicks week-over-week
- **Possible Causes:**
  - Algorithm update
  - Technical issue (downtime, broken pages)
  - Competitor ranking improvements
  - Seasonal trend
- **Action:**
  1. Check Google Algorithm Update History
  2. Review GSC for coverage errors
  3. Check server uptime logs
  4. Analyze which queries/pages dropped
  5. Investigate and address root cause

---

### Medium Priority Issues (Fix Within 7 Days)

#### Mobile Usability Errors
- **Impact:** Poor mobile search rankings
- **Action:**
  1. Test pages on actual mobile devices
  2. Fix responsive design issues
  3. Ensure tap targets are adequate size
  4. Validate with Mobile-Friendly Test tool

#### Pages with Warnings
- **Examples:**
  - Indexed, though blocked by robots.txt
  - Duplicate without user-selected canonical
  - Crawled - currently not indexed
- **Action:**
  1. Review each warning case-by-case
  2. Fix technical issues or content quality
  3. Monitor for indexation improvement

#### Low CTR Pages
- **Threshold:** CTR <2% with >100 impressions
- **Action:**
  1. Analyze current title and meta description
  2. Research competitor SERP snippets
  3. Rewrite title with better hooks and keywords
  4. Add compelling meta descriptions
  5. Monitor CTR improvement over 2-4 weeks

---

## 📅 Recommended Schedule

### Daily (2 minutes)
- ☐ Check GSC notifications in email

### Weekly (20 minutes)
- ☐ Monday: Update metrics dashboard
- ☐ Monday: Review top 5 queries and pages
- ☐ Wednesday: Check for new coverage errors
- ☐ Friday: Quick CTR/position trend review

### Monthly (60 minutes)
- ☐ Week 1: Deep dive into query performance
- ☐ Week 2: Page-level analysis and optimization planning
- ☐ Week 3: Competitor SERP analysis for target keywords
- ☐ Week 4: Full month report and strategy adjustment

### Quarterly (2-3 hours)
- ☐ Comprehensive content audit
- ☐ Technical SEO audit (site speed, mobile usability, structured data)
- ☐ Backlink profile review
- ☐ Competitor content gap analysis
- ☐ SEO roadmap for next quarter

---

## 🎯 Key Metrics Summary

### Track These Weekly

| Metric | Description | Target | Priority |
|--------|-------------|--------|----------|
| **Indexed Pages** | Total pages in Google index | 43/43 | Critical |
| **Coverage Errors** | Pages with indexation problems | 0 | Critical |
| **Total Impressions** | How many times site appears in search | +20% MoM | High |
| **Total Clicks** | Actual visits from search | +15% MoM | High |
| **Average CTR** | % of impressions that become clicks | 5-8% | High |
| **Average Position** | Average ranking across all queries | <15 | Medium |
| **Top Queries** | Monitor 10 target keywords | Top 10 | Medium |
| **Mobile Errors** | Mobile usability issues | 0 | Medium |

---

## 🔍 How to Interpret Common GSC Data

### Understanding Coverage Status

**✅ Indexed (Valid)**
- **What it means:** Page is successfully in Google's index
- **Action:** None - page is healthy

**⚠️ Valid with Warnings**
- **What it means:** Page is indexed but has minor issues
- **Common warning:** "Indexed, though blocked by robots.txt"
- **Action:** Review case-by-case, fix if needed

**❌ Error**
- **What it means:** Page cannot be indexed due to serious issue
- **Common errors:** Server error (5xx), Not found (404), Redirect error
- **Action:** Fix immediately

**🚫 Excluded**
- **What it means:** Page is intentionally not indexed
- **Common reasons:** Duplicate content, noindex tag, canonicalized to another page
- **Action:** Review to ensure exclusions are intentional

---

### Understanding Performance Metrics

**Impressions**
- **What it means:** Times your URL appeared in search results
- **Good trend:** Steady increase after canonical fixes
- **Bad trend:** Sudden drop (investigate immediately)

**Clicks**
- **What it means:** Actual visits from Google search
- **Formula:** Clicks = Impressions × CTR
- **Optimize:** Improve CTR with better titles/descriptions

**CTR (Click-Through Rate)**
- **What it means:** % of impressions that result in clicks
- **Average:** 3-5% for informational content
- **Excellent:** >8% for branded/commercial queries
- **Low (<2%):** Title/description needs optimization

**Position**
- **What it means:** Average ranking across all queries
- **Top 3:** Positions 1-3 (get ~50% of all clicks)
- **Page 1:** Positions 1-10 (get ~90% of all clicks)
- **Page 2+:** Position 11+ (very low click volume)

---

## 🚀 Next Steps After Setup

1. **Week 1:** Establish baseline metrics in your dashboard
2. **Week 2-4:** Monitor indexation improvements post-canonical fixes
3. **Week 4:** Review first month's data and identify quick wins
4. **Month 2:** Begin optimization of low-CTR pages
5. **Month 3:** Start content expansion for high-potential queries
6. **Ongoing:** Maintain weekly monitoring and monthly optimization

---

## 📞 Support & Resources

### Google Resources
- **GSC Help Center:** https://support.google.com/webmasters
- **SEO Starter Guide:** https://developers.google.com/search/docs/beginner/seo-starter-guide
- **Search Central Blog:** https://developers.google.com/search/blog

### Community Resources
- **r/SEO (Reddit):** https://reddit.com/r/SEO
- **Search Engine Journal:** https://searchenginejournal.com
- **Moz Blog:** https://moz.com/blog

### Emergency Contacts
- **Google Search Console Support:** Available through GSC interface
- **Google My Business Support:** For local listing issues
- **Webmaster Forums:** https://support.google.com/webmasters/community

---

## ✅ Implementation Checklist

### Phase 1: Initial Setup (15 minutes)
- [ ] Verify GSC ownership and email alerts are enabled
- [ ] Set up Google Sheets dashboard with template structure
- [ ] Record baseline metrics (post-Phase 1 deployment)
- [ ] Set weekly calendar reminder for Monday morning check-ins

### Phase 2: Ongoing Monitoring (Weekly)
- [ ] Update dashboard with current week's data
- [ ] Review top queries and pages
- [ ] Check for coverage errors
- [ ] Respond to any email alerts

### Phase 3: Monthly Optimization (Monthly)
- [ ] Analyze month-over-month trends
- [ ] Identify optimization opportunities
- [ ] Implement title/description improvements
- [ ] Plan content additions based on query data

---

**Generated:** 2025-11-04
**Task #8 Status:** Implementation Guide Complete
**Next Action:** Set up monitoring within 48 hours of Phase 1 deployment
**Expected Baseline Date:** 2025-11-11 (1 week post-deployment)
