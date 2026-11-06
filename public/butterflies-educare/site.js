  (() => {
    "use strict";
    document.getElementById("year").textContent = String(new Date().getFullYear());
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("site-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }));
    // Public read-only Supabase data. No secret keys, payment APIs, or private child data.
    const url = "https://sijvvbozaufzpjirijhb.supabase.co/rest/v1/be_public_content?select=section,title,summary,publish_at&published=eq.true&order=publish_at.desc&limit=6";
    const key = "sb_publishable_dWWgbtZUAGVqIEvjMU5DFA_3Pi98GHU";
    const grid = document.getElementById("updates-grid");
    const types = {announcement:"School news",event:"School event",initiative:"Community initiative"};
    fetch(url,{headers:{"apikey":key,"Accept":"application/json"},signal:AbortSignal.timeout(6500)})
      .then(response => {if(!response.ok) throw new Error("Updates unavailable");return response.json();})
      .then(items => {
        if(!Array.isArray(items)||!items.length)return;
        grid.replaceChildren();
        for(const item of items){
          if(!item || typeof item.title!=="string" || typeof item.summary!=="string")continue;
          const card=document.createElement("article");card.className="update-card";
          const type=document.createElement("span");type.className="type";type.textContent=types[item.section]||"School update";
          const title=document.createElement("h3");title.textContent=item.title;
          const body=document.createElement("p");body.textContent=item.summary;
          card.append(type,title,body);grid.appendChild(card);
        }
      }).catch(() => {/* Keep accurate static preview wording if Supabase is offline. */});
  })();
