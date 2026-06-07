import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Eye,
  Briefcase,
  Users,
  Bell,
} from "lucide-react";
import IPhoneMockup from "@/views/components/landing/IPhoneMockup";
import { useCheckout } from "@/models/context/CheckoutContext";

const trust = [
  "1000+ Students",
  "Lifetime Access",
  "Mobile Apps",
  "AI Powered",
];

const badges = [
  { label: "Internship Ready", className: "top-4 -left-4 sm:-left-6", delay: 0.4 },
  { label: "Built For Students", className: "bottom-12 -left-8 sm:-left-12", delay: 0.6 },
  { label: "One Link Identity", className: "top-20 -right-6 sm:-right-10", delay: 0.5 },
  { label: "Get Discovered", className: "bottom-4 -right-4 sm:-right-6", delay: 0.7 },
];

export default function Hero() {
  const { open: openCheckout } = useCheckout();
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen pt-32 sm:pt-36 pb-20 section-light"
    >
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 text-xs text-neutral-600"
            data-testid="hero-eyebrow"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            The professional identity platform for students
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-black"
            data-testid="hero-headline"
          >
            Your Resume <span className="text-neutral-300">Gets Ignored.</span>
            <br />
            Your Prosite Gets <span className="text-blue-600">Remembered.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-neutral-600 leading-relaxed"
            data-testid="hero-subheadline"
          >
            Build a professional identity that helps students stand out,
            attract opportunities, and look professionally admirable online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={openCheckout}
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              Get Your Prosite
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-500"
            data-testid="hero-trust-row"
          >
            {trust.map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative animate-float-slow"
          >
            <IPhoneMockup />

            {badges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: b.delay }}
                className={`absolute ${b.className} z-20 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-medium text-black whitespace-nowrap`}
                data-testid={`hero-badge-${i}`}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-600" />
                  {b.label}
                </span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="hidden xl:flex absolute -left-56 top-24 z-30 w-60 p-3 rounded-2xl bg-white border border-neutral-200 gap-3 items-center"
              data-testid="hero-notif-1"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-100 grid place-items-center text-black">
                <Eye size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Profile View
                </p>
                <p className="text-sm font-medium text-black">
                  Your profile was viewed
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="hidden xl:flex absolute -right-40 top-44 z-30 w-68 p-3 rounded-2xl bg-white border border-neutral-200 gap-3 items-center"
              data-testid="hero-notif-2"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 grid place-items-center text-white">
                <Briefcase size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Inbox
                </p>
                <p className="text-sm font-medium text-black">
                  Internship Opportunity
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="hidden xl:flex absolute -left-48 bottom-24 z-30 w-68 p-3 rounded-2xl bg-white border border-neutral-200 gap-3 items-center"
              data-testid="hero-notif-3"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-100 grid place-items-center text-black">
                <Users size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Network
                </p>
                <p className="text-sm font-medium text-black">
                  New collaboration request
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="hidden xl:flex absolute -right-28 bottom-32 z-30 px-3 py-2 rounded-full bg-black text-white gap-2 items-center"
              data-testid="hero-notif-4"
            >
              <Bell size={12} />
              <span className="text-xs font-medium">
                Recruiter opened your Prosite
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
