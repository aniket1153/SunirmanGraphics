import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../api/products";
import { FiArrowLeft } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const ItemDetailPage = () => {
  const { itemName } = useParams();
  const decodedItem = decodeURIComponent(itemName);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProduct(decodedItem)
      .then((data) => {
        if (active) setProduct(data);
      })
      .catch(() => {
        if (active) setProduct(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [decodedItem]);

  if (!loading && (!product || product.images.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-ink-soft">
          No data found for {decodedItem}
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen" />;
  }

  const images = product.images;

  return (
    <div className="min-h-screen bg-white p-10 pt-32 relative z-10">
      {/* TITLE + BACK BUTTON */}
      <div
        className="flex flex-wrap items-center gap-6 mb-8"
        data-aos="fade-down"
      >
        {/* Back Button on left */}
        <button
          onClick={() => navigate("/OurServices")}
          className="flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:bg-orange-500 hover:scale-105 transition-all"
        >
          <FiArrowLeft size={18} />
          Back
        </button>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-ink tracking-tight">
          {decodedItem}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto mb-10" data-aos="fade-up">
        <button
          onClick={() =>
            navigate("/ContactForm", { state: { product: decodedItem } })
          }
          className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-sm hover:bg-orange-600 hover:scale-105 transition-transform"
        >
          Enquire Now
        </button>
        <span className="ml-4 text-sm text-ink-soft">
          {images.length} design{images.length === 1 ? "" : "s"} available
        </span>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {images.map((card, idx) => (
          <div
            key={card._id}
            onClick={() => navigate(`/items/${encodeURIComponent(itemName)}/cards/${card._id}`)}
            className="relative group overflow-hidden rounded-lg border border-hairline shadow-sm cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            {/* IMAGE */}
            <div className="w-full h-80 overflow-hidden rounded-lg">
              <img
                src={card.url}
                alt={card.title || decodedItem}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>

            {/* INFO OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 py-6 text-white backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
              <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">
                {card.title || decodedItem}
              </h3>
              <p className="text-sm text-gray-200 tracking-wide drop-shadow-sm">
                {card.description || `High-quality ${decodedItem} design`}
              </p>
            </div>

            {/* DESIGN LABEL */}
            <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              Design {idx + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetailPage;
