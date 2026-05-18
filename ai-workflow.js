import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "https://esm.sh/framer-motion@11.18.2?deps=react@18.3.1";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);
const workflowRoot = document.getElementById("ai-workflow-root");

if (!workflowRoot) {
  throw new Error("Missing AI workflow mount node.");
}

const WORKFLOW_NODES = [
  {
    id: "research",
    number: "01",
    title: "Research & Discovery",
    label: "signal intake",
    status: "syncing",
    tools: ["ChatGPT", "DeepSeek"],
    summary:
      "Synthesize product insights, identify UX opportunities, and cluster ideas with edge cases before the surface work starts.",
    bullets: [
      "Clusters raw feedback into opportunity stacks",
      "Flags friction, behavior gaps, and operational edge cases",
    ],
    statLabel: "signals merged",
    statValue: "38",
    snippet: [
      "$ collect-signals --source interviews,tickets,funnel",
      "> 6 opportunity zones mapped",
      "> 7 edge cases promoted downstream",
    ],
    pulse: [58, 72, 68, 86, 79, 92],
    layout:
      "md:col-span-2 xl:col-span-4 xl:col-start-1 xl:row-start-1",
    glow:
      "radial-gradient(circle at 12% 12%, rgba(92, 146, 255, 0.22), transparent 54%)",
  },
  {
    id: "ideation",
    number: "02",
    title: "Ideation",
    label: "concept engine",
    status: "branching",
    tools: ["Concept framing", "Flows", "Hypotheses"],
    summary:
      "Convert insights into product concepts, interaction models, and hypotheses so multiple approaches can be evaluated quickly.",
    bullets: [
      "Turns insights into flows, narratives, and concept routes",
      "Rapidly compares approaches before design depth begins",
    ],
    statLabel: "routes evaluated",
    statValue: "12",
    snippet: [
      "$ expand-problem-space --mode concept",
      "> 4 interaction models ranked for effort vs clarity",
      "> 2 hypotheses sent to design board",
    ],
    pulse: [44, 64, 76, 70, 88, 82],
    layout:
      "md:col-span-1 xl:col-span-4 xl:col-start-5 xl:row-start-1",
    glow:
      "radial-gradient(circle at 20% 16%, rgba(175, 120, 255, 0.18), transparent 58%)",
  },
  {
    id: "design",
    number: "03",
    title: "AI-assisted Design",
    label: "system sync",
    status: "connected",
    tools: ["Figma", "MCP", "Design systems"],
    summary:
      "Use Figma with MCP integrations to connect design systems, accelerate repetitive workflows, and preserve consistency across screens.",
    bullets: [
      "Pulls structure and references directly into the design layer",
      "Keeps component logic and visual consistency aligned",
    ],
    statLabel: "system links",
    statValue: "04",
    snippet: [
      "$ figma.sync --library core-mobile --mcp on",
      "> repetitive screen scaffolds accelerated",
      "> token and pattern drift reduced before review",
    ],
    pulse: [62, 78, 80, 88, 90, 94],
    layout:
      "md:col-span-1 xl:col-span-4 xl:col-start-9 xl:row-start-1",
    glow:
      "radial-gradient(circle at 18% 20%, rgba(107, 255, 199, 0.18), transparent 58%)",
  },
  {
    id: "prototype",
    number: "04",
    title: "Rapid Prototyping",
    label: "working loops",
    status: "shipping mocks",
    tools: ["VS Code", "GitHub Copilot"],
    summary:
      "Generate smaller working features, create interactive prototypes quickly, and test product direction while the design is still flexible.",
    bullets: [
      "Builds interactive prototypes without waiting for full engineering cycles",
      "Tests direction early with lightweight working behavior",
    ],
    statLabel: "prototypes built",
    statValue: "03",
    snippet: [
      "$ prototype.generate --stack react --scope focused-feature",
      "> working flows produced in hours, not review cycles",
      "> direction stress-tested before lock-in",
    ],
    pulse: [52, 66, 74, 92, 88, 96],
    layout:
      "md:col-span-1 xl:col-span-4 xl:col-start-9 xl:row-start-2",
    glow:
      "radial-gradient(circle at 78% 18%, rgba(77, 176, 255, 0.18), transparent 56%)",
  },
  {
    id: "validation",
    number: "05",
    title: "Stakeholder Validation",
    label: "decision checks",
    status: "in review",
    tools: ["Product owners", "Stakeholder reviews"],
    summary:
      "Collaborate with product owners and stakeholders, validate UX decisions, and iterate before engineering handoff.",
    bullets: [
      "Uses AI summaries to sharpen review conversations and decisions",
      "De-risks the handoff by aligning on behavior before implementation",
    ],
    statLabel: "reviews aligned",
    statValue: "05",
    snippet: [
      "$ summarize-risks --audience stakeholders",
      "> UX rationale compressed into decision-ready notes",
      "> revision loops resolved before engineering intake",
    ],
    pulse: [48, 58, 70, 74, 80, 84],
    layout:
      "md:col-span-1 xl:col-span-4 xl:col-start-5 xl:row-start-2",
    glow:
      "radial-gradient(circle at 50% 14%, rgba(255, 188, 92, 0.18), transparent 58%)",
  },
  {
    id: "handoff",
    number: "06",
    title: "PR Handoff",
    label: "implementation state",
    status: "ready",
    tools: ["Pull requests", "Interaction logic"],
    summary:
      "Create implementation-ready pull requests, communicate interaction logic clearly, and bridge design and engineering with less ambiguity.",
    bullets: [
      "Packages behavior, states, and rationale into engineering-ready context",
      "Bridges product intent and implementation detail inside the PR itself",
    ],
    statLabel: "handoff confidence",
    statValue: "94%",
    snippet: [
      "$ handoff.export --format pr --states all",
      "> interaction logic attached to implementation surfaces",
      "> fewer clarification loops after design sign-off",
    ],
    pulse: [50, 60, 76, 82, 90, 94],
    layout:
      "md:col-span-1 xl:col-span-4 xl:col-start-1 xl:row-start-2",
    glow:
      "radial-gradient(circle at 16% 18%, rgba(255, 120, 160, 0.16), transparent 58%)",
  },
  {
    id: "analytics",
    number: "07",
    title: "Funnel Analytics & Iteration",
    label: "post-launch loop",
    status: "measuring",
    tools: ["Funnels", "Drop-off analysis", "Iteration"],
    summary:
      "Track funnels and product performance, identify drop-offs, validate post-launch impact, and continuously improve UX decisions.",
    bullets: [
      "Reads product performance after launch instead of guessing impact",
      "Feeds measured drop-offs back into the next design cycle",
    ],
    statLabel: "drop-off recovered",
    statValue: "-14%",
    snippet: [
      "$ analyze-funnel --window 14d --compare release",
      "> drop-offs localized to one interaction checkpoint",
      "> fixes routed back to discovery and prototyping",
    ],
    pulse: [42, 56, 71, 68, 84, 91],
    layout:
      "md:col-span-2 xl:col-span-8 xl:col-start-5 xl:row-start-3",
    glow:
      "radial-gradient(circle at 82% 22%, rgba(88, 200, 255, 0.16), transparent 54%)",
  },
];

