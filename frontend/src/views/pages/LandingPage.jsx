import React from "react";
import Navbar from "@/views/components/landing/Navbar";
import Hero from "@/views/components/landing/Hero";
import Marquee from "@/views/components/landing/Marquee";
import Pain from "@/views/components/landing/Pain";
import Mockups from "@/views/components/landing/Mockups";
import LinkedInVsProsite from "@/views/components/landing/LinkedInVsProsite";
import Comparison from "@/views/components/landing/Comparison";
import BeforeAfter from "@/views/components/landing/BeforeAfter";
import Recruiters from "@/views/components/landing/Recruiters";
import Attraction from "@/views/components/landing/Attraction";
import Features from "@/views/components/landing/Features";
import SocialProof from "@/views/components/landing/SocialProof";
import Fomo from "@/views/components/landing/Fomo";
import Pricing from "@/views/components/landing/Pricing";
import FinalCta from "@/views/components/landing/FinalCta";
import Footer from "@/views/components/landing/Footer";
import CheckoutModal from "@/views/components/landing/CheckoutModal";
import { CheckoutProvider } from "@/models/context/CheckoutContext";

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
