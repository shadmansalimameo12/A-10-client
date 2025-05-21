import { useState, useEffect, useCallback } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { FaArrowLeft, FaArrowRight, FaUsers, FaTasks, FaHandshake } from 'react-icons/fa';

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: 'Find Expert Freelancers',
      description: 'Connect with skilled professionals for any task, big or small.',
      bg: 'bg-gradient-to-br from-purple-600 to-indigo-600',
      icon: <FaUsers className="text-5xl mb-4" />
    },
    {
      id: 2,
      title: 'Post Your Tasks Easily',
      description: 'Describe your needs, set your budget, and watch the bids roll in.',
      bg: 'bg-gradient-to-br from-teal-500 to-cyan-500',
      icon: <FaTasks className="text-5xl mb-4" />
    },
    {
      id: 3,
      title: 'Get Quality Work Done',
      description: 'Collaborate seamlessly and achieve your project goals efficiently.',
      bg: 'bg-gradient-to-br from-rose-500 to-pink-500',
      icon: <FaHandshake className="text-5xl mb-4" />
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <Reveal>
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-lg shadow-2xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`
              absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center
              transition-opacity duration-1000 ease-in-out
              ${slide.bg}
              ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
          >
            {slide.icon}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-md">{slide.title}</h2>
            <p className="text-md md:text-lg lg:text-xl opacity-90 max-w-xl drop-shadow-sm">{slide.description}</p>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 btn btn-circle btn-ghost text-white text-2xl z-20 hover:bg-black/30"
          aria-label="Previous slide"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 btn btn-circle btn-ghost text-white text-2xl z-20 hover:bg-black/30"
          aria-label="Next slide"
        >
          <FaArrowRight />
        </button>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default Slider;