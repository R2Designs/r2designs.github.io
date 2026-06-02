const root = document.documentElement;
const year = document.getElementById("year");
const siteHeader = document.querySelector(".site-header");
const heroCanvas = document.getElementById("hero-canvas");
const heroSection = document.querySelector(".hero");
const darkViewportSections = document.querySelectorAll(".section--dark-viewport");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const personalProjectsList = document.getElementById("personal-projects-list");

const ctx = heroCanvas.getContext("2d");
const heroState = {
  width: 0,
  height: 0,
  pointerX: 0,
  pointerY: 0,
  targetX: 0,
  targetY: 0,
};

const cursorState = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  targetX: window.innerWidth / 2,
  targetY: window.innerHeight / 2,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

  root.style.setProperty("--scroll-progress", String(progress));
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  updateShowcaseMode();
}

function updateShowcaseMode() {
  if (!darkViewportSections.length) {
    return;
  }

  const active = Array.from(darkViewportSections).some((section) => {
    const rect = section.getBoundingClientRect();

    return (
      rect.top <= window.innerHeight * 0.18 &&
      rect.bottom >= window.innerHeight * 0.42
    );
  });

  document.body.classList.toggle("is-showcase-mode", active);
}

function resizeHeroCanvas() {
  const rect = heroCanvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  heroState.width = rect.width;
  heroState.height = rect.height;

  heroCanvas.width = Math.round(rect.width * dpr);
  heroCanvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  if (!heroState.pointerX || !heroState.pointerY) {
    heroState.pointerX = rect.width * 0.68;
    heroState.pointerY = rect.height * 0.42;
    heroState.targetX = heroState.pointerX;
    heroState.targetY = heroState.pointerY;
  }
}

function drawHero(time) {
  const { width, height } = heroState;
  const columns = Math.max(16, Math.floor(width / 48));
  const rows = Math.max(10, Math.floor(height / 54));
  const gapX = width / Math.max(columns - 1, 1);
  const gapY = height / Math.max(rows - 1, 1);
  const focusX = width * 0.68;
  const focusY = height * 0.45;
  const radius = Math.min(width, height) * 0.36;

  heroState.pointerX += (heroState.targetX - heroState.pointerX) * 0.08;
  heroState.pointerY += (heroState.targetY - heroState.pointerY) * 0.08;

  ctx.clearRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(focusX, focusY, 0, focusX, focusY, width * 0.55);
  glow.addColorStop(0, "rgba(17, 17, 17, 0.10)");
  glow.addColorStop(1, "rgba(17, 17, 17, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  for (let line = 0; line < 4; line += 1) {
    const lineY =
      height * (0.16 + line * 0.18) +
      Math.sin(time * 0.00038 + line * 1.6) * 8;

    ctx.strokeStyle = "rgba(17, 17, 17, 0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-24, lineY);
    ctx.bezierCurveTo(width * 0.28, lineY - 22, width * 0.74, lineY + 22, width + 24, lineY);
    ctx.stroke();
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const baseX = col * gapX;
      const baseY = row * gapY;
      const nx = col / Math.max(columns - 1, 1);
      const ny = row / Math.max(rows - 1, 1);
      const wave =
        Math.sin(nx * 7 + time * 0.0011 + ny * 2.4) +
        Math.cos(ny * 8 - time * 0.0009 - nx * 2.8);
      const focusDistance = Math.hypot(baseX - focusX, baseY - focusY);
      const pointerDistance = Math.hypot(baseX - heroState.pointerX, baseY - heroState.pointerY);
      const focusStrength = Math.max(0, 1 - focusDistance / radius);
      const pointerStrength = Math.max(0, 1 - pointerDistance / (radius * 0.88));
      const strength = clamp(0.08 + focusStrength * 0.48 + pointerStrength * 0.44 + wave * 0.05, 0, 1);
      const size = 1.8 + strength * 10;
      const driftX = Math.sin(time * 0.0008 + nx * 6.2 + ny * 3.1) * 3.6;
      const driftY = Math.cos(time * 0.00085 + ny * 5.3 - nx * 2.4) * 3.4;
      const drawX = baseX + driftX;
      const drawY = baseY + driftY;

      ctx.fillStyle = `rgba(17, 17, 17, ${0.06 + strength * 0.26})`;
      ctx.fillRect(drawX - size / 2, drawY - size / 2, size, size);
    }
  }
}

