<<<<<<< HEAD
// Slider component for hero section
import { useState, useEffect } from 'react';
=======
import { useState, useEffect, useCallback } from 'react';
import { Reveal } from 'react-awesome-reveal';
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
import { FaArrowLeft, FaArrowRight, FaUsers, FaTasks, FaHandshake } from 'react-icons/fa';

const Slider = () => {
  const slides = [
<<<<<<< HEAD
    { id: 1, text: 'Find Freelancers', bg: 'bg-blue-500', icon: <FaUsers className="text-3xl" /> },
    { id: 2, text: 'Post Tasks', bg: 'bg-green-500', icon: <FaTasks className="text-3xl" /> },
    { id: 3, text: 'Connect with Pros', bg: 'bg-purple-500', icon: <FaHandshake className="text-3xl" /> },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide change every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Previous slide e jabo
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Next slide e jabo
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-64 overflow-hidden">
      <div className={`h-full flex items-center justify-center text-white ${slides[currentSlide].bg}`}>
        <div className="text-center">
          {slides[currentSlide].icon}
          <h2 className="text-2xl font-bold">{slides[currentSlide].text}</h2>
          <p>Join TaskMarket today!</p>
=======
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
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
        </div>
      </div>
      <button onClick={prevSlide} className="absolute left-2 top-1/2 bg-gray-800 text-white p-2 rounded">
        <FaArrowLeft />
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 bg-gray-800 text-white p-2 rounded">
        <FaArrowRight />
      </button>
      <div className="absolute bottom-2 flex justify-center space-x-2 w-full">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;