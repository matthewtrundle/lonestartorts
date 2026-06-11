/**
 * Brand image factory. Generates the facelift image set via OpenRouter.
 * Hero-critical prompts run on two premium models (tournament — pick winners
 * by eye); bulk prompts run on the cheap flash model.
 *
 * Usage: node --env-file=.env.local scripts/gen-brand-images.mjs [tournament|bulk|all]
 * Output: /tmp/brand-gen/<name>--<model-short>.png
 */
import { writeFileSync, mkdirSync } from 'fs';

const KEY = process.env.OPENROUTER_API_KEY;
const OUT = '/tmp/brand-gen';
mkdirSync(OUT, { recursive: true });

const PREMIUM = ['openai/gpt-5.4-image-2', 'google/gemini-3-pro-image-preview'];
const BULK = 'google/gemini-3.1-flash-image-preview';

const BRAND =
  'Warm Texas editorial food photography. Palette: cream, terracotta, burnt orange golden-hour tones, deep charcoal shadows. Natural dramatic side-light, photorealistic, medium format feel. No text, no words, no logos, no human faces.';
const DARKWIDE =
  'Wide 16:9 cinematic composition, dark moody tones suitable for white text overlay on the left two-thirds.';

export const TOURNAMENT = [
  ['cat-guides', `${DARKWIDE} Rustic kitchen prep scene: rolling pin, flour-dusted wooden board, stack of raw tortilla dough balls, cast iron in soft-focus background. ${BRAND}`],
  ['cat-recipes', `${DARKWIDE} Overhead plated tacos on warm ceramic, charred tortillas, vibrant garnish, linen napkin, dark wooden table. ${BRAND}`],
  ['cat-locations', `${DARKWIDE} Empty Texas highway at dusk stretching toward a glowing horizon, desert brush, telephone poles, warm sunset sky fading to deep charcoal. ${BRAND}`],
  ['cat-blog', `${DARKWIDE} Still life: folded tortillas in a cloth-lined basket beside a sweating glass of agua fresca and a worn cookbook, windowsill light. ${BRAND}`],
  ['cat-wholesale', `${DARKWIDE} Professional restaurant kitchen pass with stacked warm tortillas in steel containers, soft bokeh flames behind. ${BRAND}`],
  ['cat-story', `${DARKWIDE} Heritage Texas kitchen: enamel pots, hanging dried chiles, a comal over flame, morning light through a dusty window. ${BRAND}`],
  ['prod-flour', `Tall close stack of soft flour tortillas on a dark comal, one draped over the edge, steam wisps, golden side-light, dark backdrop. ${DARKWIDE} ${BRAND}`],
  ['prod-corn', `Macro of yellow corn tortillas with perfect char spots, fanned like cards on dark slate, scattered corn kernels and masa flour. ${DARKWIDE} ${BRAND}`],
  ['prod-butter', `Butter tortilla folded on a warm plate, glistening melted butter, honey-colored light, shallow depth of field, dark moody backdrop. ${DARKWIDE} ${BRAND}`],
  ['prod-specialty', `Trio of specialty tortillas — whole wheat, spinach-herb green, classic flour — overlapping on butcher paper, herbs scattered, dark backdrop. ${DARKWIDE} ${BRAND}`],
  ['og-card', `Hero stack of tortillas on a comal, steam rising, composed in the right third with generous dark negative space on the left two-thirds for headline text, 1200x630 landscape. ${BRAND}`],
];

export const BULK_PROMPTS = [
  ['region-desert-sw', 'Sonoran desert at golden hour, saguaro silhouettes, warm orange sky'],
  ['region-gulf-coast', 'Gulf coast shoreline at dusk, gentle waves, warm hazy light, sea oats'],
  ['region-mountain-west', 'Rocky mountain foothills at sunset, pine silhouettes, alpenglow'],
  ['region-midwest-plains', 'Endless wheat plains at golden hour, big sky, distant grain elevator'],
  ['region-northeast-city', 'Brownstone city street at dusk, warm window lights, autumn tones'],
  ['region-southeast', 'Live oaks with hanging moss at golden hour, warm southern light'],
  ['region-pacific-nw', 'Evergreen forest edge with morning mist, warm light breaking through'],
  ['region-california', 'Golden California hills at sunset, lone oak tree, warm haze'],
  ['region-texas-hill', 'Texas hill country at dusk, limestone, wildflowers, windmill silhouette'],
  ['region-great-lakes', 'Lakeshore at dusk with warm light, lighthouse silhouette in distance'],
  ['band-subscribe', 'Weekly meal prep scene: labeled kraft packages of tortillas in a wooden crate on a kitchen counter, calendar softly blurred behind'],
  ['band-checkout', 'Close detail of hands taping a kraft shipping box with twine, flour-dusted table'],
  ['band-wholesale', 'Stacks of bulk tortilla packs on a steel restaurant shelf, warm kitchen light'],
  ['strip-footer', 'Extreme wide thin banner: row of tortillas overlapping like fish scales on dark slate, subtle warm rim light'],
  ['band-story', 'Vintage Texas roadside at dusk: neon glow spilling onto gravel, old pickup truck silhouette in far background'],
];

async function gen(model, name, prompt) {
  const short = model.split('/')[1].replace(/[^a-z0-9.-]/gi, '').slice(0, 20);
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        modalities: ['image', 'text'],
      }),
    });
    const data = await res.json();
    const img = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!img) {
      console.error(`FAIL ${name}--${short}: ${JSON.stringify(data.error || data).slice(0, 150)}`);
      return false;
    }
    writeFileSync(`${OUT}/${name}--${short}.png`, Buffer.from(img.split(',')[1], 'base64'));
    console.log(`ok ${name}--${short}`);
    return true;
  } catch (e) {
    console.error(`ERR ${name}--${short}: ${e.message.slice(0, 100)}`);
    return false;
  }
}

const mode = process.argv[2] || 'all';
const jobs = [];
if (mode === 'tournament' || mode === 'all') {
  for (const [name, prompt] of TOURNAMENT)
    for (const model of PREMIUM) jobs.push([model, name, prompt]);
}
if (mode === 'bulk' || mode === 'all') {
  for (const [name, scene] of BULK_PROMPTS)
    jobs.push([BULK, name, `${DARKWIDE} ${scene}. ${BRAND}`]);
}

// modest concurrency
let i = 0;
async function worker() {
  while (i < jobs.length) {
    const job = jobs[i++];
    await gen(...job);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
console.log('done');
