import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useCheckout } from "@/models/context/CheckoutContext";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "py-3 bg-white/90 backdrop-blur-xl border-b border-neutral-100"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#top" data-testid="brand-logo" className="flex items-center gap-2">
        <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gray-300 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dzwto9zbu/image/upload/v1779959585/Atives_Logo_1_mpnssp.png"
                alt="Atives Logo"
                className="h-4 w-4 object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-lg text-black">
                Prosite
              </span>
              <span className="text-[12px] text-gray-800 leading-none">
                by Atives
              </span>
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm text-neutral-600 hover:text-black transition-colors"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Build Your Prosite
          </button>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-black"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-3 mx-4 rounded-2xl bg-white border border-neutral-200 p-5 flex flex-col gap-4" data-testid="mobile-menu">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base text-black"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openCheckout();
            }}
            className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full bg-black text-white text-sm font-medium"
          >
            Build Your Prosite
          </button>
        </div>
      )}
    </header>
  );
}