function animateHero(time) {
  drawHero(time);
  if (!reduceMotion) {
    window.requestAnimationFrame(animateHero);
  }
}

function setupRevealObserver() {
  const revealNodes = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupCursor() {
  if (!canHover || reduceMotion) {
    return;
  }

  const hoverTargets = document.querySelectorAll("a, button, [data-cursor]");

  hoverTargets.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      cursorRing.classList.add("is-hover");
    });

    node.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("is-hover");
    });
  });

  window.addEventListener("pointermove", (event) => {
    cursorState.targetX = event.clientX;
    cursorState.targetY = event.clientY;
  });

  const animateCursor = () => {
    cursorState.x += (cursorState.targetX - cursorState.x) * 0.18;
    cursorState.y += (cursorState.targetY - cursorState.y) * 0.18;

    cursorDot.style.transform = `translate(${cursorState.x - 3.5}px, ${cursorState.y - 3.5}px)`;
    cursorRing.style.transform = `translate(${cursorState.x - cursorRing.offsetWidth / 2}px, ${cursorState.y - cursorRing.offsetHeight / 2}px)`;

    window.requestAnimationFrame(animateCursor);
  };

  window.requestAnimationFrame(animateCursor);
}

function SmartFundsProject({ title, eyebrow, lede, ctaLink, accentClass, assets }) {
  const imageCard = ({ modifier, src, alt, caption = "" }) => `
    <article class="smartfunds-mosaic__tile smartfunds-mosaic__tile--image ${modifier}">
      <img class="smartfunds-mosaic__image" src="${src}" alt="${alt}" loading="lazy" />
      ${caption ? `<span class="smartfunds-mosaic__tile-caption">${caption}</span>` : ""}
    </article>
  `;

  const videoCard = ({ modifier, src }) => `
    <article class="smartfunds-mosaic__tile smartfunds-mosaic__tile--video ${modifier}">
      <div class="smartfunds-mosaic__device">
        <div class="smartfunds-mosaic__device-screen">
          <video
            class="smartfunds-mosaic__video"
            src="${src}"
            muted
            playsinline
            autoplay
            loop
            preload="auto"
          ></video>
        </div>
      </div>
    </article>
  `;

  const desktopTiles = {
    hero: videoCard({
      modifier: "smartfunds-mosaic__card--hero",
      src: assets.heroVideo,
    }),
    goal: imageCard({
      modifier: "smartfunds-mosaic__card--goal",
      src: assets.goal,
      alt: "Goal-based mutual funds card",
    }),
    stories: imageCard({
      modifier: "smartfunds-mosaic__card--stories",
      src: assets.stories,
      alt: "Social mutual funds stories card",
    }),
    strategyAI: imageCard({
      modifier: "smartfunds-mosaic__card--strategy-ai",
      src: assets.ai,
      alt: "AI mutual funds strategy card",
    }),
    kinds: imageCard({
      modifier: "smartfunds-mosaic__card--kinds",
      src: assets.kinds,
      alt: "Smart mutual funds recommendation card",
    }),
    brand: imageCard({
      modifier: "smartfunds-mosaic__card--sf",
      src: assets.sf,
      alt: "Smart Funds brand card",
    }),
    know: imageCard({
      modifier: "smartfunds-mosaic__card--know",
      src: assets.read,
      alt: "Know better mutual funds information card",
    }),
    health: imageCard({
      modifier: "smartfunds-mosaic__card--health",
      src: assets.health,
      alt: "Portfolio health card",
    }),
    investments: videoCard({
      modifier: "smartfunds-mosaic__card--investments",
      src: assets.investmentsVideo,
    }),
    strategy: imageCard({
      modifier: "smartfunds-mosaic__card--strategy",
      src: assets.strategy,
      alt: "Mutual funds strategy media card",
    }),
  };

  return `
    <article class="personal-project personal-project--mosaic personal-project--smartfunds ${accentClass}">
      <div class="smartfunds-mosaic">
        <div class="smartfunds-mosaic__column smartfunds-mosaic__column--left">
          ${desktopTiles.hero}
          ${desktopTiles.goal}
          ${desktopTiles.stories}
          ${desktopTiles.strategyAI}
        </div>

        <div class="smartfunds-mosaic__column smartfunds-mosaic__column--center">
          ${desktopTiles.kinds}

          ${desktopTiles.brand}

          <a class="button smartfunds-mosaic__cta" href="${ctaLink}" data-cursor="open">
            Read more
          </a>

          ${desktopTiles.know}
        </div>

        <div class="smartfunds-mosaic__column smartfunds-mosaic__column--right">
          ${desktopTiles.health}
          ${desktopTiles.investments}
          ${desktopTiles.strategy}
        </div>
      </div>

      <a class="smartfunds-mobile-hero" href="${ctaLink}" data-cursor="open" aria-label="${title} mobile hero">
        <img
          class="smartfunds-mobile-hero__image"
          src="${assets.mobileHero}"
          alt="Smart Funds showcase"
          loading="lazy"
        />
      </a>
    </article>
  `;
}

