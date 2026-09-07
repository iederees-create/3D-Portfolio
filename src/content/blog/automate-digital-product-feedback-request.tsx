import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function AutomateDigitalProductFeedbackRequestContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        Selling digital products is great because it's scalable. But how do you get reviews and feedback without manually emailing every single customer?
      </p>

      <AffiliateDisclosure />

      <p>
        Reviews are the lifeblood of digital product sales (like courses, templates, or ebooks). If you don't ask for them, you won't get them. The good news is that you can build an automated feedback loop using Make that waits a specific amount of time after a purchase and then sends a polite review request.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Timing is Everything</h2>
        <p>
          You don't want to ask for a review 5 minutes after they buy—they haven't used the product yet! You need a system that can handle delays.
        </p>
        <p className="mt-4">
          To build this, you will need an integration platform like Make. Make's Free plan allows up to 2 active scenarios and 1,000 operations per month, which is perfect for a starter product. 
          Ready to automate your reviews? <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">Register for a Make account</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Feedback Automation Workflow</h2>
        <ol className="list-decimal list-inside mt-4 space-y-4">
          <li>
            <strong className="text-white">Trigger on Purchase:</strong> Connect your payment processor (Stripe, Gumroad, Lemon Squeezy) to Make. Set the trigger to fire on a "Successful Charge" or "New Sale."
          </li>
          <li>
            <strong className="text-white">The Delay:</strong> Make doesn't have a simple "Wait 7 Days" module that holds a run indefinitely in the same way some CRMs do, so the best approach is to push the customer data into an Email Marketing tool (like Mailchimp, ConvertKit, or Systeme.io). 
          </li>
          <li>
            <strong className="text-white">The Email System:</strong> Using Systeme.io (which allows unlimited emails and up to 2,000 contacts on its Free plan) or another email tool, you can create a rule: "When a tag is added via Make, wait 7 days, then send the Review Email."
          </li>
          <li>
            <strong className="text-white">Capture the Feedback:</strong> Link your email to a simple Typeform or Tally form. If they leave a 5-star review, give them a link to post it publicly!
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why this Strategy Works</h2>
        <p>
          By offloading the "waiting" portion to a dedicated email marketing tool, you keep your Make scenarios clean and avoid hitting timeout limits. Your automation simply acts as the intelligent bridge between the payment gateway and the email sequence.
        </p>
      </section>
    </div>
  );
}
