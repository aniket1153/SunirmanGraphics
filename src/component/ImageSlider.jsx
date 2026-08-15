import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import img1 from '../assets/profilepage2.jpg';
import img2 from '../assets/profilepage3.jpg';
import img3 from '../assets/profilepage4.jpg';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 1400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2400,
    cssEase: 'ease-in-out',
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  const slides = [
    {
      id: 1,
      url: img1,
      title: 'Designed to Impress',
      desc: 'Modern graphics tailored for your business.',
    },
    {
      id: 2,
      url: img2,
      title: 'Premium Printing Solutions',
      desc: 'High-quality prints with precision and care.',
    },
    {
      id: 3,
      url: img3,
      title: 'Creative That Works',
      desc: 'From branding to large-format printing.',
    },
  ];

  return (
    <section className="relative w-full pt-[72px] sm:pt-[80px] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative">
            {/* Image */}
            <img
              src={slide.url}
              alt={slide.title}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="
                block w-full
                object-cover
                h-[320px]
                sm:h-[400px]
                md:h-[480px]
                lg:h-[520px]
                xl:h-[580px]
                bg-[#0f172a]
              "
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
                <div className="max-w-xl">

                  {/* Title */}
                  <h1
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="
                      text-white
                      text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                      font-semibold
                      leading-tight
                      drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]
                    "
                  >
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="
                      mt-4
                      text-white/90
                      text-sm sm:text-base md:text-lg
                      drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]
                    "
                  >
                    {slide.desc}
                  </p>

                  {/* CTA */}
                  <button
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="
                      mt-6
                      inline-flex items-center
                      bg-black/25 backdrop-blur-sm
                      border border-white/70
                      text-white
                      px-6 py-2.5
                      text-sm
                      font-semibold
                      rounded-full
                      hover:bg-white hover:text-ink
                      transition-all duration-300
                    "
                  >
                    Get a Quote
                  </button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ImageSlider;
