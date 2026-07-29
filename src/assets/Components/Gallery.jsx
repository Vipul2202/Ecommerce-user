import React from 'react';
import { Link } from 'react-router-dom';
import galleryCategories from './galleryData';

const Gallery = () => {
  return (
    <div className="max-w-7xl px-4 py-8 justify-center items-center mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Before & After Gallery</h1>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {galleryCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/gallery/${category.slug}`}
            className="cursor-pointer group block transform transition duration-300 hover:scale-105"
          >
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl backdrop-blur-lg bg-white/30 border border-white/20">
              <img
                src={category.thumbnail}
                alt={category.name}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
              />

              {/* Category name badge - always visible, sits in front of the image */}
              <div className="absolute top-3 left-3 bg-[#00a0db] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                {category.name}
              </div>

              <div className="absolute bottom-0 left-0 w-full p-3 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <p className="text-sm font-semibold">Click to view</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
