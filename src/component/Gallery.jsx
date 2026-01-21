import React from 'react';
import Masonry from './Masonry'; 
import img1 from "../assets/sliceimg1.jpg" 
import img2 from "../assets/sliceimg2.png" 
import img3 from "../assets/sliceimg3.png" 
import img4 from "../assets/sliceimg4.png"
import img5 from "../assets/sliceimg5.jpg"
import img6 from "../assets/sliceimg6.jpg"

const items = [
  {
    id: "1",
    img: img1,
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "2",
    img: img2,
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "3",
    img: img3,
    url: "https://example.com/three",
    height: 600,
  },
    {
    id: "4",
    img: img4,
    url: "https://example.com/three",
    height: 600,
  },
     {
    id: "5",
    img: img5,
    url: "https://example.com/three",
    height: 600,
  },
      {
    id: "6",
    img: img6,
    url: "https://example.com/three",
    height: 600,
  },
     {
    id: "7",
    img: img6,
    url: "https://example.com/three",
    height: 600,
  },
    {
    id: "8",
    img: img5,
    url: "https://example.com/three",
    height: 600,
  },
    {
    id: "9",
    img: img4,
    url: "https://example.com/three",
    height: 600,
  },
      {
    id: "10",
    img: img6,
    url: "https://example.com/three",
    height: 600,
  },
  // Add your own images here
];

const Gallery = () => {
  return (
    <div className="pt-[10%] min-h-[150vh] bg-gray-200">
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false}
      />
    </div>
  );
};

export default Gallery;
