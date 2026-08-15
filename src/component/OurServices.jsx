import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CategoryGrid from "./CategoryGrid";

const OurServices = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="min-h-screen bg-white pt-28 pb-4">
      <div className="text-center px-6 mb-6" data-aos="fade-down">
        <p className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-3">
          Everything We Offer
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight mb-4">
          Our Services
        </h1>
        <p className="text-ink-soft max-w-2xl mx-auto">
          From professional printing to creative design and premium packaging,
          browse every category and pick the products you need.
        </p>
      </div>

      <CategoryGrid heading="" full />
    </div>
  );
};

export default OurServices;
