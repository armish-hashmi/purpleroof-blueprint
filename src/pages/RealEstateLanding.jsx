import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
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

const HERO_IMAGE_URL =
  "https://purpleroof.com/_next/image?url=%2Fimages%2Fslider%2Fv2_001.jpg&w=1920&q=75";

const TABS = ["Rent", "Buy", "Mortgage"];

const PRIMARY_FILTERS = [
  { label: "Property type" },
  { label: "Beds & Baths" },
  { label: "Price" },
];


const MORE_FILTERS = [
  { label: "Pay Monthly", badge: "New" },
  { label: "Amenities" },
  { label: "Residential" },
];

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

function Hero() {
  const [activeTab, setActiveTab] = useState("Rent");
  const [query, setQuery] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);

 
  const [activeFilters, setActiveFilters] = useState(() => new Set());

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

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      <img
        src={HERO_IMAGE_URL}
        alt="Property image"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,12,35,0.75) 0%, rgba(45,21,64,0.55) 18%, rgba(93,95,163,0.45) 55%, rgba(15,27,46,0.75) 100%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center px-4 pt-28 pb-16">
        <h1 className="text-center text-[36px] md:text-[54px] font-extrabold leading-tight text-white drop-shadow-md">
          Unlock the Door to Smarter Homeownership.
        </h1>
        <p className="mt-3 text-center text-[18px] md:text-[21px] font-medium text-white/90">
          Find your dream home or list your property for free-zero fees, endless possibilities.
        </p>

        <div className="mt-8 flex items-center gap-1 rounded-full bg-white/90 p-1.5 shadow-xl backdrop-blur-md">
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

        <div className="mt-6 w-full max-w-[1100px] rounded-3xl bg-white p-6 shadow-2xl">
         
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
                City, community or building
              </label>
              <input
                id="hero-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="City, community or building"
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
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown size={26} color="rgba(255,255,255,0.75)" strokeWidth={2} />
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