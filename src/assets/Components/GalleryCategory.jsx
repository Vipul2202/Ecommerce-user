import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BeforeAfterViewer from './BeforeAfterGallery';
import galleryCategories from './galleryData';

const GalleryCategory = () => {
  const { categorySlug } = useParams();
  const [selectedPair, setSelectedPair] = useState(null);

  const category = galleryCategories.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="max-w-7xl px-4 py-16 mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h2>
        <Link to="/gallery" className="text-[#00a0db] font-semibold underline">
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl px-4 py-8 justify-center items-center mx-auto">
      <Link to="/gallery" className="inline-block mb-6 text-[#00a0db] font-semibold hover:underline">
        ← Back to Gallery
      </Link>

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">{category.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.pairs.map((pair, idx) => (
          <div
            key={idx}
            className="cursor-pointer group transform transition duration-300 hover:scale-105"
            onClick={() => setSelectedPair(pair)}
          >
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl backdrop-blur-lg bg-white/30 border border-white/20">
              <img
                src={pair.after}
                alt={pair.title || category.name}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
              />
              <div className="absolute bottom-0 left-0 w-full p-3 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <p className="text-sm font-semibold">Click to view Before & After</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Viewer */}
      {selectedPair && (
        <BeforeAfterViewer
          beforeImg={selectedPair.before}
          afterImg={selectedPair.after}
          onClose={() => setSelectedPair(null)}
        />
      )}
    </div>
  );
};

export default GalleryCategory;
