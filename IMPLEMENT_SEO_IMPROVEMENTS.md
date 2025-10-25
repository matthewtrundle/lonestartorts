# SEO Improvements Implementation Guide

This guide provides step-by-step instructions to implement the top priority SEO improvements identified in the SEO audit.

---

## Quick Win #1: Add "Last Updated" Component to All Pages

### Status: ✅ Component Created

A reusable `LastUpdated` component has been created at `components/seo/LastUpdated.tsx`.

### How to Use

Add to any guide or blog page:

```typescript
import { LastUpdated } from '@/components/seo/LastUpdated';

export default function YourPage() {
  return (
    <article>
      {/* After hero image, before content */}
      <LastUpdated date="2025-10-25" />

      {/* Your content here */}
    </article>
  );
}
```

### Update Article Schema

Update the `dateModified` field to match:

```typescript
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Your Article Title',
  datePublished: '2025-10-24',
  dateModified: '2025-10-25', // ← Keep this current!
};
```

### Pages to Update (Priority Order)

#### High Traffic Guides:
1. `/guides/best-tortillas-for-every-dish` - Add `<LastUpdated date="2025-10-25" />`
2. `/guides/how-to-reheat-tortillas` - Add `<LastUpdated date="2025-10-25" />`
3. `/guides/corn-vs-flour-tortillas` - Add `<LastUpdated date="2025-10-25" />`
4. `/guides/how-to-store-tortillas` - Add `<LastUpdated date="2025-10-25" />`
5. `/guides/how-to-make-tortillas` - Add `<LastUpdated date="2025-10-25" />`

#### All Other Guides:
6. `/guides/gluten-free-tortillas`
7. `/guides/homemade-vs-store-bought`
8. `/guides/how-to-crisp-tortillas`
9. `/guides/how-to-freeze-tortillas`
10. `/guides/tortilla-nutrition`
11. `/guides/tortilla-sizes`

#### Blog Posts:
12. `/blog/marias-story`
13. `/blog/nixtamalization-science`
14. `/blog/texas-tortilla-traditions`

### Example Implementation

**Before:**
```typescript
export default function BestTortillasPage() {
  return (
    <>
      {/* schemas */}
      <div className="min-h-screen">
        <header>...</header>
        <section>{/* Hero Image */}</section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8">
            {/* Quick Reference content */}
          </div>
          {/* Rest of content */}
        </article>
      </div>
    </>
  );
}
```

**After:**
```typescript
import { LastUpdated } from '@/components/seo/LastUpdated';

export default function BestTortillasPage() {
  return (
    <>
      {/* schemas */}
      <div className="min-h-screen">
        <header>...</header>
        <section>{/* Hero Image */}</section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Add LastUpdated component */}
          <LastUpdated date="2025-10-25" />

          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8">
            {/* Quick Reference content */}
          </div>
          {/* Rest of content */}
        </article>
      </div>
    </>
  );
}
```

---

## Quick Win #2: Add Direct Answers After Headings

### Pattern for LLM Optimization

Add a direct, concise answer immediately after each major heading.

**Before:**
```markdown
## How Long Do Tortillas Last?

Proper storage is key to maintaining freshness. Different types of tortillas
have varying shelf lives depending on ingredients and packaging...

[continues with detailed explanation]
```

**After:**
```markdown
## How Long Do Tortillas Last?

**Shelf-stable tortillas last 30+ days unopened, 7-10 days after opening.**
Refrigerated tortillas last 2-4 weeks unopened, 5-7 days after opening.
Frozen tortillas last up to 6 months.

Proper storage is key to maintaining freshness. Different types of tortillas
have varying shelf lives depending on ingredients and packaging...

[continues with detailed explanation]
```

### Implementation Pattern

Use this JSX pattern:

```tsx
<section>
  <h2 className="text-3xl font-bold mb-4">How Long Do Tortillas Last?</h2>

  {/* Direct Answer Box */}
  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
    <p className="text-lg font-semibold text-charcoal-900">
      Quick Answer: Shelf-stable tortillas last 30+ days unopened, 7-10 days after opening.
    </p>
    <ul className="mt-2 text-charcoal-800 space-y-1">
      <li>• Refrigerated: 2-4 weeks unopened, 5-7 days opened</li>
      <li>• Frozen: Up to 6 months</li>
    </ul>
  </div>

  <p>Proper storage is key to maintaining freshness...</p>
</section>
```

### Pages to Update

