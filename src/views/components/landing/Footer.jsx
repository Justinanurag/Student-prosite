import React from "react";
import {
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative border-t border-white/10 py-16 bg-black overflow-hidden"
    >
      {/* Background aesthetic glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex flex-col gap-12 relative z-10">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-10 sm:gap-0">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center sm:items-start gap-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <img
                  src="https://res.cloudinary.com/dzwto9zbu/image/upload/v1779959585/Atives_Logo_1_mpnssp.png"
                  alt="Atives Logo"
                  className="h-5 w-5 object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-2xl font-bold tracking-tight leading-none text-white">
                  Prosite
                </span>
                <span className="text-[13px] text-white/50 leading-none mt-1.5 font-medium tracking-wide ">
                  By Atives
                </span>
              </div>
            </div>

          </div>

          {/* Socials */}
          <div className="flex flex-col items-center sm:items-end gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/1atives"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-110 transition-all duration-300 group shadow-lg"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-white/60 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com/1_atives"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-110 transition-all duration-300 group shadow-lg"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-white/60 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/@1atives"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-110 transition-all duration-300 group shadow-lg"
                aria-label="YouTube"
              >
                <Youtube size={18} className="text-white/60 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-xs text-white/40 font-body text-center sm:text-left tracking-wide">
            © {new Date().getFullYear()} ATIVES WORLD PVT LTD.
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-white/50 font-body font-medium">
            <a href="#" className="hover:text-white transition-colors cursor-pointer">
              Terms
            </a>
            <a
              href="https://www.1atives.com/help"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
