import React, { useState, useEffect } from "react";

const COLORS = {
  purpleDark: "#2D1540",
  purplePrimary: "#5D5FA3",
  purpleSoft: "#7B7CB8",
};


const navLinks = [
  { label: "Create Free Property Advertisement", href: "/advertise" },
  { label: "Search Property", href: "/search" },
  { label: "Mortgage Support", href: "/support" },
  { label: "Career", href: "/careers" },
];

const navLinks2 = [
  { label: "Advertise", href: "/advertise" },
  { label: "Search", href: "/search" },
  { label: "Mortgage", href: "/support" },
  { label: "Career", href: "/careers" },
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
     
      {!isScrolled && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,10,25,0.55) 0%, rgba(15,10,25,0.25) 70%, rgba(15,10,25,0) 100%)",
          }}
        />
      )}

      <div className="relative w-full px-4">
        
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
              Register Real Estate
            </a>
          </div>

        
          <ul
            className={`hidden lg:flex items-center gap-6 text-[14px] font-semibold text-white tracking-wide transition-opacity duration-200 ${
              isScrolled ? "opacity-100" : "opacity-0 pointer-events-none absolute"
            }`}
          >
            {navLinks2.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white/80 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6 text-[14px] font-semibold text-white shrink-0">
            <a href="/signin" className="hidden sm:inline hover:text-white/80 transition-colors">
              Sign In
            </a>
            <a
              href="/join"
              className="bg-purple-500 text-white px-7 py-2.5 rounded-full hover:bg-purple-400 transition-colors text-[14px] font-semibold tracking-wide shadow-sm"
            >
              Join Purple Roof
            </a>
          </div>
        </div>

       
        {!isScrolled && (
          <div className="flex justify-end pb-4 -mt-1">
            <ul className="flex flex-col items-end gap-2 text-[12px] font-bold text-white tracking-wide">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-block rounded-full px-4 py-2 transition-colors whitespace-nowrap"
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