/* Butterflies Educare WhatsApp website support. Opt-in form; never collect session tokens or child records. */
(() => {
"use strict";
if (document.getElementById("be-whatsapp-support")) return;
const number = "27762851980";
const root = document.createElement("div");
root.id = "be-whatsapp-support";
root.innerHTML = "<button type=\"button\" id=\"be-wa-trigger\" class=\"be-wa-trigger\" aria-haspopup=\"dialog\" aria-controls=\"be-wa-dialog\" aria-label=\"Open Butterflies Educare WhatsApp support\">\n<span class=\"be-wa-icon\" aria-hidden=\"true\"><svg viewBox=\"0 0 32 32\" fill=\"currentColor\" width=\"29\" height=\"29\" focusable=\"false\"><path d=\"M16 3C8.83 3 3 8.81 3 15.96c0 2.29.6 4.53 1.74 6.5L3 29l6.72-1.76a13 13 0 0 0 6.27 1.6H16c7.17 0 13-5.82 13-12.97C29 8.81 23.17 3 16 3zm0 23.56a10.57 10.57 0 0 1-5.41-1.48l-.39-.23-3.98 1.04 1.06-3.88-.25-.4a10.5 10.5 0 0 1-1.62-5.65c0-5.84 4.76-10.59 10.59-10.59 5.85 0 10.61 4.75 10.61 10.59 0 5.84-4.76 10.61-10.61zm5.82-7.94c-.31-.16-1.83-.9-2.11-1.01-.28-.1-.49-.16-.69.16-.21.31-.8 1.01-.98 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.55-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.69-1.66-.95-2.28-.25-.6-.51-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.28.31-1.08 1.05-1.08 2.56 0 1.51 1.11 2.96 1.26 3.17.16.21 2.19 3.34 5.3 4.68.74.32 1.32.51 1.77.65.75.24 1.43.2 1.97.12.6-.09 1.83-.75 2.09-1.47.26-.73.26-1.35.18-1.47-.08-.13-.28-.21-.6-.37z\"/></svg></span>\n<span class=\"be-wa-trigger-copy\"><strong>WhatsApp Support</strong><small>Questions or website help</small></span></button>\n<dialog id=\"be-wa-dialog\" class=\"be-wa-dialog\" aria-labelledby=\"be-wa-heading\" aria-describedby=\"be-wa-description\"><div class=\"be-wa-dialog-inner\">\n<div class=\"be-wa-header\"><div class=\"be-wa-heading-icon\" aria-hidden=\"true\">?</div><div><span class=\"be-wa-eyebrow\">Butterflies Educare</span><h2 id=\"be-wa-heading\">How can we help?</h2></div><button type=\"button\" id=\"be-wa-close\" class=\"be-wa-close\" aria-label=\"Close WhatsApp support form\">×</button></div>\n<p id=\"be-wa-description\" class=\"be-wa-intro\">For website, account and registration help, send a WhatsApp message to our technical support contact.</p>\n<form id=\"be-wa-form\" class=\"be-wa-form\">\n<label for=\"be-wa-topic\">What do you need help with?</label>\n<select id=\"be-wa-topic\" name=\"topic\" required>\n<option value=\"Website or technical issue\">Website or technical issue</option><option value=\"Creating an account or signing in\">Creating an account or signing in</option><option value=\"Confirming my email address\">Confirming my email address</option><option value=\"2027 school application\">2027 school application</option><option value=\"Calendar or class enquiry\">Calendar or class enquiry</option><option value=\"Other website question\">Other website question</option></select>\n<label for=\"be-wa-name\">Your name <span class=\"be-wa-optional\">(optional)</span></label><input id=\"be-wa-name\" name=\"name\" maxlength=\"100\" autocomplete=\"name\" placeholder=\"How should we address you?\">\n<label for=\"be-wa-email\">Your email <span class=\"be-wa-optional\">(optional)</span></label><input id=\"be-wa-email\" name=\"email\" type=\"email\" maxlength=\"150\" autocomplete=\"email\" placeholder=\"Only if you'd like to share it\">\n<label for=\"be-wa-question\">Your question or issue <span class=\"be-wa-required\">*</span></label><textarea id=\"be-wa-question\" name=\"question\" rows=\"4\" minlength=\"5\" maxlength=\"1200\" required placeholder=\"Tell us what happened or what you need help with.\"></textarea>\n<p class=\"be-wa-privacy\">Your message will open in WhatsApp for you to review and send. It includes this page and basic device details. Please do not share passwords, ID numbers or children's medical information.</p>\n<button type=\"submit\" class=\"be-wa-send\">Continue to WhatsApp</button>\n<a id=\"be-wa-fallback\" class=\"be-wa-fallback\" href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\" hidden>WhatsApp didn't open? Tap here</a>\n</form></div></dialog>";
function pageURL() { const url = new URL(window.location.href); return url.origin + url.pathname; }
function browserName() {
 const ua = navigator.userAgent || "";
 if (/Edg\//.test(ua)) return "Edge";
 if (/Firefox\//.test(ua)) return "Firefox";
 if (/Chrome\//.test(ua)) return "Chrome";
 if (/Safari\//.test(ua)) return "Safari";
 return "Other";
}
function deviceName() {
 const ua = navigator.userAgent || "";
 if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return "Tablet";
 if (/Mobi|iPhone|Android/i.test(ua)) return "Mobile";
 return "Desktop / laptop";
}
function buildMessage(form) {
 const data = new FormData(form);
 const question = String(data.get("question") || "").trim();
 const lines = [
   "Hi, I need support with the Butterflies Educare website.",
   "",
   "Enquiry: " + String(data.get("topic") || "Website support"),
   "My question: " + question,
   "",
   "Support details:",
   "Name: " + (String(data.get("name") || "").trim() || "Not provided"),
   "Email: " + (String(data.get("email") || "").trim() || "Not provided"),
   "Page: " + pageURL(),
   "Device: " + deviceName(),
   "Browser: " + browserName(),
   "Time: " + new Date().toLocaleString("en-ZA",{timeZone:"Africa/Johannesburg",dateStyle:"medium",timeStyle:"short"}) + " SAST"
 ];
 return lines.join("\n");
}
document.body.appendChild(root);
const trigger = document.getElementById("be-wa-trigger");
const dialog = document.getElementById("be-wa-dialog");
const form = document.getElementById("be-wa-form");
const fallback = document.getElementById("be-wa-fallback");
trigger.addEventListener("click", () => {
 if (dialog.open) return;
 fallback.hidden = true;
 dialog.showModal();
 document.getElementById("be-wa-question").focus();
});
document.getElementById("be-wa-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener("close",()=>trigger.focus());
const questionEl=form.elements.namedItem("question");
questionEl.addEventListener("input",()=>questionEl.setCustomValidity(""));
form.addEventListener("submit",event=>{
 event.preventDefault();
 if (!form.reportValidity()) return;
 if (questionEl.value.trim().length < 5) {
   questionEl.setCustomValidity("Please describe your question in a few words.");
   form.reportValidity();
   return;
 }
 const url="https://wa.me/"+number+"?text="+encodeURIComponent(buildMessage(form));
 fallback.href=url;
 fallback.hidden=false;
 window.open(url,"_blank","noopener,noreferrer");
});
})();