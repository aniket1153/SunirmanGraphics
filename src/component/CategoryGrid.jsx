import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/categories";
import { CategoryIcon } from "../utils/categoryIcons";

const CategoryGrid = ({ heading = "Shop by Category", subheading, full = false }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCategories(true)
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch(() => {
        if (active) setCategories([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visible = full ? categories : categories.slice(0, 9);

  return (
    <section className="w-full py-16 sm:py-20 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <div className="text-center mb-12">
            <p className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-3">
              Browse Everything We Print
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-3 text-ink-soft max-w-2xl mx-auto">{subheading}</p>
            )}
          </div>
        )}

        {!loading && visible.length === 0 && (
          <p className="text-center text-ink-soft py-10">
            No categories yet. Check back soon.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
          {visible.map((category) => {
            const thumb = category.image?.url;
            return (
              <Link
                key={category._id}
                to={`/category/${encodeURIComponent(category.name)}`}
                className="group rounded-lg border border-hairline hover:border-orange-400 bg-white shadow-sm hover:shadow-md transition-colors duration-300 overflow-hidden"
              >
                <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CategoryIcon iconKey={category.icon} />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-sm sm:text-base font-bold text-ink leading-snug group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-ink-soft/70 mt-1.5">
                    {(category.products || []).length} items
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
