import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { getProducts } from "../api/products";
import { FiArrowLeft } from "react-icons/fi";

const CategoryListingPage = () => {
  const { categoryName } = useParams();
  const decoded = decodeURIComponent(categoryName);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProducts({ category: decoded })
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch(() => {
        if (active) setProducts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [decoded]);

  if (!loading && products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24">
        <p className="text-xl text-ink-soft">No products found in "{decoded}" yet.</p>
        <Link to="/OurServices" className="text-orange-500 font-semibold hover:underline">
          Browse all categories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/OurServices")}
          className="flex items-center gap-2 text-ink font-semibold hover:text-orange-500 transition-colors mb-6"
        >
          <FiArrowLeft /> All Categories
        </button>

        <div className="mb-12" data-aos="fade-up">
          <p className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-2">
            {products.length} Products
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
            {decoded}
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => {
            const image = product.images?.[0]?.url;
            return (
              <Link
                key={product._id}
                to={`/items/${encodeURIComponent(product.name)}`}
                data-aos="fade-up"
                data-aos-delay={idx * 60}
                className="group rounded-lg border border-hairline hover:border-orange-400 bg-white shadow-sm hover:shadow-md transition-colors duration-300 overflow-hidden"
              >
                <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-soft/50 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryListingPage;
