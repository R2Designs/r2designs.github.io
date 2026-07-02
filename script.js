const root = document.documentElement;
const year = document.getElementById("year");
const siteHeader = document.querySelector(".site-header");
const heroCanvas = document.getElementById("hero-canvas");
const heroSection = document.querySelector(".hero");
const homeMosaic = document.querySelector(".home-mosaic");
const homeGrid = document.querySelector("[data-home-grid]");
const darkViewportSections = document.querySelectorAll(".section--dark-viewport");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const personalProjectsList = document.getElementById("personal-projects-list");
const sceneModeButtons = document.querySelectorAll("[data-scene-mode]");
const projectNavLinks = document.querySelectorAll(".projects-showcase__nav a[href^='#']");
const writingSection = document.getElementById("writing");
const writingStack = writingSection?.querySelector(".writing__stack");
const writingShowcase = writingSection?.querySelector(".writing-showcase");
const writingListingShell = writingSection?.querySelector(".writing-listing-shell");
const writingListing = writingSection?.querySelector(".writing-listing");

const ctx = heroCanvas.getContext("2d");
const heroState = {
  width: 0,
  height: 0,
  pointerX: 0,
  pointerY: 0,
  targetX: 0,
  targetY: 0,
  startedAt: performance.now(),
  blades: [],
  stars: [],
  clouds: [],
  sceneMode: "night",
};

const heroSceneThemes = {
  sunrise: {
    skyStops: [
      [0, "#355885"],
      [0.22, "#627ea0"],
      [0.42, "#8e95a0"],
      [0.5, "#d3af92"],
      [0.6, "#8aa0b5"],
      [0.78, "#35516f"],
      [1, "#0b1d34"],
    ],
    glowStops: [
      [0, [255, 244, 232], 0.42],
      [0.08, [255, 221, 182], 0.24],
      [0.18, [236, 199, 179], 0.14],
      [0.48, [140, 134, 150], 0.08],
      [1, [54, 73, 101], 0],
    ],
    orbColor: [255, 247, 239],
    orbAlpha: 0.82,
    horizonStops: [
      [0, [114, 128, 142], 0],
      [0.28, [145, 155, 165], 0.22],
      [0.42, [196, 167, 152], 0.27],
      [0.53, [221, 160, 130], 0.2],
      [0.7, [108, 126, 150], 0.17],
      [1, [20, 45, 74], 0],
    ],
    fogStops: [
      [0, [93, 105, 119], 0],
      [0.2, [124, 126, 129], 0.24],
      [0.44, [77, 92, 114], 0.34],
      [0.72, [20, 47, 77], 0.44],
      [1, [5, 21, 42], 0],
    ],
    focusX: 0.36,
    focusY: 0.18,
    glowRadius: 0.11,
    starAlpha: 0,
  },
  dusk: {
    skyStops: [
      [0, "#0a3568"],
      [0.22, "#244568"],
      [0.42, "#596878"],
      [0.5, "#867b73"],
      [0.6, "#305073"],
      [0.78, "#0a2f58"],
      [1, "#000814"],
    ],
    glowStops: [
      [0, [255, 237, 216], 0.44],
      [0.08, [255, 207, 156], 0.26],
      [0.18, [226, 171, 142], 0.15],
      [0.48, [136, 128, 146], 0.09],
      [1, [44, 64, 98], 0],
    ],
    orbColor: [255, 246, 236],
    orbAlpha: 0.84,
    horizonStops: [
      [0, [103, 119, 136], 0],
      [0.28, [138, 149, 160], 0.22],
      [0.42, [188, 159, 146], 0.28],
      [0.53, [213, 150, 120], 0.22],
      [0.7, [96, 115, 139], 0.17],
      [1, [20, 45, 74], 0],
    ],
    fogStops: [
      [0, [82, 95, 113], 0],
      [0.2, [111, 116, 123], 0.22],
      [0.44, [68, 84, 108], 0.34],
      [0.72, [17, 42, 74], 0.44],
      [1, [4, 18, 40], 0],
    ],
    focusX: 0.35,
    focusY: 0.17,
    glowRadius: 0.1,
    starAlpha: 0,
  },
  night: {
    skyStops: [
      [0, "#0a1f6a"],
      [0.22, "#102a7a"],
      [0.44, "#14307d"],
      [0.58, "#0f2668"],
      [0.76, "#08194a"],
      [1, "#010713"],
    ],
    glowStops: [
      [0, [248, 250, 255], 0.46],
      [0.08, [226, 233, 255], 0.28],
      [0.22, [126, 137, 191], 0.14],
      [0.52, [29, 48, 108], 0.08],
      [1, [8, 18, 54], 0],
    ],
    orbColor: [244, 247, 255],
    orbAlpha: 0.9,
    horizonStops: [
      [0, [64, 84, 142], 0],
      [0.26, [70, 90, 154], 0.16],
      [0.42, [91, 89, 146], 0.2],
      [0.54, [154, 146, 192], 0.1],
      [0.7, [36, 61, 129], 0.16],
      [1, [10, 23, 58], 0],
    ],
    fogStops: [
      [0, [52, 68, 112], 0],
      [0.2, [60, 76, 120], 0.22],
      [0.44, [31, 48, 93], 0.34],
      [0.72, [8, 23, 58], 0.5],
      [1, [1, 9, 24], 0],
    ],
    focusX: 0.36,
    focusY: 0.18,
    glowRadius: 0.11,
    starAlpha: 1,
  },
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

const homeTileState = {
  current: 0,
  target: 0,
  frame: 0,
  tiles: [],
};

function smoothstep(value) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function setupHomeMosaic() {
  if (!homeGrid) {
    return;
  }

  const columns = 9;
  const rows = 5;
  const levelTwo = new Set([
    "0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6", "0-7", "0-8",
    "1-0", "1-1", "1-3",
    "2-0", "2-1",
    "3-0", "3-1", "3-3",
    "4-3", "4-5", "4-6", "4-7",
  ]);
  const levelThree = new Set([
    ...levelTwo,
    "2-3", "2-4", "2-5", "2-6", "2-7", "2-8",
    "3-4", "3-5", "3-6", "3-7", "3-8",
    "4-4", "4-8",
  ]);

  const tileMarkup = [];
  homeTileState.tiles = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const key = `${row}-${column}`;
      const index = row * columns + column;
      const axis = (row + column) % 3 === 0 ? "x" : "y";
      const direction = (row + column) % 2 === 0 ? 1 : -1;
      const delay = (((row * 3 + column * 5) % 11) / 10) * 0.18;

      tileMarkup.push(`
        <span class="home-tile home-tile--flip-${axis}" style="--tile-bg-x: ${(column / (columns - 1)) * 100}%; --tile-bg-y: ${(row / (rows - 1)) * 100}%;">
          <span class="home-tile__inner">
            <span class="home-tile__face home-tile__face--front"></span>
            <span class="home-tile__face home-tile__face--back"></span>
          </span>
        </span>
      `);

      homeTileState.tiles.push({
        axis,
        delay,
        direction,
        index,
        mobileInitial: key === "3-1" ? 1 : 0,
        levelTwo: levelTwo.has(key) ? 1 : 0,
        levelThree: levelThree.has(key) ? 1 : 0,
      });
    }
  }

  homeGrid.innerHTML = tileMarkup.join("");

  homeTileState.tiles.forEach((tile, index) => {
    tile.node = homeGrid.children[index];
    tile.inner = tile.node.querySelector(".home-tile__inner");
  });

  renderHomeMosaic(0);
}

