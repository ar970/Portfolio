/* ==========================================================================
   Portfolio — interactions
   ========================================================================== */

/* --------------------------------------------------------------------------
   LINKS CONFIG — fill these in with your real URLs.
   Every button on the page with a data-link attribute reads from here.
   -------------------------------------------------------------------------- */
const LINKS = {
  linkedin:   "#", // e.g. "https://www.linkedin.com/in/your-handle"
  instagram:  "#", // e.g. "https://www.instagram.com/your-handle"
  behance:    "#", // e.g. "https://www.behance.net/your-handle"
  resume:     "#", // e.g. "assets/resume.pdf"
  otherWorks: "#", // e.g. a Behance/Notion page with more work
  artPage:    "#", // e.g. your art/illustration page
  project1:   "#",
  project2:   "#",
  project3:   "#",
  project4:   "#",
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
