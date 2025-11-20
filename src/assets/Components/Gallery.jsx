import React, { useState } from 'react';
import BeforeAfterViewer from "./BeforeAfterGallery";
import hrold from '../../img/hrold.jpg';
import hrnew from '../../img/hrnew.jpg';
import idold from '../../img/idold.jpg';
import idnew from '../../img/idnew.jpg';
import ubold from '../../img/uc-old.jpg';
import ubnew from '../../img/uc-neww.jpg';
import wpold from '../../img/wheelpolish-old.jpg';
import wpnew from '../../img/wheelpolish-new.jpg';
import pcold from '../../img/pcold.jpg';
import pcnew from '../../img/pcnew.jpg';


const imagePairs = [
 { before: hrold, after: hrnew ,serviceName: 'Headlight Restoration' },
 { before: idold, after: idnew ,serviceName: 'Interior Protection' },
  { before: ubold, after: ubnew ,serviceName: 'Underbody Clean & Paint Service' },
  { before: wpold, after: wpnew ,serviceName: 'Alloy Wheel Polishing' },
  { before: pcold, after: pcnew ,serviceName: 'Stage 3 Paint Protection' },
  
];

const ITEMS_PER_PAGE = 6;

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPair, setSelectedPair] = useState(null);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visiblePairs = imagePairs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(imagePairs.length / ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl  px-4 py-8 justify-center items-center mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 ">Before & After Gallery</h1>

      {/* Grid of Thumbnails */}
     {/* Grid of Thumbnails */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
  {visiblePairs.map((pair, idx) => (
    <div
      key={idx}
      className="cursor-pointer group transform transition duration-300 hover:scale-105"
      onClick={() => setSelectedPair(pair)}
    >
      <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl backdrop-blur-lg bg-white/30 border border-white/20">
        <img
          src={pair.after}
          alt={pair.serviceName || "After"}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
        />
        <div className="absolute bottom-0 left-0 w-full p-3 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <p className="text-sm font-semibold">Click to view Before & After</p>
        </div>
      </div>

      {/* Service Name */}
      <p className="mt-3 text-center text-lg font-semibold text-gray-700 italic">
        {pair.serviceName}
      </p>
    </div>
  ))}
</div>


      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-full bg-[#00a0db] hover:bg-black text-white disabled:opacity-50 transition"
        >
          Prev
        </button>
        <span className="text-[#00a0db] font-medium px-2 py-2 rounded-lg bg-white shadow">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-full bg-[#00a0db] hover:bg-black text-white disabled:opacity-50 transition"
        >
          Next
        </button>
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

export default Gallery;