function getHomeMosaicProgress() {
  if (!homeMosaic) {
    return 0;
  }

  const rect = homeMosaic.getBoundingClientRect();
  const scrollable = Math.max(1, homeMosaic.offsetHeight - window.innerHeight);
  return clamp(-rect.top / scrollable, 0, 1);
}

function getTileTurn(tile, progress) {
  const isCompactMosaic = window.innerWidth <= 1180;
  const firstSegment = progress <= 0.5;
  const segmentProgress = firstSegment ? progress / 0.5 : (progress - 0.5) / 0.5;
  const from = firstSegment
    ? (isCompactMosaic ? tile.mobileInitial : 0)
    : tile.levelTwo;
  const to = firstSegment ? tile.levelTwo : tile.levelThree;

  if (from === to) {
    return to;
  }

  const eased = smoothstep((segmentProgress - tile.delay) / (1 - 0.18));
  return from + (to - from) * eased;
}

function renderHomeMosaic(progress, copyProgress = progress) {
  if (!homeGrid || !homeTileState.tiles.length) {
    return;
  }

  if (window.innerWidth <= 1180) {
    const stageOne = { x: 48, y: 118, scale: 1.44 };
    const stageTwo = { x: 48, y: 118, scale: 1.44 };
    const stageThree = { x: -514, y: 148, scale: 1.48 };
    const firstHalf = progress <= 0.52;
    const stageProgress = firstHalf
      ? smoothstep(progress / 0.52)
      : smoothstep((progress - 0.52) / 0.48);
    const from = firstHalf ? stageOne : stageTwo;
    const to = firstHalf ? stageTwo : stageThree;

    homeMosaic.style.setProperty("--home-grid-x", `${lerp(from.x, to.x, stageProgress).toFixed(1)}px`);
    homeMosaic.style.setProperty("--home-grid-y", `${lerp(from.y, to.y, stageProgress).toFixed(1)}px`);
    homeMosaic.style.setProperty("--home-grid-scale", lerp(from.scale, to.scale, stageProgress).toFixed(3));
  } else {
    homeMosaic.style.setProperty("--home-grid-x", "0px");
    homeMosaic.style.setProperty("--home-grid-y", "0px");
    homeMosaic.style.setProperty("--home-grid-scale", "1");
  }

  const leftIn = smoothstep((copyProgress - 0.14) / 0.26);
  const leftOut = smoothstep((copyProgress - 0.58) / 0.18);
  const centerIn = smoothstep((copyProgress - 0.62) / 0.28);
  const leftOpacity = leftIn * (1 - leftOut);

  homeMosaic.style.setProperty("--home-left-opacity", leftOpacity.toFixed(3));
  homeMosaic.style.setProperty("--home-center-opacity", centerIn.toFixed(3));

  homeTileState.tiles.forEach((tile) => {
    const turn = getTileTurn(tile, progress);
    const rotation = `${turn * 180 * tile.direction}deg`;
    tile.inner.style.setProperty("--tile-rotation", rotation);
  });
}

function animateHomeMosaic() {
  const easing = reduceMotion ? 1 : 0.22;
  homeTileState.current += (homeTileState.target - homeTileState.current) * easing;
  renderHomeMosaic(homeTileState.current, homeTileState.target);

  if (Math.abs(homeTileState.target - homeTileState.current) > 0.001 && !reduceMotion) {
    homeTileState.frame = window.requestAnimationFrame(animateHomeMosaic);
    return;
  }

  homeTileState.current = homeTileState.target;
  renderHomeMosaic(homeTileState.current, homeTileState.target);
  homeTileState.frame = 0;
}

