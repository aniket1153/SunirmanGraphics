import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import owner1 from "../assets/Owner1.jpg";
import owner2 from "../assets/Owner2.jpg";
import event1 from "../assets/EventsImg1.jpg";
import event2 from "../assets/EventsImg4.jpeg";
import event3 from "../assets/EventsImg2.jpg";
import event4 from "../assets/EventsImg5.jpeg";
import event5 from "../assets/EventsImg3.jpg";

import { FaPrint, FaClock, FaPalette, FaCogs } from "react-icons/fa";

const LETTER_PARAGRAPHS = [
  "We build for the shop owner who wants their business card to feel like their handshake — firm, warm, memorable. Not for the fastest checkout, but for the print you're proud to hand someone.",
  "We believe good paper matters. Good color matters. The extra day it takes to get a proof exactly right, matters. We'd rather say no to a rushed job than say yes to a mediocre one.",
  "We're a small studio on purpose. No call centers, no account managers reading from a script — just a team that treats your order like it's the only one on the press today.",
  "We're not trying to be the biggest printer in the city. We're trying to be the one you recommend to a friend without thinking twice.",
];

const SIGNATORIES = [
  { img: owner1, name: "Owner One", role: "Co-Founder" },
  { img: owner2, name: "Owner Two", role: "Co-Founder" },
];

const WHY_CHOOSE_US = [
  {
    icon: FaPrint,
    title: "Premium Print Quality",
    desc: "Every proof is checked twice before it reaches your hands. We obsess over color accuracy, paper stock, and finish so what you approve is exactly what you get.",
    variant: "feature",
  },
  {
    icon: FaClock,
    title: "Fast Turnaround",
    desc: "Streamlined production without shortcuts on finish.",
    variant: "wide",
  },
  {
    icon: FaPalette,
    title: "Creative Design Support",
    desc: "In-house designers who refine, not just execute.",
    variant: "compact",
  },
  {
    icon: FaCogs,
    title: "Modern Machines",
    desc: "Consistent color and finish, order after order.",
    variant: "compact",
  },
];

