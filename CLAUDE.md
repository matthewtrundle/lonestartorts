# Tortilla Rodeo Co. - Project Architecture

## Project Overview
**Trail Boss Orchestrator**: Master agent maintaining project integrity and compliance

## Agent Workflow

### 1. Brand & Marketing Agent
- **Deliverables**: copy.yaml, launch.yaml
- **Responsibilities**: Product naming, taglines, marketing copy
- **Status**: In Progress

### 2. Web Design Agent
- **Deliverables**: ui-spec.yaml, component stubs
- **Responsibilities**: Layout, UI/UX, visual design
- **Status**: Pending

### 3. Full-Stack Agent
- **Deliverables**: Next.js application with Stripe integration
- **Responsibilities**: Implementation, technical architecture, order tracking
- **Status**: Pending

### 4. Compliance Agent
- **Deliverables**: Audit reports, code/copy diffs
- **Responsibilities**: Legal review, trademark checks, disclaimer placement
- **Status**: Pending

### 5. QA Agent
- **Deliverables**: Test reports, performance metrics
- **Responsibilities**: Testing protocols, quality checks
- **Status**: Pending

## Technical Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Stripe Checkout
- Prisma/KV
- Resend/Nodemailer

## Compliance Requirements
- **Mandatory Disclaimer**: "Independent reseller. Not affiliated with or endorsed by H-E-B®."
- **No H-E-B logos or trade dress**
- **Nominative fair use principles**
- **Proper storage labeling**

## Environment Configuration
```
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
DATABASE_URL=
RESEND_API_KEY=
ADMIN_TOKEN=
ALLOW_REFRIGERATED=false
```

## Image Generation Tool
**Path**: /Users/mattrundle/Documents/image-generator-tool
**API Key**: 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

## Project Status
- Project Initialized: ✓
- Shared Spec: Active
- Current Phase: Brand & Marketing