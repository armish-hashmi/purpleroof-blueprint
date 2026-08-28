import React, { useState } from "react";

const explore = [
  { label: "Home Page", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/support" },
  { label: "Careers", href: "/careers" },
  { label: "FAQs", href: "/faqs" },
];

const services = [
  { label: "Property Search", href: "/search" },
  { label: "Advertise Your Property", href: "/advertise" },
  { label: "Apply for Home Loan", href: "/home-loan" },
  { label: "Register Real Estate", href: "/register-agency" },
];

const ICON_BG = "#332F5C";

function SocialIcon({ label, children }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-gray-200 hover:text-white hover:bg-[#5D5FA3] transition-colors"
      style={{ backgroundColor: ICON_BG }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#15132c] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <a href="/" className="flex items-center gap-2 mb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5D5FA3] text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 2 10.5V22h6v-7h8v7h6V10.5L12 2Z" />
              </svg>
            </span>
            <span className="text-white font-bold tracking-wide text-sm leading-tight">
              PURPLE<br />ROOF
            </span>
          </a>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            A global real estate platform for finding, listing, and financing homes.
          </p>

          {subscribed ? (
            <p className="text-sm text-green-400 font-medium">
              You're on the list — thanks for subscribing.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-l-lg border border-white/10 bg-[#211f40] px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D5FA3]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-r-lg bg-[#5D5FA3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4E4F8C] transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>

        <div>
          <h4 className="text-white font-bold tracking-wide mb-4 text-sm">EXPLORE</h4>
          <ul className="space-y-3 text-sm">
            {explore.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-gray-300 hover:text-white transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold tracking-wide mb-4 text-sm">SERVICES</h4>
          <ul className="space-y-3 text-sm">
            {services.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-gray-300 hover:text-white transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold tracking-wide mb-4 text-sm">
            WANT TO GET IN TOUCH?
          </h4>
          <div className="flex items-center gap-3 mb-4">
            <SocialIcon label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.76-2.05 4 0 4.75 2.6 4.75 6.1V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4V8Z" />
              </svg>
            </SocialIcon>
          </div>
          <a
            href="mailto:hello@purpleroof.com"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            hello@purpleroof.com
          </a>
        </div>
      </div>

      
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-left text-xs text-gray-300 leading-relaxed">
          Purple Roof is a global real estate technology platform. Property, mortgage
          referral, recruitment and training services vary by country. Mortgage
          enquiries may be referred to participating licensed providers. Purple Roof
          does not guarantee mortgage approval, employment or the accuracy of listings
          provided by third parties.
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-gray-300">
          <span>© 2026 Purple Roof. All rights reserved.</span>
          <span>
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <span className="mx-2 text-gray-500">|</span>
            <a href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
