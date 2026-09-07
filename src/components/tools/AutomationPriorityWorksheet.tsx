import React, { useState } from 'react';

type Rating = 1 | 2 | 3 | 4 | 5;

export function AutomationPriorityWorksheet() {
  const [frequency, setFrequency] = useState<Rating>(3);
  const [effort, setEffort] = useState<Rating>(3);
  const [errorRisk, setErrorRisk] = useState<Rating>(3);
  const [exceptions, setExceptions] = useState<Rating>(3); // 1 = High exceptions, 5 = Standardized

  // Score calculation: Frequency * Effort * ErrorRisk * Standardization / 25
  const rawScore = (frequency * effort * errorRisk * exceptions) / 625;
  const scorePercentage = Math.round(rawScore * 100);

  let recommendation = "";
  if (scorePercentage > 75) recommendation = "High Priority: Automate immediately.";
  else if (scorePercentage > 40) recommendation = "Medium Priority: Worth automating after high-impact tasks.";
  else recommendation = "Low Priority: Standardize the human process first.";

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 my-8">
      <h3 className="text-xl font-semibold text-white mb-4">Automation Priority Calculator</h3>
      <p className="text-sm text-slate-400 mb-6">Rate each factor from 1 to 5 to determine if a workflow is worth automating in Make.</p>
      
      <div className="space-y-4 mb-6">
        <RatingRow label="Frequency" desc="How often does this happen? (1 = Rarely, 5 = Multiple times daily)" value={frequency} onChange={setFrequency} />
        <RatingRow label="Manual Effort" desc="How much time does it take manually? (1 = Quick, 5 = Hours)" value={effort} onChange={setEffort} />
        <RatingRow label="Error Risk" desc="Cost of a human mistake? (1 = Trivial, 5 = High cost/Client facing)" value={errorRisk} onChange={setErrorRisk} />
        <RatingRow label="Standardization" desc="Are there exceptions to the rule? (1 = Many exceptions, 5 = Always exactly the same)" value={exceptions} onChange={setExceptions} />
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <div className="flex items-end justify-between mb-2">
          <span className="text-sm font-medium text-slate-300">Priority Score</span>
          <span className="text-2xl font-bold text-emerald-400">{scorePercentage}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
          <div className="bg-emerald-400 h-2 rounded-full transition-all duration-300" style={{ width: `${scorePercentage}%` }}></div>
        </div>
        <p className="text-sm text-slate-300 font-medium">{recommendation}</p>
      </div>
    </div>
  );
}

function RatingRow({ label, desc, value, onChange }: { label: string, desc: string, value: Rating, onChange: (v: Rating) => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-900/30 rounded-lg border border-slate-700/30">
      <div>
        <div className="text-sm font-medium text-slate-200">{label}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => onChange(num as Rating)}
            className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
              value === num 
                ? 'bg-sky-500 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
