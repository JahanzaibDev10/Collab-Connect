import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { WorkflowHero } from "@/components/site/WorkflowHero";
import { CTAButton } from "@/components/site/CTAButton";
import { SectionReveal, Stagger, staggerItem } from "@/components/site/SectionReveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Carousel, CardSwitch } from "@/components/site/Carousel";
import { MetricCounter } from "@/components/site/MetricCounter";
import { useBooking } from "@/components/site/BookingProvider";
import { SERVICES, PROCESS, TESTIMONIALS, PARTNERS, CASES } from "@/lib/site-data";
import bianca from "@/assets/bianca.png";
import workspace from "@/assets/workspace.jpg";
import { ArrowUpRight, Quote } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CollabConnect AB — Scaling Operations. Strengthening Teams." },
      { name: "description", content: "Operations leadership, cross-functional delivery and execution partnership for growing businesses. Malmö, Sweden." },
      { property: "og:title", content: "CollabConnect AB — Operations & Delivery Partner" },
      { property: "og:description", content: "Structure, clarity and momentum for complex work." },
    ],
  }),
  component: Home,
});

const PILLARS = ["Scaling Operations.", "Strengthening Teams.", "Driving Execution."];

function AnimatedPillars() {
  const [pi, setPi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPi((p) => (p + 1) % PILLARS.length), 2600);
    return () => clearInterval(id);
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={pi}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        className="inline-block"
      >
        {PILLARS[pi]}
      </motion.span>
    </AnimatePresence>
  );
}

