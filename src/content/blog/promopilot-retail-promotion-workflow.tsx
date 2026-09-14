import { AFFILIATE_LINKS } from '../../config/affiliates';

const sections = [
  {
    id: 'repetition', heading: 'The quiet cost of recreating the same offer',
    paragraphs: [
      'A shop promotion is rarely just one graphic. A weekly special might need a window poster, a square social post, a wide screen slide, and a version with a different end date. If each starts from scratch, the owner retypes the product name, price, offer terms and dates several times. Every copy is a chance to introduce a typo or leave yesterday’s price on one channel.',
      'The practical problem is not that every small business needs more software. It is that product facts are scattered between a till, a spreadsheet, a supplier message, a photo folder and someone’s memory. The useful first step is to put the facts in one clean source list, then make each communication from that list. Design tools help only after the offer itself is clear.',
      'This guide uses a café-and-bakery counter as a worked example because rotating drinks and bakes make the repeated-update problem easy to see. It is a niche hypothesis for a possible PromoPilot launch, not a claim that Etsy search data proves demand. Etsy search results reviewed for this project showed many editable café promotion and social-template products, including low-priced single designs. Those are adjacent substitutes, not direct comparisons to tested software.'
    ]
  },
  {
    id: 'example', heading: 'A small worked example—with fictional numbers',
    paragraphs: [
      'Imagine a fictional neighbourhood café promoting a “Citrus cold brew + lemon loaf” weekend bundle. For illustration only, suppose the regular prices are R48 and R38 and the bundle offer is R72. The offer runs from Friday 12:00 to Sunday 16:00, while stock lasts. Those prices, dates and the business are invented; use your own verified till prices and approved terms in real material.',
      'The café needs a portrait counter poster, a square feed graphic, and a 16:9 slide for a television behind the till. It also wants the same name, price, currency, logo and end date everywhere. A simple record might contain product name, short display name, regular price, offer price, currency, unit, promotion start and end, and image filename. Add a note such as “while stocks last” only if the business can honour it.',
      'One record does not magically guarantee that every file updates later. A downloaded PNG or video is a snapshot. If the price changes, the owner must edit the source record and export fresh files, then replace each copy where it was posted. A reliable workflow includes a final price/date check before publishing and a removal reminder when the offer ends.'
    ]
  },
  {
    id: 'catalogue', heading: 'Prepare a clean product catalogue before designing',
    paragraphs: [
      'Start with a spreadsheet or CSV that has one header row and one product per row. Use stable columns such as sku, name, short_description, price, currency, unit, image_filename, promo_price, promo_start and promo_end. Keep one product’s facts in one row. Avoid merged cells, totals rows, decorative titles above the headings, and multiple prices in one field; they make import and review harder.',
      'Use names that a customer recognises, not internal abbreviations. “Lemon loaf slice” is more useful on a poster than “LL-SL”. Use a consistent decimal convention in the source file and verify the visible currency symbol and separators in the selected display locale. For weighed goods, label the unit clearly—per 100 g, per kilogram, or each—so a prominent price does not become misleading.',
      'Prepare images you own or are licensed to use. Crop toward the product, keep the subject legible at small sizes, and avoid supplier packaging that implies a brand partnership you do not have. A filename column can help connect a catalogue row to a local image, but it should not contain private customer data. Keep a backup before bulk imports and inspect several rows after import rather than assuming a successful message means every field mapped correctly.'
    ]
  },
  {
    id: 'one-record', heading: 'Use one promotion brief across three placements',
    paragraphs: [
      'Write the offer as a short brief before opening a design canvas: “Citrus cold brew and lemon loaf bundle, R72, Friday noon through Sunday close, while stocks last.” Then decide which words must be largest. Usually it is the product or offer name and the price. Dates, units and conditions should remain readable, not buried in tiny legal-looking text.',
      'For a poster, choose a portrait composition with one product image, a strong headline, a price block and clear terms. Print a test at the intended physical size and view it from the distance a customer will stand. Do not rely on a browser preview to prove print sharpness. The PromoPilot brief lists an A4-shaped 1240 × 1754 canvas; at that pixel dimension it is not a verified 300-DPI A4 export, so this release must not advertise “300 DPI” or promise professional print resolution.',
      'For a square social post, simplify rather than shrinking the whole poster. Reduce secondary copy, keep the price large, and check that the image crops safely in the platform preview. For a screen slide, use a 16:9 layout such as 1920 × 1080, high contrast, and fewer words. A promotion viewed across a room needs simpler hierarchy than a phone graphic held close.'
    ]
  },
  {
    id: 'brand', heading: 'Keep the brand consistent without making every graphic identical',
    paragraphs: [
      'A small brand kit can fit on one page: logo files, one dark and one light background, two type styles, a primary and accent colour, preferred photo treatment, and the words the business uses for its tone. Record how prices are written and whether tax, weight or “from” wording needs to appear. This saves time and prevents a seasonal colour choice from erasing the shop’s identity.',
      'Consistency is not repetition for its own sake. A screen slide can have a large type scale and restrained copy; a poster can provide more detail; a social post can make the product photo feel personal. The consistent elements are the offer facts, logo, colour logic and typography—not necessarily identical placement.',
      'Check contrast and legibility in context. Do not communicate “sale” with colour alone. Avoid decorative fonts for numerals and product terms. If a graphic is shared online, add meaningful alternative text in the publishing platform where available; for example, “Weekend café bundle: citrus cold brew and lemon loaf for R72, Friday to Sunday.” Alternative text should describe the actual image, not stuff search terms.'
    ]
  },
  {
    id: 'screen-video', heading: 'Print dimensions, screens, video and accessibility',
    paragraphs: [
      'A page ratio and a print-resolution claim are different things. A 1240 × 1754 pixel image has an A-series-like portrait shape, but its physical sharpness depends on how many pixels are placed per inch by the print workflow. The documented PromoPilot canvas is 1240 × 1754; until a larger export is implemented and verified, treat it as a draft or modest-size output, not a 300-DPI print master. Use a print shop proof before ordering a batch.',
      'Screen exports have their own constraints. A 1920 × 1080 design matches a common 16:9 screen canvas, but the actual display can crop or scale content depending on the player and TV settings. Test on the target device, keep important information away from the edges, and set a realistic duration for people to read it. Avoid rapid flashing or motion that could distract or trigger sensitivity.',
      'Video export depends on browser codec support. The project brief says six-second animations can use browser-supported MP4 or WebM encoding, but that does not mean every browser, operating system and device supports both. Show the actual selected format in the UI, provide a fallback still image, and test the resulting file in the exact playback environment. Silent signage often needs no narration; captions or clear visual text are still essential when speech is used.'
    ]
  },
  {
    id: 'expiry', heading: 'Dates, expired offers and offline playlists',
    paragraphs: [
      'Treat offer dates as operational data, not decoration. Store a start and end timestamp with an explicit local timezone, define whether the end time is inclusive, and display a warning before export when a promotion has expired or is about to expire. Make the safe default “do not display expired offer” rather than leaving an old price on a screen indefinitely.',
      'Offline players need special care because they may have no trusted network clock. If an offline HTML player relies only on the device clock, a person can change that clock or the device can drift. It cannot guarantee that an expired promotion disappears at the correct real-world moment. A safer design is a clearly visible playlist expiry and a local fail-closed behavior based on the device time, with an explicit warning that offline expiry is best-effort—not tamper-proof. For high-stakes pricing, remove or replace the player manually at the offer deadline.',
      'The supplied PromoPilot brief says an offline self-contained screen player exists but flags expiry behavior for verification. That behavior remains unverified here because the source revision and executable package are unavailable. Therefore this release cannot yet claim safe automatic expiry. Before sale, test a current offer, an expired offer, the device in offline mode, a changed system clock, a browser restart and a restored backup.'
    ]
  },
  {
    id: 'promopilot', heading: 'Where PromoPilot fits—and what I have not verified',
    paragraphs: [
      'PromoPilot is described in the project brief as a local-first retail promotion studio: a device-local catalogue with image uploads and CSV import; three visual templates called Market fresh, Bold offer and After hours; editable promotion text linked to product prices; ZAR, USD, EUR and GBP display; portrait poster, wide screen and square social layouts; PNG export; browser print-to-PDF; short animated exports; a fullscreen playlist; a self-contained offline HTML player; and workspace backup/restore.',
      'Those are supplied-scope statements, not the result of an independent source audit. The source revision named for this project (1467cff350f7a5e50d1134878b95c52107c22ab9) was not available in the mounted project directory, local workspace search or GitHub repositories accessible to this session. The private demo URL could not be inspected through the available browser channel. I am therefore not presenting a fake interface screenshot, a tested export, or a working public demo.',
      'That distinction matters. I can explain the intended workflow, create independent editorial assets and prepare a truthful portfolio entry, but I cannot honestly certify product entry, CSV behavior, export formats, offline playback, expiry, restore, responsive layout or injection safety without the actual source and runnable application. The downloadable software package and Etsy draft should stay on hold until those tests pass. The private ChatGPT demo is not a buyer delivery method and is not linked as if it were a public demo.'
    ]
  },
  {
    id: 'tutorial', heading: 'A careful setup walkthrough for the intended workflow',
    paragraphs: [
      'Once the application is available, begin by opening a fresh browser profile or a dedicated browser on the store device. Read the storage notice first: local browser storage is tied to that profile and device. Do not assume that deleting browsing data preserves the catalogue. Create a first backup before entering real catalogue information, and store the backup somewhere separate from the device.',
      'Add one sample item manually, then import a small CSV with two or three fictional rows. Confirm the names, prices, currency, image associations and units before importing the full catalogue. Try harmless text that includes quotes and angle brackets in a test product name. The resulting preview and exports should show those characters as text—not interpret them as markup or script. Remove the test row after checking.',
      'Select each template, set the store name and currency, and review the offer text. Compare the price in the on-screen preview with the source row. Export one PNG for each layout, print one page to PDF and inspect its paper size and margins. Generate one animated file only in a browser that reports support, then play it in the intended screen environment. Finally test a short playlist and the offline player with the network disconnected. These are the acceptance steps needed before any claim that the app is buyer-ready.'
    ]
  },
  {
    id: 'updates', heading: 'Changing a price means replacing old files too',
    paragraphs: [
      'A product catalogue is a source of truth only inside the application. Once a PNG has been downloaded, it has no live connection to the catalogue. If a supplier changes a cost or the shop revises the offer, update the catalogue, regenerate the affected files and replace the old posts and screen assets. Make a simple change log with the offer name, export date, placement and planned removal date.',
      'Before reusing an old file, inspect every visible number, discount, unit, date and condition. A common mistake is to correct the poster but forget a screen player saved on a USB stick or a social graphic scheduled for next week. One practical routine is to add a version and date to the exported filename, e.g. `weekend-bundle-social-2026-09-18.png`, then remove superseded files from the shared folder.',
      'If multiple people update promotions, define who approves the final price and who replaces assets on each channel. Local-first software can make a single workstation straightforward; it does not automatically solve coordination across devices, branches or staff. A shared folder with a permission and naming convention may be enough at first. If it becomes error-prone, that is evidence to evaluate a cloud-based source of truth.'
    ]
  },
  {
    id: 'local-cloud', heading: 'When a local tool is enough—and when it is not',
    paragraphs: [
      'A local browser tool can be a good fit for a sole proprietor or one counter computer that needs quick, repeatable graphics without accounts, subscriptions or a remote content-management system. It can keep catalogue data on the device and still export ordinary files that work outside the tool. The trade-off is that the owner handles backups, updates and distribution manually.',
      'Local storage is not a backup strategy by itself. Browser profiles can be removed, devices can fail, staff can use different computers, and local storage may be cleared. Export a backup on a schedule, verify that restore works, and avoid storing customer or payment data that the promotion workflow does not require. The project brief specifically says there are no customer accounts, cloud sync, payment processing or remote screen management; buyers should not expect those services.',
      'Cloud software becomes more useful when multiple locations need one current price list, managers must approve campaigns, screens need remote updates, or a team needs access controls and audit trails. Those capabilities also create new costs, privacy responsibilities, vendor dependency and network requirements. Do not pay for a larger system just because it exists; identify the actual handoff that fails today and choose the smallest reliable fix.'
    ]
  },
  {
    id: 'canva', heading: 'Canva is an optional separate workflow, not a PromoPilot integration',
    paragraphs: [
      'A team may choose to design in Canva or another editor when it needs richer collaboration, brand kits or a broader template library. That is a separate workflow: export a current product image and verified offer facts, then recreate or adapt the design in the chosen platform. PromoPilot’s brief explicitly says there is no Canva API integration. Do not promise that prices synchronize automatically or that an exported PromoPilot file remains connected to Canva.',
      'A separate design platform is unnecessary if a simple poster, square post and screen slide cover the store’s needs. It may be useful if a designer already maintains the brand system there, if multiple people need review comments, or if a campaign uses more complex layouts than the retail tool supports. Check the platform’s current plan and licensing terms before relying on a paid feature or using third-party elements commercially.',
      'A sensible rule is to keep product facts in the catalogue or spreadsheet, not inside a design file alone. Whichever editor is used, use the same checked price and date, version the exports, and retire old copies. The operational workflow is more important than the brand of canvas.'
    ]
  },
  {
    id: 'extensions', heading: 'Optional tools for adjacent jobs',
    paragraphs: [
      'An email or landing-page service can help a shop explain a seasonal offer to people who have explicitly opted into updates. For example, a café might publish a short “new winter drinks” page and send one message to subscribers who requested promotions. Systeme.io is one option to evaluate for a simple landing page and consent-based follow-up; it is not part of PromoPilot and is unnecessary for making the actual poster. Check its current plans, features and privacy obligations before adopting it.',
      'Make can be useful when a business already has a repeatable admin step—for example, receive a supplier CSV, route it to a human for price checks, then notify the person responsible for artwork. That is a possible integration architecture, not a built PromoPilot connector. Do not automatically publish prices from an unreviewed supplier feed. Make’s official pricing page currently describes its Free plan in credits (the page says 1,000 credits per month); usage limits and paid plan prices can change, so confirm before building around them.',
      'ElevenLabs may help create voiceover for a separate promotional video or social clip. It adds little to a silent in-store screen that already communicates clearly. Confirm current commercial-use terms for the exact plan and output; its official billing help says commercial rights apply to generated content on paid plans, while attribution requirements may apply to free usage. The affiliate link is optional, and a buyer does not need this service to use the described core product.',
      'I did not find an existing OpusClip affiliate URL in the portfolio’s source/configuration, so there is no tracked OpusClip recommendation here. If a shop already records longer behind-the-scenes footage, a clip-repurposing service could be evaluated for that footage, but it does not edit a PromoPilot poster export.'
    ]
  },
  {
    id: 'costs', heading: 'Costs, product scope and proposed pricing',
    paragraphs: [
      'The intended downloadable core should work without hidden subscriptions, a Canva account, a cloud account or a paid voice tool. Potential separate costs include printing, a display device, optional third-party software, internet for a web-hosted first download, and the buyer’s time to prepare and replace current assets. If the application truly runs offline after download, that must be tested and documented—not inferred from the words “browser based.”',
      'Etsy’s official digital-listing guidance currently allows up to five files, each no larger than 20 MB, with a documented list of supported formats that includes ZIP, PDF, PNG, MOV and TXT. An application package that exceeds a single-file limit needs a verified split or a different delivery design; do not use an external link to work around Etsy’s delivery rules without checking policy. Etsy also says digital items must be made or designed by the seller. Keep original source, asset licences and authorship records.',
      'My proposed—not market-average—launch price would be USD 19 for a verified single-business offline package with the application, guides, sample data, sample outputs and a reasonable support boundary. The number is a test price suggestion, not an observed average or evidence of willingness to pay. Search results reviewed included single editable café posters and broad Canva social-template bundles priced from around USD 1 to USD 10; those listings have different scope and cannot prove a fair software price. Until the app and package are tested, do not set a live price or accept an order.'
    ]
  },
  {
    id: 'story', heading: 'The build story and what is still pending',
    paragraphs: [
      'I started PromoPilot from a familiar retail-workflow problem: one product offer needs to be communicated in more than one place, and the same facts are easy to mistype when repeatedly recreated. The project brief describes a local promotion maker with three visual directions and several output shapes. The goal is to make a small, practical tool rather than a remote digital-signage platform.',
      'This portfolio entry is a transparent build note, not a client case study. It does not come from a commissioned Upwork engagement, and it does not claim customers, increased sales, measured time savings or conversion results. I could not inspect the source revision in this environment, so I have not produced a purported app screenshot or claimed that the brief’s export and offline behaviors passed testing.',
      'The next engineering milestone is to restore the source, inspect dependencies and image/font licences, run the app from the actual release folder, harden all imported text and exported HTML, verify safe expiry, and capture authentic screenshots and output files. Only then can the listing images, buyer PDFs and product archive be finalized. The portfolio page links to this article as a project note; it does not expose the private demo as a public app.'
    ]
  },
  {
    id: 'next-steps', heading: 'A practical next step for a shop owner',
    paragraphs: [
      'Before buying or building anything, choose one recurring promotion and document the exact facts that must stay correct: product name, price, unit, currency, start/end, image rights and offer conditions. Make the poster, social asset and screen version with the tools you already have. Record the time spent, mistakes caught and handoffs that caused delay. Repeat for several campaigns; one example is not enough to decide that a new tool pays for itself.',
      'If you want a simple pilot, choose one staff member to prepare the catalogue, one person to approve prices and one place to store the final exports. Add a removal reminder. Ask the customer-facing team whether the price was readable from the intended distance. Do not treat more graphics as proof of more sales; measure a business outcome only when you have a reliable way to compare it.',
      'PromoPilot is not ready for purchase while its supplied source remains unavailable for independent testing. You can read the project note at <a href="https://iederees-create.github.io/3D-Portfolio/work/promopilot-retail-promotion-kit/">the NextGenWebs portfolio</a> and use the checklist in this article to evaluate your current process. An Etsy link will be added only if a real public listing is created after the application is validated.'
    ]
  },
  {
    id: 'faq', heading: 'Frequently asked questions',
    paragraphs: [
      'Does PromoPilot connect to Canva? No. The supplied project brief explicitly says there is no Canva API integration. Canva can be used separately, but the connection and price synchronization are not implemented.',
      'Does it keep products in the cloud? The brief says the catalogue is device-local and there are no accounts or cloud sync. A buyer should plan and test backups. Do not enter customer, payment or other sensitive records into a promotion catalogue.',
      'Will changing a price update downloaded PNGs or videos? No. Downloaded exports are snapshots and must be regenerated and replaced wherever they were shared. This is an inherent limitation of standalone exported files.',
      'Can I print a 300-DPI A4 poster? That has not been verified and must not be promised. The specified 1240 × 1754 canvas is not enough to establish a 300-DPI A4 export. Test actual output dimensions and a print proof first.',
      'Will every browser export MP4? No such guarantee is made. Codec support varies; video output needs testing in the target browser and playback device. A still PNG is the fallback.',
      'Does the offline player guarantee offers expire? Not verified. Offline expiry depends on how the player uses time and the device clock. For now, manually remove expired material until a fail-closed implementation has passed offline and clock-change tests.',
      'Is the Etsy product available now? No public listing has been created. The Listing Manager audit reports its production Etsy API credentials were rejected with HTTP 403, and the local database is stale and disconnected. This article contains no purchase link.'
    ]
  }
];

