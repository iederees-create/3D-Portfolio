import React, { useState } from 'react';

export default function ScriptTimingEstimator() {
  const [wordCount, setWordCount] = useState(150);
  const [wpm, setWpm] = useState(150); // average speaking rate

  const estimatedMinutes = wordCount / wpm;
  const minutes = Math.floor(estimatedMinutes);
  const seconds = Math.round((estimatedMinutes - minutes) * 60);

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 my-8">
      <h3 className="text-xl font-semibold text-white mb-4">Voiceover Timing Estimator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Script Word Count
          </label>
          <input
            type="number"
            min="1"
            value={wordCount}
            onChange={(e) => setWordCount(parseInt(e.target.value) || 0)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Speaking Rate (Words Per Minute)
          </label>
          <select
            value={wpm}
            onChange={(e) => setWpm(parseInt(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="120">Slow (120 wpm - Explainer/Tutorial)</option>
            <option value="150">Average (150 wpm - Conversational)</option>
            <option value="180">Fast (180 wpm - Commercial/Promo)</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 flex items-center justify-between border border-slate-700/50">
        <div>
          <p className="text-sm text-slate-400">Estimated Duration</p>
          <p className="text-2xl font-bold text-sky-400">
            {minutes}m {seconds}s
          </p>
        </div>
        <div className="text-right text-xs text-slate-500 max-w-[200px]">
          *This is a deterministic estimate. Actual AI voice generation duration may vary slightly based on pauses and punctuation.
        </div>
      </div>
    </div>
  );
}