function updateHomeMosaic() {
  if (!homeMosaic) {
    return;
  }

  homeTileState.target = getHomeMosaicProgress();

  if (reduceMotion) {
    homeTileState.current = homeTileState.target;
    renderHomeMosaic(homeTileState.target);
    return;
  }

  if (!homeTileState.frame) {
    homeTileState.frame = window.requestAnimationFrame(animateHomeMosaic);
  }
}

function mixTriplet(start, end, amount) {
  return start.map((value, index) =>
    Math.round(value + (end[index] - value) * amount)
  );
}

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

  root.style.setProperty("--scroll-progress", String(progress));
  document.body.classList.toggle("is-top-of-page", window.scrollY < 18);
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  updateHomeMosaic();
  updateShowcaseMode();
  updateWritingScrollSync();
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

function resetWritingScrollSync() {
  if (!writingSection || !writingListing || !writingListingShell) {
    return;
  }

  writingSection.classList.remove("writing--scroll-sync");
  writingSection.style.removeProperty("min-height");
  writingSection.style.removeProperty("--writing-shell-height");
  writingSection.style.removeProperty("--writing-sticky-top");
  writingListing.style.removeProperty("transform");
  writingListingShell.style.removeProperty("height");
}

function updateWritingScrollSync() {
  if (!writingSection || !writingStack || !writingShowcase || !writingListingShell || !writingListing) {
    return;
  }

  if (window.innerWidth <= 1180) {
    resetWritingScrollSync();
    return;
  }

  const items = Array.from(writingListing.querySelectorAll(".writing-listing__item"));
  if (items.length <= 3) {
    resetWritingScrollSync();
    return;
  }

  const gap = parseFloat(getComputedStyle(writingListing).rowGap || getComputedStyle(writingListing).gap || "0");
  const visibleItems = items.slice(0, 3);
  const shellHeight =
    visibleItems.reduce((total, item) => total + item.offsetHeight, 0) +
    gap * Math.max(0, visibleItems.length - 1);
  const scrollDistance = Math.max(0, writingListing.scrollHeight - shellHeight);
  const stickyTop = Math.round(clamp(window.innerHeight * 0.12, 88, 132));
  const stackHeight = Math.max(writingShowcase.offsetHeight, shellHeight);
  const sectionHeight = stackHeight + stickyTop + scrollDistance;
  const rect = writingSection.getBoundingClientRect();
  const progress = scrollDistance > 0 ? clamp((stickyTop - rect.top) / scrollDistance, 0, 1) : 0;

  writingSection.classList.add("writing--scroll-sync");
  writingSection.style.setProperty("--writing-shell-height", `${shellHeight}px`);
  writingSection.style.setProperty("--writing-sticky-top", `${stickyTop}px`);
  writingSection.style.minHeight = `${sectionHeight}px`;
  writingListingShell.style.height = `${shellHeight}px`;
  writingListing.style.transform = `translateY(${-scrollDistance * progress}px)`;
}

function resizeHeroCanvas() {
  const rect = heroCanvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  heroState.width = rect.width;
  heroState.height = rect.height;

  heroCanvas.width = Math.round(rect.width * dpr);
  heroCanvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createHeroBlades();
  createHeroStars();
  createHeroClouds();

  if (!heroState.pointerX || !heroState.pointerY) {
    heroState.pointerX = rect.width * 0.34;
    heroState.pointerY = rect.height * 0.18;
    heroState.targetX = heroState.pointerX;
    heroState.targetY = heroState.pointerY;
  }
}

function createHeroStars() {
  const { width, height } = heroState;
  const stars = [];
  const count = Math.max(36, Math.floor(width / 18));

  for (let index = 0; index < count; index += 1) {
    stars.push({
      x: seededNoise(index + 1300) * width,
      y: seededNoise(index + 1400) * height * 0.34,
      radius: 0.35 + seededNoise(index + 1500) * 1.2,
      alpha: 0.2 + seededNoise(index + 1600) * 0.48,
      twinkle: seededNoise(index + 1700) * Math.PI * 2,
    });
  }

  heroState.stars = stars;
}

function createHeroClouds() {
  const { width, height } = heroState;
  const clouds = [];
  const count = Math.max(4, Math.floor(width / 320));

  for (let index = 0; index < count; index += 1) {
    clouds.push({
      x: width * (0.08 + seededNoise(index + 1800) * 0.84),
      y: height * (0.12 + seededNoise(index + 1900) * 0.16),
      radiusX: width * (0.1 + seededNoise(index + 2000) * 0.08),
      radiusY: height * (0.028 + seededNoise(index + 2100) * 0.024),
      alpha: 0.06 + seededNoise(index + 2200) * 0.08,
      drift: seededNoise(index + 2300) * Math.PI * 2,
    });
  }

  heroState.clouds = clouds;
}

function setHeroSceneMode(mode) {
  if (!heroSceneThemes[mode]) {
    return;
  }

  heroState.sceneMode = mode;
  sceneModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.sceneMode === mode);
  });

  if (reduceMotion) {
    drawHero(performance.now());
  }
}

function seededNoise(index) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function cubicPoint(start, controlA, controlB, end, t) {
  const inverse = 1 - t;
  const inverseSquared = inverse * inverse;
  const tSquared = t * t;

  return {
    x:
      inverseSquared * inverse * start.x +
      3 * inverseSquared * t * controlA.x +
      3 * inverse * tSquared * controlB.x +
      tSquared * t * end.x,
    y:
      inverseSquared * inverse * start.y +
      3 * inverseSquared * t * controlA.y +
      3 * inverse * tSquared * controlB.y +
      tSquared * t * end.y,
  };
}

