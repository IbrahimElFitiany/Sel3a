import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = ["/Banner.avif", "/Banner2.avif", "/Banner3.avif"];

const CustomPrevArrow = ({ onClick }) => (
    <button
        className="absolute z-20 bg-[#3A3C3D] text-white p-3 rounded-full hover:bg-[#2a2b2c] shadow-md"
        onClick={onClick}
        style={{
            top: "50%",
            left: "-20px", // Move the button more outside
            transform: "translateY(-50%)",
            zIndex: 20,
        }}
    >
        <img src="/arrow.png" className="w-4 h-4 rotate-180" alt="prev" />
    </button>
);

const CustomNextArrow = ({ onClick }) => (
    <button
        className="absolute z-20 bg-[#3A3C3D] text-white p-3 rounded-full hover:bg-[#2a2b2c] shadow-md"
        onClick={onClick}
        style={{
            top: "50%",
            right: "-20px", // Move the button more outside
            transform: "translateY(-50%)",
            zIndex: 20,
        }}
    >
        <img src="/arrow.png" className="w-4 h-4" alt="next" />
    </button>
);

const BannerSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const settings = {
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        afterChange: index => setCurrentIndex(index),
        dots: false,
    };

    return (
        <div className="py-6 pt-5 px-40 w-[100%] mx-auto relative">
            <div className="relative rounded-lg">
                {/* Overlapping Progress Bar at Bottom */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                i === currentIndex ? "w-12 bg-white" : "w-6 bg-gray-400"
                            }`}
                        ></div>
                    ))}
                </div>
                
                {/* Slider without overflow hidden */}
                <div className="relative w-full">
                    <Slider {...settings}>
                        {images.map((src, index) => (
                            <div key={index} className="w-full h-[300px] rounded-lg overflow-hidden">
                                <img
                                    src={src}
                                    alt={`Slide ${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default BannerSlider;
