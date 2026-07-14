/* ==========================================================================
   Portfolio — interactions
   ========================================================================== */

/* --------------------------------------------------------------------------
   INTRO / PRELOADER — counts up, then curtains away to reveal the hero.
   -------------------------------------------------------------------------- */
(function intro() {
  const el = document.getElementById("intro");
  if (!el) return;
  const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const numEl = document.getElementById("introNum");
  const barEl = document.getElementById("introBar");
  const wordEl = document.getElementById("introWord");
  const words = ["RESEARCH", "DESIGN", "BUILD", "SHIP"];

  const finish = () => {
    el.classList.add("is-done");
    document.body.classList.remove("intro-lock");
    document.body.classList.add("ready");
    setTimeout(() => el.remove(), 950);
  };

  document.body.classList.add("intro-lock");

  if (rm) {
    numEl.textContent = "100";
    barEl.style.width = "100%";
    setTimeout(finish, 400);
    return;
  }

  const start = performance.now();
  const dur = 1900;
  let wi = 0;
  (function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 2.2);
    const val = Math.round(eased * 100);
    numEl.textContent = val;
    barEl.style.width = eased * 100 + "%";
    const nextWord = Math.min(words.length - 1, Math.floor(p * words.length));
    if (nextWord !== wi) { wi = nextWord; wordEl.textContent = words[wi]; }
    if (p < 1) requestAnimationFrame(step);
    else setTimeout(finish, 260);
  })(start);

  // failsafe: never trap the visitor
  setTimeout(() => { if (document.getElementById("intro")) finish(); }, 4200);
})();


/* --------------------------------------------------------------------------
   LINKS CONFIG — fill these in with your real URLs.
   Every button on the page with a data-link attribute reads from here.
   -------------------------------------------------------------------------- */
const LINKS = {
  linkedin:   "https://www.linkedin.com/in/archit1362007",
  github:     "https://github.com/ar970",
  email:      "mailto:arctheceo@gmail.com",
  resume:     "#", // TODO: add resume PDF (e.g. "assets/documents/resume.pdf")
  project1:   "https://vyaasa.co/",
  project3:   "https://drive.google.com/drive/folders/1GSd8FVggqou0rv4H7MUuGBdotrxx2qvS",
  project4:   "https://drive.google.com/drive/folders/1ZaCODztAl5cXwPoDlkv6mBzvVZqvGiZ5",
  scribl:     "https://scribledu.vercel.app/",
  campusprep: "https://omterview-coach-india.vercel.app/",
  stoneawake: "https://lnkd.in/g7BfNf5T",
  kfc:        "https://drive.google.com/file/d/1_gKC3y2n9FwR-kqinRSH_f7fy5d3OAUC/view",
  newkind:    "https://drive.google.com/drive/folders/1oQE_iJ7UPx7hfDGLkzmfjrHJXrqw9UQg",
  cyberkido:  "https://drive.google.com/drive/folders/1XA4WizOeFbPPIUvQAqXTQCguJRqD_m4O",
  nutriladooz:"#", // no external link — card stays on page until one exists
};

document.querySelectorAll("[data-link]").forEach((el) => {
  const key = el.dataset.link;
  const url = LINKS[key];
  if (url && url !== "#") {
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener";
  } else {
    // not wired yet — keep on-page and hint in console
    el.addEventListener("click", (e) => e.preventDefault());
    el.title = "Link coming soon";
  }
});

/* ---------- lightbox image previews ---------- */
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lbImg = lightbox.querySelector(".lightbox__img");
  const lbClose = lightbox.querySelector(".lightbox__close");
  let lastFocused = null;

  const openLightbox = (src, alt) => {
    lastFocused = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  };
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(el.dataset.lightbox, el.dataset.lightboxAlt);
    });
  });
  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

/* ---------- current year in footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- typewriter in hero sub-line ---------- */
const TYPEWRITER_WORDS = ["things", "AI workflows", "automations", "startups", "brands"];
const twEl = document.getElementById("typewriter");
if (twEl && !reducedMotion) {
  let wordIndex = 0;
  let charIndex = TYPEWRITER_WORDS[0].length;
  let deleting = true;

  (function type() {
    const word = TYPEWRITER_WORDS[wordIndex];
    charIndex += deleting ? -1 : 1;
    twEl.textContent = word.slice(0, charIndex);

    let delay = deleting ? 55 : 95;
    if (!deleting && charIndex === word.length) {
      delay = 2200; // pause on full word
      deleting = true;
    } else if (deleting && charIndex === 0) {
      wordIndex = (wordIndex + 1) % TYPEWRITER_WORDS.length;
      deleting = false;
      delay = 350;
    }
    setTimeout(type, delay);
  })();
}

