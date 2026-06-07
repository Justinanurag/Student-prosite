import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { useCheckout } from "@/models/context/CheckoutContext";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Why Prosite", href: "#pain" },
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#proof" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openCheckout } = useCheckout();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,94vw)] transition-all duration-300 ${
        scrolled
          ? "py-2.5 px-4 sm:px-5 bg-white/80 backdrop-blur-xl border border-neutral-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full"
          : "py-4 px-4 sm:px-6 bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <a href="#top" data-testid="brand-logo" className="flex items-center gap-3 group relative outline-none">
          <div className="relative h-8 w-8 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
            <img
              src="https://res.cloudinary.com/dzwto9zbu/image/upload/v1779959585/Atives_Logo_1_mpnssp.png"
              alt="Atives Logo"
              className="h-4.5 w-4.5 object-contain"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-transparent to-black/[0.03]" />
          </div>
          <div className="flex flex-col text-left justify-center">
            <span className="font-display font-black tracking-tight text-lg text-black leading-none group-hover:text-blue-600 transition-colors duration-300">
              Prosite
            </span>
            <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-widest mt-0.5 leading-none">
              by Atives
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-neutral-100/50 border border-neutral-200/50">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className="px-4 py-1.5 rounded-full text-[13px] font-medium text-neutral-600 hover:text-black hover:bg-white hover:shadow-sm transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={openCheckout}
            data-testid="navbar-cta"
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={14} className="text-blue-400" />
              Get your Prosite
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-black border border-neutral-200 hover:bg-neutral-200 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-[calc(100%+12px)] left-0 right-0 mx-auto w-full bg-white/95 backdrop-blur-2xl rounded-3xl border border-neutral-200 p-5 flex flex-col gap-3 shadow-2xl origin-top"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-2 bg-neutral-50/80 rounded-2xl p-3 border border-neutral-100">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-[14px] font-medium text-neutral-700 hover:bg-white hover:text-black hover:shadow-sm transition-all"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCheckout();
              }}
              className="mt-2 group w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-black text-white text-[14px] font-semibold hover:bg-neutral-800 transition-colors"
            >
              <Sparkles size={16} className="text-blue-400" />
              Get your Prosite
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
