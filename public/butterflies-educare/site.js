(() => {
  "use strict";

  // Existing functionality
  document.getElementById("year").textContent = String(new Date().getFullYear());
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
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
  }

  // Supabase updates (unchanged)
  const url = "https://sijvvbozaufzpjirijhb.supabase.co/rest/v1/be_public_content?select=section,title,summary,publish_at&published=eq.true&order=publish_at.desc&limit=6";
  const key = "sb_publishable_dWWgbtZUAGVqIEvjMU5DFA_3Pi98GHU";
  const grid = document.getElementById("updates-grid");
  const types = {announcement:"School news",event:"School event",initiative:"Community initiative"};
  if (grid) {
    fetch(url,{headers:{"apikey":key,"Accept":"application/json"},signal:AbortSignal.timeout(6500)})
      .then(response => {if(!response.ok) throw new Error("Updates unavailable");return response.json();})
      .then(items => {
        if(!Array.isArray(items)||!items.length)return;
        grid.replaceChildren();
        for(const item of items){
          if(!item || typeof item.title!=="string" || typeof item.summary!=="string")continue;
          const card=document.createElement("article");card.className="update-card reveal";
          const type=document.createElement("span");type.className="type";type.textContent=types[item.section]||"School update";
          const title=document.createElement("h3");title.textContent=item.title;
          const body=document.createElement("p");body.textContent=item.summary;
          card.append(type,title,body);grid.appendChild(card);
        }
        // Re-observe new cards
        observeReveals();
      }).catch(() => {/* Keep accurate static preview wording if Supabase is offline. */});
  }

  // Enhance only when JavaScript runs; keep content visible without it.
  document.documentElement.classList.add("js-animations");

  // Scroll reveal animations
  function observeReveals() {
    const reveals = document.querySelectorAll(".reveal:not(.observed)");
    if (!reveals.length || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveals.forEach(el => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(el => {
      el.classList.add("observed");
      observer.observe(el);
    });
  }
  observeReveals();

  // 3D Butterfly Hero Scene
  const canvas = document.getElementById("hero-canvas");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 760 || /Mobi|Android/i.test(navigator.userAgent);

  if (canvas && typeof THREE !== "undefined" && !prefersReduced && !isMobile) {
    try { initButterflies(); } catch (err) { console.warn("3D scene unavailable; showing static illustration."); }
  }

  function initButterflies() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Soft ambient + directional light
    scene.add(new THREE.AmbientLight(0xfff5e6, 0.8));
    const dirLight = new THREE.DirectionalLight(0xfff8ee, 0.6);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const butterflies = [];
    const colors = [0xe7a37c, 0x83ad93, 0xf9d78e, 0xfae1dc, 0x608b77];

    function createButterfly(color) {
      const group = new THREE.Group();

      // Body
      const bodyGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
      const bodyMat = new THREE.MeshLambertMaterial({ color: 0x244b3d });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.rotation.x = Math.PI / 2;
      group.add(body);

      // Wings (two planes)
      const wingGeo = new THREE.PlaneGeometry(0.6, 0.4);
      const wingMat = new THREE.MeshLambertMaterial({
        color,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });

      const leftWing = new THREE.Mesh(wingGeo, wingMat);
      leftWing.position.set(-0.25, 0, 0);
      leftWing.rotation.y = Math.PI / 2;
      group.add(leftWing);

      const rightWing = new THREE.Mesh(wingGeo, wingMat.clone());
      rightWing.position.set(0.25, 0, 0);
      rightWing.rotation.y = -Math.PI / 2;
      group.add(rightWing);

      // Antennae
      const antGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.15, 4);
      const antMat = new THREE.MeshBasicMaterial({ color: 0x244b3d });
      const leftAnt = new THREE.Mesh(antGeo, antMat);
      leftAnt.position.set(-0.08, 0.22, 0);
      leftAnt.rotation.z = 0.4;
      group.add(leftAnt);
      const rightAnt = leftAnt.clone();
      rightAnt.position.set(0.08, 0.22, 0);
      rightAnt.rotation.z = -0.4;
      group.add(rightAnt);

      // Flight parameters
      group.userData = {
        speed: 0.3 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
        radiusX: 2.5 + Math.random() * 2,
        radiusY: 1.2 + Math.random() * 1,
        height: (Math.random() - 0.5) * 2,
        flapSpeed: 4 + Math.random() * 3,
        leftWing,
        rightWing
      };

      scene.add(group);
      return group;
    }

    const count = isMobile ? 3 : 6;
    for (let i = 0; i < count; i++) {
      butterflies.push(createButterfly(colors[i % colors.length]));
    }

    // Subtle mouse parallax
    let mouseX = 0, mouseY = 0;
    if (!isMobile) {
      window.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    let time = 0;
    let rafId = 0;
    let disposed = false;
    function animate() {
      rafId = 0;
      if (disposed || document.hidden) return;
      rafId = requestAnimationFrame(animate);
      time += 0.016;

      butterflies.forEach((bf, i) => {
        const d = bf.userData;
        // Natural flight path
        const t = time * d.speed + d.offset;
        bf.position.x = Math.sin(t) * d.radiusX;
        bf.position.y = Math.cos(t * 0.7) * d.radiusY + d.height;
        bf.position.z = Math.sin(t * 0.5) * 1.5;

        // Orient along path
        bf.lookAt(bf.position.x + Math.cos(t), bf.position.y, bf.position.z);

        // Wing flap
        const flap = Math.sin(time * d.flapSpeed) * 0.6;
        d.leftWing.rotation.y = Math.PI / 2 + flap;
        d.rightWing.rotation.y = -Math.PI / 2 - flap;
      });

      // Gentle camera drift with mouse
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    function onResize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    }
    window.addEventListener("resize", onResize);
    onResize();

    // Pause rendering when tab is hidden; release WebGL resources when navigating away.
    document.addEventListener("visibilitychange", () => {
      if (!disposed && !document.hidden && !rafId) animate();
    });
    window.addEventListener("pagehide", () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => m.dispose());
        }
      });
      renderer.dispose();
    }, { once: true });
  }

  // Gentle entrance for hero text
  const heroContent = document.querySelector(".hero-grid > div:first-child");
  if (heroContent && !prefersReduced) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(20px)";
    heroContent.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    setTimeout(() => {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "none";
    }, 300);
  }

  // Butterfly garden is rendered in accessible, dependency-free CSS, even when WebGL is unavailable.
})();