/* ---------- doodles drift with mouse AND scroll ---------- */
const doodles = document.querySelectorAll(".doodle[data-depth], .pill-spot[data-depth]");
if (doodles.length && !reducedMotion && window.matchMedia("(min-width: 861px)").matches) {
  const fine = window.matchMedia("(pointer: fine)").matches;
  let mx = 0, my = 0;
  if (fine) {
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  }
  (function drift() {
    const vh = window.innerHeight;
    doodles.forEach((d) => {
      const depth = parseFloat(d.dataset.depth || "3");
      const r = d.getBoundingClientRect();
      // scroll parallax: distance of this doodle's centre from viewport centre
      const scrollShift = ((r.top + r.height / 2 - vh / 2) / vh) * depth * -10;
      const mxs = fine ? mx * depth * -9 : 0;
      const mys = fine ? my * depth * -9 : 0;
      d.style.transform =
        `translate(${mxs.toFixed(1)}px, ${(scrollShift + mys).toFixed(1)}px)`;
    });
    requestAnimationFrame(drift);
  })();
}

/* ---------- hero scene draws itself in on load ---------- */
const scene = document.querySelector(".hero__scene svg");
if (scene && !reducedMotion) {
  const shapes = scene.querySelectorAll("path, circle, ellipse, rect");
  shapes.forEach((el, i) => {
    let len = 0;
    try { len = el.getTotalLength(); } catch { return; }
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    el.style.fillOpacity = "0";
    el.style.transition =
      `stroke-dashoffset 0.9s ease ${0.15 + i * 0.045}s, fill-opacity 0.5s ease ${0.5 + i * 0.045}s`;
  });
  const play = () =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        shapes.forEach((el) => {
          el.style.strokeDashoffset = "0";
          el.style.fillOpacity = "1";
        });
      })
    );
  // wait for the intro curtain to lift, then draw
  if (document.body.classList.contains("ready")) {
    play();
  } else {
    const obs = new MutationObserver(() => {
      if (document.body.classList.contains("ready")) {
        obs.disconnect();
        play();
      }
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }
}

/* ---------- scroll progress line ---------- */
const progress = document.getElementById("progress");
if (progress) {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ---------- rocket back-to-top ---------- */
const totop = document.getElementById("totop");
if (totop) {
  window.addEventListener(
    "scroll",
    () => totop.classList.toggle("is-shown", window.scrollY > 600),
    { passive: true }
  );
  totop.addEventListener("click", () => {
    if (!reducedMotion) {
      totop.classList.add("is-launching");
      setTimeout(() => totop.classList.remove("is-launching"), 1100);
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}

/* ---------- whole project card is clickable ---------- */
document.querySelectorAll(".project").forEach((card) => {
  const link = card.querySelector(".btn[data-link], .btn[href]");
  if (!link) return;
  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return; // let real links handle themselves
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    if (link.target === "_blank") window.open(href, "_blank", "noopener");
    else window.location.href = href;
  });
});

/* ---------- characters come alive: eyes follow the cursor ---------- */
const pupils = document.querySelectorAll(".eye-pupil");
if (pupils.length && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  pupils.forEach((p) => {
    p.dataset.bx = p.getAttribute("cx");
    p.dataset.by = p.getAttribute("cy");
  });
  const moveEyes = (clientX, clientY) => {
    pupils.forEach((p) => {
      const svg = p.ownerSVGElement;
      if (!svg) return;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const pt = svg.createSVGPoint();
      pt.x = +p.dataset.bx;
      pt.y = +p.dataset.by;
      const s = pt.matrixTransform(ctm);
      const ang = Math.atan2(clientY - s.y, clientX - s.x);
      const max = +p.getAttribute("r") * 0.9;
      p.setAttribute("cx", (+p.dataset.bx + Math.cos(ang) * max).toFixed(2));
      p.setAttribute("cy", (+p.dataset.by + Math.sin(ang) * max).toFixed(2));
    });
  };
  window.addEventListener("mousemove", (e) => moveEyes(e.clientX, e.clientY), { passive: true });
}

/* ---------- hero character subtly turns toward the cursor ---------- */
const heroScene = document.querySelector(".hero__scene svg");
if (heroScene && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  const hero = document.getElementById("hero");
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    heroScene.style.transform =
      `perspective(900px) rotateY(${(x * 7).toFixed(2)}deg) rotateX(${(-y * 7).toFixed(2)}deg)`;
  });
  hero.addEventListener("mouseleave", () => {
    heroScene.style.transform = "";
  });
}

/* ---------- magnetic buttons ---------- */
if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".btn").forEach((btn) => {
    const strength = 0.4;
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.classList.add("is-magnetic");
      btn.style.transform = `translate(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
      setTimeout(() => btn.classList.remove("is-magnetic"), 220);
    });
  });
}

/* ---------- 3D tilt on project cards ---------- */
if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".project").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        `perspective(1100px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ---------- count-up stats ---------- */
const statNums = document.querySelectorAll(".stat__num[data-count]");
if (statNums.length) {
  const runCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (reducedMotion) { el.textContent = target + "+"; return; }
    const t0 = performance.now();
    const dur = 1200;
    (function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + "+";
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  statNums.forEach((el) => statObserver.observe(el));
}

/* ---------- nav scrollspy ---------- */
const spyLinks = document.querySelectorAll(".nav__link");
const spySections = [...spyLinks]
  .map((l) => document.querySelector(l.hash))
  .filter(Boolean);
if (spySections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        spyLinks.forEach((l) =>
          l.classList.toggle("is-active", l.hash === "#" + entry.target.id)
        );
      }
    });
  }, { rootMargin: "-30% 0px -55% 0px" });
  spySections.forEach((s) => spy.observe(s));
}

