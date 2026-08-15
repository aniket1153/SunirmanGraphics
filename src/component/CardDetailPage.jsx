import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProduct } from "../api/products";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowLeft } from "react-icons/fi";

const CardDetailPage = () => {
  const { itemName, cardId } = useParams();
  const navigate = useNavigate();
  const decodedItem = decodeURIComponent(itemName);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProduct(decodedItem)
      .then((data) => {
        if (!active) return;
        setProduct(data);
        const card = data.images.find((c) => c._id === cardId);
        setSelectedImage(card?.url || data.images[0]?.url || "");
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
  }, [decodedItem, cardId]);

  if (loading) {
    return <div className="min-h-screen bg-white" />;
  }

  const card = product?.images.find((c) => c._id === cardId);

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-ink-soft">Card not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-10">
      {/* Back Button */}
      <div className="mb-10" data-aos="fade-right">
        <button
          onClick={() => navigate(`/items/${encodeURIComponent(decodedItem)}`)}
          className="flex items-center gap-2 bg-ink text-cream text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:bg-orange-500 hover:scale-105 transition-all"
        >
          <FiArrowLeft size={18} />
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT: Image Gallery */}
        <div data-aos="fade-up">
          <motion.div
            className="rounded-lg overflow-hidden shadow-sm border border-hairline bg-white hover:shadow-md transition-shadow duration-500"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={selectedImage}
              alt={card.title || decodedItem}
              className="w-full h-[460px] object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          {/* Thumbnails */}
          <div className="mt-6 flex gap-4 flex-wrap">
            {product.images.slice(0, 8).map((c) => (
              <motion.img
                key={c._id}
                src={c.url}
                alt={c.title || decodedItem}
                onClick={() => setSelectedImage(c.url)}
                whileHover={{ scale: 1.1 }}
                className={`w-24 h-20 rounded-md cursor-pointer object-cover border-2 transition-all duration-300 ${
                  selectedImage === c.url
                    ? "border-orange-500 shadow-lg"
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
          <span className="text-sm uppercase tracking-widest text-ink-soft/70">
            {decodedItem}
          </span>

          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-ink tracking-tight">
            {card.title || decodedItem}
          </h1>

          <p className="mt-6 text-ink-soft leading-relaxed max-w-xl">
            {card.description ||
              `Premium ${decodedItem} design crafted for modern branding and high-quality printing.`}
          </p>

          {/* Features */}
          <ul className="mt-8 space-y-3 text-ink-soft list-none">
            <li>✔ High-resolution print ready</li>
            <li>✔ Custom branding support</li>
            <li>✔ Professional graphic layout</li>
            <li>✔ Fast delivery</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() =>
                navigate("/ContactForm", { state: { product: decodedItem } })
              }
              className="px-8 py-4 rounded-full border border-ink/15 text-ink hover:border-ink hover:scale-105 transition-transform duration-300"
            >
              Contact Designer
            </button>
            <button
              onClick={() =>
                navigate("/ContactForm", { state: { product: decodedItem } })
              }
              className="px-8 py-4 rounded-full bg-ink text-cream hover:bg-orange-500 shadow-sm hover:scale-105 transition-transform duration-300"
            >
              Enquire Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardDetailPage;
