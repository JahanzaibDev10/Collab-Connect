import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  const fg = light ? "text-white" : "text-ink";
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${fg}`} aria-label="CollabConnect home">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="7" cy="7" r="3" fill="currentColor" />
        <circle cx="21" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="21" r="3" fill="#D4A843" />
        <path d="M7 7 L21 7 M7 7 L14 21 M21 7 L14 21" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      </svg>
      <span className="font-semibold tracking-tight text-[15px]">
        CollabConnect<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
