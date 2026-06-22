import type { ServiceCardData } from "@/components/site/ServiceCard";

export const SERVICES: ServiceCardData[] = [
  {
    num: "01",
    title: "Operational Scaling",
    problem: "Growth is outpacing your structure. Things that worked at 10 break at 50.",
    approach: "Design operating systems, ownership and rituals that scale with the team.",
    outcome: "Calmer growth. Clear decision rights. Fewer fires per quarter.",
  },
  {
    num: "02",
    title: "Process Improvement",
    problem: "Workflows feel heavy, repetitive, or invisible. Work slips through the cracks.",
    approach: "Map the real flow, remove friction, codify what should stay, automate the rest.",
    outcome: "Repeatable processes your team actually uses.",
  },
  {
    num: "03",
    title: "Cross-Functional Delivery",
    problem: "Teams ship in isolation. Handoffs break and timelines slip.",
    approach: "Align goals, sequence work, and create shared cadences across departments.",
    outcome: "One company moving in one direction.",
  },
  {
    num: "04",
    title: "Stakeholder & Partnership Management",
    problem: "Leadership, investors and partners get the wrong signal, late.",
    approach: "Structured communication, clear updates, a single source of truth.",
    outcome: "Trust compounds. Decisions get made faster.",
  },
  {
    num: "05",
    title: "Team Coordination",
    problem: "People are busy, but it's hard to tell who owns what.",
    approach: "Accountability frameworks, lightweight rituals, honest retros.",
    outcome: "Teams that finish what they start.",
  },
  {
    num: "06",
    title: "Project Execution",
    problem: "Important initiatives keep stalling at 70% done.",
    approach: "Hands-on delivery leadership: scope, plan, unblock, ship.",
    outcome: "High-priority projects land on time, on quality.",
  },
  {
    num: "07",
    title: "Executive Support & Investor Relations",
    problem: "Leadership is buried in operations instead of leading.",
    approach: "Operating cadence, board prep, investor updates, executive systems.",
    outcome: "Leaders focused on the work only they can do.",
  },
];

export const PROCESS = [
  { num: "01", title: "Discover", body: "We listen first. Map your operating reality — teams, workflows, stakeholders, friction points — without judgment or template answers." },
  { num: "02", title: "Diagnose", body: "We separate the symptoms from the system. What's broken, what's missing, what's worth keeping. Findings shared in plain language." },
  { num: "03", title: "Design", body: "We design the smallest set of changes that move the needle: roles, rituals, workflows, tools. Practical over theoretical." },
  { num: "04", title: "Deliver", body: "We work alongside your team to roll changes out, unblock execution, and ship the priority work that's been stuck." },
  { num: "05", title: "Sustain", body: "We hand back a system your team owns — documented, accountable, and built to evolve as you grow." },
];

export const CASES = [
  {
    sector: "Series B SaaS",
    title: "Restructured ops across 4 teams in 90 days",
    challenge: "Rapid hiring had left ownership unclear; product, GTM and ops were misaligned.",
    approach: "Designed a quarterly operating cadence, redefined RACI per team, installed a single planning forum.",
    metrics: [
      { v: "42%", k: "fewer cross-team escalations" },
      { v: "2x", k: "on-time delivery rate" },
      { v: "90d", k: "to embedded rollout" },
    ],
  },
  {
    sector: "FinTech scale-up",
    title: "Cleared a 6-month execution backlog",
    challenge: "Critical initiatives kept stalling at 70% done. Leadership pulled into delivery.",
    approach: "Embedded delivery leadership for one quarter; sequenced work, unblocked dependencies, established weekly close.",
    metrics: [
      { v: "11", k: "stalled projects shipped" },
      { v: "−60%", k: "leadership time in delivery" },
      { v: "1", k: "shared roadmap, finally" },
    ],
  },
  {
    sector: "Health-tech series A",
    title: "Built the operating system for the next 18 months",
    challenge: "Strong founder team, no operating spine. Investors asked for clarity on execution.",
    approach: "Quarterly OKRs, board-pack template, weekly business review, hiring plan tied to load.",
    metrics: [
      { v: "100%", k: "board-ready reporting" },
      { v: "12wk", k: "to first clean cycle" },
      { v: "+3", k: "key hires landed" },
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote: "Bianca brought structure without bureaucracy. Within a quarter our teams were shipping what they used to argue about.",
    name: "Head of Operations",
    role: "Series B SaaS, Stockholm",
  },
  {
    quote: "Calm, surgical, and unusually good at the human side of execution. The kind of operator you wish you'd hired earlier.",
    name: "CEO",
    role: "FinTech scale-up, Copenhagen",
  },
  {
    quote: "We finally have a single source of truth for how we run. Our board notices the difference.",
    name: "Founder",
    role: "Health-tech, Malmö",
  },
];

export const INSIGHTS = [
  { tag: "Operations", title: "5 signs your ops need structure", excerpt: "Before the wheels come off — quiet signals that scaling is outpacing your operating system.", read: "5 min" },
  { tag: "Teams", title: "Cross-functional alignment: where teams break down", excerpt: "Most misalignment is not strategic. It's structural. Where the cracks usually form.", read: "6 min" },
  { tag: "Execution", title: "The 70% problem (and how to ship the last 30%)", excerpt: "Why important work stalls just before the finish line, and the rituals that move it.", read: "4 min" },
  { tag: "Process", title: "Lightweight rituals beat heavyweight tools", excerpt: "The Scandinavian case for restraint: fewer dashboards, better decisions.", read: "5 min" },
];

export const PARTNERS = ["NORTH", "VAULT", "MERIDIAN", "AXIOM", "FJORD", "KAJ.", "LUMEN", "STILLA"];
