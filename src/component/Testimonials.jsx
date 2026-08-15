import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CARD_COLORS = [
  { bg: "#AECBE0", ink: "#1E2A36" }, // blue
  { bg: "#DD8F6E", ink: "#2E1C11" }, // terracotta
  { bg: "#8FB89C", ink: "#132119" }, // sage green
  { bg: "#D8B54E", ink: "#2C2410" }, // mustard
  { bg: "#B49FCB", ink: "#221A2C" }, // lavender
];

const ACCENT = "#A3854F";

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Founder, Mehta Textiles",
    product: "Packaging Sleeves",
    quote: "Our packaging finally looks as premium as what's inside it.",
    avatar: 12,
  },
  {
    name: "Ananya Kapoor",
    role: "Owner, The Cake Studio",
    product: "Custom Stickers",
    quote: "Held up through refrigeration and delivery, every single time.",
    avatar: 47,
  },
  {
    name: "Vikram Rao",
    role: "Director, Rao Constructions",
    product: "Business Cards",
    quote: "Clients comment on the cards before we even shake hands.",
    avatar: 33,
  },
  {
    name: "Sana Sheikh",
    role: "Event Planner, Sana Events",
    product: "Invitations",
    quote: "300 wedding invites in four days, zero compromise on finish.",
    avatar: 5,
  },
  {
    name: "Arjun Nair",
    role: "Owner, Spice Route",
    product: "Menu Cards",
    quote: "New menu, same day energy — footfall noticed immediately.",
    avatar: 22,
  },
  {
    name: "Priya Iyer",
    role: "Marketing Head, Bloom Retail",
    product: "Logo Design",
    quote: "They listened before they designed. It shows in the result.",
    avatar: 44,
  },
  {
    name: "Farhan Ali",
    role: "Owner, UrbanThreads",
    product: "Tags",
    quote: "Hang tags that finally match our packaging story.",
    avatar: 8,
  },
  {
    name: "Meera Joshi",
    role: "HR Head, Nimbus Corp",
    product: "ID Cards",
    quote: "200 employee ID cards issued, zero reprints needed.",
    avatar: 29,
  },
  {
    name: "Devika Menon",
    role: "Creative Lead, Petal & Co",
    product: "Packaging Labels",
    quote: "Labels survive the fridge, the counter, and the compliments.",
    avatar: 36,
  },
  {
    name: "Karan Sethi",
    role: "Ops Manager, QuickBite Foods",
    product: "Boxes Package",
    quote: "Boxes that ship flat and still arrive looking sharp.",
    avatar: 15,
  },
];

const AUTOPLAY_MS = 3000;
const VISIBLE_RANGE = 2;

const Squiggle = ({ color }) => (
  <svg width="64" height="13" viewBox="0 0 70 14" fill="none" className="opacity-70">
    <path
      d="M2 8C8 2 14 2 20 8C26 14 32 14 38 8C44 2 50 2 56 8C60 12 64 12 68 8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const useIsCompact = () => {
  const [compact, setCompact] = useState(
    typeof window !== "undefined" && window.innerWidth < 640
  );
  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return compact;
};

const Testimonials = () => {
  const total = testimonials.length;
  const [index, setIndex] = useState(0);
  const compact = useIsCompact();
  const timerRef = useRef(null);

  const goTo = (i) => setIndex(((i % total) + total) % total);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [index, total]);

  const stepX = compact ? 90 : 170;
  const stepRotate = compact ? 6 : 8;
  const cardWidthClass = compact ? "w-64" : "w-72 sm:w-80";

  return (
    <section className="relative bg-white py-24 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 sm:mb-20">
          <div>
            <p
              className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ color: ACCENT }}
            >
              Postcard Testimonial
            </p>
            <div className="w-10 h-[3px] rounded-full" style={{ backgroundColor: ACCENT }} />
          </div>
          <p
            className="text-sm sm:text-base font-mono tracking-widest"
            style={{ color: ACCENT }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        {/* Fan carousel */}
        <div className="relative h-[280px] sm:h-[320px] flex items-center justify-center">
          {testimonials.map((t, i) => {
            let offset = i - index;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const dist = Math.abs(offset);
            const inRange = dist <= VISIBLE_RANGE;
            const color = CARD_COLORS[i % CARD_COLORS.length];

            const style = {
              transform: `translate(-50%, -50%) translateX(${offset * stepX}px) translateY(${dist * 14}px) rotate(${offset * stepRotate}deg) scale(${inRange ? 1 - dist * 0.07 : 0.75})`,
              opacity: inRange ? (dist === 0 ? 1 : dist === 1 ? 0.85 : 0.55) : 0,
              zIndex: 50 - dist * 10,
              backgroundColor: color.bg,
              color: color.ink,
              pointerEvents: inRange ? "auto" : "none",
            };

            return (
              <div
                key={t.name}
                onClick={() => goTo(i)}
                style={style}
                className={`absolute top-1/2 left-1/2 ${cardWidthClass} min-h-[190px] sm:min-h-[210px] rounded-xl shadow-lg p-6 sm:p-7 overflow-hidden transition-all duration-500 ease-out cursor-pointer`}
              >
                {/* Paper grain */}
                <div className="paper-texture" />

                {/* Stamp photo */}
                <div className="absolute top-5 right-5 rotate-6 bg-white p-1.5 shadow-md rounded-sm">
                  <img
                    src={`https://i.pravatar.cc/150?img=${t.avatar}`}
                    alt={t.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-[2px]"
                    draggable="false"
                  />
                </div>

                <p className="text-base sm:text-lg font-semibold leading-snug pr-16 mb-8">
                  {t.quote}
                </p>

                <div className="absolute bottom-6 sm:bottom-7 left-6 sm:left-7 right-6 sm:right-7">
                  <Squiggle color={color.ink} />
                  <h3 className="font-bold text-sm mt-2">{t.name}</h3>
                  <p className="text-xs opacity-70">{t.role}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-10 sm:mt-14">
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === index ? ACCENT : "#E4DACB",
                  transform: i === index ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-gray-50"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-105"
              style={{ backgroundColor: ACCENT }}
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
