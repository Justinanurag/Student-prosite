import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Link as LinkIcon,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Youtube,
  FileText,
  Folder,
  Image as ImageIcon,
  Heart,
  MessageCircle,
  CheckCircle2,
  Rss,
  Sparkles,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", hint: "Identity card · bio · live status" },
  { id: "socials", label: "Socials", hint: "All your handles in one place" },
  { id: "contacts", label: "Contacts", hint: "One-tap contact for recruiters" },
  { id: "links", label: "Links", hint: "Curated links with previews" },
  { id: "docs", label: "Docs", hint: "Resume, transcripts, certificates" },
  { id: "works", label: "Projects / Works", hint: "Case studies that prove the process" },
  { id: "gallery", label: "Gallery", hint: "Visual showcase of your work" },
  { id: "feed", label: "Daily Feed", hint: "Daily updates — never go cold" },
];

export default function Mockups() {
  const [active, setActive] = useState("profile");

  const screens = {
    profile: <ProfileScreen />,
    socials: <SocialsScreen />,
    contacts: <ContactsScreen />,
    links: <LinksScreen />,
    docs: <DocsScreen />,
    works: <WorksScreen />,
    gallery: <GalleryScreen />,
    feed: <FeedScreen />,
  };

  return (
    <section
      id="mockups"
      data-testid="mockups-section"
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
            Inside the Prosite
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-black">
            One profile.{" "}
            <span className="text-blue-600">Eight powers.</span>
          </h2>
          <p className="mt-5 text-neutral-600 text-lg max-w-xl">
            Tap through and see what makes a Prosite feel alive. From a curated
            feed of daily updates to a complete portfolio.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-2">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                data-testid={`mockup-tab-${t.id}`}
                className={`text-left p-4 rounded-xl border transition-colors ${
                  active === t.id
                    ? "bg-black border-black text-white"
                    : "bg-white border-neutral-200 hover:border-neutral-300 text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg grid place-items-center text-xs font-display font-bold ${
                      active === t.id
                        ? "bg-white text-black"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.label}</p>
                    <p className={`text-xs mt-0.5 ${active === t.id ? "text-white/60" : "text-neutral-500"}`}>
                      {t.hint}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            <div className="mt-3 p-5 rounded-xl border border-neutral-200 bg-white">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-600">
                <Rss size={12} /> Daily Feed
              </div>
              <p className="mt-2 font-display text-lg font-bold leading-snug text-black">
                Post daily updates.{" "}
                <span className="text-blue-600">Recruiters love it.</span>
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                Studio-grade consistency. Your work, progress and wins — always
                on top of mind.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-[300px] sm:w-[340px] h-[640px] sm:h-[700px] rounded-[48px] bg-black p-[5px]"
              data-testid={`mockup-screen-${active}`}
            >
              <div className="relative w-full h-full rounded-[44px] bg-[#0a0a0a] overflow-hidden">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 dynamic-island" />
                <div className="absolute inset-0 pt-12 px-5 pb-4 overflow-hidden">
                  {screens[active]}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───── Screen components ─────
function Screen({ title, eyebrow, children }) {
  return (
    <div className="text-left">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
        <span>prosite.io/aanya</span>
        <span>{eyebrow}</span>
      </div>
      <h4 className="font-display mt-3 text-xl font-bold text-white">{title}</h4>
      <div className="mt-4 space-y-2.5">{children}</div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <Screen eyebrow="Profile" title="Aanya Sharma">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&w=200&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-medium text-white text-sm">Aanya Sharma</p>
          <p className="text-[11px] text-white/50">Product Designer · IIT Bombay</p>
          <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Open to internships
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { v: "12.4k", l: "Views" },
          { v: "248", l: "Inbox" },
          { v: "98", l: "Saves" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-white/10 py-2">
            <p className="font-display text-sm font-bold text-white">{s.v}</p>
            <p className="text-[9px] uppercase tracking-wider text-white/40">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-white/10 px-3 py-2.5 flex items-center gap-2">
        <CheckCircle2 size={13} className="text-blue-400" />
        <span className="text-[11px] font-medium text-white">Govt ID Verified</span>
        <span className="ml-auto text-[10px] text-white/40">Trusted</span>
      </div>
      <p className="text-[11px] leading-relaxed text-white/60">
        Designing the future of student identity. Y-Combinator School '25.
      </p>
    </Screen>
  );
}

function SocialsScreen() {
  const socials = [
    { icon: <Linkedin size={13} />, l: "LinkedIn", h: "@aanyasharma" },
    { icon: <Github size={13} />, l: "GitHub", h: "@aanya-dev" },
    { icon: <Instagram size={13} />, l: "Instagram", h: "@aanya.studio" },
    { icon: <Twitter size={13} />, l: "X / Twitter", h: "@aanyasharma" },
    { icon: <Youtube size={13} />, l: "YouTube", h: "Aanya Creates" },
    { icon: <Globe size={13} />, l: "Behance", h: "aanya.design" },
  ];
  return (
    <Screen eyebrow="Socials" title="Where to find Aanya">
      <div className="grid grid-cols-2 gap-2">
        {socials.map((s) => (
          <div key={s.l} className="rounded-lg border border-white/10 p-2.5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-md border border-white/10 grid place-items-center text-white/70">
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-white">{s.l}</p>
              <p className="text-[9px] text-white/40 truncate">{s.h}</p>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

function ContactsScreen() {
  const c = [
    { icon: <Mail size={13} />, l: "Email", v: "aanya@prosite.io" },
    { icon: <Phone size={13} />, l: "Phone", v: "+91 98xxx xxx12" },
    { icon: <MessageCircle size={13} />, l: "WhatsApp", v: "Tap to chat" },
    { icon: <Globe size={13} />, l: "Website", v: "aanya.design" },
  ];
  return (
    <Screen eyebrow="Contact" title="One-tap to reach me">
      {c.map((x) => (
        <div key={x.l} className="rounded-lg border border-white/10 p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md border border-white/10 grid place-items-center text-white/70">
            {x.icon}
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-wider text-white/40">{x.l}</p>
            <p className="text-sm font-medium text-white">{x.v}</p>
          </div>
          <span className="text-[10px] text-white/40">↗</span>
        </div>
      ))}
    </Screen>
  );
}

function LinksScreen() {
  const items = [
    { l: "My personal blog", h: "aanya.design/journal" },
    { l: "YC School Application 2025", h: "yc.com/aanya" },
    { l: "Featured on Product Hunt", h: "ph.co/aanya-studio" },
    { l: "Substack: design vibes", h: "vibes.substack.com" },
    { l: "Latest case study", h: "aanya.design/notebook" },
  ];
  return (
    <Screen eyebrow="Links" title="Hand-picked links">
      {items.map((i) => (
        <div key={i.l} className="rounded-lg border border-white/10 p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md border border-white/10 grid place-items-center text-white/70">
            <LinkIcon size={13} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{i.l}</p>
            <p className="text-[10px] text-white/40">{i.h}</p>
          </div>
        </div>
      ))}
    </Screen>
  );
}

function DocsScreen() {
  const docs = [
    { l: "Resume_2025.pdf", s: "1.2 MB" },
    { l: "IIT Transcript.pdf", s: "640 KB" },
    { l: "Y-Combinator Cert.pdf", s: "320 KB" },
    { l: "Letter of Recc — Prof Patil", s: "180 KB" },
  ];
  return (
    <Screen eyebrow="Docs" title="Verified documents">
      {docs.map((d) => (
        <div key={d.l} className="rounded-lg border border-white/10 p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md border border-white/10 grid place-items-center text-white/70">
            <FileText size={13} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{d.l}</p>
            <p className="text-[10px] text-white/40">{d.s}</p>
          </div>
          <CheckCircle2 size={13} className="text-blue-400" />
        </div>
      ))}
    </Screen>
  );
}

function WorksScreen() {
  const works = [
    { l: "Reimagining Bank UX", sub: "Case study · 12 min", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&q=70" },
    { l: "Design System @ Razorpay", sub: "Internship · 2024", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&q=70" },
    { l: "AI Companion for Teens", sub: "Y Combinator School", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&q=70" },
  ];
  return (
    <Screen eyebrow="Works" title="Projects & case studies">
      {works.map((w) => (
        <div key={w.l} className="rounded-lg border border-white/10 p-2 flex items-center gap-3">
          <div className="w-12 h-12 rounded-md overflow-hidden">
            <img src={w.img} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{w.l}</p>
            <p className="text-[10px] text-white/40">{w.sub}</p>
          </div>
          <Folder size={13} className="text-white/40" />
        </div>
      ))}
    </Screen>
  );
}

function GalleryScreen() {
  const imgs = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&q=70",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&q=70",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&q=70",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&q=70",
    "https://images.unsplash.com/photo-1542435503-956c469947f6?w=300&q=70",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&q=70",
  ];
  return (
    <Screen eyebrow="Gallery" title="Visual portfolio">
      <div className="grid grid-cols-3 gap-1.5">
        {imgs.map((src, i) => (
          <div key={i} className="aspect-square rounded-md overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-white/10 p-3 flex items-center gap-2">
        <ImageIcon size={13} className="text-white/60" />
        <span className="text-[11px] text-white/80">48 photos · 12 videos · 6 case studies</span>
      </div>
    </Screen>
  );
}

function FeedScreen() {
  const posts = [
    { title: "Shipped a new design system for a fintech", meta: "2h ago · 124 likes" },
    { title: "Got selected for Y-Combinator School '25", meta: "Yesterday · 312 likes" },
    { title: "Sketches for tomorrow's pitch", meta: "2 days ago · 89 likes" },
  ];
  return (
    <Screen eyebrow="Daily Feed" title="Always on the radar">
      <div className="rounded-lg border border-white/10 px-3 py-2.5 text-[11px] text-white/80">
        <span className="text-blue-400 font-medium">Pro tip:</span> Students with 3+
        weekly posts get <span className="text-white">3.4×</span> more recruiter views.
      </div>
      {posts.map((p, i) => (
        <div key={i} className="rounded-lg border border-white/10 p-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-[11px] font-medium text-white">Aanya</p>
            <span className="ml-auto text-[9px] text-white/40">
              {p.meta.split("·")[0]}
            </span>
          </div>
          <p className="mt-2 text-[12px] text-white leading-snug">{p.title}</p>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-white/40">
            <span className="inline-flex items-center gap-1">
              <Heart size={10} /> {p.meta.split("·")[1]}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle size={10} /> reply
            </span>
            <Sparkles size={10} className="ml-auto text-white/40" />
          </div>
        </div>
      ))}
    </Screen>
  );
}
