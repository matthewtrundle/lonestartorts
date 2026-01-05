const fs = require('fs');
const path = require('path');

const pages = {
  'quinceanera-catering': 'Quinceañera celebration taco spread with elegant decorations',
  'graduation-party': 'Graduation party taco bar with festive decorations',
  'corporate-catering': 'Professional corporate taco bar setup',
  'baby-shower-fiesta': 'Baby shower taco bar with festive decorations',
  'tailgate-party': 'Football tailgate taco bar setup',
  'sports-banquet': 'Sports team banquet taco buffet',
  'retirement-party': 'Office retirement party taco celebration',
  'engagement-party': 'Romantic engagement party taco bar',
  'company-picnic': 'Outdoor company picnic taco bar',
  'rehearsal-dinner': 'Intimate rehearsal dinner taco bar',
  'dia-de-los-muertos': 'Día de los Muertos taco celebration',
  'las-posadas': 'Las Posadas Christmas celebration taco feast',
  'bautizo-celebration': 'Baptism celebration taco party',
  'first-communion': 'First Communion celebration taco party',
  'church-potluck': 'Church fellowship hall taco potluck',
  'school-fundraiser': 'School taco sale fundraiser',
  'family-reunion': 'Family reunion taco bar',
  'block-party': 'Neighborhood block party taco bar'
};

for (const [page, alt] of Object.entries(pages)) {
  const filePath = path.join(process.cwd(), 'app', 'guides', page, 'page.tsx');

  if (!fs.existsSync(filePath)) {
    console.log(`❌ Not found: ${page}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already has hero image
  if (content.includes('Hero Image')) {
    console.log(`⏭️ Skipped: ${page} (already has hero)`);
    continue;
  }

  // Add Image import if not present
  if (!content.includes("import Image from 'next/image'")) {
    content = content.replace(
      "import type { Metadata } from 'next'",
      "import type { Metadata } from 'next'\nimport Image from 'next/image'"
    );
  }

  // Add hero image section after </header>
  const heroSection = `</header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-${page}.webp"
            alt="${alt}"
            fill
            className="object-cover"
            priority
          />
        </div>`;

  content = content.replace('</header>', heroSection);

  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${page}`);
}

console.log('\n✨ Done!');
