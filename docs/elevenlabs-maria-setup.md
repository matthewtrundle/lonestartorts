# ElevenLabs "Talk to Maria" Chat Widget Setup

This guide covers setting up the ElevenLabs Conversational AI widget that powers the floating "Talk to Maria" chat bubble on the website.

## Prerequisites

- ElevenLabs account (https://elevenlabs.io)
- Access to the Lonestar Tortillas Vercel project for env vars

---

## Step 1: Create Agent on ElevenLabs Dashboard

1. Log into [ElevenLabs](https://elevenlabs.io) → **Conversational AI** → **Create Agent**
2. Configure:
   - **Name**: Maria - Lonestar Tortillas
   - **Voice**: Select a warm, friendly female voice (Southern/Texas accent preferred)
   - **Language**: English (with Spanish support if available)

---

## Step 2: System Prompt

Use the same persona as the RetellAI phone agent (see `docs/retellai-mariah-setup.md` Phase 3). Adapt for web chat:

```
You are Maria, a friendly customer service representative for Lonestar Tortillas.

PERSONALITY:
- Warm, welcoming Texas hospitality
- Greet with "Howdy!"
- Enthusiastic about tortillas and Texas food
- Patient and helpful
- Casual but professional

CAPABILITIES:
1. Answer product questions (types, prices, uses)
2. Explain shipping (Tuesday-only, free, 2-3 days)
3. Help with order inquiries
4. Direct customers to lonestartortillas.com/shop to place orders
5. Collect email addresses for follow-up

INFORMATION TO COLLECT:
- Customer name
- Email address (for order updates or follow-up)
- Order number (if inquiring about existing order)

ESCALATION:
When unable to help, collect:
- Customer name
- Email address
- Brief description of their issue
Then say: "I've noted your information and someone from our team will reach out to you shortly."

ALWAYS MENTION:
- We ship Tuesdays only for freshness
- Free shipping on orders $80+ (flat $12.99 under $80)
- Visit lonestartortillas.com/shop to order

NEVER:
- Make up information
- Promise specific delivery dates
- Process payments
- Share internal business info
- Claim to be affiliated with H-E-B
```

---

## Step 3: Knowledge Base

Upload the same content used for the RetellAI agent:

1. **Product Catalog** — see `docs/retellai-mariah-setup.md` Section 2.2
2. **Shipping Policy** — see `docs/retellai-mariah-setup.md` Section 2.3
3. **FAQs** — see `docs/retellai-mariah-setup.md` Section 2.4

---

## Step 4: Security — Widget Allowlist

1. Go to **Agent Settings** → **Security**
2. Add allowed origins:
   - `https://lonestartortillas.com`
   - `https://www.lonestartortillas.com`
   - `http://localhost:3000` (for development)

---

## Step 5: Copy Agent ID to Environment

1. In the ElevenLabs dashboard, find the **Agent ID** on the agent's settings page
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_ELEVENLABS_AGENT_ID=<your-agent-id>
   ```
3. Add to Vercel environment variables for production

---

## How It Works in the Codebase

- **Widget component**: `components/chat/MariaWidget.tsx` — client component that loads the ElevenLabs `convai-widget-embed` script and renders the `<elevenlabs-convai>` web component
- **Layout integration**: `app/layout.tsx` — dynamically imports `MariaWidget` (SSR disabled), rendered outside the provider tree
- **CSP headers**: `next.config.js` — allows `unpkg.com`, `cdn.jsdelivr.net` (scripts), `*.elevenlabs.io` (WebSocket + frames), `api.elevenlabs.io` (API)

The widget only renders when `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is set — safe to deploy without the env var configured.

---

## Cost Estimate

| Item | Cost |
|------|------|
| Conversational AI | Usage-based (~$0.01-0.05/interaction) |
| Voice synthesis | Included in Conversational AI plan |
| **Estimated monthly** | **$10-30** (light usage) |

---

## Support

- ElevenLabs docs: https://elevenlabs.io/docs
- Lonestar Tortillas config: howdy@lonestartortillas.com
