import { createFileRoute } from "@tanstack/react-router";
import { SectionReveal } from "@/components/site/SectionReveal";
import { CTAButton } from "@/components/site/CTAButton";
import { useBooking } from "@/components/site/BookingProvider";
import { Mail, MapPin, Linkedin, Calendar, Handshake } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CollabConnect AB" },
      { name: "description", content: "Book a discovery call, ask about an ongoing partnership, or reach us directly. Malmö, Sweden." },
      { property: "og:title", content: "Contact CollabConnect AB" },
      { property: "og:description", content: "Three ways in: discovery call, partnership inquiry, or direct contact." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { openBooking, openPartner } = useBooking();
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-90 grid lg:grid-cols-12 gap-10 items-end">
          <SectionReveal className="lg:col-span-8">
            <span className="eyebrow">Contact</span>
            <h1 className="mt-5 text-5xl md:text-7xl tracking-[-0.03em] leading-[1.02]">
              Three ways in.
            </h1>
          </SectionReveal>
          <SectionReveal className="lg:col-span-4" delay={0.1}>
            <p className="text-foreground/75 leading-relaxed">
              Pick the one that fits. We'll respond within 24 hours, every time.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-90 grid md:grid-cols-2 gap-5">
          <SectionReveal>
            <div className="rounded-3xl border border-border bg-card p-8 md:p-10 h-full flex flex-col">
              <div className="size-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">
                <Calendar className="size-5" />
              </div>
              <h2 className="mt-5 text-2xl">Book a Discovery Call</h2>
              <p className="mt-3 text-foreground/75 leading-relaxed flex-1">
                30 minutes. We'll talk through what's getting in the way and whether we're a fit.
                No deck, no pressure.
              </p>
              <div className="mt-6"><CTAButton onClick={openBooking}>Book a call</CTAButton></div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-ink text-white p-8 md:p-10 h-full flex flex-col">
              <div className="size-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                <Handshake className="size-5" />
              </div>
              <h2 className="mt-5 text-2xl text-white">Partner with us</h2>
              <p className="mt-3 text-white/70 leading-relaxed flex-1">
                For companies seeking ongoing operational support — fractional COO, embedded delivery,
                or a long-term retainer.
              </p>
              <div className="mt-6">
                <CTAButton onClick={openPartner} className="bg-accent !text-ink hover:bg-accent/90">
                  Partner inquiry
                </CTAButton>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface">
        <div className="container-90 grid md:grid-cols-3 gap-6">
          <Detail icon={<MapPin className="size-4" />} k="Location" v="Malmö, Skåne County, Sweden — serving Scandinavia and internationally." />
          <Detail icon={<Mail className="size-4" />} k="Email" v={<a href="mailto:hello@collabconnect.se" className="link-underline">hello@collabconnect.se</a>} />
          <Detail icon={<Linkedin className="size-4" />} k="LinkedIn" v={<a href="https://linkedin.com/in/bianca-anghelescu-927b61106/" target="_blank" rel="noreferrer" className="link-underline">Bianca Anghelescu</a>} />
        </div>
      </section>
    </>
  );
}

function Detail({ icon, k, v }: { icon: React.ReactNode; k: string; v: React.ReactNode }) {
  return (
    <SectionReveal>
      <div className="rounded-2xl border border-border bg-card p-7 h-full">
        <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-[0.18em]">
          {icon} <span>{k}</span>
        </div>
        <div className="mt-3 text-ink">{v}</div>
      </div>
    </SectionReveal>
  );
}
