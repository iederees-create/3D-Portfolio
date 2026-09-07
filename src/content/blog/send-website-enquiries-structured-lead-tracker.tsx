import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function SendWebsiteEnquiriesToAStructuredLeadTrackerContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        If you are still copying and pasting website enquiries from your email inbox into a spreadsheet, you are wasting time and risking lost leads. Let's fix that.
      </p>
      
      <AffiliateDisclosure />

      <p>
        One of the highest-impact automations a business can build is a reliable lead capture system. When a potential client fills out a form on your website, you shouldn't have to manually create a new row in Google Sheets, Airtable, or Notion. You can use an integration platform like Make to do this instantly.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why Make for Lead Tracking?</h2>
        <p>
          Make (formerly Integromat) is a powerful visual automation platform. According to verified data, Make offers a Free plan with 1,000 credits/month (allowing up to 2 active scenarios with a 15-minute minimum interval). If your website receives under 1,000 form submissions a month, you can run this entire automation for free. 
        </p>
        <p className="mt-4">
          Ready to start? You can <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">sign up for Make here</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Step-by-Step: The Scenario</h2>
        <p>The flow is simple: <strong>Form Submission (Trigger) &rarr; Database (Action)</strong>.</p>
        <ol className="list-decimal list-inside mt-4 space-y-4">
          <li>
            <strong className="text-white">Set up your Trigger:</strong> If you use Webflow, WordPress (via a form plugin), or custom HTML, you can use a Webhook. Make's Free plan includes webhook capabilities (max payload 5MB, rate limit of 30 requests/second). Each incoming request consumes just 1 credit.
          </li>
          <li>
            <strong className="text-white">Connect your Database:</strong> Add a module for Google Sheets, Notion, or Airtable. Connect your account.
          </li>
          <li>
            <strong className="text-white">Map the Fields:</strong> Drag and drop the data points from your webhook (Name, Email, Message) into the corresponding columns in your database module.
          </li>
          <li>
            <strong className="text-white">Test and Activate:</strong> Submit a test form on your website. Check Make to see if the data passed through successfully, and then check your tracker. If it looks good, turn the scenario ON!
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The ROI of Automated Lead Tracking</h2>
        <p>
          Beyond saving a few minutes per lead, this structured approach ensures zero data leakage. Your sales team or assistants can look at one single source of truth without searching through crowded email inboxes. If your volume grows, Make's Core plan starts at around $10.59/month for 10,000 credits — plenty of room to scale.
        </p>
      </section>
    </div>
  );
}
