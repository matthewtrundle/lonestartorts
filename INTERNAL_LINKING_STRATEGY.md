# Internal Linking Strategy - Lonestar Tortillas

**Version**: 1.0
**Last Updated**: November 4, 2025
**Status**: ✅ Implemented

---

## Overview

This document outlines the comprehensive internal linking strategy for lonestartortillas.com. A strong internal linking structure improves SEO through better PageRank distribution, enhanced crawlability, and clearer topical relevance signals.

**Key Principles**:
- Every page has 3-5+ incoming internal links
- Varied, keyword-rich anchor text
- Logical content relationships
- Clear site hierarchy through breadcrumbs
- Contextual inline links within content

---

## Site Architecture

### Hub Structure

```
Homepage
├── Products Hub (/shop)
│   ├── Corn Tortillas
│   ├── Flour Tortillas
│   ├── Butter Tortillas
│   └── Specialty Tortillas
├── Recipes Hub (/recipes)
│   ├── Breakfast Tacos
│   ├── Breakfast Burritos
│   ├── Cheese Quesadillas
│   ├── Chicken Fajitas
│   ├── Tacos al Pastor
│   ├── Carnitas Tacos
│   ├── Carne Asada Tacos
│   ├── Fish Tacos
│   ├── Shrimp Tacos
│   ├── Bean & Veggie Tacos
│   └── Cheese Enchiladas
├── Guides Hub (/guides)
│   ├── How to Store Tortillas
│   ├── How to Freeze Tortillas
│   ├── How to Reheat Tortillas
│   ├── How to Make Tortillas
│   ├── How to Crisp Tortillas
│   ├── Corn vs Flour Tortillas
│   ├── Best Tortillas for Every Dish
│   ├── Tortilla Nutrition
│   ├── Tortilla Sizes
│   └── Gluten-Free Tortillas
├── Blog Hub (/blog)
│   ├── Maria's Story
│   ├── Nixtamalization Science
│   └── Texas Tortilla Traditions
├── Locations Hub (/locations)
│   ├── New York City
│   ├── Los Angeles
│   ├── Chicago
│   ├── Seattle
│   └── Denver
├── Story (/story)
├── Craft (/craft)
└── FAQ (/faq)
```

---

## Link Matrix

### 1. Homepage Links

**Outgoing Links** (8-12 links):
- `/shop` - "Shop All Tortillas"
- `/products/corn-tortillas` - "Authentic Corn Tortillas"
- `/products/flour-tortillas` - "Traditional Flour Tortillas"
- `/products/butter-tortillas` - "Premium Butter Tortillas"
- `/recipes` - "View All Recipes"
- `/guides` - "Tortilla Guides"
- `/blog` - "Read Our Stories"
- `/pre-sale` - "Join Waitlist"

**Anchor Text Strategy**: Mix of branded, keyword-rich, and action-oriented anchors.

---

### 2. Product Pages

**Each Product Page Links To**:
1. **Other Products** (3 links in "Complete Your Order" section):
   - Related products with varied anchor text
   - Example: "Traditional corn tortillas for authentic tacos"

2. **Related Recipes** (2-3 links):
   - Breakfast Tacos (for flour/butter tortillas)
   - Carne Asada Tacos (for corn tortillas)
   - Specific to tortilla type

3. **Related Guides** (1-2 links):
   - Storage guides
   - Preparation guides

**Total Outgoing**: 6-8 contextual links per product page

---

### 3. Recipe Pages

**Each Recipe Page Links To**:
1. **Product Pages** (2-3 inline links):
   - Within ingredients section
   - Example: "8 [flour tortillas](/products/flour-tortillas)"
   - Alternative product mentions: "or [butter tortillas](/products/butter-tortillas)"

2. **Related Recipes** (3 links in footer section):
   - Similar recipes (tacos → tacos, breakfast → breakfast)
   - Complementary dishes
   - Example: Carne Asada → Carnitas, Fish Tacos, Chicken Fajitas

3. **Related Guides** (1-2 links):
   - How to reheat tortillas
   - How to store tortillas
   - Relevant preparation guides

**Total Outgoing**: 6-8 contextual links per recipe page

---

### 4. Guide Pages

