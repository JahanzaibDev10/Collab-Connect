import { createFileRoute } from "@tanstack/react-router";
import { SectionReveal, Stagger, staggerItem } from "@/components/site/SectionReveal";
import { CTAButton } from "@/components/site/CTAButton";
import { useBooking } from "@/components/site/BookingProvider";
import { CASES, PARTNERS } from "@/lib/site-data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Case studies — CollabConnect AB" },
      { name: "description", content: "Outcomes from operations and delivery engagements. SaaS, FinTech and Health-tech." },
      { property: "og:title", content: "Case studies — CollabConnect AB" },
      { property: "og:description", content: "Real changes you can measure." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { openBooking } = useBooking();
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-90 grid lg:grid-cols-12 gap-10 items-end">
          <SectionReveal className="lg:col-span-8">
            <span className="eyebrow">Case studies</span>
            <h1 className="mt-5 text-5xl md:text-7xl tracking-[-0.03em] leading-[1.02]">
              Outcomes, not adjectives.
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-4" delay={0.1}>
            <p className="text-foreground/75 leading-relaxed">
              A selection of recent engagements. Sectors and metrics shown — client names protected
              by NDA until launch.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-90 space-y-5">
          {CASES.map((c, i) => (
            <SectionReveal key={c.title}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="grid lg:grid-cols-12 gap-6 rounded-3xl border border-border bg-card p-7 md:p-10 hover:border-ink/25 hover:shadow-lift"
              >
                <div className="lg:col-span-1 text-xs font-mono text-accent">{String(i + 1).padStart(2, "0")}</div>
                <div className="lg:col-span-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.sector}</div>
                  <h2 className="mt-3 text-2xl md:text-3xl leading-snug">{c.title}</h2>
                </div>
                <div className="lg:col-span-3 text-sm text-foreground/75 leading-relaxed">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">Challenge</div>
                  {c.challenge}
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mt-4 mb-1.5">Approach</div>
                  {c.approach}
                </div>
                <div className="lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-4 lg:border-l lg:pl-6 border-border">
                  {c.metrics.map((m) => (
                    <div key={m.k}>
                      <div className="text-3xl font-semibold text-ink">{m.v}</div>
                      <div className="text-xs text-muted-foreground mt-1">{m.k}</div>
                    </div>
                  ))}
                </div>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="py-14 bg-surface">
        <div className="container-90">
          <SectionReveal className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">
            A few of the teams we've supported
          </SectionReveal>
          <Stagger className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-6">
            {PARTNERS.map((p) => (
              <motion.div key={p} variants={staggerItem} className="text-foreground/40 font-semibold tracking-[0.18em] text-sm hover:text-ink transition-colors text-center">{p}</motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20">
        <div className="container-90">
          <SectionReveal className="rounded-3xl bg-ink text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl text-white max-w-xl">Want to be our next case study?</h2>
            <CTAButton onClick={openBooking} size="lg" className="bg-accent !text-ink hover:bg-accent/90">Start the conversation</CTAButton>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
