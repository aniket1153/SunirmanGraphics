import React, { useState, useMemo, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCardsForItem } from "../ImgComponet/mockImages";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowLeft } from "react-icons/fi";

const CardDetailPage = () => {
  const { itemName, cardId } = useParams();
  const navigate = useNavigate();
  const decodedItem = decodeURIComponent(itemName);

  const cards = useMemo(() => getCardsForItem(decodedItem), [decodedItem]);
  const card = cards.find((c) => c.id === Number(cardId));
  const [selectedImage, setSelectedImage] = useState(card?.image || "");

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, []);

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Card not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 md:px-16 py-10">
      {/* Back Button */}
      <div className="mb-10" data-aos="fade-right">
        <button
          onClick={() => navigate(`/items/${encodeURIComponent(decodedItem)}`)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg animate-pulse hover:scale-105 transition-transform"
        >
          <FiArrowLeft size={18} />
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT: Image Gallery */}
        <div data-aos="fade-up">
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl bg-white hover:shadow-3xl transition-shadow duration-500"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={selectedImage}
              alt={card.title}
              className="w-full h-[460px] object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          {/* Thumbnails */}
          <div className="mt-6 flex gap-4 flex-wrap">
            {cards.slice(0, 8).map((c) => (
              <motion.img
                key={c.id}
                src={c.image}
                alt={c.title}
                onClick={() => setSelectedImage(c.image)}
                whileHover={{ scale: 1.1 }}
                className={`w-24 h-20 rounded-xl cursor-pointer object-cover border-2 transition-all duration-300 ${
                  selectedImage === c.image
                    ? "border-gradient-to-r from-blue-400 to-purple-500 shadow-lg"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          data-aos="fade-left"
        >
          <span className="text-sm uppercase tracking-widest text-gray-400">
            {decodedItem}
          </span>

          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-gray-900">
            {card.title}
          </h1>

          <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
            {card.description ||
              `Premium ${decodedItem} design crafted for modern branding and high-quality printing.`}
          </p>

          {/* Features */}
          <ul className="mt-8 space-y-3 text-gray-700 list-none">
            <li>✔ High-resolution print ready</li>
            <li>✔ Custom branding support</li>
            <li>✔ Professional graphic layout</li>
            <li>✔ Fast delivery</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => navigate(`/ContactForm`)}
              className="px-8 py-4 rounded-xl border border-gray-300 text-gray-800 hover:border-black hover:scale-105 transition-transform duration-300"
            >
              Contact Designer
            </button>
            <button
              onClick={() => navigate(`/ContactForm`)}
              className="px-8 py-4 rounded-xl bg-black text-white hover:bg-gray-900 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Order Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardDetailPage;