function cubicTangent(start, controlA, controlB, end, t) {
  const inverse = 1 - t;

  return {
    x:
      3 * inverse * inverse * (controlA.x - start.x) +
      6 * inverse * t * (controlB.x - controlA.x) +
      3 * t * t * (end.x - controlB.x),
    y:
      3 * inverse * inverse * (controlA.y - start.y) +
      6 * inverse * t * (controlB.y - controlA.y) +
      3 * t * t * (end.y - controlB.y),
  };
}

function traceSmoothPath(context, points, move = true) {
  if (!points.length) {
    return;
  }

  if (move) {
    context.moveTo(points[0].x, points[0].y);
  } else {
    context.lineTo(points[0].x, points[0].y);
  }

  if (points.length === 1) {
    return;
  }

  for (let index = 1; index < points.length - 1; index += 1) {
    const next = points[index + 1];
    const midX = (points[index].x + next.x) / 2;
    const midY = (points[index].y + next.y) / 2;

    context.quadraticCurveTo(points[index].x, points[index].y, midX, midY);
  }

  const penultimate = points[points.length - 2];
  const last = points[points.length - 1];
  context.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
}

function createHeroBlades() {
  const { width, height } = heroState;
  const blades = [];
  const sampleBand = (seed, center, spread, min = -0.12, max = 1.12) =>
    clamp(center + (seededNoise(seed) - 0.5) * spread, min, max);
  const pushBlade = (seed, layer, xNorm, massBias = 0, options = {}) => {
    const layerDepth = [0.16, 0.32, 0.62, 1][layer];
    const baseYMin = [0.49, 0.58, 0.73, 0.89][layer];
    const baseYRange = [0.05, 0.08, 0.12, 0.16][layer];
    const heightMin = [0.05, 0.11, 0.2, 0.42][layer];
    const heightRange = [0.05, 0.12, 0.2, 0.32][layer];
    const widthMin = [0.22, 0.5, 1.2, 3.4][layer];
    const widthRange = [0.18, 0.48, 1.4, 4.6][layer];
    const leanMin = [3, 8, 16, 26][layer];
    const leanRange = [7, 14, 24, 38][layer];
    const rightWeight = clamp((xNorm - 0.52) / 0.48, 0, 1);
    const direction =
      layer >= 2 && xNorm > 0.64
        ? -1
        : xNorm < 0.12
          ? 1
          : seededNoise(seed + 12) > 0.7
            ? -1
            : 1;
    const lean =
      (leanMin + seededNoise(seed + 4) * leanRange) *
      direction *
      (0.88 + rightWeight * 0.18 + massBias * 0.16);
    const fullness = 0.92 + seededNoise(seed + 9) * 0.34 + layerDepth * 0.1 + massBias * 0.08;

    blades.push({
      x: width * xNorm,
      layer,
      depth: layerDepth,
      baseY:
        height *
        (baseYMin +
          seededNoise(seed + 1) * baseYRange +
          rightWeight * layerDepth * 0.1 +
          massBias * 0.04),
      height:
        height *
        (heightMin + seededNoise(seed + 2) * heightRange) *
        (0.9 + layerDepth * 0.26 + rightWeight * 0.18 + massBias * 0.1) *
        0.7 *
        (options.heightScale || 1),
      width:
        (widthMin + seededNoise(seed + 3) * widthRange) *
        (1.02 + layerDepth * 0.32 + massBias * 0.18) *
        (options.widthScale || 1),
      lean,
      curve: lean * (0.18 + seededNoise(seed + 13) * 0.22),
      phase: seededNoise(seed + 5) * Math.PI * 2,
      alpha:
        (0.06 + seededNoise(seed + 6) * (0.08 + layerDepth * 0.18)) *
        (0.98 + rightWeight * 0.14 + massBias * 0.1),
      sway: 1.2 + layerDepth * 10.6,
      bend: 0.16 + seededNoise(seed + 7) * 0.18,
      belly: 0.44 + seededNoise(seed + 14) * 0.16,
      shoulder: 0.72 + seededNoise(seed + 15) * 0.12,
      fullness,
      tipRound: 0.16 + seededNoise(seed + 8) * 0.16,
      tint: seededNoise(seed + 10),
      asymmetry: (seededNoise(seed + 11) - 0.5) * 0.32,
      silhouette: Boolean(options.silhouette),
    });
  };

  const farCount = Math.max(50, Math.floor(width / 26));
  const mistCount = Math.max(36, Math.floor(width / 34));
  const midCount = Math.max(32, Math.floor(width / 42));
  const frontCount = Math.max(26, Math.floor(width / 56));

  for (let index = 0; index < farCount; index += 1) {
    const band = seededNoise(index + 11);
    const xNorm =
      band < 0.18
        ? sampleBand(index + 12, 0.12, 0.22)
        : band < 0.46
          ? sampleBand(index + 13, 0.34, 0.28)
          : band < 0.74
            ? sampleBand(index + 14, 0.62, 0.3)
            : sampleBand(index + 15, 0.86, 0.24);
    pushBlade(index + 100, 0, xNorm, band > 0.62 ? 0.1 : 0);
  }

  for (let index = 0; index < mistCount; index += 1) {
    const band = seededNoise(index + 101);
    const xNorm =
      band < 0.16
        ? sampleBand(index + 102, 0.16, 0.18)
        : band < 0.38
          ? sampleBand(index + 103, 0.38, 0.22)
          : band < 0.66
            ? sampleBand(index + 104, 0.66, 0.24)
            : sampleBand(index + 105, 0.88, 0.18);
    pushBlade(index + 220, 1, xNorm, clamp((xNorm - 0.52) / 0.48, 0, 1) * 0.42);
  }

  for (let index = 0; index < midCount; index += 1) {
    const band = seededNoise(index + 201);
    const xNorm =
      band < 0.12
        ? sampleBand(index + 202, 0.24, 0.18)
        : band < 0.32
          ? sampleBand(index + 203, 0.5, 0.2)
          : band < 0.62
            ? sampleBand(index + 204, 0.74, 0.22)
            : sampleBand(index + 205, 0.92, 0.18);
    pushBlade(index + 360, 2, xNorm, 0.14 + clamp((xNorm - 0.38) / 0.62, 0, 1) * 0.42);
  }

  for (let index = 0; index < frontCount; index += 1) {
    if (index < 2) {
      const xNorm = sampleBand(index + 301, -0.02, 0.16, -0.14, 0.16);
      pushBlade(index + 520, 3, xNorm, 0.22);
      continue;
    }

    if (index < 4) {
      const xNorm = sampleBand(index + 302, 0.32, 0.18, 0.12, 0.48);
      pushBlade(index + 520, 3, xNorm, 0.3);
      continue;
    }

    const band = seededNoise(index + 303);
    const xNorm =
      band < 0.18
        ? sampleBand(index + 304, 0.62, 0.12, 0.52, 0.74)
        : band < 0.54
          ? sampleBand(index + 305, 0.78, 0.16, 0.64, 0.94)
          : sampleBand(index + 306, 0.98, 0.18, 0.82, 1.16);
    pushBlade(index + 520, 3, xNorm, 0.62 + clamp((xNorm - 0.58) / 0.42, 0, 1) * 0.5);
  }

  for (let index = 0; index < 7; index += 1) {
    const leftNorm = sampleBand(index + 820, -0.02, 0.14, -0.16, 0.14);
    pushBlade(index + 880, 3, leftNorm, 0.78, {
      silhouette: true,
      heightScale: 1.18,
      widthScale: 1.26,
    });
  }

  for (let index = 0; index < 10; index += 1) {
    const rightNorm = sampleBand(index + 920, 0.9, 0.22, 0.72, 1.18);
    pushBlade(index + 980, 3, rightNorm, 0.92, {
      silhouette: true,
      heightScale: 1.24,
      widthScale: 1.28,
    });
  }

  heroState.blades = blades
    .filter((blade) => blade.x > -width * 0.24 && blade.x < width * 1.24)
    .sort((a, b) => a.layer - b.layer || a.baseY - b.baseY);
}

