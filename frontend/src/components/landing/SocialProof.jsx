import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, TrendingUp } from "lucide-react";

const testimonials = [
  {
    name: "Aanya Sharma",
    role: "Product Design · IIT Bombay",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&w=300&q=80",
    quote:
      "I sent my Prosite to 3 startups on Sunday. Got 2 internship calls by Monday. My resume never did that.",
    metric: "+5 interviews in 1 week",
  },
  {
    name: "Rohan Mehta",
    role: "CS Final Year · BITS Pilani",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&w=300&q=80",
    quote:
      "Recruiters now message me on LinkedIn saying ‘we saw your Prosite’. Feels insane.",
    metric: "1.4k profile views",
  },
  {
    name: "Saanvi Iyer",
    role: "Marketing · NMIMS",
    img: "https://images.unsplash.com/photo-1699899657680-421c2c2d5064?crop=entropy&w=300&q=80",
    quote:
      "Finally a profile that doesn't look like every other student's PDF. My freelance DMs tripled.",
    metric: "3× freelance leads",
  },
];

const stats = [
  { v: "1,000+", l: "Students onboarded" },
  { v: "47k", l: "Profile views generated" },
  { v: "4.9", l: "Avg. student rating" },
  { v: "92%", l: "Got a reply within a week" },
];

export default function SocialProof() {
  return (
    <section
      id="proof"
      data-testid="social-proof-section"
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
            Real results
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-black">
            Students are already
            <br />
            <span className="text-blue-600">getting noticed.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl p-5 bg-white border border-neutral-200"
              data-testid={`stat-${i}`}
            >
              <p className="font-display text-3xl sm:text-4xl font-black text-black">
                {s.v}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-neutral-500">
                {s.l}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`testimonial-${i}`}
              className="lift rounded-2xl p-7 flex flex-col bg-white border border-neutral-200"
            >
              <Quote size={24} className="text-neutral-300 mb-4" strokeWidth={2} />
              <p className="text-neutral-800 leading-relaxed">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-black">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
                <div className="flex gap-0.5 text-black">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} size={11} fill="currentColor" />
                  ))}
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-blue-600 self-start px-2.5 py-1 rounded-full border border-blue-200">
                <TrendingUp size={11} /> {t.metric}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          {[
            { title: "Internship offer", from: "Razorpay · Talent" },
            { title: "Collaboration", from: "Designer @ YC F24" },
            { title: "Freelance brief", from: "DTC brand · Mumbai" },
          ].map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-testid={`opportunity-${i}`}
              className="rounded-xl bg-white border border-neutral-200 p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg border border-neutral-200 grid place-items-center text-black font-display font-bold">
                ✦
              </div>
              <div>
                <p className="text-sm font-medium text-black">{o.title}</p>
                <p className="text-[11px] text-neutral-500">{o.from}</p>
              </div>
              <span className="ml-auto text-[10px] uppercase tracking-wider text-neutral-500">
                New
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
