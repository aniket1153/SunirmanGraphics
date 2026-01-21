import React, { useState, useEffect } from 'react'; 
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from '../assets/chetak1.jpg';
import img2 from '../assets/client1.png';

const testimonials = [
  {
    name: 'Emily Carter',
    role: 'CEO, BrightTech',
    quote: 'Their dedication and understanding of our vision made it a seamless experience.',
    image: img1,
  },
  {
    name: 'Michael Roberts',
    role: 'CTO, Nova Solutions',
    quote: 'Professional team with excellent communication and delivery.',
    image: img2,
  },
  {
    name: 'Sophia Patel',
    role: 'Founder, CreatiVue',
    quote: 'They truly cared about our goals and exceeded expectations with outstanding results.',
    image: img1,
  },
  {
    name: 'Liam Johnson',
    role: 'Product Manager, InnoWave',
    quote: 'Smooth process, great results, and very reliable support throughout the project lifecycle.',
    image: img2,
  },
];

const Testimonials = () => {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }, []);

  const settings = {
    infinite: true,
    autoplay: !paused,
    speed: 5200,          
    autoplaySpeed: 0,     
    cssEase: 'linear',    
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-[90%] mx-auto">
        <h2 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-14">
          What Our Clients Say
        </h2>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Slider {...settings}>
            {testimonials.map((client, index) => (
              <div key={index} className="px-4 h-full mb-2.5">
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex gap-5 h-full min-h-[220px] flex-col justify-between"
                >
                  {/* Image */}
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 flex-shrink-0 mx-auto sm:mx-0"
                  />

                  {/* Text */}
                  <div className="flex flex-col justify-between mt-4 sm:mt-0">
                    <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed mb-3 break-words">
                      “{client.quote}”
                    </p>

                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-blue-600">{client.role}</p>
                    </div>
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
