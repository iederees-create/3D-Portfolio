/* Optional visual embellishments: safe to edit independently of homepage HTML. */
(() => {
  "use strict";
  const garden = document.querySelector(".butterfly-garden");
  if (!garden || garden.dataset.atmosphereReady === "true") return;
  const original = garden.querySelector(".bf-1");
  if (!original) return;
  garden.dataset.atmosphereReady = "true";
  // Five additional butterfly variants, built from the existing accessible
  // decorative component. No external assets, network calls or emojis.
  for (let i = 4; i <= 8; i += 1) {
    const butterfly = original.cloneNode(true);
    butterfly.className = "bf bf-" + i;
    garden.appendChild(butterfly);
  }
  for (const variation of ["one", "two"]) {
    const cloud = document.createElement("span");
    cloud.className = "garden-cloud " + variation;
    cloud.setAttribute("aria-hidden", "true");
    garden.insertBefore(cloud, garden.firstChild);
  }
})();
