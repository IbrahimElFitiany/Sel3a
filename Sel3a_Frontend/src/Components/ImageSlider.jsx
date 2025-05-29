import { useState } from 'react';

const ImageSlider = () => {
  const images = [
    "/Anker.jpg",
    "/product2.png",
    "/Anker.jpg",
    "/Anker.jpg",
    "/Anker.jpg",
    "/Anker.jpg",
    "/product2.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0); // starting index of visible thumbnails
  const THUMBS_VISIBLE = 5;

  const handlePrevThumbs = () => {
    if (thumbStart > 0) setThumbStart(thumbStart - 1);
  };

  const handleNextThumbs = () => {
    if (thumbStart + THUMBS_VISIBLE < images.length) setThumbStart(thumbStart + 1);
  };

  const visibleThumbnails = images.slice(thumbStart, thumbStart + THUMBS_VISIBLE);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Image */}
      <div className="w-[60%] h-[400px] mb-4">
        <img
          src={images[currentIndex]}
          className="w-full h-full object-cover rounded-2xl"
          alt="Selected Product"
        />
      </div>

      {/* Thumbnails Slider */}
      <div className="relative w-[60%] flex items-center">
        {/* Left Arrow */}
        {thumbStart > 0 && (
          <button
            onClick={handlePrevThumbs}
            className="absolute left-0 z-10 bg-white shadow px-2 py-1 rounded-full"
          >
            &lt;
          </button>
        )}

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-hidden mx-6">
          {visibleThumbnails.map((img, index) => {
            const actualIndex = thumbStart + index;
            return (
              <img
                key={actualIndex}
                src={img}
                onClick={() => setCurrentIndex(actualIndex)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  actualIndex === currentIndex ? 'border-blue-500' : 'border-transparent'
                }`}
                alt="Thumbnail"
              />
            );
          })}
        </div>

        {/* Right Arrow */}
        {thumbStart + THUMBS_VISIBLE < images.length && (
          <button
            onClick={handleNextThumbs}
            className="absolute right-0 z-10 bg-white shadow px-2 py-1 rounded-full"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};
