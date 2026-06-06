import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowLeft,
  ArrowRight,
  PartyPopper,
  Mail,
  User,
  Phone,
  Copy,
  Loader2,
} from "lucide-react";
import { useCheckout } from "@/models/context/CheckoutContext";
import axios from "axios";

const MEMBERSHIP_PRICE = 899;
const MEMBERSHIP_STRIKE = 1799;
const NFC_PRICE = 999;
const NFC_STRIKE = 2500;

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CheckoutModal() {
  const { isOpen, close } = useCheckout();
  const [step, setStep] = useState("cart"); // cart | details | success
  const [nfc, setNfc] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [order, setOrder] = useState(null);

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      setStep("cart");
      setNfc(true);
      setForm({ name: "", email: "", phone: "" });
      setErrors({});
      setServerError("");
      setOrder(null);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const subtotal = MEMBERSHIP_PRICE + (nfc ? NFC_PRICE : 0);
  const fullPrice = MEMBERSHIP_STRIKE + (nfc ? NFC_STRIKE : 0);
  const youSave = fullPrice - subtotal;

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setServerError("");
    try {
      const { data } = await axios.post(`${API}/orders`, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        include_nfc: nfc,
      });
      setOrder(data);
      setStep("success");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setServerError(
        typeof detail === "string"
          ? detail
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-testid="checkout-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step === "details" && (
                  <button
                    onClick={() => setStep("cart")}
                    data-testid="checkout-back"
                    className="w-8 h-8 rounded-full border border-neutral-200 grid place-items-center text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors"
                    aria-label="Back"
                  >
                    <ArrowLeft size={14} />
                  </button>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    {step === "success" ? "Order complete" : "Checkout"}
                  </p>
                  <p className="font-display font-bold text-lg text-black mt-0.5">
                    {step === "cart" && "Lifetime Prosite Access"}
                    {step === "details" && "Your details"}
                    {step === "success" && "You're in. Welcome."}
                  </p>
                </div>
              </div>

              {/* Steps indicator */}
              {step !== "success" && (
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-neutral-500">
                  <span className={step === "cart" ? "text-black font-medium" : ""}>
                    1. Cart
                  </span>
                  <span>·</span>
                  <span className={step === "details" ? "text-black font-medium" : ""}>
                    2. Details
                  </span>
                </div>
              )}

              <button
                onClick={close}
                data-testid="checkout-close"
                className="w-9 h-9 rounded-full border border-neutral-200 grid place-items-center text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {step === "cart" && (
                <CartStep
                  nfc={nfc}
                  setNfc={setNfc}
                  subtotal={subtotal}
                  fullPrice={fullPrice}
                  youSave={youSave}
                  onContinue={() => setStep("details")}
                />
              )}
              {step === "details" && (
                <DetailsStep
                  form={form}
                  setForm={setForm}
                  errors={errors}
                  submitting={submitting}
                  serverError={serverError}
                  subtotal={subtotal}
                  nfc={nfc}
                  onPay={submit}
                />
              )}
              {step === "success" && order && <SuccessStep order={order} onClose={close} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ───── Step 1: Cart ─────
function CartStep({ nfc, setNfc, subtotal, fullPrice, youSave, onContinue }) {
  return (
    <div className="space-y-4">
      <div
        data-testid="checkout-membership"
        className="rounded-2xl border border-black p-5 bg-neutral-50"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-black grid place-items-center text-white shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium text-black">Lifetime Prosite Access</p>
              <span className="text-[10px] uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded-full">
                Added
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              Mobile apps · AI Assistant · Govt ID Verified · Super Inbox · 10 GB storage
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display font-bold text-black">
              ₹{MEMBERSHIP_PRICE.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-neutral-400 line-through">
              ₹{MEMBERSHIP_STRIKE.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setNfc(!nfc)}
        data-testid="checkout-nfc-toggle"
        aria-pressed={nfc}
        className={`w-full text-left rounded-2xl border p-5 transition-colors ${
          nfc ? "border-black bg-white" : "border-neutral-200 bg-white hover:border-neutral-400"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            data-testid="checkout-nfc-checkbox"
            className={`mt-0.5 w-5 h-5 rounded-md border grid place-items-center shrink-0 transition-colors ${
              nfc ? "bg-black border-black text-white" : "bg-white border-neutral-300"
            }`}
          >
            {nfc && <Check size={13} strokeWidth={3} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium text-black">Lifetime Gold Metal NFC Card</p>
              <span className="text-[10px] uppercase tracking-wider bg-[#d4af6a] text-black px-2 py-0.5 rounded-full">
                Recommended
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              Tap to share your Prosite at any event. Reusable, no app needed.
            </p>
            <p className="text-[11px] text-blue-600 mt-2">
              ✓ Looks insane at networking events &nbsp;·&nbsp; ✓ Reusable forever
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display font-bold text-black">
              ₹{NFC_PRICE.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-neutral-400 line-through">
              ₹{NFC_STRIKE.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </button>

      <div
        data-testid="checkout-summary"
        className="rounded-2xl border border-neutral-200 p-5 space-y-2.5"
      >
        <Row label="Subtotal" value={`₹${subtotal.toLocaleString("en-IN")}`} />
        <Row
          label="Original price"
          value={<span className="line-through">₹{fullPrice.toLocaleString("en-IN")}</span>}
        />
        <Row
          label={<span className="text-blue-600">You save</span>}
          value={<span className="text-blue-600 font-medium">− ₹{youSave.toLocaleString("en-IN")}</span>}
        />
        <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between">
          <p className="font-display font-bold text-black">Total</p>
          <p data-testid="checkout-total" className="font-display text-2xl font-black text-black">
            ₹{subtotal.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        data-testid="checkout-continue"
        className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition-colors"
      >
        Continue
        <ArrowRight size={16} />
      </button>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
        <Lock size={11} /> Secure checkout · One-time payment
      </p>
    </div>
  );
}

// ───── Step 2: Details ─────
function DetailsStep({ form, setForm, errors, submitting, serverError, subtotal, nfc, onPay }) {
  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div className="space-y-4">
      <Field
        label="Full name"
        icon={<User size={14} />}
        testId="checkout-input-name"
        value={form.name}
        onChange={handle("name")}
        placeholder="Aanya Sharma"
        error={errors.name}
      />
      <Field
        label="Email"
        icon={<Mail size={14} />}
        testId="checkout-input-email"
        type="email"
        value={form.email}
        onChange={handle("email")}
        placeholder="aanya@iitb.ac.in"
        error={errors.email}
        helper="Your order receipt and login will be sent here."
      />
      <Field
        label="Phone (optional)"
        icon={<Phone size={14} />}
        testId="checkout-input-phone"
        type="tel"
        value={form.phone}
        onChange={handle("phone")}
        placeholder="+91 98xxx xxx12"
      />

      <div className="rounded-2xl border border-neutral-200 p-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">You're paying</p>
          <p className="font-display text-2xl font-black text-black mt-0.5">
            ₹{subtotal.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            Lifetime Access {nfc ? "+ Gold Metal NFC" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={onPay}
          disabled={submitting}
          data-testid="checkout-pay-btn"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <CreditCard size={16} />
              Pay ₹{subtotal.toLocaleString("en-IN")}
            </>
          )}
        </button>
      </div>

      {serverError && (
        <p data-testid="checkout-server-error" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
        <Lock size={11} /> 256-bit secure · We never store card details
      </p>
    </div>
  );
}

function Field({ label, icon, value, onChange, placeholder, type = "text", error, helper, testId }) {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700 mb-1.5">
        {label}
      </label>
      <div className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 bg-white ${
        error ? "border-red-300" : "border-neutral-200 focus-within:border-black"
      } transition-colors`}>
        <span className="text-neutral-400">{icon}</span>
        <input
          data-testid={testId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm text-black placeholder:text-neutral-400"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      {!error && helper && <p className="mt-1.5 text-xs text-neutral-500">{helper}</p>}
    </div>
  );
}

// ───── Step 3: Success ─────
function SuccessStep({ order, onClose }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(order.order_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div data-testid="checkout-success" className="space-y-5">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
        className="mx-auto w-16 h-16 rounded-full bg-black grid place-items-center text-white"
      >
        <PartyPopper size={26} />
      </motion.div>

      <div className="text-center">
        <h3 className="font-display text-2xl sm:text-3xl font-black text-black tracking-tight">
          Welcome to Prosite, {order.name.split(" ")[0]}.
        </h3>
        <p className="mt-2 text-neutral-600">
          Your lifetime access is live. We've sent the receipt to{" "}
          <span className="text-black font-medium">{order.email}</span>.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-500">
              Order number
            </p>
            <p data-testid="checkout-order-number" className="font-display font-bold text-black mt-0.5">
              {order.order_number}
            </p>
          </div>
          <button
            onClick={copy}
            data-testid="checkout-copy-order"
            className="inline-flex items-center gap-1.5 text-xs text-black border border-neutral-200 rounded-full px-3 py-1.5 hover:border-neutral-400 transition-colors"
          >
            <Copy size={12} /> {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="border-t border-neutral-100 pt-4 space-y-2">
          {order.items.map((it) => (
            <div key={it.sku} className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">{it.name}</span>
              <span className="text-black font-medium">
                ₹{it.price.toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
          <span className="font-display font-bold text-black">Total paid</span>
          <span data-testid="checkout-success-total" className="font-display text-xl font-black text-black">
            ₹{order.total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-5">
        <p className="text-xs uppercase tracking-wider text-neutral-500">What's next</p>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          <li className="flex items-start gap-2">
            <Check size={14} className="mt-0.5 text-black shrink-0" /> Check your inbox for the receipt and login link.
          </li>
          <li className="flex items-start gap-2">
            <Check size={14} className="mt-0.5 text-black shrink-0" /> Start building your Prosite — it takes ~3 minutes.
          </li>
          {order.include_nfc && (
            <li className="flex items-start gap-2">
              <Check size={14} className="mt-0.5 text-black shrink-0" /> Your Gold NFC card ships in 3–5 business days.
            </li>
          )}
        </ul>
      </div>

      <button
        type="button"
        onClick={onClose}
        data-testid="checkout-success-cta"
        className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition-colors"
      >
        Start building my Prosite
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm text-neutral-600">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