export default function PromoPilotRetailPromotionWorkflowContent() {
  return <div className="prose prose-invert prose-lg max-w-none text-slate-300">
    <p className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm leading-relaxed text-amber-100"><strong>Affiliate disclosure:</strong> Some links below are affiliate links. If you choose to sign up through them, I may earn a commission at no extra cost to you. Recommendations are optional, and no affiliate tool is required to make the core promotion workflow. PromoPilot is not currently offered for sale; its original source was unavailable for independent validation when this article was prepared.</p>
    <p className="mb-6">Turning a product catalogue into a consistent poster, social graphic and screen promotion is mostly a data-and-review problem. This guide shows a practical workflow for independent shops, cafés, salons and small retailers, using an explicitly fictional café example. It also separates what the PromoPilot project brief describes from what I could actually verify.</p>
    <nav aria-label="Table of contents" className="not-prose my-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6"><h2 className="mb-4 text-lg font-bold text-white">In this guide</h2><ol className="grid gap-2 sm:grid-cols-2">{sections.map((section) => <li key={section.id}><a className="text-sm text-primary-300 hover:text-primary-200" href={`#${section.id}`}>{section.heading}</a></li>)}</ol></nav>
    {sections.map((section) => <section key={section.id} id={section.id} className="scroll-mt-24"><h2 className="mt-12 border-b border-white/10 pb-3 text-2xl font-bold text-white">{section.heading}</h2>{section.paragraphs.map((paragraph, index) => <p key={index} className="mb-6" dangerouslySetInnerHTML={{ __html: paragraph }} />)}{section.id === 'extensions' && <div className="not-prose my-5 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm sm:grid-cols-3"><a href={AFFILIATE_LINKS.systeme} target="_blank" rel="sponsored nofollow noopener" className="text-primary-300 underline">Explore Systeme.io (optional; affiliate link)</a><a href={AFFILIATE_LINKS.make} target="_blank" rel="sponsored nofollow noopener" className="text-primary-300 underline">Explore Make (optional; affiliate link)</a><a href={AFFILIATE_LINKS.elevenlabs} target="_blank" rel="sponsored nofollow noopener" className="text-primary-300 underline">Explore ElevenLabs (optional; affiliate link)</a></div>}</section>)}
    <section id="sources" className="not-prose mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6"><h2 className="mb-4 text-xl font-bold text-white">Official references checked</h2><ul className="list-disc space-y-2 pl-5 text-sm text-slate-300"><li><a className="text-primary-300 underline" href="https://help.etsy.com/hc/en-us/articles/115015628347-How-to-Manage-Your-Digital-Listings" target="_blank" rel="noopener noreferrer">Etsy: Manage digital listings</a> — file count, file-size and supported-type rules.</li><li><a className="text-primary-300 underline" href="https://help.etsy.com/hc/en-us/articles/115015628707-How-to-Create-a-Listing" target="_blank" rel="noopener noreferrer">Etsy: Create a listing</a> and <a className="text-primary-300 underline" href="https://help.etsy.com/hc/articles/360000336307" target="_blank" rel="noopener noreferrer">Etsy: Tags</a> — title and tag limits.</li><li><a className="text-primary-300 underline" href="https://www.etsy.com/legal/creativity/" target="_blank" rel="noopener noreferrer">Etsy Creativity Standards</a> — original seller-designed digital items and AI disclosure.</li><li><a className="text-primary-300 underline" href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking" target="_blank" rel="noopener noreferrer">FTC Endorsement Guides Q&amp;A</a> — disclosure guidance for material connections; also follow the rules where you and your readers are located.</li><li><a className="text-primary-300 underline" href="https://www.make.com/en/pricing" target="_blank" rel="noopener noreferrer">Make pricing</a>; <a className="text-primary-300 underline" href="https://elevenlabs.io/docs/overview/administration/billing" target="_blank" rel="noopener noreferrer">ElevenLabs commercial rights guidance</a>; <a className="text-primary-300 underline" href="https://systeme.io/pricing" target="_blank" rel="noopener noreferrer">Systeme.io pricing</a>.</li></ul><p className="mt-4 text-xs text-slate-500">Platform terms, limits and prices change. Recheck official pages before purchase or publishing. No demand, ranking or earnings claim is made here.</p></section>
  </div>;
}
