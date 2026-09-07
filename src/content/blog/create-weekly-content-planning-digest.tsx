import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function CreateWeeklyContentPlanningDigestContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        Content marketing is exhausting when you are constantly staring at a blank page. What if your inspiration came to you automatically every Monday morning?
      </p>

      <AffiliateDisclosure />

      <p>
        The most consistent creators don't rely on sudden flashes of genius. They rely on systems. By building a weekly content-planning digest in Make, you can automatically aggregate industry news, trending topics, or your own backlog of ideas into a single summary delivered right to your inbox or Slack channel.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Value of a Scheduled Digest</h2>
        <p>
          Using Make's built-in scheduling tools, you can configure an automation to run once a week. Even on Make's Free plan (which allows up to 2 active scenarios and 1,000 credits/month), a weekly digest uses practically zero resources. A scenario running once a week barely dents your quota! 
        </p>
        <p className="mt-4">
          Want to set this up for your team? <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">Sign up for Make here</a> and follow the steps below.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Building the Content Digest Scenario</h2>
        <ol className="list-decimal list-inside mt-4 space-y-4">
          <li>
            <strong className="text-white">The Trigger (Scheduler):</strong> Use Make's built-in clock module. Set it to trigger every Monday at 8:00 AM.
          </li>
          <li>
            <strong className="text-white">Gather Data (RSS/Database):</strong> Use RSS modules to pull the top 3 articles from your favorite industry blogs. Alternatively, connect to your Notion "Idea Backlog" and filter for ideas created in the last 7 days.
          </li>
          <li>
            <strong className="text-white">Aggregate (Text Aggregator):</strong> Make processes data in bundles. Use a Text Aggregator module to combine the titles and URLs of your gathered data into a single, clean HTML or Markdown list.
          </li>
          <li>
            <strong className="text-white">Deliver (Email/Slack):</strong> Send that formatted text to your team's Slack channel or directly to your email inbox.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Taking it to the Next Level</h2>
        <p>
          If you want to get advanced, you can route your aggregated text through an AI module to suggest 3 specific TikTok or LinkedIn hooks based on the news of the week. This bridges the gap between "reading the news" and "creating content." 
        </p>
      </section>
    </div>
  );
}