Priority pages with how-to content:
1. `/guides/how-to-reheat-tortillas` - Add direct answer for each method
2. `/guides/how-to-store-tortillas` - Add storage duration answer
3. `/guides/how-to-freeze-tortillas` - Add freezing duration answer
4. `/guides/how-to-make-tortillas` - Add time/difficulty answer
5. `/guides/how-to-crisp-tortillas` - Add time/method answer

---

## Quick Win #3: AI Crawlers Added to robots.txt

### Status: ✅ Completed

Added the following AI crawlers to `public/robots.txt`:
- `Google-Extended` (Google's AI training crawler)
- `PerplexityBot` (Perplexity AI)
- `Applebot-Extended` (Apple Intelligence)

These join existing AI crawlers:
- `GPTBot` (ChatGPT)
- `ChatGPT-User`
- `CCBot` (Common Crawl)
- `anthropic-ai` (Claude)
- `Claude-Web`

**No action needed** - already implemented.

---

## Medium Priority: Add HowTo Schema

### What is HowTo Schema?

Structured data that tells search engines and AI about step-by-step instructions.

### Implementation Example

For `/guides/how-to-reheat-tortillas`:

```typescript
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Reheat Tortillas',
  description: '5 proven methods to reheat tortillas perfectly while maintaining texture and flavor',
  totalTime: 'PT5M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '0'
  },
  supply: [
    {
      '@type': 'HowToSupply',
      name: 'Tortillas'
    },
    {
      '@type': 'HowToSupply',
      name: 'Skillet or microwave or oven'
    }
  ],
  tool: [
    {
      '@type': 'HowToTool',
      name: 'Skillet'
    },
    {
      '@type': 'HowToTool',
      name: 'Damp paper towel'
    }
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Stovetop Method (Best)',
      text: 'Heat a dry skillet over medium heat. Place tortilla in skillet for 30 seconds per side. Flip once when you see light brown spots.',
      image: 'https://lonestartortillas.com/images/reheat-stovetop.jpg',
      url: 'https://lonestartortillas.com/guides/how-to-reheat-tortillas#stovetop'
    },
    {
      '@type': 'HowToStep',
      name: 'Microwave Method (Fastest)',
      text: 'Wrap tortillas in damp paper towel. Microwave on high for 30 seconds. Check and add 10-second intervals if needed.',
      image: 'https://lonestartortillas.com/images/reheat-microwave.jpg',
      url: 'https://lonestartortillas.com/guides/how-to-reheat-tortillas#microwave'
    },
    {
      '@type': 'HowToStep',
      name: 'Oven Method (For Large Batches)',
      text: 'Preheat oven to 350°F. Wrap tortillas in aluminum foil. Heat for 10-15 minutes until warm throughout.',
      image: 'https://lonestartortillas.com/images/reheat-oven.jpg',
      url: 'https://lonestartortillas.com/guides/how-to-reheat-tortillas#oven'
    }
  ],
  totalTime: 'PT5M'
};

export default function HowToReheatPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {/* rest of page */}
    </>
  );
}
```

### Pages That Need HowTo Schema

1. `/guides/how-to-reheat-tortillas` - Priority #1
2. `/guides/how-to-store-tortillas`
3. `/guides/how-to-freeze-tortillas`
4. `/guides/how-to-make-tortillas`
5. `/guides/how-to-crisp-tortillas`

---

## Medium Priority: Add Table of Contents

### Why?

Helps users and AI models navigate long content. Improves UX and SEO.

### Implementation

Create a reusable component:

```typescript
// components/seo/TableOfContents.tsx
interface TOCItem {
  id: string;
  title: string;
  subItems?: TOCItem[];
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav className="bg-cream-100 border border-cream-300 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-charcoal-950 mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sunset-600 hover:text-sunset-700 hover:underline"
            >
              {item.title}
            </a>
            {item.subItems && (
              <ul className="ml-4 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <li key={subItem.id}>
                    <a
                      href={`#${subItem.id}`}
                      className="text-sm text-charcoal-600 hover:text-sunset-600 hover:underline"
                    >
                      {subItem.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### Usage Example

```typescript
import { TableOfContents } from '@/components/seo/TableOfContents';

export default function BestTortillasPage() {
  const tocItems = [
    { id: 'tacos', title: 'Best Tortillas for Tacos' },
    { id: 'burritos', title: 'Best Tortillas for Burritos' },
    { id: 'enchiladas', title: 'Best Tortillas for Enchiladas' },
    { id: 'quesadillas', title: 'Best Tortillas for Quesadillas' },
    { id: 'faq', title: 'Frequently Asked Questions' },
  ];

  return (
    <article>
      <LastUpdated date="2025-10-25" />
      <TableOfContents items={tocItems} />
      {/* content */}
    </article>
  );
}
```

Don't forget to add `id` attributes to your sections:

```tsx
<section id="tacos">
  <h2>Best Tortillas for Tacos</h2>
  {/* content */}
</section>
```

### Pages That Need TOC

Any page with 5+ major sections:
1. `/guides/best-tortillas-for-every-dish`
2. `/guides/corn-vs-flour-tortillas`
3. `/guides/tortilla-nutrition`
4. `/blog/nixtamalization-science`
5. `/blog/texas-tortilla-traditions`

---

## Testing Your SEO Improvements

### 1. Rich Results Test (Google)
Test your structured data:
```
https://search.google.com/test/rich-results?url=https://lonestartortillas.com/guides/how-to-reheat-tortillas
```

### 2. Schema Markup Validator
Validate all schema:
```
https://validator.schema.org/#url=https://lonestartortillas.com
```

### 3. PageSpeed Insights
Check Core Web Vitals:
```
https://pagespeed.web.dev/
```

### 4. Mobile-Friendly Test
```
https://search.google.com/test/mobile-friendly
```

### 5. AI Model Testing

**ChatGPT Search Test**:
1. Go to ChatGPT
2. Search: "how to reheat tortillas"
3. Check if your site is cited
4. Look for: "According to Lonestar Tortillas..."

**Perplexity Test**:
1. Go to Perplexity.ai
2. Search: "best tortillas for tacos corn or flour"
3. Check citations
4. Your site should appear in sources

**Claude Test**:
1. Ask: "What's the best way to reheat tortillas?"
2. Check if it references your content
3. Note: May require search feature

---

## Monitoring & Iteration

### Monthly Checklist

- [ ] Update `dateModified` in article schemas
- [ ] Check Google Search Console for indexing issues
- [ ] Review top performing pages
- [ ] Add internal links to new content
- [ ] Update old content with new information

### Quarterly Checklist

- [ ] Full site SEO audit
- [ ] Update all "Last Updated" dates
- [ ] Check for broken links
- [ ] Review and update schema markup
- [ ] Analyze AI citation rates
- [ ] Competitor analysis

### Tools to Monitor

1. **Google Search Console**
   - Impressions
   - Click-through rate
   - Average position
   - Coverage issues

2. **Google Analytics 4**
   - Organic traffic
   - Bounce rate
   - Pages per session
   - Conversion rate

3. **Manual AI Tests** (Monthly)
   - ChatGPT search citations
   - Perplexity.ai mentions
   - Google AI Overviews

---

## Rollout Plan

### Week 1: Quick Wins
- [x] Add AI crawlers to robots.txt ✅
- [x] Create LastUpdated component ✅
- [ ] Add LastUpdated to top 5 guide pages
- [ ] Update article schema dates
- [ ] Add direct answers to top 3 pages

### Week 2: Component Rollout
- [ ] Add LastUpdated to all guide pages
- [ ] Add LastUpdated to all blog pages
- [ ] Create TableOfContents component
- [ ] Add TOC to 3 longest pages

### Week 3: Schema Expansion
- [ ] Add HowTo schema to all tutorial guides
- [ ] Add VideoObject schema for video content
- [ ] Test all schema with validator

### Week 4: Internal Linking
- [ ] Audit current internal links
- [ ] Add 3-5 contextual links per page
- [ ] Create topic clusters
- [ ] Update sitemap

### Month 2: Monitoring & Iteration
- [ ] Review analytics data
- [ ] Test AI model citations
- [ ] Identify top performers
- [ ] Optimize underperforming pages
- [ ] Create new content based on gaps

---

## Success Metrics

### 30-Day Goals
- [ ] All guide pages have LastUpdated component
- [ ] All blog pages have LastUpdated component
- [ ] Top 5 guides have HowTo schema
- [ ] Top 3 guides have direct answers
- [ ] 10% increase in organic impressions

### 90-Day Goals
- [ ] 25% increase in organic traffic
- [ ] 3+ AI model citations confirmed
- [ ] Average position improved by 2-3 spots
- [ ] Core Web Vitals all "Good"
- [ ] 15% improvement in CTR

### 6-Month Goals
- [ ] 40% increase in organic traffic
- [ ] Featured snippets for 5+ keywords
- [ ] Regular AI model citations
- [ ] Top 3 rankings for 10+ keywords
- [ ] 100+ internal links between content

---

## Questions or Issues?

1. Check the main SEO audit: `SEO_AUDIT_2025.md`
2. Review Next.js SEO docs: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
3. Schema.org reference: https://schema.org/
4. Test your changes with Google's Rich Results Test

---

**Last Updated**: October 25, 2025
**Next Review**: January 25, 2026
