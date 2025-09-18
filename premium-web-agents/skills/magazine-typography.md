# Magazine Typography & Editorial Design Skills

*Premium typography patterns learned from Lone Star Tortilla editorial design*

## Font Stack Strategy

### Primary Typography System
```css
/* Display Typography - Editorial Headlines */
.heading-display {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.9;
  font-feature-settings: 'liga' 1, 'kern' 1;
}

/* Body & Interface Typography */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Accent Script Typography */
font-family: 'Dancing Script', cursive; /* Use sparingly for emphasis */

/* Code & Technical */
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

### Font Loading Optimization
```javascript
// next/font implementation
import { Playfair_Display, Inter, Dancing_Script } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
```

## Editorial Layout Patterns

### Magazine-Style Asymmetric Headlines
```html
<h2 class="magazine-text">
  <span class="block text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.8] text-gradient">
    TASTE
  </span>
  <span class="block text-4xl md:text-5xl lg:text-6xl font-display font-light mt-3">
    the difference
  </span>
  <span class="block text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[0.9] mt-4">
    TRADITION
  </span>
  <span class="block text-3xl md:text-4xl lg:text-5xl font-display italic font-light text-masa-600 mt-3">
    makes
  </span>
</h2>
```

### Responsive Typography Scale
```css
/* Base responsive scaling */
@media (min-width: 640px) { html { font-size: 16px; } }
@media (min-width: 768px) { html { font-size: 17px; } }
@media (min-width: 1024px) { html { font-size: 18px; } }
@media (min-width: 1280px) { html { font-size: 19px; } }
@media (min-width: 1536px) { html { font-size: 20px; } }