function drawHero(time) {
  const { width, height } = heroState;
  const elapsed = Math.max(0, time - heroState.startedAt);
  const intro = clamp(elapsed / 2600, 0, 1);
  const theme = heroSceneThemes[heroState.sceneMode] || heroSceneThemes.night;
  const breeze = 0.5 + Math.sin(time * 0.00032) * 0.5;

  heroState.pointerX += (heroState.targetX - heroState.pointerX) * 0.09;
  heroState.pointerY += (heroState.targetY - heroState.pointerY) * 0.09;

  const focusX = width * theme.focusX;
  const focusY = height * theme.focusY;
  const windWave =
    Math.sin(time * 0.00018 + Math.sin(time * 0.00006 + 0.8) * 0.9) * 0.78 +
    Math.sin(time * 0.00009 + 1.6) * 0.22;
  const sustainedWind = Math.sign(windWave || 1) * Math.pow(Math.abs(windWave), 1.35);
  const gustPulse = 0.55 + (Math.sin(time * 0.00044 + 0.7) * 0.5 + 0.5) * 0.45;
  const fieldDrift = sustainedWind * (11.5 + gustPulse * 8.4);

  ctx.clearRect(0, 0, width, height);

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  theme.skyStops.forEach(([stop, color]) => {
    sky.addColorStop(stop, color);
  });
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  if (theme.starAlpha > 0) {
    heroState.stars.forEach((star, index) => {
      const twinkle = 0.76 + Math.sin(time * 0.0012 + star.twinkle + index * 0.13) * 0.24;
      ctx.fillStyle = `rgba(232, 238, 255, ${star.alpha * twinkle * theme.starAlpha * intro})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  if (heroState.sceneMode === "sunrise") {
    heroState.clouds.forEach((cloud, index) => {
      const driftX = Math.sin(time * 0.00008 + cloud.drift + index * 0.2) * width * 0.008;
      const cloudGradient = ctx.createRadialGradient(
        cloud.x + driftX,
        cloud.y,
        cloud.radiusY * 0.18,
        cloud.x + driftX,
        cloud.y,
        cloud.radiusX
      );
      cloudGradient.addColorStop(0, `rgba(244, 237, 233, ${cloud.alpha * intro})`);
      cloudGradient.addColorStop(0.5, `rgba(220, 215, 221, ${cloud.alpha * 0.72 * intro})`);
      cloudGradient.addColorStop(1, "rgba(184, 187, 205, 0)");
      ctx.fillStyle = cloudGradient;
      ctx.beginPath();
      ctx.ellipse(
        cloud.x + driftX,
        cloud.y,
        cloud.radiusX,
        cloud.radiusY,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  }

  const sunBloom = ctx.createRadialGradient(
    focusX,
    focusY,
    0,
    focusX,
    focusY,
    width * (theme.glowRadius + intro * 0.08)
  );
  theme.glowStops.forEach(([stop, rgb, alpha]) => {
    sunBloom.addColorStop(
      stop,
      `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha + intro * Math.min(alpha, 0.16)})`
    );
  });
  ctx.fillStyle = sunBloom;
  ctx.fillRect(0, 0, width, height);

  const horizonMist = ctx.createLinearGradient(0, height * 0.34, 0, height * 0.62);
  theme.horizonStops.forEach(([stop, rgb, alpha]) => {
    horizonMist.addColorStop(
      stop,
      `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha ? intro * alpha : 0})`
    );
  });
  ctx.fillStyle = horizonMist;
  ctx.fillRect(0, height * 0.33, width, height * 0.31);

  const groundFog = ctx.createLinearGradient(0, height * 0.43, 0, height * 0.74);
  theme.fogStops.forEach(([stop, rgb, alpha]) => {
    groundFog.addColorStop(
      stop,
      `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha ? intro * alpha : 0})`
    );
  });
  ctx.fillStyle = groundFog;
  ctx.fillRect(0, height * 0.4, width, height * 0.36);

  ctx.fillStyle = `rgba(${theme.orbColor[0]}, ${theme.orbColor[1]}, ${theme.orbColor[2]}, ${intro * theme.orbAlpha})`;
  ctx.beginPath();
  ctx.arc(focusX, focusY, Math.max(4, width * 0.005), 0, Math.PI * 2);
  ctx.fill();

  heroState.blades.forEach((blade, index) => {
    const layerDepth = blade.depth;
    const flutter =
      Math.sin(time * (0.00034 + layerDepth * 0.00007) + blade.phase) *
      blade.sway *
      (0.1 + layerDepth * 0.06 + breeze * 0.04);
    const sway = flutter + fieldDrift * (1.24 + layerDepth * 2.85);
    const rise = (1 - intro) * height * (0.05 + layerDepth * 0.16);
    const baseX = blade.x + fieldDrift * layerDepth * 1.22;
    const baseY = blade.baseY + rise;
    const tipX = baseX + blade.lean + sway;
    const tipY = baseY - blade.height;
    const controlA = {
      x:
        baseX +
        blade.lean * (0.12 + blade.bend * 0.08) +
        sway * 0.16,
      y: baseY - blade.height * (0.26 + blade.bend * 0.04),
    };
    const controlB = {
      x:
        baseX +
        blade.lean * (0.64 + blade.bend * 0.08) +
        blade.curve +
        sway * 0.42,
      y: baseY - blade.height * blade.shoulder,
    };
    const sampleCount = blade.layer === 3 ? 12 : blade.layer === 2 ? 10 : 8;
    const leftEdge = [];
    const rightEdge = [];
    const alpha = clamp(blade.alpha * intro, 0, blade.layer === 3 ? 1 : 0.9);
    const fadeEndY = Math.max(tipY + 1, Math.min(baseY, height * 0.92));
    const topPalette = blade.silhouette ? [
      [34, 46, 68],
      [18, 28, 48],
      [8, 15, 30],
      [2, 4, 10],
    ] : [
      [146, 164, 198],
      [119, 145, 194],
      [78, 115, 182],
      [30, 64, 132],
    ];
    const midPalette = blade.silhouette ? [
      [18, 28, 48],
      [10, 16, 31],
      [3, 7, 16],
      [1, 2, 6],
    ] : [
      [111, 129, 164],
      [80, 106, 156],
      [38, 72, 136],
      [11, 30, 79],
    ];
    const rootPalette = blade.silhouette ? [
      [10, 16, 31],
      [4, 8, 18],
      [1, 3, 8],
      [0, 0, 0],
    ] : [
      [84, 100, 137],
      [38, 60, 111],
      [9, 27, 76],
      [0, 4, 20],
    ];
    const topTone = mixTriplet(topPalette[blade.layer], midPalette[blade.layer], blade.tint * 0.42);
    const midTone = mixTriplet(midPalette[blade.layer], rootPalette[blade.layer], blade.tint * 0.3);
    const rootTone = mixTriplet(rootPalette[blade.layer], [0, 0, 1], blade.layer / 3);
    const bladeGradient = ctx.createLinearGradient(baseX, tipY, baseX, fadeEndY);

    for (let step = 0; step <= sampleCount; step += 1) {
      const t = step / sampleCount;
      const point = cubicPoint(
        { x: baseX, y: baseY },
        controlA,
        controlB,
        { x: tipX, y: tipY },
        t
      );
      const tangent = cubicTangent(
        { x: baseX, y: baseY },
        controlA,
        controlB,
        { x: tipX, y: tipY },
        t
      );
      const tangentLength = Math.hypot(tangent.x, tangent.y) || 1;
      const normalX = -tangent.y / tangentLength;
      const normalY = tangent.x / tangentLength;
      const bodyCurve = Math.pow(Math.sin(Math.PI * t), 0.56);
      const bellyLift = 1 - Math.min(1, Math.abs(t - blade.belly) / 0.58);
      const baseTuck = t < 0.16 ? 0.42 + (t / 0.16) * 0.58 : 1;
      const tipTaper =
        t > 0.8 ? 1 - ((t - 0.8) / 0.2) * (0.82 - blade.tipRound * 0.44) : 1;
      const roundCap = t > 0.88 ? 1 - ((t - 0.88) / 0.12) * 0.36 : 1;
      const radius =
        blade.width *
        (0.12 + bodyCurve * (0.74 + blade.fullness * 0.16 + bellyLift * 0.14)) *
        baseTuck *
        tipTaper *
        roundCap;
      const asymmetry = blade.asymmetry || 0;
      const leftRadius = radius * (1 + Math.max(0, asymmetry));
      const rightRadius = radius * (1 + Math.max(0, -asymmetry));

      leftEdge.push({
        x: point.x + normalX * leftRadius,
        y: point.y + normalY * leftRadius,
      });
      rightEdge.unshift({
        x: point.x - normalX * rightRadius,
        y: point.y - normalY * rightRadius,
      });
    }

    bladeGradient.addColorStop(
      0,
      `rgba(${topTone[0]}, ${topTone[1]}, ${topTone[2]}, ${alpha * 0.66})`
    );
    bladeGradient.addColorStop(
      0.48,
      `rgba(${midTone[0]}, ${midTone[1]}, ${midTone[2]}, ${alpha * 0.96})`
    );
    bladeGradient.addColorStop(
      0.7,
      `rgba(${rootTone[0]}, ${rootTone[1]}, ${rootTone[2]}, ${alpha * 0.96})`
    );
    bladeGradient.addColorStop(
      0.82,
      `rgba(${rootTone[0]}, ${rootTone[1]}, ${rootTone[2]}, ${alpha * 0.58})`
    );
    bladeGradient.addColorStop(
      0.92,
      `rgba(${rootTone[0]}, ${rootTone[1]}, ${rootTone[2]}, ${alpha * 0.08})`
    );
    bladeGradient.addColorStop(
      1,
      `rgba(${rootTone[0]}, ${rootTone[1]}, ${rootTone[2]}, 0)`
    );

    ctx.fillStyle = bladeGradient;
    ctx.beginPath();
    traceSmoothPath(ctx, leftEdge);
    traceSmoothPath(ctx, rightEdge, false);
    ctx.closePath();
    ctx.fill();

    if (index % 21 === 0 && blade.layer === 0) {
      const strokeGradient = ctx.createLinearGradient(baseX, tipY, baseX, fadeEndY);
      strokeGradient.addColorStop(0, `rgba(160, 170, 182, ${0.012 * intro * layerDepth})`);
      strokeGradient.addColorStop(0.68, `rgba(81, 99, 120, ${0.008 * intro * layerDepth})`);
      strokeGradient.addColorStop(1, `rgba(5, 18, 40, ${0.004 * intro * layerDepth})`);
      ctx.strokeStyle = strokeGradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.bezierCurveTo(controlA.x, controlA.y, controlB.x, controlB.y, tipX, tipY);
      ctx.stroke();
    }
  });

  const edgeShade = ctx.createLinearGradient(width * 0.62, 0, width, 0);
  edgeShade.addColorStop(0, "rgba(0, 0, 0, 0)");
  edgeShade.addColorStop(1, `rgba(0, 0, 0, ${0.1 + intro * 0.04})`);
  ctx.fillStyle = edgeShade;
  ctx.fillRect(width * 0.58, 0, width * 0.42, height);
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
    { threshold: 0.05 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupProjectNav() {
  if (!projectNavLinks.length) {
    return;
  }

  const navItems = Array.from(projectNavLinks)
    .map((link) => {
      const href = link.getAttribute("href");
      const target =
        href === "#work"
          ? document.querySelector(".projects-panel--live")
          : document.querySelector(href);

      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (!navItems.length) {
    return;
  }

  let ticking = false;

  const updateActive = () => {
    const marker = window.scrollY + window.innerHeight * 0.62;
    let activeItem = navItems[0];

    navItems.forEach((item) => {
      const top = item.target.getBoundingClientRect().top + window.scrollY;
      if (top <= marker) {
        activeItem = item;
      }
    });

    navItems.forEach((item) => {
      item.link.classList.toggle("is-active", item === activeItem);
    });

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateActive);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  updateActive();
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
  const imageCard = ({ modifier, src, alt, height, caption = "" }) => `
    <article class="smartfunds-mosaic__tile smartfunds-mosaic__tile--image ${modifier}">
      <img class="smartfunds-mosaic__image" src="${src}" alt="${alt}" width="848" height="${height}" loading="lazy" />
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
            loop
            preload="none"
            data-ambient-video
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
      height: 492,
    }),
    stories: imageCard({
      modifier: "smartfunds-mosaic__card--stories",
      src: assets.stories,
      alt: "Social mutual funds stories card",
      height: 510,
    }),
    strategyAI: imageCard({
      modifier: "smartfunds-mosaic__card--strategy-ai",
      src: assets.ai,
      alt: "AI mutual funds strategy card",
      height: 1286,
    }),
    kinds: imageCard({
      modifier: "smartfunds-mosaic__card--kinds",
      src: assets.kinds,
      alt: "Smart mutual funds recommendation card",
      height: 934,
    }),
    brand: imageCard({
      modifier: "smartfunds-mosaic__card--sf",
      src: assets.sf,
      alt: "Smart Funds brand card",
      height: 510,
    }),
    know: imageCard({
      modifier: "smartfunds-mosaic__card--know",
      src: assets.read,
      alt: "Know better mutual funds information card",
      height: 1278,
    }),
    health: imageCard({
      modifier: "smartfunds-mosaic__card--health",
      src: assets.health,
      alt: "Portfolio health card",
      height: 1322,
    }),
    investments: videoCard({
      modifier: "smartfunds-mosaic__card--investments",
      src: assets.investmentsVideo,
    }),
    strategy: imageCard({
      modifier: "smartfunds-mosaic__card--strategy",
      src: assets.strategy,
      alt: "Mutual funds strategy media card",
      height: 1078,
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
          width="851"
          height="1200"
          loading="lazy"
        />
      </a>
    </article>
  `;
}

function TabsProject({ title, ctaLink, accentClass, assets }) {
  const imageCard = ({ modifier, src, alt, height }) => `
    <article class="tabs-mosaic__tile tabs-mosaic__tile--image ${modifier}">
      <img class="tabs-mosaic__image" src="${src}" alt="${alt}" width="848" height="${height}" loading="lazy" />
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
            loop
            preload="none"
            data-ambient-video
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
            height: 900,
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--summary",
            src: assets.summary,
            alt: "Summary card",
            height: 1134,
          })}
        </div>

        <div class="tabs-mosaic__column tabs-mosaic__column--center">
          ${imageCard({
            modifier: "tabs-mosaic__card--conversational",
            src: assets.conversational,
            alt: "Conversational UI card",
            height: 1286,
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--brand",
            src: assets.brand,
            alt: "Tabs brand tile",
            height: 510,
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--friends",
            src: assets.friends,
            alt: "Friends reminders and breakup card",
            height: 1490,
          })}
        </div>

        <div class="tabs-mosaic__column tabs-mosaic__column--right">
          ${imageCard({
            modifier: "tabs-mosaic__card--settle",
            src: assets.settle,
            alt: "Settle up card",
            height: 1006,
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--recent",
            src: assets.recent,
            alt: "Recent transactions card",
            height: 1286,
          })}
          ${imageCard({
            modifier: "tabs-mosaic__card--accessibility",
            src: assets.accessibility,
            alt: "Accessibility standards card",
            height: 1040,
          })}
        </div>
      </div>

      <div class="tabs-mobile-hero" aria-label="${title} mobile hero">
        <img
          class="tabs-mobile-hero__image"
          src="${assets.mobileHero}"
          alt="${title} showcase"
          width="851"
          height="1200"
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
          width="1600"
          height="830"
          loading="lazy"
        />
      </a>
    </article>
  `;
}

function FigmaPluginProject({ title, ctaLink, assets }) {
  return `
    <article class="personal-project personal-project--mosaic personal-project--figma-plugin">
      <a
        class="community-card"
        href="${ctaLink}"
        target="_blank"
        rel="noreferrer"
        data-cursor="open"
        aria-label="${title}"
      >
        <picture>
          <source media="(max-width: 720px)" srcset="${assets.mobile}" />
          <img
            class="community-card__image"
            src="${assets.desktop}"
            alt="${title}"
            width="1800"
            height="679"
            loading="lazy"
          />
        </picture>
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

  if (layout === "figma-plugin") {
    return FigmaPluginProject({
      title,
      ctaLink,
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
                  loop
                  preload="metadata"
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
    {
      layout: "figma-plugin",
      title: "Design Guardian",
      ctaLink:
        "https://www.figma.com/files/team/1496706296472899329/resources/community/plugin/1613133647814585684?q_id=f575a261-1ce0-44bc-9021-dd78bca0c5c5",
      assets: {
        desktop: "./assets/showcase/figma-community-desktop.png",
        mobile: "./assets/showcase/figma-community-mobile.png",
      },
    },
  ];

  personalProjectsList.innerHTML = projects.map(PersonalProject).join("");
}

function setupAmbientProjectVideos() {
  const videos = Array.from(document.querySelectorAll("[data-ambient-video]"));

  if (!videos.length) {
    return;
  }

  videos.forEach((video) => {
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.preload = "none";
  });

  const playVideo = (video) => {
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    videos.forEach((video) => {
      video.load();
      if (!reduceMotion) {
        playVideo(video);
      }
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          if (video.readyState === 0) {
            video.load();
          }
          playVideo(video);
          return;
        }

        video.pause();
      });
    },
    {
      rootMargin: "360px 0px",
      threshold: 0.01,
    }
  );

  videos.forEach((video) => observer.observe(video));
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
    video.preload = "metadata";
    video.autoplay = false;
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
  if (homeMosaic) {
    return;
  }

  const rect = heroSection.getBoundingClientRect();
  heroState.targetX = event.clientX - rect.left;
  heroState.targetY = event.clientY - rect.top;

  if (reduceMotion) {
    drawHero(performance.now());
  }
});

heroSection.addEventListener("pointerleave", () => {
  if (homeMosaic) {
    return;
  }

  heroState.targetX = heroState.width * 0.34;
  heroState.targetY = heroState.height * 0.18;

  if (reduceMotion) {
    drawHero(performance.now());
  }
});

window.addEventListener("resize", () => {
  if (!homeMosaic) {
    resizeHeroCanvas();
  }

  updateScrollProgress();

  if (reduceMotion && !homeMosaic) {
    drawHero(performance.now());
  }
});

window.addEventListener("scroll", updateScrollProgress, { passive: true });

sceneModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setHeroSceneMode(button.dataset.sceneMode || "night");
  });
});

year.textContent = new Date().getFullYear();
setupHomeMosaic();
renderPersonalProjects();
updateScrollProgress();
if (!homeMosaic) {
  resizeHeroCanvas();
  setHeroSceneMode(heroState.sceneMode);
}
setupRevealObserver();
setupCursor();
setupAmbientProjectVideos();
setupPersonalProjects();
setupProjectNav();

if (homeMosaic) {
  updateHomeMosaic();
} else if (reduceMotion) {
  drawHero(performance.now());
} else {
  window.requestAnimationFrame(animateHero);
}
