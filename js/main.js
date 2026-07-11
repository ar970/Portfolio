/* ==========================================================================
   Portfolio — interactions
   ========================================================================== */

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
  project2:   "https://www.linkedin.com/posts/archit1362007_hackathon-foundermindset-innovation-activity-7364359460884008960-yOu0",
  project3:   "https://drive.google.com/drive/folders/1GSd8FVggqou0rv4H7MUuGBdotrxx2qvS",
  project4:   "https://drive.google.com/drive/folders/1ZaCODztAl5cXwPoDlkv6mBzvVZqvGiZ5",
  kfc:        "https://drive.google.com/file/d/1_gKC3y2n9FwR-kqinRSH_f7fy5d3OAUC/view",
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

/* ---------- mouse-parallax doodles ---------- */
const doodles = document.querySelectorAll(".doodle[data-depth], .pill-spot[data-depth]");
if (doodles.length && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  let mx = 0, my = 0;
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  });
  (function drift() {
    doodles.forEach((d) => {
      const depth = parseFloat(d.dataset.depth || "3");
      d.style.transform = `translate(${mx * depth * -9}px, ${my * depth * -9}px)`;
    });
    requestAnimationFrame(drift);
  })();
}

/* ---------- custom cursor (desktop only) ---------- */
const cursor = document.getElementById("cursor");
if (cursor && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.body.classList.add("has-cursor");
  let cx = -100, cy = -100, tx = -100, ty = -100;

  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
  document.addEventListener("mouseenter", () => { cursor.style.opacity = ""; });

  document.addEventListener("mouseover", (e) => {
    cursor.classList.toggle("is-hover", !!e.target.closest("a, button, .pill, .peek__card, .polaroid"));
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
