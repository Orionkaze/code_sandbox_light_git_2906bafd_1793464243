/* ==========================================================================
   Gurwinder Singh — Portfolio runtime
   Renders all content from window.SITE (js/config.js) and adds motion.
   Content is always readable even if effects fail.
   ========================================================================== */
(function () {
  "use strict";
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), S);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const mailto = "mailto:" + S.artist.email + "?subject=" + encodeURIComponent("Project enquiry — Portfolio");

  const ICON = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    ext: '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>'
  };

  /* ---------- Simple bindings ---------- */
  $$("[data-bind]").forEach((el) => { const v = get(el.dataset.bind); if (v != null) el.textContent = v; });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Navigation ---------- */
  $("#navLinks").innerHTML = S.nav.map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join("");

  /* ---------- Hero ---------- */
  const H = S.hero;
  $("#heroKicker").innerHTML = H.kicker.map(esc).join('<span class="sep" aria-hidden="true"></span>');
  const nameParts = S.artist.name.split(" ");
  $("#heroName").innerHTML = nameParts.map((word) =>
    `<span class="line" aria-hidden="true">${[...word].map((c, i) => `<span class="ch" style="transition-delay:${0.35 + i * 0.045}s">${esc(c)}</span>`).join("")}</span>`
  ).join("");
  $("#heroHeadline").textContent = H.headline;
  $("#heroDesc").textContent = H.description;
  const c1 = $("#heroCta1"), c2 = $("#heroCta2");
  c1.href = H.primaryCta.href; $("span", c1).textContent = H.primaryCta.label;
  c2.href = H.secondaryCta.href; $("span", c2).textContent = H.secondaryCta.label;
  [["#heroKicker", 0.2], ["#heroHeadline", 1.0], ["#heroDesc", 1.2], [".hero__ctas", 1.4], [".hero__meta", 1.6]].forEach(([s, d]) => {
    const el = $(s); el.classList.add("intro-fade"); el.style.transitionDelay = d + "s";
  });

  /* ---------- About ---------- */
  const aboutVisuals = [
    // wireframe cube — 3D
    '<svg class="about__visual" viewBox="0 0 100 100" aria-hidden="true"><g class="spin"><path d="M50 12 84 31v38L50 88 16 69V31Z" stroke-width="1.2"/><path d="M16 31l34 19 34-19M50 50v38" stroke-width="1.2"/></g><circle class="pulse" cx="50" cy="50" r="3" fill="#8EBBFF" stroke="none"/></svg>',
    // timeline frames — video
    '<svg class="about__visual" viewBox="0 0 100 100" aria-hidden="true"><rect x="12" y="26" width="76" height="48" rx="2" stroke-width="1.2"/><path d="M12 38h76M12 62h76" stroke-width="1"/><path d="M24 26v12M36 26v12M48 26v12M60 26v12M72 26v12M24 62v12M36 62v12M48 62v12M60 62v12M72 62v12" stroke-width="1"/><path class="pulse" d="M44 44v12l10-6z" fill="#8EBBFF" stroke="none"/></svg>'
  ];
  $("#aboutGrid").innerHTML = S.about.blocks.map((b, i) => `
    <article class="about__block reveal" style="--d:${i * 0.15}s">
      <div class="about__top"><span class="about__index">${esc(b.index)} /</span>${aboutVisuals[i % 2]}</div>
      <h3>${esc(b.heading)}</h3>
      ${b.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
      ${b.tags && b.tags.length ? `<ul class="tags" aria-label="Focus areas">${b.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
    </article>`).join("");

  /* ---------- Software ---------- */
  $("#softGrid").innerHTML = S.software.items.map((s, i) => `
    <article class="soft reveal" style="--accent:${esc(s.color)};--d:${i * 0.08}s">
      <span class="soft__glow" aria-hidden="true"></span>
      <span class="soft__num" aria-hidden="true">0${i + 1}</span>
      <div class="soft__icon">
        <img src="${esc(s.icon)}" alt="${esc(s.name)} logo" width="56" height="56" loading="lazy" class="${s.invertIcon ? "invert" : ""}" data-abbr="${esc(s.abbr)}">
      </div>
      <h3 class="soft__name">${esc(s.name)}</h3>
      <p class="soft__desc">${esc(s.description)}</p>
      <div class="soft__bar" aria-hidden="true"></div>
    </article>`).join("");
  $$(".soft__icon img").forEach((img) => img.addEventListener("error", () => {
    img.outerHTML = `<span class="abbr" aria-hidden="true">${esc(img.dataset.abbr)}</span>`;
  }));
  $$(".soft").forEach((card) => card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  }));

  /* ---------- Video players ---------- */
  function videoPlayer(id) {
    const v = S.videos[id];
    if (!v) return "";
    const corners = '<span class="vcard__corner tl" aria-hidden="true"></span><span class="vcard__corner br" aria-hidden="true"></span>';
    if (v.type === "youtube") {
      return `<div class="vcard__frame" data-yt="${esc(v.id)}" data-title="${esc(v.title)}">${corners}
        <button class="vposter" style="background-image:url('https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg')" aria-label="Play ${esc(v.title)} (YouTube)">
          <span class="vposter__btn"><b>${ICON.play}</b>Play</span>
        </button>
        <div class="vstate"><div class="spinner" role="status" aria-label="Loading video"></div></div>
      </div>`;
    }
    const abstract = v.poster ? "" : `<svg class="vposter__abstract" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="pg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d232d"/><stop offset="1" stop-color="#08090C"/></linearGradient></defs><rect width="160" height="90" fill="url(#pg${id})"/><path d="M0 70 30 58 45 66 62 44 80 60 98 44 115 66 130 58 160 70V90H0Z" fill="#14171D"/><path d="M80 28 66 38h6l8-5 8 5h6Z" stroke="#8EBBFF" stroke-width=".5" opacity=".7"/></svg>`;
    return `<div class="vcard__frame" data-video="${esc(id)}">${corners}
      <video controls playsinline webkit-playsinline preload="none" ${v.poster ? `poster="${esc(v.poster)}"` : ""} aria-label="${esc(v.title)}">
        <source src="${esc(v.src)}" type="video/mp4">
        Your browser does not support HTML5 video.
      </video>
      <button class="vposter" ${v.poster ? `style="background-image:url('${esc(v.poster)}')"` : ""} aria-label="Play ${esc(v.title)}">${abstract}
        <span class="vposter__btn"><b>${ICON.play}</b>Play${v.duration ? " · " + esc(v.duration) : ""}</span>
      </button>
      <div class="vstate"><div class="spinner" role="status" aria-label="Loading video"></div></div>
    </div>`;
  }

  function initPlayers(root) {
    $$(".vcard__frame[data-video]", root).forEach((f) => {
      if (f.dataset.ready) return; f.dataset.ready = 1;
      const video = $("video", f), poster = $(".vposter", f), state = $(".vstate", f);
      const v = S.videos[f.dataset.video];
      const showError = () => {
        state.className = "vstate is-on is-error";
        state.innerHTML = `<div><p>This video could not be played here.</p><a class="textlink" href="${esc(v.src)}" target="_blank" rel="noopener">Open video file ${ICON.ext}</a></div>`;
        poster.classList.add("is-hidden");
      };
      poster.addEventListener("click", () => {
        poster.classList.add("is-hidden");
        state.classList.add("is-on");
        video.muted = false;
        const p = video.play();
        if (p && p.catch) p.catch((err) => { if (err && err.name !== "AbortError" && err.name !== "NotAllowedError") showError(); state.classList.remove("is-on"); });
      });
      video.addEventListener("waiting", () => state.classList.add("is-on"));
      ["playing", "canplay", "pause"].forEach((ev) => video.addEventListener(ev, () => { if (!state.classList.contains("is-error")) state.classList.remove("is-on"); }));
      video.addEventListener("play", () => {
        poster.classList.add("is-hidden");
        $$("video").forEach((o) => { if (o !== video) o.pause(); });
      });
      video.addEventListener("error", showError);
      $("source", video).addEventListener("error", showError);
    });
    $$(".vcard__frame[data-yt]", root).forEach((f) => {
      if (f.dataset.ready) return; f.dataset.ready = 1;
      const poster = $(".vposter", f), state = $(".vstate", f);
      poster.addEventListener("click", () => {
        $$("video").forEach((o) => o.pause());
        state.classList.add("is-on");
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${f.dataset.yt}?autoplay=1&rel=0&modestbranding=1`;
        iframe.title = f.dataset.title + " — YouTube video player";
        iframe.loading = "lazy";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.addEventListener("load", () => state.classList.remove("is-on"));
        f.appendChild(iframe);
        poster.classList.add("is-hidden");
        setTimeout(() => state.classList.remove("is-on"), 4000);
      });
    });
  }

  function videoCard(id, extraClass) {
    const v = S.videos[id];
    if (!v) return "";
    const links = v.type === "youtube"
      ? `<div class="vcard__links"><a class="textlink" href="${esc(v.url)}" target="_blank" rel="noopener">Watch on YouTube ${ICON.ext}</a></div>` : "";
    return `<article class="vcard reveal ${extraClass || ""}">
      ${videoPlayer(id)}
      <div class="vcard__meta"><span class="vcard__label">${esc(v.label)}</span>${v.duration ? `<span class="vcard__dur">${esc(v.duration)}</span>` : ""}</div>
      ${v.title && v.title !== v.label ? `<h3 class="vcard__title">${esc(v.title)}</h3>` : `<h3 class="vcard__title">${esc(v.title)}</h3>`}
      ${v.description ? `<p class="vcard__desc">${esc(v.description)}</p>` : ""}
      ${links}
    </article>`;
  }

  $("#reelGrid").innerHTML = S.showcase.videos.map((id, i) => videoCard(id).replace("reveal", `reveal" style="--d:${i * 0.12}s`)).join("");
  initPlayers($("#reelGrid"));

  /* ---------- Work grid ---------- */
  const placeholderSvg = '<svg viewBox="0 0 120 60" aria-hidden="true"><path d="M60 14 34 32h10l16-10 16 10h10Z" stroke-width="1"/><path d="M10 50h100" stroke-width="1"/></svg>';
  $("#workGrid").innerHTML = S.projects.map((p, i) => {
    const sw = p.details && p.details["Software Used"];
    const isProject = !!(p.images && p.images.length);
    return `<button class="card ${p.featured ? "card--featured" : ""} reveal" style="--d:${(i % 2) * 0.1}s" data-slug="${esc(p.slug)}" data-kind="${isProject ? "project" : "video"}" aria-label="${isProject ? "View project" : "Watch"}: ${esc(p.title)}">
      <div class="card__media" data-parallax>
        ${p.cover ? `<img src="${esc(p.cover)}" alt="${esc(isProject ? p.images[0].alt : p.title + " thumbnail")}" ${p.featured ? 'fetchpriority="high"' : 'loading="lazy"'}>` : `<div class="card__placeholder">${placeholderSvg}</div>`}
        ${p.featured ? '<span class="card__badge">Featured Project</span>' : ""}
        ${!isProject ? `<span class="card__play"><b>${ICON.play}</b>Watch</span>` : ""}
      </div>
      <div class="card__body">
        <div>
          <p class="card__cat">${p.category.map(esc).join(" · ")}</p>
          <h3 class="card__title">${esc(p.title)}</h3>
          ${p.summary ? `<p class="card__summary">${esc(p.summary)}</p>` : ""}
          ${sw ? `<p class="card__sw">Software: <b>${esc(sw)}</b></p>` : ""}
        </div>
        <span class="card__arrow" aria-hidden="true">${ICON.arrow}</span>
      </div>
    </button>`;
  }).join("");
  $$(".card img").forEach((img) => img.addEventListener("error", () => { img.outerHTML = `<div class="card__placeholder">${placeholderSvg}</div>`; }));
  $$(".card").forEach((card) => card.addEventListener("click", () => {
    if (card.dataset.kind === "project") openProject(card.dataset.slug, card);
    else {
      const proj = S.projects.find((p) => p.slug === card.dataset.slug);
      const target = $(`.vcard__frame[data-video="${proj.video}"], .vcard__frame[data-yt="${(S.videos[proj.video] || {}).id}"]`);
      (target || $("#showreel")).scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    }
  }));

  /* ---------- Project presentation ---------- */
  const projEl = $("#project"), projScroll = $("#projScroll");
  let lastFocus = null, currentProject = null;

  function openProject(slug, trigger, fromHash) {
    const p = S.projects.find((x) => x.slug === slug);
    if (!p || !p.images) return;
    currentProject = p;
    lastFocus = trigger || document.activeElement;
    const hero = p.images[p.hero || 0];
    const details = Object.entries(p.details || {}).filter(([, v]) => v && String(v).trim());
    projScroll.innerHTML = `
      <section class="p-intro container">
        <p class="eyebrow mono"><span>Featured Project</span></p>
        <h2 class="p-title split" id="projTitle">${esc(p.title)}</h2>
        <ul class="p-cats">${p.category.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        <div class="p-desc">${p.description.map((d) => `<p>${esc(d)}</p>`).join("")}</div>
      </section>
      <div class="p-hero reveal"><button data-lb="${p.hero || 0}" aria-label="Open full-size image: ${esc(hero.caption)}"><img src="${esc(hero.src)}" alt="${esc(hero.alt)}"></button></div>
      <div class="container">
        <section class="p-block" aria-labelledby="pgTitle">
          <div class="p-block__head"><h3 id="pgTitle">Image Gallery</h3><span>${p.images.length} renders · click to enlarge</span></div>
          <div class="p-gallery">${p.images.map((im, i) => `
            <figure class="reveal" style="--d:${i * 0.1}s"><button data-lb="${i}" aria-label="Open full-size image ${i + 1}: ${esc(im.caption)}"><img src="${esc(im.src)}" alt="${esc(im.alt)}" loading="lazy"></button>
            <figcaption><b>0${i + 1}</b>${esc(im.caption)}</figcaption></figure>`).join("")}
          </div>
        </section>
        ${p.video && S.videos[p.video] ? `
        <section class="p-block" aria-labelledby="pvTitle">
          <div class="p-block__head"><h3 id="pvTitle">${esc(S.videos[p.video].label)}</h3>${S.videos[p.video].duration ? `<span>${esc(S.videos[p.video].duration)}</span>` : ""}</div>
          <div class="p-video reveal">${videoPlayer(p.video)}</div>
          ${S.videos[p.video].description ? `<p class="vcard__desc" style="margin-top:18px">${esc(S.videos[p.video].description)}</p>` : ""}
        </section>` : ""}
        ${details.length ? `
        <section class="p-block" aria-labelledby="pdTitle">
          <div class="p-block__head"><h3 id="pdTitle">Project Details</h3></div>
          <dl class="p-details">${details.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        </section>` : ""}
        <div class="p-foot">
          <p>Interested in working together?</p>
          <a class="btn btn--primary" href="${esc(mailto)}"><span>${esc(S.contact.primaryCta)}</span>${ICON.arrow}</a>
        </div>
      </div>`;
    projEl.hidden = false;
    document.body.classList.add("no-scroll");
    projScroll.scrollTop = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => projEl.classList.add("is-open")));
    $$("[data-lb]", projScroll).forEach((b) => b.addEventListener("click", () => openLightbox(p.images, +b.dataset.lb, b)));
    initPlayers(projScroll);
    splitHeadings(projScroll);
    observe(projScroll, projScroll);
    bindCursorTargets(projEl);
    if (!fromHash) history.pushState({ project: slug }, "", "#project/" + slug);
    setTimeout(() => $("#projClose").focus({ preventScroll: true }), 300);
  }

  function closeProject(fromHash) {
    if (projEl.hidden) return;
    $$("video", projEl).forEach((v) => v.pause());
    projEl.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { projEl.hidden = true; projScroll.innerHTML = ""; }, reduced ? 0 : 850);
    currentProject = null;
    if (!fromHash && location.hash.startsWith("#project/")) history.pushState({}, "", "#work");
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  $("#projClose").addEventListener("click", () => closeProject());

  function routeFromHash() {
    const m = location.hash.match(/^#project\/(.+)$/);
    if (m) openProject(decodeURIComponent(m[1]), null, true);
    else closeProject(true);
  }
  window.addEventListener("popstate", routeFromHash);

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  let lbList = [], lbIndex = 0, lbTrigger = null;
  function showLb(i) {
    lbIndex = (i + lbList.length) % lbList.length;
    const im = lbList[lbIndex];
    lbImg.src = im.src; lbImg.alt = im.alt;
    lbCap.textContent = `${lbIndex + 1} / ${lbList.length} — ${im.caption}`;
    const multi = lbList.length > 1;
    $("#lbPrev").hidden = !multi; $("#lbNext").hidden = !multi;
  }
  function openLightbox(list, i, trigger) {
    lbList = list; lbTrigger = trigger; showLb(i);
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("is-open"));
    $("#lbClose").focus();
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    setTimeout(() => { lb.hidden = true; }, 300);
    if (lbTrigger) lbTrigger.focus();
  }
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => showLb(lbIndex - 1));
  $("#lbNext").addEventListener("click", () => showLb(lbIndex + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb__figure")) closeLightbox(); });
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") showLb(lbIndex + 1);
      else if (e.key === "ArrowLeft") showLb(lbIndex - 1);
      else if (e.key === "Tab") trapFocus(e, lb);
      return;
    }
    if (!projEl.hidden) {
      if (e.key === "Escape") closeProject();
      else if (e.key === "Tab") trapFocus(e, projEl);
      return;
    }
    if (e.key === "Escape" && nav.classList.contains("menu-open")) toggleMenu(false);
  });
  function trapFocus(e, root) {
    const f = $$('a[href], button:not([hidden]), video, iframe, [tabindex]:not([tabindex="-1"])', root).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Contact ---------- */
  $("#mailBtn").href = mailto;
  $("#mailText").href = "mailto:" + S.artist.email;
  $("#mailText").textContent = S.artist.email;
  $("#liBtn").href = S.artist.linkedin;

  /* ---------- Nav behaviour ---------- */
  const nav = $("#nav"), toggle = $("#navToggle");
  function toggleMenu(open) {
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  }
  toggle.addEventListener("click", () => toggleMenu(!nav.classList.contains("menu-open")));
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const sections = S.nav.map((n) => $(n.href)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          $$("#navLinks a").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Split headings & reveals ---------- */
  function splitHeadings(root) {
    $$(".split", root).forEach((el) => {
      if (el.dataset.split) return; el.dataset.split = 1;
      const text = el.textContent.trim();
      el.setAttribute("aria-label", text);
      el.innerHTML = text.split(/\s+/).map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${esc(w)}</span></span>`).join(" ");
    });
  }
  let io = null;
  function observe(root, scrollRoot) {
    const targets = $$(".reveal, .split, .card", root);
    if (!("IntersectionObserver" in window) || reduced) { targets.forEach((t) => t.classList.add("is-in")); return; }
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); o.unobserve(en.target); } });
    }, { root: scrollRoot || null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach((t) => obs.observe(t));
    if (!scrollRoot) io = obs;
  }
  splitHeadings(document);
  observe(document);
  // Safety net: never leave content hidden if observers misbehave
  // (e.g. full-page renderers, print, or browsers that never fire intersections).
  setTimeout(() => $$(".reveal, .split, .card").forEach((t) => t.classList.add("is-in")), 4000);
  window.addEventListener("beforeprint", () => $$(".reveal, .split, .card").forEach((t) => t.classList.add("is-in")));

  /* ---------- Custom cursor ---------- */
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  function bindCursorTargets(root) {
    if (!finePointer || reduced) return;
    $$("a, button, video, iframe, .soft", root).forEach((el) => {
      if (el.dataset.cur) return; el.dataset.cur = 1;
      const view = el.matches(".card, [data-lb]");
      el.addEventListener("mouseenter", () => ring.classList.add(view ? "is-view" : "is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-view", "is-hover"));
    });
  }
  if (finePointer && !reduced) {
    document.body.classList.add("has-cursor");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; }, { passive: true });
    document.addEventListener("mouseleave", () => { dot.style.opacity = ring.style.opacity = 0; });
    document.addEventListener("mouseenter", () => { dot.style.opacity = ring.style.opacity = ""; });
    (function loop() { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
    bindCursorTargets(document);
    // Hide custom cursor over native video/iframe controls for usability
    document.addEventListener("mouseover", (e) => { const over = e.target.closest("iframe"); document.body.classList.toggle("has-cursor", !over); });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduced) {
    $$(".magnetic").forEach((b) => {
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
      });
      b.addEventListener("mouseleave", () => { b.style.transform = ""; });
    });
  }

  /* ---------- Parallax ---------- */
  if (!reduced) {
    const layers = $$(".hero .parallax");
    const cards = $$("[data-parallax] img");
    let pmx = 0, pmy = 0, ticking = false;
    window.addEventListener("mousemove", (e) => { pmx = e.clientX / innerWidth - 0.5; pmy = e.clientY / innerHeight - 0.5; req(); }, { passive: true });
    window.addEventListener("scroll", req, { passive: true });
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    function update() {
      ticking = false;
      const sy = window.scrollY;
      if (sy < innerHeight * 1.2) layers.forEach((l) => { const d = +l.dataset.depth; l.style.transform = `translate(${pmx * d * -60}px, ${pmy * d * -30 + sy * d * 0.6}px)`; });
      cards.forEach((img) => {
        const card = img.closest(".card");
        if (!card || !card.classList.contains("is-in") || card.matches(":hover")) { if (card && card.matches(":hover")) img.style.translate = ""; return; }
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const prog = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        img.style.translate = `0 ${prog * -18}px`;
      });
    }
  }

  /* ---------- Hero canvas: drifting particles + light streaks ---------- */
  (function heroCanvas() {
    const cv = $("#heroCanvas");
    if (!cv || !cv.getContext) return;
    const ctx = cv.getContext("2d");
    let w, h, dpr, parts = [], streaks = [], running = true;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      parts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.3, vx: (Math.random() - 0.5) * 0.12, vy: -Math.random() * 0.18 - 0.03, a: Math.random() * 0.5 + 0.15 }));
      streaks = Array.from({ length: 4 }, (_, i) => ({ x: Math.random() * w, y: h * (0.15 + i * 0.18), len: 160 + Math.random() * 260, v: 0.25 + Math.random() * 0.5 }));
      if (reduced) draw();
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      // architectural grid in perspective
      ctx.strokeStyle = "rgba(185,193,204,0.05)"; ctx.lineWidth = 1;
      const hz = h * 0.62, cx = w * 0.62;
      for (let i = -14; i <= 14; i++) { ctx.beginPath(); ctx.moveTo(cx + i * 18, hz); ctx.lineTo(cx + i * 160, h); ctx.stroke(); }
      for (let j = 1; j < 9; j++) { const y = hz + Math.pow(j / 9, 2) * (h - hz); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      streaks.forEach((s) => {
        const g = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
        g.addColorStop(0, "rgba(142,187,255,0)"); g.addColorStop(1, "rgba(142,187,255,0.22)");
        ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(s.x - s.len, s.y); ctx.lineTo(s.x, s.y); ctx.stroke();
        if (!reduced) { s.x += s.v; if (s.x - s.len > w) { s.x = -20; s.y = Math.random() * h * 0.8; } }
      });
      parts.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,220,235,${p.a})`; ctx.fill();
        if (!reduced) { p.x += p.vx; p.y += p.vy; if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; } if (p.x < -5) p.x = w + 5; if (p.x > w + 5) p.x = -5; }
      });
    }
    function loop() { if (running) draw(); requestAnimationFrame(loop); }
    size(); window.addEventListener("resize", size);
    if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => { running = en.isIntersecting; }).observe(cv);
    if (!reduced) loop();
  })();

  /* ---------- Start ---------- */
  requestAnimationFrame(() => { document.body.classList.remove("is-loading"); document.body.classList.add("is-ready"); });
  if (location.hash.startsWith("#project/")) setTimeout(routeFromHash, 100);
})();
