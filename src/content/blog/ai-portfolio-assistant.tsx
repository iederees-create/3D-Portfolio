const CONTACT_URL = `${import.meta.env.BASE_URL}contact/`;
const PROJECT_URL = `${import.meta.env.BASE_URL}work/supportforge-ai-assistant/`;
const ETSY_SHOP_URL = 'https://nextgenwebs.etsy.com';

export default function AiPortfolioAssistantContent() {
  return (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300">
      <h2 id="why-build-it" className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">Why I built it</h2>
      <p className="mb-6">
        A portfolio should do more than show thumbnails. Visitors arrive with different levels of context: one person wants a custom website, another wants a template, another wants to know whether an AI chatbot can fit their business, and another just needs a fast route to contact. A static page can answer those questions, but it makes the visitor search for the right section first.
      </p>
      <p className="mb-6">
        The NextGenWebs AI Assistant is designed to act as a guided front desk for the portfolio. It helps visitors understand services, projects, website templates, AI tools, pricing direction and contact paths using a controlled knowledge base instead of private memory.
      </p>

      <h2 id="controlled-knowledge" className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">The important part: controlled knowledge</h2>
      <p className="mb-6">
        The assistant is not a free-form chatbot bolted onto the site. The backend uses a specific NextGenWebs knowledge file that describes the brand, services, template categories, portfolio projects, contact CTA and safety limits. That matters because a public assistant should not invent products, private client details, prices, sales results or unpublished Etsy links.
      </p>
      <p className="mb-6">
        When a visitor asks about templates, the assistant can explain the kinds of templates NextGenWebs builds and point to the real shop-level Etsy page. It does not fabricate a product URL. When someone asks about price, it explains that pricing depends on scope, pages, features, integrations, content readiness and launch support, then routes them to the contact page for a quote.
      </p>

      <h2 id="architecture" className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">The architecture</h2>
      <p className="mb-6">
        The public widget lives inside the React portfolio. The chat endpoint lives on the existing Francis Listing Manager Render service, which avoids adding another paid backend just for a portfolio assistant. The frontend sends a short message history to a public endpoint, and the backend handles the OpenAI call server-side.
      </p>
      <ul className="mb-8 list-disc space-y-2 pl-6 text-slate-300">
        <li>React floating chat widget on the portfolio</li>
        <li>Node.js / Express public endpoint on the backend</li>
        <li>Server-side OpenAI API key handling only</li>
        <li>Markdown knowledge base for public NextGenWebs facts</li>
        <li>Rate limiting and safe fallback responses</li>
        <li>No Etsy actions, no private dashboard access and no API keys in frontend code</li>
      </ul>

      <h2 id="visitor-experience" className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">What visitors can ask</h2>
      <p className="mb-6">
        The widget starts with quick prompts like “What can you build for me?”, “Show me website templates”, “Do you build AI chatbots?”, “How do I request a quote?” and “What makes your work different?”. Those prompts are intentionally practical. The goal is to help a visitor decide their next step, not keep them chatting forever.
      </p>
      <p className="mb-6">
        The assistant can talk about custom websites, AI chatbot builds, website templates, interactive quote planners, data dashboards and selected portfolio projects. It can also explain the SupportForge AI Assistant project, which is the reusable support-assistant template behind this integration pattern.
      </p>
      <p className="mb-6">
        <a href={PROJECT_URL} className="font-semibold text-primary-400 hover:text-primary-300">View the SupportForge AI Assistant project →</a>
      </p>

      <h2 id="safety" className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">Safety boundaries</h2>
      <p className="mb-6">
        A public AI assistant needs boundaries. This one does not promise guaranteed sales, income, SEO ranking, lead volume or conversion results. It does not provide legal, medical, financial, tax or investment advice. It does not ask for passwords, API keys, payment details or identity documents. It also cannot create Etsy listings, publish products, access private dashboards or change anything behind the scenes.
      </p>

      <h2 id="how-businesses-can-use-it" className="mt-10 border-b border-white/10 pb-2 text-2xl font-bold text-white">How a business can use this pattern</h2>
      <p className="mb-6">
        The same architecture works for service businesses, coaches, ecommerce stores, SaaS founders, wellness brands and product companies. The knowledge base can be changed to cover services, FAQs, setup steps, support rules, disclaimers and contact routes. The interface can be branded for the business. The backend can stay server-side so API keys never appear in the browser.
      </p>
      <p className="mb-6">
        If you want a template starting point, browse the NextGenWebs Etsy shop when products are available: <a href={ETSY_SHOP_URL} target="_blank" rel="noreferrer" className="font-semibold text-primary-400 hover:text-primary-300">NextGenWebs on Etsy</a>. If you want a custom build, the best route is the contact page.
      </p>
      <p className="mb-6">
        <a href={CONTACT_URL} className="font-semibold text-primary-400 hover:text-primary-300">Request a custom AI assistant build →</a>
      </p>
    </div>
  );
}
