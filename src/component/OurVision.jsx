import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBullseye, FaEye, FaGem, FaBolt, FaHandshake, FaLeaf } from "react-icons/fa";

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

const VALUES = [
  { icon: FaGem, title: "Quality First", desc: "Every proof is checked twice before it reaches your hands." },
  { icon: FaBolt, title: "Fast Turnaround", desc: "Streamlined production without shortcuts on finish." },
  { icon: FaHandshake, title: "Client Trust", desc: "Transparent pricing and honest timelines, always." },
  { icon: FaLeaf, title: "Sustainability", desc: "Actively shifting toward eco-conscious materials." },
];

const OurVision = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="relative bg-white pt-28 pb-24 px-4 sm:px-8 lg:px-20 overflow-hidden">
      {/* Decorative blurred orbs — matches HeroSection's motif */}
      <div className="absolute -top-16 -right-16 w-[280px] h-[280px] bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 -left-24 w-[260px] h-[260px] bg-orange-200/20 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto text-center mb-16" data-aos="fade-up">
        <p className="inline-flex items-center gap-2 text-orange-500 uppercase tracking-widest font-semibold text-sm mb-4">
          <span className="w-6 h-px bg-orange-500" />
          What Drives Us
          <span className="w-6 h-px bg-orange-500" />
        </p>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-ink tracking-tight mb-4">
          Our <span className="text-orange-500">Mission</span> & Vision
        </h1>
        <p className="text-base sm:text-lg text-ink-soft max-w-2xl mx-auto">
          Discover what drives us forward and how we envision shaping the future of creative
          branding and packaging.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
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
            <h3 className="text-2xl font-extrabold text-ink mb-3">Our Mission</h3>
            <p className="text-ink-soft leading-relaxed text-sm sm:text-base mb-6">
              To deliver innovative, high-quality, and reliable branding and packaging solutions
              that help businesses stand out, engage customers, and build lasting impressions.
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
            <h3 className="text-2xl font-extrabold text-ink mb-3">Our Vision</h3>
            <p className="text-ink-soft leading-relaxed text-sm sm:text-base mb-6">
              To be a leading force in the design and print industry — recognized for
              creativity, innovation, trust, and a deep commitment to customer satisfaction.
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

      {/* Values strip */}
      <div className="relative z-10 max-w-6xl mx-auto" data-aos="fade-up">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-ink mb-10">
          The Values Behind Every Order
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {VALUES.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              className="text-center bg-gray-50 hover:bg-white rounded-xl border border-hairline hover:border-orange-200 hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="w-11 h-11 mx-auto flex items-center justify-center text-orange-500 bg-orange-50 rounded-lg mb-4">
                <Icon size={18} />
              </div>
              <h4 className="font-bold text-ink text-sm mb-1.5">{title}</h4>
              <p className="text-xs text-ink-soft leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurVision;
