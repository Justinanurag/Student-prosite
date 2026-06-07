import React from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  Briefcase,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
  BadgeCheck,
} from "lucide-react";

const cards = [
  {
    icon: <Bookmark size={20} />,
    title: "Easy to remember",
    body: "One link. One name. One stunning identity recruiters won't forget.",
  },
  {
    icon: <Layers size={20} />,
    title: "Shows real work",
    body: "Live projects, videos, case studies — proof you can actually do the job.",
  },
  {
    icon: <Star size={20} />,
    title: "Looks professional",
    body: "Premium UI by default. No template energy. No copy-paste.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Better first impression",
    body: "Open it and they're 3× more likely to reply. Period.",
  },
  {
    icon: <Briefcase size={20} />,
    title: "Everything in one place",
    body: "Resume, portfolio, links, achievements — nothing scattered, nothing lost.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Modern & trustworthy",
    body: "Verified, social-proofed, mobile-perfect. Like a startup founder, not a fresher.",
  },
  {
    icon: <BadgeCheck size={20} />,
    title: "Govt ID Verified",
    body: "Real students. Real names. Recruiters know it's not a fake profile.",
    highlight: true,
  },
];

export default function Recruiters() {
  return (
    <section
      data-testid="recruiters-section"
      className="relative py-28 sm:py-36 section-light"
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
            Why recruiters love it
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-black">
            Why recruiters notice
            <br />
            <span className="text-blue-600">Prosites faster.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              data-testid={`recruiter-card-${i}`}
              className={`lift relative rounded-2xl p-7 border ${
                c.highlight
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {c.highlight && (
                <span className="absolute -top-2.5 right-6 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] uppercase tracking-wider font-medium">
                  Trust signal
                </span>
              )}
              <div
                className={`w-11 h-11 rounded-xl border grid place-items-center mb-5 ${
                  c.highlight
                    ? "border-white/15 text-white"
                    : "border-neutral-200 text-black"
                }`}
              >
                {c.icon}
              </div>
              <h3 className="font-display text-xl font-bold">{c.title}</h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  c.highlight ? "text-white/60" : "text-neutral-600"
                }`}
              >
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
