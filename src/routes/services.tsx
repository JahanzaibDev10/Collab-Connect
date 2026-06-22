import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionReveal, Stagger, staggerItem } from "@/components/site/SectionReveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CTAButton } from "@/components/site/CTAButton";
import { useBooking } from "@/components/site/BookingProvider";
import { SERVICES } from "@/lib/site-data";
import { motion } from "framer-motion";
import workflow from "@/assets/workflow.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CollabConnect AB" },
      { name: "description", content: "Operational scaling, process improvement, cross-functional delivery, stakeholder management, team coordination, project execution, executive support." },
      { property: "og:title", content: "Services — CollabConnect AB" },
      { property: "og:description", content: "Seven services that bring order to growth." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { openBooking } = useBooking();
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-90 grid lg:grid-cols-12 gap-10 items-end">
          <SectionReveal className="lg:col-span-7">
            <span className="eyebrow">Services</span>
            <h1 className="mt-5 text-5xl md:text-7xl tracking-[-0.03em] leading-[1.02]">
              Seven ways we bring order to growth.
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-5" delay={0.1}>
            <p className="text-foreground/75 leading-relaxed">
              Each engagement is shaped around your team. The thread underneath is the same:
              we replace ambiguity with structure, and meetings with momentum.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-90">
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <motion.div key={s.num} variants={staggerItem}>
                <ServiceCard s={s} />
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface">
        <div className="container-90 grid lg:grid-cols-12 gap-10 items-center">
          <SectionReveal className="lg:col-span-6">
            <span className="eyebrow">How engagements work</span>
            <h2 className="mt-4 text-3xl md:text-4xl">Pick the shape that fits.</h2>
            <ul className="mt-6 space-y-4 text-foreground/80">
              <li><strong className="text-ink">Diagnostic sprint</strong> — 2–3 weeks. We map the operating reality and hand back a plan.</li>
              <li><strong className="text-ink">Embedded delivery</strong> — 1–2 quarters. We work inside the team to unblock and ship.</li>
              <li><strong className="text-ink">Ongoing partnership</strong> — fractional COO-style support, retained monthly.</li>
            </ul>
            <div className="mt-7"><CTAButton onClick={openBooking}>Discuss your engagement</CTAButton></div>
          </SectionReveal>
          <SectionReveal className="lg:col-span-6" delay={0.1}>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-card border border-border">
              <img src={workflow} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </SectionReveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function FinalCTA() {
  const { openBooking } = useBooking();
  return (
    <section className="py-20">
      <div className="container-90">
        <SectionReveal className="rounded-3xl bg-ink text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl text-white">Ready when you are.</h2>
            <p className="mt-2 text-white/70">30 minutes. Honest conversation. No pitch.</p>
          </div>
          <CTAButton onClick={openBooking} size="lg" className="bg-accent !text-ink hover:bg-accent/90">Book a Discovery Call</CTAButton>
        </SectionReveal>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Prefer email? <Link to="/contact" className="link-underline text-ink">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
