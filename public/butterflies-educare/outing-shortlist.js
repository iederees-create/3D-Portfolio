/* Principal-only fundraising comparisons. Choosing saves a preference, never a booking. */
(()=>{'use strict';const $=id=>document.getElementById(id),node=(tag,text)=>{const n=document.createElement(tag);if(text!=null)n.textContent=String(text);return n;};
const money=n=>new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR',maximumFractionDigits:0}).format(n);
const scenario=(a,n)=>({income:n*a.price,cost:n*a.variable+a.fixed,net:n*(a.price-a.variable)-a.fixed});
window.beOutingShortlistInit=async({db})=>{
 const list=$('outing-shortlist'),feedback=$('outing-choice-feedback');if(!list)return;let rows=[],research=[];
 const say=text=>{feedback.textContent=text;};
 const local=x=>new Date(new Date(x).getTime()+7200000).toISOString().slice(0,16);
 function fill(r){if(!r)return;$('plan-start').value=local(r.proposed_start);$('plan-end').value=local(r.proposed_end);$('plan-venue').value=r.venue;$('fundraiser-public-description').value=r.public_description;}
 $('plan-project').addEventListener('change',()=>fill(research.find(r=>r.project_id===$('plan-project').value)));
 function section(parent,label,text){parent.append(node('h4',label),node('p',text));}
 function sources(parent,urls){for(const url of new Set(urls)){try{const u=new URL(url);if(u.protocol!=='https:')continue;const a=node('a',u.hostname+' — source ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';parent.append(a,node('br'));}catch{}}}
 async function load(){
 const [result,notes]=await Promise.all([db.from('be_fundraiser_analysis').select('*,be_fundraising_projects(title,published,status)').order('project_id'),db.from('be_fundraiser_research').select('*')]);
 if(result.error||notes.error){say('Fundraising research could not be loaded. Refresh or contact your developer.');return;}
 research=notes.data||[];rows=(result.data||[]).filter(r=>r.be_fundraising_projects&&!r.be_fundraising_projects.published&&r.be_fundraising_projects.status==='planning');
 rows.sort((a,b)=>Number(b.selected)-Number(a.selected)||a.analysis.title.localeCompare(b.analysis.title));list.replaceChildren();
 if(!rows.length){list.append(node('p','No draft fundraising ideas are available.'));return;}
 const wrap=node('div');wrap.className='fundraiser-comparison';const comparison=node('table');comparison.append(node('caption','Illustrative middle scenario — compare assumptions before choosing'));
 const head=node('thead'),hr=node('tr');for(const t of ['Idea','Participation','School income','Costs','Surplus / loss'])hr.append(node('th',t));head.append(hr);comparison.append(head);const body=node('tbody');
 for(const r of rows){const a=r.analysis,s=scenario(a,a.counts[1]),tr=node('tr');const th=node('th');th.scope='row';const jump=node('a',a.title);jump.href='#fundraiser-idea-'+r.project_id;th.append(jump);tr.append(th,node('td',a.counts[1]+' '+a.unit),node('td',money(s.income)),node('td',money(s.cost)),node('td',money(s.net)));body.append(tr);}comparison.append(body);wrap.append(comparison);list.append(wrap);
 for(const r of rows){const a=r.analysis,extra=research.find(x=>x.project_id===r.project_id),card=node('article');card.className='outing-card'+(r.selected?' chosen':'');card.id='fundraiser-idea-'+r.project_id;
 card.append(node('span',r.selected?'Chosen for developer follow-up':a.kind),node('h3',a.title),node('p',a.verdict));
 const mid=scenario(a,a.counts[1]);const metric=node('p','Illustrative school surplus: '+money(mid.net));metric.className='fundraiser-net';card.append(metric,node('p',a.counts[1]+' '+a.unit+' at '+money(a.price)+' each. This is a planning scenario, not money raised or a confirmed selling price.'));
 const details=node('details');details.append(node('summary','How would this raise money? View budget and research'));
 section(details,'Where the money comes from',a.model);
 const table=node('table');table.className='fundraiser-budget';table.append(node('caption','Low, middle and higher participation — illustrative only'));const thead=node('thead'),h=node('tr');for(const t of ['Participation','Income','Costs','Surplus / loss'])h.append(node('th',t));thead.append(h);table.append(thead);const tbody=node('tbody');for(const n of a.counts){const s=scenario(a,n),tr=node('tr');tr.append(node('th',n+' '+a.unit),node('td',money(s.income)),node('td',money(s.cost)),node('td',money(s.net)));tbody.append(tr);}table.append(tbody);details.append(table);
 const margin=a.price-a.variable,be=margin>0?Math.ceil(a.fixed/margin):null;
 section(details,'Break-even',be===null?'No break-even at this price.':be+' '+a.unit+' needed to cover the modelled costs. Zero participation gives a '+money(a.fixed)+' loss if fixed spending has already been committed. For voluntary contributions, attendance is not a payment pledge.');
 section(details,'Budget assumptions',money(a.price)+' per '+a.unit+'; '+money(a.variable)+' variable cost per unit; '+money(a.fixed)+' fixed costs. Surplus = income − variable costs − fixed costs. Every extra R100 of cost reduces surplus by R100.');
 section(details,'What is included / excluded',a.cost_basis);
 section(details,'Verified information and open assumptions',a.verified);
 section(details,'Learning value',a.learning);
 section(details,'Timing and preparation',a.preparation);
 section(details,'Venue',extra?extra.venue:a.venue);
 if(extra){section(details,'Host schedule versus school proposal',extra.host_schedule);section(details,'Admission and age suitability',extra.admission_note+' '+extra.age_note);}
 section(details,'Before spending or inviting families',a.checks+(extra?' '+extra.verification_note:''));
 section(details,'Cash and affordability', 'Do not treat unpaid pledges or registrations as income. Take confirmed preorders where relevant; avoid spending before demand is known. Obtain quotes for every excluded cost. Payment fees, refunds, paid staff and additional expenses reduce these figures. Keep voluntary contributions optional.');
 details.append(node('p','Research checked '+a.checked_on+'. Published tariffs can change; estimates are not supplier quotes. School-led concepts have not been tested with families.'));
 sources(details,[...(a.sources||[]),...(extra?.source_urls||[])]);
 const choose=node('button',r.selected?'Chosen — we’ll handle the next steps':'Choose this idea');choose.type='button';choose.className='button '+(r.selected?'secondary':'primary');choose.disabled=r.selected;
 choose.onclick=async()=>{choose.disabled=true;try{const response=await db.rpc('be_choose_fundraiser_idea',{p_project_id:r.project_id});if(response.error)throw response.error;const select=$('plan-project');if([...select.options].some(o=>o.value===r.project_id)){select.value=r.project_id;select.dispatchEvent(new Event('change',{bubbles:true}));}await load();say('Your choice is saved. Your developer will handle final costing, dates, organiser checks and setup with you. Nothing has been booked, published or opened for payment.');}catch(e){say(e.message||'Could not save your choice.');choose.disabled=false;}};
 card.append(details,choose);list.append(card);
 }
 }
 await load();
};})();
