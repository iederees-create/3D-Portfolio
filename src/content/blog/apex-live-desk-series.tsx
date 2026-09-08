import type { ReactNode } from 'react';

const DESK = 'https://iederees-create.github.io/deriv-affiliate-launchpad-template/';
const LAB = 'https://iederees-create.github.io/deriv-affiliate-launchpad-template/lab';
const LINK = 'https://t.deriv.link?t=VQGBGPUYGJDZ';

function Article({ children }: { children: ReactNode }) {
  return <div className="prose prose-invert prose-lg max-w-none text-slate-300">{children}</div>;
}

function H({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id} className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">{children}</h2>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mb-6">{children}</p>;
}

function A({ href: href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">{children}</a>;
}

export function LiveDemoInsteadOfSignals() {
  return (
    <Article>
      <H id="why">Why a public demo instead of a signal room</H>
      <P>Most trading funnels sell screenshots. I built the opposite: a page that shows a Deriv practice run while it is happening. Anyone can watch it without an account.</P>
      <P>The desk is independent. I may earn a commission if you open Deriv through my partner link. It is not an official Deriv website, not a bot room, and not financial advice.</P>
      <P>Watch it here: <A href={LAB}>live practice run</A>. Partner link: <A href={LINK}>{LINK}</A>. Referral code 28EX72Q47LR4.</P>
    </Article>
  );
}

export function V75IsNotASalary() {
  return (
    <Article>
      <H id="hours">Volatility 75 does not clock out</H>
      <P>1-second Volatility 75 does not close at 17:00. That is useful for practice. It is also why people sit in front of ticks like a night shift.</P>
      <P>A salary has hours. This market does not. You have to put the clock on yourself: session length, trade cap, daily stop. Otherwise there is always one more tick that looks like getting even.</P>
      <P>The public run pauses after three losses in a row. That is the point of showing it, not hiding the pause. <A href={DESK}>Apex Trade Network</A></P>
    </Article>
  );
}

export function FiftyFourPercentIsNotAnEdge() {
  return (
    <Article>
      <H id="math">Why 38 wins and 32 losses is not a strategy</H>
      <P>The first live rule on the desk chased four 1-second ticks in the same direction. It printed a win rate near 54%. On this contract, a win paid about 0.31 and a loss cost 0.35. Break-even is about 53%. That is a coin with a fee, not an edge.</P>
      <P>I am saying that in public because hiding it would be a sales trick. The board is a demo. If the arithmetic is ugly, the honest move is to change the rule, not to crop the screenshot.</P>
      <P>See the current board: <A href={LAB}>watch the run</A>.</P>
    </Article>
  );
}

export function SpikeFadeExplained() {
  return (
    <Article>
      <H id="rule">The replacement rule: fade a spike</H>
      <P>1-second synthetics print a lot of noise. Four ticks in a row is not a trend. A jump that is much larger than the recent average tick is a spike. The new public rule fades that spike: if the last second jumped up hard, it tries down; if it dumped, it tries up. It holds eight ticks.</P>
      <P>That is still a hypothesis. It can lose. It uses demo funds on the website. It is not a promise of profit and not a signal service.</P>
      <P>Same desk: <A href={DESK}>Apex Trade Network</A>.</P>
    </Article>
  );
}

export function DemoFundsAreNotCash() {
  return (
    <Article>
      <H id="wallet">The wallet on the page is practice money</H>
      <P>The live board shows a starting demo balance, a current demo balance, and “made this week.” Those numbers are Deriv virtual funds. They are not cash in a live account. Render is not charging extra for the test. The trades do not spend real money.</P>
      <P>If someone quotes those numbers as income, they are misreading the page. I put the labels there on purpose.</P>
      <P><A href={LAB}>Open the live board</A>.</P>
    </Article>
  );
}

export function HowToWatchTheRun() {
  return (
    <Article>
      <H id="watch">How to watch without signing up</H>
      <P>Go to the lab page. You do not need a VIP login to see the run. You will see the latest price, finished trades, won/lost, the demo wallet, and a weekly recap.</P>
      <P>If you want your own practice account, use the partner link <A href={LINK}>{LINK}</A> and referral code 28EX72Q47LR4. I may earn a commission if you later qualify as a client. You keep the public board either way.</P>
      <P><A href={LAB}>Live practice run</A>.</P>
    </Article>
  );
}

export function HowToAddTheEa() {
  return (
    <Article>
      <H id="mt5">How to add the Expert Advisor on Deriv MT5</H>
      <P>Downline members can download an .mq5 file that follows the same spike-fade rule, plus a text file of install steps. Demo first.</P>
      <P>In short: open Deriv MT5 demo → File → Open Data Folder → MQL5/Experts → copy the file → refresh Navigator → drag it onto a Volatility 75 chart → allow algo trading. Use 0.01 lots. Do not raise lots after a loss. The website board and your EA will not take the same trade at the same second.</P>
      <P>The download is gated to people who opened Deriv through the partner link. <A href={DESK}>Desk</A></P>
    </Article>
  );
}

export function WhyTheDownloadIsGated() {
  return (
    <Article>
      <H id="gate">Why the EA is not a public zip on the homepage</H>
      <P>Anyone can watch the demo. The Expert Advisor is only for people who opened a Deriv account through this partner link. That is the commercial relationship, disclosed in the header and footer.</P>
      <P>Enter the Deriv ID from account settings. If Partner Hub does not tag you yet, the claim stays pending until it is confirmed. Existing clients should not open a second account just to grab a file.</P>
      <P>Partner link: <A href={LINK}>{LINK}</A>.</P>
    </Article>
  );
}

export function PauseAfterThreeLosses() {
  return (
    <Article>
      <H id="pause">The pause is part of the product</H>
      <P>The public run stops placing new demo trades after three losses in a row. It also has a daily demo-loss cap. That is not a bug. It is the rule I want people to copy before they ever size up.</P>
      <P>Revenge trades after the third loser are how a 2% day becomes an 8% day. Showing the pause in public is more useful than a green streak with the stop hidden.</P>
      <P><A href={LAB}>See it live</A>.</P>
    </Article>
  );
}

export function WhatThisDeskWillNeverClaim() {
  return (
    <Article>
      <H id="never">What this desk will not claim</H>
      <P>I will not claim the EA prints a salary. I will not claim 54% is an edge when the payout is 0.31 against 0.35. I will not switch the public run to live money to look braver. I will not send you signals in a Telegram that I refuse to show on the website.</P>
      <P>I will show the demo, the pauses, the partner link, and the risk line. Trading can lose more than you put in on leveraged products. Educational, not advice.</P>
      <P>Start here: <A href={DESK}>Apex Trade Network</A>. Iederees Francis. WhatsApp +27629494708.</P>
    </Article>
  );
}
