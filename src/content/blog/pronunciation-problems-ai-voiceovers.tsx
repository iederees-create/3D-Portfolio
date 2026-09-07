import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function PronunciationProblemsAiVoiceoversContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        You hit generate, listen back, and the AI voice completely butchers your brand name, a common acronym, or the name of a key client. It's frustrating, and if you leave it in, it ruins the professionalism of the video.
      </p>

      <p>
        AI voices are trained on vast amounts of data, which means they default to the most common pronunciation of a string of letters. When you have unique names or industry-specific acronyms, you have to help the AI out. Here is how to fix pronunciation issues.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Phonetic Spelling Method</h2>
        <p>
          The most reliable way to fix a pronunciation issue is to spell the word exactly how it sounds, even if it looks ridiculous on the page. 
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>Acronyms:</strong> Instead of "AWS," write "A W S" or "A-W-S". If you want it pronounced as a word (like "NASA"), but the AI spells it out, write "Nassa."</li>
          <li><strong>Brand Names:</strong> If your brand is "Xylos," the AI might say "Zylos" or "Ex-ylos". Write it phonetically like "Zie-los" to force the correct sound.</li>
          <li><strong>Names:</strong> For tricky human names, write them out phonetically. "Siobhan" becomes "Shi-vawn."</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Dictionary Feature</h2>
        <p>
          If you are doing a long-form project, phonetic spelling can get tedious. Premium platforms offer a way to automate this.
        </p>
        <p className="mt-4">
          I use <a href="https://try.elevenlabs.io/fb6nmetrrxow" target="_blank" rel="sponsored noopener" className="text-sky-400 hover:underline">ElevenLabs</a> for my client work. They have a built-in Pronunciation Dictionary feature. You can enter your brand name once, type out the phonetic pronunciation (or use the International Phonetic Alphabet for precise control), and the AI will apply that rule to your entire workspace automatically.
        </p>
        <div className="bg-sky-900/20 border border-sky-800 p-4 rounded-lg mt-4">
          <p className="text-sm">
            <em>Quick tip:</em> If you are testing this out, the ElevenLabs Free plan ($0/mo) is great for evaluation, but if you're using this for a business presentation or commercial video, you'll need the Starter plan (approx. $5/mo) to secure commercial rights.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Testing Isolations</h2>
        <p>
          Before generating an entire 5-minute script, take the difficult words, put them in a blank document, and generate them alone. Test different phonetic spellings until you hear the perfect version. Then, copy and paste that exact spelling back into your master script. This saves you credits and time.
        </p>
      </section>

      <section className="pt-8 mt-8 border-t border-white/10">
        <AffiliateDisclosure />
      </section>
    </div>
  );
}
