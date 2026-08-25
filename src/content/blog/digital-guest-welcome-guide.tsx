export default function DigitalGuestWelcomeGuideContent() {
  return (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300">
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Most "digital welcome books" aren't actually digital</h2>
      <p className="mb-6">Search Etsy for an Airbnb welcome guide and almost every result is the same thing wearing different colours: a Canva template exported to a PDF, sometimes with "interactive" or "clickable" in the title even though a guest still just opens a static file. It looks like an app. It behaves like a brochure.</p>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What "real" actually means here</h2>
      <p className="mb-6">The Digital Guest Welcome Guide is plain HTML, CSS and JavaScript — a real page a host deploys to a free static host (GitHub Pages, Netlify, Vercel or Cloudflare Pages all work) and shares as an actual URL or QR code. Check-in and check-out steps, WiFi, house rules, local recommendations, emergency contacts and an FAQ accordion all live on one scrollable, mobile-first page.</p>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">One file to edit, not nine</h2>
      <p className="mb-6">Every piece of a host's real information — property name, check-in code, WiFi password, house rules, local picks — lives in a single <code>site-config.js</code> file. A host never touches the HTML, CSS or JavaScript to rebrand it for their own property.</p>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Verified in a real browser, not just written</h2>
      <p className="mb-6">Before packaging this for sale, the page was loaded in an actual browser and checked for console errors (zero), tested for accessibility structure (the FAQ accordion uses native, screen-reader-friendly <code>&lt;details&gt;</code> elements, not a custom widget), clicked to confirm the accordion actually opens and closes, and screenshotted at both a 420px mobile width and a 1440px desktop width to confirm the layout holds up at both.</p>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">A quiet but real disclosure</h2>
      <p className="mb-6">Once deployed, this page is public — anyone with the link or QR code can view it, the same as any website. A host's WiFi password and check-in code are visible to a guest by design, but they're also visible to anyone else who has the link. That's worth knowing before deciding what to put in a guide like this, and it's the kind of detail that's easy to skip if a product is treated as "done" the moment the files exist.</p>
      <p className="mb-6"><a href="https://iederees-create.github.io/airbnb-guest-welcome-guide-template/" target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">See the live demo →</a></p>
    </div>
  );
}
