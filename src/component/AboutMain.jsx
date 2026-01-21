import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import aboutHero from "../assets/aboutimg.jpg";
import owner1 from "../assets/Owner1.jpg";
import owner2 from "../assets/Owner2.jpg";
import event1 from "../assets/EventsImg1.jpg";
import event2 from "../assets/EventsImg4.jpeg";
import event3 from "../assets/EventsImg2.jpg";
import event4 from "../assets/EventsImg5.jpeg";
import event5 from "../assets/EventsImg3.jpg";
import project1 from "../assets/owner.jpg";
import project2 from "../assets/owner.jpg";
import project3 from "../assets/owner.jpg";

import {
  FaBullseye,
  FaEye,
  FaPrint,
  FaClock,
  FaPalette,
  FaCogs,
} from "react-icons/fa";

const AboutMain = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  const eventGallery = [event1, event2, event3, event4, event5];
  const projectGallery = [project1, project2, project3];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    autoplay: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-[#f6f8fb] overflow-hidden mt-24">

      {/* ================= HERO SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-24 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <p className="text-orange-500 uppercase tracking-widest font-semibold text-sm mb-4">
            About Sunirman Graphics
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a1f44] mb-6 leading-tight">
            Printing That Builds <br />
            <span className="text-orange-500">Powerful Brands</span>
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
            We specialize in high-quality printing, packaging, and graphic
            solutions that help businesses stand out. Every print reflects
            precision, creativity, and trust.
          </p>
        </div>

        {/* Creative Image Shape */}
       <div data-aos="fade-left" className="relative max-w-lg mx-auto">
  {/* Accent Block */}
  <div className="absolute -bottom-6 -right-6 w-full h-full bg-orange-100 rounded-3xl"></div>

  <div className="relative rounded-3xl overflow-hidden shadow-xl">
    <img
      src={aboutHero}
      alt="About Sunirman Graphics"
      className="w-full h-[420px] object-cover"
    />
  </div>
</div>

      </div>

      {/* ================= MISSION & VISION ================= */}
      <div className="max-w-6xl mx-auto px-6 lg:px-24 py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        {[{
          icon: <FaBullseye />,
          title: "Our Mission",
          text: "To deliver premium printing and branding solutions that elevate businesses through creativity, quality, and reliability."
        },
        {
          icon: <FaEye />,
          title: "Our Vision",
          text: "To become a trusted leader in the printing industry, known for innovation, precision, and customer satisfaction."
        }].map((item, i) => (
          <div
            key={i}
            data-aos="fade-up"
            className="relative bg-white p-12 rounded-3xl shadow-lg hover:shadow-2xl transition"
          >
            <span className="absolute left-0 top-10 w-1 h-24 bg-orange-500 rounded-full"></span>
            <div className="w-14 h-14 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-5">
              {item.icon}
            </div>
            <h2 className="text-2xl font-semibold text-[#0a1f44] mb-3">
              {item.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-white py-28">
        <h2 className="text-4xl font-extrabold text-center text-[#0a1f44] mb-16">
          Why Choose Us
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-6">
          {[{
            icon: <FaPrint />,
            title: "Premium Print Quality"
          },
          {
            icon: <FaClock />,
            title: "Fast Turnaround Time"
          },
          {
            icon: <FaPalette />,
            title: "Creative Design Support"
          },
          {
            icon: <FaCogs />,
            title: "Modern Machines"
          }].map((item, i) => (
            <div key={i} className="text-center" data-aos="zoom-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <p className="font-semibold text-[#0a1f44]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= OWNERS ================= */}
      <div className="bg-[#f6f8fb] py-28">
        <h2 className="text-4xl font-extrabold text-[#0a1f44] text-center mb-16">
          Meet the Owners
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-16">
          {[{
            img: owner1,
            name: "Owner One",
            role: "Co-Founder",
            desc: "Expert in creative print design and branding strategy."
          },
          {
            img: owner2,
            name: "Owner Two",
            role: "Co-Founder",
            desc: "Specialist in production, quality control, and operations."
          }].map((owner, i) => (
            <div key={i} data-aos="zoom-in" className="text-center max-w-xs">
              <div className="w-56 h-56 mx-auto mb-6 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={owner.img}
                  alt={owner.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#0a1f44]">
                {owner.name}
              </h3>
              <p className="text-orange-500 text-sm mb-2">
                {owner.role}
              </p>
              <p className="text-gray-600 text-sm">
                {owner.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CULTURE & EVENTS ================= */}
      <div className="bg-white py-28">
        <h2 className="text-4xl font-extrabold text-center text-[#0a1f44] mb-6">
          Company Culture & Events
        </h2>
        <p className="text-center max-w-3xl mx-auto text-gray-600 mb-14">
          A glimpse into our workspace, team moments, celebrations, and the
          passion that drives every print.
        </p>

        <div className="max-w-7xl mx-auto px-6">
          <Slider {...sliderSettings}>
            {eventGallery.map((img, idx) => (
              <div key={idx} className="px-3">
                <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                  <img src={img} alt="Event" className="w-full h-72 object-cover" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* ================= PRINT WORKS GALLERY ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-24 py-28">
        <h2 className="text-4xl font-extrabold text-[#0a1f44] mb-4">
          Our Print Works
        </h2>
        <p className="text-gray-600 mb-12">
          Showcasing our craftsmanship, print quality, and creative execution.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectGallery.map((img, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
            >
              <img
                src={img}
                alt="Print Work"
                className="w-full h-80 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default AboutMain;