const AboutMain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  const eventGallery = [event1, event2, event3, event4, event5];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    autoplay: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-[#f6f8fb] overflow-hidden">
      {/* ================= HERO + LETTER (one continuous gradient) ================= */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#18140F] via-[#7A3E1D] via-45% to-[#f6f8fb] to-92% pt-36 sm:pt-44 pb-20 sm:pb-24 px-6">
        <div className="absolute inset-0 sparkle-field opacity-70" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px]" />

        {/* Hero content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-cream text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-8">
            Est. 2021 · Sunirman Graphics
          </span>

          <h1
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-4xl sm:text-6xl text-white font-semibold leading-tight mb-6 text-balance"
          >
            We make prints we're proud to sign.
          </h1>

          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            A small studio with unreasonable standards for paper, color, and
            finish. Every order gets the same obsessive attention — big
            brand or first business card.
          </p>

          <button
            onClick={() => navigate("/ContactForm")}
            className="inline-flex items-center gap-2 bg-white text-ink font-semibold px-8 py-3.5 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Get in Touch
          </button>
        </div>

        {/* Letter content */}
        <div className="relative z-10 max-w-4xl mx-auto mt-20 sm:mt-24">
          {/* Polaroids — overlapping, sm+ only */}
          {SIGNATORIES.map((s, i) => (
            <div
              key={s.name}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className={`hidden sm:block absolute z-20 bg-white p-3 pb-4 shadow-2xl rounded-sm ${
                i === 0
                  ? "-left-6 lg:-left-14 bottom-10 -rotate-6"
                  : "-right-6 lg:-right-14 -bottom-8 rotate-6"
              }`}
            >
              <img src={s.img} alt={s.name} className="w-36 h-44 lg:w-40 lg:h-48 object-cover" />
              <p
                style={{ fontFamily: "var(--font-hand)" }}
                className="text-center text-xl text-ink mt-1"
              >
                {s.name}
              </p>
            </div>
          ))}

          {/* Mobile polaroid row */}
          <div className="sm:hidden flex justify-center gap-6 mb-6" data-aos="fade-up">
            {SIGNATORIES.map((s) => (
              <div key={s.name} className="bg-white p-2.5 pb-3 shadow-xl rounded-sm">
                <img src={s.img} alt={s.name} className="w-24 h-28 object-cover" />
                <p
                  style={{ fontFamily: "var(--font-hand)" }}
                  className="text-center text-base text-ink mt-1"
                >
                  {s.name}
                </p>
              </div>
            ))}
          </div>

          {/* Letter card */}
          <div
            className="relative dot-paper bg-[#FBF9F4] border border-hairline rounded-3xl shadow-xl px-7 sm:px-16 py-14 sm:py-20"
            data-aos="fade-up"
          >
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-3xl sm:text-4xl text-center text-ink/80 italic mb-10"
            >
              We believe in craft.
            </h2>

            <div className="space-y-6 text-ink-soft leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
              {LETTER_PARAGRAPHS.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="flex justify-center gap-12 sm:gap-20 mt-14">
              {SIGNATORIES.map((s) => (
                <div key={s.name} className="text-center">
                  <p
                    style={{ fontFamily: "var(--font-hand)" }}
                    className="text-3xl sm:text-4xl text-ink leading-none"
                  >
                    {s.name}
                  </p>
                  <p className="text-xs text-ink-soft/70 uppercase tracking-widest mt-2">
                    {s.role}
                  </p>
                </div>
              ))}
            </div>

            {/* Skyline flourish */}
            <svg
              className="w-full h-12 sm:h-14 mt-14 text-ink/15"
              viewBox="0 0 600 60"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 60 L0 40 L20 40 L20 25 L40 25 L40 40 L70 40 L70 15 L90 15 L90 0 L100 0 L100 15 L110 15 L110 40 L150 40 L150 30 L170 30 L170 40 L210 40 L210 20 L230 20 L230 40 L270 40 L270 10 L290 10 L290 40 L330 40 L330 28 L350 28 L350 40 L390 40 L390 18 L410 18 L410 40 L450 40 L450 5 L470 5 L470 40 L510 40 L510 32 L530 32 L530 40 L560 40 L560 22 L580 22 L580 40 L600 40 L600 60 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-white py-24 sm:py-28 px-6">
        <div className="text-center mb-16">
          <p className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-3">
            The Difference
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Why Businesses Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {WHY_CHOOSE_US.map(({ icon: Icon, title, desc, variant }, i) => {
            if (variant === "feature") {
              return (
                <div
                  key={title}
                  data-aos="fade-up"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#18140F] to-[#3D2A1A] p-8 sm:p-10 flex flex-col justify-center min-h-[260px] lg:min-h-0 sm:col-span-2 lg:col-span-2 lg:row-span-2 h-full hover:shadow-2xl transition-shadow duration-500"
                >
                  <Icon
                    className="absolute -right-8 -bottom-8 text-white/5 group-hover:text-white/10 group-hover:scale-110 transition-all duration-500"
                    size={200}
                  />
                  <div className="relative">
                    <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl text-white text-xl shadow-lg shadow-orange-500/30 mb-6">
                      <Icon />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{title}</h3>
                    <p className="text-white/70 leading-relaxed max-w-sm">{desc}</p>
                  </div>
                </div>
              );
            }

            if (variant === "wide") {
              return (
                <div
                  key={title}
                  data-aos="fade-up"
                  data-aos-delay="80"
                  className="sm:col-span-2 lg:col-span-2 h-full rounded-2xl bg-white border border-hairline p-6 sm:p-8 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-orange-50 text-orange-500 rounded-xl text-xl">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-lg mb-1">{title}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-delay={160 + i * 40}
                className="h-full rounded-2xl bg-gray-50 hover:bg-white border border-hairline hover:border-orange-200 p-6 flex flex-col justify-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-orange-50 text-orange-500 rounded-lg text-lg mb-4">
                  <Icon />
                </div>
                <h3 className="font-bold text-ink text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= CULTURE & EVENTS ================= */}
      <div className="bg-[#f6f8fb] py-24 sm:py-28">
        <div className="text-center mb-14 px-6">
          <p className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-3">
            Behind The Press
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            Company Culture & Events
          </h2>
          <p className="text-ink-soft max-w-2xl mx-auto">
            A glimpse into our workspace, team moments, celebrations, and the
            passion that drives every print.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Slider {...sliderSettings}>
            {eventGallery.map((img, idx) => (
              <div key={idx} className="px-3">
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                  <img src={img} alt="Event" className="w-full h-72 object-cover" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default AboutMain;
