import AffiliateDisclosure from '../../components/AffiliateDisclosure';
import ScriptTimingEstimator from '../../components/tools/ScriptTimingEstimator';

export default function AddNarrationDigitalProductTutorialContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        You've built a great digital product—a Notion template, a custom CRM, or a new software tool. You record a screen-share tutorial showing how it works. But without narration, your users are just watching a mouse move around a screen, trying to guess what's important.
      </p>

      <p>
        Adding clear, concise narration to your tutorials reduces support tickets, increases user satisfaction, and makes your product feel significantly more premium. 
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The "See-Say" Principle</h2>
        <p>
          The golden rule of tutorial narration is: <strong>Don't just describe what the user can already see. Explain why they are doing it.</strong>
        </p>
        <p className="mt-4">
          Instead of saying, "Click the blue button in the top right corner," say, "To finalize the report and send it to your team, click Export." The visual shows them <em>how</em>, the audio tells them <em>why</em>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Scripting for Clarity</h2>
        <p className="mb-4">
          Tutorials should be punchy. Aim for 90 seconds (about 225 words) for a single feature breakdown. Use this estimator to check your script length:
        </p>
        <div className="my-8 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <ScriptTimingEstimator defaultTargetSeconds={90} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Generating the Audio</h2>
        <p>
          Tutorials often need to be updated when your UI changes. Hiring a voice actor every time you move a button is expensive and slow. This is the perfect use case for AI voice generation.
        </p>
        <p className="mt-4">
          By using <a href="https://try.elevenlabs.io/fb6nmetrrxow" target="_blank" rel="sponsored noopener" className="text-sky-400 hover:underline">ElevenLabs</a>, you can maintain a consistent brand voice across all your tutorials for years. If a feature changes, you simply regenerate that one specific sentence and drop it into your video editor.
        </p>
        <div className="bg-sky-900/20 border border-sky-800 p-4 rounded-lg mt-4">
          <p className="text-sm">
            <strong>Licensing Reminder:</strong> Because a digital product tutorial is a commercial asset (it supports a paid product or service), you need commercial rights. The ElevenLabs Free plan ($0/mo) does not provide this. Ensure you are on the Starter plan (approx. $5/mo) or higher.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Editing Workflow</h2>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>Step 1:</strong> Write the script and generate the audio.</li>
          <li><strong>Step 2:</strong> Drop the audio into your editor.</li>
          <li><strong>Step 3:</strong> Record your screen <em>while listening to the audio</em>. This ensures your mouse movements perfectly sync with the narration, avoiding awkward pauses or rushed clicking.</li>
        </ul>
      </section>

      <section className="pt-8 mt-8 border-t border-white/10">
        <AffiliateDisclosure />
      </section>
    </div>
  );
}
