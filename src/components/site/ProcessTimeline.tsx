import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export interface ProcessStep {
  num: string;
  title: string;
  body: string;
}

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-border -translate-x-1/2" />
      <motion.div
        style={{ height: lineH }}
        className="absolute left-4 md:left-1/2 top-2 w-px bg-accent -translate-x-1/2 origin-top"
      />
      <ul className="space-y-14">
        {steps.map((step, i) => {
          const right = i % 2 === 1;
          return (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 items-center"
            >
              <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 top-3 md:top-1/2 size-3 rounded-full bg-ink ring-4 ring-background`} />
              <div className={`${right ? "md:order-2 md:pl-12" : "md:order-1 md:pr-12 md:text-right"}`}>
                <div className="text-xs font-mono tracking-widest text-accent">{step.num}</div>
                <h3 className="mt-2 text-2xl md:text-3xl">{step.title}</h3>
              </div>
              <div className={`mt-2 md:mt-0 ${right ? "md:order-1 md:pr-12 md:text-right" : "md:order-2 md:pl-12"}`}>
                <p className="text-foreground/75 leading-relaxed">{step.body}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
