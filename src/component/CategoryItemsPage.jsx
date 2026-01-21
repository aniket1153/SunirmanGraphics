import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const dummyCardsData = [
  {
    id: 1,
    title: "Premium Business Card",
    description: "Elegant design with your logo and contact info.",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Modern Card",
    description: "Clean and minimalist business card layout.",
    imageUrl: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Classic Style",
    description: "Traditional business card with serif fonts.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Creative Card",
    description: "Unique design with bold colors and shapes.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "Minimal Card",
    description: "Simple, elegant card with ample white space.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    title: "Luxury Card",
    description: "Gold foil details with premium paper.",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    title: "Tech Style",
    description: "Futuristic design for tech professionals.",
    imageUrl: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    title: "Eco-Friendly",
    description: "Made with recycled materials and soy inks.",
    imageUrl: "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=80",
  },
];

const CategoryItemsPage = () => {
  const { item } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-6 md:px-24">
      <Link to="/" className="text-blue-600 font-semibold hover:underline mb-8 inline-block">
        &larr; Back to Services
      </Link>
      <h1 className="text-4xl font-bold text-blue-900 mb-12 text-center">
        {item} Cards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {dummyCardsData.map(({ id, title, description, imageUrl }) => (
          <Card key={id} title={title} description={description} imageUrl={imageUrl} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, description, imageUrl }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-lg shadow-lg cursor-pointer overflow-hidden border border-gray-200 bg-white transition-transform hover:scale-105"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!hovered ? (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <div className="p-4 h-48 flex flex-col justify-center bg-blue-50 text-blue-900">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
      )}
    </div>
  );
};

export default CategoryItemsPage;
