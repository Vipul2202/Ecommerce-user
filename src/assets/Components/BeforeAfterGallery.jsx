import React, { useRef, useState } from 'react';

const BeforeAfterViewer = ({ beforeImg, afterImg, onClose }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleSliderMove = (e) => {
    const bounds = containerRef.current.getBoundingClientRect();
    const position = ((e.clientX - bounds.left) / bounds.width) * 100;
    if (position >= 0 && position <= 100) {
      setSliderPosition(position);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="relative w-full max-w-4xl h-[300px] md:h-[500px] overflow-hidden rounded-xl shadow-lg"
        ref={containerRef}
        onMouseMove={handleSliderMove}
        onTouchMove={(e) => handleSliderMove(e.touches[0])}
      >
        <img src={afterImg} alt="After" className="absolute top-0 left-0 w-full h-full object-cover" />
        <img src={beforeImg} alt="Before" className="absolute top-0 left-0 h-full object-cover"
          style={{ width: `${sliderPosition}%`, clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }} />

        <div className="absolute top-0 bottom-0 w-1 bg-white z-10" style={{ left: `${sliderPosition}%` }} />
        <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-[#00a0db] border-4 border-white z-20 cursor-ew-resize"
          style={{ left: `calc(${sliderPosition}% - 12px)` }}></div>

        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">Before</div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">After</div>
        <button onClick={onClose} className="absolute top-2 right-1/2 translate-x-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded z-50">
          Close
        </button>
      </div>
    </div>
  );
};

export default BeforeAfterViewer;
