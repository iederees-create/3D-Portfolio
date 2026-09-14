const LAB = 'https://iederees-create.github.io/deriv-affiliate-launchpad-template/lab';
const DESK = 'https://iederees-create.github.io/deriv-affiliate-launchpad-template/';
const ARTICLE = 'https://iederees-create.github.io/deriv-affiliate-launchpad-template/blog/rsi-eclipse-across-volatility-charts';
const LINK = 'https://t.deriv.link?t=VQGBGPUYGJDZ';
const PROJECT_URL = `${import.meta.env.BASE_URL}work/trading-affiliate-website-template-deriv-partner-affiliate-launchpad/`;

const sections = [
  {
    heading: 'The desk people were looking at was already out of date',
    body: [
      'The portfolio card for this project still described a static affiliate funnel: config file, risk page, platform explainer, blog hub. That build is real. It is also incomplete as a description of what is live now. The launchpad grew a public practice desk. The desk grew a strategy. The strategy changed in public when the arithmetic failed. The current version is Apex RSI Eclipse: a shared Deriv demo that scans fifteen volatility indices on six timeframes and prints the result on a board anyone can watch without signing in.',
      'This write-up is the deep dive that should have been on the portfolio the day the scan went from one 5-minute chart to a grid. It is a build log, not a sales letter. Demo funds only. Not financial advice. Not an official Deriv website. I may earn a commission if you open an account through the partner link.',
    ],
  },
  {
    heading: 'Start with the artefact, not the slogan',
    body: [
      `Open the live desk: ${LAB}. You should see a dark instrument dropped into an otherwise light site. Six RSI dials. A scan grid of fifteen markets against 5-minute, 15-minute, 30-minute, 1-hour, 4-hour and daily charts. A practice wallet. A tape of recent wins and losses. Share buttons for X, LinkedIn, Facebook, WhatsApp, and a copy-link control.`,
      'The number in a cell is RSI, not price. Teal is the buy zone (RSI at or below 20). Copper is the sell zone (RSI at or above 80). Grey is waiting. Empty is still warming up. Tap a market name and the dials lock onto that row. Boom, Crash and Step are not on the grid.',
      `The companion article on the launchpad itself is here: ${ARTICLE}. Same facts, written for people who arrived from the desk rather than from this portfolio.`,
    ],
  },
  {
    heading: 'What the funnel was missing',
    body: [
      'A broker affiliate site that only explains platforms is a brochure. Most trading funnels then fill the gap with cropped screenshots and a private Telegram. I did not want that. The honest alternative is slower: run a rule on demo, show the wallet, show the losses, change the rule when the math fails, and keep the page public.',
      'That decision created a product constraint the original template did not have. The static pages still must not claim profits. The live board must not look like a signal room. The downloadable Expert Advisor must not execute on the website. Member-uploaded scripts are stored for review and never run. Only a parameterized tick strategy can go live, and only on a Deriv demo token kept on the server.',
    ],
  },
  {
    heading: 'The first public rule failed a fee-coin test',
    body: [
      'The first live rule chased four 1-second ticks in the same direction on Volatility 75 (1s). On more than a thousand trades it printed a win rate near 54 percent and still lost money. A win paid about 0.31. A loss cost 0.35. Break-even is about 53 percent. That is a coin with a fee, not an edge.',
      'I left that result on the site instead of deleting it. Hiding a failed sample would have turned the desk into the thing it was built against. The replacement rules — a spike-fade, then a 1-second RSI 30/70 — also leaked. The useful lesson was not “try a fancier indicator.” It was that 1-second noise is a bad place to ask a mean-reversion question if you cannot attach a stop.',
    ],
  },
  {
    heading: 'Move the question onto closed bars',
    body: [
      'Apex RSI Eclipse uses Wilder RSI(14) on closed 5-minute through daily bars. Buy when RSI drops below 20. Sell when it rises above 80. That band is stricter than 30/70 on purpose. The trade-off is fewer signals. The original 5-minute-only version could sit quiet for a long time. Visitors thought the feed had died.',
      'The fix was an OR-scan across M15, M30, H1, H4 and D1. Higher timeframes do not fire more often than M5. They add extra chances when M5 is quiet. If M5 is already at 18, M5 still wins. The server walks timeframes from fast to slow and markets in a fixed list. First valid signal takes the only open slot.',
      'Expiry matches the signalling chart: five minutes for M5, fifteen for M15, up to a day for D1, with a 15-minute then 5-minute fallback if the broker rejects the first duration. Rise/fall options cannot attach a 1,000-point stop and a 25,000-point target. The MT5 pack still uses those distances on a CFD. The website uses time. Comparing the two as if they were the same trade is a category error.',
    ],
  },
  {
    heading: 'Fifteen markets, one contract, three products excluded',
    body: [
      'The scan list is Volatility 10, 15, 25, 30, 50, 75, 90, 100, 150 and 250 on the 1-second variants, plus standard Volatility 10, 25, 50, 75 and 100. Boom, Crash and Step stay off. Spike and step products have a different shape. A 20/80 fade that is reasonable on a volatility index is not automatically reasonable on a market built around discontinuous jumps.',
      'One global contract is the risk rule and the readability rule. If two cells go teal together, the walk order decides and everything else waits. A board with six open tickets would look busy and teach the wrong lesson.',
      'Stake is $1 demo. No martingale. No size-up after a loss. After three consecutive losses the run pauses. That pause is part of the product. It is the behaviour I want people to copy before they ever think about live money.',
    ],
  },
  {
    heading: 'How the board is built so a non-trader can read it',
    body: [
      'The old board was a recap paragraph, a wallet, a trade table, and copy that still talked about 1-second spikes after the engine had moved on. That is how a showcase goes stale: the backend ships, the UI keeps narrating the previous rule.',
      'The rebuilt desk treats RSI as an instrument. The signature visual is an eclipse dial: a 270-degree gauge with a teal buy band, a copper sell band, and a needle. Six dials, one per timeframe, locked to the highlighted market. Under that, a heatmap. Colour is not the only signal — each cell also prints the RSI number, and sell-zone dots are squared so colour-blind visitors still get a shape difference.',
      'Three cards sit above the grid on purpose: what this is, what RSI means, how to read a cell. If a visitor has to reverse-engineer a trading terminal to understand a public demo, the page failed.',
    ],
  },
  {
    heading: 'The stack, without the mythology',
    body: [
      'The public site is Vite, React and TypeScript on GitHub Pages. The live engine is a Node service on Render (the same listing-manager box that already held the Deriv demo token). The browser polls `/api/lab/live` and also listens on an event stream. The payload now includes `rsiByMarket`, `rsiByTimeframe`, `scannedSymbols` and `timeframes` so the UI does not have to guess.',
      'Candles are seeded with Deriv history (`ticks_history` style candles at 300, 900, 1800, 3600, 14400 and 86400 seconds) and then aggregated from the live tick feed. A stale-feed watch resubscribes if ticks freeze. Transient WebSocket errors do not kill the week run. Description-only strategy edits resume the same run so a copy tweak does not reset the sample.',
      'Secrets stay off the page. The demo token never appears in the public JSON. The MT5 trade password is not accepted on the website. Downline members who want the Expert Advisor claim it after their Deriv ID is verified on this partner downline. Anyone else can still watch.',
    ],
  },
  {
    heading: 'Why share buttons belong on a practice desk',
    body: [
      'A public demo that cannot be linked is a private club with extra steps. The desk, the lab route, the launchpad article, this portfolio article, and the project page all expose the same share set: native share where the browser supports it, then X, LinkedIn, Facebook, WhatsApp, and copy link. Open Graph and Twitter cards point at a dedicated RSI Eclipse image so a pasted URL does not look like a generic template thumbnail.',
      'That is not growth-hack theatre. The commercial model is a disclosed partner link. The traffic model is “here is the board, here is the rule, here is the loss.” If that cannot survive a LinkedIn preview, it should not be posted.',
    ],
  },
  {
    heading: 'What I will not say in a case study',
    body: [
      'I will not say the strategy is profitable. I will not treat two winning trades as a track record. I will not call demo dollars a salary. I will not tell you to fund a live account. I will not imply Deriv endorses this desk.',
      'I will show the wallet going down. I will show the pause. I will show cells that are not signalling. Quiet is part of 20/80. A heatmap that is always on fire would mean the bands are too loose or the page is lying.',
    ],
  },
  {
    heading: 'If you want the same shape for a different offer',
    body: [
      'The reusable piece is not “an RSI bot.” It is a funnel that can tell the truth in public: a static site with risk copy, a live artefact that updates without a login, a gated download that does not execute visitor scripts, and articles that match the current rule instead of last month’s screenshot.',
      `Live launchpad: ${DESK}. Live desk: ${LAB}. This project page: the trading affiliate case study on this portfolio. Partner link: ${LINK}. Referral code 28EX72Q47LR4.`,
      'If you need a public demo, a compliance-first affiliate destination, or a board that explains itself, that is the work. Trading remains a way to lose money. The page should keep saying so.',
    ],
  },
];

export default function ApexRsiEclipseLivePracticeDeskContent() {
  return (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300">
      <p className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100">
        Educational build log. Demo funds only. Not financial advice, not a signal service, not an official Deriv website, and not a promise of trading profits or affiliate earnings. Iederees Francis may earn a commission from the disclosed partner link.
      </p>
      <p className="mb-6">
        <a href={LAB} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">Watch the live RSI Eclipse desk</a>
        {' · '}
        <a href={ARTICLE} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">Read the launchpad article</a>
        {' · '}
        <a href={PROJECT_URL} className="text-primary-400 hover:text-primary-300 font-semibold">Open the project page</a>.
      </p>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mb-6">{paragraph}</p>
          ))}
        </section>
      ))}
      <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">How to watch without creating an account</h2>
      <p className="mb-6">
        Go to the lab page. You do not need a VIP login. You will see the scan grid, the dials, the demo wallet, finished trades, and the weekly recap. If you want your own practice account, use the partner link and referral code 28EX72Q47LR4. You keep the public board either way.
      </p>
    </div>
  );
}
