/* Butterflies Educare: public school-approved information.
   All fields are text-only, RLS published-only. Never display draft facts. */
(() => {
  "use strict";
  const BASE = "https://sijvvbozaufzpjirijhb.supabase.co/rest/v1/be_school_information";
  const KEY = "sb_publishable_dWWgbtZUAGVqIEvjMU5DFA_3Pi98GHU";
  const $ = (selector, root = document) => root.querySelector(selector);
  function node(tag, className, value) {
    const e=document.createElement(tag);
    if(className)e.className=className;
    if(value!==undefined && value!==null)e.textContent=String(value);
    return e;
  }
  function item(parent, label, content, href) {
    if(!content)return;
    const wrapper=node("div","be-facts-item");
    wrapper.appendChild(node("strong","",label));
    let output;
    if(href) {
      output=node("a","",content);
      output.href=href;
      output.rel="nofollow";
    } else output=node("p","",content);
    wrapper.appendChild(output);
    parent.appendChild(wrapper);
  }
  async function render() {
    const anchor=document.body.dataset.bePage==="portal" ? $("#be-news") : $("#news");
    if(!anchor) return;
    const controller=new AbortController();
    const t=setTimeout(()=>controller.abort(),5500);
    let data;
    try{
      const url=BASE+"?select=id,school_name,summary,street_address,public_email,public_phone,operating_hours,enrolment_guidance,fee_guidance&published=eq.true&id=eq.school&limit=1";
      const response=await fetch(url,{signal:controller.signal,headers:{"apikey":KEY,"Accept":"application/json"}});
      if(!response.ok)return;
      const json=await response.json();
      if(!Array.isArray(json)||!json[0])return;
      data=json[0];
    }catch{return;}finally{clearTimeout(t);}
    const section=node("section","be-facts-section");
    section.id="school-information";
    section.setAttribute("aria-labelledby","school-information-title");
    const shell=node("div",document.body.dataset.bePage==="portal"?"be-facts-shell be-facts-portal":"be-facts-shell");
    shell.appendChild(node("span","be-facts-kicker","Verified school information"));
    const heading=node("h2","",data.school_name||"School information");
    heading.id="school-information-title";
    shell.appendChild(heading);
    if(data.summary)shell.appendChild(node("p","be-facts-summary",data.summary));
    const grid=node("div","be-facts-grid");
    const verifiedEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.public_email||"") ? data.public_email : null;
    const verifiedPhone=/^[+()\d\s-]{7,35}$/.test(data.public_phone||"") ? data.public_phone : null;
    item(grid,"School address",data.street_address);
    item(grid,"Contact email",verifiedEmail,verifiedEmail?"mailto:"+verifiedEmail:undefined);
    item(grid,"Contact number",verifiedPhone,verifiedPhone?"tel:"+verifiedPhone.replace(/[^\d+]/g,""):undefined);
    item(grid,"Operating hours",data.operating_hours);
    item(grid,"Enrolment enquiries",data.enrolment_guidance);
    item(grid,"Fees and payment information",data.fee_guidance);
    if(grid.children.length)shell.appendChild(grid);
    shell.appendChild(node("p","be-facts-disclaimer","Details published by authorised school staff. Please confirm changes directly with the school."));
    section.appendChild(shell);
    anchor.insertAdjacentElement("beforebegin",section);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render,{once:true});
  else render();
})();