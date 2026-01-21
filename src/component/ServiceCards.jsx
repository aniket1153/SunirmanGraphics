import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // import AOS styles
import { AiFillStar, AiOutlinePrinter } from "react-icons/ai";
import { FaBoxOpen, FaPaintBrush, FaTruckMoving, FaTabletAlt } from "react-icons/fa";

const services = [
  { title: "Packaging", description: "Custom box and label design.", icon: <FaBoxOpen size={34} /> },
  { title: "Printing", description: "High-quality print solutions.", icon: <AiOutlinePrinter size={34} /> },
  { title: "Design", description: "Creative brand packaging.", icon: <FaPaintBrush size={32} /> },
  { title: "Large Format", description: "Banner and hoarding prints.", icon: <FaTruckMoving size={34} /> },
  { title: "Gadgets", description: "Custom promotional gadgets.", icon: <FaTabletAlt size={32} /> },
];

const cardColors = [
  "bg-[#FFF7ED] border-orange-100",
  "bg-[#EFF6FF] border-blue-100",
  "bg-[#F5F3FF] border-purple-100",
  "bg-[#ECFEFF] border-cyan-100",
  "bg-[#F0FDF4] border-green-100",
];

const ServiceCards = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="w-full py-20 px-6 lg:px-24 bg-gradient-to-b from-white to-gray-50">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-3">
          What We Do
        </p>
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-[#112b5b]">
          Our Services
        </h2>
      </div>

      {/* SERVICE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-up" // AOS animation
            data-aos-delay={index * 100} // stagger animation
            className={`
              relative
              rounded-3xl
              p-8
              shadow-lg
              border
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              group
              ${cardColors[index % cardColors.length]}
            `}
          >
            {/* ICON BADGE */}
            <div
              className="
                absolute
                -top-7
                left-1/2
                -translate-x-1/2
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-orange-400
                to-orange-500
                flex
                items-center
                justify-center
                text-white
                shadow-xl
                transition
                group-hover:scale-110
              "
            >
              {service.icon}
            </div>

            {/* CONTENT */}
            <div className="pt-10 text-center">
              <h3 className="text-lg font-bold text-[#112b5b] mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>

              {/* STARS */}
              <div className="flex justify-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <AiFillStar key={i} size={18} className="text-orange-400" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
