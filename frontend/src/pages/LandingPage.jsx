import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Pain from "@/components/landing/Pain";
import Mockups from "@/components/landing/Mockups";
import LinkedInVsProsite from "@/components/landing/LinkedInVsProsite";
import Comparison from "@/components/landing/Comparison";
import BeforeAfter from "@/components/landing/BeforeAfter";
import Recruiters from "@/components/landing/Recruiters";
import Attraction from "@/components/landing/Attraction";
import Features from "@/components/landing/Features";
import SocialProof from "@/components/landing/SocialProof";
import Fomo from "@/components/landing/Fomo";
import Pricing from "@/components/landing/Pricing";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import CheckoutModal from "@/components/landing/CheckoutModal";
import { CheckoutProvider } from "@/context/CheckoutContext";

export default function LandingPage() {
  return (
    <CheckoutProvider>
      <div data-testid="landing-root" className="relative bg-white text-black overflow-hidden">
        <Navbar />
        <Hero />
        <Marquee />
        <Pain />
        <Mockups />
        <LinkedInVsProsite />
        <Comparison />
        <BeforeAfter />
        <Recruiters />
        <Attraction />
        <Features />
        <SocialProof />
        <Fomo />
        <Pricing />
        <FinalCta />
        <Footer />
        <CheckoutModal />
      </div>
    </CheckoutProvider>
  );
}