function TabsProject({ title, ctaLink, accentClass, assets }) {
  const imageCard = ({ modifier, src, alt }) => `
    <article class="tabs-mosaic__tile tabs-mosaic__tile--image ${modifier}">
      <img class="tabs-mosaic__image" src="${src}" alt="${alt}" loading="lazy" />
    </article>
  `;

  const videoCard = ({ modifier, src }) => `
    <article class="tabs-mosaic__tile tabs-mosaic__tile--video ${modifier}">
      <div class="tabs-mosaic__device">
        <div class="tabs-mosaic__device-screen">
          <video
            class="tabs-mosaic__video"
            src="${src}"
            muted
            playsinline
            autoplay
            loop
            preload="auto"
          ></video>
        </div>
      </div>
    </article>
  `;

  return `
    <article class="personal-project personal-project--mosaic personal-project--tabs ${accentClass}">
      <div class="tabs-mosaic">
        <div class="tabs-mosaic__column tabs-mosaic__column--left">
          ${videoCard({
            modifier: "tabs-mosaic__card--hero",
            src: assets.heroVideo,
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--currency",
            src: assets.currency,
            alt: "Multi country currency card",
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--summary",
            src: assets.summary,
            alt: "Summary card",
          })}
        </div>

        <div class="tabs-mosaic__column tabs-mosaic__column--center">
          ${imageCard({
            modifier: "tabs-mosaic__card--conversational",
            src: assets.conversational,
            alt: "Conversational UI card",
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--brand",
            src: assets.brand,
            alt: "Tabs brand tile",
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--friends",
            src: assets.friends,
            alt: "Friends reminders and breakup card",
          })}
        </div>

        <div class="tabs-mosaic__column tabs-mosaic__column--right">
          ${imageCard({
            modifier: "tabs-mosaic__card--settle",
            src: assets.settle,
            alt: "Settle up card",
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--recent",
            src: assets.recent,
            alt: "Recent transactions card",
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--accessibility",
            src: assets.accessibility,
            alt: "Accessibility standards card",
          })}
        </div>
      </div>

      <div class="tabs-mobile-hero" aria-label="${title} mobile hero">
        <img
          class="tabs-mobile-hero__image"
          src="${assets.mobileHero}"
          alt="${title} showcase"
          loading="lazy"
        />
      </div>
    </article>
  `;
}

function RideOSProject({ title, readMoreLink, accentClass, assets }) {
  return `
    <article class="personal-project personal-project--mosaic personal-project--rideos ${accentClass}">
      <a
        class="rideos-poster"
        href="${readMoreLink}"
        target="_blank"
        rel="noreferrer"
        data-cursor="open"
        aria-label="${title} showcase"
      >
        <img
          class="rideos-poster__image"
          src="${assets.poster}"
          alt="${title} showcase"
          loading="lazy"
        />
      </a>
    </article>
  `;
}

