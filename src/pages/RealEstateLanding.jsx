import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  Mail,
  MessageCircle,
} from "lucide-react";

const COLORS = {
  purpleDark: "#2D1540",
  purplePrimary: "#5D5FA3",
  purpleSoft: "#7B7CB8",
  purpleLight: "#EDEBFC",
  purpleHover: "#4B4D85",
  ink: "#16202E",
  slate: "#5B6472",
  amber: "#E8952E",
};

const HERO_IMAGE_URL = "/herobg.jpeg";

const TABS = ["Rent", "Buy", "Mortgage"];

const PRIMARY_FILTERS = [{ label: "Beds & Baths" }, { label: "Price" }];

const MORE_FILTERS = [{ label: "Pay Monthly", badge: "New" }, { label: "Amenities" }];

function Pill({ children, badge, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[14px] font-medium transition-colors"
      style={{
        borderColor: active ? COLORS.purplePrimary : "#D8DCE1",
        color: active ? COLORS.purplePrimary : "#374151",
        backgroundColor: active ? COLORS.purpleLight : "#FFFFFF",
      }}
    >
      {children}
      {badge && (
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
          style={{ backgroundColor: COLORS.amber }}
        >
          {badge}
        </span>
      )}
      <ChevronDown size={15} strokeWidth={2.2} />
    </button>
  );
}

