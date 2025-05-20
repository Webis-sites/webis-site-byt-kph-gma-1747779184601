'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for background image
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Smooth scroll function
  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div 
      id="cta-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      dir="rtl"
    >
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="בית קפה גמא - אווירה"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-24 md:py-32 flex flex-col items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-xl text-right"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            חוויה ייחודית בבית קפה גמא
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8">
            הצטרפו אלינו לחוויה קולינרית מיוחדת באווירה מרגיעה. המקום המושלם לפגישות עסקיות, מפגשים חברתיים או רגעים של שקט לעצמכם.
          </p>
          
          <motion.button
            onClick={scrollToBooking}
            className="group flex items-center gap-3 bg-[#4ECDC4] hover:bg-[#3dbdb5] text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-[4px_4px_10px_rgba(78,205,196,0.3),-4px_-4px_10px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_15px_rgba(78,205,196,0.4),-6px_-6px_15px_rgba(255,255,255,0.15)] focus:outline-none focus:ring-2 focus:ring-[#588C7E] focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label="קבע תור עכשיו"
          >
            <span>קבע תור עכשיו</span>
            <FaCalendarAlt className="text-xl transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative element */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#588C7E]/20 rounded-tr-full z-10"
      />
    </div>
  );
};

export default CTASection;