function PersonalProject({
  layout,
  title,
  eyebrow,
  lede,
  videoSrc,
  imageSrc,
  imageAlt = "",
  ctaLink,
  readMoreLink = "",
  disableProductLink = false,
  showStoreLinks = true,
  staticStory = false,
  features,
  accentClass,
  titleClass = "",
  assets = {},
}) {
  if (layout === "smartfunds-mosaic") {
    return SmartFundsProject({
      title,
      eyebrow,
      lede,
      ctaLink,
      accentClass,
      assets,
    });
  }

  if (layout === "tabs-mosaic") {
    return TabsProject({
      title,
      ctaLink,
      accentClass,
      assets,
    });
  }

  if (layout === "rideos-mosaic") {
    return RideOSProject({
      title,
      readMoreLink,
      accentClass,
      assets,
    });
  }

  const featureMarkup = features
    .map(
      (feature, index) => `
        <article
          class="personal-project__step${staticStory || index === 0 ? " is-active" : ""}"
          data-feature-index="${index}"
          data-feature-time="${feature.time ?? ""}"
          data-feature-video="${feature.videoSrc ?? ""}"
        >
          <h3>${feature.title}</h3>
          <p>${feature.description}</p>
        </article>
      `
    )
    .join("");

  return `
    <article class="personal-project ${accentClass}${staticStory ? " personal-project--static-story" : ""}" data-feature-count="${features.length}" data-static-story="${staticStory ? "true" : "false"}">
      <div class="personal-project__media">
        <div class="personal-project__sticky">
          <div class="personal-project__phone-shell">
            <div class="personal-project__phone">
              <div class="personal-project__screen">
                ${
                  imageSrc
                    ? `<img
                  class="personal-project__image"
                  src="${imageSrc}"
                  alt="${imageAlt}"
                  loading="lazy"
                />`
                    : `<video
                  class="personal-project__video"
                  src="${videoSrc}"
                  muted
                  playsinline
                  autoplay
                  loop
                  preload="auto"
                ></video>`
                }
              </div>
            </div>
            <div class="personal-project__glow" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <div class="personal-project__content">
        <div class="personal-project__meta">
          <span class="personal-project__eyebrow">${eyebrow}</span>
          <h3 class="personal-project__title ${titleClass}">${title}</h3>
          <p class="personal-project__lede">${lede}</p>
        </div>

        <div class="personal-project__story">
          ${featureMarkup}
        </div>

        <div class="personal-project__stores" aria-label="${title} app availability">
          ${
            disableProductLink
              ? `<span class="personal-project__product-link personal-project__product-link--disabled" aria-disabled="true">
            Go to product page
          </span>`
              : `<a class="personal-project__product-link" href="${ctaLink}" data-cursor="open">
            Go to product page
          </a>`
          }
          ${
            readMoreLink
              ? `<a class="personal-project__product-link" href="${readMoreLink}" target="_blank" rel="noreferrer" data-cursor="open">
            Read more
          </a>`
              : ""
          }
          ${
            showStoreLinks
              ? `<button class="personal-project__store is-disabled" type="button" disabled aria-disabled="true">
            App Store
          </button>
          <button class="personal-project__store is-disabled" type="button" disabled aria-disabled="true">
            Play Store
          </button>
          <p class="personal-project__store-note">Under review</p>`
              : ""
          }
        </div>
      </div>
    </article>
  `;
}

