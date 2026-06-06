import React from "react";
import { motion } from "framer-motion";
import { Eye, Mail, Users, Briefcase } from "lucide-react";

const pings = [
  {
    icon: <Eye size={14} />,
    title: "Google viewed your profile",
    sub: "Recruiter · Talent Team",
    pos: "top-10 left-3 sm:left-10",
    delay: 0.2,
  },
  {
    icon: <Briefcase size={14} />,
    title: "Internship offer — Razorpay",
    sub: "“We loved your Prosite”",
    pos: "top-40 right-3 sm:right-10",
    delay: 0.4,
  },
  {
    icon: <Users size={14} />,
    title: "Collaboration request",
    sub: "Sneh · YC student",
    pos: "bottom-28 left-4 sm:left-16",
    delay: 0.6,
  },
  {
    icon: <Mail size={14} />,
    title: "+ 12 new inbox messages",
    sub: "While you were asleep",
    pos: "bottom-8 right-4 sm:right-20",
    delay: 0.8,
  },
];

export default function Attraction() {
  return (
    <section
      data-testid="attraction-section"
      className="relative py-28 sm:py-36 section-dark"
    >
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">
            The opportunity magnet
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white">
            Some students <span className="text-white/40">chase</span>{" "}
            opportunities.
            <br />
            Others <span className="text-blue-400">attract them.</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl">
            Your Prosite keeps working even when you don't. Recruiters open it,
            collaborators DM you, opportunities arrive — while you sleep.
          </p>
        </motion.div>

        <div className="mt-14 relative rounded-2xl overflow-hidden border border-white/10 h-[440px] sm:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=srgb&fm=jpg&w=1400&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/70" />

          {pings.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: p.delay }}
              className={`absolute ${p.pos} w-[240px] rounded-xl bg-white text-black p-3 flex items-center gap-3`}
              data-testid={`attraction-ping-${i}`}
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-100 grid place-items-center text-black">
                {p.icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium leading-tight">
                  {p.title}
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">{p.sub}</p>
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="font-display text-xl sm:text-2xl font-bold text-white">
              Your Prosite works. <span className="text-blue-400">You sleep.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
