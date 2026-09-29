import { useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Building2, ExternalLink, Image as ImageIcon, RefreshCw, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Props = { user: User | null; isAdmin: boolean; authLoading: boolean; membershipError: string | null };
type Account = { user_id:string; account_type:'talent'|'agency'; display_name:string|null; company_name:string|null; created_at:string };
type Talent = { id:string; user_id:string; full_name:string; preferred_name:string|null; email:string|null; whatsapp:string|null; city:string|null; categories:string[]|null; portfolio_url:string|null; photo_url:string|null; listed:boolean; created_at:string };
type Media = { id:string; talent_id:string; media_type:string; title:string|null; url:string; caption:string|null; created_at:string };

export default function RunwayPanel({ user, isAdmin, authLoading, membershipError }: Props) {
  const [accounts,setAccounts]=useState<Account[]>([]);
  const [talent,setTalent]=useState<Talent[]>([]);
  const [media,setMedia]=useState<Media[]>([]);
  const [briefs,setBriefs]=useState<any[]>([]);
  const [bookings,setBookings]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);
  const [filter,setFilter]=useState<'all'|'talent'|'agency'>('all');

  const load=async()=>{
    if(!user || !isAdmin) return;
    setLoading(true); setError(null);
    const results=await Promise.all([
      supabase.from('runway_accounts').select('*').order('created_at',{ascending:false}),
      supabase.from('runway_talent').select('*').order('created_at',{ascending:false}),
      supabase.from('runway_media').select('*').order('created_at',{ascending:false}),
      supabase.from('runway_briefs').select('*').order('created_at',{ascending:false}),
      supabase.from('runway_bookings').select('*').order('created_at',{ascending:false}),
    ]);
    const failed=results.find(r=>r.error);
    if(failed?.error){ setError(failed.error.message); setLoading(false); return; }
    setAccounts((results[0].data||[]) as Account[]);
    setTalent((results[1].data||[]) as Talent[]);
    setMedia((results[2].data||[]) as Media[]);
    setBriefs(results[3].data||[]); setBookings(results[4].data||[]);
    setLoading(false);
  };
  useEffect(()=>{ load(); },[user?.id,isAdmin]);

  const mediaByTalent=useMemo(()=>{
    const map=new Map<string,Media[]>();
    media.forEach(m=>map.set(m.talent_id,[...(map.get(m.talent_id)||[]),m]));
    return map;
  },[media]);
  const talentByUser=useMemo(()=>new Map(talent.map(t=>[t.user_id,t])),[talent]);
  const shown=accounts.filter(a=>filter==='all'||a.account_type===filter);
  const agencies=accounts.filter(a=>a.account_type==='agency');
  const talentAccounts=accounts.filter(a=>a.account_type==='talent');

  if(authLoading) return <div className="flex-1 p-8 text-slate-400">Checking admin access…</div>;
  if(!user || !isAdmin) return <div className="flex-1 p-8"><div className="max-w-2xl rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-amber-200"><b>Runway admin access required.</b><p className="mt-2 text-sm text-slate-400">{membershipError || 'Sign in with an account listed in sf_site_admins to view private talent and company records.'}</p></div></div>;

  return <div className="flex-1 p-6 overflow-auto">
    <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div><p className="text-xs uppercase tracking-[.25em] text-fuchsia-300">Runway</p><h1 className="text-2xl font-bold text-white">Talent & company CRM</h1><p className="text-sm text-slate-500 mt-1">Signups, profiles, associated media, briefs and booking activity.</p></div>
      <button onClick={load} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15"><RefreshCw size={14} className={loading?'animate-spin':''}/>Refresh</button>
    </header>
    {error && <div className="mb-5 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300">{error}</div>}
    <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 mb-6">
      {[[talentAccounts.length,'Talent',Users],[agencies.length,'Companies',Building2],[media.length,'Media',ImageIcon],[briefs.length,'Briefs',Building2],[bookings.length,'Bookings',Users]].map(([n,label,Icon]:any)=><div key={label} className="rounded-xl border border-white/5 bg-white/[.03] p-4"><Icon size={16} className="text-fuchsia-300 mb-2"/><div className="text-2xl font-bold text-white">{n}</div><div className="text-xs text-slate-500">{label}</div></div>)}
    </div>
    <div className="flex gap-2 mb-4">{(['all','talent','agency'] as const).map(x=><button key={x} onClick={()=>setFilter(x)} className={`px-3 py-1.5 rounded-full text-xs capitalize ${filter===x?'bg-fuchsia-500 text-white':'bg-white/5 text-slate-400'}`}>{x==='agency'?'companies':x}</button>)}</div>
    <div className="grid gap-4">
      {shown.map(a=>{
        const t=talentByUser.get(a.user_id); const items=t?mediaByTalent.get(t.id)||[]:[];
        return <article key={a.user_id} className="rounded-2xl border border-white/5 bg-white/[.025] p-5">
          <div className="flex flex-col lg:flex-row gap-5">
            {t?.photo_url?<img src={t.photo_url} alt="" className="w-24 h-24 rounded-xl object-cover bg-black/30"/>:<div className="w-24 h-24 rounded-xl bg-black/30 grid place-items-center text-slate-600">{a.account_type==='agency'?<Building2/>:<Users/>}</div>}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-semibold text-white">{a.account_type==='agency'?(a.company_name||a.display_name||'Company'):(t?.preferred_name||t?.full_name||a.display_name||'Talent')}</h2><span className="px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-300 text-xs">{a.account_type==='agency'?'Company':'Talent'}</span>{t?.listed&&<span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-xs">Listed</span>}</div>
              <div className="text-sm text-slate-400 mt-1">{t?.city||''}{t?.email? ` · ${t.email}`:''}{t?.whatsapp? ` · ${t.whatsapp}`:''}</div>
              {t?.categories?.length?<div className="text-xs text-slate-500 mt-2">{t.categories.join(' · ')}</div>:null}
              {t?.portfolio_url?<a href={t.portfolio_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-cyan-300 mt-2">Portfolio <ExternalLink size={11}/></a>:null}
              <div className="text-[11px] text-slate-600 mt-3">Joined {new Date(a.created_at).toLocaleString()}</div>
            </div>
          </div>
          {items.length>0&&<div className="mt-4 pt-4 border-t border-white/5"><div className="text-xs uppercase tracking-wider text-slate-500 mb-3">Associated media ({items.length})</div><div className="flex gap-3 overflow-x-auto pb-2">{items.map(m=><a key={m.id} href={m.url} target="_blank" rel="noreferrer" className="shrink-0 w-36 rounded-lg border border-white/5 bg-black/20 overflow-hidden">{m.media_type==='image'?<img src={m.url} alt={m.title||''} className="w-full h-24 object-cover"/>:<div className="h-24 grid place-items-center text-slate-500"><ExternalLink/></div>}<div className="p-2 text-xs text-slate-300 truncate">{m.title||m.media_type}</div></a>)}</div></div>}
        </article>
      })}
      {!loading&&shown.length===0&&<div className="rounded-2xl border border-white/5 p-10 text-center text-slate-500">No Runway signups yet.</div>}
    </div>
  </div>;
}
