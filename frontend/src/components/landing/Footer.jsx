import React from "react";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative py-12 border-t border-neutral-100 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-8 items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-black grid place-items-center">
            <span className="font-display font-black text-white text-sm">P</span>
          </div>
          <span className="font-display font-bold text-lg text-black">prosite</span>
        </div>
        <p className="text-sm text-neutral-500 md:text-center">
          © {new Date().getFullYear()} Prosite. The professional identity
          platform for students.
        </p>
        <div className="flex md:justify-end gap-5 text-sm text-neutral-500">
          <a href="#features" className="hover:text-black transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-black transition-colors">
            Pricing
          </a>
          <a href="#proof" className="hover:text-black transition-colors">
            Stories
          </a>
        </div>
      </div>
    </footer>
  );
}
