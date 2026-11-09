/* Butterflies Educare experience layer V2.
   Privacy-first guided help, useful parent tools, and dimensional CSS/SVG visuals.
   School guide is RULE-BASED, not a generative AI chatbot; it never sends typed questions.
   No child information, tracking, extra paid services or private school data. */
(() => {
  "use strict";

  const PAGE = document.body?.dataset.bePage === "portal" ? "parent" : "home";
  const PARENT = "./parent.html";
  const FEED = "https://product-listing-server.onrender.com/api/butterflies/overview";
  const MOTION_KEY = "be-motion-pause-v2";
  const CHECKLIST_KEY = "be-home-checklist-v2";
  let publicFeedPromise = null;
  const $ = (selector, scope = document) => scope.querySelector(selector);

  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = String(text);
    return node;
  };
  const svgDecor = (kind) => {
    const art = create("div", "bex-card-visual");
    art.setAttribute("aria-hidden", "true");
    const ring = create("span", "bex-orbit-ring");
    const icon = create("span", "bex-art-object");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    // Fixed decorative SVGs only. No user data is inserted as HTML.
    if (kind === "discover") svg.innerHTML =
      '<path d="M48 82V41" stroke="#4a8e72" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M49 64Q16 60 21 32Q48 36 49 64Z" fill="#a3c9a9"/>' +
      '<path d="M49 55Q80 49 76 22Q49 30 49 55Z" fill="#78ad89"/>' +
      '<circle cx="49" cy="23" r="12" fill="#efc892"/><circle cx="49" cy="10" r="10" fill="#f4dbaf"/>' +
      '<circle cx="63" cy="21" r="10" fill="#edafa0"/><circle cx="49" cy="23" r="6" fill="#f1d58f"/>';
    else if (kind === "parent") svg.innerHTML =
      '<rect x="18" y="17" width="62" height="67" rx="8" fill="#77aa8e"/>' +
      '<rect x="24" y="27" width="50" height="47" rx="5" fill="#fff4d7"/>' +
      '<path d="M34 41h29M34 51h29M34 61h21" stroke="#94b7a0" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M33 11v15M65 11v15" stroke="#4f8971" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M25 79h49" stroke="#dfae8b" stroke-width="6" stroke-linecap="round"/>';
    else svg.innerHTML =
      '<path d="M53 86C48 71 52 52 53 25" fill="none" stroke="#4b8e72" stroke-width="9" stroke-linecap="round"/>' +
      '<path d="M52 67Q12 71 19 35Q47 36 52 67Z" fill="#a0c59f"/>' +
      '<path d="M55 55Q89 61 83 29Q55 28 55 55Z" fill="#74ab90"/>' +
      '<circle cx="54" cy="20" r="12" fill="#f0c18b"/><circle cx="41" cy="13" r="10" fill="#f6ddae"/>' +
      '<circle cx="64" cy="9" r="10" fill="#edb5a5"/><circle cx="54" cy="20" r="5" fill="#f6e7b9"/>';
    icon.appendChild(svg);
    art.append(ring, icon, create("span", "bex-float-leaf"), create("span", "bex-float-leaf right"));
    return art;
  };
  function addText(parent, tag, className, text) {
    const el = create(tag, className, text);
    parent.appendChild(el);
    return el;
  }

  function buildJourneys() {
    const main = $("#main"), explore = $("#explore");
    if (!main || !explore || $("#bex-journeys")) return;
    const section = create("section", "bex-journeys");
    section.id = "bex-journeys";
    section.setAttribute("aria-labelledby", "bex-journeys-heading");
    for (const [pos, cls] of [["one", ""], ["two", ""], ["three", ""]]) {
      const spark = create("span", "bex-garden-spark " + pos);
      spark.setAttribute("aria-hidden", "true");
      section.appendChild(spark);
    }
    const shell = create("div", "bex-shell");
    const head = create("div", "bex-journey-head");
    addText(head, "span", "bex-kicker", "A place for every family");
    const heading = addText(head, "h2", "bex-h2", "What brings you here today?");
    heading.id = "bex-journeys-heading";
    addText(head, "p", "", "Find the right next step without searching through pages. Choose the path that fits you.");
    const grid = create("div", "bex-journey-grid");
    const steps = [
      {kind:"discover",title:"I'm exploring the school",desc:"See what is known, ask about enrolment and learn what's still being prepared.",href:PARENT+"#be-guest",action:"Explore enrolment enquiries"},
      {kind:"parent",title:"I'm a parent or caregiver",desc:"Keep notices, messages, community events and your own enquiries in one place.",href:PARENT+"#be-dashboard",action:"Open the parent network"},
      {kind:"help",title:"I'd love to help",desc:"Find approved projects and offer volunteering, fundraising or business sponsorship.",href:PARENT+"#be-fundraising",action:"Support our community"}
    ];
    steps.forEach(item => {
      const card = create("a", "bex-pathcard");
      card.href = item.href;
      card.appendChild(svgDecor(item.kind));
      addText(card, "strong", "", item.title);
      addText(card, "span", "bex-card-text", item.desc);
      const action = addText(card, "span", "bex-linkline", item.action);
      const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      arrow.setAttribute("viewBox", "0 0 24 24");
      arrow.setAttribute("aria-hidden", "true");
      arrow.innerHTML = '<path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      action.appendChild(arrow);
      grid.appendChild(card);
    });
    shell.append(head, grid);
    section.appendChild(shell);
    main.insertBefore(section, explore);
  }

  function motionSettings() {
    const match = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false;
    let saved = null;
    try { saved = localStorage.getItem(MOTION_KEY); } catch {}
    let paused = saved === "1" || (saved === null && match);
    const controls = document.querySelectorAll("[data-bex-motion]");
    const sync = () => {
      document.documentElement.classList.toggle("bex-motion-paused", paused);
      document.dispatchEvent(new Event("bex-motion-change"));
      controls.forEach(btn => {
        btn.setAttribute("aria-pressed", String(paused));
        btn.textContent = paused ? "Resume animations" : "Pause animations";
      });
    };
    controls.forEach(btn => btn.addEventListener("click", () => {
      paused = !paused;
      try { localStorage.setItem(MOTION_KEY, paused ? "1" : "0"); } catch {}
      sync();
    }));
    sync();
  }

  const generic = {
    guestclasses: {
      title: "Come and give a guest class",
      body: "Community presenters can browse open times on the shared school calendar, sign in and send a class idea. The school reviews all requests and safeguarding arrangements before a class is confirmed.",
      link: "./calendar.html",
      label: "See available class times"
    },
    enrolment: {
      title: "Enrolment information",
      body: "You can request enrolment information in the parent network. The school has not yet published confirmed acceptance criteria, availability, fees or registration dates. An enquiry is not an application or an offered place.",
      link: PARENT + "#be-enrolment-form",
      label: "Request enrolment information"
    },
    fees: {
      title: "School fees and payments",
      body: "Confirmed school fees and payment methods have not been published. This website does not accept school fee payments or donations. Please ask the school for verified details.",
      link: PARENT + "#be-message-form",
      label: "Contact the school securely"
    },
    hours: {
      title: "Opening hours and location",
      body: "The school's confirmed operating hours, address and contact channels are awaiting review. We won't guess or show unverified details.",
      link: PARENT + "#be-message-form",
      label: "Ask for official details"
    },
    contact: {
      title: "Contact Butterflies Educare",
      body: "Signed-in parents can send a private enquiry to the school. The principal must still approve official public contact information.",
      link: PARENT + "#be-message-form",
      label: "Open school messages"
    },
    account: {
      title: "Parent account access",
      body: "The parent network includes account creation, sign-in and password reset. Email confirmation may be required. Sign in before submitting requests.",
      link: PARENT,
      label: "Open the parent network"
    },
    volunteers: {
      title: "Help our school community",
      body: "Parents and community supporters can register interest in volunteering, fundraising or sponsorship. The school reviews each request before any arrangements are made.",
      link: PARENT + "#be-volunteer-form",
      label: "Offer your help"
    },
    privacy: {
      title: "Privacy and children's information",
      body: "This is a development preview. Please do not enter children's names, medical details, ID numbers or photographs. Only your own contact and general enquiry details should be submitted once the school's privacy arrangements are approved.",
      link: PARENT,
      label: "View the parent network"
    }
  };
  const matches = [
    [/teach|guest.class|present.*class|give.*class|offer.*class|class.slot|workshop|facilitat/i,"guestclasses"],
    [/admission|enrol|enroll|apply|application|registration|register|space|age group|place/i,"enrolment"],
    [/fees?|price|cost|payment|pay|donat|tuition|bank/i,"fees"],
    [/open|hours?|time|address|where|location|map|direction|drop.?off/i,"hours"],
    [/contact|call|whatsapp|email|phone|message|principal|reach/i,"contact"],
    [/sign.?in|log.?in|account|password|reset|join|sign.?up/i,"account"],
    [/volunteer|help|support|sponsor|partner|involv/i,"volunteers"],
    [/privacy|consent|secure|child data|information safety/i,"privacy"],
    [/calendar|event|rsvp|function|concert|outing|upcoming/i,"events"],
    [/fundrais|giving|campaign|project|contribut/i,"fundraising"],
    [/news|announc|notice|latest|update/i,"announcements"]
  ];
  function detectTopic(text) {
    const query = String(text || "").slice(0,180).trim();
    if (!query) return null;
    for (const [re,key] of matches) if (re.test(query)) return key;
    return "unknown";
  }
  function formatDate(iso) {
    const dt = new Date(iso);
    if (!Number.isFinite(dt.valueOf())) return "Date to be confirmed";
    return new Intl.DateTimeFormat("en-ZA", { dateStyle:"medium",timeStyle:"short",timeZone:"Africa/Johannesburg" }).format(dt);
  }
  async function getApprovedFeed() {
    if (!publicFeedPromise) {
      publicFeedPromise = (async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        try {
          const res = await fetch(FEED,{signal:controller.signal,headers:{Accept:"application/json"}});
          if (!res.ok) throw new Error("School feed temporarily unavailable");
          const data = await res.json();
          if (!data || !Array.isArray(data.events) || !Array.isArray(data.fundraisers) || !Array.isArray(data.announcements))
            throw new Error("School feed format could not be verified");
          return data;
        } finally { clearTimeout(timeout); }
      })().catch(err => { publicFeedPromise=null; throw err; });
    }
    return publicFeedPromise;
  }
  async function answerFor(topic) {
    if (generic[topic]) return generic[topic];
    if (["events","fundraising","announcements"].includes(topic)) {
      try {
        const data = await getApprovedFeed();
        const list = topic === "events" ? data.events : topic === "fundraising" ? data.fundraisers : data.announcements;
        if (!list.length) {
          return {
            title: topic === "events" ? "Upcoming school events" : topic === "fundraising" ? "Approved fundraising projects" : "School announcements",
            body: "Nothing has been published by the school in this category yet. Check the parent network for future verified updates.",
            link: topic === "events" ? "./calendar.html" : PARENT + (topic === "fundraising"?"#be-fundraising":"#be-news"),
            label:"Browse school updates"
          };
        }
        const first = list.slice(0,2).map(item => {
          const title = String(item.title||"School update").slice(0,100);
          return topic === "events" ? title + " (" + formatDate(item.starts_at) + ")" : title;
        }).join(" · ");
        return {
          title: topic === "events" ? "Confirmed school events" : topic === "fundraising" ? "Published school projects" : "Published school news",
          body: first + ". These items come from the school's published feed; see the parent network for full details.",
          link: topic === "events" ? "./calendar.html" : PARENT + (topic === "fundraising"?"#be-fundraising":"#be-news"),
          label:"See published details"
        };
      } catch {
        return {
          title:"School information is temporarily unavailable",
          body:"I couldn't verify the school's published feed right now. Rather than guess, please check the parent network later.",
          link:PARENT,
          label:"Open parent network"
        };
      }
    }
    return {
      title:"Let's find the right person to help",
      body:"I can guide you through published school information, enrolment enquiries, events, accounts and supporting the community. For a specific question not covered here, contact the school through your parent account.",
      link:PARENT + "#be-message-form",
      label:"Send a private enquiry"
    };
  }

  function renderAnswer(container, answer) {
    container.replaceChildren();
    addText(container,"strong","",answer.title);
    addText(container,"p","",answer.body);
    if (answer.link && answer.label) {
      const a=create("a","",answer.label);
      a.href=answer.link;
      container.appendChild(a);
    }
  }

  function buildGuide() {
    const anchor=PAGE === "home" ? $("#parents") : $(".be-welcome");
    if (!anchor || $("#bex-school-guide")) return;
    const section=create("section","bex-guide");
    section.id="bex-school-guide";
    section.setAttribute("aria-labelledby","bex-guide-heading");
    const shell=create("div","bex-shell");
    const panel=create("div","bex-guide-panel");
    const content=create("div","bex-guide-main");
    addText(content,"span","bex-kicker","Useful answers, without the guesswork");
    const h=addText(content,"h2","","Meet your school guide");
    h.id="bex-guide-heading";
    addText(content,"p","","Find the next step for enrolment, school events and community support. Answers use only verified, published information.");
    const form=create("form","bex-guide-form");
    form.id="bex-guide-form";
    form.setAttribute("role","search");
    const input=create("input");
    input.type="search";input.name="question";
    input.maxLength=180;
    input.placeholder="e.g. How do I enquire about enrolment?";
    input.setAttribute("aria-label","Ask about school services");
    input.setAttribute("autocomplete","off");
    const submit=create("button","", "Find answers");
    submit.type="submit";
    form.append(input,submit);
    content.appendChild(form);
    const chips=create("div","bex-guide-examples");
    const chipData=[["Enrolment","enrolment"],["School events","events"],["Offer a class","guestclasses"],["Fees","fees"],["Fundraising","fundraising"],["Contact","contact"]];
    const answer=create("div","bex-guide-answer");
    answer.setAttribute("role","status");
    answer.setAttribute("aria-live","polite");
    renderAnswer(answer, {
      title:"What would you like to know?",
      body:"Choose a topic above or enter a general school question. If the school hasn't approved an answer yet, we'll tell you.",
      link:PARENT,label:"Explore the parent network"
    });
    const perform=async(topic)=>{
      renderAnswer(answer, {title:"Checking published information",body:"Looking for a school-approved answer."});
      renderAnswer(answer, await answerFor(topic));
    };
    form.addEventListener("submit",e=>{e.preventDefault();perform(detectTopic(input.value));});
    chipData.forEach(([name,topic])=>{
      const button=create("button","bex-guide-chip",name);
      button.type="button";
      button.addEventListener("click",()=>{input.value=name;perform(topic);});
      chips.appendChild(button);
    });
    content.append(chips,answer);
    addText(content,"p","bex-guide-trust","Private by design: your typed question stays on this device. This is guided help, not a generative AI chatbot. Please don't enter personal or children's information.");
    const motionRow=create("div","bex-motion-row");
    const motionBtn=create("button","bex-motion-toggle","Pause animations");
    motionBtn.type="button";
    motionBtn.dataset.bexMotion="true";
    motionRow.append(motionBtn,create("span","", "Prefer a quieter experience?"));
    content.appendChild(motionRow);
    const art=create("div","bex-book-scene");
    art.setAttribute("aria-hidden","true");
    const book=create("div","bex-book");
    const bookFront=create("div","bex-book-front");
    const icon=document.createElementNS("http://www.w3.org/2000/svg","svg");
    icon.setAttribute("viewBox","0 0 100 130");
    icon.innerHTML='<path d="M50 100V38" fill="none" stroke="#e7ddaa" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M50 78Q16 68 21 39Q50 49 50 78Z" fill="#a4d0a8"/>' +
      '<path d="M50 67Q83 60 77 32Q53 42 50 67Z" fill="#cde1b4"/>' +
      '<circle cx="49" cy="28" r="12" fill="#f0c39a"/><circle cx="35" cy="18" r="10" fill="#f8dcad"/><circle cx="63" cy="15" r="9" fill="#e9a895"/><circle cx="49" cy="28" r="6" fill="#f9e6ae"/>' +
      '<path d="M29 108h43" stroke="#e9d79c" stroke-width="4" stroke-linecap="round"/>';
    bookFront.appendChild(icon);
    book.append(create("span","bex-book-back"),create("span","bex-book-pages"),bookFront);
    art.append(create("span","bex-book-plate"),create("span","bex-book-orbit"),book,create("span","bex-book-leaf"),create("span","bex-book-leaf two"));
    panel.append(content,art);
    shell.appendChild(panel);
    section.appendChild(shell);
    if(PAGE==="home")anchor.parentElement.insertBefore(section,anchor);
    else anchor.insertAdjacentElement("afterend",section);
    motionSettings();
  }

  const CHECKLIST = [
    "Read the latest school notices",
    "Confirm today's collection arrangements",
    "Check any items requested by the school",
    "Review upcoming events or reminders"
  ];
  function loadChecks(date) {
    try {
      const state=JSON.parse(localStorage.getItem(CHECKLIST_KEY)||"null");
      if (state && state.day === date && Array.isArray(state.done))
        return state.done.filter(x => Number.isInteger(x) && x>=0 && x<CHECKLIST.length);
    } catch {}
    return [];
  }
  function saveChecks(date,checked) {
    try {localStorage.setItem(CHECKLIST_KEY,JSON.stringify({day:date,done:checked}));} catch {}
  }
  function buildParentToolkit() {
    if(PAGE!=="parent")return;
    const dashboard=$("#be-dashboard");
    if(!dashboard||$("#bex-parent-toolkit"))return;
    const zone=create("div","bex-parent-zone");
    zone.id="bex-parent-toolkit";
    const checklist=create("section","bex-tool-card");
    addText(checklist,"span","bex-kicker","Your everyday routine");
    addText(checklist,"h3","","A calmer school morning");
    addText(checklist,"p","","An optional personal checklist—adapt it to your family's routine.");
    const list=create("ul","bex-list");
    const day=new Date().toLocaleDateString("en-CA",{timeZone:"Africa/Johannesburg"});
    const checked=loadChecks(day);
    CHECKLIST.forEach((label,index)=>{
      const li=create("li");
      const line=create("label","bex-checkline");
      const box=create("input");box.type="checkbox";box.checked=checked.includes(index);
      box.addEventListener("change",()=>{
        const value=Array.from(list.querySelectorAll("input")).flatMap((x,i)=>x.checked?[i]:[]);
        saveChecks(day,value);
      });
      line.append(box,create("span","",label));
      li.appendChild(line);list.appendChild(li);
    });
    checklist.appendChild(list);
    addText(checklist,"small","bex-check-note","Stored on this device only. This is a suggested routine, not official school requirements.");
    const links=create("section","bex-tool-card");
    addText(links,"span","bex-kicker","One tap to what matters");
    addText(links,"h3","","Your quick actions");
    addText(links,"p","","Your account, school updates and ways to help—without searching through menus.");
    const quick=create("div","bex-quick-links");
    [
      ["Enrolment information","#be-enrolment-form"],
      ["Private messages","#be-message-form"],
      ["Upcoming events","#be-events"],
      ["Volunteer or sponsor","#be-sponsor-form"]
    ].forEach(([label,href])=>{
      const a=create("a","",label);
      a.href=href;
      const arrow=create("span","", "↗");
      arrow.setAttribute("aria-hidden","true");
      a.appendChild(arrow);
      quick.appendChild(a);
    });
    links.appendChild(quick);
    zone.append(checklist,links);
    dashboard.insertBefore(zone,dashboard.querySelector(".be-grid")||dashboard.firstChild);
    const card=$(".be-welcome-card");
    if(card)card.classList.add("bex-parent-orbit");
  }

  function icsText(input) {
    return String(input||"").replace(/\\/g,"\\\\").replace(/\r?\n/g,"\\n").replace(/[;,]/g,"\\$&");
  }
  function icsDate(input) {
    const d=new Date(input);
    if (!Number.isFinite(d.valueOf())) return "";
    return d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
  }
  function downloadEvent(item) {
    const start=icsDate(item.starts_at);
    if(!start)return;
    const uid=String(item.id||"school-event").replace(/[^a-zA-Z0-9-]/g,"").slice(0,70);
    const lines=[
      "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Butterflies Educare//Public Events//EN",
      "CALSCALE:GREGORIAN","BEGIN:VEVENT",
      "UID:be-"+uid+"@butterflies-educare",
      "DTSTAMP:"+icsDate(new Date()),
      "DTSTART:"+start,
      "SUMMARY:"+icsText(item.title||"Butterflies Educare event"),
      "DESCRIPTION:"+icsText("Published school event. Please confirm any changes with the school."),
      "LOCATION:"+icsText(item.venue||"Venue to be confirmed"),
      "END:VEVENT","END:VCALENDAR"
    ];
    const blob=new Blob([lines.join("\r\n")+"\r\n"],{type:"text/calendar;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download="butterflies-event.ics";
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function addCalendarHelper() {
    if(PAGE!=="parent")return;
    const events=$("#be-events");
    const list=$("#be-events-list");
    if(!events||!list||$("#bex-event-save"))return;
    const box=create("aside","bex-event-save");
    box.id="bex-event-save";
    box.hidden=true;
    events.insertBefore(box,list);
    try{
      const data=await getApprovedFeed();
      const next=data.events.find(x=>x && x.starts_at && new Date(x.starts_at).valueOf()>=Date.now() && x.id && x.title);
      if(!next)return;
      addText(box,"span","bex-kicker","One less thing to remember");
      addText(box,"strong","",next.title);
      addText(box,"p","",formatDate(next.starts_at)+(next.venue?" · "+next.venue:""));
      const button=create("button","", "Save event to my calendar");
      button.type="button";
      button.addEventListener("click",()=>downloadEvent(next));
      box.appendChild(button);
      addText(box,"p","","Only published school events appear here. Check with the school for changes.");
      box.hidden=false;
    }catch{
      // Public feed may be offline. Do not invent or display unverified dates.
    }
  }

  function setup(){
    if(document.documentElement.dataset.bexExperience==="v2")return;
    document.documentElement.dataset.bexExperience="v2";
    if(PAGE==="home")buildJourneys();
    buildGuide();
    if(PAGE==="parent"){buildParentToolkit();addCalendarHelper();}
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();