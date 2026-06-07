import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  HardDrive,
  Inbox,
  Infinity as InfinityIcon,
  Link2,
  LineChart,
  QrCode,
  Share2,
  Smartphone,
  FileUp,
  Folder,
  Image,
  BadgeCheck,
} from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      data-testid="features-section"
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
            Everything inside
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-black">
            Built like a{" "}
            <span className="text-blue-600">startup, not a CV.</span>
          </h2>
          <p className="mt-5 text-neutral-600 text-lg max-w-xl">
            A premium toolkit for the modern student. Every feature designed to
            make you look professionally admirable from day one.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 md:row-span-2 relative rounded-2xl bg-black text-white p-8 min-h-[420px] flex flex-col justify-between"
            data-testid="feature-bento-prosite"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                Flagship
              </span>
              <h3 className="font-display mt-3 text-3xl sm:text-4xl font-black tracking-tight">
                A beautiful Prosite.
              </h3>
              <p className="mt-3 text-white/60 max-w-md">
                Cinematic profile with projects, videos, achievements & social
                proof — all on one link.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&w=200&q=80"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">Aanya Sharma</p>
                  <p className="text-[11px] text-white/50">prosite.io/aanya</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {["Projects", "Videos", "Awards"].map((s) => (
                  <div
                    key={s}
                    className="rounded-lg border border-white/10 py-2 text-[10px] uppercase tracking-wider text-white/70"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <FeatureCard icon={<Inbox size={18} />} title="Super Inbox" body="All opportunities in one premium inbox." span="md:col-span-2" />
          <FeatureCard icon={<Bot size={18} />} title="AI Assistant" body="Auto-writes your bio, summaries & replies." span="md:col-span-2" />

          <FeatureCard icon={<BadgeCheck size={18} />} title="Govt ID Verified" body="Verified students. Real names. Recruiters trust it instantly." span="md:col-span-2" badge="NEW" />
          <FeatureCard icon={<LineChart size={18} />} title="Advanced Insights" body="See who viewed you, where, and from which company." span="md:col-span-2" />
          <FeatureCard icon={<Smartphone size={18} />} title="iOS + Android Apps" body="Your identity in your pocket — always live." span="md:col-span-2" />

          <FeatureCard icon={<Folder size={18} />} title="Portfolio Showcase" body="Drag, drop, design — your work, gallery-style." span="md:col-span-3" />
          <FeatureCard icon={<Image size={18} />} title="Projects & Case Studies" body="From concept to result. Prove the process." span="md:col-span-3" />

          <FeatureCard icon={<FileUp size={18} />} title="Resume Import" body="Upload your PDF — we transform it." span="md:col-span-2" />
          <FeatureCard icon={<HardDrive size={18} />} title="10 GB Storage" body="Big enough for the entire degree." span="md:col-span-2" />
          <FeatureCard icon={<Link2 size={18} />} title="Custom Links" body="Personal URL. Branded handle." span="md:col-span-2" />

          <FeatureCard icon={<Share2 size={18} />} title="Share Anywhere" body="Link, QR, NFC tap — every channel." span="md:col-span-2" />
          <FeatureCard icon={<QrCode size={18} />} title="QR Sharing" body="Tap to share at any event, instantly." span="md:col-span-2" />
          <FeatureCard icon={<InfinityIcon size={18} />} title="Lifetime Access" body="One payment. Forever yours." span="md:col-span-2" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, body, span = "md:col-span-2", badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45 }}
      data-testid={`feature-card-${title.toLowerCase().replace(/\s|&|\+|\//g, "-")}`}
      className={`${span} lift relative rounded-2xl p-6 bg-white border border-neutral-200 hover:border-neutral-300`}
    >
      {badge && (
        <span className="absolute top-4 right-4 inline-flex items-center px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] uppercase tracking-wider font-medium">
          {badge}
        </span>
      )}
      <div className="w-10 h-10 rounded-xl border border-neutral-200 grid place-items-center text-black">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-black">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-neutral-600">{body}</p>
    </motion.div>
  );
}
