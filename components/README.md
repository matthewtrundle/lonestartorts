# Component Architecture

## Directory Structure

### `/ui`
Base UI components from shadcn/ui and custom primitives
- Button
- Badge
- Alert
- Card
- Input
- Label

### `/layout`
Page layout components
- Header
- Footer
- Navigation
- MobileMenu
- DisclaimerBanner

### `/product`
Product-specific components
- ProductCard
- ProductGrid
- ProductDetail
- StorageBadge
- PriceDisplay

### `/common`
Shared/utility components
- SEO
- Loading
- ErrorBoundary
- Analytics

## Component Standards

1. All components use TypeScript
2. Props interfaces defined for each
3. Accessibility attributes required
4. Mobile-first responsive design
5. Framer Motion for animations where specified

## Compliance Requirements

Every customer-facing component must:
1. Never display H-E-B logos or trade dress
2. Include disclaimer where appropriate
3. Use approved brand voice in copy
4. Follow the ui-spec.yaml design system