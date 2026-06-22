import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardData {
  num: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
}

export function ServiceCard({
  s,
  className,
  dark = false,
}: {
  s: ServiceCardData;
  className?: string;
  dark?: boolean;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group relative h-full rounded-2xl border p-7 transition-all duration-300",
        dark
          ? "bg-ink/60 border-white/10 text-white hover:border-accent/60"
          : "bg-card border-border hover:border-ink/30 hover:shadow-lift",
        className,
      )}
    >
      <div className={cn("text-xs font-mono tracking-widest", dark ? "text-accent" : "text-accent")}>
        {s.num}
      </div>
      <h3 className={cn("mt-4 text-xl tracking-tight", dark && "text-white")}>{s.title}</h3>

      <dl className="mt-5 space-y-3 text-sm">
        <Pair k="Problem" v={s.problem} dark={dark} />
        <Pair k="Approach" v={s.approach} dark={dark} />
        <Pair k="Outcome" v={s.outcome} dark={dark} accent />
      </dl>

      <div className={cn(
        "mt-6 inline-flex items-center gap-1.5 text-sm",
        dark ? "text-white/80" : "text-ink",
      )}>
        <span className="link-underline">Learn more</span>
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.article>
  );
}

function Pair({ k, v, dark, accent }: { k: string; v: string; dark?: boolean; accent?: boolean }) {
  return (
    <div>
      <dt className={cn("text-[11px] uppercase tracking-[0.16em]", dark ? "text-white/45" : "text-muted-foreground")}>{k}</dt>
      <dd className={cn(
        "mt-0.5 text-[14px] leading-relaxed",
        accent && !dark && "text-ink font-medium",
        accent && dark && "text-accent",
        !accent && dark && "text-white/75",
      )}>{v}</dd>
    </div>
  );
}
