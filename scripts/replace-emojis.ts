import * as fs from 'fs';
import * as path from 'path';

// Map of emoji to replacement
const emojiReplacements: Record<string, { import: string; component: string; className?: string }> = {
  '⭐': {
    import: 'StarIcon',
    component: '<StarIcon className="inline-block text-sunset-500" size={16} />',
    className: 'inline-block text-sunset-500'
  },
  '🌮': {
    import: 'TacoIcon',
    component: '<TacoIcon className="inline-block text-sunset-600" size={20} />',
    className: 'inline-block text-sunset-600'
  },
  '👨‍🍳': {
    import: 'ChefIcon',
    component: '<ChefIcon className="inline-block text-charcoal-700" size={20} />',
    className: 'inline-block text-charcoal-700'
  },
  '🌯': {
    import: 'BurritoIcon',
    component: '<BurritoIcon className="inline-block text-masa-600" size={20} />',
    className: 'inline-block text-masa-600'
  },
  '🧀': {
    import: 'CheeseIcon',
    component: '<CheeseIcon className="inline-block text-yellow-500" size={18} />',
    className: 'inline-block text-yellow-500'
  },
  '🔥': {
    import: 'FlameIcon',
    component: '<FlameIcon className="inline-block text-orange-500" size={18} />',
    className: 'inline-block text-orange-500'
  },
  '🌶️': {
    import: 'PepperIcon',
    component: '<PepperIcon className="inline-block text-red-600" size={18} />',
    className: 'inline-block text-red-600'
  },
  '🥘': {
    import: 'PanIcon',
    component: '<PanIcon className="inline-block text-charcoal-600" size={18} />',
    className: 'inline-block text-charcoal-600'
  },
  '✨': {
    import: 'SparkleIcon',
    component: '<SparkleIcon className="inline-block text-sunset-400" size={16} />',
    className: 'inline-block text-sunset-400'
  },
  '⏰': {
    import: 'ClockIcon',
    component: '<ClockIcon className="inline-block text-charcoal-600" size={18} />',
    className: 'inline-block text-charcoal-600'
  },
  '•': {
    import: 'BulletIcon',
    component: '<BulletIcon className="inline-block text-sunset-600 mx-2" size={6} />',
    className: 'inline-block text-sunset-600 mx-2'
  },
};

// Files to process
const filesToProcess = [
  'app/blog/texas-tortilla-traditions/page.tsx',
  'app/guides/best-tortillas-for-every-dish/page.tsx',
  'app/guides/gluten-free-tortillas/page.tsx',
  'app/guides/how-to-reheat-tortillas/page.tsx',
  'app/guides/how-to-store-tortillas/page.tsx',
  'app/guides/tortilla-sizes/page.tsx',
  'app/recipes/bean-and-veggie-tacos/page.tsx',
  'app/recipes/breakfast-burritos/page.tsx',
  'app/recipes/breakfast-tacos/page.tsx',
  'app/recipes/carne-asada-tacos/page.tsx',
  'app/recipes/carnitas-tacos/page.tsx',
  'app/recipes/cheese-enchiladas/page.tsx',
  'app/recipes/cheese-quesadillas/page.tsx',
  'app/recipes/chicken-fajitas/page.tsx',
  'app/recipes/fish-tacos/page.tsx',
  'app/recipes/shrimp-tacos/page.tsx',
  'app/recipes/tacos-al-pastor/page.tsx',
];

function processFile(filePath: string): void {
  const fullPath = path.join(process.cwd(), filePath);
  let content = fs.readFileSync(fullPath, 'utf-8');

  // Track which icons we need to import
  const iconsNeeded = new Set<string>();

  // Replace emojis
  let replacements = 0;
  for (const [emoji, { import: iconImport, component }] of Object.entries(emojiReplacements)) {
    if (content.includes(emoji)) {
      // Escape special regex characters
      const escapedEmoji = emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedEmoji, 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, component);
        iconsNeeded.add(iconImport);
        replacements += matches.length;
      }
    }
  }

  if (iconsNeeded.size > 0) {
    // Check if icons are already imported
    const hasIconImport = content.includes("from '@/components/ui/Icons'");

    if (!hasIconImport) {
      // Find the last import statement
      const importRegex = /import\s+.*?from\s+['"].*?['"];?\n/g;
      const imports = content.match(importRegex);
      if (imports) {
        const lastImport = imports[imports.length - 1];
        const iconsList = Array.from(iconsNeeded).join(', ');
        const newImport = `import { ${iconsList} } from '@/components/ui/Icons';\n`;
        content = content.replace(lastImport, lastImport + newImport);
      }
    } else {
      // Update existing import
      const iconImportRegex = /import\s+\{([^}]+)\}\s+from\s+['"]@\/components\/ui\/Icons['"];?/;
      const match = content.match(iconImportRegex);
      if (match) {
        const existingIcons = match[1].split(',').map(s => s.trim());
        const allIcons = new Set([...existingIcons, ...Array.from(iconsNeeded)]);
        const iconsList = Array.from(allIcons).join(', ');
        content = content.replace(iconImportRegex, `import { ${iconsList} } from '@/components/ui/Icons'`);
      }
    }

    fs.writeFileSync(fullPath, content);
    console.log(`✓ ${filePath}: Replaced ${replacements} emojis with ${iconsNeeded.size} icon types`);
  } else {
    console.log(`○ ${filePath}: No emojis found`);
  }
}

console.log('Starting emoji replacement...\n');

for (const file of filesToProcess) {
  try {
    processFile(file);
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error);
  }
}

console.log('\n✓ Emoji replacement complete!');
