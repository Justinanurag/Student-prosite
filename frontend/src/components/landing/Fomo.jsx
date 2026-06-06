import React from "react";
import { motion } from "framer-motion";

export default function Fomo() {
  return (
    <section
      data-testid="fomo-section"
      className="relative py-36 sm:py-44 section-black"
    >
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.3em] text-white/50"
        >
          5 Years From Now
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display mt-6 text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] text-white"
          data-testid="fomo-headline"
        >
          Will you still look
          <br />
          like everyone <span className="text-white/40">else?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed"
        >
          The students building their professional identity{" "}
          <span className="text-white">today</span> will have a massive
          advantage tomorrow. The internet doesn't forget who showed up first.
        </motion.p>

        <div className="mt-14 grid sm:grid-cols-2 gap-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-7 border border-white/10"
          >
            <p className="text-xs uppercase tracking-wider text-white/40">
              If you do nothing
            </p>
            <p className="font-display mt-3 text-2xl font-bold text-white/80">
              Invisible. Overlooked. Forgettable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl p-7 bg-white text-black"
          >
            <p className="text-xs uppercase tracking-wider text-blue-600">
              If you build today
            </p>
            <p className="font-display mt-3 text-2xl font-bold">
              Confident. Discovered. Admired.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
