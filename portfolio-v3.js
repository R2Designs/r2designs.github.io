const root = document.documentElement;
const body = document.body;
const switchButton = document.querySelector("[data-mode-switch]");
const showcaseSection = document.querySelector(".local-showcase");

function setMode(mode) {
  const isPersonal = mode === "personal";
  body.classList.toggle("portfolio-mode--personal", isPersonal);
  body.classList.toggle("portfolio-mode--work", !isPersonal);
  body.classList.toggle("showcase-is-visible", isPersonal);
  switchButton?.setAttribute("aria-pressed", String(isPersonal));
}

switchButton?.addEventListener("click", () => {
  const nextMode = body.classList.contains("portfolio-mode--personal") ? "work" : "personal";
  setMode(nextMode);
  if (nextMode === "work") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--cursor-x", `${event.clientX}px`);
  root.style.setProperty("--cursor-y", `${event.clientY}px`);
});

if (showcaseSection) {
  const showcaseObserver = new IntersectionObserver(
    ([entry]) => {
      if (!body.classList.contains("portfolio-mode--personal")) {
        body.classList.toggle("showcase-is-visible", entry.isIntersecting);
      }
    },
    {
      threshold: 0.42,
    },
  );

  showcaseObserver.observe(showcaseSection);
}

setMode("work");