function Home() {
  const { openBooking, openPartner } = useBooking();
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section className="relative pt-10 md:pt-14 pb-20 md:pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px] rounded-full bg-accent/8 blur-3xl" />
        </div>
        <div className="container-90 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="eyebrow">CollabConnect AB · Malmö, Sweden</span>
            </motion.div>
            <h1 className="mt-5 text-[clamp(2.5rem,6vw,5.2rem)] leading-[1.02] tracking-[-0.03em] font-semibold">
              <span className="block text-ink">
                <AnimatedPillars />
              </span>
              <span className="block text-foreground/55">A calmer way to run complex work.</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-7 max-w-xl text-lg text-foreground/75 leading-relaxed"
            >
              We bring structure, clarity and momentum to growing businesses — leading operations
              across teams, workflows, partnerships and delivery.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <CTAButton size="lg" onClick={openBooking}>Book a Discovery Call</CTAButton>
              <CTAButton size="lg" variant="outline" onClick={openPartner}>Partner with us</CTAButton>
            </motion.div>
          </div>
          <div className="lg:col-span-5">
            <WorkflowHero />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <SectionReveal>
        <div className="container-90 py-6 border-y border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {[
              ["10+ yrs", "Operations leadership"],
              ["Scandinavian", "Precision · clarity"],
              ["Cross-functional", "Teams · partners · delivery"],
              ["Lund University", "COO Bianca Anghelescu"],
            ].map(([a, b]) => (
              <div key={a as string}>
                <div className="text-ink font-medium">{a}</div>
                <div className="text-muted-foreground">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* PROBLEM */}
      <section className="py-20 md:py-28">
        <div className="container-90 grid lg:grid-cols-12 gap-10">
          <SectionReveal className="lg:col-span-5">
            <span className="eyebrow">The problem we solve</span>
            <h2 className="mt-4 text-4xl md:text-5xl leading-[1.05]">
              Complexity quietly slows good companies down.
            </h2>
          </SectionReveal>
          <Stagger className="lg:col-span-7 grid sm:grid-cols-3 gap-5">
            {[
              { t: "Misaligned workflows", b: "Teams ship in parallel, not in concert. Handoffs blur, deadlines slide." },
              { t: "Scaling without structure", b: "What worked at 10 breaks at 50. New hires walk into ambiguity." },
              { t: "Leaders pulled into delivery", b: "Executive time leaks into operations the team should own." },
            ].map((p) => (
              <motion.div key={p.t} variants={staggerItem} className="rounded-2xl border border-border p-6 bg-card hover:border-ink/30 transition-colors">
                <div className="size-1.5 rounded-full bg-accent" />
                <h3 className="mt-4 text-lg">{p.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.b}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SERVICES CAROUSEL */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="container-90">
          <SectionReveal className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="mt-4 text-4xl md:text-5xl">Seven ways we bring order to growth.</h2>
            </div>
            <Link to="/services" className="link-underline text-sm text-ink inline-flex items-center gap-1.5">
              View all services <ArrowUpRight className="size-4" />
            </Link>
          </SectionReveal>
          <Carousel
            perView={3}
            items={SERVICES.map((s) => <ServiceCard key={s.num} s={s} />)}
          />
        </div>
      </section>

      {/* HOW WE WORK TEASER */}
      <section className="py-20 md:py-28">
        <div className="container-90 grid lg:grid-cols-12 gap-10 items-center">
          <SectionReveal className="lg:col-span-5">
            <span className="eyebrow">How we work</span>
            <h2 className="mt-4 text-4xl md:text-5xl leading-[1.05]">
              Five steps. No theatre.
            </h2>
            <p className="mt-5 text-foreground/75 leading-relaxed max-w-md">
              We don't run playbooks. We listen, diagnose, design the smallest set of changes that move the needle, then deliver them with your team.
            </p>
            <div className="mt-7">
              <CTAButton variant="outline" onClick={() => navigate({ to: '/process' })}>See the process</CTAButton>
            </div>
          </SectionReveal>
          <Stagger className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {PROCESS.map((p) => (
              <motion.div key={p.num} variants={staggerItem} className="rounded-xl border border-border p-5 bg-card">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-mono text-accent">{p.num}</span>
                  <h3 className="text-base">{p.title}</h3>
                </div>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* IMPACT / METRICS */}
      <section className="py-20 md:py-28 bg-ink text-white relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container-90 relative">
          <SectionReveal className="max-w-2xl">
            <span className="eyebrow !text-white/55">The impact</span>
            <h2 className="mt-4 text-4xl md:text-5xl text-white leading-[1.05]">Real changes you can measure.</h2>
          </SectionReveal>
          <Stagger className="mt-12 grid sm:grid-cols-3 gap-8">
            {[
              { v: <MetricCounter to={10} suffix="+" />, l: "years operational leadership" },
              { v: <MetricCounter to={42} suffix="%" />, l: "fewer cross-team escalations" },
              { v: <MetricCounter to={2} suffix="x" />, l: "on-time delivery rate" },
            ].map((m, i) => (
              <motion.div key={i} variants={staggerItem}>
                <div className="text-6xl md:text-7xl font-semibold tracking-tight text-accent">{m.v}</div>
                <div className="mt-3 text-white/70">{m.l}</div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-20 md:py-28">
        <div className="container-90">
          <div className="grid lg:grid-cols-2 gap-10" style={{ minHeight: '420px' }}>
            <SectionReveal className="flex">
              <motion.div
                whileInView={{ scale: 1 }} initial={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden bg-surface w-full flex items-center justify-center"
              >
                <img
                  src={bianca}
                  alt="Bianca Anghelescu, COO of CollabConnect AB"
                  className="w-full h-full object-contain object-top"
                  style={{ maxHeight: '420px' }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white bg-gradient-to-t from-ink/80 to-transparent">
                  <div className="text-sm">Bianca Anghelescu</div>
                  <div className="text-xs text-white/75">COO · Lund University · 10+ yrs</div>
                </div>
              </motion.div>
            </SectionReveal>
            <SectionReveal className="flex flex-col justify-center" delay={0.1}>
              <span className="eyebrow">The operator</span>
              <h2 className="mt-4 text-4xl md:text-5xl leading-[1.05]">
                Calm authority for fast-moving teams.
              </h2>
              <p className="mt-5 text-foreground/75 leading-relaxed max-w-xl">
                Bianca has spent 10+ years bringing structure, clarity and momentum to complex work —
                across operations, project coordination, stakeholder management, investor relations and
                executive support. She's especially strong where priorities change quickly, details matter,
                and teams need practical systems that make execution smoother.
              </p>
              <div className="mt-7">
                <CTAButton variant="outline" onClick={() => navigate({ to: '/about' })}>More about Bianca</CTAButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CASES TEASER */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="container-90">
          <SectionReveal className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <span className="eyebrow">Recent work</span>
              <h2 className="mt-4 text-4xl md:text-5xl">Outcomes, not adjectives.</h2>
            </div>
            <Link to="/work" className="link-underline text-sm text-ink inline-flex items-center gap-1.5">All case studies <ArrowUpRight className="size-4" /></Link>
          </SectionReveal>
          <Stagger className="grid md:grid-cols-3 gap-5">
            {CASES.map((c) => (
              <motion.article key={c.title} variants={staggerItem} className="rounded-2xl bg-card border border-border p-7 hover:shadow-lift transition-shadow">
                <div className="text-xs font-mono text-accent">{c.sector}</div>
                <h3 className="mt-3 text-xl leading-snug">{c.title}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{c.challenge}</p>
                <div className="mt-5 pt-5 border-t border-border grid grid-cols-3 gap-3">
                  {c.metrics.map((m) => (
                    <div key={m.k}>
                      <div className="text-xl font-semibold text-ink">{m.v}</div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{m.k}</div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28">
        <div className="container-90 grid lg:grid-cols-12 gap-10">
          <SectionReveal className="lg:col-span-4">
            <span className="eyebrow">In their words</span>
            <h2 className="mt-4 text-4xl md:text-5xl leading-[1.05]">Trusted by operators.</h2>
          </SectionReveal>
          <div className="lg:col-span-8">
            <CardSwitch
              items={TESTIMONIALS}
              renderItem={(t) => {
                const it = t as typeof TESTIMONIALS[number];
                return (
                  <figure className="rounded-3xl bg-surface border border-border p-8 md:p-12">
                    <Quote className="size-7 text-accent" />
                    <blockquote className="mt-5 text-2xl md:text-3xl tracking-tight text-ink leading-snug">"{it.quote}"</blockquote>
                    <figcaption className="mt-6 text-sm">
                      <div className="text-ink font-medium">{it.name}</div>
                      <div className="text-muted-foreground">{it.role}</div>
                    </figcaption>
                  </figure>
                );
              }}
            />
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS */}
      <SectionReveal className="container-90 py-12 border-t border-border">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6">Trusted across Scandinavia</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-6">
          {PARTNERS.map((p) => (
            <div key={p} className="text-foreground/35 font-semibold tracking-[0.18em] text-sm hover:text-ink transition-colors text-center">{p}</div>
          ))}
        </div>
      </SectionReveal>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28">
        <div className="container-90">
          <SectionReveal className="relative overflow-hidden rounded-3xl bg-ink text-white p-10 md:p-16">
            <div aria-hidden className="absolute -right-32 -top-32 w-[480px] h-[480px] rounded-full bg-accent/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h2 className="text-4xl md:text-5xl text-white leading-[1.05]">
                  Bring structure to what's slowing you down.
                </h2>
                <p className="mt-5 text-white/70 max-w-xl">
                  A 30-minute discovery call. No deck. Just a conversation about what's actually getting in the way.
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <CTAButton size="lg" onClick={openBooking} className="bg-accent !text-ink hover:bg-accent/90">
                  Book a Discovery Call
                </CTAButton>
              </div>
            </div>
            <img src={workspace} alt="" loading="lazy" className="hidden md:block absolute right-8 bottom-8 w-32 h-20 object-cover rounded-xl opacity-30" />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
