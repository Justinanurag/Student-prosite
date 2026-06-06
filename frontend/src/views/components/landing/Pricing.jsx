import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard } from "lucide-react";
import { useCheckout } from "@/models/context/CheckoutContext";

const includes = [
  "Lifetime Access — One time payment",
  "iOS + Android Apps",
  "Super Inbox for opportunities",
  "AI Assistant for bios & replies",
  "Govt ID Verified profile",
  "Advanced Profile Insights",
  "Portfolio Showcase + Projects",
  "10 GB Storage + Resume Import",
  "Custom URL + QR Sharing",
  "Premium Student Identity",
];

export default function Pricing() {
  const [nfc, setNfc] = useState(false);
  const { open: openCheckout } = useCheckout();
  const total = 899 + (nfc ? 999 : 0);

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
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
            Student launch offer
          </span>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-black">
            One payment.{" "}
            <span className="text-blue-600">Lifetime identity.</span>
          </h2>
          <p className="mt-5 text-neutral-600 text-lg max-w-xl">
            Limited launch pricing. Locks in forever — no monthly fees, no
            upgrades, no surprises.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-5 gap-4 max-w-5xl items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl bg-black text-white p-8 sm:p-10 flex flex-col"
            data-testid="pricing-card-main"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-blue-600 text-white font-medium">
                Student Launch Offer
              </span>
              <span className="text-[11px] text-white/50 uppercase tracking-wider">
                Pricing increases soon
              </span>
            </div>

            <h3 className="font-display mt-6 text-3xl sm:text-4xl font-black">
              Lifetime Prosite Access
            </h3>
            <p className="mt-2 text-white/60">
              Everything to build, share & grow your professional identity.
            </p>

            <div className="mt-7 flex items-end gap-4">
              <p className="font-display text-6xl sm:text-7xl font-black tracking-tighter">
                ₹899
              </p>
              <div className="pb-2">
                <p className="text-white/40 line-through text-xl font-bold">
                  ₹1,799
                </p>
                <p className="text-xs text-blue-400">Save 50%</p>
              </div>
            </div>

            <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {includes.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                  <Check size={15} className="mt-0.5 text-white shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setNfc(!nfc)}
              data-testid="nfc-toggle"
              className={`mt-8 w-full rounded-xl p-5 border text-left transition-colors ${
                nfc
                  ? "border-white bg-white text-black"
                  : "border-white/15 hover:border-white/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-lg grid place-items-center border ${
                    nfc
                      ? "bg-black text-white border-black"
                      : "border-white/15 text-white/70"
                  }`}
                >
                  <CreditCard size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    + Gold Metal NFC Card{" "}
                    <span className={`text-xs ${nfc ? "text-neutral-500" : "text-white/50"}`}>Add-on</span>
                  </p>
                  <p className={`text-xs mt-0.5 ${nfc ? "text-neutral-600" : "text-white/50"}`}>
                    Tap to share your Prosite at any event.
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2 justify-end">
                    <p className="font-display font-bold">+ ₹999</p>
                    <p className={`text-xs line-through ${nfc ? "text-neutral-400" : "text-white/40"}`}>
                      ₹2,500
                    </p>
                  </div>
                  <p className={`text-[10px] uppercase tracking-wider ${nfc ? "text-neutral-500" : "text-white/50"}`}>
                    {nfc ? "Added" : "Tap to add"}
                  </p>
                </div>
              </div>
            </button>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  openCheckout();
                }}
                data-testid="pricing-cta"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-neutral-100 transition-colors"
              >
                Pay ₹{total.toLocaleString("en-IN")} · Get Lifetime Access
              </a>
              <p className="text-xs text-white/50">
                One-time payment · No coding · Cancel anytime
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div
              className="relative rounded-2xl p-8 h-full min-h-[360px] flex flex-col justify-between bg-[#d4af6a] text-black"
              data-testid="nfc-card-visual"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] font-medium">
                  Prosite Gold NFC
                </p>
                <p className="font-display mt-3 text-3xl font-black">
                  Tap. Get
                  <br />
                  Remembered.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider opacity-60">
                    prosite.io/aanya
                  </p>
                  <p className="font-display font-bold mt-0.5">Aanya Sharma</p>
                </div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12.55a11 11 0 0 1 14 0" />
                  <path d="M8.5 16.43a6 6 0 0 1 7 0" />
                  <path d="M12 20h.01" />
                </svg>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200 p-5 text-sm text-neutral-700">
              <p className="font-display font-bold text-black">
                Why students grab the NFC
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  "Looks insane at networking events",
                  "Tap to share Prosite instantly",
                  "Reusable — no app needed",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2 text-neutral-700">
                    <Check size={14} className="mt-0.5 text-black" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
