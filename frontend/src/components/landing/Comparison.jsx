import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Folder,
  Image,
  Link2,
  X,
  Check,
  Sparkles,
  Star,
  Trophy,
  Mail,
} from "lucide-react";

const oldStack = [
  { icon: <FileText size={14} />, label: "resume_final_v7.pdf" },
  { icon: <Link2 size={14} />, label: "drive.com/folder/...x82" },
  { icon: <Folder size={14} />, label: "behance.net/joh.." },
  { icon: <Image size={14} />, label: "instagram link?" },
  { icon: <Link2 size={14} />, label: "linkedin/in/..." },
];

const newStack = [
  { icon: <Sparkles size={14} />, label: "Premium animated profile" },
  { icon: <Trophy size={14} />, label: "Highlight achievements" },
  { icon: <Image size={14} />, label: "Projects + videos showcase" },
  { icon: <Star size={14} />, label: "Verified social proof" },
  { icon: <Mail size={14} />, label: "One-tap contact" },
];

export default function Comparison() {
  return (
    <section
      data-testid="comparison-section"
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
            Resume vs Prosite
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-black">
            Don't just apply.
            <br />
            <span className="text-blue-600">Stand out.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-2 gap-4 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-neutral-200 bg-white p-7"
            data-testid="comparison-old"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Old way
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-200 rounded-full px-2 py-0.5">
                Forgettable
              </span>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-neutral-200" />
              <div className="flex-1">
                <div className="h-2 w-32 rounded bg-neutral-200" />
                <div className="h-2 w-20 rounded bg-neutral-100 mt-2" />
              </div>
            </div>
            <div className="space-y-2">
              {oldStack.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg border border-neutral-100 text-neutral-500 text-sm"
                >
                  <span className="text-neutral-400">{s.icon}</span>
                  <span className="truncate">{s.label}</span>
                  <X size={14} className="ml-auto text-neutral-300" />
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-neutral-500">
              ~ 7s before recruiter scrolls past
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl bg-black p-7"
            data-testid="comparison-new"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                Prosite way
              </span>
              <span className="text-[10px] uppercase tracking-wider text-blue-300 border border-blue-300/30 rounded-full px-2 py-0.5">
                Unforgettable
              </span>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&w=200&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-white">Aanya Sharma</p>
                <p className="text-[11px] text-white/50">prosite.io/aanya</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Live
              </span>
            </div>
            <div className="space-y-2">
              {newStack.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/10 text-white text-sm"
                >
                  <span className="text-blue-400">{s.icon}</span>
                  <span>{s.label}</span>
                  <Check size={14} className="ml-auto text-white/40" />
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-white/50">
              ~ 3x longer attention. ~ 4x more opens.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
