import { useState, useEffect } from 'react';

import image01 from "../assets/8460293_3864554.jpg";
import image02 from "../assets/Collection_of_GM_cricket_Bats_-desk_1800x.webp";
import image03 from "../assets/Collection_of_NewBalance_cricket_shoes-desk_3_1800x.webp";

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000); 

    return () => clearInterval(timer);
  }, []);


  const slides = [
    {
      id: "item1",
      image: image01,
      title: "Premium Sports Equipment",
      description: "Discover top-quality gear for every athlete",
      position: "object-center"
    },
    {
      id: "item2",
      image: image03,
      title: "Professional Grade",
      description: "Equipment trusted by professionals",
      position: "object-left"
    },
    {
      id: "item3",
      image: image02,
      title: "Exclusive Deals",
      description: "Special offers on selected items",
      position: "object-right"
    }
  ];

  return (
    <section className="relative">
      {/* Carousel Container */}
      <div className="carousel w-full h-[600px] relative overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            id={slide.id}
            className={`carousel-item absolute w-full h-full transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image with Gradient Overlay */}
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full ${slide.position} object-cover`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            </div>

          
          </div>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
            className="btn btn-circle btn-ghost text-white hover:bg-black/30"
          >
            ❮
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
            className="btn btn-circle btn-ghost text-white hover:bg-black/30"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 py-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 h-3 rounded-full ${
              currentSlide === index
                ? 'w-8 bg-primary'
                : 'w-3 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;
