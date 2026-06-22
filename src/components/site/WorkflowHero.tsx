import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const NODES = [
  { id: "core", x: 300, y: 220, r: 14, label: "Operations", primary: true },
  { id: "teams", x: 110, y: 110, r: 9, label: "Teams" },
  { id: "stake", x: 500, y: 95, r: 9, label: "Stakeholders" },
  { id: "deliv", x: 540, y: 330, r: 9, label: "Delivery" },
  { id: "part", x: 95, y: 320, r: 9, label: "Partners" },
  { id: "proc", x: 300, y: 50, r: 7 },
  { id: "exec", x: 300, y: 390, r: 7 },
];

const EDGES: [string, string][] = [
  ["core", "teams"], ["core", "stake"], ["core", "deliv"],
  ["core", "part"], ["core", "proc"], ["core", "exec"],
  ["teams", "proc"], ["stake", "proc"], ["deliv", "exec"], ["part", "exec"],
];

function node(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function WorkflowHero() {
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 768px)");
    const upd = () => setMobile(m.matches);
    upd();
    m.addEventListener("change", upd);
    return () => m.removeEventListener("change", upd);
  }, []);

  return (
    <div className="relative w-full aspect-[6/5] md:aspect-[5/4]">
      <svg viewBox="0 0 600 440" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#D4A843" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0%" stopColor="#5B7B9A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <circle cx="300" cy="220" r="180" fill="url(#glow)" />

        {/* concentric rings */}
        {[80, 130, 180].map((r, i) => (
          <motion.circle
            key={r}
            cx="300" cy="220" r={r}
            fill="none" stroke="#1E1E2E" strokeOpacity="0.06"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformOrigin: "300px 220px" }}
          />
        ))}

        {/* edges */}
        {EDGES.map(([a, b], i) => {
          const A = node(a); const B = node(b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              stroke="url(#edge)"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={reduce || mobile ? { pathLength: 1, opacity: 0.7 } : { pathLength: 1, opacity: 0.65 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.9, ease: "easeOut" }}
            />
          );
        })}

        {/* pulsing dot traveling along edges (desktop) */}
        {!mobile && !reduce && EDGES.slice(0, 6).map(([a, b], i) => {
          const A = node(a); const B = node(b);
          return (
            <motion.circle
              key={`p-${i}`}
              r="2.2"
              fill="#D4A843"
              initial={{ cx: A.x, cy: A.y, opacity: 0 }}
              animate={{ cx: [A.x, B.x], cy: [A.y, B.y], opacity: [0, 1, 0] }}
              transition={{
                delay: 1.4 + i * 0.25,
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* nodes */}
        {NODES.map((n, i) => (
          <g key={n.id}>
            <motion.circle
              cx={n.x} cy={n.y} r={n.r}
              fill={n.primary ? "#D4A843" : "#1E1E2E"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 220, damping: 16 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            {n.primary && !reduce && (
              <motion.circle
                cx={n.x} cy={n.y} r={n.r}
                fill="none" stroke="#D4A843" strokeWidth="1"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
            )}
            {n.label && (
              <motion.text
                x={n.x} y={n.y + n.r + 16}
                textAnchor="middle"
                className="fill-foreground"
                fontSize="11"
                fontWeight="500"
                initial={{ opacity: 0, y: n.y + n.r + 10 }}
                animate={{ opacity: 0.75, y: n.y + n.r + 16 }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.6 }}
              >
                {n.label}
              </motion.text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
