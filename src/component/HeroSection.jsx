import React from "react";
import TextType from "./TextType";
import AnimatedCounter from "./AnimatedCounter";

const isMobile = window.innerWidth < 768;

const HeroSection = () => {
  return (
    <section
      className="relative w-full bg-tan px-5 sm:px-10 lg:px-20 py-8 sm:py-10 overflow-hidden isolate"
      data-aos="fade-up"
    >
      <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[260px] h-[260px] bg-orange-200/20 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <h2 className="text-ink text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
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
            textColors={["#18140F", "#D97239"]}
          />
        </h2>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-orange-600 text-4xl sm:text-5xl font-extrabold">
            <AnimatedCounter />
          </span>
          <span className="text-ink-soft text-sm max-w-[110px] leading-tight">
            Successful Projects Delivered
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
