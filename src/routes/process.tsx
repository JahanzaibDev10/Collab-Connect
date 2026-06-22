import { createFileRoute } from "@tanstack/react-router";
import { SectionReveal } from "@/components/site/SectionReveal";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { CTAButton } from "@/components/site/CTAButton";
import { useBooking } from "@/components/site/BookingProvider";
import { PROCESS } from "@/lib/site-data";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "How we work — CollabConnect AB" },
      { name: "description", content: "Discover, Diagnose, Design, Deliver, Sustain. Practical operating systems your team owns." },
      { property: "og:title", content: "How we work — CollabConnect AB" },
      { property: "og:description", content: "Five steps from complexity to clarity." },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  const { openBooking } = useBooking();
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="container-90 grid lg:grid-cols-12 gap-10">
          <SectionReveal className="lg:col-span-8">
            <span className="eyebrow">How we work</span>
            <h1 className="mt-5 text-5xl md:text-7xl tracking-[-0.03em] leading-[1.02]">
              Practical systems your team actually owns.
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-4 lg:pt-8" delay={0.1}>
            <p className="text-foreground/75 leading-relaxed">
              We don't drop a binder and disappear. Every engagement is built to leave a smaller
              footprint behind — one your team runs without us.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-90 max-w-4xl">
          <ProcessTimeline steps={PROCESS} />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface">
        <div className="container-90 grid md:grid-cols-3 gap-6">
          {[
            { t: "No theatre", b: "We say what's true and what's not. Meetings are short and have an outcome." },
            { t: "Structure that sticks", b: "Built around real human behaviour, not idealized org charts." },
            { t: "Calm urgency", b: "Important work, moved forward — without the noise that usually surrounds it." },
          ].map((p) => (
            <SectionReveal key={p.t}>
              <div className="rounded-2xl bg-card border border-border p-7 h-full">
                <h3 className="text-lg">{p.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.b}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-90">
          <SectionReveal className="rounded-3xl bg-ink text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl text-white max-w-xl">Bring us into your next priority.</h2>
            <CTAButton onClick={openBooking} size="lg" className="bg-accent !text-ink hover:bg-accent/90">Book a Discovery Call</CTAButton>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
