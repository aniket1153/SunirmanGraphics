import React, { useEffect } from "react";  
import { useParams, useNavigate } from "react-router-dom";
import { getCardsForItem } from "../ImgComponet/mockImages";
import { FiArrowLeft } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const ItemDetailPage = () => {
  const { itemName } = useParams();
  const decodedItem = decodeURIComponent(itemName);
  const navigate = useNavigate();

  const mockCards = getCardsForItem(decodedItem);

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, []);

  if (mockCards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">
          No data found for {decodedItem}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-10 pt-32 relative z-10">
      {/* TITLE + BACK BUTTON */}
      <div
        className="flex items-center gap-6 mb-14"
        data-aos="fade-down"
      >
        {/* Back Button on left */}
        <button
          onClick={() => navigate("/OurServices")}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg animate-pulse transition-transform hover:scale-105"
        >
          <FiArrowLeft size={18} />
          Back
        </button>

        {/* Page Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-wide">
          {decodedItem}
        </h1>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {mockCards.slice(0, 4).map(({ id, title, image, description }, idx) => (
          <div
            key={id}
            onClick={() => navigate(`/items/${encodeURIComponent(itemName)}/cards/${id}`)}
            className="relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer transform transition-all duration-700 hover:scale-105 hover:rotate-1 hover:shadow-3xl"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            {/* IMAGE */}
            <div className="w-full h-80 overflow-hidden rounded-3xl">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>

            {/* INFO OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 py-6 text-white backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
              <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{title}</h3>
              <p className="text-sm text-gray-200 tracking-wide drop-shadow-sm">{description}</p>
            </div>

            {/* FEATURED LABEL */}
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg animate-pulse">
              Featured
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetailPage;
