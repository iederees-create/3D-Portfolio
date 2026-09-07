import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function ConnectWebsiteFormToMakeWithWebhookContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        If you want to automate anything that happens on your website, you need to understand webhooks. They are the absolute fastest way to send data to an automation platform.
      </p>

      <AffiliateDisclosure />

      <p>
        Polling (where a system checks for new data every 15 minutes) is inefficient. Webhooks are instant. When a user clicks "Submit" on your contact form, a webhook instantly fires that data over to Make, triggering your scenario immediately.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Power of Make's Webhooks</h2>
        <p>
          Unlike some platforms that lock webhooks behind premium tiers, Make offers Webhook capabilities on all plans, including the Free plan. 
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-slate-300">
          <li><strong>Max Payload:</strong> 5MB (plenty for form text and small attachments).</li>
          <li><strong>Rate Limit:</strong> 30 requests per second.</li>
          <li><strong>Queueing:</strong> Make will queue up to 667 items per 10k credits if your scenario gets overwhelmed.</li>
          <li><strong>Cost:</strong> Webhook triggers consume exactly 1 credit per incoming request.</li>
        </ul>
        <p className="mt-4">
          Ready to build your first webhook? <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">Sign up for a Make account here</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">How to Connect Your Form</h2>
        <ol className="list-decimal list-inside mt-4 space-y-4">
          <li>
            <strong className="text-white">Create a Custom Webhook in Make:</strong> Start a new scenario and choose "Webhooks" as the trigger. Select "Custom Webhook." Make will generate a unique URL (e.g., `https://hook.make.com/xyz123...`). Click "Copy address to clipboard."
          </li>
          <li>
            <strong className="text-white">Paste the URL in Your Form:</strong> Go to your website builder (Webflow, Elementor, Framer). Find the form settings, look for the "Action URL" or "Webhook" integration, and paste your Make URL there. Set the method to POST.
          </li>
          <li>
            <strong className="text-white">Determine Data Structure:</strong> Back in Make, click "Redetermine Data Structure." Go to your website and submit a test form. Make will instantly receive it, analyze the fields (Name, Email, Message), and make them available for the rest of your scenario.
          </li>
          <li>
            <strong className="text-white">Build the Rest of Your Scenario:</strong> Now you can map those form fields to your CRM, Google Sheets, or Slack notifications!
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why Webhooks Win</h2>
        <p>
          Webhooks are universal. Even if Make doesn't have a native integration for your obscure, custom-built website platform, as long as your platform can send a webhook, Make can receive the data. 
        </p>
      </section>
    </div>
  );
}