function renderPersonalProjects() {
  if (!personalProjectsList) {
    return;
  }

  const projects = [
    {
      layout: "smartfunds-mosaic",
      title: "Smart funds",
      eyebrow: "Investing / personal product",
      lede:
        "A personal concept bringing mutual funds and social-media style discovery together, so learning, comparison, and conviction happen in the same product rhythm.",
      ctaLink: "./projects/social-funds.html",
      accentClass: "personal-project--emerald",
      assets: {
        heroVideo: "./assets/personal-projects/smart-funds/social-mutual-live.mp4",
        investmentsVideo: "./assets/personal-projects/smart-funds/investments-live.mp4",
        goal: "./assets/personal-projects/smart-funds/goal-mf.png",
        health: "./assets/personal-projects/smart-funds/mf-health.png",
        read: "./assets/personal-projects/smart-funds/mf-read.png",
        kinds: "./assets/personal-projects/smart-funds/mf-kinds.png",
        strategy: "./assets/personal-projects/smart-funds/mf-strategy.png",
        stories: "./assets/personal-projects/smart-funds/stories.png",
        ai: "./assets/personal-projects/smart-funds/ai-mf.png",
        sf: "./assets/personal-projects/smart-funds/sf.png",
        mobileHero: "./assets/personal-projects/smart-funds/smart_funds.png",
      },
    },
    {
      layout: "tabs-mosaic",
      title: "Tabs",
      eyebrow: "Shared expenses / personal product",
      lede:
        "A personal finance side project around calmer friend-to-friend expense tracking, clearer balances, and faster settlement moments.",
      ctaLink: "./projects/tabs.html",
      accentClass: "personal-project--violet",
      assets: {
        heroVideo: "./assets/personal-projects/tabs-main.mp4",
        conversational: "./assets/personal-projects/tabs-grid/conversational-ui.png",
        settle: "./assets/personal-projects/tabs-grid/settle-up.png",
        currency: "./assets/personal-projects/tabs-grid/currency.png",
        brand: "./assets/personal-projects/tabs-grid/tabs-brand.png",
        recent: "./assets/personal-projects/tabs-grid/recent-transactions.png",
        summary: "./assets/personal-projects/tabs-grid/summary.png",
        friends: "./assets/personal-projects/tabs-grid/friends-breakup.png",
        accessibility: "./assets/personal-projects/tabs-grid/accessibility.png",
        mobileHero: "./assets/personal-projects/tabs-grid/mobile.png",
      },
    },
    {
      layout: "rideos-mosaic",
      title: "RideOS",
      ctaLink: "./projects/rideos/",
      readMoreLink:
        "https://app.notion.com/p/Ride-OS-2dcf08ffc84a805da605e873b4a8989c?assetsVersion=23.13.20260602.0639",
      accentClass: "personal-project--amber",
      assets: {
        poster: "./assets/personal-projects/rideos-grid/rideos_main.jpg",
      },
    },
  ];

  personalProjectsList.innerHTML = projects.map(PersonalProject).join("");
}

