'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronRight, FaChevronLeft, FaQuoteRight } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  quote: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'יעל כהן',
    quote: 'הקפה הטוב ביותר בעיר! האווירה נעימה והצוות מקסים. אני מגיעה לכאן כל בוקר לפני העבודה.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 2,
    name: 'דוד לוי',
    quote: 'העוגות שלהם מדהימות! אני ממליץ במיוחד על עוגת השוקולד. המקום נקי ומסודר תמיד.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 3,
    name: 'מיכל אברהם',
    quote: 'מקום מושלם לפגישות עבודה. האינטרנט מהיר והאווירה שקטה. השירות תמיד אדיב ומקצועי.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 4,
    name: 'אבי גולדשטיין',
    quote: 'אני מגיע לכאן כבר שנתיים. התפריט מגוון והמחירים הוגנים. הצוות זוכר את ההזמנה הקבועה שלי!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 5,
    name: 'רונית שרון',
    quote: 'המקום האהוב עליי לשבת עם חברות. העיצוב מקסים והאווירה נעימה. ממליצה בחום!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      nextSlide(); // In RTL, left arrow moves to next slide
    } else if (e.key === 'ArrowRight') {
      prevSlide(); // In RTL, right arrow moves to previous slide
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`inline-block ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <section 
      id="testimonials-section" 
      dir="rtl" 
      className="py-16 px-4 bg-gray-50"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="חוות דעת לקוחות"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">מה הלקוחות שלנו אומרים</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4ECDC4] to-[#588C7E] mx-auto"></div>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-wrap justify-center"
              >
                <div className="w-full md:w-4/5 lg:w-3/4">
                  <div className="bg-white rounded-2xl p-8 shadow-[5px_5px_15px_rgba(0,0,0,0.05),-5px_-5px_15px_rgba(255,255,255,0.8)]">
                    <div className="flex flex-col md:flex-row items-center text-right">
                      <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.5)]">
                          <img 
                            src={testimonials[currentIndex].avatar} 
                            alt={`תמונה של ${testimonials[currentIndex].name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-3/4 md:pr-8">
                        <div className="relative">
                          <FaQuoteRight className="absolute -top-4 right-0 text-[#4ECDC4] opacity-20 text-4xl" aria-hidden="true" />
                          <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            {testimonials[currentIndex].quote}
                          </p>
                          <div className="mb-2">
                            {renderStars(testimonials[currentIndex].rating)}
                          </div>
                          <h3 className="font-bold text-xl text-gray-800">
                            {testimonials[currentIndex].name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 items-center">
            <button
              onClick={prevSlide}
              className="mx-2 p-3 rounded-full bg-white text-[#588C7E] hover:text-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.5)] transition-all duration-300 hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.5)]"
              aria-label="הלקוח הקודם"
            >
              <FaChevronLeft className="text-lg" />
            </button>

            <div className="flex space-x-2 mx-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] ${
                    currentIndex === index
                      ? 'bg-[#4ECDC4]'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`עבור לחוות דעת ${index + 1}`}
                  aria-current={currentIndex === index ? 'true' : 'false'}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="mx-2 p-3 rounded-full bg-white text-[#588C7E] hover:text-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.5)] transition-all duration-300 hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.5)]"
              aria-label="הלקוח הבא"
            >
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;