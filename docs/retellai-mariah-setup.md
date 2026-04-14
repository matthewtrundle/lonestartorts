# RetellAI "Mariah" Agent Setup Guide

This guide covers the complete setup of the Mariah voice/SMS agent on the RetellAI platform.

## Prerequisites

- RetellAI account with API key
- Phone number (purchase through RetellAI or bring your own)

---

## Phase 1: Agent Creation

### 1.1 Create New Agent

1. Log into [RetellAI Dashboard](https://dashboard.retellai.com)
2. Navigate to **Agents** → **Create Agent**
3. Configure:
   - **Name**: Mariah
   - **Type**: Voice + SMS (combined)
   - **Voice**: Select a warm, friendly female voice
   - **Operating Hours**: 24/7

### 1.2 Voice Settings

- **Voice Style**: Warm, conversational
- **Speech Rate**: Normal to slightly slower (conveys friendliness)
- **Pitch**: Natural female range
- **Accent**: Southern/Texas if available, otherwise neutral American

---

## Phase 2: Knowledge Base

### 2.1 Create Knowledge Base

1. Go to **Knowledge Bases** → **Create**
2. Name: **Lonestar Tortillas**
3. Method: **Manual Content Upload**

### 2.2 Upload Product Catalog

Create a document with this content:

```
# LONESTAR TORTILLAS - PRODUCT CATALOG

## TORTILLAS

| Product | Pack Size | Price |
|---------|-----------|-------|
| H-E-B Bakery Flour Tortillas | 20 pack | $20 |
| H-E-B Bakery Butter Tortillas | 20 pack | $20 |
| H-E-B White Corn Tortillas Texas Size | 80 pack | $13 |
| H-E-B Street Taco White Corn | 24 pack | $6 |
| H-E-B Fajita Flour Tortillas | 20 pack | $10 |
| H-E-B Burrito Grande | 10 pack, extra-large | $10 |
| H-E-B Mi Tienda Street Taco Flour | 50 pack | $18 |
| H-E-B Homestyle Flour Tortillas | 20 pack | $12 |
| H-E-B Whole Wheat Tortillas | 12 pack | $9 |
| H-E-B Mixla Corn & Flour Blend | 24 pack | $15 |

## SAUCES & SALSAS

| Product | Price |
|---------|-------|
| H-E-B That Green Sauce | $12 |
| H-E-B That Red Sauce | $12 |
| H-E-B That Green Sauce Mild | $12 |
| H-E-B Restaurant Salsa Mild | $10 |
| H-E-B Restaurant Salsa Medium | $10 |
| H-E-B Restaurant Salsa Hot | $10 |

## SEASONINGS

| Product | Price |
|---------|-------|
| H-E-B Fajita Seasoning | $8 |
| H-E-B Taco Seasoning | $8 |
| H-E-B Texas Brisket Rub | $10 |
| H-E-B Texas BBQ Sauce | $10 |
| Terry Black's BBQ Sauce | $12 |
```

### 2.3 Upload Shipping Policy

```
# SHIPPING POLICY

## Key Points
- FREE shipping on orders $80+ (flat $12.99 under $80)
- Ships TUESDAYS ONLY (Freshness First program)
- Cutoff: 2 PM Central Time for same-day Tuesday shipping
- Orders placed after Tuesday 2 PM ship the following Tuesday

## Delivery Times
- Continental US: 2-3 business days
- Alaska/Hawaii: 4-7 business days
- All orders receive USPS tracking via email

## Product Storage
- No refrigeration needed during shipping
- Tortillas are shelf-stable
- Last 30+ days unopened at room temperature
- Can freeze for 6-8 months
```

### 2.4 Upload FAQs

```
# FREQUENTLY ASKED QUESTIONS

Q: Are these real H-E-B tortillas?
A: Yes! 100% authentic H-E-B brand tortillas, same products sold in Texas H-E-B stores.

Q: Are you affiliated with H-E-B?
A: No, we're an independent reseller. We source authentic H-E-B products to ship nationwide.

Q: Why Tuesdays only?
A: Freshness First! We ship Tuesdays so tortillas don't sit in warehouses over weekends.

Q: How long do they last?
A: 30+ days unopened at room temperature. Can freeze for 6-8 months.

Q: What is your return policy?
A: Full refund or replacement within 7 days. No return shipping required.

Q: What is your website?
A: lonestartortillas.com

Q: What is your email?
A: howdy@lonestartortillas.com

Q: Do you offer wholesale?
A: Yes! Contact us at howdy@lonestartortillas.com for bulk pricing.

Q: What payment methods do you accept?
A: We accept all major credit cards through secure Stripe checkout.

Q: Can I track my order?
A: Yes, you'll receive USPS tracking via email after your order ships.
```

---

## Phase 3: System Prompt Configuration

### 3.1 Main System Prompt

Copy this into the agent's system prompt:

```
You are Mariah, a friendly customer service representative for Lonestar Tortillas.

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
4. Collect email addresses for follow-up
5. Transfer to human support when needed

INFORMATION TO COLLECT:
- Customer name
- Email address (for order updates or follow-up)
- Order number (if inquiring about existing order)

ESCALATION (Capture Info for Follow-up):
When unable to help, collect:
- Customer name
- Email address OR phone number
- Brief description of their issue
Then say: "I've noted your information and someone from our team will reach out to you shortly."

Escalation triggers:
- Complaints or upset customers
- Complex order issues
- Wholesale/bulk inquiries (after collecting contact info)
- Requests for manager
- Questions you cannot answer

ALWAYS MENTION:
- We ship Tuesdays only for freshness
- Free shipping on orders $80+ (flat $12.99 under $80)
- Visit lonestartortillas.com to order

NEVER:
- Make up information
- Promise specific delivery dates
- Process payments
- Share internal business info
- Claim to be affiliated with H-E-B
```

### 3.2 Configure Variable Collection

Set up these variables to collect during calls:

| Variable Name | Type | Description |
|---------------|------|-------------|
| customer_name | string | Customer's name |
| email | string | Email address |
| phone | string | Phone number (if provided) |
| order_number | string | Order number (if inquiry) |
| inquiry_type | enum | product_question, shipping, order_status, complaint, wholesale, other |
| issue_description | string | Brief summary of their question/issue |

---

## Phase 4: Sample Conversation Flows

### Greeting
```
"Howdy! Thanks for calling Lonestar Tortillas. This is Mariah. How can I help you today?"
```

### Product Inquiry
```
"We've got the best tortillas this side of the Pecos! Our most popular are the H-E-B Bakery Flour Tortillas - a 20-pack for just $20. Are you looking for flour, corn, or maybe our famous butter tortillas?"
```

### Shipping Question
```
"Great question! We ship on Tuesdays only - that's our Freshness First program. Order before 2 PM Central on Tuesday to ship same day. Delivery is usually 2-3 business days from there. Shipping is FREE on orders $80 and up - orders under $80 ship for a flat $12.99."
```

### Email Collection
```
"I'd be happy to help! Can I get your email address so we can follow up with you?"
```

### Escalation (Capture for Follow-up)
```
"I want to make sure you get the help you need. Can I get your email address or phone number so someone from our team can follow up with you?"

[After collecting info]

"Great, I've noted that down along with your question about [issue]. Someone will be in touch shortly!"
```

### Closing
```
"Is there anything else I can help you with today? ... Thanks so much for calling Lonestar Tortillas! Have a great day, and remember to visit lonestartortillas.com to place your order!"
```

---

## Phase 5: Phone Number Assignment

1. Go to **Phone Numbers** in RetellAI dashboard
2. Either:
   - Purchase a new number (recommended: Texas area code like 512, 737, 210)
   - Import your own number via carrier
3. Assign the "Mariah" agent to the phone number
4. Test with a call

**After obtaining the phone number, update:**
- `components/layout/Footer.tsx`
- `app/contact/page.tsx`

Replace `YOUR_PHONE_NUMBER` placeholders with the actual number.

---

## Phase 6: Webhook Configuration (Optional)

If you want to capture call data in your orchestration platform:

### 6.1 Configure Webhook URL

1. Go to **Agent Settings** → **Webhooks**
2. Set webhook URL to your endpoint
3. Select events:
   - `call_ended`
   - `call_analyzed`

### 6.2 Expected Webhook Payload

```json
{
  "event": "call_ended",
  "call_id": "abc123",
  "agent_id": "mariah-agent",
  "duration_seconds": 180,
  "call_type": "inbound",
  "collected_data": {
    "customer_name": "John Smith",
    "email": "john@example.com",
    "phone": "+15125551234",
    "inquiry_type": "product_question",
    "issue_description": "Asked about butter tortillas and shipping"
  },
  "summary": "Customer asked about butter tortillas and shipping. Collected email for follow-up.",
  "transcript": "..."
}
```

### 6.3 Alternative: Email Notifications

If you don't need webhooks, enable email summaries:
1. Go to **Agent Settings** → **Notifications**
2. Enable **Email Summary After Each Call**
3. Enter email: howdy@lonestartortillas.com

---

## Phase 7: Testing Checklist

Before going live, test these scenarios:

- [ ] Call the number and verify "Howdy!" greeting
- [ ] Ask about product prices - verify accurate responses
- [ ] Ask about shipping - verify "Tuesday-only" and "free shipping" mentioned
- [ ] Provide your email - verify agent collects it correctly
- [ ] Ask a complex question - verify agent captures info for follow-up
- [ ] End the call - verify webhook fires (if configured)
- [ ] Send an SMS - verify appropriate response

---

## Cost Estimate

| Item | Cost |
|------|------|
| Phone number | ~$2/month |
| Voice minutes | ~$0.07-0.12/min |
| Knowledge base | Free (first 10) |
| **Estimated monthly** | **$20-50** (light usage) |

---

## Support

For RetellAI platform issues: support@retellai.com
For Lonestar Tortillas configuration: howdy@lonestartortillas.com
