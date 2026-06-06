import React from "react";

const items = [
  "Internship Ready",
  "10,000+ Profiles Built",
  "AI Powered",
  "One Link Identity",
  "Get Discovered",
  "Lifetime Access",
  "Govt ID Verified",
  "Made For Students",
  "Stand Out Online",
];

export default function Marquee() {
  return (
    <div
      data-testid="trust-marquee"
      className="relative border-y border-neutral-100 bg-white py-5 overflow-hidden"
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-6 px-8">
            <span className="font-display text-base sm:text-xl font-medium text-neutral-400 tracking-tight">
              {t}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