**Each Guide Page Links To**:
1. **Product Pages** (2-3 inline links):
   - Contextual mentions within content
   - Example: "Shop our [premium flour tortillas](/products/flour-tortillas)"

2. **Related Recipes** (3 links in "Try These Recipes" section):
   - Newly added to most guides
   - Example in how-to-reheat: Breakfast Tacos, Quesadillas, Carne Asada

3. **Related Guides** (2 links in "Related Guides" section):
   - Complementary guides
   - Example: Storage ↔ Freezing ↔ Reheating

**Total Outgoing**: 7-8 contextual links per guide page

---

### 5. Hub Pages

**Recipes Hub** (`/recipes`):
- Links to all 11 recipe pages (primary grid)
- Links to 2 product pages (inline mentions)
- Links to guides hub
- **Total Outgoing**: 14+ links

**Guides Hub** (`/guides`):
- Links to all 10 guide pages (primary grid)
- Links to 2 product pages (inline mentions)
- Links to recipes hub
- **Total Outgoing**: 13+ links

**Blog Hub** (`/blog`):
- Links to all 3 blog posts (primary grid)
- Links to shop page
- **Total Outgoing**: 4+ links

**Locations Hub** (`/locations`):
- Links to all 5 city pages (primary grid)
- Links to 3 product pages (inline mentions)
- Links to shop and pre-sale pages
- **Total Outgoing**: 10+ links

---

### 6. City Pages

**Each City Page Links To**:
- Products Hub (`/shop`)
- All 4 product pages (corn, flour, butter, specialty)
- Pre-sale page
- FAQ page
- **Total Outgoing**: 7+ links per city page

---

## Navigation Elements

### 1. Breadcrumb Navigation

**Status**: ✅ Implemented on most pages

**Pattern**:
```
Home / Category / Current Page
```

**Pages with Breadcrumbs**:
- All recipe pages
- All guide pages
- All blog pages
- City pages
- Hub pages

**Component**: `/components/Breadcrumbs.tsx`

---

### 2. Header Navigation

**Primary Navigation Links**:
- Home
- Shop/Products
- Recipes
- Guides
- Blog
- About/Story

**Appears on**: All pages via layout component

---

### 3. Footer Navigation

**Status**: ⚠️ To be enhanced

**Recommended Structure**:
```
Column 1: Products
- Shop All
- Corn Tortillas
- Flour Tortillas
- Butter Tortillas

Column 2: Resources
- Recipes
- Guides
- Blog
- FAQ

Column 3: Locations
- Nationwide Delivery
- New York
- Los Angeles
- Chicago

Column 4: Company
- About Us
- Contact
- Terms
- Privacy
```

---

## Contextual Linking Rules

### 1. Anchor Text Guidelines

**✅ Good Anchor Text**:
- "authentic H-E-B® corn tortillas"
- "premium butter flour tortillas"
- "Texas-style breakfast tacos recipe"
- "how to store tortillas properly"
- "traditional nixtamalization process"

**❌ Avoid**:
- "click here"
- "read more"
- "this page"
- Repeated exact-match anchors

**Best Practices**:
- Use natural language
- Include relevant keywords
- Vary anchor text across pages
- Descriptive and contextual

---

### 2. Link Placement Strategy

**Priority Locations** (in order of SEO value):

1. **Inline Contextual Links** (Highest Value)
   - Within body content
   - Natural mentions
   - Example: "For best results, use [authentic corn tortillas](/products/corn-tortillas)"

2. **Related Content Sections** (High Value)
   - "You May Also Like"
   - "Related Recipes"
   - "Try These Recipes"
   - Example: Recipe pages → 3 related recipes

3. **Navigation Elements** (Medium Value)
   - Breadcrumbs
   - Header/Footer navigation
   - Hub page listings

4. **CTA Sections** (Medium Value)
   - "Shop Tortillas"
   - "Join Waitlist"
   - "View All Guides"

---

## Link Equity Flow

### PageRank Distribution Strategy

**Tier 1 - Highest Authority** (Most incoming links):
- Homepage
- Products Hub (`/shop`)
- Popular products (corn, flour)

**Tier 2 - High Authority**:
- Recipes Hub
- Guides Hub
- Individual product pages
- Popular recipes (breakfast tacos, etc.)

**Tier 3 - Medium Authority**:
- Individual recipe pages
- Individual guide pages
- Locations Hub

