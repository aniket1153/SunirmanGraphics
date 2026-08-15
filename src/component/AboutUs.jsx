import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import imgab from "../assets/aboutimg.jpg";
import { FaBullseye, FaEye, FaCheckCircle, FaAward } from "react-icons/fa";
import StatCounter from "./StatCounter";

const TRUST_BADGES = ["Premium Materials", "Custom Designs", "Fast Turnaround"];

const MISSION_POINTS = [
  "Uncompromising print & finish quality",
  "On-time delivery, every single order",
  "Designs tailored to your brand identity",
];

const VISION_POINTS = [
  "Recognized name in print & packaging by 2027",
  "Leading the shift to sustainable materials",
  "Setting the benchmark for creative service",
];

const STATS = [
  { value: 3, suffix: "+", label: "Years of Craft" },
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 1200, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Product Categories" },
];

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="relative bg-[#f6f8fb] overflow-hidden">
      {/* Decorative blurred orbs — matches HeroSection's motif */}
      <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 -right-24 w-[260px] h-[260px] bg-orange-200/20 rounded-full blur-[100px]" />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24 pt-20 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div data-aos="fade-right" className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 text-orange-500 uppercase tracking-widest font-semibold text-sm mb-4">
            <span className="w-6 h-px bg-orange-500" />
            About Us
          </p>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-ink leading-tight mb-6">
            Designing Prints That <span className="text-orange-500">Represent Your Brand</span>
          </h1>
          <p className="text-ink-soft text-base sm:text-lg leading-relaxed mb-6">
            Established in 2021–2022, Sunirman Graphics is a creative studio delivering custom
            printing and packaging solutions with precision, quality, and innovative design.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink bg-white border border-hairline rounded-full px-3.5 py-1.5 shadow-sm"
              >
                <FaCheckCircle className="text-orange-500" size={13} />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Image with floating badge */}
        <div data-aos="fade-left" className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-orange-400/20 to-orange-600/10 rounded-2xl rotate-2" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[420px] border-4 border-white">
            <img src={imgab} alt="About Hero" className="w-full h-full object-cover" />
          </div>

          <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white rounded-xl shadow-xl border border-hairline px-5 py-4 flex items-center gap-3">
            <div className="w-11 h-11 shrink-0 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-md">
              <FaAward size={18} />
            </div>
            <div>
              <p className="text-lg font-extrabold text-ink leading-none">3+ Years</p>
              <p className="text-xs text-ink-soft/70 mt-1">Crafting Premium Prints</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-24 pt-16 pb-4">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl border border-hairline shadow-sm py-8 px-6"
          data-aos="fade-up"
        >
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-24 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div
          data-aos="fade-up"
          className="group relative bg-white p-8 sm:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-hairline overflow-hidden"
        >
          <FaBullseye
            className="absolute -right-6 -top-6 text-orange-50 group-hover:text-orange-100 group-hover:scale-110 transition-all duration-500"
            size={140}
          />
          <div className="relative">
            <div className="w-14 h-14 flex items-center justify-center text-white text-xl mb-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
              <FaBullseye />
            </div>
            <h2 className="text-2xl font-extrabold text-ink mb-3">Our Mission</h2>
            <p className="text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
              Deliver high-quality, creative printing and packaging solutions that help
              businesses build strong brand identities and leave a lasting impression.
            </p>
            <ul className="space-y-2.5">
              {MISSION_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vision */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="group relative bg-white p-8 sm:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-hairline overflow-hidden"
        >
          <FaEye
            className="absolute -right-6 -top-6 text-orange-50 group-hover:text-orange-100 group-hover:scale-110 transition-all duration-500"
            size={140}
          />
          <div className="relative">
            <div className="w-14 h-14 flex items-center justify-center text-white text-xl mb-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
              <FaEye />
            </div>
            <h2 className="text-2xl font-extrabold text-ink mb-3">Our Vision</h2>
            <p className="text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
              To become a recognized leader in printing and graphics, known for creativity,
              consistency, and premium-quality branding solutions.
            </p>
            <ul className="space-y-2.5">
              {VISION_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
