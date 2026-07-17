/**
 * @file tiling-contractor-website-template.tsx
 * @description Blog post: "How to Build a Tiling Contractor Website That Qualifies
 *              Leads Before They Call"
 * @project     Tiling Contractor Website Template
 * @author      Iedrees Francis — NextGenWebs, Cape Town, South Africa
 * @portfolio   https://iederees-create.github.io/3D-Portfolio/
 * @liveDemo    https://iederees-create.github.io/tableview-tiling-ct-ct/
 * @stack       HTML5, CSS3, JavaScript, GitHub Pages — zero external dependencies
 * @keywords    tiling contractor website template, tile calculator website,
 *              flooring contractor website, tiling business website South Africa,
 *              tile quote calculator, herringbone tile estimator,
 *              bathroom tiling website, tile project planner,
 *              HTML tiling website template, lead generation tiling
 */

const LIVE_DEMO_URL =
  'https://iederees-create.github.io/tableview-tiling-ct-ct/';

export default function TilingContractorWebsiteTemplateContent() {
  return (
    <>
      <div className="prose prose-invert prose-lg max-w-none text-slate-300">

        <h2
          id="the-problem-with-vague-enquiries"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          The "How Much?" Problem That Every Tiling Contractor Knows
        </h2>
        <p className="mb-6">
          Ask any tiling contractor what their most frustrating type of enquiry is and the answer
          is almost universal: the vague call or WhatsApp message that says nothing more than "how
          much to tile a bathroom?" No dimensions. No tile specification. No indication of whether
          the substrate is prepped, whether there is an existing floor to remove, whether they want
          herringbone or straight lay. Just: "how much?"
        </p>
        <p className="mb-6">
          Answering this question properly takes five minutes of back-and-forth that should never
          have been necessary. Answering it improperly — giving a ballpark without the information
          to justify it — creates expectations that the actual quote cannot meet. The contractor
          who prices conservatively loses the job to someone who quoted blind. The contractor who
          quotes aspirationally creates a difficult conversation on site when the reality of the
          job scope becomes clear. This is the "how much?" problem, and it is costing South African
          tiling contractors time, jobs, and margin every single week.
        </p>
        <p className="mb-6">
          The <strong>Tiling Contractor Website Template</strong> was built to solve this problem
          at the source — before the call is ever made. By embedding an intelligent, guided tile
          project planner directly into the contractor's website, potential clients arrive at the
          quote conversation with their own structured project summary in hand. The contractor gets
          structured data. The client gets an informed expectation. Everyone saves time and the
          quality of the lead improves dramatically.
        </p>

        <h2
          id="who-this-template-is-for"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          Who This Template Is For
        </h2>
        <p className="mb-6">
          This template was designed for <strong>tiling contractors</strong>,
          <strong> flooring specialists</strong>, bathroom renovators, and tile suppliers across
          South Africa and beyond who need a professional web presence that does more than just
          display contact details and a gallery. It is specifically built for the trades professional
          who:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-300">
          <li>Is currently getting enquiries that require multiple follow-up questions before they can even begin to price.</li>
          <li>Wants to stand out from competitors whose websites are simple brochure pages.</li>
          <li>Does not have a web development team and needs something maintainable by a non-technical person.</li>
          <li>Operates in a price-sensitive market where a clear, professional first impression can be the difference between winning and losing a quote request.</li>
          <li>Needs to be found by people searching for tiling services in their specific area — local SEO matters.</li>
        </ul>
        <p className="mb-6">
          The template is also designed to be a commercial product in its own right: a clean, fully
          documented codebase that a web developer can licence, white-label with a client's branding
          in under an hour, and deploy to GitHub Pages for free hosting. For a trades contractor
          market where many business owners are wary of monthly web-hosting fees, the zero-running-cost
          architecture is a significant selling point.
        </p>

        <h2
          id="the-tile-project-planner"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          The 8-Step Tile Project Planner: Intelligent Lead Qualification Built In
        </h2>
        <p className="mb-6">
          The centrepiece of the template is the <strong>8-step Tile Project Planner</strong> — an
          interactive, guided wizard that walks a potential client through every variable a tiling
          contractor needs to produce an informed quote. Each step is designed to collect exactly
          the information that changes the price, presented in plain language that does not assume
          any technical knowledge.
        </p>
        <p className="mb-6">
          <strong>Step 1: Project Type.</strong> Floor tiling, wall tiling, bathroom (floor plus
          walls), kitchen splashback, outdoor paving, or a custom combination. This single
          question changes which subsequent questions are relevant and which material calculations
          apply.
        </p>
        <p className="mb-6">
          <strong>Step 2: Dimensions.</strong> The planner supports single-room, multiple-room,
          wall-only, and floor-plus-wall measurement modes. Users enter dimensions in their
          preferred unit — metres, centimetres, feet, or inches — with automatic conversion handled
          transparently. For irregular rooms, the multi-zone input mode allows separate measurements
          to be combined. This step alone eliminates the most common cause of vague enquiries: the
          client who genuinely does not know how to measure their space for tile purposes.
        </p>
        <p className="mb-6">
          <strong>Step 3: Tile Size.</strong> A dropdown of common tile formats — 300×300mm,
          600×600mm, 600×1200mm, 900×900mm, 300×600mm, 200×100mm mosaic — with an option to
          specify a custom size. The selected tile format feeds directly into the material
          calculation engine.
        </p>
        <p className="mb-6">
          <strong>Step 4: Layout Pattern.</strong> This is where the calculator earns its keep.
          Straight lay, offset (brick pattern), herringbone, and chevron are all supported, with
          illustrated pattern previews. Critically, each pattern carries a different wastage
          coefficient: a straight lay on a regular room might need 10% wastage allowance;
          a 45-degree herringbone in an irregular bathroom might need 20% or more. The planner
          communicates this clearly so the client understands <em>why</em> pattern choice affects
          material cost.
        </p>
        <p className="mb-6">
          <strong>Step 5: Site Conditions.</strong> New construction, renovation (existing tiles to
          be removed), existing floor in good condition (overlay potential), or uncertain. These
          conditions affect the scope of work significantly and are captured here so the contractor
          knows what they are walking into.
        </p>
        <p className="mb-6">
          <strong>Step 6: Wastage Allowance.</strong> The system suggests a default wastage
          allowance based on the pattern and site conditions selected — but exposes the figure to
          the client with a plain-language explanation of what it covers (cuts, breakages, pattern
          matching, future replacements). Users can adjust the allowance upward if they prefer a
          larger safety margin. The tile count and box count are always rounded up to the next full
          box.
        </p>
        <p className="mb-6">
          <strong>Step 7: Instant Estimate.</strong> The planner outputs a material estimate:
          total area, tile quantity, number of boxes required, and an indicative material cost range
          based on a configurable price-per-box band (low, mid, premium). Alongside tiles, it
          provides indicative guidance on adhesive coverage, grout quantity, levelling compound
          requirements, and waterproofing membrane for wet areas. All of these figures are clearly
          labelled as <strong>non-binding indicative estimates</strong> — they are starting-point
          figures to help the client understand scale and budget, not a contractor quote.
        </p>
        <p className="mb-6">
          <strong>Step 8: Quote Summary Handoff.</strong> The final step generates a structured
          quote summary document from the planner inputs and results. The client can copy the
          summary to clipboard, print it, download it as a text file, send it via WhatsApp with a
          pre-populated message to the contractor's number, or send it via email with a
          pre-populated subject and body. Before any message is dispatched, a confirmation dialog
          summarises exactly what will be sent and to whom — building trust by showing the client
          their data before it goes anywhere.
        </p>

        <h2
          id="unit-conversion-and-calculation"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          The Calculation Engine: Accuracy as a Trust Signal
        </h2>
        <p className="mb-6">
          The material calculation engine behind the planner was built with deliberate care. South
          Africa operates on metric, but a significant portion of the renovation market — particularly
          in areas with older housing stock or clients who learned measurements in the imperial era
          — still thinks in feet and inches. The unit conversion system handles metres, centimetres,
          feet, and inches in both directions, rounding intermediate values appropriately to avoid
          compound floating-point drift.
        </p>
        <p className="mb-6">
          Tile box quantities are always rounded up to the nearest full box — a contractor never
          buys half a box. The wastage calculation applies a pattern-specific coefficient to the
          net area before the box rounding, which means the wastage is absorbed correctly in the
          calculation hierarchy. The adhesive and grout guidance uses standard South African
          coverage specifications per product category, surfaced as approximate quantities rather
          than precise volumes — because adhesive coverage varies by substrate, tooth size, and
          application technique in ways no online calculator can fully model.
        </p>
        <p className="mb-6">
          Every numerical output in the planner is accompanied by a tooltip or inline label
          explaining the assumption behind it. This transparency serves two purposes: it protects
          the contractor from a client who treats the indicative estimate as a fixed quote, and it
          educates the client about the genuine complexity of tiling material estimation —
          complexity that justifies paying a professional rather than attempting a DIY project
          based on back-of-napkin numbers.
        </p>

        <h2
          id="three-colour-themes"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          Design System: Three Themes, One Codebase
        </h2>
        <p className="mb-6">
          The template ships with three complete colour themes, selectable at deployment:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-300">
          <li>
            <strong>Limestone Studio:</strong> Warm off-whites, muted terracotta accents, and
            natural stone-inspired textures. Ideal for a boutique tile supplier or an artisan
            tiling contractor targeting the renovation and interior-design market.
          </li>
          <li>
            <strong>Charcoal Brass:</strong> Deep charcoal backgrounds with warm brass accents —
            a bold, contemporary palette suited to a contractor targeting high-end residential or
            commercial projects.
          </li>
          <li>
            <strong>Coastal Clay:</strong> Light sand tones, ocean-blue accents, and clean white
            space — appropriate for a contractor in a coastal market like Cape Town's Atlantic
            Seaboard or Garden Route.
          </li>
        </ul>
        <p className="mb-6">
          All three themes are driven by CSS custom properties scoped to a
          <code>data-theme</code> attribute on the root element — switching themes is a single
          attribute change, not a stylesheet swap. The system is designed so that a contractor or
          their developer can add a custom fourth theme by modifying a handful of variable
          declarations, without touching any component HTML or JavaScript.
        </p>

        <h2
          id="site-config"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          The site-config.js: Rebrand Without Touching HTML
        </h2>
        <p className="mb-6">
          A template is only as valuable as how quickly and completely it can be made to represent
          a new business. The <strong>central <code>site-config.js</code></strong> file contains
          every business-specific value in the template: business name, trading name, slogan,
          address, phone number, WhatsApp number, email address, service area, Google Maps embed
          URL, service descriptions, gallery image paths, theme selection, and the material cost
          bands used in the estimate calculator. Every instance of these values across the entire
          site — page titles, meta tags, contact sections, quote summary messages, WhatsApp
          pre-populate strings — is populated from this single config file at page load.
        </p>
        <p className="mb-6">
          The practical result: a developer deploying this template for a new tiling client edits
          one JavaScript object, swaps the gallery images, and has a fully personalised website
          ready for review. No Find-and-Replace across multiple HTML files. No risk of a business
          name appearing correctly in the header but incorrectly in the footer. The config is the
          single source of truth, and the template is the rendering layer.
        </p>

        <h2
          id="zero-dependencies"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          Zero External Dependencies: A Feature, Not a Limitation
        </h2>
        <p className="mb-6">
          The template has <strong>zero external dependencies</strong> — no CDN-loaded fonts, no
          third-party JavaScript libraries, no external CSS frameworks, no tracking scripts, no
          analytics beacons. Every byte of the running website is either served from the GitHub
          Pages origin or generated locally in the browser. This was a deliberate architectural
          choice, not a technical constraint, and it has real consequences for performance,
          reliability, and longevity.
        </p>
        <p className="mb-6">
          A CDN-hosted font can become unavailable — its serving domain deprecated, its licence
          expired, or its provider simply taken offline. A CDN-hosted library can introduce a
          breaking change in a minor version that corrupts behaviour years after deployment. A
          tracking script can trigger GDPR or POPIA consent requirements that the contractor's
          website has no mechanism to satisfy. By eliminating external dependencies entirely, the
          template guarantees that a website deployed today will render identically in five years
          with zero maintenance — an important consideration for a small business owner who is not
          paying a web developer to monitor dependency health.
        </p>
        <p className="mb-6">
          The fonts are embedded as optimised WOFF2 subsets. The SVG icons are inline. The
          JavaScript is vanilla — no jQuery, no frameworks, no build step required. The template
          is a directory of static files that can be uploaded anywhere, hosted anywhere, and
          maintained by anyone who can edit a text file.
        </p>

        <h2
          id="accessibility"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          Accessibility: A Business Website That Serves Everyone
        </h2>
        <p className="mb-6">
          Accessibility is often treated as an add-on for large corporate websites — something
          required by enterprise compliance teams that small business sites can ignore. This is a
          false economy. A tile contractor's website that cannot be navigated by a keyboard user,
          or that screen reader users cannot interpret, is excluding potential clients with
          disabilities — clients who have money, have projects, and will call the competitor whose
          website works.
        </p>
        <p className="mb-6">
          The template is built to WCAG 2.1 AA standards. All interactive elements — planner
          steps, input fields, action buttons, theme toggles — are keyboard navigable with visible
          focus states that are legible in all three colour themes. ARIA labels and roles are
          applied throughout the planner wizard so that screen reader users receive the same guided
          experience as sighted users. Colour contrast ratios meet AA thresholds in every theme.
          The confirmation dialog before message dispatch is keyboard dismissible and focus-trapped
          while open — so a keyboard-only user cannot accidentally confirm a WhatsApp send.
        </p>

        <h2
          id="local-seo"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          Local SEO: Being Found by the Right Client at the Right Moment
        </h2>
        <p className="mb-6">
          A great <strong>tiling contractor website</strong> that no one can find is a theoretical
          asset and a practical waste. The template's HTML structure is built with local SEO as a
          primary concern. Structured data markup (JSON-LD) for LocalBusiness and Service schema
          types is included and pre-populated from the site-config, ensuring that Google's crawlers
          understand not just that this is a business website, but what type of business it is,
          where it operates, and what services it offers.
        </p>
        <p className="mb-6">
          Service area pages — generated from the site-config's service-area list — give the site
          a landing page for each suburb or region the contractor serves, making it possible to
          rank for "tiling contractor Cape Town Southern Suburbs" and "tiling contractor Hout Bay"
          as distinct search queries without maintaining separate websites. The Tile Project Planner
          itself is an SEO asset: users searching for "herringbone tile calculator" or
          "tile box calculator South Africa" will find a tool that solves their immediate problem
          and introduces them to the contractor in a low-friction, high-value context.
        </p>

        <h2
          id="outcomes"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          What This Template Delivers for a Tiling Business
        </h2>
        <p className="mb-6">
          The measurable outcomes this template is designed to deliver are straightforward:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-300">
          <li>
            <strong>Better-qualified leads:</strong> Clients who have completed the planner arrive
            with their project scope documented, reducing the quote conversation from twenty minutes
            to five.
          </li>
          <li>
            <strong>Higher conversion rates:</strong> A client who has invested ten minutes in the
            planner is more committed to the project than one who fired off a WhatsApp to five
            contractors simultaneously.
          </li>
          <li>
            <strong>Professional differentiation:</strong> In a market where most tiling contractor
            websites are basic Facebook pages or three-page brochure sites, a tool-rich website
            positions the contractor as an expert, not just a labourer.
          </li>
          <li>
            <strong>Zero ongoing hosting cost:</strong> GitHub Pages hosting is free indefinitely,
            eliminating the monthly hosting fee that causes many small business websites to go
            offline when the owner forgets to renew a payment.
          </li>
          <li>
            <strong>Future-proof and maintainable:</strong> No dependency rot, no framework
            updates, no npm vulnerabilities. The site runs the same code the day it is deployed and
            the day it is reviewed five years later.
          </li>
        </ul>

        <h2
          id="cta"
          className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2"
        >
          See the Template Live — and Get Your Business Online
        </h2>
        <p className="mb-6">
          The Tiling Contractor Website Template is live and fully functional. You can work through
          the Tile Project Planner, explore all three colour themes, test the quote summary handoff,
          and see exactly what your potential clients would experience at{' '}
          <a
            href={LIVE_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-300 font-semibold"
          >
            the live demo
          </a>
          .
        </p>
        <p className="mb-6">
          If you are a tiling contractor, flooring specialist, or bathroom renovator who wants this
          template deployed with your branding, your service areas, and your contact details — I
          can have it live within days. If you are a web developer who wants to licence and
          white-label the template for your own clients, let's talk about that too. I am{' '}
          <strong>Iedrees Francis</strong>, founder of <strong>NextGenWebs</strong> in Cape Town,
          South Africa.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-300">
          <li>
            <strong>Email:</strong>{' '}
            <a
              href="mailto:iedereesfrancis@gmail.com"
              className="text-primary-400 hover:text-primary-300 font-semibold"
            >
              iedereesfrancis@gmail.com
            </a>
          </li>
          <li>
            <strong>WhatsApp:</strong>{' '}
            <a
              href="https://wa.me/27629494708"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-semibold"
            >
              +27 62 949 4708
            </a>
          </li>
          <li>
            <strong>Portfolio:</strong>{' '}
            <a
              href="https://iederees-create.github.io/3D-Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-semibold"
            >
              iederees-create.github.io/3D-Portfolio
            </a>
          </li>
        </ul>
        <p className="mb-6">
          Stop answering "how much?" cold. Let your website do the qualifying work — and let your
          calls start from a position of informed, structured, ready-to-convert enquiries.
        </p>

      </div>
    </>
  );
}
