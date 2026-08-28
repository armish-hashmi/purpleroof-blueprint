import React, { useState } from "react";

const navLinks = [
  { label: "ADVERTISE PROPERTY", href: "/advertise" },
  { label: "SEARCH PROPERTY", href: "/search" },
  { label: "MORTGAGE SUPPORT", href: "/support" },
  { label: "REGISTER REAL ESTATE", href: "/register-agency" },
];

const externalLinks = [
  { label: "CAREERS", href: "/careers", hasArrow: true },
  { label: "SIGN IN", href: "/signin", hasArrow: false },
];

export default function Navbar() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all">

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,10,25,0.55) 0%, rgba(15,10,25,0.25) 70%, rgba(15,10,25,0) 100%)",
        }}
      />
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img 
            src="https://purpleroof.com/_next/image?url=%2Fimages%2Flogo.png&w=128&q=75" 
            alt="Purple Roof Logo" 
            className="h-8 w-auto object-contain brightness-0 invert" 
          />
        </a>

        <ul className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-white tracking-wide">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-white/80 transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-5 text-[13px] font-semibold text-white">
          {externalLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.hasArrow ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              {l.label}
              {l.hasArrow && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </a>
          ))}

          
          <a
            href="/join"
            className="bg-purple-500 text-white px-5 py-2 rounded-full hover:bg-purple-400 transition-colors text-[13px] font-semibold tracking-wide shadow-sm"
          >
            JOIN PURPLE ROOF
          </a>
        </div>

      </nav>
    </header>
  );
}