const CONNECTIONS = [
  ["research", "ideation"],
  ["ideation", "design"],
  ["design", "prototype"],
  ["prototype", "validation"],
  ["validation", "handoff"],
  ["handoff", "analytics"],
];

const STACK_PILLS = [
  "ChatGPT",
  "DeepSeek",
  "Figma MCP",
  "Copilot",
  "Pull Requests",
  "Funnels",
];

const FUNNEL_VALUES = [
  { label: "visit", value: 100 },
  { label: "explore", value: 82 },
  { label: "intent", value: 67 },
  { label: "commit", value: 54 },
  { label: "repeat", value: 41 },
];

function nodeAccent(id) {
  const map = {
    research: "#67b6ff",
    ideation: "#b888ff",
    design: "#66f2c2",
    prototype: "#68c0ff",
    validation: "#ffd18a",
    handoff: "#ff8eb3",
    analytics: "#79d7ff",
  };

  return map[id] || "#8ab8ff";
}

function nodeIcon(id) {
  const svgClass =
    "h-5 w-5 text-white/90 transition-transform duration-300 group-hover:scale-105";

  switch (id) {
    case "research":
      return html`
        <svg className=${svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="11" cy="11" r="6.5"></circle>
          <path d="M16 16L21 21"></path>
          <path d="M8.5 11H13.5"></path>
          <path d="M11 8.5V13.5"></path>
        </svg>
      `;
    case "ideation":
      return html`
        <svg className=${svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3.5C8.8 3.5 6.2 6 6.2 9.3C6.2 11.5 7.3 13.1 8.9 14.2C9.7 14.8 10.2 15.6 10.2 16.6H13.8C13.8 15.6 14.3 14.8 15.1 14.2C16.7 13.1 17.8 11.5 17.8 9.3C17.8 6 15.2 3.5 12 3.5Z"></path>
          <path d="M10.4 19H13.6"></path>
          <path d="M10.8 21H13.2"></path>
        </svg>
      `;
    case "design":
      return html`
        <svg className=${svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="4.5" y="5" width="15" height="14" rx="3"></rect>
          <path d="M8 9H16"></path>
          <path d="M8 13H12.5"></path>
          <circle cx="15.8" cy="14.5" r="2"></circle>
        </svg>
      `;
    case "prototype":
      return html`
        <svg className=${svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M8 6L3.5 12L8 18"></path>
          <path d="M16 6L20.5 12L16 18"></path>
          <path d="M13.2 4.5L10.8 19.5"></path>
        </svg>
      `;
    case "validation":
      return html`
        <svg className=${svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M6 8.5H18"></path>
          <path d="M6 12H14.5"></path>
          <path d="M6 15.5H12"></path>
          <path d="M18 13.5L19.8 15.3L22 12.8"></path>
          <rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect>
        </svg>
      `;
    case "handoff":
      return html`
        <svg className=${svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M7 7.5H17"></path>
          <path d="M7 11.5H17"></path>
          <path d="M7 15.5H13"></path>
          <path d="M15.5 16.5L18 19L22 14.8"></path>
          <rect x="4" y="4.5" width="16" height="15" rx="3"></rect>
        </svg>
      `;
    default:
      return html`
        <svg className=${svgClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4.5 17.5L9.5 12.5L12.8 15.8L19.5 9"></path>
          <path d="M19.5 13V9H15.5"></path>
        </svg>
      `;
  }
}

