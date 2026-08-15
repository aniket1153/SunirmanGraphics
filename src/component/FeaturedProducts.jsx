import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { getProducts } from "../api/products";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      let data = await getProducts({ featured: true }).catch(() => []);
      if (data.length === 0) {
        data = await getProducts().catch(() => []);
        data = data.slice(0, 10);
      }
      if (active) setProducts(data);
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const handleEnquire = (e, name) => {
    e.stopPropagation();
    navigate("/ContactForm", { state: { product: name } });
  };

  if (products.length === 0) return null;

  return (
    <section className="w-full py-16 sm:py-20 px-6 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-3">
              Popular Right Now
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink">
              Trending Products
            </h2>
          </div>
          <button
            onClick={() => navigate("/OurServices")}
            className="hidden sm:flex items-center gap-2 text-ink font-semibold hover:text-orange-500 transition-colors"
          >
            View All Products <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/items/${encodeURIComponent(product.name)}`)}
              className="group cursor-pointer rounded-lg border border-hairline hover:border-orange-400 bg-white shadow-sm hover:shadow-md transition-colors duration-300 overflow-hidden flex flex-col"
            >
              <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                {product.images?.[0]?.url ? (
                  <img
                    src={product.images[0].url}
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
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="text-sm font-bold text-ink leading-snug group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-ink-soft/70 mt-1">
                    {product.category?.name}
                  </p>
                </div>
                <button
                  onClick={(e) => handleEnquire(e, product.name)}
                  className="mt-auto text-xs font-semibold text-orange-600 border border-orange-200 rounded-full py-2 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/OurServices")}
          className="sm:hidden mt-8 w-full flex items-center justify-center gap-2 text-ink font-semibold border border-hairline rounded-full py-3"
        >
          View All Products <FiArrowRight />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