/* Display sizes that scale with viewport */
.text-display-sm { font-size: clamp(2.5rem, 8vw, 4rem); }
.text-display-md { font-size: clamp(3rem, 10vw, 6rem); }
.text-display-lg { font-size: clamp(4rem, 12vw, 8rem); }
.text-display-xl { font-size: clamp(5rem, 15vw, 10rem); }
```

## Text Effect Patterns

### Gradient Text Applications
```css
.text-gradient {
  background: linear-gradient(135deg, #F15A0E 0%, #F97F2B 50%, #FBAC5D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-masa {
  background: linear-gradient(135deg, #B58650 0%, #C5A06E 50%, #D9C299 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Text Balance for Headlines
```css
.text-balance {
  text-wrap: balance; /* Prevents orphaned words */
}
```

### Custom Text Shadows
```css
.text-shadow-sunset {
  text-shadow: 0 4px 16px rgba(241, 90, 14, 0.5);
}

.text-shadow-masa {
  text-shadow: 0 4px 16px rgba(181, 134, 80, 0.4);
}

.text-shadow-depth {
  text-shadow:
    0 1px 0 #ccc,
    0 2px 0 #c9c9c9,
    0 3px 0 #bbb,
    0 4px 0 #b9b9b9,
    0 5px 0 #aaa,
    0 6px 1px rgba(0,0,0,.1),
    0 0 5px rgba(0,0,0,.1),
    0 1px 3px rgba(0,0,0,.3),
    0 3px 5px rgba(0,0,0,.2),
    0 5px 10px rgba(0,0,0,.25);
}
```

## Editorial Layout Components

### Pull Quote Treatment
```html
<blockquote class="border-l-4 border-sunset-500 pl-6 py-2 my-8">
  <p class="text-xl font-display italic text-charcoal-800 mb-4">
    "Every bite tells a story of Texas pride and culinary heritage"
  </p>
  <cite class="text-sm text-charcoal-600 block">
    — Maria Rodriguez, Founder
  </cite>
</blockquote>
```

### Accent Text with Decorative Elements
```html
<div class="flex items-center gap-4 mb-6">
  <span class="inline-block w-20 h-px bg-sunset-500"></span>
  <span class="text-sm font-medium tracking-wider uppercase text-sunset-600">
    Authentic Texas Tradition
  </span>
</div>
```

### Eyebrow Text Pattern
```html
<div class="flex items-center gap-4">
  <span class="text-sunset-500 text-6xl">✦</span>
  <div>
    <p class="text-sm font-medium tracking-mega uppercase text-masa-700">Since 1905</p>
    <p class="text-2xl font-display">H-E-B Excellence</p>
  </div>
</div>
```

## Letter Spacing & Tracking

### Tracking Scale System
```css
.tracking-micro { letter-spacing: 0.025em; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-normal { letter-spacing: 0em; }
.tracking-wide { letter-spacing: 0.1em; }
.tracking-wider { letter-spacing: 0.15em; }
.tracking-widest { letter-spacing: 0.2em; }
.tracking-mega { letter-spacing: 0.3em; }
```

### Context-Specific Applications
```css
/* Headlines - tighter for impact */
.heading-display { letter-spacing: -0.05em; }

/* Uppercase labels - wider for clarity */
.uppercase { letter-spacing: 0.1em; }

/* Button text - slight tracking for readability */
button { letter-spacing: 0.05em; }
```

## Line Height Optimization

### Contextual Line Heights
```css
/* Display headlines - tight for drama */
.leading-display { line-height: 0.8; }
.leading-tight { line-height: 0.9; }

/* Body text - comfortable reading */
.leading-relaxed { line-height: 1.625; }
.leading-loose { line-height: 1.8; }

/* UI elements - precise spacing */
.leading-none { line-height: 1; }
```

## Typography Hierarchy

### Information Architecture
```css
/* Level 1: Hero Headlines */
.text-hero {
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.05em;
}

/* Level 2: Section Headlines */
.text-section {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
}

/* Level 3: Subsection Headers */
.text-subsection {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  line-height: 1.2;
}

/* Level 4: Content Headers */
.text-content-header {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 600;
  line-height: 1.3;
}

/* Body Text */
.text-body {
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 400;
  line-height: 1.6;
}

/* Small Text */
.text-small {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  font-weight: 400;
  line-height: 1.5;
}
```

## Accessibility Considerations

### Contrast Compliance
```css
/* Ensure 4.5:1 minimum contrast ratio */
.text-charcoal-950 { color: #1a1a1a; } /* High contrast */
.text-charcoal-700 { color: #374151; } /* Medium contrast */
.text-charcoal-500 { color: #6b7280; } /* Lower contrast - use carefully */
```

### Focus States for Typography
```css
a:focus, button:focus {
  outline: 2px solid #F15A0E;
  outline-offset: 2px;
  text-decoration: underline;
}
```

### Reduced Motion Typography
```css
@media (prefers-reduced-motion: reduce) {
  .split-text span {
    animation: none !important;
    transform: none !important;
  }
}
```

## Editorial Design Principles

### Visual Hierarchy Rules
1. **Size**: Larger elements draw attention first
2. **Weight**: Bold text creates emphasis
3. **Color**: Brand colors highlight key information
4. **Spacing**: White space creates breathing room
5. **Contrast**: High contrast ensures readability

### Magazine Layout Techniques
- **Asymmetric balance**: Create visual interest with uneven layouts
- **Type as image**: Use large typography as visual elements
- **Rhythm and flow**: Consistent spacing creates reading rhythm
- **Editorial spacing**: Generous white space enhances premium feel
- **Typographic color**: Vary text weights to create visual texture

### Implementation Tips
```css
/* Create editorial rhythm with consistent spacing */
.editorial-flow > * + * {
  margin-top: var(--flow-space, 1.5rem);
}

/* Use CSS Grid for magazine layouts */
.magazine-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

/* Maintain aspect ratios for consistency */
.editorial-image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

This typography system creates sophisticated, magazine-quality text experiences that enhance brand personality while maintaining excellent readability and accessibility.