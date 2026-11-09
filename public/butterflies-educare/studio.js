/* Butterflies Educare • Studio V3: premium UI, community tools and quality-of-life.
 * No external AI calls, tracking, secrets or personal data collection.
 * Everything typed into the support studio stays in the browser. */
(() => {
  "use strict";
  const isPortal = document.body?.dataset.bePage === "portal";
  const HOME = "./";
  const PARENT = "./parent.html";
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const create = (tag, className, value) => {
    const node = document.createElement(tag);
    if(className) node.className = className;
    if(value !== undefined && value !== null) node.textContent = String(value);
    return node;
  };
  function makeIcon(name) {
    const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("viewBox","0 0 24 24");
    svg.setAttribute("fill","none");svg.setAttribute("stroke","currentColor");
    svg.setAttribute("stroke-width","1.8");svg.setAttribute("stroke-linecap","round");
    svg.setAttribute("stroke-linejoin","round");svg.setAttribute("aria-hidden","true");
    const path=document.createElementNS(svg.namespaceURI,"path");
    const shapes={
      home:"M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
      users:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
      flower:"M12 12c-3-7-9-5-8-1 1 3 5 4 8 1 3-7 9-5 8-1-1 3-5 4-8 1zM12 12c-7-3-5-9-1-8 3 1 4 5 1 8 7 3 5 9 1 8-3-1-4-5-1-8z",
      calendar:"M3 5h18v16H3zM7 3v4m10-4v4M3 11h18M7 15h3m4 0h3",
      up:"M12 19V5m-7 7 7-7 7 7"
    };
    path.setAttribute("d",shapes[name]||shapes.home);
    svg.appendChild(path);
    return svg;
  }
  function introPolish() {
    if(!isPortal) {
      const scene=$(".hero-illustration");
      if(scene && !scene.querySelector(".studio-scene-label")){
        const tag=create("span","studio-scene-label");
        tag.append(create("strong","", "A little wonder, every day"), create("small","", "A welcoming space for families"));
        scene.appendChild(tag);
      }
      const communityButton=$("#community .support .btn");
      if(communityButton && communityButton.getAttribute("href")==="#contact"){
        communityButton.href=PARENT+"#be-fundraising";
        communityButton.textContent="Explore community opportunities";
      }
    }
  }
  function scrollProgress() {
    const progress=create("div","studio-progress");
    progress.setAttribute("aria-hidden","true");
    const bar=create("div","studio-progress-bar");
    progress.appendChild(bar);
    document.body.appendChild(progress);
    const up=create("button","studio-scroll-top");
    up.type="button";up.setAttribute("aria-label","Back to the top");
    up.appendChild(makeIcon("up"));
    up.addEventListener("click",()=>window.scrollTo({top:0,behavior:window.matchMedia?.("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
    document.body.appendChild(up);
    let queued=false;
    const update=()=>{
      queued=false;
      const full=document.documentElement.scrollHeight-window.innerHeight;
      const pct=full>0?Math.max(0,Math.min(100,100*window.scrollY/full)):0;
      bar.style.width=pct.toFixed(1)+"%";
      up.classList.toggle("visible",window.scrollY>800);
    };
    const mark=()=>{if(!queued){queued=true;window.requestAnimationFrame(update);}};
    window.addEventListener("scroll",mark,{passive:true});
    window.addEventListener("resize",mark,{passive:true});
    update();
  }
  function mobileDock() {
    if($(".studio-bottom-nav"))return;
    const nav=create("nav","studio-bottom-nav");
    nav.setAttribute("aria-label","Quick navigation");
    const links=isPortal?
      [[HOME,"School","home"],["./calendar.html","Calendar","calendar"],["#be-dashboard","My space","users"]]:
      [[HOME,"Home","home"],[PARENT,"Parent hub","users"],["./calendar.html","Calendar","calendar"]];
    links.forEach(([url,name,icon],idx)=>{
      const a=create("a","",name);
      a.href=url;
      a.prepend(makeIcon(icon));
      if(idx===(isPortal?1:0))a.setAttribute("aria-current","page");
      nav.appendChild(a);
    });
    document.body.appendChild(nav);
  }
  function activityFilters() {
    if(!isPortal)return;
    const list=$("#be-activity-list");
    if(!list || $("#studio-activity-filter"))return;
    const parent=list.parentElement;
    const wrap=create("div","studio-filter-bar");
    wrap.id="studio-activity-filter";
    wrap.setAttribute("role","group");
    wrap.setAttribute("aria-label","Filter your activity");
    const options=[["All activity","all"],["Enrolment","enrolment"],["Messages","message"],["Support","support"],["Volunteering","volunteering"]];
    let current="all";
    const empty=create("p","studio-empty-filter","There are no items in this category yet.");
    empty.hidden=true;
    const apply=()=>{
      let visible=0;
      $$(".be-activity-row",list).forEach(row=>{
        const name=$("strong",row)?.textContent?.toLowerCase()||"";
        const matches=current==="all"||name.startsWith(current);
        row.hidden=!matches;
        if(matches)visible++;
      });
      empty.hidden=visible>0 || list.querySelector(".be-muted")!==null;
      $$(".studio-filter",wrap).forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.filter===current)));
    };
    options.forEach(([label,key])=>{
      const b=create("button","studio-filter",label);
      b.type="button";b.dataset.filter=key;
      b.setAttribute("aria-pressed",String(current===key));
      b.addEventListener("click",()=>{current=key;apply();});
      wrap.appendChild(b);
    });
    parent.insertBefore(wrap,list);
    parent.appendChild(empty);
    const observer=new MutationObserver(apply);
    observer.observe(list,{childList:true,subtree:true});
    apply();
    window.addEventListener("pagehide",()=>observer.disconnect(),{once:true});
  }
  function accountGuidance() {
    const dialog=$("#be-auth-dialog");
    if(!dialog || dialog.dataset.studioEnhanced)return;
    dialog.dataset.studioEnhanced="true";
    const password=$("#be-password-field input",dialog);
    if(password && !password.parentElement.querySelector(".studio-pass-toggle")){
      const wrapper=create("div","studio-password-wrap");
      const parent=password.parentNode;
      parent.insertBefore(wrapper,password);
      wrapper.appendChild(password);
      const toggle=create("button","studio-pass-toggle","Show");
      toggle.type="button";
      toggle.setAttribute("aria-label","Show password");
      toggle.setAttribute("aria-pressed","false");
      toggle.addEventListener("click",()=>{
        const shown=password.type!=="password";
        password.type=shown?"password":"text";
        toggle.textContent=shown?"Show":"Hide";
        toggle.setAttribute("aria-label",shown?"Show password":"Hide password");
        toggle.setAttribute("aria-pressed",String(!shown));
      });
      wrapper.appendChild(toggle);
      const meter=create("div","studio-password-meter");
      const track=create("div","studio-meter-track");
      const fill=create("div","studio-meter-fill");
      track.appendChild(fill);
      const help=create("span","", "Use at least 8 characters, ideally a long unique passphrase.");
      meter.append(track,help);
      parent.appendChild(meter);
      const check=()=>{
        const heading=$("#be-auth-title")?.textContent?.toLowerCase()||"";
        const relevant=heading.includes("create")||heading.includes("new password");
        meter.hidden=!relevant;
        if(!relevant)return;
        const s=password.value;
        const score=Number(s.length>=8)+Number(s.length>=12)+Number(/[a-z]/.test(s)&&/[A-Z]/.test(s))+Number(/\d/.test(s))+Number(/[^a-zA-Z0-9]/.test(s));
        fill.style.width=String(Math.min(100,score*20))+"%";
        fill.classList.toggle("good",score>=4);
        help.textContent=s.length<8?"Use at least 8 characters.":score>=4?"Strong-looking password. Avoid reused passwords.":"Try a longer, unique passphrase with varied characters.";
      };
      password.addEventListener("input",check);
      $$("[data-auth-mode]",dialog).forEach(b=>b.addEventListener("click",()=>queueMicrotask(check)));
      // Also updates when password recovery changes the dialog's mode.
      const heading=$("#be-auth-title");
      if(heading){const observer=new MutationObserver(check);observer.observe(heading,{childList:true});window.addEventListener("pagehide",()=>observer.disconnect(),{once:true});}
      check();
    }
    const email=$("#be-email-field input",dialog);
    if(email){
      const hint=create("span","studio-email-hint");
      hint.hidden=true;
      email.parentElement.appendChild(hint);
      email.addEventListener("input",()=>{
        const v=email.value.trim().toLowerCase();
        const common={ "gmail.con":"gmail.com","gmail.cmo":"gmail.com","gmail.co.zaa":"gmail.co.za","outlook.con":"outlook.com","yahoo.con":"yahoo.com","hotmial.com":"hotmail.com","gmial.com":"gmail.com" };
        const domain=v.split("@")[1]||"";
        const correction=common[domain];
        hint.hidden=!correction;
        hint.textContent=correction?"Please double-check the email domain. Did you mean "+correction+"?":"";
      });
    }
  }
  function portalStatus(){
    if(!isPortal)return;
    const guest=$("#be-guest");
    if(!guest || $("#studio-status-guide"))return;
    const note=create("aside","studio-status-guide");
    note.id="studio-status-guide";
    const copy=create("div");
    copy.append(create("strong","", "Your space, your information"),create("p","", "Your own enquiries and messages are private. Published school news and events remain visible to everyone."));
    const link=create("a","", "Browse school news");
    link.href="#be-news";
    note.append(copy,link);
    guest.insertAdjacentElement("beforebegin",note);
  }
  function quickLinks(){
    if(!isPortal)return;
    const main=$(".be-shell");
    const target=$("#be-news");
    if(!main || !target || $("#studio-subnav"))return;
    const nav=create("nav","studio-subnav");
    nav.id="studio-subnav";
    nav.setAttribute("aria-label","Parent network sections");
    const items=[["School news","#be-news"],["Events","#be-events"],["Fundraising","#be-fundraising"],["School guide","#bex-school-guide"]];
    items.forEach(([label,href])=>{
      const a=create("a","",label);
      a.href=href;nav.appendChild(a);
    });
    main.insertBefore(nav,target);
  }

  function studioPanel(parent) {
    const section=create("section","studio-section");
    section.id="studio-community-toolkit";
    section.setAttribute("aria-labelledby","studio-tool-heading");
    const inner=create("div","studio-section-inner");
    const head=create("div","studio-head");
    const eyebrow=create("span","studio-overline","Practical ways to get involved");
    const heading=create("h2","", "Big ideas deserve a little help.");
    heading.id="studio-tool-heading";
    const lead=create("p","", "Choose a way to contribute, prepare a thoughtful first message and connect with the school. Everything here is a preview until school staff approve the arrangements.");
    head.append(eyebrow,heading,lead);
    const layout=create("div","studio-showcase");
    const panel=create("article","studio-showcase-main");
    const mini=create("span","studio-overline", "Community studio");
    const title=create("h3","", "Where would you like to start?");
    const desc=create("p","", "Build a simple sponsorship note or find a volunteering route that matches your skills.");
    const tabs=create("div","studio-tool-tabs");
    tabs.setAttribute("role","tablist");
    tabs.setAttribute("aria-label","Community support tools");
    const body=create("div","studio-tool-panel");
    body.setAttribute("role","tabpanel");
    body.id="studio-tool-panel";
    panel.append(mini,title,desc,tabs,body);
    const aside=create("aside","studio-showcase-aside");
    aside.append(create("span","studio-overline","Growing together"),create("h3","", "Small contributions create possibility."),
      create("p","", "Offer time, knowledge, resources or a conversation. This preview helps you prepare; it does not collect donations or claim any fundraising targets."));
    const ring=create("div","studio-orbit");
    ring.setAttribute("aria-hidden","true");
    const core=create("div","studio-orbit-core");
    core.setAttribute("aria-hidden","true");
    aside.append(ring,core);
    layout.append(panel,aside);
    inner.append(head,layout);
    section.appendChild(inner);
    const marker=isPortal?$("#be-fundraising"):$("#community");
    if(marker)marker.insertAdjacentElement("afterend",section);
    else return;

    function field(label,kind,name,max,placeholder) {
      const wrap=create("label","studio-field",label);
      const input=create(kind==="textarea"?"textarea":"input");
      input.name=name;
      if(kind!=="textarea")input.type="text";
      if(max)input.maxLength=max;
      if(placeholder)input.placeholder=placeholder;
      wrap.appendChild(input);
      return wrap;
    }
    function sponsorTab() {
      body.replaceChildren();
      const f=create("form","studio-form");
      f.setAttribute("autocomplete","off");
      f.appendChild(create("h4","", "Prepare a sponsorship introduction"));
      f.appendChild(create("p","", "Draft a respectful opening message for the principal. It stays on your device until you choose to copy or download it."));
      const grid=create("div","studio-form-grid");
      const org=field("Your organisation (optional)","input","organisation",90,"e.g. Your local business");
      const option=create("label","studio-field","How could you help?");
      const sel=create("select");sel.name="support";
      [["goods","Donate supplies or equipment"],["time","Volunteer professional time"],["funding","Discuss a financial sponsorship"],["events","Support events or activities"]].forEach(([v,l])=>{
        const o=create("option","",l);o.value=v;sel.appendChild(o);
      });
      option.appendChild(sel);grid.append(org,option);
      const skills=field("What could you offer? (optional)","textarea","offer",200,"A few words about the help you'd like to explore");
      const actions=create("div","studio-tool-actions");
      const generate=create("button","studio-tool-btn","Create draft");
      generate.type="submit";
      const copy=create("button","studio-tool-btn ghost","Copy draft");
      copy.type="button";copy.hidden=true;
      const download=create("button","studio-tool-btn ghost","Save draft");
      download.type="button";download.hidden=true;
      actions.append(generate,copy,download);
      const preview=create("div","studio-preview");
      preview.hidden=true;
      const status=create("p","studio-note","This is not sent to the school automatically. Please avoid private information about children.");
      let final="";
      f.addEventListener("submit",e=>{
        e.preventDefault();
        const company=String(org.querySelector("input").value||"").trim().slice(0,90);
        const offer=String(skills.querySelector("textarea").value||"").trim().slice(0,200);
        const themes={
          goods:"contribute useful supplies or resources",
          time:"volunteer professional skills or time",
          funding:"explore a possible financial sponsorship",
          events:"help with an approved school event"
        };
        const action=themes[sel.value]||themes.time;
        final="Subject: Butterflies Educare — community support enquiry\n\n"+
          "Dear Butterflies Educare team,\n\n"+
          "I would like to explore how I could "+action+" to support your school community.\n\n"+
          (company?"I am reaching out on behalf of "+company+".\n\n":"")+
          (offer?"One possible contribution I have in mind is: "+offer+"\n\n":"")+
          "I understand any arrangement should reflect the school's current priorities and approvals. "+
          "Would it be possible to discuss what would be most useful and how I could get involved?\n\n"+
          "Kind regards";
        preview.textContent=final;
        preview.hidden=false;
        copy.hidden=false;download.hidden=false;
        status.textContent="Your draft is ready. Review it before contacting the school.";
      });
      copy.addEventListener("click",async()=>{
        if(!final)return;
        try {
          await navigator.clipboard.writeText(final);
          status.textContent="Draft copied. You can paste it into your preferred message or email.";
        } catch {
          status.textContent="Copy is unavailable in this browser. Select the text above to copy it.";
        }
      });
      download.addEventListener("click",()=>{
        if(!final)return;
        const blob=new Blob([final],{type:"text/plain;charset=utf-8"});
        const url=URL.createObjectURL(blob);
        const a=create("a");
        a.href=url;a.download="butterflies-support-introduction.txt";
        document.body.appendChild(a);a.click();a.remove();
        setTimeout(()=>URL.revokeObjectURL(url),1500);
      });
      const link=create("a","studio-tool-hint","Ready to contact the school? Open the community support enquiry.");
      link.href=PARENT+"#be-sponsor-form";
      f.append(grid,skills,actions,preview,status,link);
      body.appendChild(f);
    }
    function volunteerTab() {
      body.replaceChildren();
      body.append(create("h4","", "Find a way to help"),create("p","", "Pick a strength you could share. This recommends a contact route, not a confirmed volunteering position."));
      const grid=create("div","studio-choice-grid");
      grid.setAttribute("role","group");grid.setAttribute("aria-label","Your interests");
      const output=create("div","studio-skill-answer");
      output.setAttribute("aria-live","polite");
      const choices=[
        ["Organising events","events","School events","Offer to help plan or coordinate activities, subject to approval."],
        ["Fundraising ideas","fundraising","Fundraising","Offer help planning a school-approved fundraiser."],
        ["Design & communication","communications","Communications","Offer writing, design or digital communication skills."],
        ["Providing supplies","sponsorship","Sponsorship","Discuss useful resources, supplies or professional support."]
      ];
      const buttons=[];
      const render=(idx)=>{
        buttons.forEach((b,i)=>b.setAttribute("aria-pressed",String(i===idx)));
        const item=choices[idx];
        output.replaceChildren();
        output.append(create("strong","",item[2]),create("p","",item[3]));
        const a=create("a","", "Continue to the school enquiry");
        a.href=PARENT+(item[1]==="sponsorship"?"#be-sponsor-form":"#be-volunteer-form");
        output.appendChild(a);
      };
      choices.forEach((item,i)=>{
        const button=create("button","studio-choice",item[0]);
        button.type="button";button.setAttribute("aria-pressed",String(i===0));
        button.addEventListener("click",()=>render(i));
        grid.appendChild(button);buttons.push(button);
      });
      body.append(grid,output);
      render(0);
    }
    function stepsTab() {
      body.replaceChildren();
      body.append(create("h4","", "How community support works"),
        create("p","", "Your offer is an invitation to discuss—not an automatic donation, commitment or school-approved campaign."));
      const list=create("ol","studio-list-steps");
      const lines=[
        "Share what you could offer through the parent and community network.",
        "School staff review whether it fits their actual needs and approvals.",
        "Agree details directly with the school before any donation, publicity or project begins."
      ];
      lines.forEach(line=>{const li=create("li","",line);list.appendChild(li);});
      body.appendChild(list);
      const go=create("a","studio-tool-btn studio-go","Open community enquiries");
      go.href=PARENT+"#be-fundraising";
      body.appendChild(go);
      body.appendChild(create("p","studio-note","No school fees or fundraising payments are collected through this preview."));
    }
    const renderers=[sponsorTab,volunteerTab,stepsTab];
    const tabLabels=["Sponsorship note","Match my skills","How it works"];
    const controls=[];
    tabLabels.forEach((name,i)=>{
      const tab=create("button","studio-tab",name);
      tab.type="button";tab.id="studio-tab-"+i;tab.setAttribute("role","tab");
      tab.setAttribute("aria-controls",body.id);
      tab.setAttribute("aria-selected",String(i===0));
      tab.tabIndex=i===0?0:-1;
      tab.addEventListener("click",()=>activate(i));
      tab.addEventListener("keydown",e=>{
        if(e.key==="ArrowRight"||e.key==="ArrowLeft"){
          e.preventDefault();
          const n=(i+(e.key==="ArrowRight"?1:-1)+controls.length)%controls.length;
          activate(n);controls[n].focus();
        }
      });
      controls.push(tab);tabs.appendChild(tab);
    });
    const activate=i=>{
      controls.forEach((tab,n)=>{
        tab.setAttribute("aria-selected",String(i===n));
        tab.tabIndex=n===i?0:-1;
      });
      body.setAttribute("aria-labelledby",controls[i].id);
      renderers[i]();
    };
    activate(0);
  }
  function boot(){
    if(document.documentElement.dataset.studioV3==="true")return;
    document.documentElement.dataset.studioV3="true";
    introPolish();
    scrollProgress();
    mobileDock();
    portalStatus();
    quickLinks();
    activityFilters();
    accountGuidance();
    studioPanel();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();