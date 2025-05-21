// ==========================================
// Slider Component - Hero section image slider
// ==========================================
import { useState, useEffect } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { FaArrowLeft, FaArrowRight, FaUsers, FaTasks, FaHandshake } from 'react-icons/fa';

/**
 * Slider Component
 * Creates an animated hero section with rotating slides
 */
const Slider = () => {
  // ========== SLIDE DATA ==========
  // Define the slides with text, background color, and icons
  const slides = [
    { 
      id: 1, 
      text: 'Find Freelancers for Your Tasks', 
      bg: 'bg-gradient-to-r from-blue-600 to-blue-400',
      icon: <FaUsers className="text-4xl mb-4" />
    },
    { 
      id: 2, 
      text: 'Post Tasks and Get Bids', 
      bg: 'bg-gradient-to-r from-green-600 to-green-400',
      icon: <FaTasks className="text-4xl mb-4" />
    },
    { 
      id: 3, 
      text: 'Connect with Skilled Professionals', 
      bg: 'bg-gradient-to-r from-purple-600 to-purple-400',
      icon: <FaHandshake className="text-4xl mb-4" />
    },
  ];
  
  // ========== STATE MANAGEMENT ==========
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // ========== AUTO ROTATION ==========
  // Automatically rotate slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [currentSlide]);

  // ========== SLIDE NAVIGATION ==========
  // Function to go to the previous slide with animation
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    
    // Reset animation flag after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Function to go to the next slide with animation
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    
    // Reset animation flag after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  // ========== RENDERING ==========
  return (
    <Reveal>
      <div className="relative w-full h-80 overflow-hidden">
        {/* Current Slide */}
        <div className={`
          w-full h-full flex flex-col items-center justify-center text-white
          transition-all duration-500 ease-in-out
          ${slides[currentSlide].bg}
        `}>
          <div className="text-center px-4 transform transition-all duration-500 animate-fadeIn">
            {slides[currentSlide].icon}
            <h2 className="text-3xl font-bold mb-2">{slides[currentSlide].text}</h2>
            <p className="text-lg opacity-90">Join our marketplace today</p>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button 
            onClick={prevSlide} 
            className="btn btn-circle btn-ghost text-white m-2 hover:bg-black hover:bg-opacity-20"
            disabled={isAnimating}
          >
            <FaArrowLeft />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button 
            onClick={nextSlide} 
            className="btn btn-circle btn-ghost text-white m-2 hover:bg-black hover:bg-opacity-20"
            disabled={isAnimating}
          >
            <FaArrowRight />
          </button>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => {
                if (isAnimating || index === currentSlide) return;
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
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