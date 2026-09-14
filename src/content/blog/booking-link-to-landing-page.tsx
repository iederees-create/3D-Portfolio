import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function BookingLinkToLandingPageContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        A booking link works. It is also not a website. If the only thing a customer can find about your business is a bare Calendly or Square Appointments URL, you are asking them to book blind - no services, no prices, no proof this is a real, current business. This is how to close that gap without building a full site or paying for a page-builder subscription.
      </p>

      <AffiliateDisclosure />

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">When a Booking Link Alone Isn't Enough</h2>
        <p>
          A raw booking link is fine for people who already know you - a returning client, a referral who was told exactly what to expect. It falls apart for everyone else. Paste a bare <code>calendly.com/yourname</code> link into an Instagram bio or a Google Business Profile and a new visitor has no way to answer basic questions before committing time to a calendar screen: What do you actually offer? What does it cost? Where are you? Is this even the right business?
        </p>
        <p className="mt-4">
          That hesitation shows up as drop-off, not complaints - people simply don't book, and you never hear why. A landing page in front of the booking link removes the guesswork: it answers the obvious questions in the ten seconds before someone decides whether to click through to your calendar at all.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">What a Visitor Needs to See Before They'll Book</h2>
        <p>In roughly the order they need it:</p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li><strong>What you do, in one line.</strong> Not a slogan - a plain description of the service.</li>
          <li><strong>Who you are.</strong> A name, a photo, or a short line of credibility - enough to confirm a real person or business is behind the page.</li>
          <li><strong>What it costs, or a clear reason it isn't listed.</strong> Even a "from R250" range answers the question that otherwise gets asked in a DM instead of a booking.</li>
          <li><strong>Where and when.</strong> Address or service area, and hours - especially for anything in-person.</li>
          <li><strong>Answers to the two or three questions everyone asks.</strong> A short FAQ removes friction that would otherwise become a pre-booking message.</li>
          <li><strong>One obvious way to book.</strong> A single, unmissable button - not three competing calls to action.</li>
        </ul>
        <p className="mt-4">
          Notice what isn't on that list: testimonials, a star rating, a client counter. Those are common on landing page templates, and also the easiest thing to fake or pad with invented numbers. If you don't have real, permission-cleared reviews yet, leave the section out rather than filling it with placeholder praise - a specific, honest page about what you actually offer earns more trust than a generic one padded with invented social proof.
        </p>
        <p className="mt-4">
          There's also an ordering principle worth naming directly: everything above should be scannable in under thirty seconds on a phone, without a single tap. A visitor deciding whether to trust a business they've never heard of is not going to read paragraphs - they're going to skim headings, a price, and a button. Write for that skim first, and let anyone who wants more detail keep scrolling into the fuller About or FAQ sections further down.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">A Worked Example: Riverside Wellness Massage</h2>
        <p>
          Riverside Wellness Massage is a fictional single-therapist massage practice, used here to make the advice concrete rather than abstract. Riverside uses Square Appointments for scheduling, but for months the only thing anywhere online was the raw Square booking link, pasted into an Instagram bio.
        </p>
        <p className="mt-4">Here's what a landing page fixes for that specific business:</p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li><strong>Hero:</strong> "Riverside Wellness Massage - Therapeutic massage in Muizenberg, by appointment" with one "Book an appointment" button, above the fold, before anything else.</li>
          <li><strong>Services:</strong> Swedish Massage (60 min, R450), Deep Tissue (60 min, R550), Add-on Hot Stones (+R100) - three lines, not a paragraph.</li>
          <li><strong>About:</strong> Two sentences - years practising, what a first session involves - not a biography.</li>
          <li><strong>Hours &amp; location:</strong> Tuesday-Saturday, 09:00-17:00, with the suburb (not the exact home-studio address, for a home-based practitioner's privacy).</li>
          <li><strong>FAQ:</strong> "What should I wear?", "What if I need to cancel?", "Do you treat pregnancy massage?" - the three questions Riverside actually gets asked before every new booking.</li>
        </ul>
        <p className="mt-4">
          None of that requires a scheduling system of its own - it all sits in front of the existing Square Appointments link, which stays the single source of truth for actual availability.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Mobile Layout and Where the Booking Button Actually Belongs</h2>
        <p>
          Most people will land on this page from a phone - a bio link, a Google search, a QR code on a flyer - so the booking button placement matters more than almost anything else on the page. Two positions do the real work:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li><strong>Above the fold</strong>, right under the business name and one-line description - for the visitor who already knows they want to book and is just looking for the button.</li>
          <li><strong>A sticky bar at the bottom of the screen</strong> on mobile, present the whole time someone is reading - for the visitor who's scrolling through services or FAQs first and shouldn't have to scroll back up once they've decided.</li>
        </ul>
        <p className="mt-4">
          A header button crammed in next to a long business name on a narrow screen is a common way this goes wrong - it either wraps awkwardly or gets visually cut off. The more reliable fix is to drop the header CTA on small screens entirely and rely on the sticky bottom bar, which has more width to work with and stays out of the way of the content above it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Services, Pricing, Location and FAQs - What to Include, What to Leave Out</h2>
        <p>
          Prices are the section owners hesitate on most, usually for one of two real reasons: prices vary per job (common for trades and repairs), or the owner worries a fixed number will scare off a call that could have been negotiated. Both are legitimate - the fix isn't to hide pricing, it's to be honest about the shape of it: a "from" price, a range, or an explicit "price on request after a quick chat" line. Any of these beats silence, because silence reads as "we don't want to say," not as "prices vary."
        </p>
        <p className="mt-4">
          For location: a full street address makes sense for a shop or studio people walk into. For a mobile or home-based service, a service area (suburbs, a radius, "serving the southern peninsula") protects privacy while still answering the "do you even come to me" question.
        </p>
        <p className="mt-4">
          For FAQs: write the actual questions you get asked, not generic template filler. If you can't think of three, that's a sign to ask a few recent customers what they wondered before booking - their exact words become your FAQ section.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Choosing a Booking Provider, If You Don't Already Have One</h2>
        <p>
          This kit deliberately doesn't include its own scheduling system - it links to one you already run, because building and maintaining a real booking backend (availability, time zones, reminders, cancellations) is a different, much larger project than a landing page. If you're starting from zero, a few well-known options and what they're generally known for:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li><strong>Calendly</strong> - simple appointment scheduling with a free tier; this kit's optional inline-calendar embed is built specifically for Calendly's officially documented embed method.</li>
          <li><strong>Square Appointments</strong> - scheduling bundled with Square's point-of-sale and payments, a natural fit if you already take card payments through Square.</li>
          <li><strong>Acuity Scheduling</strong> - more configurable booking rules and intake forms, aimed at service businesses with more complex availability.</li>
          <li><strong>SimplyBook.me / Setmore</strong> - broader small-business scheduling tools with their own booking-page features.</li>
        </ul>
        <p className="mt-4">
          Whichever you pick, this kit only needs one thing from it: a plain <code>https://</code> link to your booking page. Confirm that link works on its own, in a fresh incognito tab, before wiring it into a landing page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Tutorial: Building the Page With the Booking Landing Page Kit</h2>
        <p>
          This is the actual workflow, using the <a href="https://iederees-create.github.io/booking-landing-page-kit/customiser/" target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">Booking Landing Page Kit customiser</a>:
        </p>
        <ol className="list-decimal list-inside space-y-2 mt-3">
          <li>Open the customiser in any browser - nothing to install, nothing uploaded anywhere; it runs entirely in that browser tab.</li>
          <li>Pick the closest starting point (barber/salon, consultant/coach, or local service) or start from a blank form.</li>
          <li>Fill in business name, tagline, and an accent colour - the live preview on the right updates as you type.</li>
          <li>Paste your real booking link. The Download button stays disabled until this is a valid <code>https://</code> address - a deliberate guardrail against publishing a page with a dead booking button.</li>
          <li>Add services and prices (or turn pricing off), hours, address, and two or three real FAQs.</li>
          <li>Turn off the "demonstration business" banner - the single easiest step to forget.</li>
          <li>Click Download. You get one finished, self-contained <code>index.html</code> file - that file is the entire website.</li>
        </ol>
        <p className="mt-4">
          See the <a href="/work/booking-landing-page-kit/" className="text-primary-400 hover:text-primary-300 font-semibold">Booking Landing Page Kit project page</a> for the full case study, or try all three live demo variants directly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Hosting and Domain Considerations</h2>
        <p>
          Because the finished page is a single static HTML file, it doesn't need a server, a database, or a monthly app subscription - any static host will serve it. Free-tier options worth knowing (terms and limits change, so check each provider's current pricing before committing): GitHub Pages (free for public repositories, good if you're already comfortable with GitHub), Netlify and Vercel (both support literally dragging the file onto a dashboard for an instant live URL), and Cloudflare Pages (direct upload, no Git required).
        </p>
        <p className="mt-4">
          A custom domain (yourbusiness.com instead of a subdomain) is optional and can be added later through any of the above once you're ready to pay for the domain itself - none of this locks you into one host.
        </p>
        <p className="mt-4">
          All four options issue HTTPS automatically once a domain is connected, which matters for two practical reasons: visitors on mobile browsers increasingly get warned off plain HTTP sites, and some booking providers' embed features simply won't load on an insecure page. You don't need to configure this yourself - it comes with the free tier on every option listed here.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Accessibility, Privacy and Analytics</h2>
        <p>
          A booking page that only works for mouse users quietly turns away keyboard and screen-reader visitors, so this matters beyond compliance box-ticking: real semantic headings, a skip-to-content link, visible focus outlines that are never stripped out, and an FAQ accordion built from real buttons with correct <code>aria-expanded</code> state rather than styled <code>div</code>s a screen reader can't interpret.
        </p>
        <p className="mt-4">
          On privacy: the kit itself collects nothing - there's no contact form and no backend, so there's no visitor data to secure or leak in the first place. If you want analytics (basic visit counts, not invasive tracking), that's a choice you add yourself with a privacy-conscious tool, and it's worth disclosing on the page if local privacy expectations call for it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Optional: Automating What Happens After Someone Books</h2>
        <p>
          The landing page's job ends at the booking button - what happens after someone books is between the visitor and your booking provider. If you want something to happen automatically once a new booking lands (a confirmation text, a row added to a spreadsheet, a Slack notification), that's a job for an automation tool sitting on top of your booking provider, not something this static kit builds itself - the two are worth keeping conceptually separate.
        </p>
        <p className="mt-4">
          <a href="https://www.make.com/en/register?pc=nextgenwebs2026" target="_blank" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">Make</a> is one option for this, and it's genuinely relevant here because Calendly is one of its natively supported trigger apps - a "new Calendly booking" trigger can fan out to a spreadsheet, a notification, or a CRM without you writing code. If your booking provider isn't a supported Make trigger, this approach simply won't apply - check your specific provider's integration support before assuming it works, rather than after.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Optional: A Short Voice Intro</h2>
        <p>
          For a consultant or coach page especially, a short spoken intro can do something text alone can't - let a visitor hear the person they'd be booking with before committing to a call. This is genuinely optional and only worth doing if it fits the business: a barber shop rarely needs one, a coaching practice sometimes benefits from one.
        </p>
        <p className="mt-4">
          If you want one but don't want to record it yourself, <a href="https://try.elevenlabs.io/fb6nmetrrxow" target="_blank" rel="sponsored noopener" className="text-sky-400 hover:underline">ElevenLabs</a> can generate a short AI voiceover from a script you write - useful for a 20-30 second intro clip, not something this kit requires or assumes you'll use.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Optional: Capturing People Who Aren't Ready to Book Yet</h2>
        <p>
          Not every visitor is ready to book on their first visit - some want to think it over, or want a reminder before a seasonal service. If you want a simple, consent-based way to capture that ("get 10% off your first booking" or a seasonal reminder list), a lightweight marketing tool with its own opt-in page is the right layer for that, kept separate from the booking landing page itself.
        </p>
        <p className="mt-4">
          <a href="https://systeme.io/?sa=sa0281022468eb30b58bf030d6588013c2783110a0" target="_blank" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">Systeme.io</a>'s free plan covers this well for a small business - an opt-in page and a follow-up email or two - without adding cost. This is entirely optional and unrelated to the kit's own booking button, which never collects any visitor data itself.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Common Mistakes</h2>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li><strong>Multiple competing buttons</strong> - "Book Now", "Call Us", "Message Us" all fighting for attention instead of one clear primary action.</li>
          <li><strong>A booking link that's gone stale</strong> - pointing to an old calendar, a cancelled account, or a provider you switched away from months ago.</li>
          <li><strong>Fabricated reviews or client counts</strong> - "500+ happy clients" with no evidence is a credibility risk, not a credibility boost, the moment anyone looks closely.</li>
          <li><strong>A contact form that goes nowhere</strong> - a form with no working backend quietly loses every message submitted through it; a mailto/tel link that definitely works beats a form that might not.</li>
          <li><strong>Forgetting the demo banner</strong> - publishing a real business page that still says "DEMONSTRATION BUSINESS" at the top.</li>
          <li><strong>Never testing the live booking button</strong> - checking it locally isn't the same as clicking it on the actual published URL, on an actual phone.</li>
          <li><strong>Burying the price behind a "contact us for a quote"</strong> when a rough range would have been just as honest and far less friction - reserve "quote on request" for work that genuinely can't be estimated without seeing it.</li>
          <li><strong>Treating the page as finished forever</strong> - hours change, prices change, booking providers get switched. A page that's never updated after publishing slowly drifts from true, and the fix (re-open the customiser, change the field, download and re-upload) takes minutes.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Testing Before You Publish</h2>
        <p>
          A few minutes of testing catches almost everything that goes wrong with a page like this, and none of it requires special tools:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li>Click every booking button on the page - header, hero, mid-page section, and the mobile sticky bar - and confirm each one lands on your real booking page, not a placeholder.</li>
          <li>Open the page on an actual phone, on mobile data rather than wifi, since that's closer to how most visitors will actually arrive.</li>
          <li>Tab through the page using only the keyboard (no mouse) and confirm you can reach and activate the booking button, and open an FAQ answer, without getting stuck.</li>
          <li>Read every line of your own text once more, slowly - a customiser can't catch a typo in your business name or a wrong phone number.</li>
        </ul>
        <p className="mt-4">
          This matters more than it sounds like it should, because the failure mode here is silent: a broken booking link doesn't throw an error anyone sees, it just quietly loses bookings until you happen to test it yourself or a customer mentions it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">What This Kit Does and Doesn't Include</h2>
        <p>
          It includes three editable page variants, an in-browser customiser, a shared template source for buyers comfortable editing code, and setup/deployment/accessibility guides. It does not include a booking or scheduling backend, payment processing, a working contact form, or stock photography - and it is not a WordPress theme or plugin (it's static HTML/CSS/JS; a WordPress site can link to it, or in some cases embed it via a Custom HTML block, but that's a workaround, not a built and tested WordPress installation path).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">DIY Versus Paid Setup</h2>
        <p>
          The kit itself is built for a comfortable DIY path - if you can fill in a form and click download, you can publish this page yourself in well under an hour, and the deployment guide walks through several free hosting options. The kit is priced as a one-time digital download rather than a subscription, which suits a business that just needs one page done and left alone.
        </p>
        <p className="mt-4">
          For business owners who'd rather hand off the whole job, a tightly scoped setup service - your branding and content applied, your real booking link wired in, one round of revisions, published to a host of your choice - is a reasonable paid alternative to doing it yourself. The scope is deliberately narrow: it's the same kit, professionally filled in and deployed for you, not a custom-built website from scratch, and pricing it that way keeps the turnaround fast rather than open-ended. See the project page for current details on that option.
        </p>
      </section>

      <p className="pt-4 border-t border-white/10">
        Try the three live demo variants and the customiser on the <a href="/work/booking-landing-page-kit/" className="text-primary-400 hover:text-primary-300 font-semibold">Booking Landing Page Kit project page</a>, or go straight to the <a href="https://iederees-create.github.io/booking-landing-page-kit/" target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">live demo site</a>. For a related digital product built the same way, see the <a href="/blog/etsy-seller-seo-toolkit" className="text-primary-400 hover:text-primary-300 font-semibold">Etsy Seller SEO Toolkit</a> or the <a href="/blog/digital-guest-welcome-guide" className="text-primary-400 hover:text-primary-300 font-semibold">Digital Guest Welcome Guide</a>.
      </p>
    </div>
  );
}
