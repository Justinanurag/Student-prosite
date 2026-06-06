import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

const before = [
  "Invisible to recruiters",
  "Low confidence in DMs",
  "Cold emails ignored",
  "No portfolio to share",
  "Just one more applicant",
];

const after = [
  "Profile views climbing daily",
  "Recruiters replying in hours",
  "Collaboration invites rolling in",
  "Confidence on every call",
  "Admired professionally online",
];

export default function BeforeAfter() {
  return (
    <section
      data-testid="before-after-section"
      className="relative py-28 sm:py-36 section-soft"
    >
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Before vs After
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-black">
            Same student.
            <br />
            <span className="text-blue-600">Different future.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-600 text-xs uppercase tracking-wider">
              <TrendingDown size={14} /> Without Prosite
            </div>
            <div className="rounded-2xl p-7 border border-neutral-200 bg-white">
              <ul className="space-y-3">
                {before.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-neutral-700">
                    <span className="mt-2 w-1 h-1 rounded-full bg-neutral-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { n: "0", l: "Views/wk" },
                  { n: "0", l: "Inbox" },
                  { n: "1", l: "Reply" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl border border-neutral-200 p-3 text-center"
                  >
                    <p className="font-display text-2xl font-black text-neutral-400">
                      {s.n}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs uppercase tracking-wider">
              <TrendingUp size={14} /> With Prosite
            </div>
            <div className="rounded-2xl p-7 bg-black">
              <ul className="space-y-3">
                {after.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-white">
                    <span className="mt-2 w-1 h-1 rounded-full bg-blue-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { n: "1.2k", l: "Views/wk" },
                  { n: "47", l: "Inbox" },
                  { n: "12", l: "Replies" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl border border-white/10 p-3 text-center"
                  >
                    <p className="font-display text-2xl font-black text-white">
                      {s.n}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-white/50">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
