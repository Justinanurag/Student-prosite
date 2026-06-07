import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  User,
  Mail,
  Phone,
  Briefcase,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [creatorType, setCreatorType] = useState("");
  const [creatorTypes, setCreatorTypes] = useState([
    "Visitor",
    "Student",
    "Artist",
    "Designer",
    "Artisan",
    "Photographer",
    "Architect",
    "Comedian",
    "Yoga Therapist",
    "Poet",
    "Writer",
    "Video Editor",
    "Influencer",
    "Digital Creator",
    "Dancer",
    "Singer",
    "Other Creative",
  ]);
  const [loading, setLoading] = useState(false);
  const [fetchingTypes, setFetchingTypes] = useState(false);

  const BACKEND_URL =
    process.env.REACT_APP_API_URL ||
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "https://www.1atives.com"
      : "https://www.1atives.com");

  useEffect(() => {
    // Set a delay of 5 seconds before showing the popup for a smoother entrance
    const timer = setTimeout(() => {
      setOpen(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      // Fetch creator types from Atives platform API
      const fetchCreatorTypes = async () => {
        setFetchingTypes(true);
        try {
          const res = await fetch(`${BACKEND_URL}/api/creator-types`);
          const data = await res.json();
          if (data.success && Array.isArray(data.data)) {
            setCreatorTypes(data.data);
          }
        } catch (error) {
          console.error("Failed to fetch creator types:", error);
        } finally {
          setFetchingTypes(false);
        }
      };

      fetchCreatorTypes();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, BACKEND_URL]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !creatorType) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          creatorType: creatorType,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Details submitted successfully! Welcome to Atives.");
        setOpen(false);
      } else {
        toast.error(data.error || "Failed to submit details.");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-[420px] rounded-[32px] bg-[#0A0A12] border border-white/[0.08] p-8 shadow-2xl overflow-hidden ring-glow"
          >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full radial-purple opacity-40 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full radial-blue opacity-40 blur-2xl" />

            {/* Title / Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                  <img
                    src="https://res.cloudinary.com/dzwto9zbu/image/upload/v1779959585/Atives_Logo_1_mpnssp.png"
                    alt="Atives Logo"
                    className="h-6 w-6 object-contain"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">Welcome&nbsp;!</h2>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="text-white/60 hover:text-white transition-colors text-sm font-medium"
              >
                Skip
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 relative text-left"
            >
              {/* Name Field */}
              <label className="block">
                <span className="block text-[10.5px] uppercase tracking-[0.2em] text-white/45 mb-1.5 font-body font-semibold">
                  Full Name
                </span>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.08] focus:border-prosite-electric focus:bg-white/[0.06] outline-none pl-10 pr-3.5 py-3 text-[13px] text-white placeholder:text-white/20 transition font-body"
                  />
                </div>
              </label>

              {/* Email Field */}
              <label className="block">
                <span className="block text-[10.5px] uppercase tracking-[0.2em] text-white/45 mb-1.5 font-body font-semibold">
                  Email Address
                </span>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.08] focus:border-prosite-electric focus:bg-white/[0.06] outline-none pl-10 pr-3.5 py-3 text-[13px] text-white placeholder:text-white/20 transition font-body"
                  />
                </div>
              </label>

              {/* Phone Field */}
              <label className="block">
                <span className="block text-[10.5px] uppercase tracking-[0.2em] text-white/45 mb-1.5 font-body font-semibold">
                  Phone Number
                </span>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.08] focus:border-prosite-electric focus:bg-white/[0.06] outline-none pl-10 pr-3.5 py-3 text-[13px] text-white placeholder:text-white/20 transition font-body"
                  />
                </div>
              </label>

              {/* Creator Type Field */}
              <label className="block">
                <span className="block text-[10.5px] uppercase tracking-[0.2em] text-white/45 mb-1.5 font-body font-semibold">
                  Creator Profile
                </span>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                  <select
                    value={creatorType}
                    onChange={(e) => setCreatorType(e.target.value)}
                    required
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.08] focus:border-prosite-electric focus:bg-white/[0.06] outline-none pl-10 pr-10 py-3 text-[13px] text-white placeholder:text-white/20 appearance-none transition font-body"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#0A0A12] text-white/30"
                    >
                      Select your specialty...
                    </option>
                    {creatorTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-[#0A0A12] text-white/80 hover:bg-[#141424]"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/30">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-3.5 font-semibold text-[13.5px] hover:bg-white/95 transition disabled:opacity-70 ring-glow"
              >
                {loading ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-black/70 border-t-transparent animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Secure Text below button */}
              <div className="flex items-center justify-center gap-1.5 mt-4 text-white/40">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold font-body">
                  100% data protected
                </span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
