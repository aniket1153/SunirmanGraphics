import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import imgab from "../assets/aboutimg.jpg";
import { FaBullseye, FaEye } from "react-icons/fa";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="relative bg-[#f6f8fb] overflow-hidden">

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text */}
        <div data-aos="fade-right" className="text-center lg:text-left">
          <p className="text-orange-500 uppercase tracking-widest font-semibold text-sm mb-4">
            About Us
          </p>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#0a1f44] leading-tight mb-6">
            Designing Prints That <span className="text-orange-500">Represent Your Brand</span>
          </h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Established in 2021–2022, Sunirman Graphics is a creative studio delivering custom printing and packaging solutions with precision, quality, and innovative design.
          </p>
        </div>

        {/* Image */}
        <div data-aos="fade-left" className="rounded-3xl overflow-hidden shadow-2xl max-h-[400px]">
          <img
            src={imgab}
            alt="About Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-6 lg:px-24 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Mission */}
        <div data-aos="fade-up" className="bg-white p-10 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-200">
          <div className="w-12 h-12 flex items-center justify-center text-orange-500 text-xl mb-4 bg-orange-100 rounded-xl">
            <FaBullseye />
          </div>
          <h2 className="text-2xl font-semibold text-[#0a1f44] mb-3">Our Mission</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Deliver high-quality, creative printing and packaging solutions that help businesses build strong brand identities and leave a lasting impression.
          </p>
        </div>

        {/* Vision */}
        <div data-aos="fade-up" data-aos-delay="100" className="bg-white p-10 rounded-3xl shadow-md hover:shadow-xl transition border border-gray-200">
          <div className="w-12 h-12 flex items-center justify-center text-orange-500 text-xl mb-4 bg-orange-100 rounded-xl">
            <FaEye />
          </div>
          <h2 className="text-2xl font-semibold text-[#0a1f44] mb-3">Our Vision</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            To become a recognized leader in printing and graphics, known for creativity, consistency, and premium-quality branding solutions.
          </p>
        </div>
      </div>

    </section>
  );
};

export default AboutUs;
