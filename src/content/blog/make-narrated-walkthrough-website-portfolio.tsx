import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function MakeNarratedWalkthroughWebsitePortfolioContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        Sending a link to your portfolio is standard. Sending a narrated video walkthrough of your portfolio is how you actually win the client. 
      </p>

      <p>
        Clients don't always know what they are looking at. They see a nice design, but they miss the strategic decisions, the complex animations, or the backend logic you built. A narrated walkthrough allows you to control the narrative and highlight your value.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why Narration Matters</h2>
        <p>
          When you just screen-record a scrolling website, it's passive. When you add a voice track saying, "Notice how we structured the pricing tier to drive users to the middle option," suddenly you aren't just a designer or developer—you are a strategist.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Script Structure</h2>
        <p>Keep your walkthrough under 2 minutes (about 300 words). Follow this flow:</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>The Objective (30s):</strong> What was the client's problem?</li>
          <li><strong>The Solution (60s):</strong> Walk through 2-3 specific features you built to solve that problem. Don't just list features; explain <em>why</em> they are there.</li>
          <li><strong>The Result (30s):</strong> What was the impact? (e.g., increased speed, better conversion, happier client).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Using AI for the Voiceover</h2>
        <p>
          Not everyone is comfortable recording their own voice. Maybe you don't have a good microphone, or maybe English isn't your first language and you're targeting US clients. 
        </p>
        <p className="mt-4">
          This is where AI steps in. You can write your script and use <a href="https://try.elevenlabs.io/fb6nmetrrxow" target="_blank" rel="sponsored noopener" className="text-sky-400 hover:underline">ElevenLabs</a> to generate a highly professional, conversational voice track. With models supporting 30 to 70+ languages, you can even localize your portfolio walkthroughs for different regions.
        </p>
        <div className="bg-sky-900/20 border border-sky-800 p-4 rounded-lg mt-4">
          <p className="text-sm">
            <strong>Important note:</strong> If you are using this video to promote your services and get clients, this falls under commercial use. The ElevenLabs Free plan ($0/mo) does not include commercial rights. You will need to upgrade to at least the Starter plan (approx. $5/month) to legally use the audio for promotional portfolio videos.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Final Polish</h2>
        <p>
          Record your screen while moving the mouse smoothly. Drop the video and the AI audio into your editor. Lower the volume of the background music so the voice is clear. Add captions if possible, as many people watch videos on LinkedIn or Twitter with the sound off.
        </p>
      </section>

      <section className="pt-8 mt-8 border-t border-white/10">
        <AffiliateDisclosure />
      </section>
    </div>
  );
}