function TextToggle({ options, value, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-2 text-[14px] font-semibold ${className}`}>
      {options.map((opt, i) => (
        <React.Fragment key={opt}>
          {i > 0 && <span className="text-gray-300 font-normal">I</span>}
          <button
            type="button"
            onClick={() => onChange(opt)}
            className="transition-colors"
            style={{ color: value === opt ? COLORS.purplePrimary : "#374151" }}
          >
            {opt}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

function Hero() {
  const [activeTab, setActiveTab] = useState("Rent");
  const [query, setQuery] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState(() => new Set());

  
  const [rentTerm, setRentTerm] = useState("Long Term");

  const [propertyCategory, setPropertyCategory] = useState("Residential");

  const [mortgageMode, setMortgageMode] = useState("Quick Request");
  const [mortgageCountry, setMortgageCountry] = useState("");
  const [mortgageResidency, setMortgageResidency] = useState("");
  const [mortgageContact, setMortgageContact] = useState("");

  const toggleFilter = (label) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const hiddenActiveCount = MORE_FILTERS.filter((f) =>
    activeFilters.has(f.label)
  ).length;

  const isMortgage = activeTab === "Mortgage";

  const showMortgageDetails = mortgageMode === "Quick Request";

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <img
        src={HERO_IMAGE_URL}
        alt="Property"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,12,35,0.75) 0%, rgba(45,21,64,0.5) 18%, rgba(93,95,163,0.4) 55%, rgba(15,27,46,0.75) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-1 items-end w-full pt-44 sm:pt-48">
        <div className="w-full px-12">
          <div className="max-w-xxl">
            <h1 className="text-[30px] md:text-[42px] font-extrabold leading-tight text-white drop-shadow-md">
              Advertise &amp; Search Properties Worldwide
            </h1>
            <p className="mt-2 text-[16px] md:text-[19px] font-medium text-white/90">
              Get Mortgage Support Across Countries
            </p>
          </div>

          <div className="mt-6 flex w-fit items-center gap-1 rounded-full bg-white/90 p-1.5 shadow-xl backdrop-blur-md">
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="rounded-full px-6 py-2.5 text-[15px] font-semibold transition-colors"
                  style={{
                    backgroundColor: isActive ? COLORS.purplePrimary : "transparent",
                    color: isActive ? "#FFFFFF" : "#374151",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {isMortgage ? (
            <div className="mt-5 w-full max-w-[640px] rounded-3xl bg-white p-5 shadow-2xl">
              <TextToggle
                options={["Quick Request", "Detailed Request Form"]}
                value={mortgageMode}
                onChange={setMortgageMode}
                className="mb-3"
              />

              <input
                type="text"
                value={mortgageCountry}
                onChange={(e) => setMortgageCountry(e.target.value)}
                placeholder="Select country where you want to buy or finance property"
                className="w-full rounded-lg border px-4 py-3 text-[14px] text-gray-700 placeholder-gray-400 outline-none focus:ring-2"
                style={{ borderColor: "#D8DCE1" }}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${COLORS.purpleSoft}55`)}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />

              {showMortgageDetails && (
                <>
                  <input
                    type="text"
                    value={mortgageResidency}
                    onChange={(e) => setMortgageResidency(e.target.value)}
                    placeholder="Enter your residency status in this country"
                    className="mt-3 w-full rounded-lg border px-4 py-3 text-[14px] text-gray-700 placeholder-gray-400 outline-none"
                    style={{ borderColor: "#D8DCE1" }}
                  />

                  <div
                    className="mt-3 flex items-center gap-3 rounded-lg border px-4 py-3"
                    style={{ borderColor: "#D8DCE1" }}
                  >
                    <Mail size={18} color={COLORS.purplePrimary} className="shrink-0" />
                    <MessageCircle size={18} color={COLORS.purplePrimary} className="shrink-0" />
                    <input
                      type="text"
                      value={mortgageContact}
                      onChange={(e) => setMortgageContact(e.target.value)}
                      placeholder="Enter your WhatsApp number or email address where our agent should contact you"
                      className="flex-1 min-w-0 bg-transparent text-[14px] text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                </>
              )}

              <button
                className="mt-4 w-full rounded-full px-8 py-2.5 text-[15px] font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: COLORS.purplePrimary }}
              >
                Request Mortgage Support
              </button>
            </div>
          ) : (
            <div className="mt-5 w-full max-w-[940px] rounded-3xl bg-white p-5 shadow-2xl">
              {activeTab === "Rent" && (
                <TextToggle
                  options={["Long Term", "Short Term"]}
                  value={rentTerm}
                  onChange={setRentTerm}
                  className="mb-3"
                />
              )}

              <div
                className="flex items-center gap-3 rounded-full border px-5 py-3"
                style={{ borderColor: "#E5E7EB" }}
              >
                <Search size={20} color={COLORS.purplePrimary} className="shrink-0" />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="hero-search"
                    className="block text-[11px] font-medium leading-none transition-opacity"
                    style={{
                      color: COLORS.slate,
                      opacity: query ? 1 : 0,
                      height: query ? "auto" : 0,
                      marginBottom: query ? "2px" : 0,
                    }}
                  >
                    Country, City, Community, Building Name
                  </label>
                  <input
                    id="hero-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Country, City, Community, Building Name"
                    className="w-full bg-transparent text-[15px] text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
                <button
                  className="shrink-0 rounded-full px-8 py-2.5 text-[15px] font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: COLORS.purplePrimary }}
                >
                  Search
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
              
                <TextToggle
                  options={["Residential", "Commercial"]}
                  value={propertyCategory}
                  onChange={setPropertyCategory}
                />

                {PRIMARY_FILTERS.map((f) => (
                  <Pill
                    key={f.label}
                    badge={f.badge}
                    active={activeFilters.has(f.label)}
                    onClick={() => toggleFilter(f.label)}
                  >
                    {f.label}
                  </Pill>
                ))}

                {showMoreFilters &&
                  MORE_FILTERS.map((f) => (
                    <Pill
                      key={f.label}
                      badge={f.badge}
                      active={activeFilters.has(f.label)}
                      onClick={() => toggleFilter(f.label)}
                    >
                      {f.label}
                    </Pill>
                  ))}

                <button
                  onClick={() => setShowMoreFilters((v) => !v)}
                  className="flex items-center gap-2 shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[14px] font-medium transition-colors"
                  style={{
                    borderColor:
                      !showMoreFilters && hiddenActiveCount > 0
                        ? COLORS.purplePrimary
                        : "#D8DCE1",
                    color: COLORS.purplePrimary,
                    backgroundColor:
                      !showMoreFilters && hiddenActiveCount > 0
                        ? COLORS.purpleLight
                        : "#FFFFFF",
                  }}
                >
                  <SlidersHorizontal size={14} strokeWidth={2.2} />
                  {showMoreFilters ? "Fewer filters" : "More filters"}
                  {!showMoreFilters && hiddenActiveCount > 0 && (
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: COLORS.purplePrimary }}
                    >
                      {hiddenActiveCount}
                    </span>
                  )}
                  <ChevronDown
                    size={15}
                    strokeWidth={2.2}
                    style={{
                      transform: showMoreFilters ? "rotate(180deg)" : "none",
                      transition: "transform 150ms ease",
                    }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="relative z-10 w-full py-3 px-4"
        style={{ backgroundColor: "rgba(45,21,64,0.55)", backdropFilter: "blur(4px)" }}
      >
        <p className="text-[13px] md:text-[14px] font-medium text-white/90 tracking-wide">
          All services are currently 100% free - no fees or credit/debit card required
        </p>
      </div>
    </section>
  );
}

export default function RealEstateLanding() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-white">
      <Hero />
    </div>
  );
}