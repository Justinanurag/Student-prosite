import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  ShieldCheck,
  Lock,
  ArrowRight,
  Nfc,
  Mail,
  Tag,
  CreditCard,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import TermsSheet from "./TermsSheet";
import { useCheckout } from "@/models/context/CheckoutContext";

const NFC_IMG =
  "https://res.cloudinary.com/dzwto9zbu/image/upload/v1780505654/ChatGPT_Image_Jun_3_2026_10_09_45_PM_veceg4.png";
const ATIVES_LOGO =
  "https://res.cloudinary.com/dzwto9zbu/image/upload/v1779959585/Atives_Logo_1_mpnssp.png";

const included = [
  "Beautiful Prosite",
  "iOS + Android Apps",
  "AI Assistant",
  "Smart Inbox",
  "Sell Products & Services",
  "Sell Courses & Tickets",
  "Govt ID Verified Profile",
  "Lifetime Access",
];

export default function CheckoutModal() {
  const { isOpen: open, close: onClose } = useCheckout();
  const [nfc, setNfc] = useState(true);
  const [step, setStep] = useState("review"); // review | otp | password | basic-details | payment | success
  const [form, setForm] = useState({ name: "", email: "", phone: "", otp: "", password: "", confirmPassword: "", city: "", creatorType: "Creator" });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [profileId, setProfileId] = useState("");
  const [user, setUser] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState({
    code: "LP50",
    discount: 50,
    discountType: "percentage",
    timer: 0
  });
  const [couponError, setCouponError] = useState("");
  const [userStatus, setUserStatus] = useState(null);
  const [verificationMode, setVerificationMode] = useState(""); // "" | "otp" | "password"
  const [showTerms, setShowTerms] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_API_URL || "https://www.1atives.com";
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://www.1atives.com");

  const fetchCurrentUser = async (authToken, modeParam, emailParam) => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/user`, {
        headers: { "Authorization": `Bearer ${authToken}` },
        credentials: "include"
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setForm((prev) => ({
          ...prev,
          email: data.user.email || emailParam || prev.email,
          phone: data.user.phone || prev.phone,
          name: data.user.fullName || prev.name,
          city: data.user.city || prev.city,
          creatorType: data.user.creatorType || prev.creatorType || "Creator"
        }));

        const needsDetails = !data.user.fullName || data.user.fullName === "Incomplete Profile" || !data.user.city || !data.user.phone;

        if (data.user.plan?.status === "active") {
          if (needsDetails) {
            setStep("basic-details");
            return;
          }
          toast.info("You already have an active membership to Atives!");
          setTimeout(() => {
            window.location.href = `${BACKEND_URL}?token=${encodeURIComponent(authToken)}`;
          }, 2000);
          return;
        }

        // Always proceed directly to payment setup first for non-active plan users
        await setupAndPay(authToken, data.user);
      } else {
        localStorage.removeItem("token");
        setToken("");
        setStep("review");
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
      setStep("review");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      const params = new URLSearchParams(window.location.search);
      const tokenParam = params.get("token");
      const modeParam = params.get("mode");
      const emailParam = params.get("email");
      const errorParam = params.get("error");

      if (tokenParam || modeParam || emailParam || errorParam) {
        const url = new URL(window.location.href);
        url.searchParams.delete("token");
        url.searchParams.delete("mode");
        url.searchParams.delete("email");
        url.searchParams.delete("error");
        url.searchParams.delete("checkout");
        window.history.replaceState({}, document.title, url.pathname + url.search);
      }

      if (errorParam) {
        toast.error("Google authentication failed. Please try again.");
      }

      if (tokenParam) {
        localStorage.setItem("token", tokenParam);
        setToken(tokenParam);
        fetchCurrentUser(tokenParam, modeParam, emailParam);
      } else {
        const localToken = localStorage.getItem("token");
        if (localToken) {
          setToken(localToken);
          fetchCurrentUser(localToken);
        } else {
          setStep("review");
          setLoading(false);
        }
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (step !== "review") {
      setVerificationMode("");
    }
  }, [step]);

  const base = 1798;
  const original = 1798;

  let netPrice = base;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      netPrice = original * (1 - appliedCoupon.discount / 100);
    } else {
      netPrice = original - appliedCoupon.discount;
    }
    netPrice = Math.max(0, Math.round(netPrice));
  }

  const saved = original - netPrice;

  // NFC Calculations based on reference image
  const originalMembership = 1798;
  const originalNfc = 2500;
  const originalTotal = originalMembership + (nfc ? originalNfc : 0);

  if (nfc) {
    netPrice += 999;
  }

  const totalSaved = originalTotal - netPrice;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const triggerRazorpay = async (authToken, pId, user) => {
    setLoading(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay SDK. Check your internet connection.");
        return;
      }

      // Create order in backend
      const res = await fetch(`${BACKEND_URL}/api/payment/razorpay/create-order`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          amount: netPrice,
          productinfo: "Get Prosite" + (nfc ? " + NFC Card" : ""),
          paymentType: "direct",
          customerInfo: {
            name: form.name || user?.fullName || "Anurag Tiwari",
            email: form.email || user?.email || "justinanurag0.2@gmail.com",
            contact: form.phone || user?.phone || "+919407614963"
          },
          planDuration: null,
          plan: "start"
        })
      });

      const orderData = await res.json();
      if (!orderData.success) {
        toast.error(orderData.error || "Order creation failed");
        return;
      }

      const options = {
        key: orderData.razorpayKeyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Atives",
        description: "Get Prosite Lifetime Access" + (nfc ? " + NFC Card" : ""),
        order_id: orderData.order.id,
        handler: async function (response) {
          setLoading(true);
          try {
            const verifyRes = await fetch(`${BACKEND_URL}/api/payment/razorpay/verify`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
              },
              body: JSON.stringify({
                ...response,
                token: authToken
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              // Activate membership
              const activateRes = await fetch(`${BACKEND_URL}/api/profile/setup/membership/activate`, {
                method: "PUT",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify({
                  plan: "start",
                  profileId: pId,
                  couponUsed: appliedCoupon,
                  nfcPurchased: nfc,
                  paymentData: {
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                    amount: netPrice,
                    currency: "INR",
                    status: "captured",
                    method: verifyData.paymentDetails?.method || "Online"
                  }
                })
              });
              const activateData = await activateRes.json();
              if (activateData.success) {
                toast.success("Payment successful! Lifetime access granted.");
                const needsDetails = !user || !user.fullName || user.fullName === "Incomplete Profile" || !user.city || !user.phone;
                if (needsDetails) {
                  setStep("basic-details");
                } else {
                  setStep("success");
                }
              } else {
                toast.error(activateData.error || "Failed to activate membership.");
              }
            } else {
              toast.error(verifyData.error || "Payment verification failed.");
            }
          } catch (err) {
            toast.error("Failed to verify payment signature.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: form.name || user?.fullName || "",
          email: form.email || user?.email || "",
          contact: form.phone || user?.phone || "",
        },
        theme: {
          color: "#0A0A12",
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled.");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Error setting up payment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerSendOtp = async (pattern) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/send-otp`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: form.email,
          type: "email",
          pattern: pattern,
          checkMembership: true
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`OTP code sent to your email (${pattern === 'login' ? 'Login' : 'Signup'})!`);
        setVerificationMode("otp");
      } else {
        toast.error(data.error || "Failed to send OTP.");
      }
    } catch (err) {
      toast.error("Failed to connect to authentication server.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const returnUrl = `${window.location.origin}${window.location.pathname}?checkout=true`;
      const res = await fetch(`${BACKEND_URL}/api/auth/google?returnUrl=${encodeURIComponent(returnUrl)}`, {
        credentials: "include"
      });
      const data = await res.json();
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        toast.error(data.error || "Failed to initiate Google login");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Authentication server communication failed.");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setUserStatus(null);
    setVerificationMode("");
    setForm({ name: "", email: "", phone: "", otp: "", password: "", confirmPassword: "", city: "", creatorType: "Creator" });
    toast.info("Logged out successfully.");
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!form.email) {
      toast.error("Please enter your email to continue.");
      return;
    }
    setLoading(true);
    try {
      const checkRes = await fetch(`${BACKEND_URL}/api/auth/check-email?email=${encodeURIComponent(form.email)}`, {
        credentials: "include"
      });
      const statusData = await checkRes.json();
      setUserStatus(statusData);

      if (statusData.success) {
        if (statusData.exists && statusData.hasBasicDetails) {
          if (statusData.hasPassword) {
            setVerificationMode("password");
            setLoading(false);
          } else {
            toast.info("Google login account detected. You can log in via Google or request an OTP.");
            await triggerSendOtp("login");
          }
        } else if (statusData.exists && !statusData.hasBasicDetails) {
          await triggerSendOtp("login");
        } else {
          await triggerSendOtp("signup");
        }
      } else {
        toast.error(statusData.error || "Failed to check email status");
        setLoading(false);
      }
    } catch (err) {
      toast.error("API error. Ensure the Next.js backend is running.");
      setLoading(false);
    }
  };

  const setupAndPay = async (authToken, user) => {
    setLoading(true);
    try {
      let activeProfileId = user?.plan?.profileId;
      if (!activeProfileId) {
        // Create profile type (step 1)
        const userTypeRes = await fetch(`${BACKEND_URL}/api/profile/setup/user-type`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify({
            profileType: "professional"
          })
        });
        const userTypeData = await userTypeRes.json();
        if (!userTypeData.success) {
          throw new Error(userTypeData.error || "Failed to initialize profile type");
        }
        activeProfileId = userTypeData.profileId;
      }
      setProfileId(activeProfileId);

      // Save plan info
      const saveRes = await fetch(`${BACKEND_URL}/api/profile/setup/membership`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          plan: "start",
          profileId: activeProfileId
        })
      });
      const saveResData = await saveRes.json();
      if (!saveResData.success) {
        throw new Error(saveResData.error || "Failed to save plan in profile");
      }

      // Directly execute payment or activation without showing the "payment" step
      if (netPrice === 0) {
        const activateRes = await fetch(`${BACKEND_URL}/api/profile/setup/membership/activate`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify({
            plan: "start",
            profileId: activeProfileId,
            couponUsed: appliedCoupon,
            nfcPurchased: nfc,
            paymentData: {
              paymentId: `free_${Date.now()}`,
              orderId: `free_${Date.now()}`,
              amount: 0,
              currency: "INR",
              status: "captured",
              method: "free_coupon"
            }
          })
        });
        const activateData = await activateRes.json();
        if (activateData.success) {
          toast.success("Lifetime access activated using free coupon!");
          const needsDetails = !user || !user.fullName || user.fullName === "Incomplete Profile" || !user.city || !user.phone;
          if (needsDetails) {
            setStep("basic-details");
          } else {
            setStep("success");
          }
        } else {
          toast.error(activateData.error || "Failed to activate membership.");
        }
      } else {
        await triggerRazorpay(authToken, activeProfileId, user);
      }
    } catch (err) {
      toast.error(err.message || "Error setting up membership profile");
    } finally {
      setLoading(false);
    }
  };

  const applyCouponCode = async (code) => {
    if (!code.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    
    // Intercept client-side hardcoded coupon LP50
    if (code.trim().toUpperCase() === "LP50") {
      setAppliedCoupon({
        code: "LP50",
        discount: 50,
        discountType: "percentage",
        timer: null,
        startTime: new Date().toISOString()
      });
      toast.success('Coupon "LP50" applied successfully!');
      setCouponInput("");
      setCouponLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/coupon/get?code=${encodeURIComponent(code.trim())}&plan=start`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        const coupon = data.data;
        setAppliedCoupon({
          code: coupon.code,
          discount: coupon.effectiveDiscount || coupon.discount,
          discountType: coupon.effectiveDiscountType || coupon.discountType,
          timer: coupon.timer,
          startTime: new Date().toISOString()
        });
        toast.success(`Coupon "${coupon.code}" applied successfully!`);
        setCouponInput("");
      } else {
        setCouponError(data.error || "Invalid coupon code");
        toast.error(data.error || "Invalid coupon code");
      }
    } catch (err) {
      setCouponError("Failed to verify coupon code");
      toast.error("Failed to verify coupon code");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCouponCode(couponInput);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    toast.info("Coupon removed.");
  };

  const handlePayOrActivate = async () => {
    if (netPrice === 0) {
      setLoading(true);
      try {
        const activateRes = await fetch(`${BACKEND_URL}/api/profile/setup/membership/activate`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            plan: "start",
            profileId: profileId,
            couponUsed: appliedCoupon,
            nfcPurchased: nfc,
            paymentData: {
              paymentId: `free_${Date.now()}`,
              orderId: `free_${Date.now()}`,
              amount: 0,
              currency: "INR",
              status: "captured",
              method: "free_coupon"
            }
          })
        });
        const activateData = await activateRes.json();
        if (activateData.success) {
          toast.success("Lifetime access activated using free coupon!");
          const needsDetails = !user || !user.fullName || user.fullName === "Incomplete Profile" || !user.city || !user.phone;
          if (needsDetails) {
            setStep("basic-details");
          } else {
            setStep("success");
          }
        } else {
          toast.error(activateData.error || "Failed to activate membership.");
        }
      } catch (err) {
        toast.error("Failed to activate free membership.");
      } finally {
        setLoading(false);
      }
    } else {
      triggerRazorpay(token, profileId, user);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!form.otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contact: form.email, 
          type: "email", 
          otp: form.otp, 
          pattern: userStatus?.exists ? "login" : "signup" 
        }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        await fetchCurrentUser(data.token);
      } else {
        toast.error(data.error || "Invalid OTP.");
        setLoading(false);
      }
    } catch (err) {
      toast.error("API error during OTP verification.");
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!form.password) {
      toast.error("Please enter your password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: form.email,
          password: form.password,
          type: "email"
        })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        await fetchCurrentUser(data.token);
      } else {
        toast.error(data.error || "Invalid password.");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Failed to connect to authentication server.");
      setLoading(false);
    }
  };

  const handleBasicDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.city || !form.creatorType) {
      toast.error("Please fill in all basic profile fields.");
      return;
    }

    if (form.password) {
      if (form.password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return;
      }
      if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/\d/.test(form.password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password)) {
        toast.error("Password must contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character.");
        return;
      }
      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    setLoading(true);
    try {
      const body = {
        email: form.email,
        fullName: form.name,
        phone: form.phone,
        city: form.city,
        creatorType: form.creatorType,
      };
      if (form.password) {
        body.password = form.password;
      }

      const res = await fetch(`${BACKEND_URL}/api/auth/signup/complete`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Profile details completed!");
        setUser(data.user);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        }
        setStep("success");
      } else {
        toast.error(data.error || "Failed to complete signup.");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Failed to connect to authentication server.");
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster theme="dark" position="top-center" toastOptions={{ style: { background: "#0A0A12", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" } }} />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
            data-testid="checkout-modal"
          >
            <div
              data-testid="checkout-backdrop"
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full sm:max-w-[960px] mx-auto max-h-[92vh] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="relative flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-200 bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-black flex items-center justify-center shadow-sm">
                    <img src={ATIVES_LOGO} alt="Atives" className="h-5 w-5 object-contain" />
                  </div>
                  <div>
                    <div className="font-display text-base font-bold leading-none text-black">
                      Secure Checkout
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1.5">
                      <Lock className="h-3 w-3" />
                      Encrypted · One-time payment
                    </div>
                  </div>
                </div>
                <button
                  data-testid="checkout-close-btn"
                  onClick={onClose}
                  aria-label="Close checkout"
                  className="h-9 w-9 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {step === "review" ? (
                <div className="relative grid grid-cols-1 md:grid-cols-5 gap-0 overflow-y-auto min-h-0">
                  <div className="md:col-span-3 p-6 sm:p-8 bg-black text-white border-b md:border-b-0 md:border-r border-neutral-800">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-blue-600 text-white font-medium">
                        Student Launch Offer
                      </span>
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">
                        Lifetime · No subscription
                      </span>
                    </div>

                    <h3 className="font-display mt-5 text-2xl sm:text-3xl font-black tracking-tight">
                      Lifetime Prosite Access
                    </h3>
                    <p className="mt-1.5 text-sm text-white/55">
                      Everything to build, share & grow your professional identity.
                    </p>

                    <div className="mt-6 flex items-end gap-4 flex-wrap">
                      <span className="font-display text-5xl sm:text-6xl font-black tracking-tighter leading-none">
                        ₹{appliedCoupon ? Math.max(0, Math.round(1798 - saved)) : 1798}
                      </span>
                      <div className="pb-1">
                        <span className="block text-white/35 line-through text-lg">₹1,798</span>
                        {appliedCoupon && (
                          <span className="text-xs text-blue-400 font-semibold">
                            {appliedCoupon.discountType === "percentage"
                              ? `${appliedCoupon.discount}% off applied`
                              : `₹${appliedCoupon.discount} off applied`}
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="mt-6 grid sm:grid-cols-2 gap-x-5 gap-y-2">
                      {included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[13px] text-white/75">
                          <Check size={14} className="mt-0.5 text-blue-400 shrink-0" strokeWidth={2.5} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => setNfc(!nfc)}
                      className={`mt-7 w-full rounded-xl p-4 border text-left transition-all duration-200 ${
                        nfc
                          ? "border-white bg-white text-black shadow-lg"
                          : "border-white/15 hover:border-white/30 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-[88px] shrink-0 rounded-lg overflow-hidden border border-white/10">
                          <img src={NFC_IMG} alt="NFC Card" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm flex items-center gap-1.5">
                            <Nfc className={`h-4 w-4 ${nfc ? "text-black" : "text-white/70"}`} />
                            Gold Metal NFC Card
                            <span className={`text-[10px] uppercase tracking-wider ${nfc ? "text-neutral-500" : "text-white/40"}`}>
                              Add-on
                            </span>
                          </p>
                          <p className={`text-xs mt-0.5 ${nfc ? "text-neutral-600" : "text-white/50"}`}>
                            Tap to share your Prosite at any event.
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-baseline gap-1.5 justify-end">
                            <span className="font-display font-bold text-sm">+ ₹999</span>
                            <span className={`text-xs line-through ${nfc ? "text-neutral-400" : "text-white/35"}`}>
                              ₹2,500
                            </span>
                          </div>
                          <div
                            className={`mt-1.5 h-5 w-5 rounded-full border flex items-center justify-center ml-auto ${
                              nfc ? "bg-black border-black text-white" : "border-white/30"
                            }`}
                          >
                            {nfc && <Check className="h-3 w-3" strokeWidth={3} />}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="md:col-span-2 p-5 sm:p-6 bg-neutral-50 flex flex-col">
                    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-3">
                        Order Summary
                      </p>
                      <div className="space-y-2.5 text-sm text-neutral-700">
                        <div className="flex items-center justify-between">
                          <span>Lifetime Start Membership</span>
                          <span className="font-medium">
                            ₹{appliedCoupon ? Math.max(0, Math.round(1798 - saved)) : 1798}
                          </span>
                        </div>
                        {nfc && (
                          <div className="flex items-center justify-between text-blue-600">
                            <span>Gold Metal NFC Card</span>
                            <span className="font-semibold">₹999</span>
                          </div>
                        )}
                        {totalSaved > 0 && (
                          <div className="flex items-center justify-between text-green-600 font-medium">
                            <span>You save</span>
                            <span>-₹{totalSaved.toLocaleString("en-IN")}</span>
                          </div>
                        )}
                      </div>
                      <div className="my-4 h-px bg-neutral-100" />
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                            Total · One-time
                          </p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">Inclusive of all taxes</p>
                        </div>
                        <span
                          data-testid="checkout-total"
                          className="font-display text-3xl font-black tracking-tight text-black"
                        >
                          ₹{netPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {!appliedCoupon ? (
                      <form onSubmit={handleApplyCoupon} className="mt-4">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                            <input
                              type="text"
                              value={couponInput}
                              onChange={(e) => {
                                setCouponInput(e.target.value);
                                setCouponError("");
                              }}
                              placeholder="Coupon code"
                              className="w-full rounded-xl bg-white border border-neutral-200 focus:border-blue-500 outline-none pl-9 pr-3 py-2.5 text-sm text-black placeholder:text-neutral-400 transition"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={couponLoading || !couponInput.trim()}
                            className="shrink-0 px-4 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-50"
                          >
                            {couponLoading ? "..." : "Apply"}
                          </button>
                        </div>
                        {couponError && (
                          <p className="mt-1.5 text-xs text-red-500">{couponError}</p>
                        )}
                      </form>
                    ) : (
                      <div className="mt-4 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-3.5 py-2.5">
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <Check className="h-3.5 w-3.5" />
                          <span className="font-medium">{appliedCoupon.code}</span>
                          <span className="text-green-600 text-xs">applied</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-xs text-neutral-500 hover:text-neutral-700 transition"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    <form onSubmit={
                      token
                        ? (e) => { e.preventDefault(); setupAndPay(token, user); }
                        : verificationMode === "otp"
                        ? handleVerifyOtp
                        : verificationMode === "password"
                        ? handlePasswordLogin
                        : handlePay
                    } className="mt-5 space-y-3 flex-1" data-testid="checkout-form">
                      {!token && verificationMode === "" && (
                        <>
                          <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-60"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                          </button>
                          <div className="relative py-1">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-neutral-200" />
                            </div>
                            <div className="relative flex justify-center text-[11px]">
                              <span className="bg-neutral-50 px-3 text-neutral-400 uppercase tracking-wider">
                                or use email
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      <Field
                        label="Email address"
                        type="email"
                        placeholder="you@studio.com"
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                        testid="checkout-input-email"
                        disabled={verificationMode !== "" || !!token}
                        icon={Mail}
                      />

                      {verificationMode === "otp" && (
                        <div className="space-y-3 text-left">
                          <Field
                            label="Verification code"
                            placeholder="Enter 6-digit OTP"
                            value={form.otp}
                            onChange={(v) => setForm({ ...form, otp: v })}
                          />
                          <p className="text-xs text-neutral-500 text-center">
                            Sent to <span className="font-medium text-neutral-700">{form.email}</span>
                          </p>
                          <div className="flex flex-col gap-2 pt-1 text-center">
                            {userStatus?.exists && userStatus?.hasPassword && (
                              <button
                                type="button"
                                onClick={() => setVerificationMode("password")}
                                className="text-xs text-blue-600 hover:underline transition"
                              >
                                Login with password instead
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setVerificationMode("");
                                setForm((prev) => ({ ...prev, otp: "" }));
                              }}
                              className="text-xs text-neutral-400 hover:text-neutral-600 transition"
                            >
                              Change email address
                            </button>
                          </div>
                        </div>
                      )}

                      {verificationMode === "password" && (
                        <div className="space-y-3 text-left">
                          <Field
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(v) => setForm({ ...form, password: v })}
                          />
                          <div className="flex flex-col gap-2 pt-1 text-center">
                            <button
                              type="button"
                              onClick={() => triggerSendOtp("login")}
                              className="text-xs text-blue-600 hover:underline transition"
                            >
                              Verify with OTP instead
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setVerificationMode("");
                                setForm((prev) => ({ ...prev, password: "" }));
                              }}
                              className="text-xs text-neutral-400 hover:text-neutral-600 transition"
                            >
                              Change email address
                            </button>
                          </div>
                        </div>
                      )}

                      {!verificationMode && (
                        <p className="text-[11px] text-neutral-400 text-center">
                          {token
                            ? "You're signed in. Proceed to secure payment."
                            : "We'll verify your account and send a one-time code."}
                        </p>
                      )}

                      <button
                        type="submit"
                        data-testid="checkout-pay-btn"
                        disabled={loading}
                        className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-6 py-3.5 font-semibold text-sm hover:bg-neutral-800 transition disabled:opacity-60 shadow-lg shadow-black/10"
                      >
                        {loading ? (
                          <>
                            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            {verificationMode !== "" ? "Verifying..." : "Processing..."}
                          </>
                        ) : (
                          <>
                            {verificationMode === "otp"
                              ? "Verify & Continue"
                              : verificationMode === "password"
                              ? "Sign in & Continue"
                              : token
                              ? `Pay ₹${netPrice.toLocaleString("en-IN")}`
                              : `Continue · ₹${netPrice.toLocaleString("en-IN")}`}
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-4 pt-1">
                        <div className="flex items-center gap-1.5 text-neutral-400">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase tracking-wider font-medium">Secure</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-400">
                          <CreditCard className="h-3.5 w-3.5" />
                          <span className="text-[10px] uppercase tracking-wider font-medium">Razorpay</span>
                        </div>
                      </div>

                      {!!token && (
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="text-xs text-neutral-400 hover:text-neutral-600 transition hover:underline"
                          >
                            Use a different account
                          </button>
                        </div>
                      )}
                    </form>
                    <p className="mt-4 text-[11px] text-neutral-400 text-center">
                      By continuing, you agree to our{" "}
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-neutral-600 underline hover:text-black transition"
                      >
                        Terms of Service
                      </button>
                    </p>
                  </div>
                </div>
              ) : step === "basic-details" ? (
                <div className="p-8 sm:p-12 max-w-md mx-auto overflow-y-auto">
                  <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                      <Check className="h-5 w-5 text-blue-600" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-display font-black tracking-tight text-black">
                      Almost there
                    </h3>
                    <p className="text-neutral-500 mt-2 text-sm">
                      Complete your profile to finish setting up Prosite.
                    </p>
                  </div>
                  <form onSubmit={handleBasicDetailsSubmit} className="space-y-4 text-left">
                    <Field
                      label="Full Name"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <Field
                      label="Phone Number"
                      placeholder="+919407614963"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                    />
                    <Field
                      label="City"
                      placeholder="Mumbai"
                      value={form.city}
                      onChange={(v) => setForm({ ...form, city: v })}
                    />
                    <label className="block">
                      <span className="block text-[10.5px] uppercase tracking-[0.2em] text-neutral-500 mb-1.5 font-body">Profile Type</span>
                      <select
                        value={form.creatorType}
                        onChange={(e) => setForm({ ...form, creatorType: e.target.value })}
                        className="w-full rounded-xl bg-white border border-neutral-200 focus:border-blue-500 outline-none px-3.5 py-2.5 text-sm text-black transition font-body"
                      >
                        <option value="Creator">Creator / Professional</option>
                        <option value="Business">Business / Freelancer</option>
                        <option value="Institute">Institute / Academy</option>
                        <option value="Community">Community / Brand</option>
                      </select>
                    </label>

                    {!userStatus?.exists && (
                      <>
                        <Field
                          label="Password"
                          type="password"
                          placeholder="Create password"
                          value={form.password}
                          onChange={(v) => setForm({ ...form, password: v })}
                        />
                        <Field
                          label="Confirm Password"
                          type="password"
                          placeholder="Re-type password"
                          value={form.confirmPassword}
                          onChange={(v) => setForm({ ...form, confirmPassword: v })}
                        />
                      </>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-6 py-3.5 font-semibold text-sm hover:bg-neutral-800 transition disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Completing...
                        </>
                      ) : (
                        <>
                          Complete Profile
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : step === "payment" ? (
                <div className="p-10 sm:p-14 text-center overflow-y-auto">
                  <h3 className="text-2xl font-display font-black tracking-tight mb-2">Complete Payment</h3>
                  <p className="text-sm text-neutral-500 mb-8">Secure checkout powered by Razorpay</p>

                  <div className="max-w-sm mx-auto p-6 mb-8 rounded-2xl border border-neutral-200 bg-neutral-50">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Order Total
                    </div>
                    <div className="font-display text-5xl font-black tracking-tight text-black">
                      ₹{netPrice.toLocaleString("en-IN")}
                    </div>
                    {appliedCoupon && (
                      <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-xs text-green-700">
                        <Tag className="h-3 w-3" />
                        {appliedCoupon.code} applied
                      </div>
                    )}
                    <div className="text-sm text-neutral-500 mt-3 flex items-center justify-center gap-1.5">
                      Lifetime Access {nfc && <span className="text-blue-600 font-medium">+ NFC Card</span>}
                    </div>
                  </div>

                  <div className="max-w-sm mx-auto space-y-4">
                    <button
                      onClick={handlePayOrActivate}
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-6 py-3.5 font-semibold text-sm hover:bg-neutral-800 transition disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {netPrice === 0 ? "Activate Membership" : "Pay with Razorpay"}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setStep("review")}
                      className="text-xs text-neutral-400 hover:text-neutral-600 transition"
                    >
                      ← Back to checkout
                    </button>
                  </div>
                </div>
              ) : (
                <SuccessView nfc={nfc} total={netPrice} email={form.email || user?.email} onClose={onClose} backendUrl={BACKEND_URL} />
              )}

            </motion.div>
        
          </motion.div>
        )}
      </AnimatePresence>

      <TermsSheet open={showTerms} onOpenChange={setShowTerms} />
    </>
  );
}

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  testid,
  disabled = false,
  icon: Icon,
}) => (
  <label className="block">
    <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
      {label}
    </span>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
      )}
      <input
        data-testid={testid}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl bg-white border border-neutral-200 focus:border-blue-500 outline-none py-2.5 text-sm text-black placeholder:text-neutral-400 transition font-body disabled:bg-neutral-100 disabled:text-neutral-500 ${
          Icon ? "pl-10 pr-3.5" : "px-3.5"
        }`}
      />
    </div>
  </label>
);

const SuccessView = ({ nfc, total, email, onClose, backendUrl }) => {
  const token = localStorage.getItem("token") || "";

  const whatsappMessage = `Hello Team, my email is ${email || ""}. My Lifetime Start Membership has been successfully activated. Amount: ₹${total},Please help me setup my Prosite.`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=919407614963&text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    // Attempt automatic popup for WhatsApp in a new tab after 1.5 seconds
    const waTimer = setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1500);

    // Auto-redirect to Atives in current tab after 4.5 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = `${backendUrl}?token=${encodeURIComponent(token)}`;
    }, 4500);

    return () => {
      clearTimeout(waTimer);
      clearTimeout(redirectTimer);
    };
  }, [token, backendUrl, whatsappUrl]);

  return (
    <div className="relative p-10 sm:p-14 text-center overflow-y-auto" data-testid="checkout-success">
      <div className="relative max-w-lg mx-auto">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
          <Check className="h-8 w-8 text-green-600" strokeWidth={2.5} />
        </div>
        <h3 className="mt-6 font-display text-3xl sm:text-4xl font-black tracking-tight text-black">
          Welcome to{" "}
          <span className="text-blue-600">Prosite</span>
        </h3>
        <p className="mt-3 text-neutral-500 text-sm max-w-sm mx-auto leading-relaxed">
          Your lifetime membership is active. A confirmation has been sent to your email.
          {nfc && " Your NFC card order is being processed."}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-xs text-neutral-600">
          <Lock className="h-3.5 w-3.5" />
          ₹{total.toLocaleString("en-IN")} paid · Lifetime access
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 text-white px-6 py-3.5 font-semibold text-sm hover:bg-green-700 transition shadow-lg shadow-green-600/20"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.357-2.907-6.995-2.908-5.44 0-9.866 4.42-9.87 9.865-.001 1.836.486 3.633 1.414 5.203L1.875 22.18l6.182-1.622zM18.06 14.93c-.33-.165-1.956-.967-2.257-1.077-.3-.11-.52-.165-.74.165-.22.33-.85 1.077-1.04 1.3-.19.22-.38.242-.71.077-1.59-.795-2.678-1.456-3.766-3.324-.22-.38.22-.352.63-1.177.07-.143.035-.269-.018-.38-.052-.11-.47-1.127-.643-1.543-.17-.406-.358-.352-.49-.352-.13-.006-.28-.006-.43-.006-.15 0-.396.055-.604.28-.21.22-.8.78-.8 1.9s.815 2.203.926 2.35c.11.147 1.605 2.45 3.89 3.435.545.233 1.076.39 1.447.507.55.174 1.05.15 1.445.09.44-.066 1.957-.8 2.234-1.57.276-.77.276-1.43.195-1.57-.08-.14-.3-.223-.63-.388z" />
            </svg>
            Chat on WhatsApp
          </a>
          <a
            href={`${backendUrl}?token=${encodeURIComponent(token)}`}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white text-black px-6 py-3.5 font-semibold text-sm hover:bg-neutral-50 transition"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <p className="mt-5 text-xs text-neutral-400">Redirecting automatically in a few seconds...</p>
      </div>
    </div>
  );
};