**Tier 4 - Supporting Authority**:
- Blog posts
- City pages
- Specialty pages

**Strategy**:
- Tier 1 pages link to Tier 2 and Tier 3
- Tier 2 pages link heavily to Tier 3
- Tier 3 pages cross-link and link back to Tier 2
- All pages link back to Homepage and hub pages

---

## Topical Clustering

### Content Clusters

**Cluster 1: Product-Focused**
- Hub: Products Hub
- Spokes: Corn, Flour, Butter, Specialty tortillas
- Supporting: Recipes, Guides, City pages

**Cluster 2: Recipe-Focused**
- Hub: Recipes Hub
- Spokes: All 11 recipe pages
- Supporting: Product pages, Guide pages

**Cluster 3: Educational**
- Hub: Guides Hub
- Spokes: All 10 guide pages
- Supporting: Recipe pages, Product pages

**Cluster 4: Brand/Story**
- Hub: Blog Hub
- Spokes: 3 blog posts
- Supporting: About, Story, Craft pages

**Cluster 5: Geographic**
- Hub: Locations Hub
- Spokes: 5 city pages
- Supporting: Product pages, Shop

---

## Implementation Checklist

### ✅ Completed

- [x] Breadcrumb navigation on all content pages
- [x] Related content sections on recipe pages (11/11)
- [x] Related recipes sections on guide pages (4/10) *
- [x] Product cross-linking on product pages (4/4)
- [x] Contextual product links in recipe ingredients (11/11)
- [x] Hub pages linking to all content (4/4)
- [x] Recipe-to-recipe cross-linking (11/11)
- [x] Guide-to-guide cross-linking (10/10)
- [x] City page internal linking (5/5)
- [x] Created Locations Hub

\* Added to: how-to-reheat, how-to-store, corn-vs-flour, how-to-freeze

### 🔄 Recommended Future Enhancements

- [ ] Enhanced footer navigation (comprehensive site links)
- [ ] Previous/Next navigation on recipe pages
- [ ] Previous/Next navigation on guide pages
- [ ] Add more recipe links to remaining guide pages
- [ ] Blog post cross-linking
- [ ] Inline contextual links in blog posts
- [ ] Related products widget on guide pages

---

## Monitoring & Maintenance

### Monthly Review

**Metrics to Track**:
1. Internal link count per page (target: 3-5+ incoming)
2. Anchor text diversity
3. Crawl depth (all pages ≤ 3 clicks from homepage)
4. Orphaned pages (target: 0)
5. Broken internal links (target: 0)

**Tools**:
- Google Search Console (Internal Links report)
- Screaming Frog (crawl depth, link analysis)
- Ahrefs/SEMrush (internal link metrics)

### Quarterly Audit

- Review new content for linking opportunities
- Update hub pages with new recipes/guides
- Refresh anchor text variations
- Identify underlinked pages
- Check for link rot

---

## Best Practices Summary

1. **Every page should have 3-5+ incoming internal links**
2. **Use descriptive, keyword-rich anchor text**
3. **Link contextually within content, not just navigation**
4. **Maintain logical topical relationships**
5. **Keep crawl depth shallow (≤ 3 clicks)**
6. **Cross-link related content (recipes ↔ guides ↔ products)**
7. **Update hub pages when adding new content**
8. **Use breadcrumbs consistently**
9. **Vary anchor text across pages**
10. **Monitor and fix broken links monthly**

---

## Component Reference

**Reusable Linking Components**:
- `/components/Breadcrumbs.tsx` - Breadcrumb navigation
- `/components/RelatedContent.tsx` - Related content sections
- `/components/RecipeCard.tsx` - Recipe grid cards
- `/components/GuideCard.tsx` - Guide grid cards

**Usage Examples**:

```tsx
// Breadcrumbs
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Recipes', href: '/recipes' },
    { label: 'Breakfast Tacos' },
  ]}
/>

// Related Content
<RelatedContent
  title="You May Also Like"
  items={[
    {
      title: "Carne Asada Tacos",
      description: "Perfectly grilled marinated steak tacos",
      href: "/recipes/carne-asada-tacos",
      category: "Dinner"
    },
    // ... more items
  ]}
  columns={3}
/>
```

---

**Document Status**: Complete and ready for ongoing maintenance.
