import React, { useState } from 'react';

const CHECKLIST_ITEMS = [
  { id: 'offer', category: 'Offer & Pricing', text: 'Pricing is clear and matches the checkout page' },
  { id: 'mobile', category: 'Design', text: 'Landing page is fully readable on mobile' },
  { id: 'buttons', category: 'Design', text: 'All CTA buttons correctly link to the checkout step' },
  { id: 'test_buy', category: 'Testing', text: 'Completed a test purchase using Stripe/PayPal test mode' },
  { id: 'delivery', category: 'Delivery', text: 'Post-purchase email delivers the correct digital asset' },
  { id: 'tags', category: 'Automation', text: 'Buyers receive the "Customer" tag automatically' },
  { id: 'unsubscribe', category: 'Legal', text: 'Emails contain a working unsubscribe link' },
];

export default function FunnelLaunchChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const progress = Math.round((checkedItems.size / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Systeme.io Pre-Launch Checklist</h3>
        <div className="text-right">
          <span className="text-2xl font-bold text-amber-400">{progress}%</span>
          <span className="text-xs text-slate-400 block uppercase tracking-wider">Ready</span>
        </div>
      </div>

      <div className="w-full bg-slate-900 rounded-full h-1.5 mb-6">
        <div className="bg-amber-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="space-y-3">
        {CHECKLIST_ITEMS.map((item) => (
          <label 
            key={item.id} 
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              checkedItems.has(item.id) 
                ? 'bg-slate-900/50 border-emerald-500/30' 
                : 'bg-slate-900/30 border-slate-700/50 hover:border-slate-600'
            }`}
          >
            <div className="pt-0.5">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900 bg-slate-800"
                checked={checkedItems.has(item.id)}
                onChange={() => toggleItem(item.id)}
              />
            </div>
            <div>
              <div className={`text-sm font-medium ${checkedItems.has(item.id) ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                {item.text}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {item.category}
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => setCheckedItems(new Set())}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Reset Checklist
        </button>
      </div>
    </div>
  );
}
