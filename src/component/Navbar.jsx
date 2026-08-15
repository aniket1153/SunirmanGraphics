import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiX, FiSearch, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/mylogo.png";
import { getCategories } from "../api/categories";

const MEGA_MENU_ITEM_CAP = 4;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [categories, setCategories] = useState([]);
  const searchRef = useRef(null);
  const servicesRef = useRef(null);
  const servicesPanelRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    getCategories(true)
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/aboutmain" },
    { name: "Gallery", path: "/Gallery" },
    { name: "Contact Us", path: "/ContactForm" },
  ];

  const allItems = categories.flatMap((section) =>
    (section.products || []).map((p) => ({ item: p.name, category: section.name }))
  );

  const results =
    query.trim().length > 0
      ? allItems
          .filter(({ item }) =>
            item.toLowerCase().includes(query.trim().toLowerCase())
          )
          .slice(0, 8)
      : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
      const insideTrigger = servicesRef.current?.contains(e.target);
      const insidePanel = servicesPanelRef.current?.contains(e.target);
      if (!insideTrigger && !insidePanel) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToItem = (item) => {
    setQuery("");
    setShowResults(false);
    setIsOpen(false);
    navigate(`/items/${encodeURIComponent(item)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) goToItem(results[0].item);
  };

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setServicesOpen(false)}
      className="w-full fixed top-0 left-0 z-100 bg-white/95 backdrop-blur border-b border-hairline"
    >
      <nav className="max-w-[1400px] mx-auto pl-2 sm:pl-4 md:pl-1 pr-4 sm:pr-6 lg:pr-8 py-3 flex items-center gap-4 lg:gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={img1} alt="Logo" className="h-10 sm:h-12 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-ink font-semibold text-xs lg:text-sm uppercase tracking-wide whitespace-nowrap">
          <li className="relative group">
            <Link to="/" className="hover:text-orange-500 transition-colors duration-300">
              Home
            </Link>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
          </li>

          {/* Services mega-menu */}
          <li
            className="relative group"
            ref={servicesRef}
            onMouseEnter={() => setServicesOpen(true)}
          >
            <button
              className="flex items-center gap-1 hover:text-orange-500 transition-colors duration-300"
              onClick={() => setServicesOpen(true)}
            >
              Services
              <FiChevronDown
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                servicesOpen ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </li>

          {navItems.slice(1).map((item) => (
            <li key={item.name} className="relative group">
              <Link
                to={item.path}
                className="transition-colors duration-300 hover:text-orange-500"
              >
                {item.name}
              </Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="hidden md:block relative ml-auto w-full max-w-xs" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/50"
              size={16}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 rounded-full bg-gray-100 text-ink placeholder-ink-soft/50 border border-hairline focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
            />
          </form>

          {showResults && results.length > 0 && (
            <ul className="absolute top-full mt-2 w-full bg-white text-ink rounded-lg shadow-xl border border-hairline overflow-hidden">
              {results.map(({ item, category }) => (
                <li key={item}>
                  <button
                    onClick={() => goToItem(item)}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors flex flex-col"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <span className="text-xs text-ink-soft/70">{category}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden text-ink ml-auto">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </nav>

      {/* Services mega-menu panel — flush full-width, DailyObjects-style */}
      {servicesOpen && (
        <div
          ref={servicesPanelRef}
          className="hidden md:block absolute left-0 top-full w-full bg-white border-t border-hairline shadow-lg"
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-10 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10">
              {categories.map((section) => {
                const thumb = section.image?.url;
                const items = section.products || [];
                const visibleItems = items.slice(0, MEGA_MENU_ITEM_CAP);
                return (
                  <div key={section._id}>
                    <Link
                      to={`/category/${encodeURIComponent(section.name)}`}
                      onClick={() => setServicesOpen(false)}
                      className="block mb-3"
                    >
                      <div className="w-28 aspect-square rounded-md overflow-hidden bg-gray-100">
                        {thumb && (
                          <img
                            src={thumb}
                            alt={section.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </Link>
                    <Link
                      to={`/category/${encodeURIComponent(section.name)}`}
                      onClick={() => setServicesOpen(false)}
                      className="block font-bold text-xs uppercase tracking-wide mb-3 hover:text-orange-500 transition-colors"
                    >
                      {section.name}
                    </Link>
                    <ul className="space-y-2 mb-2">
                      {visibleItems.map((p) => (
                        <li key={p._id}>
                          <Link
                            to={`/items/${encodeURIComponent(p.name)}`}
                            onClick={() => setServicesOpen(false)}
                            className="text-sm text-ink-soft hover:text-orange-500 transition-colors"
                          >
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/category/${encodeURIComponent(section.name)}`}
                      onClick={() => setServicesOpen(false)}
                      className="text-sm font-semibold text-orange-600 underline underline-offset-2 hover:text-orange-500 transition-colors"
                    >
                      View All +
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-hairline max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-4">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/50"
                size={16}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2.5 rounded-full bg-gray-100 text-ink placeholder-ink-soft/50 border border-hairline focus:outline-none focus:border-orange-500"
              />
            </form>
            {query.trim() && (
              <ul className="mb-4 bg-white rounded-md border border-hairline overflow-hidden">
                {results.length > 0 ? (
                  results.map(({ item }) => (
                    <li key={item}>
                      <button
                        onClick={() => goToItem(item)}
                        className="w-full text-left px-4 py-2.5 text-ink text-sm hover:bg-gray-50 transition-colors"
                      >
                        {item}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2.5 text-ink-soft/70 text-sm">No products found</li>
                )}
              </ul>
            )}
          </div>

          <ul className="px-4 pb-4 space-y-1">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block text-ink font-medium hover:text-orange-500 transition-colors py-2.5"
              >
                Home
              </Link>
            </li>

            <li>
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="w-full flex items-center justify-between text-ink font-medium hover:text-orange-500 transition-colors py-2.5"
              >
                Services
                <FiChevronDown
                  className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileServicesOpen && (
                <div className="pl-2 pb-2 space-y-1">
                  {categories.map((section) => (
                    <details key={section._id} className="group/cat">
                      <summary className="flex items-center justify-between cursor-pointer text-ink-soft text-sm font-semibold py-2 border-b border-hairline">
                        {section.name}
                        <FiChevronRight className="transition-transform group-open/cat:rotate-90" />
                      </summary>
                      <ul className="pl-3 py-1 space-y-1">
                        {(section.products || []).map((p) => (
                          <li key={p._id}>
                            <Link
                              to={`/items/${encodeURIComponent(p.name)}`}
                              onClick={() => setIsOpen(false)}
                              className="block text-ink-soft text-sm py-1.5 hover:text-orange-500 transition-colors"
                            >
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              )}
            </li>

            {navItems.slice(1).map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-ink font-medium hover:text-orange-500 transition-colors py-2.5"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
