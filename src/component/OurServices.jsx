import React, { useEffect } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaGift,
  FaPrint,
  FaBox,
  FaPen,
  FaTags,
  FaCubes,
  FaUtensils,
  FaLayerGroup,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

/* ---------------- ICONS ---------------- */

const categoryIcons = {
  "Business Essentials": <FaBriefcase className="text-blue-700" size={26} />,
  "Event Stationery": <FaCalendarAlt className="text-purple-700" size={26} />,
  "Personalized Gifts": <FaGift className="text-pink-700" size={26} />,
  "Printed Promotional Materials": <FaPrint className="text-orange-600" size={26} />,
  "Packaging Accessories": <FaBox className="text-yellow-600" size={26} />,
  "Office Supplies & Tools": <FaPen className="text-green-600" size={26} />,
  "Stickers & Labels": <FaTags className="text-red-600" size={26} />,
  "Boxes & Packaging": <FaCubes className="text-indigo-600" size={26} />,
  "Hospitality Essentials": <FaUtensils className="text-teal-600" size={26} />,
  "Design Services": <FaLayerGroup className="text-pink-600" size={26} />,
};

/* ---------------- DATA ---------------- */

const services1 = [
  {
    category: "Business Essentials",
    items: ["Business Cards", "Certificates", "Letterheads", "Brochures"],
  },
  {
    category: "Event Stationery",
    items: ["ID Cards", "Invitations", "Thank You Cards", "Calendars", "Diaries"],
  },
  {
    category: "Personalized Gifts",
    items: ["Photo Frames", "Photo Prints", "Photo Mugs", "Greeting Cards"],
  },
  {
    category: "Printed Promotional Materials",
    items: ["Flyers and Leaflets", "Posters", "Booklets", "Danglers", "standy"],
  },
  {
    category: "Packaging Accessories",
    items: [
      "Packaging Sleeves",
      "Tags",
      "Packaging Labels",
      "Boxes Package",
      "Bags Printing",
      "Pouches Printing",
    ],
  },
  {
    category: "Office Supplies & Tools",
    items: ["Envelopes", "Bill Books", "Pens", "Mousepads"],
  },
  {
    category: "Stickers & Labels",
    items: ["Custom Stickers", "NT Sticker Labels", "Transparent Stickers"],
  },
  {
    category: "Hospitality Essentials",
    items: ["Menu Cards", "Pad Printing", "DPR Register"],
  },
  {
    category: "Design Services",
    items: ["Product Design", "Logo Design", "Social Media Design"],
  },
];

/* ---------------- COMPONENT ---------------- */

const OurServices = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-24 px-6 md:px-20">
      
      {/* HEADER */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        data-aos="fade-down"
      >
        Our Services
      </motion.h1>

      <p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-16"
        data-aos="fade-up"
      >
        From professional printing to creative design and premium packaging,
        we deliver high-quality solutions tailored to your brand.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {services1.map((section, idx) => (
          <motion.div
            key={idx}
            className="group perspective"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
            data-aos="zoom-in"
          >
            <div className="relative w-full h-80 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">

              {/* FRONT */}
              <div className="absolute inset-0 bg-white border border-blue-200 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 backface-hidden group-hover:shadow-2xl">
                
                {/* COLOR STRIP */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl" />

                <div className="p-4 bg-blue-50 rounded-full mb-4 shadow-sm">
                  {categoryIcons[section.category]}
                </div>

                <h2 className="text-2xl font-semibold text-blue-800 text-center">
                  {section.category}
                </h2>

                <p className="text-sm text-gray-600 mt-2 text-center">
                  Professional printing & design
                </p>

                <span className="mt-3 text-xs text-blue-600 font-medium">
                  {section.items.length}+ Services Available
                </span>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 bg-white border border-blue-200 rounded-2xl shadow-lg p-6 transform rotate-y-180 backface-hidden overflow-auto">
                
                <h3 className="text-xl font-bold text-blue-700 mb-4">
                  {section.category}
                </h3>

                <ul className="space-y-3">
                  {section.items.map((item, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-lg transition flex items-center gap-3"
                    >
                      <FaTags className="text-blue-500" />
                      <Link
                        to={`/items/${encodeURIComponent(item)}`}
                        className="text-gray-700 hover:text-blue-800 font-medium"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FLIP STYLES */}
      <style>
        {`
          .perspective { perspective: 1200px; }
          .transform-style-preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
        `}
      </style>
    </div>
  );
};

export default OurServices;