function buildConnectorPath(start, end) {
  const midX = (start.x + end.x) / 2;
  return `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
}

function SparkBars({ values, accent }) {
  return html`
    <div className="flex h-16 items-end gap-1.5">
      ${values.map((value, index) => {
        const height = `${Math.max(18, value)}%`;
        return html`
          <div key=${index} className="flex-1">
            <div
              className="w-full rounded-full"
              style=${{
                height,
                background: `linear-gradient(180deg, ${accent}, rgba(255,255,255,0.12))`,
                boxShadow: `0 0 24px ${accent}22`,
              }}
            ></div>
          </div>
        `;
      })}
    </div>
  `;
}

function TrendLine({ values, accent }) {
  const width = 280;
  const height = 86;
  const step = width / Math.max(values.length - 1, 1);
  const points = values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / 100) * (height - 12) - 6;
      return `${x},${y}`;
    })
    .join(" ");

  return html`
    <svg viewBox=${`0 0 ${width} ${height}`} className="h-24 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="workflowTrend" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor=${accent}></stop>
          <stop offset="100%" stopColor="rgba(255,255,255,0.25)"></stop>
        </linearGradient>
      </defs>
      <path
        d=${`M 0 ${height - 1} H ${width}`}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      ></path>
      ${values.map((value, index) => {
        const x = index * step;
        const y = height - (value / 100) * (height - 12) - 6;
        return html`
          <circle
            key=${`point-${index}`}
            cx=${x}
            cy=${y}
            r="2.6"
            fill=${accent}
            opacity="0.92"
          ></circle>
        `;
      })}
      <polyline
        points=${points}
        fill="none"
        stroke="url(#workflowTrend)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></polyline>
    </svg>
  `;
}

function Gauge({ value, accent }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return html`
    <div className="relative h-20 w-20">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <circle
          cx="36"
          cy="36"
          r=${radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
        ></circle>
        <circle
          cx="36"
          cy="36"
          r=${radius}
          fill="none"
          stroke=${accent}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray=${circumference}
          strokeDashoffset=${offset}
        ></circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-barlow text-2xl font-semibold text-white">
        ${value}
      </div>
    </div>
  `;
}

function ConnectorLayer({ positions, reduceMotion, boardSize }) {
  return html`
    <svg
      className="pointer-events-none absolute inset-0 hidden xl:block"
      viewBox=${`0 0 ${boardSize.width || 1200} ${boardSize.height || 760}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="workflowBeam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(111,179,255,0.16)"></stop>
          <stop offset="45%" stopColor="rgba(138,255,225,0.95)"></stop>
          <stop offset="100%" stopColor="rgba(111,179,255,0.12)"></stop>
        </linearGradient>
        <filter id="workflowGlow">
          <feGaussianBlur stdDeviation="3.6" result="blur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>

      ${CONNECTIONS.map(([from, to], index) => {
        const start = positions[from];
        const end = positions[to];
        if (!start || !end) {
          return null;
        }

        const path = buildConnectorPath(start, end);
        return html`
          <g key=${`${from}-${to}`}>
            <path
              d=${path}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.2"
              strokeLinecap="round"
            ></path>
            <${motion.path}
              d=${path}
              fill="none"
              stroke="url(#workflowBeam)"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeDasharray="18 18"
              filter="url(#workflowGlow)"
              animate=${
                reduceMotion
                  ? { opacity: 0.55 }
                  : { strokeDashoffset: [0, -72], opacity: [0.32, 0.8, 0.32] }
              }
              transition=${
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 3.8 + index * 0.22,
                      ease: "linear",
                      repeat: Infinity,
                    }
              }
            />
          </g>
        `;
      })}
    </svg>
  `;
}

function WorkflowNode({ node, active, onActivate, registerRef, reduceMotion }) {
  const accent = nodeAccent(node.id);

  return html`
    <${motion.button}
      ref=${registerRef}
      type="button"
      layout
      onMouseEnter=${() => onActivate(node.id)}
      onFocus=${() => onActivate(node.id)}
      onClick=${() => onActivate(node.id)}
      whileHover=${reduceMotion ? undefined : { y: -4, scale: 1.01 }}
      transition=${{ type: "spring", stiffness: 220, damping: 24 }}
      className=${[
        "group relative min-h-[196px] overflow-hidden rounded-[30px] border p-5 text-left shadow-[0_24px_54px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-colors duration-300 md:p-6 xl:min-h-[210px]",
        active
          ? "border-white/18 bg-white/[0.09]"
          : "border-white/10 bg-white/[0.04] hover:border-white/16 hover:bg-white/[0.07]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 opacity-90" style=${{ background: node.glow }}></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>

      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              style=${{ boxShadow: `0 0 0 1px rgba(255,255,255,0.02), 0 0 28px ${accent}22` }}
            >
              ${nodeIcon(node.id)}
            </div>
            <div className="space-y-1">
              <div className="font-space text-[11px] uppercase tracking-[0.24em] text-slate-400">
                ${node.number} / ${node.label}
              </div>
              <div className="inline-flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style=${{
                    background: accent,
                    boxShadow: `0 0 18px ${accent}`,
                  }}
                ></span>
                <span className="font-space text-[11px] uppercase tracking-[0.18em] text-slate-300/80">
                  ${node.status}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-space text-[11px] uppercase tracking-[0.18em] text-slate-300/75">
            ${node.statValue}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-barlow text-[clamp(1.45rem,1.85vw,2.2rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-white">
            ${node.title}
          </h3>
          <p className="max-w-[30ch] text-[0.94rem] leading-[1.52] text-slate-300/84">
            ${node.summary}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          ${node.tools.map(
            (tool) => html`
              <span
                key=${tool}
                className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-space text-[11px] uppercase tracking-[0.16em] text-slate-300/74"
              >
                ${tool}
              </span>
            `
          )}
        </div>

        <${AnimatePresence} initial=${false}>
          ${
            active
              ? html`
                  <${motion.div}
                    key=${`${node.id}-details`}
                    initial=${{ opacity: 0, y: 10 }}
                    animate=${{ opacity: 1, y: 0 }}
                    exit=${{ opacity: 0, y: 8 }}
                    transition=${{ duration: reduceMotion ? 0 : 0.22 }}
                    className="grid gap-4"
                  >
                    <ul className="grid gap-2 text-[0.84rem] leading-[1.42] text-slate-300/86">
                      ${node.bullets.map(
                        (bullet) => html`
                          <li key=${bullet} className="flex gap-2">
                            <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-white/70"></span>
                            <span>${bullet}</span>
                          </li>
                        `
                      )}
                    </ul>

                    <div className="overflow-hidden rounded-[22px] border border-white/8 bg-black/30 p-3 font-space text-[10px] leading-6 tracking-[0.08em] text-slate-300/76">
                      ${node.snippet.map(
                        (line) => html`<div key=${line}>${line}</div>`
                      )}
                    </div>
                  </${motion.div}>
                `
              : null
          }
        </${AnimatePresence}>
      </div>
    </${motion.button}>
  `;
}

function DiagnosticsPanel({ activeNode, reduceMotion }) {
  const accent = nodeAccent(activeNode.id);
  const gaugeValue = parseInt(String(activeNode.statValue).replace(/[^0-9]/g, ""), 10);
  const safeGauge = Number.isFinite(gaugeValue) ? Math.min(gaugeValue, 100) : 86;

  return html`
    <div className="grid gap-4 xl:sticky xl:top-24">
      <${motion.div}
        layout
        className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="font-space text-[11px] uppercase tracking-[0.22em] text-slate-400">
              AI control surface
            </div>
            <h3 className="font-barlow text-[2rem] font-semibold leading-[0.92] tracking-[-0.03em] text-white">
              ${activeNode.title}
            </h3>
            <p className="max-w-[34ch] text-[0.98rem] leading-6 text-slate-300/78">
              Real product work, routed through AI where it makes the workflow faster, sharper, and easier to hand off.
            </p>
          </div>
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/25"
            style=${{ boxShadow: `0 0 28px ${accent}2a` }}
          >
            ${nodeIcon(activeNode.id)}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          ${STACK_PILLS.map(
            (pill) => html`
              <span
                key=${pill}
                className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-space text-[11px] uppercase tracking-[0.18em] text-slate-300/74"
              >
                ${pill}
              </span>
            `
          )}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-[22px] border border-white/8 bg-black/20 p-3">
            <div className="font-space text-[10px] uppercase tracking-[0.2em] text-slate-500">
              active stage
            </div>
            <div className="mt-2 font-barlow text-3xl font-semibold text-white">
              ${activeNode.number}
            </div>
          </div>
          <div className="rounded-[22px] border border-white/8 bg-black/20 p-3">
            <div className="font-space text-[10px] uppercase tracking-[0.2em] text-slate-500">
              node status
            </div>
            <div className="mt-2 font-barlow text-3xl font-semibold text-white">
              ${activeNode.status}
            </div>
          </div>
          <div className="rounded-[22px] border border-white/8 bg-black/20 p-3">
            <div className="font-space text-[10px] uppercase tracking-[0.2em] text-slate-500">
              primary output
            </div>
            <div className="mt-2 font-barlow text-3xl font-semibold text-white">
              ${activeNode.statValue}
            </div>
          </div>
        </div>
      </${motion.div}>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-1">
        <${motion.div}
          layout
          className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="font-space text-[11px] uppercase tracking-[0.22em] text-slate-400">
              activity.log
            </div>
            <div className="inline-flex items-center gap-2 text-[11px] font-space uppercase tracking-[0.18em] text-slate-300/70">
              <span
                className="h-2 w-2 rounded-full"
                style=${{
                  background: accent,
                  boxShadow: `0 0 18px ${accent}`,
                }}
              ></span>
              live
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[22px] border border-white/8 bg-black/30 p-4 font-space text-[11px] leading-6 tracking-[0.08em] text-slate-300/76">
            ${activeNode.snippet.map(
              (line, index) => html`
                <${motion.div}
                  key=${line}
                  initial=${{ opacity: 0, y: 10 }}
                  animate=${{ opacity: 1, y: 0 }}
                  transition=${{
                    duration: reduceMotion ? 0 : 0.18,
                    delay: reduceMotion ? 0 : index * 0.05,
                  }}
                >
                  ${line}
                </${motion.div}>
              `
            )}
          </div>

          <div className="mt-5">
            ${html`<${SparkBars} values=${activeNode.pulse} accent=${accent} />`}
          </div>
        </${motion.div}>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
            <div className="font-space text-[11px] uppercase tracking-[0.22em] text-slate-400">
              handoff signal
            </div>
            <div className="mt-4 flex items-center gap-4">
              ${html`<${Gauge} value=${safeGauge} accent=${accent} />`}
              <div className="space-y-1">
                <div className="font-barlow text-[1.3rem] font-semibold leading-none text-white">
                  ${activeNode.statLabel}
                </div>
                <div className="text-sm leading-6 text-slate-300/74">
                  AI stays useful only if the output can still move a real product decision forward.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
            <div className="font-space text-[11px] uppercase tracking-[0.22em] text-slate-400">
              funnel loop
            </div>
            <div className="mt-3">
              ${html`<${TrendLine} values=${FUNNEL_VALUES.map((item) => item.value)} accent=${accent} />`}
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 font-space text-[10px] uppercase tracking-[0.18em] text-slate-500">
              ${FUNNEL_VALUES.map(
                (item) => html`
                  <div key=${item.label} className="space-y-1">
                    <div>${item.label}</div>
                    <div className="text-slate-300/74">${item.value}%</div>
                  </div>
                `
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function WorkflowBoard() {
  const reduceMotion = useReducedMotion();
  const boardRef = useRef(null);
  const nodeRefs = useRef({});
  const [positions, setPositions] = useState({});
  const [boardSize, setBoardSize] = useState({ width: 1200, height: 760 });
  const [activeId, setActiveId] = useState("design");

  const activeNode = useMemo(
    () => WORKFLOW_NODES.find((node) => node.id === activeId) || WORKFLOW_NODES[0],
    [activeId]
  );

  useLayoutEffect(() => {
    if (!boardRef.current || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const measure = () => {
      if (!boardRef.current || window.innerWidth < 1280) {
        setPositions({});
        return;
      }

      const boardRect = boardRef.current.getBoundingClientRect();
      setBoardSize({ width: boardRect.width, height: boardRect.height });
      const nextPositions = {};

      WORKFLOW_NODES.forEach((node) => {
        const element = nodeRefs.current[node.id];
        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();
        nextPositions[node.id] = {
          x: rect.left - boardRect.left + rect.width / 2,
          y: rect.top - boardRect.top + rect.height / 2,
        };
      });

      setPositions(nextPositions);
    };

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(measure);
    });

    observer.observe(boardRef.current);

    WORKFLOW_NODES.forEach((node) => {
      const element = nodeRefs.current[node.id];
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener("resize", measure);
    window.requestAnimationFrame(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return html`
    <div className="font-barlow text-white">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] xl:items-end">
        <${motion.div}
          initial=${reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView=${reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport=${{ once: true, amount: 0.22 }}
          transition=${{ duration: 0.45, ease: [0.2, 1, 0.22, 1] }}
          className="space-y-5"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-space text-[11px] uppercase tracking-[0.24em] text-slate-300/76 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300/70 opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300"></span>
            </span>
            AI-native operating system / product design
          </div>

          <div className="space-y-4">
            <h2 className="max-w-[11ch] font-barlow text-[clamp(3.2rem,6.4vw,6.1rem)] font-semibold leading-[0.88] tracking-[-0.05em] text-white">
              <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                AI-Augmented
              </span>
              <br />
              Product Workflow
            </h2>
            <p className="max-w-[40rem] text-[1.12rem] leading-8 text-slate-300/82 lg:text-[1.24rem]">
              A connected operating layer for how I move from research to
              shipped product. Not a generic process timeline - an AI-assisted
              workflow where insight synthesis, Figma MCP, Copilot prototyping,
              validation, PR handoff, and funnel iteration stay in one system.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            ${STACK_PILLS.map(
              (pill) => html`
                <span
                  key=${pill}
                  className="rounded-full border border-white/10 bg-black/25 px-3.5 py-2 font-space text-[11px] uppercase tracking-[0.18em] text-slate-300/74 backdrop-blur-xl"
                >
                  ${pill}
                </span>
              `
            )}
          </div>
        </${motion.div}>

        <${motion.div}
          initial=${reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView=${reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport=${{ once: true, amount: 0.22 }}
          transition=${{
            duration: 0.48,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.2, 1, 0.22, 1],
          }}
          className="rounded-[30px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-space text-[11px] uppercase tracking-[0.22em] text-slate-400">
                system health
              </div>
              <div className="mt-2 font-barlow text-[2rem] font-semibold leading-none text-white">
                Live across the workflow
              </div>
            </div>
            <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 font-space text-[11px] uppercase tracking-[0.18em] text-emerald-100">
              operating
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-[22px] border border-white/8 bg-black/20 p-4">
              <div className="font-space text-[10px] uppercase tracking-[0.2em] text-slate-500">
                nodes
              </div>
              <div className="mt-2 font-barlow text-4xl font-semibold text-white">07</div>
            </div>
            <div className="rounded-[22px] border border-white/8 bg-black/20 p-4">
              <div className="font-space text-[10px] uppercase tracking-[0.2em] text-slate-500">
                models
              </div>
              <div className="mt-2 font-barlow text-4xl font-semibold text-white">02</div>
            </div>
            <div className="rounded-[22px] border border-white/8 bg-black/20 p-4">
              <div className="font-space text-[10px] uppercase tracking-[0.2em] text-slate-500">
                post-launch
              </div>
              <div className="mt-2 font-barlow text-4xl font-semibold text-white">1x</div>
            </div>
          </div>
        </${motion.div}>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.42fr)_minmax(320px,0.88fr)] xl:items-start">
        <div
          ref=${boardRef}
          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_34px_90px_rgba(0,0,0,0.32)] backdrop-blur-[26px] md:p-5 xl:p-6"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style=${{
              backgroundImage:
                "radial-gradient(circle at 12% 18%, rgba(98, 164, 255, 0.12), transparent 20%), radial-gradient(circle at 88% 22%, rgba(102, 242, 194, 0.08), transparent 20%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "auto, auto, 28px 28px, 28px 28px",
            }}
          ></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent"></div>

          <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="font-space text-[11px] uppercase tracking-[0.22em] text-slate-400">
              workflow.map / hover a node to inspect the layer
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 font-space text-[11px] uppercase tracking-[0.18em] text-slate-300/74">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,214,255,0.9)]"></span>
              AI activity pulses
            </div>
          </div>

          ${html`<${ConnectorLayer}
            positions=${positions}
            reduceMotion=${reduceMotion}
            boardSize=${boardSize}
          />`}

          <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:auto-rows-[minmax(220px,auto)]">
            ${WORKFLOW_NODES.map(
              (node, index) => html`
                <${motion.div}
                  key=${node.id}
                  className=${node.layout}
                  initial=${false}
                  animate=${{ opacity: 1, y: 0 }}
                  transition=${{
                    duration: reduceMotion ? 0 : 0.3,
                    delay: reduceMotion ? 0 : 0.02 * index,
                    ease: [0.2, 1, 0.22, 1],
                  }}
                >
                  <${WorkflowNode}
                    node=${node}
                    active=${activeNode.id === node.id}
                    onActivate=${setActiveId}
                    reduceMotion=${reduceMotion}
                    registerRef=${(element) => {
                      nodeRefs.current[node.id] = element;
                    }}
                  />
                </${motion.div}>
              `
            )}
          </div>
        </div>

        ${html`<${DiagnosticsPanel} activeNode=${activeNode} reduceMotion=${reduceMotion} />`}
      </div>
    </div>
  `;
}

const workflowAppRoot = createRoot(workflowRoot);
workflowAppRoot.render(html`<${WorkflowBoard} />`);
