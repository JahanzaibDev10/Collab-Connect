import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { CTAButton } from "./CTAButton";
import { useBooking } from "./BookingProvider";

export function Footer() {
  const { openBooking } = useBooking();
  return (
    <footer className="bg-ink text-white/85 pt-20 pb-10">
      <div className="container-90">
        <div className="grid lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="lg:col-span-5">
            <div className="text-white">
              <Logo light />
            </div>
            <p className="mt-5 text-white/65 max-w-md text-[15px] leading-relaxed">
              Operations leadership and cross-functional delivery for growing
              businesses. We bring structure, clarity and momentum to complex
              work — from Malmö, across Scandinavia and beyond.
            </p>
            <div className="mt-7">
              <CTAButton
                onClick={openBooking}
                className="bg-accent !text-ink hover:bg-accent/90"
              >
                Book a Discovery Call
              </CTAButton>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.18em] text-white/45 mb-4">Navigate</div>
            <ul className="space-y-2.5 text-[15px]">
              {[
                ["/services", "Services"],
                ["/process", "How we work"],
                ["/work", "Case studies"],
                ["/about", "About"],
                ["/insights", "Insights"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/75 hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.18em] text-white/45 mb-4">Contact</div>
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-start gap-3"><MapPin className="size-4 mt-1 text-accent" /><span>Malmö, Skåne County, Sweden</span></li>
              <li className="flex items-start gap-3"><Mail className="size-4 mt-1 text-accent" /><a href="mailto:hello@collabconnect.se" className="hover:text-accent transition-colors">hello@collabconnect.se</a></li>
              <li className="flex items-start gap-3"><Linkedin className="size-4 mt-1 text-accent" /><a href="https://linkedin.com/in/bianca-anghelescu-927b61106/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Bianca Anghelescu — COO</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px] text-white/55">
          <div>© {new Date().getFullYear()} CollabConnect AB (formerly The Social Vault AB). All rights reserved.</div>
          <div>
            This website is powered by{" "}
            <a
              href="https://theinnovations.tech/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              The Innovations
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
