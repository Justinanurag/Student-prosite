import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Infinity as InfinityIcon, Code2, GraduationCap, CreditCard } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";

const chips = [
  { icon: <CreditCard size={12} />, label: "One Time Payment" },
  { icon: <InfinityIcon size={12} />, label: "Lifetime Access" },
  { icon: <Code2 size={12} />, label: "No Coding Needed" },
  { icon: <GraduationCap size={12} />, label: "Made For Students" },
];

export default function FinalCta() {
  const { open: openCheckout } = useCheckout();
  return (
    <section
      id="cta"
      data-testid="final-cta-section"
      className="relative py-32 sm:py-40 section-black"
    >
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-white"
        >
          Your future deserves better
          <br />
          than a <span className="text-blue-400">PDF.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg sm:text-xl text-white/60 max-w-xl mx-auto"
        >
          Build a professional identity students will admire and opportunities
          will remember.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 inline-flex flex-col items-center gap-6"
        >
          <button
            type="button"
            onClick={openCheckout}
            data-testid="final-cta-button"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-medium text-base hover:bg-neutral-100 transition-colors"
          >
            Build Your Prosite Today
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {chips.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/70"
              >
                <span className="text-white/50">{c.icon}</span>
                {c.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-xs uppercase tracking-[0.25em] text-white/40"
        >
          Limited Student Launch Offer · ₹899 lifetime
        </motion.p>
      </div>
    </section>
  );
}
