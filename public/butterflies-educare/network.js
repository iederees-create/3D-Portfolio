/* Butterflies Educare parent network. Public preview; no privileged keys or child records. */
(() => {
  "use strict";
  const ROOT = "https://sijvvbozaufzpjirijhb.supabase.co";
  const PUBLIC_KEY = "sb_publishable_dWWgbtZUAGVqIEvjMU5DFA_3Pi98GHU";
  const BACKEND = "https://product-listing-server.onrender.com/api/butterflies";
  const PORTAL = "./parent.html";
  const isPortal = document.body.dataset.bePage === "portal";
  const $ = (id) => document.getElementById(id);
  let client = null;
  let user = null;
  let profile = null;
  let staffRole = null;
  let authMode = "signin";
  let pendingConfirmEmail = "";
  let activity = { enrolments: [], rsvps: [], messages: [], sponsors: [], volunteers: [] };

  const create = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined && text !== null) node.textContent = String(text);
    if (className) node.className = className;
    return node;
  };
  const flash = (text, error = false) => {
    const target = $("be-status") || $("be-auth-feedback");
    if (!target) return;
    target.textContent = String(text);
    target.hidden = false;
    target.classList.toggle("be-error", error);
    target.classList.toggle("be-error-text", error);
    if (error) console.warn("School network:", text);
  };
  const niceDate = (value) => {
    try { return new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Johannesburg" }).format(new Date(value)); }
    catch { return "Date to be confirmed"; }
  };
  const value = (form, name) => String(new FormData(form).get(name) || "").trim();
  const limit = (text, max) => String(text || "").slice(0, max);
  const setVisible = (id, visible) => { const node = $(id); if (node) node.hidden = !visible; };
  const btn = (label, action, className = "be-icon-button") => {
    const element = create("button", label, className);
    element.type = "button";
    element.addEventListener("click", action);
    return element;
  };
  const isSignedIn = () => Boolean(user?.id);
  const requireAccount = () => {
    if (!isSignedIn()) { openAuth("signin"); flash("Sign in or create an account to continue."); return false; }
    if (!profile?.privacy_consent_at) {
      flash("Please save your contact profile and consent before submitting an enquiry.", true);
      $("be-profile-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };
  const runForm = async (form, work) => {
    const actionButton = form.querySelector('button[type="submit"]');
    if (actionButton) actionButton.disabled = true;
    try {
      if (!client) throw new Error("The account service is unavailable. Please retry later.");
      await work();
      flash("Saved successfully.");
      if (!["be-profile-form","be-school-information-form"].includes(form.id)) form.reset();
      if (isPortal && isSignedIn()) await loadPrivate();
      await loadPublic();
    } catch (error) {
      flash(error?.message || "Unable to save. Please retry.", true);
    } finally { if (actionButton) actionButton.disabled = false; }
  };

  function landingSetup() {
    const nav = document.querySelector(".site-nav");
    if (nav && !nav.querySelector("[data-be-parent-link]")) {
      const a = create("a", "Parent network");
      a.href = PORTAL;
      a.dataset.beParentLink = "true";
      nav.insertBefore(a, nav.querySelector(".btn") || null);
      const signIn = btn("Sign in", () => openAuth(), "be-plain-btn");
      signIn.style.marginLeft = "2px";
      nav.appendChild(signIn);
    }
    const actions = document.querySelector(".hero-actions");
    if (actions && !actions.querySelector("[data-be-parent-link]")) {
      const a = create("a", "Parent & community network", "btn btn-light");
      a.dataset.beParentLink = "true";
      a.href = PORTAL;
      actions.appendChild(a);
    }
    if (!$("be-auth-dialog")) {
      const dialog = create("dialog");
      dialog.id = "be-auth-dialog";
      dialog.className = "be-auth-dialog";
      // Static UI template only. No user-provided content is interpolated.
      dialog.innerHTML = '<button type="button" class="be-dialog-close" id="be-auth-close" aria-label="Close">×</button>' +
        '<div class="be-auth-body"><span class="be-overline">Butterflies Educare</span><h2 id="be-auth-title">Sign in</h2>' +
        '<p id="be-auth-description">Access your parent or community account.</p>' +
        '<div class="be-auth-tabs" role="group" aria-label="Account options"><button type="button" data-auth-mode="signin">Sign in</button>' +
        '<button type="button" data-auth-mode="signup">Create account</button><button type="button" data-auth-mode="reset">Reset password</button></div>' +
        '<form id="be-auth-form" class="be-form"><label id="be-name-field" hidden>Name<input name="name" autocomplete="name" minlength="2" maxlength="100"></label>' +
        '<label id="be-email-field">Email address<input name="email" type="email" autocomplete="email" required></label>' +
        '<label id="be-password-field">Password<input name="password" type="password" autocomplete="current-password" minlength="8" required></label>' +
        '<label id="be-consent-field" class="be-checkbox" hidden><input name="consent" type="checkbox"><span>I agree that my contact details and requests may be stored for school communications. I will not submit sensitive information about children.</span></label>' +
        '<button class="be-btn be-primary" type="submit" id="be-auth-submit">Sign in</button><button type="button" id="be-open-code" class="be-verify-link">Have a verification code?</button><p class="be-auth-feedback" id="be-auth-feedback" role="status" aria-live="polite"></p></form></div>';
      document.body.appendChild(dialog);
    }
  }

  function ensureEmailConfirmation() {
    let panel = $("be-email-confirmation");
    if (panel) return panel;
    const body = document.querySelector("#be-auth-dialog .be-auth-body");
    if (!body) return null;
    panel = create("section", null, "be-confirmation");
    panel.id = "be-email-confirmation";
    panel.hidden = true;
    panel.innerHTML = [
      '<div class="be-confirm-icon" aria-hidden="true">✉</div>',
      '<p class="be-confirm-lead">Enter the verification code sent to your email address:</p>',
      '<label class="be-confirm-email-label" for="be-confirm-email-input">Email address</label><input id="be-confirm-email-input" type="email" autocomplete="email" required placeholder="your@email.com">',
      '<ol class="be-confirm-steps"><li>Check your email inbox.</li><li>Copy the code from the Butterflies Educare email.</li><li>Enter the code below and select <strong>Verify my email</strong>.</li></ol>',
      '<p class="be-confirm-help">Check Spam or Junk if the message is missing. If your email has a confirmation link instead of a code, that link will still work while the school email template is being updated.</p>',
      '<p id="be-confirm-feedback" class="be-auth-feedback" role="status" aria-live="polite"></p>',
      '<div class="be-confirm-actions"><button type="button" class="be-btn be-secondary" id="be-confirm-resend">Send another verification email</button><button type="button" class="be-btn be-secondary" id="be-confirm-signin">Already verified? Sign in</button></div>',
      '<div class="be-confirm-otp"><label for="be-confirm-code">Verification code</label><input id="be-confirm-code" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6,8}" maxlength="8" placeholder="Enter the code from your email"><button type="button" class="be-btn be-primary" id="be-confirm-verify">Verify my email</button></div>'
    ].join("");
    body.appendChild(panel);
    $("be-confirm-resend").addEventListener("click", resendEmailConfirmation);
    $("be-confirm-signin").addEventListener("click", () => {
      setAuthMode("signin");
      const input = $("be-auth-form")?.elements.namedItem("email");
      if (input) input.value = pendingConfirmEmail;
    });
    $("be-confirm-verify").addEventListener("click", verifyConfirmationCode);
    return panel;
  }
  function showEmailConfirmation(email) {
    pendingConfirmEmail = email;
    const panel = ensureEmailConfirmation();
    if (!panel) return;
    $("be-auth-title").textContent = "Check your email";
    $("be-auth-description").hidden = true;
    $("be-auth-dialog").querySelector(".be-auth-tabs").hidden = true;
    $("be-auth-form").hidden = true;
    $("be-confirm-email-input").value = email;
    $("be-confirm-feedback").textContent = "";
    $("be-confirm-code").value = "";
    panel.hidden = false;
    $("be-confirm-code").focus();
  }
  async function resendEmailConfirmation() {
    if (!client) return;
    const confirmationEmail = $("be-confirm-email-input");
    if (!confirmationEmail?.checkValidity()) { confirmationEmail?.reportValidity(); return; }
    pendingConfirmEmail = confirmationEmail.value.trim().toLowerCase();
    const button = $("be-confirm-resend");
    const feedback = $("be-confirm-feedback");
    button.disabled = true;
    feedback.textContent = "Requesting another verification email…";
    try {
      const result = await client.auth.resend({
        type: "signup",
        email: pendingConfirmEmail,
        options: { emailRedirectTo: new URL(PORTAL, location.href).href }
      });
      feedback.textContent = result.error
        ? "We couldn't send another email just now. Please wait a little and try again."
        : "Another email has been requested. Check your inbox and Spam or Junk folder.";
    } catch {
      feedback.textContent = "We couldn't send another email just now. Please try again.";
    } finally {
      button.disabled = false;
    }
  }
  async function verifyConfirmationCode() {
    if (!client) return;
    const confirmationEmail = $("be-confirm-email-input");
    if (!confirmationEmail?.checkValidity()) { confirmationEmail?.reportValidity(); return; }
    pendingConfirmEmail = confirmationEmail.value.trim().toLowerCase();
    const token = $("be-confirm-code").value.trim();
    const feedback = $("be-confirm-feedback");
    if (!/^[0-9]{6,8}$/.test(token)) {
      feedback.textContent = "Enter the code shown in your verification email.";
      return;
    }
    const button = $("be-confirm-verify");
    button.disabled = true;
    feedback.textContent = "Checking your code…";
    try {
      const response = await client.auth.verifyOtp({ email: pendingConfirmEmail, token, type: "signup" });
      if (response.error) {
        feedback.textContent = "That code could not be verified. Check it and try again, or request a new email.";
        return;
      }
      closeAuth();
      if (!isPortal) location.href = PORTAL;
      else {
        await refreshAuth();
        flash("Your email has been verified. Welcome to Butterflies Educare.");
      }
    } catch {
      feedback.textContent = "We couldn't check the code right now. Please try again.";
    } finally {
      button.disabled = false;
    }
  }

  function openCodeEntry() {
    if (!client) { flash("Account service unavailable. Please try again.", true); return; }
    const email = $("be-auth-form")?.elements.namedItem("email")?.value?.trim()?.toLowerCase() || "";
    ensureEmailConfirmation();
    showEmailConfirmation(email);
    const input = $("be-confirm-email-input");
    if (!email) input?.focus();
  }

  function setAuthMode(mode) {
    authMode = mode;
    const confirmPanel = $("be-email-confirmation");
    if (confirmPanel) confirmPanel.hidden = true;
    const dialog = $("be-auth-dialog");
    const tabs = dialog?.querySelector(".be-auth-tabs");
    if (tabs) tabs.hidden = false;
    const authForm = $("be-auth-form");
    if (authForm) authForm.hidden = false;
    const title = $("be-auth-title"), description = $("be-auth-description"), submit = $("be-auth-submit");
    if (description) description.hidden = false;
    const name = $("be-name-field"), email = $("be-email-field"), password = $("be-password-field"), consent = $("be-consent-field");
    if (!title || !submit) return;
    const names = {signin:"Sign in",signup:"Create your account",reset:"Reset password",recovery:"Choose a new password"};
    const desc = {
      signin:"Sign in using the email and password for your account.",
      signup:"Create your account, then confirm your email using the message we send you.",
      reset:"We'll email you a password reset link.",
      recovery:"Enter a new password to finish recovering your account."
    };
    title.textContent = names[mode] || names.signin;
    if (description) description.textContent = desc[mode] || desc.signin;
    submit.textContent = mode==="signup" ? "Create account" : mode==="reset" ? "Send reset link" : mode==="recovery" ? "Update password" : "Sign in";
    if (name) { name.hidden = mode!=="signup"; name.querySelector("input").required = mode==="signup"; }
    if (email) { email.hidden = mode==="recovery"; email.querySelector("input").required = mode!=="recovery"; }
    if (password) {
      password.hidden = mode==="reset";
      const input = password.querySelector("input");
      input.required = mode!=="reset";
      input.autocomplete = mode==="signin" ? "current-password" : "new-password";
    }
    if (consent) { consent.hidden = mode!=="signup"; consent.querySelector("input").required = mode==="signup"; }
    document.querySelectorAll("[data-auth-mode]").forEach((b) => b.setAttribute("aria-pressed",String(b.dataset.authMode===mode)));
    setVisible("be-open-code",mode==="signin" || mode==="signup");
    const feedback = $("be-auth-feedback");
    if (feedback) { feedback.textContent = ""; feedback.classList.remove("be-error-text"); }
  }
  function openAuth(mode = "signin") {
    setAuthMode(mode);
    const d = $("be-auth-dialog");
    if (!d) return;
    if (typeof d.showModal === "function" && !d.open) d.showModal();
  }
  function closeAuth() { const d=$("be-auth-dialog"); if (d?.open) d.close(); }

  async function initAuth() {
    if (!window.supabase?.createClient) {
      flash("Account service could not load. Check your internet connection and try again.", true);
      return;
    }
    client = window.supabase.createClient(ROOT, PUBLIC_KEY, {
      auth: { storageKey: "butterflies-educare-session", autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
    });
    client.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        window.setTimeout(() => openAuth("recovery"), 0);
      } else if (["SIGNED_IN","SIGNED_OUT","USER_UPDATED","TOKEN_REFRESHED"].includes(event)) {
        window.setTimeout(() => { refreshAuth().catch((e) => flash(e.message, true)); }, 0);
      }
    });
    await refreshAuth();
    await loadPublic();
  }
  async function refreshAuth() {
    if (!client) return;
    const result = await client.auth.getUser();
    user = result?.data?.user || null;
    if (!user) profile = null;
    staffRole = null;
    if (user) {
      const [p, s] = await Promise.all([
        client.from("be_parent_profiles").select("*").eq("user_id", user.id).maybeSingle(),
        client.from("be_staff_memberships").select("staff_role").eq("user_id", user.id).maybeSingle()
      ]);
      if (p.error) flash("Could not load your profile: " + p.error.message, true);
      else profile = p.data;
      if (!s.error) staffRole = s.data?.staff_role || null;
    }
    if (!isPortal) return;
    setVisible("be-dashboard",Boolean(user));
    setVisible("be-guest",!user);
    setVisible("be-staff",Boolean(user && staffRole));
    setVisible("be-principal-link",Boolean(user && staffRole === "admin"));
    setVisible("be-principal-dashboard-link",Boolean(user && staffRole === "admin"));
    setVisible("be-sign-in",!user);
    setVisible("be-sign-out",Boolean(user));
    $("be-account-role").textContent = staffRole ? "School " + staffRole : "Parent / supporter";
    $("be-greeting").textContent = user ? "Welcome, " + (profile?.display_name || user.email?.split("@")[0] || "friend") : "Welcome to your network";
    if (user) {
      const form = $("be-profile-form");
      if (form) {
        form.elements.namedItem("display_name").value = profile?.display_name || user.user_metadata?.full_name || "";
        form.elements.namedItem("phone").value = profile?.phone || "";
        form.elements.namedItem("preferred_contact").value = profile?.preferred_contact || "email";
        form.elements.namedItem("privacy_consent").checked = Boolean(profile?.privacy_consent_at);
      }
      await loadPrivate();
      if (staffRole) await loadStaff();
    }
  }
  async function handleAuth(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = $("be-auth-submit");
    if (submit) submit.disabled = true;
    const email = value(form,"email").toLowerCase();
    const password = value(form,"password");
    const feedback = $("be-auth-feedback");
    try {
      if (!client) throw Error("Account service unavailable.");
      let response;
      if (authMode==="signin") {
        response = await client.auth.signInWithPassword({email,password});
        if (response.error && /email not confirmed/i.test(response.error.message || "")) {
          showEmailConfirmation(email);
          return;
        }
      } else if (authMode==="signup") {
        const name = value(form,"name");
        if (name.length<2 || !form.elements.namedItem("consent").checked) throw Error("Please enter your name and agree to the privacy notice.");
        response = await client.auth.signUp({email,password,options:{
          emailRedirectTo: new URL(PORTAL,location.href).href,
          data:{ full_name:name, school_app:"butterflies-educare" }
        }});
        if (!response.error && !response.data.session) {
          showEmailConfirmation(email);
          return;
        }
      } else if (authMode==="reset") {
        response = await client.auth.resetPasswordForEmail(email,{redirectTo:new URL(PORTAL,location.href).href});
        if (!response.error) {
          if (feedback) feedback.textContent="If this address has an account, a reset link will arrive by email.";
          return;
        }
      } else if (authMode==="recovery") {
        response = await client.auth.updateUser({password});
      }
      if (response?.error) throw response.error;
      closeAuth();
      if (!isPortal) location.href=PORTAL;
      else { await refreshAuth(); flash(authMode==="recovery"?"Password updated.":"You're signed in."); }
    } catch (e) {
      if (feedback) { feedback.textContent=e.message||"Sign-in failed."; feedback.classList.add("be-error-text"); }
    } finally { if(submit)submit.disabled=false; }
  }

  async function publicRecords(table, select, extra) {
    let q=client.from(table).select(select);
    if (table!=="be_public_content") q=q.eq("published",true);
    if (extra) q=extra(q);
    const {data,error}=await q;
    if (error) throw error;
    return Array.isArray(data)?data:[];
  }

  async function loadPublic() {
    if (!isPortal || !client) return;
    let events=[],fundraisers=[],announcements=[];
    try {
      const control = new AbortController();
      const timer = setTimeout(() => control.abort(), 4200);
      try {
        const res=await fetch(BACKEND+"/overview",{signal:control.signal,headers:{Accept:"application/json"}});
        if (!res.ok) throw Error("Public feed unavailable");
        const data=await res.json();
        if (!Array.isArray(data.events)||!Array.isArray(data.fundraisers)||!Array.isArray(data.announcements)) throw Error("Invalid feed");
        events=data.events; fundraisers=data.fundraisers; announcements=data.announcements;
      } finally {clearTimeout(timer);}
    } catch {
      try {
        [events,fundraisers,announcements]=await Promise.all([
          publicRecords("be_school_events","id,title,description,starts_at,venue",q=>q.gte("starts_at",new Date().toISOString()).order("starts_at").limit(12)),
          publicRecords("be_fundraising_projects","id,title,description,goal_description,status",q=>q.order("created_at",{ascending:false}).limit(12)),
          publicRecords("be_public_content","id,title,summary,section,publish_at",q=>q.eq("published",true).lte("publish_at",new Date().toISOString()).order("publish_at",{ascending:false}).limit(8))
        ]);
      } catch(e) { flash("School updates are temporarily unavailable. Please try again later.",true); }
    }
    renderPublic("be-news-list",announcements,"School updates will appear after review.",(item)=>{
      const card=publicCard(item.title,item.summary,item.section==="initiative"?"Community":"Announcement");
      card.appendChild(create("small",niceDate(item.publish_at)));
      return card;
    });
    renderPublic("be-events-list",events,"No confirmed school events yet.",(item)=>{
      const card=publicCard(item.title,item.description,"School event");
      card.appendChild(create("small",niceDate(item.starts_at)+(item.venue?" · "+item.venue:"")));
      const attending = activity.rsvps.some(x=>x.event_id===item.id && x.status==="going");
      card.appendChild(btn(attending?"Cancel RSVP":"RSVP for event", async()=>{
        if(!requireAccount())return;
        try {
          const current=activity.rsvps.find(x=>x.event_id===item.id);
          const result=current ?
            await client.from("be_event_rsvps").update({status:current.status==="going"?"cancelled":"going"}).eq("id",current.id) :
            await client.from("be_event_rsvps").insert({event_id:item.id,parent_id:user.id});
          if(result.error)throw result.error;
          flash("Your event response has been saved.");
          await loadPrivate();await loadPublic();
        }catch(e){flash(e.message,true);}
      }));
      return card;
    });
    renderPublic("be-fundraisers-list",fundraisers,"The school hasn't published fundraising projects yet.",(item)=>{
      const card=publicCard(item.title,item.description,"School project");
      if(item.goal_description)card.appendChild(create("small",item.goal_description));
      card.appendChild(btn("Offer support",()=>{
        if(!requireAccount())return;
        $("be-sponsor-form")?.scrollIntoView({behavior:"smooth",block:"center"});
      }));
      return card;
    });
  }
  function publicCard(title,desc,label) {
    const card=create("article",null,"be-public-card");
    card.appendChild(create("span",label,"be-tag"));
    card.appendChild(create("h3",title));
    card.appendChild(create("p",desc||"Further information is being prepared."));
    return card;
  }
  function renderPublic(id,records,empty,factory) {
    const target=$(id);if(!target)return;
    target.replaceChildren();
    if(!records.length){target.appendChild(create("div",empty,"be-empty"));return;}
    records.forEach(item=>target.appendChild(factory(item)));
  }

  async function loadPrivate() {
    if (!client||!user||!isPortal)return;
    const queries=[
      client.from("be_enrolment_enquiries").select("id,age_group,preferred_start,status,created_at").eq("parent_id",user.id).order("created_at",{ascending:false}).limit(30),
      client.from("be_event_rsvps").select("id,event_id,status,created_at").eq("parent_id",user.id).order("created_at",{ascending:false}).limit(30),
      client.from("be_parent_messages").select("id,subject,body,staff_reply,status,created_at").eq("parent_id",user.id).order("created_at",{ascending:false}).limit(30),
      client.from("be_sponsorship_enquiries").select("id,organisation,interest,status,created_at").eq("parent_id",user.id).order("created_at",{ascending:false}).limit(30),
      client.from("be_volunteer_interests").select("id,category,status,created_at").eq("parent_id",user.id).order("created_at",{ascending:false}).limit(30)
    ];
    const result=await Promise.all(queries);
    for(const r of result) if(r.error) {flash("Could not load an account activity list.",true);return;}
    const keys=["enrolments","rsvps","messages","sponsors","volunteers"];
    keys.forEach((k,i)=>{activity[k]=result[i].data||[];});
    $("be-count-enrolment").textContent=String(activity.enrolments.length);
    $("be-count-rsvp").textContent=String(activity.rsvps.filter(x=>x.status==="going").length);
    $("be-count-messages").textContent=String(activity.messages.length);
    $("be-count-community").textContent=String(activity.sponsors.length+activity.volunteers.length);
    const target=$("be-activity-list");target.replaceChildren();
    const list=[
      ...activity.enrolments.map(x=>({label:"Enrolment information · "+x.age_group,detail:x.status,time:x.created_at})),
      ...activity.messages.map(x=>({label:"Message · "+x.subject,detail:x.staff_reply?"Staff replied: "+x.staff_reply:x.status,time:x.created_at})),
      ...activity.sponsors.map(x=>({label:"Support · "+x.organisation,detail:x.interest+" · "+x.status,time:x.created_at})),
      ...activity.volunteers.map(x=>({label:"Volunteering · "+x.category,detail:x.status,time:x.created_at}))
    ].sort((a,b)=>new Date(b.time)-new Date(a.time)).slice(0,15);
    if(!list.length) target.appendChild(create("p","Your submitted enquiries and messages will appear here.","be-muted"));
    list.forEach(x=>{
      const row=create("div",null,"be-activity-row");
      row.append(create("strong",x.label),create("span",x.detail),create("small",niceDate(x.time)));
      target.appendChild(row);
    });
  }
  async function loadStaff() {
    if(!staffRole||!client)return;
    const [posts,events,projects,enquiries,messages,sponsors,volunteers,profiles]=await Promise.all([
      client.from("be_public_content").select("id,title,section,published,publish_at").order("created_at",{ascending:false}).limit(30),
      client.from("be_school_events").select("id,title,published,starts_at").order("created_at",{ascending:false}).limit(30),
      client.from("be_fundraising_projects").select("id,title,published,created_at").order("created_at",{ascending:false}).limit(30),
      client.from("be_enrolment_enquiries").select("id,parent_id,age_group,status,created_at").order("created_at",{ascending:false}).limit(30),
      client.from("be_parent_messages").select("id,parent_id,subject,body,staff_reply,status,created_at").order("created_at",{ascending:false}).limit(30),
      client.from("be_sponsorship_enquiries").select("id,parent_id,organisation,interest,status,created_at").order("created_at",{ascending:false}).limit(30),
      client.from("be_volunteer_interests").select("id,parent_id,category,status,created_at").order("created_at",{ascending:false}).limit(30),
      client.from("be_parent_profiles").select("user_id,display_name,phone,contact_email").limit(100)
    ]);
    const drafts=$("be-staff-drafts");drafts.replaceChildren();
    const groups=[
      {title:"News",table:"be_public_content",rows:posts.data||[]},
      {title:"Event",table:"be_school_events",rows:events.data||[]},
      {title:"Fundraiser",table:"be_fundraising_projects",rows:projects.data||[]}
    ];
    for(const group of groups){
      for(const record of group.rows){
        const row=create("div",null,"be-activity-row");
        row.append(create("strong",group.title+" · "+record.title),create("span",record.published?"Published":"Draft"));
        row.appendChild(btn(record.published?"Unpublish":"Publish",async()=>{
          try{
            const change=await client.from(group.table).update({published:!record.published}).eq("id",record.id);
            if(change.error)throw change.error;
            flash("School content updated.");await loadStaff();await loadPublic();
          }catch(e){flash(e.message,true);}
        }));
        drafts.appendChild(row);
      }
    }
    if(!drafts.children.length)drafts.appendChild(create("p","No school content created yet.","be-muted"));
    const inbox=$("be-staff-inbox");inbox.replaceChildren();
    const people=new Map((profiles.data||[]).map(p=>[p.user_id,p]));
    const inboxGroups=[
      {title:"Enrolment",table:"be_enrolment_enquiries",items:enquiries.data||[],summary:x=>"Age: "+x.age_group},
      {title:"Parent message",table:"be_parent_messages",items:messages.data||[],summary:x=>x.subject+" — "+x.body},
      {title:"Sponsorship",table:"be_sponsorship_enquiries",items:sponsors.data||[],summary:x=>x.organisation+" · "+x.interest},
      {title:"Volunteer",table:"be_volunteer_interests",items:volunteers.data||[],summary:x=>x.category}
    ];
    let count=0;
    for(const group of inboxGroups) for(const item of group.items){
      count+=1;
      const p=people.get(item.parent_id);
      const row=create("div",null,"be-activity-row");
      row.append(create("strong",group.title+" · "+group.summary(item)),create("span",(p?.display_name||"Member")+" · "+(p?.contact_email||"No email in profile")+(p?.phone?" · "+p.phone:"")),create("small",niceDate(item.created_at)+" · "+item.status));
      const actions=create("div",null,"be-row-actions");
      actions.append(btn("Mark contacted",async()=>{
        try{const r=await client.from(group.table).update({status:group.table==="be_parent_messages"?"closed":"contacted"}).eq("id",item.id);if(r.error)throw r.error;flash("Status updated.");await loadStaff();}
        catch(e){flash(e.message,true);}
      }));
      if(group.table==="be_parent_messages") actions.append(btn("Write reply",async()=>{
        const reply=window.prompt("Reply to this parent (max 900 characters):",item.staff_reply||"");
        if(reply===null)return;
        if(reply.trim().length<3||reply.length>900){flash("The reply must be 3–900 characters.",true);return;}
        try{const r=await client.from(group.table).update({staff_reply:reply.trim(),replied_at:new Date().toISOString(),status:"replied"}).eq("id",item.id);if(r.error)throw r.error;flash("Reply saved to the parent's secure inbox.");await loadStaff();}
        catch(e){flash(e.message,true);}
      }));
      row.appendChild(actions);inbox.appendChild(row);
    }
    if(!count)inbox.appendChild(create("p","No parent or community submissions yet.","be-muted"));

    await loadSchoolInformation();
  }

  async function loadSchoolInformation(){
    if(!staffRole || !client) return;
    const form=$("be-school-information-form");
    if(!form) return;
    const {data,error}=await client.from("be_school_information").select("*").eq("id","school").maybeSingle();
    if(error){flash("Could not load school information. "+error.message,true);return;}
    const record=data||{};
    for(const name of ["school_name","summary","street_address","public_email","public_phone","operating_hours","enrolment_guidance","fee_guidance"]){
      const field=form.elements.namedItem(name);
      if(field)field.value=record[name]||((name==="school_name")?"Butterflies Educare":"");
    }
    form.elements.namedItem("published").checked=Boolean(record.published);
    form.elements.namedItem("approved").checked=false;
  }

  function bindForms() {
    const attach=(id,callback)=>{
      const f=$(id);if(f)f.addEventListener("submit",(e)=>{e.preventDefault();runForm(f,()=>callback(f));});
    };
    attach("be-profile-form",async(f)=>{
      if(!isSignedIn())throw Error("Please sign in.");
      if(!f.elements.namedItem("privacy_consent").checked)throw Error("Please agree to the privacy notice.");
      const payload={
        user_id:user.id,display_name:limit(value(f,"display_name"),100),
        phone:value(f,"phone")||null,preferred_contact:value(f,"preferred_contact"),
        contact_email:user.email||null,
        privacy_consent_at:profile?.privacy_consent_at||new Date().toISOString()
      };
      const r=await client.from("be_parent_profiles").upsert(payload,{onConflict:"user_id"});
      if(r.error)throw r.error;
      const p=await client.from("be_parent_profiles").select("*").eq("user_id",user.id).maybeSingle();
      if(p.error)throw p.error;profile=p.data;
      $("be-greeting").textContent="Welcome, "+profile.display_name;
      f.elements.namedItem("privacy_consent").checked=true;
    });
    attach("be-enrolment-form",async(f)=>{
      if(!requireAccount())throw Error("Save your profile first.");
      const r=await client.from("be_enrolment_enquiries").insert({parent_id:user.id,age_group:value(f,"age_group"),preferred_start:value(f,"preferred_start")});
      if(r.error)throw r.error;
    });
    attach("be-sponsor-form",async(f)=>{
      if(!requireAccount())throw Error("Save your profile first.");
      const r=await client.from("be_sponsorship_enquiries").insert({parent_id:user.id,organisation:limit(value(f,"organisation"),150),interest:value(f,"interest")});
      if(r.error)throw r.error;
    });
    attach("be-volunteer-form",async(f)=>{
      if(!requireAccount())throw Error("Save your profile first.");
      const r=await client.from("be_volunteer_interests").insert({parent_id:user.id,category:value(f,"category")});
      if(r.error)throw r.error;
    });
    attach("be-message-form",async(f)=>{
      if(!requireAccount())throw Error("Save your profile first.");
      const r=await client.from("be_parent_messages").insert({parent_id:user.id,subject:limit(value(f,"subject"),120),body:limit(value(f,"body"),900)});
      if(r.error)throw r.error;
    });
    attach("be-staff-post",async(f)=>{
      if(!staffRole)throw Error("Staff access required.");
      const r=await client.from("be_public_content").insert({title:limit(value(f,"title"),140),summary:limit(value(f,"summary"),1000),section:value(f,"section"),published:false});
      if(r.error)throw r.error;await loadStaff();
    });
    attach("be-staff-event",async(f)=>{
      if(!staffRole)throw Error("Staff access required.");
      const d=new Date(value(f,"starts_at"));
      if(Number.isNaN(d.valueOf()))throw Error("Please choose a valid date and time.");
      const r=await client.from("be_school_events").insert({title:limit(value(f,"title"),140),description:limit(value(f,"description"),1200),venue:limit(value(f,"venue"),140)||null,starts_at:d.toISOString(),published:false});
      if(r.error)throw r.error;await loadStaff();
    });
    attach("be-school-information-form",async(f)=>{
      if(!staffRole)throw Error("Authorised school staff access is required.");
      const published=Boolean(f.elements.namedItem("published").checked);
      const approved=Boolean(f.elements.namedItem("approved").checked);
      const schoolName=value(f,"school_name");
      const summary=value(f,"summary");
      const address=value(f,"street_address");
      const email=value(f,"public_email");
      const phone=value(f,"public_phone");
      if(published && !approved)throw Error("Confirm school-manager approval before publishing.");
      if(published && (summary.length<15 || address.length<5 || (!email && !phone))) {
        throw Error("To publish, provide a verified description, address and at least one official contact method.");
      }
      const payload={
        id:"school",
        school_name:limit(schoolName,120),
        summary:limit(summary,1600)||null,
        street_address:limit(address,350)||null,
        public_email:limit(email,254)||null,
        public_phone:limit(phone,35)||null,
        operating_hours:limit(value(f,"operating_hours"),300)||null,
        enrolment_guidance:limit(value(f,"enrolment_guidance"),1500)||null,
        fee_guidance:limit(value(f,"fee_guidance"),1200)||null,
        published,
        updated_at:new Date().toISOString()
      };
      const result=await client.from("be_school_information").upsert(payload,{onConflict:"id"});
      if(result.error)throw result.error;
      await loadSchoolInformation();
    });
    attach("be-staff-fundraiser",async(f)=>{
      if(!staffRole)throw Error("Staff access required.");
      const r=await client.from("be_fundraising_projects").insert({title:limit(value(f,"title"),140),description:limit(value(f,"description"),1500),goal_description:limit(value(f,"goal_description"),250)||null,published:false});
      if(r.error)throw r.error;await loadStaff();
    });
  }

  function bootstrap(){
    if(!isPortal) landingSetup();
    document.querySelectorAll("[data-be-open-auth]").forEach(button=>button.addEventListener("click",()=>openAuth(button.dataset.beAuthMode||"signin")));
    document.querySelectorAll("[data-auth-mode]").forEach(button=>button.addEventListener("click",()=>setAuthMode(button.dataset.authMode)));
    $("be-auth-close")?.addEventListener("click",closeAuth);
    $("be-auth-dialog")?.addEventListener("click",e=>{if(e.target===$("be-auth-dialog"))closeAuth();});
    $("be-auth-form")?.addEventListener("submit",handleAuth);
    $("be-open-code")?.addEventListener("click", openCodeEntry);
    $("be-sign-out")?.addEventListener("click",async()=>{
      if(client) await client.auth.signOut();
      user=null;profile=null;staffRole=null;
      await refreshAuth();
      flash("You're signed out.");
    });
    if(isPortal)bindForms();
    initAuth().then(() => {
      const query = new URLSearchParams(location.search);
      if (isPortal && client && !user && query.get("setup") === "principal") {
        openAuth("signup");
        const authForm = $("be-auth-form");
        if (authForm) {
          authForm.elements.namedItem("name").value = "Butterflies Educare";
          authForm.elements.namedItem("email").value = "Butterfliesedu@gmail.com";
          authForm.elements.namedItem("password").focus();
        }
      }
    }).catch(e=>flash(e.message||"Account system unavailable.",true));
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bootstrap,{once:true});else bootstrap();
})();