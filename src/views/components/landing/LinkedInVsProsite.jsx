import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Check, X } from "lucide-react";

const rows = [
  {
    feature: "First impression",
    linkedin: "Looks like every other student",
    prosite: "Cinematic, branded, unforgettable",
  },
  {
    feature: "Visual portfolio",
    linkedin: "Buried under \"Featured\" section",
    prosite: "Full gallery, videos, case studies",
  },
  {
    feature: "Daily updates",
    linkedin: "Lost in a noisy feed",
    prosite: "Curated daily feed on your profile",
  },
  {
    feature: "Govt ID verified",
    linkedin: false,
    prosite: true,
  },
  {
    feature: "AI assistant",
    linkedin: "Premium-only",
    prosite: "Included for every student",
  },
  {
    feature: "Custom URL",
    linkedin: "linkedin.com/in/random-string",
    prosite: "prosite.io/your-name",
  },
  {
    feature: "Shareable QR / NFC",
    linkedin: false,
    prosite: true,
  },
  {
    feature: "Built for students",
    linkedin: false,
    prosite: true,
  },
];

export default function LinkedInVsProsite() {
  return (
    <section
      id="linkedin-vs"
      data-testid="linkedin-vs-prosite-section"
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
            LinkedIn vs Prosite
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-black">
            LinkedIn is{" "}
            <span className="text-neutral-400">a network.</span>
            <br />
            Prosite is{" "}
            <span className="text-blue-600">your identity.</span>
          </h2>
          <p className="mt-5 text-neutral-600 text-lg max-w-xl">
            Both have a place. But only one makes a 20-year-old student
            actually feel professional.
          </p>
        </motion.div>

        <div className="mt-14 rounded-2xl bg-white border border-neutral-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200">
            <div className="py-4 px-6 text-[11px] uppercase tracking-wider text-neutral-500">
              Capability
            </div>
            <div className="py-4 px-6 flex items-center gap-2 border-l border-neutral-200">
              <div className="w-6 h-6 rounded-md bg-[#0a66c2] text-white grid place-items-center">
                <Linkedin size={12} />
              </div>
              <p className="font-medium text-black text-sm">LinkedIn</p>
            </div>
            <div className="py-4 px-6 flex items-center gap-2 border-l border-neutral-200">
              <div className="w-6 h-6 rounded-md bg-black grid place-items-center">
                <span className="font-display font-black text-white text-[10px]">
                  P
                </span>
              </div>
              <p className="font-medium text-black text-sm">Prosite</p>
              <span className="ml-1 text-[10px] uppercase tracking-wider text-blue-600 border border-blue-200 rounded-full px-1.5 py-0.5">
                for students
              </span>
            </div>
          </div>

          {rows.map((r, i) => (
            <motion.div
              key={r.feature}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              data-testid={`vs-row-${i}`}
              className="grid grid-cols-3 border-b border-neutral-100 last:border-b-0"
            >
              <div className="py-5 px-6 font-medium text-black text-sm">
                {r.feature}
              </div>
              <Cell value={r.linkedin} />
              <Cell value={r.prosite} highlight />
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          LinkedIn is great for networking. Prosite is built to make{" "}
          <span className="text-blue-600 font-medium">your identity</span>{" "}
          unforgettable.
        </p>
      </div>
    </section>
  );
}

function Cell({ value, highlight }) {
  if (value === true) {
    return (
      <div className="py-5 px-6 border-l border-neutral-200 flex items-center gap-2">
        <Check size={14} className={highlight ? "text-blue-600" : "text-black"} />
        <span className={`text-sm font-medium ${highlight ? "text-blue-600" : "text-black"}`}>
          Included
        </span>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="py-5 px-6 border-l border-neutral-200 flex items-center gap-2 text-neutral-400">
        <X size={14} />
        <span className="text-sm">Not available</span>
      </div>
    );
  }
  return (
    <div
      className={`py-5 px-6 border-l border-neutral-200 text-sm ${
        highlight ? "text-blue-600 font-medium" : "text-neutral-500"
      }`}
    >
      {value}
    </div>
  );
}
