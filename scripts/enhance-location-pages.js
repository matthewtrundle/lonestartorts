#!/usr/bin/env node
/**
 * Script to enhance thin location pages with FAQ sections
 * Improves text-HTML ratio for SEO
 */

const fs = require('fs');
const path = require('path');

const locationsDir = path.join(__dirname, '../app/locations');

// Find all city page.tsx files (not state-level pages)
function findCityPages(dir, pages = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Check if this directory has a page.tsx and subdirectories (state level)
      const subItems = fs.readdirSync(fullPath);
      const hasSubdirs = subItems.some(sub => {
        const subPath = path.join(fullPath, sub);
        return fs.statSync(subPath).isDirectory();
      });

      if (hasSubdirs) {
        // This is a state directory, recurse into city directories
        findCityPages(fullPath, pages);
      } else if (subItems.includes('page.tsx')) {
        // This is a city directory
        pages.push(fullPath);
      }
    }
  }

  return pages;
}

function extractCityAndState(pagePath) {
  const parts = pagePath.split(path.sep);
  const locationsIdx = parts.indexOf('locations');
  const state = parts[locationsIdx + 1];
  const city = parts[locationsIdx + 2];

  // Convert slug to display name
  const formatName = (slug) => {
    return slug.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return {
    state: formatName(state),
    city: formatName(city),
    stateSlug: state,
    citySlug: city
  };
}

function enhancePage(pagePath) {
  const pageFile = path.join(pagePath, 'page.tsx');
  let content = fs.readFileSync(pageFile, 'utf8');

  // Skip if already has LocationFAQ
  if (content.includes('LocationFAQ')) {
    console.log(`Skipping ${pagePath} - already enhanced`);
    return false;
  }

  const { city, state } = extractCityAndState(pagePath);

  // Add import for LocationFAQ
  if (!content.includes("import { LocationFAQ }")) {
    content = content.replace(
      "import { Breadcrumbs } from '@/components/Breadcrumbs'",
      "import { Breadcrumbs } from '@/components/Breadcrumbs'\nimport { LocationFAQ } from '@/components/location/LocationFAQ'"
    );
  }

  // Find the disclaimer line and add FAQ before it
  const disclaimerPattern = /<p className="text-sm text-charcoal-500 italic[^>]*>Independent reseller/;

  if (disclaimerPattern.test(content)) {
    const faqComponent = `
        <LocationFAQ city="${city}" state="${state}" />
        `;

    content = content.replace(
      disclaimerPattern,
      `${faqComponent}<p className="text-sm text-charcoal-500 italic`
    );
  }

  // Add more content to the "Why X Loves" section
  const whyPattern = /(<h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why [^<]+ Loves Texas Tortillas<\/h2>\s*<p[^>]*>[^<]+<\/p>)(\s*<\/section>)/;

  if (whyPattern.test(content)) {
    const additionalContent = `
          <p className="text-charcoal-700 leading-relaxed mt-4">Whether you're hosting a family taco night, preparing breakfast tacos for the weekend, or simply craving authentic Tex-Mex flavors, our tortillas deliver that unmistakable Texas taste. Each tortilla is made with quality ingredients and traditional methods that have made H-E-B a household name across Texas.</p>
          <p className="text-charcoal-700 leading-relaxed mt-4">Our customers in ${city} tell us they love the convenience of having authentic Texas tortillas delivered right to their door. No more settling for grocery store alternatives when you can enjoy the real thing.</p>`;

    content = content.replace(whyPattern, `$1${additionalContent}$2`);
  }

  fs.writeFileSync(pageFile, content);
  console.log(`Enhanced ${pagePath}`);
  return true;
}

// Main execution
const cityPages = findCityPages(locationsDir);
console.log(`Found ${cityPages.length} city pages`);

let enhanced = 0;
for (const page of cityPages) {
  if (enhancePage(page)) {
    enhanced++;
  }
}

console.log(`\nEnhanced ${enhanced} pages`);
