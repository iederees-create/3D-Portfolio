/* Private Butterflies Educare school administration. Server RLS authorises every query. */
(() => {
  "use strict";
  const ROOT="https://sijvvbozaufzpjirijhb.supabase.co";
  const KEY="sb_publishable_dWWgbtZUAGVqIEvjMU5DFA_3Pi98GHU";
  const $=id=>document.getElementById(id);
  const node=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined&&text!==null)n.textContent=String(text);if(cls)n.className=cls;return n;};
  const fmt=d=>{if(!d)return"—";try{return new Intl.DateTimeFormat("en-ZA",{dateStyle:"medium",timeZone:"Africa/Johannesburg"}).format(new Date(d));}catch{return"—";}};
  const short=v=>String(v==null?"—":v).replace(/\s+/g," ").slice(0,1500);
  const status=v=>String(v===true?"Published":v===false?"Draft":v||"—").replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
  const sectionConfig={
    applications:{title:"2027 applications",description:"Review submitted applications and track their status.",table:"be_applications_2027",cols:"id,parent_id,child_full_name,guardian_name,guardian_phone,guardian_email,status,review_note,submitted_at,created_at",titleKey:"child_full_name",summaryKey:"guardian_name",labels:{guardian_name:"Parent / guardian",guardian_phone:"Phone",guardian_email:"Email",review_note:"Review note"},statusKey:"status",time:"created_at"},
    parents:{title:"Parents & guardians",description:"Parent accounts with profiles saved in the school network.",table:"be_parent_profiles",cols:"user_id,display_name,contact_email,phone,preferred_contact,updated_at",titleKey:"display_name",summaryKey:"contact_email",labels:{contact_email:"Email",phone:"Phone",preferred_contact:"Preferred contact"},time:"updated_at"},
    messages:{title:"Parent messages",description:"Read private messages and reply directly to parent accounts.",table:"be_parent_messages",cols:"id,parent_id,subject,body,staff_reply,status,created_at",titleKey:"subject",summaryKey:"body",labels:{body:"Message",staff_reply:"School reply"},statusKey:"status",time:"created_at"},
    enquiries:{title:"Enrolment enquiries",description:"General requests for enrolment information, separate from formal 2027 applications.",table:"be_enrolment_enquiries",cols:"id,parent_id,age_group,preferred_start,status,created_at",titleKey:"age_group",labels:{preferred_start:"Requested start"},statusKey:"status",time:"created_at"},
    classes:{title:"Guest-class requests",description:"Proposals from people interested in teaching or running an activity.",table:"be_class_proposals",cols:"id,presenter_name,presenter_email,class_title,class_summary,state,created_at",titleKey:"class_title",summaryKey:"class_summary",labels:{presenter_name:"Presenter",presenter_email:"Email",class_summary:"Proposal"},statusKey:"state",time:"created_at"},
    slots:{title:"Available class slots",description:"School calendar availability and approved teaching slots.",table:"be_class_slots",cols:"id,starts_at,ends_at,venue,topic_hint,state,published,created_at",titleKey:"topic_hint",labels:{starts_at:"Starts",ends_at:"Ends",venue:"Venue",published:"Published"},statusKey:"state",time:"created_at"},
    events:{title:"School events",description:"Events available to the school community, including draft and published items.",table:"be_school_events",cols:"id,title,description,starts_at,ends_at,venue,published,created_at",titleKey:"title",summaryKey:"description",labels:{starts_at:"Starts",venue:"Venue"},statusKey:"published",time:"created_at"},
    rsvps:{title:"Event responses",description:"Parent responses to the school's published events.",table:"be_event_rsvps",cols:"id,event_id,parent_id,status,created_at",titleKey:"event_id",labels:{event_id:"Event ID",parent_id:"Parent account ID"},statusKey:"status",time:"created_at"},
    announcements:{title:"News & announcements",description:"All school announcements, including drafts not yet shared with parents.",table:"be_public_content",cols:"id,title,section,summary,published,created_at",titleKey:"title",summaryKey:"summary",labels:{section:"Section",summary:"Summary"},statusKey:"published",time:"created_at"},
    fundraising:{title:"Fundraising projects",description:"Approved and draft fundraising initiatives. No online payments are processed.",table:"be_fundraising_projects",cols:"id,title,description,goal_description,status,published,created_at",titleKey:"title",summaryKey:"description",labels:{goal_description:"Goal",published:"Published"},statusKey:"status",time:"created_at"},
    sponsors:{title:"Sponsorship enquiries",description:"Expressions of interest from community sponsors.",table:"be_sponsorship_enquiries",cols:"id,organisation,interest,status,created_at",titleKey:"organisation",labels:{interest:"Interest"},statusKey:"status",time:"created_at"},
    volunteers:{title:"Volunteers",description:"People who have offered to help with school activities.",table:"be_volunteer_interests",cols:"id,category,status,created_at",titleKey:"category",statusKey:"status",time:"created_at"},
    school:{title:"School information",description:"Official school details. Only verified information should be published.",table:"be_school_information",cols:"id,school_name,summary,street_address,public_email,public_phone,operating_hours,enrolment_guidance,fee_guidance,published,updated_at",titleKey:"school_name",summaryKey:"summary",labels:{street_address:"School address",public_email:"Email",public_phone:"Phone",operating_hours:"Hours",enrolment_guidance:"Admissions",fee_guidance:"Fees"},statusKey:"published",time:"updated_at"}
  };
  let db,user,current="applications",offset=0,rows=[],more=false,loading=false,initialized=false,searchTimer=null;
  let isOwner=false;
  const pageSize=25;
  function flash(msg,error=false){const n=$("principal-feedback");n.textContent=msg;n.hidden=false;n.classList.toggle("error",error);}
  function setState(allowed){$("principal-loading").hidden=true;$("principal-denied").hidden=allowed;$("principal-app").hidden=!allowed;}
  function addField(container,label,value){if(value===null||value===undefined||value==="")return;const wrap=node("div");wrap.append(node("span",label),node("strong",typeof value==="boolean"?status(value):String(value)));container.append(wrap);}
  function record(rowData){
    const c=sectionConfig[current];
    const card=node("article",null,"record");
    const top=node("div",null,"record-top");
    const title=node("h4",rowData[c.titleKey]||"Untitled record");
    top.append(title);
    if(c.statusKey)top.append(node("span",status(rowData[c.statusKey]),"chip"+(["declined","cancelled"].includes(rowData[c.statusKey])?" denied":"")));
    card.append(top);
    if(c.summaryKey&&rowData[c.summaryKey])card.append(node("p",short(rowData[c.summaryKey])));
    const details=node("div",null,"record-details");
    for(const [key,label] of Object.entries(c.labels||{})) {
      if(key===c.summaryKey)continue;
      let v=rowData[key];
      if(key.endsWith("_at")||["starts_at","ends_at"].includes(key))v=fmt(v);
      addField(details,label,v);
    }
    if(details.childElementCount)card.append(details);
    card.append(node("small",c.time&&rowData[c.time]?"Recorded "+fmt(rowData[c.time]):""));
    const buttons=node("div",null,"record-buttons");
    if(current==="applications" && rowData.status!=="draft") {
      const link=node("a","View and review application","button primary");
      link.href="./apply-2027.html?review="+encodeURIComponent(rowData.id)+"#staff-panel";
      buttons.append(link);
    }
    if(current==="messages") {
      const details=node("details");
      const summary=node("summary",rowData.staff_reply?"View or update reply":"Write a reply to this parent");
      details.append(summary);
      const label=node("label","Your reply");
      const box=node("textarea");box.rows=3;box.maxLength=900;box.placeholder="Write a clear, helpful response";box.value=rowData.staff_reply||"";
      label.append(box);details.append(label);
      const save=node("button","Save reply","button secondary");save.type="button";
      save.addEventListener("click",async()=>{
        const text=box.value.trim();
        if(text.length<3||text.length>900){flash("Reply must be between 3 and 900 characters.",true);return;}
        save.disabled=true;
        const r=await db.from("be_parent_messages").update({staff_reply:text,replied_at:new Date().toISOString(),status:"replied"}).eq("id",rowData.id);
        save.disabled=false;
        if(r.error)flash("Could not save reply: "+r.error.message,true);
        else{flash("Reply saved in the parent's private inbox.");await selectSection("messages");}
      });
      details.append(save);card.append(details);
    }
    if(["classes","slots","events","rsvps"].includes(current)){const link=node("a","Open shared calendar","button secondary");link.href="./calendar.html";buttons.append(link);}
    if(["announcements","fundraising","school"].includes(current)){const link=node("a","Open school publishing tools","button secondary");link.href="./parent.html#be-staff";buttons.append(link);}
    if(buttons.childElementCount)card.append(buttons);
    return card;
  }
  function renderRows(){
    const config=sectionConfig[current];
    const query=$("principal-search").value.trim().toLocaleLowerCase();
    const statusFilter=$("status-filter").value;
    const matches=rows.filter(r=>(!statusFilter||String(r[config.statusKey])===statusFilter) &&
      (!query||Object.values(r).some(v=>typeof v==="string"&&v.toLocaleLowerCase().includes(query))));
    const target=$("principal-records");target.replaceChildren();
    if(!matches.length){const e=node("div",null,"empty-records");e.append(node("h4",rows.length?"No matching records":"No records yet"),node("p",rows.length?"Try a different search or status filter.":"Entries will appear here when families and staff begin using the school system."));target.append(e);}
    matches.forEach(r=>target.append(record(r)));
    $("record-count").textContent=matches.length+" shown · "+rows.length+" loaded"+(more?" · More available":"");
    $("load-more-records").hidden=!more;
  }
  function updateStatusOptions(){
    const select=$("status-filter");const prev=select.value;
    select.replaceChildren(new Option("All statuses",""));
    const config=sectionConfig[current];
    if(!config.statusKey){select.disabled=true;return;}
    select.disabled=false;
    const values=[...new Set(rows.map(r=>r[config.statusKey]).filter(v=>v!==null&&v!==undefined))];
    values.forEach(v=>select.add(new Option(status(v),String(v))));
    if(values.map(String).includes(prev))select.value=prev;
  }
  async function fetchPage(){
    if(loading)return;loading=true;
    const c=sectionConfig[current];
    const button=$("load-more-records");button.disabled=true;
    try{
      const r=await db.from(c.table).select(c.cols).order(c.time||"created_at",{ascending:false}).range(offset,offset+pageSize-1);
      if(r.error)throw r.error;
      rows.push(...(r.data||[]));
      more=(r.data||[]).length===pageSize;offset+=r.data?.length||0;
      updateStatusOptions();renderRows();
    }catch(e){flash("Could not load "+c.title.toLowerCase()+": "+e.message,true);$("principal-records").replaceChildren(node("p","This section could not be loaded. Check the account's school permissions."));}
    finally{loading=false;button.disabled=false;}
  }
  async function selectSection(key){
    if(!(key in sectionConfig))return;
    current=key;offset=0;rows=[];more=false;
    const c=sectionConfig[key];
    $("section-heading").textContent=c.title;
    $("section-hint").textContent=c.description;
    $("principal-search").value="";
    $("status-filter").replaceChildren(new Option("All statuses",""));
    [...$("principal-sections").querySelectorAll("button")].forEach(b=>{if(b.dataset.section===key)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current");});
    $("principal-records").replaceChildren(node("p","Loading records…"));
    await fetchPage();
  }
  async function metrics(){
    const metrics=[
      ["2027 applications",db.from("be_applications_2027").select("id",{head:true,count:"exact"})],
      ["Awaiting review",db.from("be_applications_2027").select("id",{head:true,count:"exact"}).eq("status","submitted")],
      ["Parent accounts",db.from("be_parent_profiles").select("user_id",{head:true,count:"exact"})],
      ["Messages awaiting reply",db.from("be_parent_messages").select("id",{head:true,count:"exact"}).not("status","in",'("replied","closed")')]
    ];
    const results=await Promise.all(metrics.map(async([title,promise])=>({title,result:await promise})));
    const target=$("principal-metrics");target.replaceChildren();
    results.forEach(({title,result})=>{
      const card=node("article",null,"metric");
      card.append(node("span",title),node("strong",result.error?"—":String(result.count||0)));
      if(result.error)card.append(node("small","Unavailable"));
      target.append(card);
    });
    const pending=results[1].result.error?null:results[1].result.count;
    $("principal-priority").textContent=pending===null?"Review applications and messages, confirm school information, and manage class requests.":(pending>0?pending+" submitted 2027 application"+(pending!==1?"s":"")+" awaiting your review.":"No new applications awaiting review.")+" Also check parent messages and guest-class requests.";
    $("badge-applications").textContent=pending>0?String(pending):"";
  }
  async function refreshAll(){await Promise.all([metrics(),selectSection(current)]);}
  async function ownerStaffList(){
    if(!isOwner)return;
    const target=$("owner-staff-list");
    target.replaceChildren(node("p","Loading school team…"));
    const r=await db.rpc("be_owner_list_staff");
    target.replaceChildren();
    if(r.error){target.append(node("p","Could not load school team: "+r.error.message));return;}
    if(!(r.data||[]).length){target.append(node("p","No verified school staff accounts yet."));return;}
    r.data.forEach(item=>{
      const card=node("div",null,"owner-team-row");
      const names=node("div");
      names.append(node("strong",item.email||"School member"),node("small",item.confirmed?"Confirmed school account":"Email not verified"));
      card.append(names,node("span",item.staff_role==="admin"?"Administrator":"Staff","chip"));
      target.append(card);
    });
  }
  async function ownerAudit(){
    if(!isOwner)return;
    const target=$("owner-role-audit");
    target.replaceChildren();
    const r=await db.from("be_staff_role_audit").select("target_id,previous_role,new_role,changed_at").order("changed_at",{ascending:false}).limit(25);
    if(r.error){target.append(node("p","Audit history unavailable: "+r.error.message));return;}
    if(!(r.data||[]).length){target.append(node("p","No staff permission changes recorded yet."));return;}
    r.data.forEach(item=>{
      const entry=node("div");
      const change=(item.previous_role||"No access")+" → "+(item.new_role||"Removed");
      entry.append(node("strong",change),node("small",fmt(item.changed_at)+" · Account "+String(item.target_id).slice(0,8)));
      target.append(entry);
    });
  }
  function checkState(id,value,state="success"){
    const el=$(id);if(!el)return;
    el.textContent=value;
    el.dataset.state=state;
  }
  async function ownerSystemChecks(){
    if(!isOwner)return;
    checkState("owner-db-health","Checking…","warning");
    checkState("owner-release-health","Checking…","warning");
    checkState("owner-api-health","Checking…","warning");
    const checks=[
      (async()=>{
        const r=await db.from("be_school_information").select("id",{head:true,count:"exact"});
        checkState("owner-db-health",r.error?"Database query failed":"Connected",r.error?"error":"success");
      })(),
      (async()=>{
        try{
          const response=await fetch("https://api.github.com/repos/iederees-create/3D-Portfolio/actions/runs?per_page=1",{headers:{Accept:"application/vnd.github+json"},cache:"no-store"});
          if(!response.ok)throw Error("GitHub response "+response.status);
          const result=await response.json();const run=result.workflow_runs?.[0];
          if(!run){checkState("owner-release-health","No runs available","warning");return;}
          const finished=run.status==="completed";
          checkState("owner-release-health",!finished?"Running":run.conclusion==="success"?"Latest check passed":"Latest check: "+(run.conclusion||"unknown"),!finished?"warning":run.conclusion==="success"?"success":"error");
        }catch{checkState("owner-release-health","Could not check","warning");}
      })(),
      (async()=>{
        try{
          const controller=new AbortController();
          const timer=setTimeout(()=>controller.abort(),9000);
          try{
            const response=await fetch("https://product-listing-server.onrender.com/api/butterflies/health",{signal:controller.signal,cache:"no-store"});
            checkState("owner-api-health",response.ok?"Responding":"HTTP "+response.status,response.ok?"success":"warning");
          }finally{clearTimeout(timer);}
        }catch{checkState("owner-api-health","Unavailable or starting","warning");}
      })()
    ];
    await Promise.allSettled(checks);
  }
  async function manageOwnerStaff(event){
    event.preventDefault();
    if(!isOwner)return;
    const form=event.currentTarget;
    const email=form.elements.namedItem("email").value.trim();
    const role=form.elements.namedItem("role").value;
    const feedback=$("owner-role-feedback");
    const submit=form.querySelector("[type=submit]");
    if(!form.reportValidity())return;
    if(!window.confirm("Change school access for "+email+" to "+(role==="remove"?"No school access":role)+"? Only continue if you have verified this person's identity."))return;
    submit.disabled=true;
    feedback.textContent="Checking account and updating school permissions…";
    try{
      const r=await db.rpc("be_owner_manage_staff",{p_email:email,p_role:role});
      if(r.error)throw r.error;
      feedback.textContent=role==="remove"?"School access removed.":"School access updated. The person can sign in with their existing account.";
      form.reset();
      await Promise.allSettled([ownerStaffList(),ownerAudit()]);
    }catch(e){
      feedback.textContent="Access was not changed: "+e.message;
    }finally{submit.disabled=false;}
  }
  async function ownerRefresh(){
    if(!isOwner)return;
    await Promise.allSettled([ownerStaffList(),ownerAudit(),ownerSystemChecks()]);
  }
  async function initOwner(){
    const r=await db.from("be_developer_owners").select("user_id").eq("user_id",user.id).maybeSingle();
    if(r.error||!r.data)return;
    isOwner=true;
    $("developer-tools").hidden=false;
    $("principal-email").textContent=(user.email||"") + " · Developer owner";
    document.querySelector(".principal-intro h1").textContent="School control centre";
    document.querySelector(".principal-intro > p").textContent="Manage the same school activities as the principal, with additional technical oversight and verified staff access controls.";
    $("owner-staff-form").addEventListener("submit",manageOwnerStaff);
    $("owner-recheck").addEventListener("click",ownerRefresh);
    await ownerRefresh();
  }
  async function init(){
    if(!window.supabase?.createClient){$("principal-loading").hidden=true;flash("The secure school service is unavailable. Refresh and try again.",true);return;}
    db=window.supabase.createClient(ROOT,KEY,{auth:{storageKey:"butterflies-educare-session",autoRefreshToken:true,persistSession:true,detectSessionInUrl:true}});
    const {data,error}=await db.auth.getUser();
    if(error||!data?.user){setState(false);return;}
    user=data.user;
    const r=await db.from("be_staff_memberships").select("staff_role").eq("user_id",user.id).maybeSingle();
    if(r.error||r.data?.staff_role!=="admin"){setState(false);return;}
    setState(true);
    $("principal-email").textContent=user.email||"Verified school administrator";
    $("principal-date").textContent="School overview · "+fmt(new Date().toISOString());
    [...$("principal-sections").querySelectorAll("button")].forEach(b=>b.addEventListener("click",()=>selectSection(b.dataset.section)));
    $("principal-search").addEventListener("input",()=>{clearTimeout(searchTimer);searchTimer=setTimeout(renderRows,120);});
    $("status-filter").addEventListener("change",renderRows);
    $("load-more-records").addEventListener("click",fetchPage);
    $("principal-refresh").addEventListener("click",refreshAll);
    db.auth.onAuthStateChange(event=>{if(event==="SIGNED_OUT"){setState(false);location.href="./parent.html";}});
    initialized=true;await Promise.allSettled([refreshAll(),initOwner()]);
  }
  init().catch(e=>{$("principal-loading").hidden=true;flash("Could not load school management: "+e.message,true);});
})();