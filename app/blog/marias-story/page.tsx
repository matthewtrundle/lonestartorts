import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Maria\'s Story: Heart of Our Tortillas',
  description: 'Meet Maria, whose passion for authentic tortilla-making transforms simple ingredients into culinary tradition. A journey from her grandmother\'s kitchen in Monterrey to Texas.',
  keywords: 'tortilla maker story, authentic tortillas, Mexican food culture, family recipes, traditional cooking, Maria tortilla maker',
  alternates: {
    canonical: 'https://lonestartortillas.com/blog/marias-story',
  },
  openGraph: {
    title: 'Maria\'s Story: The Heart of Lonestar Tortillas',
    description: 'The inspiring story of a passionate tortilla maker keeping family traditions alive.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Maria\'s Story: The Heart of Lonestar Tortillas',
  description: 'Meet Maria, whose passion for authentic tortilla-making transforms simple ingredients into culinary tradition.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-10-24',
  dateModified: '2025-10-25',
  articleSection: 'People & Stories',
};

export default function MariasStoryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6">
            <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: "Maria's Story" },
            ]}
            />
            <div className="flex items-center gap-2 text-sunset-400 text-sm mb-3 mt-4">
              <span className="px-3 py-1 bg-sunset-900/20 rounded-full">People</span>
              <span>•</span>
              <span>October 24, 2025</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Maria&apos;s Story: The Heart of Lonestar Tortillas</h1>
            <p className="text-cream-300 mt-4 text-lg">How one woman&apos;s passion for tradition transforms flour, corn, and love into the perfect tortilla</p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/blog-marias-story.webp"
              alt="Grandmother hands making traditional tortillas in Mexican kitchen"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>



        <article className="container mx-auto px-6 py-12 max-w-3xl">
          <LastUpdated date="2025-10-25" />

          <div className="prose prose-lg max-w-none">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-charcoal-800 italic">
                &quot;The smell of fresh masa takes me right back to my grandmother&apos;s kitchen in Monterrey. Every morning, that warm corn scent would wake me up better than any alarm clock. That&apos;s when I knew—this is what I was meant to do.&quot; — Maria Rodriguez
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Beginning</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Maria Rodriguez didn&apos;t choose tortillas—tortillas chose her. At five years old, she stood on a wooden stool in her grandmother&apos;s kitchen in Monterrey, Mexico, pressing her tiny hands into warm masa dough. Her abuela, Guadalupe, would guide her palms in slow circles, teaching her to feel when the dough was ready.
                </p>
                <p>
                  &quot;Not too wet, mija,&quot; Guadalupe would say. &quot;And not too dry. The masa will tell you when it&apos;s right. You just have to listen.&quot;
                </p>
                <p>
                  That lesson—learning to listen to the food—became Maria&apos;s philosophy. Over the next forty years, it would guide her from a small kitchen in northern Mexico to running her own tortilla operation in Texas, where she now produces thousands of authentic tortillas that grace tables from San Antonio to Houston.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Learning the Old Ways</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Guadalupe&apos;s kitchen was Maria&apos;s first classroom. Every morning before dawn, her grandmother would start the nixtamalization process—soaking dried corn kernels in limewater, a tradition dating back 3,500 years to the ancient Maya and Aztec civilizations.
                </p>
                <p>
                  &quot;My grandmother explained that the lime wasn&apos;t just for softening the corn,&quot; Maria recalls. &quot;It released nutrients, made the corn grind easier, and gave the tortillas that special flavor and aroma. She called it &apos;waking up the corn.&apos;&quot;
                </p>
                <p>
                  By age twelve, Maria could judge the perfect nixtamal by sight and touch. She learned to adjust for humidity, temperature, and even the variety of corn. Each type—white, yellow, blue—had its own personality, its own story to tell.
                </p>
                <p>
                  But corn tortillas were only half the story. Maria&apos;s mother taught her the art of flour tortillas—the softer, more pliable cousin that Texas had embraced as its own. Flour tortillas required different skills: the right kneading technique, perfect resting time, and the ability to roll them thin without tearing. Where corn tortillas were about tradition and patience, flour tortillas were about touch and timing.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Coming to Texas</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  In 1998, Maria moved to Texas with her husband and two young children. She found work at a local tortilla factory, quickly rising from production line to quality control supervisor. But something felt wrong.
                </p>
                <p>
                  &quot;They were making ten thousand tortillas an hour,&quot; she says. &quot;But they didn&apos;t smell right. They didn&apos;t taste right. The dough was mixed by machines that didn&apos;t know how to listen. I would go home at night and make tortillas for my family the way my grandmother taught me, just to remember what they should taste like.&quot;
                </p>
                <p>
                  Word spread in her San Antonio neighborhood. Friends would stop by for fresh tortillas. Then friends of friends. Maria started selling dozens at the local farmers market on weekends. Within a year, she had quit her factory job and was making tortillas full-time from her home kitchen, newly licensed and inspected.
                </p>
                <p>
                  &quot;My husband thought I was crazy,&quot; she laughs. &quot;We had steady income, health insurance. But I told him: I can&apos;t make tortillas that I wouldn&apos;t feed to my own family. If I&apos;m going to do this, I have to do it right.&quot;
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Lonestar Way</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Today, Maria oversees a team of eight tortilla makers, each hand-trained in her methods. While the operation has grown, the philosophy hasn&apos;t changed: quality over quantity, tradition over shortcuts, and always—always—listen to the masa.
                </p>
                <p>
                  &quot;I teach my team the same way my grandmother taught me,&quot; Maria explains. &quot;We use a press for efficiency, but the dough is still hand-mixed. We cook on a hot comal, not a conveyor belt. Every batch is tested by hand. If it doesn&apos;t meet my standard, it doesn&apos;t go out the door.&quot;
                </p>
                <p>
                  Her corn tortillas are made from nixtamalized corn she sources from trusted suppliers who understand the importance of the process. Her flour tortillas use simple ingredients: flour, water, lard, salt. No preservatives, no shortcuts.
                </p>
                <p>
                  &quot;People ask me why I use lard instead of vegetable shortening,&quot; she says. &quot;I tell them: because that&apos;s how my mother made them. That&apos;s how my grandmother made them. And they were perfect. Why would I change perfection?&quot;
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Passing It Forward</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Maria&apos;s daughter, Isabel, now works alongside her mother, learning the same lessons Maria learned decades ago. When asked if she feels pressure to modernize, to scale up production with machines and automation, Maria shakes her head.
                </p>
                <p>
                  &quot;There&apos;s a place for big operations,&quot; she says. &quot;But this is about more than feeding people. It&apos;s about connecting them to something real. When someone tastes my tortillas, I want them to taste my grandmother&apos;s kitchen. I want them to taste tradition. You can&apos;t get that from a machine.&quot;
                </p>
                <p>
                  Every morning, Maria still arrives at 5 AM. She starts the nixtamalization process, checks the masa consistency, and makes the first batch herself. It&apos;s her ritual, her way of honoring the women who came before her and ensuring the women who come after her understand what authentic really means.
                </p>
                <p>
                  &quot;My grandmother used to say that a good tortilla is like a good conversation—it brings people together,&quot; Maria reflects. &quot;That&apos;s what I&apos;m making every day. Not just food, but connection. Not just tortillas, but memories.&quot;
                </p>
              </div>
            </section>

            <div className="bg-charcoal-50 p-6 rounded-lg mt-12">
              <p className="text-charcoal-800 text-center italic">
                The tortillas you enjoy from Lonestar Tortillas carry Maria&apos;s passion, her grandmother&apos;s wisdom, and generations of tradition. Every bite connects you to this story—and to the countless stories of families gathered around tables, sharing meals made with love.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal-200">
            <div className="flex items-center justify-between">
              <Link href="/blog" className="text-sunset-600 hover:text-sunset-700 font-semibold">
                ← Back to Blog
              </Link>
              <Link href="/shop" className="bg-sunset-500 hover:bg-sunset-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Try Our Tortillas
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