/* ---------- live Delhi clock ---------- */
const clock = document.getElementById("clock");
if (clock) {
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  tick();
  setInterval(tick, 30000);
}

/* ---------- custom cursor (desktop only) ---------- */
const cursor = document.getElementById("cursor");
if (cursor && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.body.classList.add("has-cursor");
  let cx = -100, cy = -100, tx = -100, ty = -100;

  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
  document.addEventListener("mouseenter", () => { cursor.style.opacity = ""; });

  const cursorLabel = document.getElementById("cursor-label");
  document.addEventListener("mouseover", (e) => {
    const viewTarget = e.target.closest(".mini, .project, .peek__card");
    cursor.classList.toggle("is-view", !!viewTarget);
    if (cursorLabel) cursorLabel.textContent = viewTarget ? "VIEW ↗" : "";
    cursor.classList.toggle(
      "is-hover",
      !viewTarget && !!e.target.closest("a, button, .pill, .polaroid")
    );
  });

  (function follow() {
    cx += (tx - cx) * 0.22;
    cy += (ty - cy) * 0.22;
    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";
    requestAnimationFrame(follow);
  })();
}

/* ---------- reveal on scroll ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
/* stagger children of these groups so they cascade in */
document.querySelectorAll(".journey__list, .stats__row").forEach((group) => {
  [...group.children].forEach((child, i) => {
    child.classList.add("reveal");
    child.style.transitionDelay = (i * 0.09).toFixed(2) + "s";
  });
});

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ---------- marquees: duplicate content and auto-scroll ---------- */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".marquee").forEach((marquee) => {
  const track = marquee.querySelector(".marquee__track");
  if (!track) return;

  // duplicate children until track is at least 2x the viewport width
  const originalHTML = track.innerHTML;
  while (track.scrollWidth < window.innerWidth * 2.2) {
    track.insertAdjacentHTML("beforeend", originalHTML);
  }

  if (prefersReducedMotion) return;

  const speed = parseFloat(marquee.dataset.speed || "0.5");
  let offset = 0;
  let paused = false;
  const half = () => track.scrollWidth / 2;

  marquee.addEventListener("mouseenter", () => (paused = true));
  marquee.addEventListener("mouseleave", () => (paused = false));

  (function tick() {
    if (!paused) {
      offset -= speed;
      if (-offset >= half()) offset += half();
      track.style.transform = `translateX(${offset}px)`;
    }
    requestAnimationFrame(tick);
  })();
});
