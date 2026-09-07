import AffiliateDisclosure from '../../components/AffiliateDisclosure';
import ScriptTimingEstimator from '../../components/tools/ScriptTimingEstimator';

export default function CreateVoiceover30SecondProductDemoContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        You've poured hours into your new product, and the screen recording looks sharp. But a silent 30-second demo rarely converts. Adding a professional voiceover used to mean hiring talent, waiting days, and paying hundreds. Today, AI voice generation has completely flipped the script.
      </p>

      <p>
        In this guide, I'll show you exactly how to craft a compelling voiceover for a 30-second product demo using AI, specifically focusing on workflow, pacing, and getting that commercial-ready sound.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Step 1: The 75-Word Rule</h2>
        <p>
          A standard voiceover pace is about 150 words per minute. For a 30-second demo, that means you have exactly <strong>75 words</strong> to make your point.
        </p>
        <p className="mt-4">
          Don't try to cram 100 words in by speeding up the AI—it sounds unnatural and panicked. Stick to this structure:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>The Hook (15 words / 6s):</strong> Name the painful problem.</li>
          <li><strong>The Reveal (15 words / 6s):</strong> Introduce your product as the solution.</li>
          <li><strong>The Proof (30 words / 12s):</strong> Highlight the two biggest features shown on screen.</li>
          <li><strong>The Action (15 words / 6s):</strong> Tell them what to do next.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Tool: Script Timing Estimator</h2>
        <p className="mb-4">Use this tool to ensure your script hits the 30-second mark exactly before you generate any audio.</p>
        <div className="my-8 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <ScriptTimingEstimator defaultTargetSeconds={30} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Step 2: Choosing Your AI Voice Platform</h2>
        <p>
          For product demos, the voice needs to sound authoritative but conversational. My go-to for this is <a href="https://try.elevenlabs.io/fb6nmetrrxow" target="_blank" rel="sponsored noopener" className="text-sky-400 hover:underline">ElevenLabs</a>. Their models handle inflection and pacing better than almost anything else on the market.
        </p>
        <div className="bg-sky-900/20 border border-sky-800 p-4 rounded-lg mt-4">
          <h3 className="text-sky-300 font-semibold mb-2">Important Note on Commercial Rights</h3>
          <p className="text-sm">
            If you're making a product demo to sell a product or service, you need commercial rights. According to the official pricing, the <strong>ElevenLabs Free plan ($0/mo) does not include commercial rights</strong> and requires attribution. To use the voiceover in a promotional demo, you must upgrade to at least the Starter plan (approx. $5/month), which includes a commercial license.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Step 3: Directing the AI</h2>
        <p>
          AI voices don't know the context of your product. You have to "direct" them using punctuation and formatting:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>Use dashes for pauses:</strong> "Meet the new workflow — designed for speed."</li>
          <li><strong>Spell out acronyms phonetically:</strong> Instead of "Our API," write "Our A P I" if the model trips up.</li>
          <li><strong>Emphasize with quotes:</strong> Sometimes wrapping a word in quotes tells the model to hit it harder.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Step 4: Syncing to Your Video</h2>
        <p>
          Generate the audio in one take, then bring it into your video editor (like Premiere, CapCut, or DaVinci). Lay the audio track down <em>first</em>, then adjust your screen recording clips to match the voiceover's natural pacing.
        </p>
      </section>

      <section className="pt-8 mt-8 border-t border-white/10">
        <AffiliateDisclosure />
      </section>
    </div>
  );
}
