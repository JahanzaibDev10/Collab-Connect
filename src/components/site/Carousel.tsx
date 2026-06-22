import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Desktop: paginated track, perView items visible, arrows + drag.
 * Mobile: horizontal snap-scroll.
 */
export function Carousel({
  items,
  perView = 3,
  className,
}: {
  items: ReactNode[];
  perView?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const len = items.length;
  const maxIndex = Math.max(0, len - perView);
  const prev = () => setI((p) => Math.max(0, p - 1));
  const next = () => setI((p) => Math.min(maxIndex, p + 1));

  return (
    <div className={cn("relative", className)}>
      {/* Mobile snap scroll */}
      <div className="md:hidden -mx-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 px-4 gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it, idx) => (
            <div key={idx} className="snap-center shrink-0 w-[85%]">{it}</div>
          ))}
        </div>
      </div>

      {/* Desktop track */}
      <div className="hidden md:block overflow-hidden">
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next();
            if (info.offset.x > 60) prev();
          }}
          animate={{ x: `-${(i * 100) / perView}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
        >
          {items.map((it, idx) => (
            <div
              key={idx}
              className="shrink-0 px-3"
              style={{ width: `${100 / perView}%` }}
            >
              {it}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="hidden md:flex mt-6 items-center justify-between">
        <div className="flex gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Page ${idx + 1}`}
              className={cn(
                "h-1 rounded-full transition-all",
                idx === i ? "w-8 bg-ink" : "w-4 bg-border hover:bg-foreground/40",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} disabled={i === 0} className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-ink hover:text-white transition-colors disabled:opacity-30" aria-label="Previous">
            <ChevronLeft className="size-4" />
          </button>
          <button onClick={next} disabled={i === maxIndex} className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-ink hover:text-white transition-colors disabled:opacity-30" aria-label="Next">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CardSwitch<T>({
  items, renderItem,
}: { items: T[]; renderItem: (item: T, i: number) => ReactNode; }) {
  const [i, setI] = useState(0);
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {renderItem(items[i], i)}
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-between">
        <div className="text-xs text-muted-foreground tabular-nums">
          {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setI((p) => (p - 1 + items.length) % items.length)} className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-ink hover:text-white transition-colors" aria-label="Previous">
            <ChevronLeft className="size-4" />
          </button>
          <button onClick={() => setI((p) => (p + 1) % items.length)} className="size-10 rounded-full border border-border flex items-center justify-center hover:bg-ink hover:text-white transition-colors" aria-label="Next">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
