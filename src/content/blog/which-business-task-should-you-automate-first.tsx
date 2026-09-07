import AffiliateDisclosure from '../../components/AffiliateDisclosure';
import AutomationPriorityWorksheet from '../../components/tools/AutomationPriorityWorksheet';

export default function WhichBusinessTaskShouldYouAutomateFirstContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        The biggest mistake business owners make with automation is trying to automate everything at once. You don't need a massive system; you just need to automate the bottleneck.
      </p>

      <AffiliateDisclosure />

      <p>
        When you discover tools like Make, it's tempting to automate your entire business—from social media posting to client onboarding and invoice generation. But complex automations break easily if they aren't built on a solid foundation. You need to start with high-frequency, low-complexity tasks.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Automation Matrix</h2>
        <p>
          Tasks generally fall into a matrix based on two factors: Frequency (how often it happens) and Complexity (how hard it is to do).
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-slate-300">
          <li><strong>High Frequency, Low Complexity:</strong> (e.g., Logging website leads into a spreadsheet). <em>Automate this immediately.</em></li>
          <li><strong>Low Frequency, Low Complexity:</strong> (e.g., Creating a monthly expense folder). <em>Nice to have, but low priority.</em></li>
          <li><strong>High Frequency, High Complexity:</strong> (e.g., Drafting custom proposals). <em>Requires AI and human review. Do this later.</em></li>
          <li><strong>Low Frequency, High Complexity:</strong> (e.g., Firing an employee). <em>Never automate this.</em></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Find Your First Automation</h2>
        <p>
          We've built an interactive tool below to help you identify which task you should automate first. Fill out the worksheet, and it will prioritize your ideas.
        </p>

        <div className="my-8">
          <AutomationPriorityWorksheet />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Getting Started with Make</h2>
        <p>
          Once you have identified your #1 priority, it's time to build. Make is the best visual builder for beginners. Their Free plan allows up to 2 active scenarios with 1,000 operations per month—perfect for your very first automation. 
        </p>
        <p className="mt-4">
          <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">Click here to register your Make account</a> and start building that first critical scenario today.
        </p>
      </section>
    </div>
  );
}
