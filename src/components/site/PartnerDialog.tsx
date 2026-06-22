import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";

export function PartnerDialog({
  open, onOpenChange,
}: { open: boolean; onOpenChange: (o: boolean) => void; }) {
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ company: "", scope: "", timeline: "", name: "", email: "", message: "" });
  const valid = f.company && f.scope && f.timeline && f.name && /.+@.+\..+/.test(f.email);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => { onOpenChange(o); if (!o) setTimeout(() => { setDone(false); setF({ company: "", scope: "", timeline: "", name: "", email: "", message: "" }); }, 300); }}
    >
      <DialogContent className="max-w-xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Partner with us</DialogTitle>
        <div className="p-7 border-b border-border">
          <div className="eyebrow">Ongoing partnership</div>
          <h3 className="text-xl mt-2">Partner with us</h3>
          <p className="text-sm text-muted-foreground mt-1">For companies seeking ongoing operational support.</p>
        </div>
        <div className="p-7 min-h-[280px]">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="d" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                <div className="mx-auto size-12 rounded-full bg-accent/15 flex items-center justify-center mb-4">
                  <Check className="size-5 text-accent" />
                </div>
                <h4 className="text-xl mb-1.5">Inquiry received.</h4>
                <p className="text-sm text-muted-foreground">We'll be in touch within 24 hours to discuss next steps.</p>
              </motion.div>
            ) : (
              <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 gap-4">
                <Field label="Company" value={f.company} onChange={(v) => setF({ ...f, company: v })} />
                <Field label="Scope of work" value={f.scope} onChange={(v) => setF({ ...f, scope: v })} placeholder="e.g. fractional COO" />
                <Field label="Timeline" value={f.timeline} onChange={(v) => setF({ ...f, timeline: v })} placeholder="e.g. start Q1" />
                <Field label="Your name" value={f.name} onChange={(v) => setF({ ...f, name: v })} />
                <Field className="sm:col-span-2" label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
                <label className="block sm:col-span-2">
                  <span className="text-xs text-muted-foreground">Message</span>
                  <textarea
                    value={f.message}
                    onChange={(e) => setF({ ...f, message: e.target.value })}
                    rows={3}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!done && (
          <div className="px-7 py-5 border-t border-border bg-surface/40 flex justify-end">
            <button
              disabled={!valid}
              onClick={() => setDone(true)}
              className={`px-5 py-2.5 rounded-full text-sm ${valid ? "bg-ink text-white hover:bg-ink/90" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
            >
              Send inquiry
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, className,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; className?: string; }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
    </label>
  );
}