function setupPersonalProjects() {
  if (!personalProjectsList) {
    return;
  }

  const projects = personalProjectsList.querySelectorAll(".personal-project");

  projects.forEach((project) => {
    const story = project.querySelector(".personal-project__story");
    const steps = Array.from(project.querySelectorAll(".personal-project__step"));
    const video = project.querySelector(".personal-project__video");
    const isStaticStory = project.dataset.staticStory === "true";

    if (!story || !steps.length) {
      return;
    }

    const featureTimes = steps.map((step) => Number(step.dataset.featureTime || 0));
    const featureVideos = steps.map((step) => step.dataset.featureVideo || "");
    const usesVideoSwap = featureVideos.some(Boolean);
    let activeIndex = 0;
    let hasInitialized = false;

    const updateActive = (index) => {
      if (index === activeIndex && story.style.getPropertyValue("--feature-progress")) {
        return;
      }

      activeIndex = index;

      steps.forEach((step, stepIndex) => {
        const isActive = stepIndex === index;
        step.classList.toggle("is-active", isActive);
        step.setAttribute("aria-current", isActive ? "step" : "false");
      });

      const progress = steps.length > 1 ? (index / (steps.length - 1)) * 100 : 100;
      story.style.setProperty("--feature-progress", `${progress}%`);
    };

    if (isStaticStory) {
      steps.forEach((step) => {
        step.classList.add("is-active");
        step.setAttribute("aria-current", "false");
      });
      story.style.setProperty("--feature-progress", "100%");
      return;
    }

    if (!video) {
      updateActive(0);

      steps.forEach((step, index) => {
        step.addEventListener("click", () => {
          updateActive(index);
        });
      });

      return;
    }

    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.preload = "auto";
    video.autoplay = true;
    video.loop = !usesVideoSwap;

    const getSafeEnd = () => Math.max(0, (video.duration || 0) - 0.06);

    const setVideoTime = (time) => {
      const safeTime = clamp(time, 0, getSafeEnd() || time);
      if (!Number.isFinite(safeTime)) {
        return;
      }

      try {
        video.currentTime = safeTime;
      } catch (_) {
        // Ignore transient seeking errors during metadata load.
      }
    };

    const playVideo = () => {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {});
      }
    };

    const swapVideoSource = (src) => {
      if (!src || video.getAttribute("src") === src) {
        playVideo();
        return;
      }

      video.pause();
      video.setAttribute("src", src);
      video.load();
      const resumePlayback = () => {
        playVideo();
        video.removeEventListener("loadeddata", resumePlayback);
      };
      video.addEventListener("loadeddata", resumePlayback);
    };

    const getFeatureIndexForTime = (time) => {
      let nextIndex = featureTimes.length - 1;

      for (let index = 0; index < featureTimes.length; index += 1) {
        const start = featureTimes[index];
        const end =
          index < featureTimes.length - 1
            ? featureTimes[index + 1]
            : (video.duration || featureTimes[index]) + 0.18;

        if (time >= start && time < end) {
          nextIndex = index;
          break;
        }
      }

      return nextIndex;
    };

    const syncFromVideoTime = () => {
      if (video.readyState < 2 || !Number.isFinite(video.currentTime)) {
        return;
      }

      const nextIndex = getFeatureIndexForTime(video.currentTime);
      if (nextIndex !== activeIndex) {
        updateActive(nextIndex);
      }
    };

    const syncInitialState = () => {
      if (usesVideoSwap && hasInitialized) {
        playVideo();
        return;
      }

      hasInitialized = true;
      updateActive(activeIndex);

      if (usesVideoSwap) {
        swapVideoSource(featureVideos[activeIndex] || video.getAttribute("src") || "");
        return;
      }

      setVideoTime(featureTimes[0] || 0);
      playVideo();
    };

    const jumpToFeature = (index) => {
      updateActive(index);

      if (usesVideoSwap) {
        swapVideoSource(featureVideos[index] || video.getAttribute("src") || "");
        return;
      }

      const time = featureTimes[index] || 0;
      setVideoTime(time);
      playVideo();
    };

    steps.forEach((step, index) => {
      step.addEventListener("click", () => {
        jumpToFeature(index);
      });
    });

    video.addEventListener("loadedmetadata", syncInitialState);
    if (!usesVideoSwap) {
      video.addEventListener("loadeddata", syncInitialState);
    }
    video.addEventListener("canplay", playVideo);

    if (!usesVideoSwap) {
      video.addEventListener("play", syncFromVideoTime);
      video.addEventListener("timeupdate", syncFromVideoTime);
      video.addEventListener("ended", () => {
        jumpToFeature(0);
      });
    } else {
      video.addEventListener("ended", () => {
        if (activeIndex < steps.length - 1) {
          jumpToFeature(activeIndex + 1);
          return;
        }

        jumpToFeature(0);
      });
    }

    video.load();
    if (!usesVideoSwap) {
      syncFromVideoTime();
    } else {
      jumpToFeature(0);
    }

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          video.pause();
          return;
        }

        playVideo();
      },
      { passive: true }
    );
  });
}

heroSection.addEventListener("pointermove", (event) => {
  const rect = heroSection.getBoundingClientRect();
  heroState.targetX = event.clientX - rect.left;
  heroState.targetY = event.clientY - rect.top;

  if (reduceMotion) {
    drawHero(performance.now());
  }
});

heroSection.addEventListener("pointerleave", () => {
  heroState.targetX = heroState.width * 0.68;
  heroState.targetY = heroState.height * 0.42;

  if (reduceMotion) {
    drawHero(performance.now());
  }
});

window.addEventListener("resize", () => {
  resizeHeroCanvas();
  updateScrollProgress();

  if (reduceMotion) {
    drawHero(performance.now());
  }
});

window.addEventListener("scroll", updateScrollProgress, { passive: true });

year.textContent = new Date().getFullYear();
renderPersonalProjects();
updateScrollProgress();
resizeHeroCanvas();
setupRevealObserver();
setupCursor();
setupPersonalProjects();

if (reduceMotion) {
  drawHero(performance.now());
} else {
  window.requestAnimationFrame(animateHero);
}
