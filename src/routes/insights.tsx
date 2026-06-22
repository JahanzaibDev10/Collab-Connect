import { createFileRoute } from "@tanstack/react-router";
import { SectionReveal, Stagger, staggerItem } from "@/components/site/SectionReveal";
import { INSIGHTS } from "@/lib/site-data";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";
import { useBooking } from "@/components/site/BookingProvider";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — CollabConnect AB" },
      { name: "description", content: "Notes from the operating floor — practical thinking on operations, teams and execution." },
      { property: "og:title", content: "Insights — CollabConnect AB" },
      { property: "og:description", content: "Notes on running good companies, calmer." },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const { openBooking } = useBooking();
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-90 grid lg:grid-cols-12 gap-10 items-end">
          <SectionReveal className="lg:col-span-8">
            <span className="eyebrow">Insights</span>
            <h1 className="mt-5 text-5xl md:text-7xl tracking-[-0.03em] leading-[1.02]">
              Notes from the operating floor.
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-4" delay={0.1}>
            <p className="text-foreground/75 leading-relaxed">
              Short, practical writing on operations, cross-functional alignment and the systems
              that make execution easier.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-90">
          <Stagger className="grid md:grid-cols-2 gap-5">
            {INSIGHTS.map((it) => (
              <motion.article
                key={it.title}
                variants={staggerItem}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group rounded-3xl border border-border bg-card p-8 md:p-10 hover:border-ink/30 hover:shadow-lift cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="uppercase tracking-[0.18em] text-accent">{it.tag}</span>
                  <span>{it.read}</span>
                </div>
                <h2 className="mt-5 text-2xl md:text-3xl leading-snug group-hover:text-ink">{it.title}</h2>
                <p className="mt-3 text-foreground/70 leading-relaxed">{it.excerpt}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink">
                  <span className="link-underline">Read</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20">
        <div className="container-90">
          <SectionReveal className="rounded-3xl bg-ink text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl text-white">Rather talk than read?</h2>
              <p className="mt-2 text-white/70 max-w-md">A 30-minute discovery call usually moves further than another post.</p>
            </div>
            <CTAButton onClick={openBooking} size="lg" className="bg-accent !text-ink hover:bg-accent/90">Book a Discovery Call</CTAButton>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
