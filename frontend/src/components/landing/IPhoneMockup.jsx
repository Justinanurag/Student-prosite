import React from "react";
import { Github, Globe, Instagram, Linkedin, Mail, QrCode, BadgeCheck } from "lucide-react";

export default function IPhoneMockup() {
  return (
    <div
      data-testid="iphone-mockup"
      className="relative w-[290px] sm:w-[330px] h-[620px] sm:h-[680px] rounded-[48px] bg-black p-[5px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]"
    >
      <div className="relative w-full h-full rounded-[44px] bg-[#0a0a0a] overflow-hidden">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 dynamic-island" />

        <div className="absolute top-1.5 left-0 right-0 px-7 flex items-center justify-between text-[10px] text-white/60 font-medium z-20">
          <span>9:41</span>
        </div>

        <div className="relative z-10 pt-14 px-5 text-left h-full">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              prosite.io/aanya
            </div>
            <div className="w-7 h-7 rounded-full border border-white/10 grid place-items-center">
              <QrCode size={11} className="text-white/70" />
            </div>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <div className="w-20 h-20 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&w=200&q=80"
                alt="Aanya"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold leading-tight text-white">
                Aanya Sharma
              </h3>
              <p className="text-[11px] text-white/60">
                Product Designer · IIT Bombay
              </p>
              <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Open to internships
              </div>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/10 text-[10px] text-white/80">
            <BadgeCheck size={11} className="text-blue-400" />
            Govt ID Verified
          </div>

          <p className="mt-3 text-[12px] leading-relaxed text-white/70">
            Designing the future of student identity. Y-Combinator School '25.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { v: "12.4k", l: "Views" },
              { v: "248", l: "Inbox" },
              { v: "98", l: "Saves" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-white/10 py-2 text-center">
                <p className="font-display text-sm font-bold text-white">{s.v}</p>
                <p className="text-[9px] uppercase tracking-wider text-white/40">
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            {[
              { icon: <Linkedin size={13} />, label: "LinkedIn", sub: "@aanyasharma" },
              { icon: <Github size={13} />, label: "GitHub", sub: "10 projects" },
              { icon: <Globe size={13} />, label: "Portfolio", sub: "aanya.design" },
              { icon: <Instagram size={13} />, label: "Instagram", sub: "@aanya.studio" },
            ].map((l) => (
              <div
                key={l.label}
                className="rounded-xl border border-white/10 p-2.5 flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 grid place-items-center text-white/70">
                  {l.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-white">{l.label}</p>
                  <p className="text-[9px] text-white/40">{l.sub}</p>
                </div>
                <span className="text-[10px] text-white/40">↗</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2">
            <Mail size={12} className="text-white/60" />
            <span className="text-[11px] text-white/80">aanya@prosite.io</span>
          </div>
        </div>
      </div>
    </div>
  );
}
