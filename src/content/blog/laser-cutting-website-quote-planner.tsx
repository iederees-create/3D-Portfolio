/**
 * Case study for the Precision Laser Website Template and its Laser Cut &
 * Engraving Quote Planner. Facts in this article are drawn from the release
 * seller pack and verified media captures, not from speculative marketing
 * claims, so nothing here overstates what the tool actually does.
 */

const BASE = import.meta.env.BASE_URL;
const LIVE_DEMO_URL = 'https://iederees-create.github.io/precision-laser-works-template/';
const PROJECT_MEDIA = `${BASE}projects/precision-laser`;

const screenshotTour = [
  {
    src: `${PROJECT_MEDIA}/01-gallery.webp`,
    alt: 'Precision Laser Works template cover screen using the Graphite Laser theme',
    title: '1. A credible first impression',
    body: 'The homepage opens with a focused laser cutting and engraving offer, not a generic agency layout. That matters because the buyer needs to recognise the trade quickly before they trust the planner.',
  },
  {
    src: `${PROJECT_MEDIA}/02-gallery.webp`,
    alt: 'Desktop homepage screenshot of the Precision Laser Works website template',
    title: '2. Desktop layout for research-heavy buyers',
    body: 'Commercial buyers often compare suppliers on desktop. The full-width homepage gives them services, process cues, contact paths, and enough detail to keep evaluating the shop.',
  },
  {
    src: `${PROJECT_MEDIA}/03-gallery.webp`,
    alt: 'Mobile homepage screenshot of the Precision Laser Works website template',
    title: '3. Mobile layout for social traffic',
    body: 'The mobile capture shows the same offer compressed for visitors arriving from Instagram, Etsy, WhatsApp, or a saved link on their phone.',
  },
  {
    src: `${PROJECT_MEDIA}/04-gallery.webp`,
    alt: 'Laser Cut and Engraving Quote Planner empty form',
    title: '4. The quote planner starts the qualification',
    body: 'Instead of asking visitors to send a vague message, the planner asks for the service type, material, dimensions, complexity, file readiness, and finish.',
  },
  {
    src: `${PROJECT_MEDIA}/05-gallery.webp`,
    alt: 'Material, thickness, dimensions and quantity inputs inside the quote planner',
    title: '5. Material and measurement inputs make the brief usable',
    body: 'The planner captures the details a fabricator needs before a quote can move forward: material, thickness, width, height, unit, quantity, and finish.',
  },
  {
    src: `${PROJECT_MEDIA}/06-gallery.webp`,
    alt: 'File preparation checklist shown in the quote planner results',
    title: '6. File readiness gets treated as part of the sale',
    body: 'The file checklist helps buyers understand SVG, DXF, AI, PDF, DPI, unit matching, and whether design help may be needed before cutting starts.',
  },
  {
    src: `${PROJECT_MEDIA}/07-gallery.webp`,
    alt: 'Quote summary panel with area, quantity, complexity and budget range',
    title: '7. The result is a structured quote summary',
    body: 'The visitor gets area, quantity, complexity, missing information, file-prep guidance, and a preliminary budget range that is clearly labelled as guidance only.',
  },
  {
    src: `${PROJECT_MEDIA}/08-gallery.webp`,
    alt: 'WhatsApp and email confirmation modal before sending the quote summary',
    title: '8. The handoff is explicit',
    body: 'WhatsApp and email actions show a confirmation modal with the exact message first. Nothing sends automatically, which protects trust and avoids surprise actions.',
  },
  {
    src: `${PROJECT_MEDIA}/09-gallery.webp`,
    alt: 'Cyan Blueprint theme applied with the live theme selector',
    title: '9. Theme switching makes the template reusable',
    body: 'The live theme selector demonstrates how the same product can be adapted from Graphite Laser to Cyan Blueprint without rebuilding the whole site.',
  },
  {
    src: `${PROJECT_MEDIA}/10-gallery.webp`,
    alt: 'Included buyer guide screenshot for the Precision Laser Website Template',
    title: '10. The buyer guide supports implementation',
    body: 'The included guide explains setup, configuration, and handoff so the product is not just a nice screenshot pack. It is a usable digital product.',
  },
];

const storyAssets = [
  ['01-cover-story.png', 'Story cover for the Precision Laser Works template'],
  ['02-desktop-homepage-story.png', 'Instagram Story version of the desktop homepage'],
  ['03-mobile-homepage-story.png', 'Instagram Story version of the mobile homepage'],
  ['04-quote-planner-story.png', 'Instagram Story version of the quote planner'],
  ['05-material-measurement-inputs-story.png', 'Instagram Story version of material and measurement inputs'],
  ['06-file-prep-checklist-story.png', 'Instagram Story version of the file-preparation checklist'],
  ['07-quote-summary-story.png', 'Instagram Story version of the quote summary'],
  ['08-whatsapp-email-handoff-story.png', 'Instagram Story version of the WhatsApp and email handoff'],
  ['09-themes-configuration-story.png', 'Instagram Story version of the theme selector'],
  ['10-included-files-buyer-guide-story.png', 'Instagram Story version of the buyer guide'],
] as const;

