import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { ProtectedRoute, OwnerRoute } from './admin/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lazy-loaded public components
const ImageSlider = lazy(() => import('./component/ImageSlider'));
const HeroSection = lazy(() => import('./component/HeroSection'));
const ServiceCards = lazy(() => import('./component/ServiceCards'));
const CategoryGrid = lazy(() => import('./component/CategoryGrid'));
const FeaturedProducts = lazy(() => import('./component/FeaturedProducts'));
const AboutUs = lazy(() => import('./component/AboutUs'));
const OurWorkSection = lazy(() => import('./component/OurWorkSection'));
const Testimonials = lazy(() => import('./component/Testimonials'));
const OurVision = lazy(() => import('./component/OurVision'));
const OurServices = lazy(() => import('./component/OurServices'));
const OurWork = lazy(() => import('./component/OurWork'));
const ContactForm = lazy(() => import('./component/ContactForm'));
const Gallery = lazy(() => import('./component/Gallery'));
const ItemDetailPage = lazy(() => import('./component/ItemDetailPage'));
const CardDetailPage = lazy(() => import('./component/CardDetailPage'));
const AboutMain = lazy(() => import('./component/AboutMain'));
const CategoryListingPage = lazy(() => import('./component/CategoryListingPage'));

// Lazy-loaded admin components
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const CategoriesPage = lazy(() => import('./admin/pages/CategoriesPage'));
const ProductsPage = lazy(() => import('./admin/pages/ProductsPage'));
const ProductImagesPage = lazy(() => import('./admin/pages/ProductImagesPage'));
const LeadsPage = lazy(() => import('./admin/pages/LeadsPage'));
const UsersPage = lazy(() => import('./admin/pages/UsersPage'));

const Home = () => (
  <>
    <ImageSlider />
    <HeroSection />
    <CategoryGrid
      subheading="Every category we print and design, in one place."
    />
    <FeaturedProducts />
    <ServiceCards />
    <AboutUs />
    <OurWorkSection />
    <Testimonials />
  </>
);

const PublicSite = () => (
  <>
    <Navbar />
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/ourvision" element={<OurVision />} />
        <Route path="/OurServices" element={<OurServices />} />
        <Route path="/Ourwork" element={<OurWork />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/category/:categoryName" element={<CategoryListingPage />} />
        <Route path="/items/:itemName" element={<ItemDetailPage />} />
        <Route path="/items/:itemName/cards/:cardId" element={<CardDetailPage />} />
        <Route path="/aboutmain" element={<AboutMain />} />
      </Routes>
    </Suspense>
    <Footer />
  </>
);

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 120,
      disable: () => window.innerWidth < 768,
    });
  }, []);

  return (
    <Router>
      <AdminAuthProvider>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:id/images" element={<ProductImagesPage />} />
                <Route path="leads" element={<LeadsPage />} />
                <Route element={<OwnerRoute />}>
                  <Route path="users" element={<UsersPage />} />
                </Route>
              </Route>
            </Route>

            <Route path="/*" element={<PublicSite />} />
          </Routes>
        </Suspense>
      </AdminAuthProvider>
    </Router>
  );
};

export default App;
