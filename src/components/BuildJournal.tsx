import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GitCommitHorizontal, ArrowUpRight, RefreshCw } from 'lucide-react';
import { SITE_BASE_PATH } from '../lib/site';
type Update = {sha:string;date:string;title:string;url:string};
const repo='https://api.github.com/repos/iederees-create/3D-Portfolio';
function category(title:string){if(/butterfl|family|school|calendar/i.test(title))return 'Butterflies Educare';if(/craftbill/i.test(title))return 'CraftBill';if(/insightforge/i.test(title))return 'InsightForge';return 'Portfolio & projects';}
export default function BuildJournal({compact=false}:{compact?:boolean}){
 const [updates,setUpdates]=useState<Update[]>([]),[checked,setChecked]=useState(''),[source,setSource]=useState('Loading public updates…'),[filter,setFilter]=useState('All projects');
 useEffect(()=>{let active=true;const controller=new AbortController();let running=false;
 async function load(){if(running)return;running=true;try{
  const r=await fetch(repo+'/commits?sha=main&per_page=40',{signal:controller.signal});if(!r.ok)throw Error('Feed unavailable');const rows=await r.json();if(!Array.isArray(rows))throw Error('Invalid feed');
  const items:Update[]=rows.filter(x=>x.sha&&x.commit?.message&&x.commit?.committer?.date).map(x=>({sha:x.sha,date:x.commit.committer.date,title:String(x.commit.message).split('\n')[0],url:`https://github.com/iederees-create/3D-Portfolio/commit/${x.sha}`}));
  if(active){setUpdates(items);setSource('Live from public GitHub commits');setChecked(new Date().toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'}));}
 }catch{try{const r=await fetch(SITE_BASE_PATH+'development/updates.json',{signal:controller.signal});if(!r.ok)throw Error();const json=await r.json();if(active){setUpdates(json.updates||[]);setSource('Snapshot from the latest website build');}}catch{if(active)setSource('Updates temporarily unavailable. View the public commit history below.');}}finally{running=false;}}
 void load();const timer=window.setInterval(()=>{if(document.visibilityState==='visible')void load();},60000);return()=>{active=false;controller.abort();clearInterval(timer);};},[]);
 const visible=updates.filter(x=>filter==='All projects'||category(x.title)===filter).slice(0,compact?3:40);
 return <section aria-label="Public development journal" className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 sm:p-9">
 <div className="flex flex-wrap justify-between items-start gap-4 mb-7"><div><span className="text-xs font-bold tracking-widest uppercase text-emerald-300">Building in public</span><h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">On my workbench</h2><p className="text-slate-400 mt-3 max-w-2xl">A running journal of what I’m building, improving and fixing. Each entry links to the actual code change.</p></div><GitCommitHorizontal className="text-emerald-300" size={28}/></div>
 <p className="text-xs text-slate-400 flex items-center gap-2 mb-6"><RefreshCw size={12}/>{source}{checked?' · Checked '+checked:''}</p>
 {!compact&&<label className="block text-sm text-slate-300 mb-6">Filter by project <select value={filter} onChange={e=>setFilter(e.target.value)} className="ml-2 rounded-lg border border-white/20 bg-slate-900 p-2">{['All projects','Butterflies Educare','CraftBill','InsightForge','Portfolio & projects'].map(x=><option key={x}>{x}</option>)}</select></label>}
 <div className="space-y-4">{visible.map(x=><article key={x.sha} className="border-l-2 border-emerald-500/40 pl-5 py-2"><div className="flex flex-wrap gap-3 text-xs text-slate-400"><time dateTime={x.date}>{new Intl.DateTimeFormat('en-ZA',{dateStyle:'medium',timeStyle:'short',timeZone:'Africa/Johannesburg'}).format(new Date(x.date))}</time><span className="text-emerald-300">{category(x.title)}</span></div><h3 className="text-base font-semibold text-white my-2">{x.title}</h3><a href={x.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-300 hover:text-white inline-flex gap-2 items-center">View change <code className="text-xs">{x.sha.slice(0,7)}</code><ArrowUpRight size={13}/></a></article>)}</div>
 {!visible.length&&<p className="text-slate-400">No updates to show for this selection.</p>}
 <div className="mt-7 pt-5 border-t border-white/10 text-sm text-slate-400"><p>Commits show development progress. They do not by themselves confirm a successful deployment. Updates refresh every minute while this page is open.</p><div className="flex gap-5 flex-wrap mt-4">{compact&&<Link to="/development/" className="text-emerald-300">Read the full development journal →</Link>}<a href="https://github.com/iederees-create/3D-Portfolio/commits/main/" target="_blank" rel="noopener noreferrer" className="text-slate-300">Public commit history ↗</a></div></div>
 </section>;
}
