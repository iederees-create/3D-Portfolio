import React from 'react';
import AffiliateDisclosure from '../../components/AffiliateDisclosure';
import FunnelLaunchChecklist from '../../components/tools/FunnelLaunchChecklist';

export default function SystemeIoMakeElevenlabsCapstoneLaunch() {
  return (
    <article className="prose prose-invert prose-lg max-w-none text-slate-300">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Launch a Digital Product with Systeme.io, Make, and ElevenLabs (Capstone)
      </h1>
      
      <p>
        Building a completely automated digital product business might sound like a pipe dream, but with modern no-code and AI tools, it's highly achievable. In this comprehensive capstone guide, we'll walk through how to build, market, and deliver an AI-generated audio product using <strong><a href="https://systeme.io/?sa=sa0281022468eb30b58bf030d6588013c2783110a0" target="_blank" rel="sponsored noopener">Systeme.io</a></strong>, <strong>Make.com</strong>, and <strong>ElevenLabs</strong>.
      </p>

      <AffiliateDisclosure />

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">The Tech Stack Overview</h2>
      <p>
        Before we dive into the integration, let's look at why we're using this specific combination of tools and the pricing involved. You can start this entire flow with zero upfront software costs if you're careful, but for commercial viability, a small investment is required.
      </p>
      
      <ul>
        <li>
          <strong>ElevenLabs (AI Voice Generation):</strong> The industry leader for text-to-speech. They offer a Free plan, but be warned: <em>it does not include commercial rights and requires attribution</em>. For a product you intend to sell, you must upgrade to at least the Starter plan (starts around $5/month), which grants commercial rights and supports over 30-70+ languages.
        </li>
        <li>
          <strong>Make.com (Automation):</strong> The glue that holds our process together. The Free plan provides 1,000 credits/month and supports webhooks. Note the free webhook constraints: 5MB max payload, 30 requests/sec, and queues up to 667 items (each incoming webhook consumes 1 credit). If you scale, the paid Core plan starts at around $10.59/month (or ~$9/month billed annually) for 10k credits.
        </li>
        <li>
          <strong><a href="https://systeme.io/?sa=sa0281022468eb30b58bf030d6588013c2783110a0" target="_blank" rel="sponsored noopener">Systeme.io</a> (Funnel & Sales):</strong> The ultimate all-in-one marketing platform. The incredibly generous Free plan includes up to 2,000 contacts, 3 sales funnels, 15 funnel steps, 1 automation rule, 1 tag, and unlimited emails. When you outgrow it, the Startup plan is highly affordable at $27/mo (or ~$228/year).
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Step 1: Product Creation with ElevenLabs</h2>
      <p>
        First, decide on your digital product. A popular option is personalized audio meditations, daily affirmations, or mini-audiobooks.
      </p>
      <ol>
        <li>Write your scripts (you can use ChatGPT to help outline them).</li>
        <li>Log into ElevenLabs (ensure you are on the $5/mo Starter plan for commercial rights).</li>
        <li>Select a voice that matches your brand's tone.</li>
        <li>Generate your audio files and save them to a secure cloud drive (like Google Drive) that Make.com can access.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Step 2: Building the Funnel in Systeme.io</h2>
      <p>
        Now, let's set up the storefront using Systeme.io's intuitive funnel builder. Since you get 3 free funnels, this won't cost you a dime.
      </p>
      <ol>
        <li>Create a new funnel in Systeme.io and select "Sell a Product".</li>
        <li>Design your Sales Page highlighting the benefits of your custom audio product.</li>
        <li>Set up your Order Form. Connect your payment gateway (Stripe or PayPal).</li>
        <li>Under <strong>Automation Rules</strong> for the Order Form, set a rule: <em>When a sale occurs -> Send a Webhook</em>.</li>
      </ol>
      <p>
        Wait, where do we send the webhook? That leads us to Step 3.
      </p>

      <div className="my-10 bg-slate-800 p-6 rounded-lg">
        <FunnelLaunchChecklist />
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Step 3: Connecting the Dots with Make.com</h2>
      <p>
        This is where the magic happens. We will use Make.com to catch the sale from Systeme.io, generate or fetch the digital asset, and deliver it.
      </p>
      <ol>
        <li>Log into Make.com and create a new Scenario.</li>
        <li>Add a <strong>Webhooks</strong> module as the trigger and select "Custom webhook".</li>
        <li>Copy the generated Webhook URL. Go back to your Systeme.io Automation Rule and paste it there.</li>
        <li>Run the Make scenario once and make a test purchase in Systeme.io so Make can determine the data structure (customer email, name, etc.).</li>
        <li>Add subsequent modules in Make: 
          <ul>
            <li>If generating dynamically: connect the ElevenLabs API module to generate audio on the fly based on customer inputs.</li>
            <li>If pre-recorded: connect Google Drive to fetch the file link.</li>
          </ul>
        </li>
        <li>Finally, add an Email module (or send the data back to Systeme.io via API) to deliver the download link securely to the customer.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Final Polish and Launch</h2>
      <p>
        Before you launch, test everything extensively. Make sure your webhook successfully fires from Systeme.io, Make processes the data within your credit limits (remember, the free tier is 1,000 credits/mo and 15m minimum interval for some polling triggers, though webhooks are instant), and the final email lands in your inbox.
      </p>
      <p>
        With this powerful trinity of tools, you've built a fully automated digital product business. The barrier to entry has never been lower. Start building today!
      </p>
    </article>
  );
}
