import React, { useState, useEffect } from "react";

const COLORS = {
  purpleDark: "#2D1540",
  purplePrimary: "#5D5FA3",
  purpleSoft: "#7B7CB8",
};

// These four move position depending on scroll state — see the render
// logic below. Labels match the reference screenshot exactly.
const navLinks = [
  { label: "CREATE FREE PROPERTY ADVERTISEMENT", href: "/advertise" },
  { label: "SEARCH PROPERTY", href: "/search" },
  { label: "MORTGAGE SUPPORT", href: "/support" },
  { label: "CAREER", href: "/careers" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: isScrolled ? COLORS.purpleDark : "transparent",
        boxShadow: isScrolled ? "0 2px 16px rgba(0,0,0,0.25)" : "none",
      }}
    >
      {/* Scrim so logo/buttons stay legible over the hero photo before
          the solid background kicks in. Not needed once scrolled since
          the header has a solid fill by then. */}
      {!isScrolled && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,10,25,0.55) 0%, rgba(15,10,25,0.25) 70%, rgba(15,10,25,0) 100%)",
          }}
        />
      )}

      {/* Edge-to-edge — small fixed padding instead of a centered
          max-width container, so the bar reaches the browser edges. */}
      <div className="relative w-full px-4">
        {/* Top row: logo + Register Real Estate (left) — Sign In + Join (right).
            The four nav links live in the middle of THIS row once scrolled;
            before that, the middle stays empty and they render as a stacked
            column below-right instead. */}
        <div className="flex items-center justify-between py-3 gap-4">
          <div className="flex items-center gap-4 shrink-0">
            <a href="/" className="flex items-center gap-2">
              <img
                src="https://purpleroof.com/_next/image?url=%2Fimages%2Flogo.png&w=128&q=75"
                alt="Purple Roof Logo"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </a>
            <a
              href="/register-agency"
              className="hidden sm:inline-flex items-center whitespace-nowrap rounded-full border px-5 py-2.5 text-[13px] font-bold tracking-wide text-white transition-colors"
              style={{
                borderColor: COLORS.purpleSoft,
                backgroundColor: "rgba(123,124,184,0.28)",
              }}
            >
              REGISTER REAL ESTATE
            </a>
          </div>

          {/* Middle links — only occupy the middle row once scrolled */}
          <ul
            className={`hidden lg:flex items-center gap-6 text-[14px] font-semibold text-white tracking-wide transition-opacity duration-200 ${
              isScrolled ? "opacity-100" : "opacity-0 pointer-events-none absolute"
            }`}
          >
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white/80 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6 text-[14px] font-semibold text-white shrink-0">
            <a href="/signin" className="hidden sm:inline hover:text-white/80 transition-colors">
              SIGN IN
            </a>
            <a
              href="/join"
              className="bg-purple-500 text-white px-7 py-2.5 rounded-full hover:bg-purple-400 transition-colors text-[14px] font-semibold tracking-wide shadow-sm"
            >
              JOIN PURPLE ROOF
            </a>
          </div>
        </div>

        {/* Second block — the four links stacked as a column, top-right,
            directly under the main bar. Only shown pre-scroll; once
            scrolled they've already moved into the row above, so this
            block collapses away. */}
        {!isScrolled && (
          <div className="flex justify-end pb-4 -mt-1">
            <ul className="flex flex-col items-end gap-2 text-[12px] font-bold text-white tracking-wide">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-block rounded-full px-4 py-2 transition-colors whitespace-nowrap"
                    style={{ backgroundColor: "rgba(255,255,255,0.14)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}