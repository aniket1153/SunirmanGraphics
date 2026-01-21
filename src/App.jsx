import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './component/Navbar';
import Footer from './component/Footer';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lazy-loaded components
const ImageSlider = lazy(() => import('./component/ImageSlider'));
const HeroSection = lazy(() => import('./component/HeroSection'));
const ServiceCards = lazy(() => import('./component/ServiceCards'));
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

const Home = () => (
  <>
    <ImageSlider />
    <HeroSection />
    <ServiceCards />
    <AboutUs />
    <OurWorkSection />
    <Testimonials />
  </>
);

const App = () => {

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,       // animation only once
      offset: 120,
      disable: () => window.innerWidth < 768,
    });
  }, []);

  return (
    <Router>
      <Navbar />

      {/* Lazy loading fallback */}
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/ourvision" element={<OurVision />} />
          <Route path="/OurServices" element={<OurServices />} />
          <Route path="/Ourwork" element={<OurWork />} />
          <Route path="/ContactForm" element={<ContactForm />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/items/:itemName" element={<ItemDetailPage />} />
          <Route path="/items/:itemName/cards/:cardId" element={<CardDetailPage />} />
          <Route path="/aboutmain" element={<AboutMain />} />
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
};

export default App;
