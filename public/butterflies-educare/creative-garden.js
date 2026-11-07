/* Butterflies Educare visual module • creative-vision-20261107.
 * Grok's concepts implemented without overwriting the homepage.
 * No auth, payments, personal data or external assets used. */
(() => {
  "use strict";
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const small = window.matchMedia?.("(max-width: 760px)").matches ?? false;
  const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;
  const svgNS = "http://www.w3.org/2000/svg";
  function el(tag, css, text) {
    const item = document.createElement(tag);
    if (css) item.className = css;
    if (text != null) item.textContent = String(text);
    return item;
  }
  function enhanceHero() {
    const scene = document.querySelector(".hero-illustration");
    if (!scene || scene.querySelector(".creative-light")) return;
    scene.insertBefore(el("span","creative-ground-shadow"),scene.firstChild);
    scene.appendChild(el("span","creative-light"));
    const garden=scene.querySelector(".butterfly-garden");
    const original=garden?.querySelector(".bf-1");
    if (!garden || !original || reduced || small) return;
    let visible=true, active=null;
    if ("IntersectionObserver" in window) {
      const observer=new IntersectionObserver(([entry]) => {visible=Boolean(entry?.isIntersecting);},{threshold:.06});
      observer.observe(scene);
      window.addEventListener("pagehide",()=>observer.disconnect(),{once:true});
    }
    const spawn=()=>{
      if (document.hidden || !visible || active || !garden.isConnected) return;
      const clone=original.cloneNode(true);
      clone.className="bf creative-flyby";
      clone.setAttribute("aria-hidden","true");
      garden.appendChild(clone);
      active=clone;
      clone.addEventListener("animationend",()=>{clone.remove();if(active===clone)active=null;},{once:true});
    };
    const initial=window.setTimeout(spawn,6000);
    const repeat=window.setInterval(spawn,26000);
    window.addEventListener("pagehide",()=>{
      window.clearTimeout(initial);window.clearInterval(repeat);active?.remove();
    },{once:true});
  }
  function addPlant(){
    const note=document.querySelector("#about .side-note");
    if(!note||note.querySelector(".creative-growth-plant"))return;
    const plant=document.createElementNS(svgNS,"svg");
    plant.setAttribute("viewBox","0 0 240 290");
    plant.setAttribute("class","creative-growth-plant");
    plant.setAttribute("aria-hidden","true");
    plant.innerHTML=
      '<path d="M124 281C120 218 125 168 120 91" fill="none" stroke="#448868" stroke-width="8" stroke-linecap="round" class="creative-stem"/>'+
      '<path d="M121 235Q74 205 48 157M121 199Q157 164 182 136M120 157Q86 132 65 97" fill="none" stroke="#609c73" stroke-width="5" stroke-linecap="round" class="creative-stem"/>'+
      '<path d="M49 159Q9 131 28 104Q73 109 49 159ZM182 140Q220 117 205 92Q172 100 182 140ZM67 100Q28 68 51 45Q87 60 67 100ZM117 133Q158 96 145 71Q106 90 117 133Z" fill="#82b48c" class="creative-leaf"/>'+
      '<path d="M111 90Q86 49 114 28Q140 50 128 91Z" fill="#a6c89d" class="creative-leaf"/>'+
      '<g class="creative-flower"><circle cx="120" cy="62" r="18" fill="#efbf8e"/><circle cx="120" cy="36" r="15" fill="#f5dfad"/><circle cx="144" cy="52" r="14" fill="#f8d6ac"/><circle cx="138" cy="78" r="14" fill="#eaa7a2"/><circle cx="102" cy="79" r="14" fill="#f5dfad"/><circle cx="96" cy="51" r="14" fill="#f3b8a8"/><circle cx="120" cy="62" r="12" fill="#f3d47e"/></g>'+
      '<path d="M77 286Q120 269 166 286" fill="none" stroke="#79aa79" stroke-width="6"/>';
    note.insertBefore(plant,note.firstChild);
    if(reduced || !("IntersectionObserver" in window)){plant.classList.add("creative-grown");return;}
    const observer=new IntersectionObserver(([entry])=>{
      if(entry?.isIntersecting){plant.classList.add("creative-grown");observer.disconnect();}
    },{threshold:.2});
    observer.observe(note);
  }
  function tiltCards(){
    if(reduced||!fine)return;
    document.querySelectorAll("#explore .panel, #parents .step").forEach(card=>{
      card.addEventListener("pointermove",event=>{
        if(card.classList.contains("reveal") && !card.classList.contains("visible"))return;
        const rect=card.getBoundingClientRect();
        if(!rect.width||!rect.height)return;
        const x=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
        const y=Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
        card.style.setProperty("--garden-pointer-x",(100*x).toFixed(1)+"%");
        card.style.setProperty("--garden-pointer-y",(100*y).toFixed(1)+"%");
        card.style.setProperty("--garden-tilt-y",((x-.5)*6).toFixed(2)+"deg");
        card.style.setProperty("--garden-tilt-x",((.5-y)*5).toFixed(2)+"deg");
        card.classList.add("creative-tilt");
      },{passive:true});
      card.addEventListener("pointerleave",()=>{
        card.classList.remove("creative-tilt");
        card.style.removeProperty("--garden-tilt-x");
        card.style.removeProperty("--garden-tilt-y");
      });
    });
  }
  function givingGarden(){
    const container=document.querySelector("#community .support-cards");
    if(!container||container.querySelector(".creative-giving-garden"))return;
    const panel=el("div","creative-giving-garden");
    const label=el("span","creative-giving-label","The Giving Garden");
    const art=document.createElementNS(svgNS,"svg");
    art.setAttribute("viewBox","0 0 340 155");
    art.setAttribute("role","img");
    art.setAttribute("aria-label","Illustrated garden tree with blossoms");
    art.innerHTML=
      '<path d="M35 138Q165 122 307 141" stroke="#9ec9a6" stroke-width="7" fill="none" stroke-linecap="round"/>'+
      '<path d="M169 134Q162 88 170 36M169 86Q135 60 116 38M169 96Q198 61 223 44M166 114Q127 108 96 86M174 111Q207 106 248 81" fill="none" stroke="#c5a47e" stroke-width="10" stroke-linecap="round"/>'+
      '<path d="M168 78Q129 61 135 45Q168 46 168 78ZM177 87Q214 65 215 48Q186 48 177 87ZM146 114Q102 100 113 83Q143 87 146 114ZM188 110Q232 87 235 76Q198 77 188 110Z" fill="#a7d1a8"/>'+
      '<g class="creative-blossom" fill="#f4c6b0"><circle cx="115" cy="34" r="10"/><circle cx="103" cy="24" r="8"/><circle cx="124" cy="20" r="8"/><circle cx="112" cy="12" r="7"/></g>'+
      '<g class="creative-blossom" fill="#f8dda6"><circle cx="224" cy="38" r="10"/><circle cx="211" cy="28" r="8"/><circle cx="233" cy="25" r="8"/><circle cx="223" cy="13" r="7"/></g>'+
      '<g class="creative-blossom" fill="#f1b5ae"><circle cx="91" cy="85" r="9"/><circle cx="79" cy="77" r="7"/><circle cx="100" cy="72" r="7"/></g>'+
      '<g class="creative-blossom" fill="#f8dda6"><circle cx="247" cy="78" r="9"/><circle cx="237" cy="69" r="7"/><circle cx="257" cy="65" r="7"/></g>'+
      '<g class="creative-blossom" fill="#f4c6b0"><circle cx="173" cy="28" r="9"/><circle cx="162" cy="19" r="7"/><circle cx="182" cy="15" r="7"/></g>';
    const caption=el("p",null,"Interactive concept only · no donations or progress are recorded here.");
    const button=el("button","creative-bloom-btn","Watch the garden bloom");
    button.type="button";
    button.setAttribute("aria-label","Preview the Giving Garden blossoming");
    button.addEventListener("click",()=>{
      const blooming=panel.classList.toggle("creative-bloom");
      button.textContent=blooming?"Start again":"Watch the garden bloom";
    });
    panel.append(label,art,caption,button);
    container.insertBefore(panel,container.firstChild);
    if(reduced)panel.classList.add("creative-bloom");
  }
  function boot(){
    if(document.documentElement.dataset.creativeGardenLoaded==="true")return;
    document.documentElement.dataset.creativeGardenLoaded="true";
    enhanceHero();addPlant();tiltCards();givingGarden();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();