function MediaFigure({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={`not-prose my-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full" />
      <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-slate-400">{caption}</figcaption>
    </figure>
  );
}

export default function LaserCuttingWebsiteQuotePlannerContent() {
  return (
    <>
      <div className="prose prose-invert prose-lg max-w-none text-slate-300">
        <p className="lead text-xl leading-relaxed text-slate-200">
          A good laser cutting website should do more than show finished jobs. It should help a buyer describe the job well enough that the shop can decide whether it is worth quoting. The Precision Laser Website Template was built around that idea: media, copy, planner logic, and handoff flow all point toward better quote requests.
        </p>

        <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-3xl font-bold text-white">10</div>
            <div className="mt-1 text-sm text-slate-400">real product screenshots used in the portfolio and listing media</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-3xl font-bold text-white">3</div>
            <div className="mt-1 text-sm text-slate-400">video formats: portfolio preview, Etsy listing video, narrated YouTube promo</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-3xl font-bold text-white">9:16</div>
            <div className="mt-1 text-sm text-slate-400">Instagram Story assets created from the same source media</div>
          </div>
        </div>

        <figure className="not-prose my-10 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
          <video
            controls
            playsInline
            preload="metadata"
            poster={`${PROJECT_MEDIA}/youtube-thumbnail.png`}
            className="aspect-video w-full bg-black"
          >
            <source src={`${PROJECT_MEDIA}/youtube-promo.mp4`} type="video/mp4" />
          </video>
          <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-slate-400">
            Narrated YouTube promo cut for the project. The article uses it near the top because video communicates the buyer journey faster than a static screenshot can.
          </figcaption>
        </figure>

        <h2 id="the-problem" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The problem: "how much to laser this?" with no material, size, or file</h2>
        <p className="mb-6">
          Most laser cutting and engraving shops field the same one-line enquiry over and over: a phone photo of a sketch, no material specified, no thickness, no quantity, and a file format that turns out to be a JPG logo sold as "ready to cut." Every one of those enquiries needs the same five or six qualifying questions answered before a quote is even possible.
        </p>
        <p className="mb-6">
          That is why the website has to do more than look professional. It has to guide the buyer into giving the shop the right information. The media in this article shows that flow step by step: homepage credibility, mobile usability, planner inputs, file readiness, quote summary, and handoff.
        </p>

        <MediaFigure
          src={`${PROJECT_MEDIA}/cover.webp`}
          alt="Precision Laser Website Template homepage hero showing the Graphite Laser theme"
          caption="The portfolio cover image establishes the product visually before the article gets into planner logic. This improves scanning, share previews, and reader retention."
        />

        <h2 id="interactive-tour" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Interactive media tour: the full buyer journey</h2>
        <p className="mb-6">
          The strongest version of the article uses media as evidence. Each screenshot answers one question a buyer or template customer might have: what does it look like, how does it work on mobile, what information does it collect, and what happens after the visitor completes the planner?
        </p>
      </div>

      <div className="not-prose my-10 grid grid-cols-1 gap-5">
        {screenshotTour.map((item, index) => (
          <article key={item.src} className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-[1.25fr_0.75fr]">
            <img src={item.src} alt={item.alt} loading={index < 2 ? 'eager' : 'lazy'} className="h-full w-full object-cover" />
            <div className="flex flex-col justify-center p-6">
              <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-300">Media proof point</span>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="prose prose-invert prose-lg max-w-none text-slate-300">
        <h2 id="the-approach" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The approach: a Laser Cut &amp; Engraving Quote Planner</h2>
        <p className="mb-6">
          The planner asks visitors to pick a service type, material, thickness, width and height in their choice of unit, quantity, cut complexity, file readiness, and finish. It then turns those answers into a structured summary that is much closer to a production brief than a vague social-media message.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-300">
          <li>approximate material area, unit-converted and quantity-multiplied</li>
          <li>a Low / Medium / High complexity indicator, with reasons</li>
          <li>service-specific checklist guidance</li>
          <li>file-preparation guidance for SVG, DXF, AI, PDF, image-only files, and missing artwork</li>
          <li>a configurable preliminary budget range</li>
          <li>a structured summary that can be copied, printed, downloaded, or handed off</li>
        </ul>

        <figure className="not-prose my-8 overflow-hidden rounded-3xl border border-white/10 bg-black">
          <video controls playsInline preload="metadata" poster={`${PROJECT_MEDIA}/video-poster.webp`} className="aspect-video w-full bg-black">
            <source src={`${PROJECT_MEDIA}/preview.mp4`} type="video/mp4" />
            <source src={`${PROJECT_MEDIA}/preview.webm`} type="video/webm" />
          </video>
          <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-slate-400">
            Portfolio preview video assembled from the real product screenshots. This gives the article a second media layer for visitors who want a quick scan before reading the technical details.
          </figcaption>
        </figure>

        <p className="mb-6">
          <a href={LIVE_DEMO_URL} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">Try the live demo →</a>
        </p>

        <h2 id="preliminary-vs-binding" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Preliminary guidance, not a binding quotation</h2>
        <p className="mb-6">
          The planner's budget range is calculated from editable rates and multipliers. It is <strong>not</strong> a quotation, an offer, or a contract. The exact wording appears inline on the planner section, in the generated summary text, and on a dedicated Quote Disclaimer page: "The planner provides preliminary guidance only. Final pricing depends on file quality, machine setup, material availability, job complexity, finishing, quantity, labour, delivery and final review."
        </p>
        <p className="mb-6">
          This is important for SEO and buyer trust. The article can rank for practical search intent around laser cutting quote requests without pretending that a static website can guarantee machine time, material stock, kerf, nesting efficiency, or final labour cost.
        </p>

        <h2 id="file-readiness" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why file readiness gets its own step</h2>
        <p className="mb-6">
          A laser shop cannot cut a JPG. The planner asks directly whether the visitor has a vector file ready, an image file only, needs design help, or has no file yet. The screenshot media makes that part of the product clear, which is better for both readers and search engines because the article is not only claiming a feature — it is showing the feature.
        </p>

        <h2 id="the-handoff" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The handoff: WhatsApp and email, with explicit confirmation</h2>
        <p className="mb-6">
          Once a visitor has a summary, they can copy it, print it, download it, or send it via WhatsApp or email. Every send action opens a confirmation dialog showing the exact outgoing message first. Nothing is sent automatically.
        </p>

        <figure className="not-prose my-8 overflow-hidden rounded-3xl border border-white/10 bg-black">
          <video controls playsInline preload="metadata" className="aspect-square w-full bg-black md:mx-auto md:max-w-xl">
            <source src={`${PROJECT_MEDIA}/etsy-listing-video.mp4`} type="video/mp4" />
          </video>
          <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-slate-400">
            Etsy listing video version. It is shorter and square because marketplace media has different constraints from a portfolio article or YouTube promo.
          </figcaption>
        </figure>

        <h2 id="social-media-assets" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Social media assets: turning the same build into story content</h2>
        <p className="mb-6">
          The seller pack also includes 9:16 Instagram Story versions. They matter because a product like this should not live only inside the article. The same proof points can become story slides, launch posts, Pinterest pins, and short-form video frames that drive readers back to the blog and demo.
        </p>
      </div>

      <div className="not-prose my-10 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex gap-4 min-w-max">
          {storyAssets.map(([filename, alt]) => (
            <figure key={filename} className="w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black">
              <img src={`${PROJECT_MEDIA}/stories/${filename}`} alt={alt} loading="lazy" className="aspect-[9/16] w-full object-cover" />
            </figure>
          ))}
        </div>
      </div>

      <div className="prose prose-invert prose-lg max-w-none text-slate-300">
        <h2 id="seo-value" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why media improves the SEO value of the article</h2>
        <p className="mb-6">
          Media helps this post rank and convert because it gives the page more useful context. The article can target phrases such as laser cutting website template, laser engraving quote planner, quote request form for laser cutting, WhatsApp quote handoff, and digital product website template while backing those terms with real screenshots, descriptive alt text, video, captions, and an article structure that answers buyer questions.
        </p>
        <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-bold text-white">Better reader retention</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">Videos and screenshot cards break up the long article and help readers understand the flow without reading every paragraph first.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-bold text-white">Better semantic coverage</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">Alt text, captions, headings, and feature explanations reinforce the same topic from different angles without keyword stuffing.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-bold text-white">Better conversion proof</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">Readers can see the planner, summary, mobile page, handoff modal, and buyer guide instead of taking the article's claims on trust.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-bold text-white">Better repurposing</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">The same article assets support YouTube, Instagram Stories, Etsy media, Pinterest, and future launch emails.</p>
          </div>
        </div>

        <h2 id="what-this-does-not-claim" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">What this does not claim</h2>
        <p className="mb-6">
          The planner does not send messages on its own, does not store or submit data to any server, and does not include hosting or a domain. It also does not claim machine wattage, safety certifications, material availability, or guaranteed turnaround. The value is narrower and more practical: a static website template that gives a laser shop a better way to collect quote information.
        </p>

        <h2 id="try-it" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">See it built</h2>
        <p className="mb-6">
          The full build is written up in the{' '}
          <a href={`${BASE}work/precision-laser-website-template/`} className="text-primary-400 hover:text-primary-300 font-semibold">Precision Laser Website Template case study</a>{' '}
          on this portfolio, alongside the{' '}
          <a href={LIVE_DEMO_URL} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">live demo</a>.
        </p>
      </div>
    </>
  );
}
