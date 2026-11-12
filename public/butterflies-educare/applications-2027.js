/* Butterflies Educare 2027 enrolments. Supabase RLS and RPC enforce ownership and review rights. */
(() => {
  "use strict";
  const ROOT = "https://sijvvbozaufzpjirijhb.supabase.co";
  const KEY = "sb_publishable_dWWgbtZUAGVqIEvjMU5DFA_3Pi98GHU";
  const $ = id => document.getElementById(id);
  const form = $("application-form");
  const steps = [...document.querySelectorAll(".form-step")];
  const fields = ["child_full_name","child_dob","child_gender","home_address","city_town","postal_code","school_grade","mother_name","mother_phone","mother_email","father_name","father_phone","father_email","guardian_name","guardian_relation","guardian_phone","guardian_email","emergency_name","emergency_relation","emergency_phone"];
  const healthFields = ["allergies","medical_conditions","medication","doctor_contact"];
  let db, user, role = null, current = null, step = 0, busy = false, staffChoice = null;
  const node = (tag, value, cls) => {const el=document.createElement(tag);if(value!==undefined && value!==null)el.textContent=String(value);if(cls)el.className=cls;return el;};
  const feedback = (message,error=false) => {const el=$("app-feedback");el.textContent=message;el.classList.toggle("error",error);el.hidden=false;el.scrollIntoView({behavior:"smooth",block:"nearest"});};
  const hideFeedback = () => $("app-feedback").hidden=true;
  const stamp = t => t ? new Intl.DateTimeFormat("en-ZA",{dateStyle:"medium",timeZone:"Africa/Johannesburg"}).format(new Date(t)) : "Not submitted";
  const titleCase = t => String(t || "").replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
  const statusClass = s => ["declined","withdrawn"].includes(s) ? "chip denied" : ["draft","info_requested","under_review"].includes(s) ? "chip pending" : "chip";
  const field = name => form.elements.namedItem(name);
  const val = name => (field(name)?.value || "").trim();
  const safeError = err => err?.message || "Something went wrong. Please try again.";
  const lock = disabled => {busy=disabled;for(const b of document.querySelectorAll("#application-form button,#new-application,#save-review"))b.disabled=disabled;};
  const setView = view => {for(const id of ["sign-in-needed","app-landing","editor"])$(id).hidden=id!==view;};
  function showStep(next) {
    step=Math.min(4,Math.max(0,next));
    steps.forEach((e,i)=>e.hidden=i!==step);
    [...$("step-nav").children].forEach((e,i)=>{e.className=i===step?"active":i<step?"done":"";});
    $("step-label").textContent="Step "+(step+1)+" of 5";
    $("progress-fill").style.width=((step+1)*20)+"%";
    document.querySelector(".progress-track").setAttribute("aria-valuenow",String(step+1));
    $("prev-step").hidden=step===0;
    $("next-step").hidden=step===4;
    $("submit-application").hidden=step!==4;
    if(step===4) renderReview();
    $("editor").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function validateStep() {
    const controls=[...steps[step].querySelectorAll("input,select,textarea")];
    for(const control of controls){
      if(control.required && !control.checkValidity()){control.reportValidity();control.focus();return false;}
      if(control.type==="email" && control.value && !control.checkValidity()){control.reportValidity();control.focus();return false;}
    }
    if(step===0) {
      const date=val("child_dob"),dt=date ? new Date(date+"T12:00:00") : null;
      if(dt && (Number.isNaN(dt.valueOf()) || dt>new Date() || dt < new Date(new Date().getFullYear()-19,0,1))){feedback("Please check your child's date of birth.",true);field("child_dob").focus();return false;}
    }
    if(step===3 && healthFields.some(x=>val(x)) && !field("health_consent").checked) {feedback("Please tick the optional health information consent box, or clear the health details.",true);field("health_consent").focus();return false;}
    return true;
  }
  function writeFields(data) {
    for(const name of fields){const input=field(name);if(input)input.value=data[name]||"";}
    for(const name of healthFields)field(name).value=data.health?.[name]||"";
    field("health_consent").checked=Boolean(data.health?.health_consent_at);
    for(const name of ["accept_conduct","accept_fees","accept_privacy","declaration"])field(name).checked=false;
  }
  const formData = () => Object.fromEntries(fields.map(name=>[name,name==="child_dob"||name==="child_gender" ? (val(name)||null) : val(name)]));
  function row(parent,label,value) {
    const r=node("div",null,"review-row");
    r.append(node("span",label),node("strong",String(value||"Not provided")));
    parent.append(r);
  }
  function renderReview() {
    const target=$("review-summary");target.replaceChildren();
    const items=[["Child's name",val("child_full_name")],["Date of birth",val("child_dob")],["Home address",val("home_address")],["City / Town",val("city_town")],["Primary guardian",val("guardian_name")],["Guardian contact",val("guardian_phone")],["Emergency contact",val("emergency_name")],["Emergency number",val("emergency_phone")],["Medical information",healthFields.some(x=>val(x))?"Provided privately":"Not supplied"]];
    items.forEach(([k,v])=>row(target,k,v));
  }
  async function saveDraft() {
    if(!current)throw new Error("Start an application first.");
    if(healthFields.some(x=>val(x))&&!field("health_consent").checked)throw new Error("Health details need your consent. Tick the consent box or clear them.");
    const data=formData();data.child_dob=data.child_dob||null;
    const r=await db.from("be_applications_2027").update({...data,updated_at:new Date().toISOString()}).eq("id",current.id).eq("parent_id",user.id).select("id").single();
    if(r.error)throw r.error;
    const health=Object.fromEntries(healthFields.map(name=>[name,val(name)]));
    const hasHealth=healthFields.some(name=>health[name]);
    const h=await db.from("be_application_health_2027").upsert({application_id:current.id,...health,health_consent_at:hasHealth&&field("health_consent").checked?new Date().toISOString():null,updated_at:new Date().toISOString()},{onConflict:"application_id"});
    if(h.error)throw h.error;
    current={...current,...data};
    $("saved-label").textContent="Saved securely";
    hideFeedback();
  }
  async function loadList() {
    if(!user)return;
    setView("app-landing");hideFeedback();
    const {data,error}=await db.from("be_applications_2027").select("id,child_full_name,status,created_at,submitted_at,review_note").eq("parent_id",user.id).order("created_at",{ascending:false}).limit(100);
    const target=$("applications-list");target.replaceChildren();
    if(error){feedback("Your applications could not be loaded: "+safeError(error),true);return;}
    if(!data.length){const box=node("div",null,"application-card");box.append(node("h3","No applications yet"),node("p","Start a separate 2027 application for each child."));target.append(box);return;}
    data.forEach(a=>{
      const box=node("article",null,"application-card");
      box.append(node("span",titleCase(a.status),statusClass(a.status)),node("h3",a.child_full_name||"Application in progress"),node("small",a.submitted_at?"Submitted "+stamp(a.submitted_at):"Started "+stamp(a.created_at)));
      if(a.review_note)box.append(node("p","School feedback: "+a.review_note));
      const button=node("button",["draft","info_requested"].includes(a.status)?"Continue application":"View application","button secondary");
      button.type="button";button.addEventListener("click",()=>openApplication(a.id).catch(e=>feedback(safeError(e),true)));
      box.append(button);target.append(box);
    });
  }
  async function openApplication(id) {
    const [r,h]=await Promise.all([
      db.from("be_applications_2027").select("*").eq("id",id).eq("parent_id",user.id).single(),
      db.from("be_application_health_2027").select("*").eq("application_id",id).maybeSingle()
    ]);
    if(r.error)throw r.error;if(h.error)throw h.error;
    current={...r.data,health:h.data};
    writeFields(current);
    $("app-ref").textContent="Application "+id.slice(0,8).toUpperCase();
    setView("editor");showStep(0);
    const editable=["draft","info_requested"].includes(current.status);
    for(const control of form.querySelectorAll("input,select,textarea"))control.disabled=!editable;
    $("save-draft").hidden=!editable;$("next-step").hidden=!editable;$("submit-application").hidden=!editable;
    $("saved-label").textContent=editable?"Saved draft":"Status: "+titleCase(current.status);
    if(!editable){showStep(4);$("submit-application").hidden=true;}
    if(current.review_note)feedback("School feedback: "+current.review_note);
  }
  async function createApplication() {
    lock(true);
    try{
      const r=await db.from("be_applications_2027").insert({parent_id:user.id}).select("id").single();
      if(r.error)throw r.error;await openApplication(r.data.id);
    }catch(e){feedback("Could not create application: "+safeError(e),true);}finally{lock(false);}
  }
  async function nextStep() {
    if(!validateStep())return;lock(true);
    try{await saveDraft();showStep(step+1);}catch(e){feedback("Could not save: "+safeError(e),true);}finally{lock(false);}
  }
  async function submit() {
    for(let s=0;s<4;s++){showStep(s);if(!validateStep()){feedback("Complete the required information in step "+(s+1)+".",true);return;}}
    showStep(4);if(!validateStep())return;
    lock(true);
    try{
      await saveDraft();
      const r=await db.rpc("be_submit_application_2027",{
        p_application_id:current.id,p_conduct:field("accept_conduct").checked,p_fees:field("accept_fees").checked,
        p_privacy:field("accept_privacy").checked,p_declaration:field("declaration").checked
      });
      if(r.error)throw r.error;
      await loadList();feedback("Your 2027 application has been submitted for school review. This is not yet an offer of a place.");
    }catch(e){feedback("Application was not submitted: "+safeError(e),true);}finally{lock(false);}
  }
  async function loadStaff() {
    if(role!=="admin")return;
    const r=await db.from("be_applications_2027").select("id,parent_id,child_full_name,status,guardian_name,guardian_phone,created_at,submitted_at").neq("status","draft").order("updated_at",{ascending:false}).limit(100);
    const target=$("staff-list");target.replaceChildren();
    if(r.error){target.append(node("p","Unable to load review queue: "+safeError(r.error)));return;}
    if(!r.data.length){target.append(node("p","No submitted applications yet."));return;}
    r.data.forEach(a=>{
      const card=node("article",null,"application-card");
      card.append(node("span",titleCase(a.status),statusClass(a.status)),node("h3",a.child_full_name),node("small",a.guardian_name+" · "+a.guardian_phone),node("small",stamp(a.submitted_at)));
      const b=node("button","Review application","button secondary");b.type="button";b.addEventListener("click",()=>openStaffApplication(a.id).catch(e=>feedback(safeError(e),true)));
      card.append(b);target.append(card);
    });
  }
  async function openStaffApplication(id) {
    if(role!=="admin")return;
    const [a,h]=await Promise.all([db.from("be_applications_2027").select("*").eq("id",id).single(),db.from("be_application_health_2027").select("*").eq("application_id",id).maybeSingle()]);
    if(a.error)throw a.error;if(h.error)throw h.error;
    staffChoice=a.data;
    const target=$("staff-fields");target.replaceChildren();
    const names=[["Child",a.data.child_full_name],["Date of birth",a.data.child_dob],["Address",a.data.home_address],["City",a.data.city_town],["Primary guardian",a.data.guardian_name],["Guardian relationship",a.data.guardian_relation],["Guardian phone",a.data.guardian_phone],["Guardian email",a.data.guardian_email],["Mother",a.data.mother_name],["Mother phone",a.data.mother_phone],["Father",a.data.father_name],["Father phone",a.data.father_phone],["Emergency name",a.data.emergency_name],["Emergency phone",a.data.emergency_phone],["Allergies (restricted)",h.data?.allergies],["Medical conditions (restricted)",h.data?.medical_conditions],["Medication (restricted)",h.data?.medication],["Doctor contact (restricted)",h.data?.doctor_contact],["Application status",a.data.status]];
    names.forEach(([k,v])=>row(target,k,v));
    $("staff-note").value=a.data.review_note||"";
    $("staff-detail").hidden=false;
    $("staff-detail").scrollIntoView({behavior:"smooth",block:"start"});
  }
  async function saveReview() {
    if(role!=="admin"||!staffChoice)return;
    $("save-review").disabled=true;
    try{
      const r=await db.rpc("be_review_application_2027",{p_application_id:staffChoice.id,p_next_status:$("staff-next-status").value,p_note:$("staff-note").value.trim()||null});
      if(r.error)throw r.error;
      $("staff-detail").hidden=true;await loadStaff();feedback("Application review updated.");
    }catch(e){feedback("Could not review application: "+safeError(e),true);}
    finally{$("save-review").disabled=false;}
  }
  async function init() {
    if(!window.supabase?.createClient){feedback("Unable to load the secure account service. Please refresh.",true);return;}
    db=window.supabase.createClient(ROOT,KEY,{auth:{storageKey:"butterflies-educare-session",autoRefreshToken:true,persistSession:true,detectSessionInUrl:true}});
    const r=await db.auth.getUser();user=r.data?.user||null;
    if(!user){setView("sign-in-needed");return;}
    $("account-email").textContent=user.email||"Your private account";
    const staff=await db.from("be_staff_memberships").select("staff_role").eq("user_id",user.id).maybeSingle();
    role=staff.data?.staff_role||null;
    $("staff-panel").hidden=role!=="admin";
    await loadList();
    if(role==="admin"){
      await loadStaff();
      const reviewId=new URLSearchParams(location.search).get("review");
      if(reviewId && /^[0-9a-f-]{36}$/i.test(reviewId)) await openStaffApplication(reviewId).catch(e=>feedback("Could not open review: "+safeError(e),true));
    }
    const qs=new URLSearchParams(location.search);
    if(qs.has("new"))await createApplication();
    db.auth.onAuthStateChange((event)=>{if(event==="SIGNED_OUT")location.href="./parent.html";});
  }
  $("new-application").addEventListener("click",createApplication);
  $("save-draft").addEventListener("click",async()=>{lock(true);try{await saveDraft();feedback("Your draft has been saved securely.");}catch(e){feedback(safeError(e),true);}finally{lock(false);}});
  $("next-step").addEventListener("click",nextStep);
  $("prev-step").addEventListener("click",()=>showStep(step-1));
  $("back-to-list").addEventListener("click",()=>loadList().catch(e=>feedback(safeError(e),true)));
  $("submit-application").addEventListener("click",submit);
  $("refresh-staff").addEventListener("click",loadStaff);
  $("save-review").addEventListener("click",saveReview);
  init().catch(e=>feedback("Could not start application service: "+safeError(e),true));
})();