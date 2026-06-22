import { createFileRoute } from "@tanstack/react-router";
import { SectionReveal, Stagger, staggerItem } from "@/components/site/SectionReveal";
import { CTAButton } from "@/components/site/CTAButton";
import { useBooking } from "@/components/site/BookingProvider";
import { motion } from "framer-motion";
import bianca from "@/assets/bianca.png";
import team from "@/assets/team.jpg";
import malmo from "@/assets/malmo.jpg";
import { Linkedin } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CollabConnect AB" },
      { name: "description", content: "Bianca Anghelescu, COO. 10+ years of operations leadership. CollabConnect AB (formerly The Social Vault AB). Malmö, Sweden." },
      { property: "og:title", content: "About CollabConnect AB" },
      { property: "og:description", content: "Operations leadership built on clarity, accountability, quality and momentum." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { openBooking } = useBooking();
  return (
    <>
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="container-90">
          <div className="grid lg:grid-cols-2 gap-10" style={{ minHeight: '380px' }}>
            <SectionReveal className="flex flex-col justify-center py-4">
              <span className="eyebrow">About</span>
              <h1 className="mt-5 text-5xl md:text-7xl tracking-[-0.03em] leading-[1.02]">
                Clarity is a craft.
              </h1>
              <p className="mt-6 text-foreground/75 leading-relaxed max-w-xl">
                CollabConnect AB — formerly The Social Vault AB — evolved to focus on what we kept
                being asked for: operational excellence and cross-functional delivery for growing
                businesses across Scandinavia and beyond.
              </p>
            </SectionReveal>
            <SectionReveal className="flex" delay={0.1}>
              <div className="rounded-3xl overflow-hidden w-full h-full">
                <img src={malmo} alt="Malmö, Sweden" loading="lazy" className="w-full h-full object-cover" style={{ minHeight: '280px' }} />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container-90">
          <div className="grid lg:grid-cols-2 gap-10" style={{ minHeight: '460px' }}>
            <SectionReveal className="flex">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                className="rounded-3xl overflow-hidden bg-card w-full flex items-center justify-center"
              >
                <img
                  src={bianca}
                  alt="Bianca Anghelescu, COO of CollabConnect AB"
                  className="w-full h-full object-contain object-top"
                  style={{ maxHeight: '460px' }}
                />
              </motion.div>
            </SectionReveal>
            <SectionReveal className="flex flex-col justify-center" delay={0.1}>
              <span className="eyebrow">Founder · COO</span>
              <h2 className="mt-4 text-4xl md:text-5xl leading-[1.05]">Bianca Anghelescu</h2>
              <div className="mt-2 text-muted-foreground text-sm">Lund University · 10+ years operations leadership</div>
              <div className="mt-5 space-y-4 text-foreground/80 leading-relaxed max-w-2xl">
                <p>Bianca leads operations at CollabConnect AB across teams, workflows, partnerships and delivery. Her focus is on improving execution, strengthening processes, aligning cross-functional teams, and making sure projects move forward with quality and consistency.</p>
                <p>Her experience spans operations, project coordination, stakeholder management, investor relations, executive support and business growth. She’s helped scale teams, improve internal systems, manage high-priority initiatives, and communicate clearly across leadership, investors, partners and internal teams.</p>
                <p>She’s especially strong in fast-moving environments where priorities change quickly, details matter, and teams need practical systems that make execution smoother. She enjoys turning complexity into clear processes, building accountability, and helping people work better together.</p>
              </div>
              <div>
                <a
                  href="https://linkedin.com/in/bianca-anghelescu-927b61106/"
                  target="_blank" rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-ink link-underline"
                >
                  <Linkedin className="size-4" /> Connect on LinkedIn
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-24">
        <div className="container-90">
          <SectionReveal className="max-w-2xl mb-10">
            <span className="eyebrow">What we value</span>
            <h2 className="mt-4 text-4xl md:text-5xl">Four words we run on.</h2>
          </SectionReveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { t: "Clarity", b: "Plain language. Real status. No spin." },
              { t: "Accountability", b: "Owners with the air-cover to actually own it." },
              { t: "Quality", b: "We do less, finished well." },
              { t: "Momentum", b: "Decisions move. The work moves with them." },
            ].map((v) => (
              <motion.div key={v.t} variants={staggerItem} className="rounded-2xl border border-border p-7 bg-card">
                <div className="size-1.5 rounded-full bg-accent" />
                <h3 className="mt-4 text-xl">{v.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{v.b}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="container-90 grid lg:grid-cols-12 gap-10 items-center">
          <SectionReveal className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img src={team} alt="Team collaborating" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </SectionReveal>
          <SectionReveal className="lg:col-span-6" delay={0.1}>
            <span className="eyebrow">Team</span>
            <h2 className="mt-4 text-3xl md:text-4xl">A lean operator network.</h2>
            <p className="mt-5 text-foreground/75 leading-relaxed">
              CollabConnect runs as a small senior team augmented by trusted operators we've worked
              with for years. We stay small on purpose — so what we deliver carries our signature.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-90">
          <SectionReveal className="rounded-3xl bg-ink text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl text-white max-w-xl">Let's talk about what's getting in the way.</h2>
            <CTAButton onClick={openBooking} size="lg" className="bg-accent !text-ink hover:bg-accent/90">Book a Discovery Call</CTAButton>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
