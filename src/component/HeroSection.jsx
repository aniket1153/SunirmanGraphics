import React from "react";
import TextType from "./TextType";
import AnimatedCounter from "./AnimatedCounter";

const isMobile = window.innerWidth < 768;

const HeroSection = () => {
  return (
    <section
      className="
        relative w-full
        min-h-[85vh] sm:min-h-[90vh]
        flex items-center
        px-5 sm:px-10 lg:px-20
        overflow-hidden
        bg-[#0a1f44]
        isolate
      "
      data-aos="fade-up"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">

        {/* LEFT */}
        <div>
          <div data-aos="fade-right" className="inline-flex items-center gap-3 mb-5">
            <span className="h-[2px] w-10 bg-orange-400" />
            <span className="text-orange-300 uppercase tracking-widest text-sm font-semibold">
              Creative Graphic Studio
            </span>
          </div>

          <h1 data-aos="fade-up" className="text-white text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold">
            <TextType
              text={[
                "Welcome to Sunirman Graphics",
                "We Design Brands That Stand Out",
              ]}
              typingSpeed={70}
              pauseDuration={2000}
              showCursor={!isMobile}
              cursorCharacter="|"
              className="block"
              textColors={["#ffffff", "#FFA500"]}
            />
          </h1>

          <p data-aos="fade-up" className="mt-5 text-gray-300 text-lg max-w-xl">
            We fill the colour in your happy life <span className="text-orange-400">||</span>
          </p>

          <p data-aos="fade-up" className="mt-2 text-gray-400 text-lg max-w-xl">
            Trusted by 60+ clients for impactful and creative printing solutions.
          </p>
        </div>

        {/* RIGHT – COUNTER */}
        <div data-aos="zoom-in" className="flex justify-center lg:justify-end">
          <div className="relative w-[260px] h-[260px] rounded-full animate-soft-pulse">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/60 to-blue-400/60 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0a1f44]/80 backdrop-blur-xl flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-orange-400 text-6xl font-extrabold">
                    <AnimatedCounter />
                  </h2>
                  <p className="mt-3 text-gray-200 text-base font-medium">
                    Successful Projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
