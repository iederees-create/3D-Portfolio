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
  // Warm, drifting pollen glows: small CSS-only particles, no animation loop.
  // Avoid particle animations entirely for visitors requesting reduced motion.
  const reducedMotion = typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) {
    const smallScreen = typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 760px)").matches;
    const count = smallScreen ? 7 : 17;
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.className = "garden-pollen";
      particle.setAttribute("aria-hidden", "true");
      const left = 12 + ((i * 29 + 7) % 78);
      const top = 18 + ((i * 37 + 9) % 65);
      particle.style.setProperty("--pollen-left", left + "%");
      particle.style.setProperty("--pollen-top", top + "%");
      particle.style.setProperty("--pollen-size", (2 + (i % 4)) + "px");
      particle.style.setProperty("--pollen-duration", (10 + (i % 6) * 2) + "s");
      particle.style.setProperty("--pollen-delay", (-i * 1.9) + "s");
      particle.style.setProperty("--pollen-drift", (((i % 2) ? -1 : 1) * (8 + (i % 5) * 6)) + "px");
      garden.appendChild(particle);
    }
  }
  garden.dataset.visualVersion = "creative-butterflies-v2";
})();
