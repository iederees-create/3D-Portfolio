import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function PrepareVoiceoverBriefFreelancerContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        "Just read this script and make it sound energetic." That is the worst brief you can give a voiceover artist, human or AI.
      </p>

      <p>
        Whether you are hiring a professional on Fiverr or prompting an AI voice generator, the quality of the output depends entirely on the quality of the direction you provide. Here is how to prepare a voiceover brief that actually gets results.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The 4-Part Brief</h2>
        <p>Every script you hand off needs these four elements defined at the top:</p>
        <ul className="list-disc list-inside mt-3 space-y-4">
          <li>
            <strong>1. The Persona (Who is speaking?):</strong> Don't say "friendly professional." Say "A 30-something tech founder explaining a concept to a peer over coffee." That gives the voice context.
          </li>
          <li>
            <strong>2. The Pacing (How fast?):</strong> Do you want a slow, methodical read (good for complex tutorials) or a fast, upbeat read (good for 30-second promos)?
          </li>
          <li>
            <strong>3. The Audience (Who is listening?):</strong> Are they stressed out professionals? Curious hobbyists? 
          </li>
          <li>
            <strong>4. The Emotion (What is the vibe?):</strong> Pick two adjectives. E.g., "Empathetic and reassuring" or "Urgent and exciting."
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Formatting the Script for AI</h2>
        <p>
          If you are acting as the "director" for an AI voiceover instead of hiring a human, the brief becomes your prompting strategy.
        </p>
        <p className="mt-4">
          Tools like <a href="https://try.elevenlabs.io/fb6nmetrrxow" target="_blank" rel="sponsored noopener" className="text-sky-400 hover:underline">ElevenLabs</a> are incredibly responsive to context. If you want a specific tone, you can actually include a "stage direction" in the prompt before the text (e.g., "[Speaking softly and carefully] The data doesn't lie.") or rely heavily on punctuation.
        </p>
        <p className="mt-4">
          Always provide phonetic spellings for acronyms and brand names directly in the script, so the AI (or the freelancer) doesn't have to guess.
        </p>
        <div className="bg-sky-900/20 border border-sky-800 p-4 rounded-lg mt-4">
          <p className="text-sm">
            <strong>Commercial Note:</strong> If you're generating this audio for a client project, remember that the ElevenLabs Free plan ($0/mo) does not grant commercial rights. You must have at least the Starter plan (approx. $5/mo) to legally hand over the audio to a client for commercial use.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The "Scratch Track" Hack</h2>
        <p>
          The best way to communicate pacing to a freelancer is to record a "scratch track." Record yourself reading the script on your phone. It doesn't matter if the audio quality is terrible or if you stumble. It gives the artist an exact blueprint of the timing and emphasis you want. 
        </p>
      </section>

      <section className="pt-8 mt-8 border-t border-white/10">
        <AffiliateDisclosure />
      </section>
    </div>
  );
}
