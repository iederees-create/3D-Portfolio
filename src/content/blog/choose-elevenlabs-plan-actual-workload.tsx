import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function ChooseElevenlabsPlanActualWorkloadContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        You've decided to integrate AI voiceovers into your content strategy, and ElevenLabs is the industry standard. But looking at the pricing page can be confusing. Which plan do you actually need based on the work you are doing?
      </p>

      <p>
        Let's break down the official pricing and match it to actual creator and business workflows so you don't overpay—or accidentally violate commercial usage rights.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Free Plan ($0/month)</h2>
        <p>
          <strong>Who it's for:</strong> Hobbyists, students, and businesses doing initial technical evaluations.
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>The Limit:</strong> You get a small character allowance each month.</li>
          <li><strong>The Catch:</strong> <strong>This plan does not include commercial rights.</strong> You cannot use audio generated on the Free plan for monetized YouTube videos, client projects, paid ads, or business websites. Furthermore, any use requires explicit attribution to ElevenLabs.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Starter Plan (Approx. $5/month)</h2>
        <p>
          <strong>Who it's for:</strong> Freelancers, indie hackers, and small YouTube channels.
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>The Big Upgrade:</strong> This is the entry point for <strong>Commercial Use Rights</strong>. If you are making money from your content in any way, this is the absolute minimum plan you need.</li>
          <li><strong>The Workload:</strong> The character limit is usually enough to produce about 30 minutes of finished audio a month. This is perfect for a few short product demos, a handful of TikToks/Reels, or one long-form YouTube video a month.</li>
          <li><a href="https://try.elevenlabs.io/fb6nmetrrxow" target="_blank" rel="sponsored noopener" className="text-sky-400 hover:underline">View the Starter Plan on ElevenLabs</a></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Creator & Pro Plans</h2>
        <p>
          <strong>Who it's for:</strong> Agencies, serious content creators, and SaaS companies.
        </p>
        <p className="mt-4">
          Once you start producing daily social media content, localizing videos into the 30 to 70+ supported languages (via models like Eleven v3), or building apps via their API, you will chew through the Starter plan limits in a week.
        </p>
        <p className="mt-4">
          These higher tiers offer massive character allowances and high-quality voice cloning features. If you are an agency creating ad variations for clients, the Creator plan is where you need to be.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Verdict</h2>
        <p>
          Don't guess. Look at your content calendar. If you produce videos to make money, skip the Free plan immediately to secure your commercial license. Start with the ~$5/mo Starter plan and only upgrade when you consistently hit your character limit mid-month.
        </p>
      </section>

      <section className="pt-8 mt-8 border-t border-white/10">
        <AffiliateDisclosure />
      </section>
    </div>
  );
}
