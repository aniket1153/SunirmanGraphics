import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../assets/chetak1.jpg";
import img2 from "../assets/client1.png";

const testimonials = [
  {
    name: "Emily Carter",
    role: "CEO, BrightTech",
    quote: "Their dedication and understanding of our vision made it a seamless experience.",
    image: img1,
  },
  {
    name: "Michael Roberts",
    role: "CTO, Nova Solutions",
    quote: "Professional team with excellent communication and delivery.",
    image: img2,
  },
  {
    name: "Sophia Patel",
    role: "Founder, CreatiVue",
    quote: "They truly cared about our goals and exceeded expectations with outstanding results.",
    image: img1,
  },
  {
    name: "Liam Johnson",
    role: "Product Manager, InnoWave",
    quote: "Smooth process, great results, and very reliable support throughout the project lifecycle.",
    image: img2,
  },
];

const Testimonials = () => {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

const settings = {
  infinite: true,
  autoplay: !paused,
  speed: 6000,
  autoplaySpeed: 0,
  cssEase: "linear",
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  pauseOnHover: false,
  swipe: true,              // ✅ allow touch
  draggable: true,          // ✅ mobile support
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        swipe: true,
        draggable: true,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        speed: 4000,        // ✅ slower for mobile
        swipe: true,
        draggable: true,
      },
    },
  ],
};




  return (
    <section className="bg-gradient-to-br from-[#f6f8fb] via-white to-[#eef2f8] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          data-aos="fade-up"
          className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-center text-[#0a1f44] mb-16"
        >
          What Our Clients Say
        </h2>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Slider {...settings}>
            {testimonials.map((client, index) => (
              <div key={index} className="px-4 h-full mb-5">
                <div
  data-aos="fade-up"
  data-aos-delay={index * 100}
  className="
    relative bg-white rounded-3xl p-7
    min-h-[230px]
    border border-dashed border-[#0a1f44]/20
    shadow-md hover:shadow-xl
    transition-all duration-500
    flex flex-col items-center text-center
  "
>
  {/* IMAGE – CENTERED */}
  <div className="mb-5 flex justify-center">
    <img
      src={client.image}
      alt={client.name}
      className="
        w-18 h-18 sm:w-20 sm:h-20
        rounded-full object-cover
        border-4 border-[#0a1f44]/20
        shadow-md
      "
    />
  </div>

  {/* QUOTE */}
  <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed mb-4">
    “{client.quote}”
  </p>

  {/* NAME */}
  <div>
    <h3 className="text-base sm:text-lg font-semibold text-[#0a1f44]">
      {client.name}
    </h3>
    <p className="text-sm text-[#0a1f44]/70">{client.role}</p>
  </div>
</div>

              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
