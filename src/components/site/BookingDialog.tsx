import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Check, ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  "Operational Scaling",
  "Process Improvement",
  "Cross-Functional Alignment",
  "Team Coordination",
  "Stakeholder Management",
  "Partnership & Delivery Support",
  "Not sure yet",
];
const SIZES = ["1–10", "11–50", "51–200", "200+"];
const INDUSTRIES = ["SaaS / Tech", "Finance", "Healthcare", "E-commerce", "Manufacturing", "Other"];
const WINDOWS = [
  "Mornings (CET)",
  "Afternoons (CET)",
  "Evenings (CET)",
  "Flexible — surprise me",
];

type Form = {
  need: string;
  size: string;
  industry: string;
  challenge: string;
  window: string;
  name: string;
  role: string;
  company: string;
  email: string;
};

const empty: Form = {
  need: "", size: "", industry: "", challenge: "",
  window: "", name: "", role: "", company: "", email: "",
};

export function BookingDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [done, setDone] = useState(false);

  const reset = () => { setStep(0); setForm(empty); setDone(false); };

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = () => setDone(true);

  const canNext =
    (step === 0 && form.need) ||
    (step === 1 && form.size && form.industry && form.challenge.trim().length > 4) ||
    (step === 2 && form.window) ||
    (step === 3 && form.name && form.role && form.company && /.+@.+\..+/.test(form.email));

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setTimeout(reset, 300);
      }}
    >
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-background border-border">
        <DialogTitle className="sr-only">Book a Discovery Call</DialogTitle>
        <div className="px-7 pt-7 pb-3 border-b border-border flex items-center justify-between">
          <div>
            <div className="eyebrow">Discovery Call</div>
            <h3 className="text-xl mt-2">
              {done ? "You're all set." : "Tell us a little about you."}
            </h3>
          </div>
          {!done && <Steps step={step} total={4} />}
        </div>

        <div className="px-7 py-7 min-h-[340px]">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-4"
              >
                <div className="mx-auto size-14 rounded-full bg-accent/15 flex items-center justify-center mb-5">
                  <Check className="size-6 text-accent" />
                </div>
                <h4 className="text-2xl mb-2">We'll be in touch within 24 hours.</h4>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thanks, {form.name.split(" ")[0]}. We've received your request and
                  Bianca will reach out at <span className="text-ink">{form.email}</span>.
                </p>
                <div className="mt-6 mx-auto max-w-md rounded-2xl border border-border bg-surface/70 p-5 text-left text-sm">
                  <Row k="Focus" v={form.need} />
                  <Row k="Company" v={`${form.company} · ${form.size} · ${form.industry}`} />
                  <Row k="Window" v={form.window} />
                  <Row k="Challenge" v={form.challenge} />
                </div>
                <div className="mt-6 flex justify-center gap-3">
                  <a
                    href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:Discovery Call with CollabConnect%0ADESCRIPTION:CollabConnect AB will reach out to confirm.%0AEND:VEVENT%0AEND:VCALENDAR"
                    download="discovery-call.ics"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-sm hover:bg-ink/90"
                  >
                    <Calendar className="size-4" /> Add to calendar
                  </a>
                  <button
                    onClick={() => onOpenChange(false)}
                    className="px-5 py-2.5 rounded-full border border-border text-sm hover:bg-surface"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <Step label="What do you need help with?">
                    <Chips
                      options={SERVICES}
                      value={form.need}
                      onChange={(v) => setForm({ ...form, need: v })}
                    />
                  </Step>
                )}
                {step === 1 && (
                  <div className="space-y-5">
                    <Step label="Company size">
                      <Chips options={SIZES} value={form.size} onChange={(v) => setForm({ ...form, size: v })} />
                    </Step>
                    <Step label="Industry">
                      <Chips options={INDUSTRIES} value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} />
                    </Step>
                    <Step label="Biggest operational challenge right now">
                      <textarea
                        value={form.challenge}
                        onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                        rows={3}
                        placeholder="e.g. we're scaling fast and our cross-team handoffs are breaking down…"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                      />
                    </Step>
                  </div>
                )}
                {step === 2 && (
                  <Step label="Preferred time window">
                    <Chips options={WINDOWS} value={form.window} onChange={(v) => setForm({ ...form, window: v })} />
                  </Step>
                )}
                {step === 3 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Input label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
                    <Input label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <Input label="Work email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!done && (
          <div className="px-7 py-5 border-t border-border flex items-center justify-between bg-surface/40">
            <button
              onClick={prev}
              disabled={step === 0}
              className={cn(
                "inline-flex items-center gap-2 text-sm",
                step === 0 ? "opacity-30 cursor-not-allowed" : "text-ink hover:text-accent",
              )}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              onClick={step === 3 ? submit : next}
              disabled={!canNext}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all",
                canNext
                  ? "bg-ink text-white hover:bg-ink/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
              )}
            >
              {step === 3 ? "Submit" : "Continue"} <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Steps({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1 rounded-full transition-all",
            i <= step ? "w-8 bg-accent" : "w-4 bg-border",
          )}
        />
      ))}
    </div>
  );
}

function Step({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-2.5">{label}</div>
      {children}
    </div>
  );
}

function Chips({
  options, value, onChange,
}: {
  options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "px-4 py-2 rounded-full text-sm border transition-all",
            value === o
              ? "bg-ink text-white border-ink"
              : "border-border text-foreground hover:border-ink/40 hover:bg-surface",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Input({
  label, value, onChange, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-3 py-1.5 border-b last:border-0 border-border/60">
      <div className="w-24 text-muted-foreground shrink-0">{k}</div>
      <div className="text-ink">{v}</div>
    </div>
  );
}
