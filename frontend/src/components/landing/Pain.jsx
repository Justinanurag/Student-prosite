import React from "react";
import { motion } from "framer-motion";
import { FileText, Link2, Mail, FileX2, Frown, MailX } from "lucide-react";

const pains = [
  { icon: <FileText size={16} />, label: "Boring 1-page PDFs" },
  { icon: <Link2 size={16} />, label: "Scattered random links" },
  { icon: <Mail size={16} />, label: "Empty LinkedIn profiles" },
  { icon: <FileX2 size={16} />, label: "Half-built portfolios" },
];

const consequences = [
  { icon: <MailX size={16} />, label: "Ignored applications" },
  { icon: <Frown size={16} />, label: "Missed internships" },
  { icon: <Link2 size={16} />, label: "Lost freelance work" },
  { icon: <FileX2 size={16} />, label: "Forgettable first impression" },
];

export default function Pain() {
  return (
    <section
      id="pain"
      data-testid="pain-section"
      className="relative py-28 sm:py-36 section-dark"
    >
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">
            The painful truth
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter text-white">
            Most students look{" "}
            <span className="text-white/40">the same</span> online.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            Talent is no longer enough if nobody remembers you. Recruiters
            scroll past 50+ identical resumes a day — yours fades into the
            noise.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-7 border border-white/10"
            data-testid="pain-card"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              How they show up
            </p>
            <h3 className="font-display mt-3 text-2xl font-bold text-white">
              Scattered. Generic. Forgettable.
            </h3>
            <div className="mt-6 space-y-2">
              {pains.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/5"
                >
                  <span className="text-white/40">{p.icon}</span>
                  <span className="text-white/80 text-sm">{p.label}</span>
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-white/40">
                    ignored
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-7 border border-white/10"
            data-testid="consequence-card"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              And the cost
            </p>
            <h3 className="font-display mt-3 text-2xl font-bold text-white">
              You lose, before you even apply.
            </h3>
            <div className="mt-6 space-y-2">
              {consequences.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/5"
                >
                  <span className="text-white/50">{p.icon}</span>
                  <span className="text-white text-sm">{p.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/50">
              “We barely remember a name 30 seconds after reading a CV.” —
              Recruiter, Series B startup
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
