import React from 'react';
import work1 from '../assets/sliceimg1.jpg';
import work2 from '../assets/sliceimg2.png';
import work3 from '../assets/sliceimg3.png';
import work4 from '../assets/sliceimg4.png';
import work5 from '../assets/sliceimg5.jpg';
import work6 from '../assets/sliceimg6.jpg';
import work7 from '../assets/sliceimg7.jpg';
import work8 from '../assets/img1.jpg';
import work9 from '../assets/img2.jpg';

const works = [
  {
    title: 'Corporate Branding',
    image: work1,
    description: 'Custom business cards, logos, and identity materials for top-tier brands.',
  },
  {
    title: 'Event Stationery',
    image: work2,
    description: 'Premium invitations and themed designs tailored for high-end events.',
  },
  {
    title: 'Packaging Design',
    image: work3,
    description: 'Creative product boxes, labels, and gift wraps that stand out.',
  },
  {
    title: 'Restaurant Menu',
    image: work4,
    description: 'Stylish menu designs with QR integration and elegant layouts.',
  },
  {
    title: 'E-commerce Flyers',
    image: work5,
    description: 'Attractive flyer designs to boost online product visibility.',
  },
  {
    title: 'Photo Mugs & Gifts',
    image: work6,
    description: 'Customized mugs, calendars, and print gifts for occasions.',
  },
  {
    title: 'Wall Branding',
    image: work7,
    description: 'High-quality wall prints and acrylic signage for interiors.',
  },
  {
    title: 'Diaries & Notebooks',
    image: work8,
    description: 'Branded stationery with foiling, embossing, and high-end finish.',
  },
  {
    title: 'Promotional Stickers',
    image: work9,
    description: 'Eye-catching labels and stickers for packaging and promotions.',
  },
];

const OurWork = () => {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1e3a8a] mb-14">
          Our Work
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#1e3a8a] mb-2">{work.title}</h3>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{work.description}</p>
                <button className="bg-[#1e3a8a] text-white text-sm px-4 py-2 rounded-md hover:bg-blue-900 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;
