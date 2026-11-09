/* Butterflies Educare unified school calendar.
 * Published school events + available guest-class times in Africa/Johannesburg.
 * Verified community accounts can request slots; only authorised school staff approve.
 * No learner data, child photos or payment processing. */
(() => {
"use strict";
const ROOT="https://sijvvbozaufzpjirijhb.supabase.co",KEY="sb_publishable_dWWgbtZUAGVqIEvjMU5DFA_3Pi98GHU",TZ="Africa/Johannesburg";
const $=id=>document.getElementById(id);
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined&&text!==null)n.textContent=String(text);if(cls)n.className=cls;return n;};
const put=(parent,tag,text,cls)=>{const n=el(tag,text,cls);parent.appendChild(n);return n;};
const btn=(label,fn,cls)=>{const b=el("button",label,cls);b.type="button";b.addEventListener("click",fn);return b;};
const val=(form,name)=>String(new FormData(form).get(name)||"").trim();
const show=(id,yes)=>{$(id).hidden=!yes;};
const today=new Date(),fmtYear=new Intl.DateTimeFormat("en-GB",{timeZone:TZ,year:"numeric"}),fmtMonthNum=new Intl.DateTimeFormat("en-GB",{timeZone:TZ,month:"2-digit"});
const st={
 year:Number(fmtYear.format(today)),month:Number(fmtMonthNum.format(today))-1,
 selected:null,filter:"all",events:[],slots:[],my:[],staffSlots:[],proposals:[]
};
const baseMonth=st.year*12+st.month;
let db=null,user=null,profile=null,staff=null;
const partsFormatter=new Intl.DateTimeFormat("en-GB",{timeZone:TZ,day:"2-digit",month:"2-digit",year:"numeric"});
const dayLong=new Intl.DateTimeFormat("en-ZA",{timeZone:TZ,weekday:"long",year:"numeric",month:"long",day:"numeric"});
const monthLong=new Intl.DateTimeFormat("en-ZA",{timeZone:TZ,year:"numeric",month:"long"});
const clock=new Intl.DateTimeFormat("en-ZA",{timeZone:TZ,hour:"2-digit",minute:"2-digit",hour12:false});
const dayKey=d=>{
 const a=partsFormatter.formatToParts(new Date(d)),get=t=>a.find(x=>x.type===t)?.value||"";
 return get("year")+"-"+get("month")+"-"+get("day");
};
const ym=(y,m)=>y+"-"+String(m+1).padStart(2,"0");
const monthStart=(y,m)=>new Date(Date.UTC(y,m,1,-2)).toISOString();
const labelTime=x=>dayLong.format(new Date(x))+" · "+clock.format(new Date(x));
const range=s=>clock.format(new Date(s.starts_at))+"–"+clock.format(new Date(s.ends_at));
const alertMsg=(message,error=false)=>{
 const x=$("cal-alert");x.textContent=String(message);x.classList.toggle("error",error);x.hidden=false;
};
function open(id){const d=$(id);if(d&&!d.open)d.showModal();}
function close(id){const d=$(id);if(d?.open)d.close();}
function entriesOnDay(key,filter="all"){
 return [
 ...st.events.filter(x=>dayKey(x.starts_at)===key).map(x=>({...x,kind:"event"})),
 ...st.slots.filter(x=>dayKey(x.starts_at)===key).map(x=>({...x,kind:"slot"}))
 ].filter(x=>filter==="all"||x.kind===filter).sort((a,b)=>new Date(a.starts_at)-new Date(b.starts_at));
}
function renderGrid(){
 const root=$("cal-days");root.replaceChildren();
 $("cal-month-label").textContent=monthLong.format(new Date(Date.UTC(st.year,st.month,15,12)));
 $("cal-prev").disabled=st.year*12+st.month<=baseMonth;
 $("cal-next").disabled=st.year*12+st.month>=baseMonth+11;
 const offset=(new Date(Date.UTC(st.year,st.month,1,12)).getUTCDay()+6)%7;
 const length=new Date(Date.UTC(st.year,st.month+1,0,12)).getUTCDate();
 for(let i=0;i<offset;i++){const s=el("span",null,"cal-day off");s.setAttribute("aria-hidden","true");root.appendChild(s);}
 for(let d=1;d<=length;d++){
  const key=ym(st.year,st.month)+"-"+String(d).padStart(2,"0"),items=entriesOnDay(key);
  const b=btn(String(d),()=>{st.selected=key;renderGrid();renderSelected();},"cal-day");
  b.classList.toggle("selected",st.selected===key);
  b.classList.toggle("today",dayKey(new Date())===key);
  b.setAttribute("aria-pressed",String(st.selected===key));
  b.setAttribute("aria-label",key+"; "+items.length+" school events or open class times");
  const dots=el("span",null,"cal-pips");
  if(items.some(i=>i.kind==="event"))dots.appendChild(el("i",null,"event"));
  if(items.some(i=>i.kind==="slot"))dots.appendChild(el("i",null,"slot"));
  b.appendChild(dots);root.appendChild(b);
 }
}
function saveEvent(event){
 const icsSafe=v=>String(v||"").replace(/\\/g,"\\\\").replace(/\r?\n/g,"\\n").replace(/[;,]/g,"\\$&");
 const stamp=v=>new Date(v).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
 const lines=[
  "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Butterflies Educare//School Calendar//EN",
  "BEGIN:VEVENT","UID:be-"+String(event.id).replace(/[^a-f0-9-]/g,"")+"@school-calendar",
  "DTSTAMP:"+stamp(new Date()),"DTSTART:"+stamp(event.starts_at),
  "SUMMARY:"+icsSafe(event.title),"DESCRIPTION:"+icsSafe(event.description||"Confirm all details with the school."),
  "LOCATION:"+icsSafe(event.venue||"School")
 ];
 if(event.ends_at)lines.push("DTEND:"+stamp(event.ends_at));
 lines.push("END:VEVENT","END:VCALENDAR");
 const url=URL.createObjectURL(new Blob([lines.join("\r\n")+"\r\n"],{type:"text/calendar;charset=utf-8"}));
 const a=el("a");a.href=url;a.download="butterflies-event.ics";document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function propose(slot){
 if(!user){alertMsg("Sign in to request this time.");open("cal-auth-dialog");return;}
 if(!profile?.privacy_consent_at){
  alertMsg("First complete your account profile and privacy acknowledgement in the parent network, then return to this calendar.",true);return;
 }
 const f=$("cal-request-form");f.reset();f.elements.namedItem("slot_id").value=slot.id;
 $("cal-slot-explainer").textContent=labelTime(slot.starts_at)+" – "+clock.format(new Date(slot.ends_at))+" · "+slot.venue+"; subject to school approval.";
 open("cal-dialog");
}
function renderSelected(){
 const root=$("cal-day-items");root.replaceChildren();
 if(!st.selected){$("cal-day-heading").textContent="Choose a date";root.appendChild(el("p","Select a date to view the calendar.","cal-empty"));return;}
 $("cal-day-heading").textContent=dayLong.format(new Date(st.selected+"T12:00:00+02:00"));
 const items=entriesOnDay(st.selected,st.filter);
 if(!items.length){root.appendChild(el("p","No published events or open class times for this date.","cal-empty"));return;}
 items.forEach(item=>{
  const card=el("article",null,"cal-item type-"+item.kind);
  put(card,"span",item.kind==="event"?"School event":"Available guest-class time","cal-item-badge "+item.kind);
  put(card,"strong",item.kind==="event"?item.title:(item.topic_hint||"Community guest class"));
  const end=item.ends_at||new Date(new Date(item.starts_at).getTime()+3600000).toISOString();
  put(card,"p",range({starts_at:item.starts_at,ends_at:end})+" · "+(item.venue||"School"));
  if(item.kind==="event"){
   if(item.description)put(card,"p",item.description);
   card.appendChild(btn("Save to calendar",()=>saveEvent(item)));
  }else{
   put(card,"p","Tell the school what you could teach or share.");
   card.appendChild(btn("Propose a class",()=>propose(item),"cal-action"));
  }
  root.appendChild(card);
 });
}
async function refreshMonth(){
 if(!db)return;
 const start=monthStart(st.year,st.month),end=monthStart(st.year,st.month+1);
 const [events,slots]=await Promise.all([
  db.from("be_school_events").select("id,title,description,starts_at,ends_at,venue").eq("published",true).gte("starts_at",start).lt("starts_at",end).order("starts_at"),
  db.from("be_class_slots").select("id,starts_at,ends_at,venue,topic_hint").eq("published",true).eq("state","open").gte("starts_at",start).lt("starts_at",end).order("starts_at")
 ]);
 if(events.error||slots.error)alertMsg("Calendar updates could not be fully loaded.",true);
 st.events=events.data||[];st.slots=slots.data||[];renderGrid();renderSelected();
}
function shiftMonth(delta){
 const candidate=st.year*12+st.month+delta;
 if(candidate<baseMonth||candidate>baseMonth+11)return;
 const date=new Date(Date.UTC(st.year,st.month+delta,1,12));
 st.year=date.getUTCFullYear();st.month=date.getUTCMonth();
 const key=dayKey(new Date());
 st.selected=ym(st.year,st.month)===key.slice(0,7)?key:ym(st.year,st.month)+"-01";
 refreshMonth();
}
async function refreshAccount(){
 if(!db)return;
 const response=await db.auth.getUser();
 user=response.data?.user||null;profile=null;staff=null;
 if(user){
  const [p,r]=await Promise.all([
   db.from("be_parent_profiles").select("display_name,privacy_consent_at").eq("user_id",user.id).maybeSingle(),
   db.from("be_staff_memberships").select("staff_role").eq("user_id",user.id).maybeSingle()
  ]);
  if(!p.error)profile=p.data;
  if(!r.error)staff=r.data?.staff_role||null;
 }
 $("cal-account").textContent=user?"Sign out":"Sign in";
 $("cal-user-state").textContent=user?(staff?"School team account":"Signed in: "+(profile?.display_name||user.email||"Account")):"Public calendar";
 show("cal-my-requests",Boolean(user));show("cal-staff",Boolean(staff));
 if(user)await loadMine();
 if(staff)await loadStaff();
}
async function loadMine(){
 const root=$("cal-my-list");root.replaceChildren();
 const r=await db.from("be_class_proposals")
  .select("id,class_title,state,created_at,be_class_slots(starts_at,ends_at,venue)")
  .eq("requested_by",user.id).order("created_at",{ascending:false}).limit(30);
 if(r.error){root.appendChild(el("p","Your proposals are temporarily unavailable.","cal-empty"));return;}
 const list=r.data||[];
 if(!list.length){root.appendChild(el("p","You have not submitted any classes yet.","cal-empty"));return;}
 list.forEach(p=>{
  const card=el("article",null,"cal-proposal");put(card,"strong",p.class_title);
  put(card,"p","Status: "+p.state+" · "+(p.be_class_slots?.starts_at?labelTime(p.be_class_slots.starts_at):"Time not available"));
  if(p.state==="pending")card.appendChild(btn("Withdraw pending request",async()=>{
   if(!confirm("Withdraw this class request and free up its slot?"))return;
   const r=await db.rpc("be_withdraw_class_proposal",{p_proposal_id:p.id});
   if(r.error){alertMsg(r.error.message,true);return;}
   alertMsg("Your proposal was withdrawn.");
   await Promise.all([loadMine(),refreshMonth()]);
  }));
  root.appendChild(card);
 });
}
function parseSast(v){
 if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(v))return null;
 const dt=new Date(v+":00+02:00");
 return Number.isFinite(dt.valueOf())?dt:null;
}
async function createSlot(event){
 event.preventDefault();const form=event.currentTarget,b=form.querySelector('button[type="submit"]');b.disabled=true;
 try{
  if(!staff)throw Error("School staff account required.");
  const start=parseSast(val(form,"starts")),end=parseSast(val(form,"ends")),venue=val(form,"venue");
  if(!start||!end||start<=Date.now()+12*3600000||end<=start||end-start>3*3600000||start>Date.now()+366*86400000)
   throw Error("Please choose a future slot of up to three hours, at least twelve hours ahead.");
  if(venue.length<3||venue.length>120)throw Error("Please enter a valid room or activity area.");
  const existing=await db.from("be_school_events").select("title,starts_at,ends_at,venue").eq("published",true)
   .lt("starts_at",end.toISOString()).gte("starts_at",new Date(start.getTime()-3*3600000).toISOString());
  if(existing.error)throw existing.error;
  const collides=(existing.data||[]).some(x=>{
   const last=new Date(x.ends_at||new Date(new Date(x.starts_at).getTime()+3600000));
   return new Date(x.starts_at)<end&&last>start&&(!x.venue||x.venue.toLowerCase()===venue.toLowerCase());
  });
  if(collides)throw Error("A published school event already uses this time and venue.");
  const publish=form.elements.namedItem("published").checked;
  const r=await db.from("be_class_slots").insert({starts_at:start.toISOString(),ends_at:end.toISOString(),venue,topic_hint:val(form,"topic_hint")||null,published:publish,created_by:user.id});
  if(r.error)throw r.error;
  alertMsg(publish?"A new class opportunity is now available.":"This time has been saved as a draft.");
  form.reset();form.elements.namedItem("published").checked=true;
  await Promise.all([loadStaff(),refreshMonth()]);
 }catch(e){alertMsg(e.message||"Could not create time slot.",true);}finally{b.disabled=false;}
}
async function review(id,approve,check,notes,actions){
 if(approve&&!check.checked){alertMsg("Confirm the principal's approval and safeguarding checks first.",true);return;}
 if(!confirm(approve?"Approve this class and publish it as a school event?":"Decline the proposal and release its time?"))return;
 actions.querySelectorAll("button").forEach(b=>b.disabled=true);
 try{
  const r=await db.rpc("be_staff_review_class_proposal",{p_proposal_id:id,p_approve:approve,p_screening_confirmed:check.checked,p_staff_notes:notes.value.trim()||null});
  if(r.error)throw r.error;
  alertMsg(approve?"Class approved and added to the school calendar.":"Proposal declined. The slot is open again.");
  await Promise.all([loadStaff(),refreshMonth()]);
 }catch(e){alertMsg(e.message,true);}
 finally{actions.querySelectorAll("button").forEach(b=>b.disabled=false);}
}
async function loadStaff(){
 if(!staff)return;
 const from=new Date(Date.now()-3*86400000).toISOString();
 const [s,p]=await Promise.all([
  db.from("be_class_slots").select("id,starts_at,ends_at,venue,state,published").gte("starts_at",from).order("starts_at").limit(90),
  db.from("be_class_proposals").select("id,class_title,class_summary,background_summary,presenter_name,presenter_email,state,staff_notes,be_class_slots(starts_at,ends_at,venue)")
  .order("created_at",{ascending:false}).limit(70)
 ]);
 const slots=$("cal-staff-slots");slots.replaceChildren();
 if(s.error)slots.appendChild(el("p","Staff availability could not be loaded.","cal-empty"));
 else if(!s.data?.length)slots.appendChild(el("p","No published times or drafts yet.","cal-empty"));
 else s.data.forEach(slot=>{
  const card=el("article",null,"cal-review-item");
  put(card,"strong",labelTime(slot.starts_at));
  put(card,"p",slot.venue+" · "+slot.state+" · "+(slot.published?"Published":"Draft"));
  if(slot.state==="open")card.appendChild(btn(slot.published?"Hide time":"Publish time",async()=>{
   const r=await db.from("be_class_slots").update({published:!slot.published}).eq("id",slot.id).eq("state","open").select("id");
   if(r.error||!r.data?.length){alertMsg(r.error?.message||"This time is no longer open.",true);return;}
   alertMsg("Availability updated.");await Promise.all([loadStaff(),refreshMonth()]);
  }));
  slots.appendChild(card);
 });
 const list=$("cal-review-list");list.replaceChildren();
 if(p.error){list.appendChild(el("p","Private class proposals could not be loaded.","cal-empty"));return;}
 if(!p.data?.length){list.appendChild(el("p","No guest-class proposals yet.","cal-empty"));return;}
 p.data.forEach(prop=>{
  const card=el("article",null,"cal-review-item");
  put(card,"strong",prop.class_title);
  put(card,"p","Status: "+prop.state+" · "+(prop.be_class_slots?.starts_at?labelTime(prop.be_class_slots.starts_at):"Time unavailable"));
  put(card,"p","Presenter: "+prop.presenter_name+" · "+prop.presenter_email);
  put(card,"p","Class: "+prop.class_summary);
  put(card,"p","Background: "+prop.background_summary);
  if(prop.staff_notes)put(card,"p","Staff note: "+prop.staff_notes);
  if(prop.state==="pending"){
   const checkLabel=el("label",null,"cal-check"),check=el("input");check.type="checkbox";
   check.setAttribute("aria-label","Principal and safeguarding approval for "+prop.class_title);
   checkLabel.append(check,el("span","Principal approval and safeguarding checks completed"));card.appendChild(checkLabel);
   const notes=el("textarea");notes.maxLength=1000;notes.rows=2;notes.placeholder="Optional staff review notes";notes.className="cal-note";
   notes.setAttribute("aria-label","Review notes");card.appendChild(notes);
   const actions=el("div",null,"cal-actions");
   actions.append(btn("Approve",()=>review(prop.id,true,check,notes,actions),"approve"),btn("Decline",()=>review(prop.id,false,check,notes,actions),"decline"));
   card.appendChild(actions);
  }else if(prop.state==="approved"){
   card.appendChild(btn("Cancel approved class",async()=>{
    if(!confirm("Cancel this class and remove its published calendar event?"))return;
    const r=await db.rpc("be_staff_cancel_class",{p_proposal_id:prop.id});
    if(r.error){alertMsg(r.error.message,true);return;}
    alertMsg("Class cancelled and event unpublished.");await Promise.all([loadStaff(),refreshMonth()]);
   }));
  }
  list.appendChild(card);
 });
}
async function sendRequest(e){
 e.preventDefault();const f=e.currentTarget,b=f.querySelector('button[type="submit"]');b.disabled=true;
 try{
  if(!user||!profile?.privacy_consent_at)throw Error("Sign in and complete your contact profile first.");
  if(!f.elements.namedItem("acknowledge").checked)throw Error("Confirm that this is only a proposal.");
  const r=await db.rpc("be_request_class_slot",{
   p_slot_id:val(f,"slot_id"),p_class_title:val(f,"class_title"),p_class_summary:val(f,"class_summary"),p_background_summary:val(f,"background_summary")
  });
  if(r.error)throw r.error;
  close("cal-dialog");
  alertMsg("Your class proposal was received and the slot is held for school review. It is not yet confirmed.");
  await Promise.all([refreshMonth(),loadMine()]);
  $("cal-my-requests").scrollIntoView({behavior:"smooth",block:"start"});
 }catch(e){alertMsg(e.message||"Could not submit the class proposal.",true);}finally{b.disabled=false;}
}
async function signIn(e){
 e.preventDefault();const f=e.currentTarget,b=f.querySelector('button[type="submit"]');b.disabled=true;
 try{
  const r=await db.auth.signInWithPassword({email:val(f,"email").toLowerCase(),password:val(f,"password")});
  if(r.error)throw r.error;
  close("cal-auth-dialog");f.reset();await refreshAccount();
  alertMsg("Signed in. You can now choose an open class time.");
 }catch(e){alertMsg(e.message||"Sign in failed.",true);}finally{b.disabled=false;}
}
async function init(){
 if(!window.supabase?.createClient){alertMsg("Calendar service failed to load. Please try again.",true);return;}
 db=window.supabase.createClient(ROOT,KEY,{auth:{storageKey:"butterflies-educare-session",autoRefreshToken:true,persistSession:true,detectSessionInUrl:true}});
 st.selected=dayKey(new Date());
 $("cal-prev").addEventListener("click",()=>shiftMonth(-1));
 $("cal-next").addEventListener("click",()=>shiftMonth(1));
 $("cal-today").addEventListener("click",()=>{const d=new Date();st.year=Number(fmtYear.format(d));st.month=Number(fmtMonthNum.format(d))-1;st.selected=dayKey(d);refreshMonth();});
 document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{
  st.filter=b.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach(n=>n.setAttribute("aria-pressed",String(n===b)));
  renderSelected();
 }));
 $("cal-account").addEventListener("click",async()=>{
  if(!user){open("cal-auth-dialog");return;}
  const r=await db.auth.signOut();if(r.error){alertMsg(r.error.message,true);return;}
  await refreshAccount();alertMsg("You have signed out.");
 });
 [["cal-dialog","cal-dialog-close"],["cal-auth-dialog","cal-auth-close"]].forEach(([dialog,buttonId])=>{
  $(buttonId).addEventListener("click",()=>close(dialog));
  $(dialog).addEventListener("click",e=>{if(e.target===$(dialog))close(dialog);});
 });
 $("cal-slot-form").addEventListener("submit",createSlot);
 $("cal-request-form").addEventListener("submit",sendRequest);
 $("cal-login-form").addEventListener("submit",signIn);
 db.auth.onAuthStateChange(evt=>{if(["SIGNED_IN","SIGNED_OUT","TOKEN_REFRESHED","USER_UPDATED"].includes(evt))setTimeout(()=>refreshAccount().catch(e=>alertMsg(e.message,true)),0);});
 await Promise.all([refreshAccount(),refreshMonth()]);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>init().catch(e=>alertMsg(e.message,true)),{once:true});
else init().catch(e=>alertMsg(e.message,true));
})();