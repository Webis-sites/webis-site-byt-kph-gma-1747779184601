'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';

const GammaHero: React.FC = () => {
  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for the CTA button
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    },
  };

  // Handle keyboard navigation for the CTA button
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Handle button click action
      console.log('CTA button activated via keyboard');
    }
  };

  return (
    <section 
      id="gamma-cafe-hero" 
      dir="rtl" 
      className="relative w-full h-screen overflow-hidden bg-gray-100"
      aria-labelledby="hero-heading"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="אווירת בית קפה"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-end justify-center h-full px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="w-full md:w-3/5 lg:w-1/2 text-right">
          {/* Heading */}
          <motion.h1
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            בית קפה מוביל בישראל
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-100 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              ...textVariants,
              visible: {
                ...textVariants.visible,
                transition: {
                  delay: 0.2,
                  duration: 0.8,
                  ease: 'easeOut',
                },
              },
            }}
          >
            חווית לקוח מושלמת בכל ביקור
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="px-8 py-4 rounded-lg text-lg font-medium text-white bg-[#4ECDC4] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:ring-opacity-50"
            style={{
              boxShadow: '0 6px 12px rgba(78, 205, 196, 0.3), inset 0 2px 3px rgba(255, 255, 255, 0.2)',
              textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
            }}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onKeyDown={handleKeyDown}
            aria-label="קבע תור עכשיו"
            tabIndex={0}
          >
            <span className="flex items-center justify-center">
              קבע תור עכשיו
              <FaArrowLeft className="mr-2 text-sm" aria-hidden="true" />
            </span>
          </motion.button>

          {/* Business Description */}
          <motion.p
            className="mt-8 text-gray-200 max-w-lg"
            initial="hidden"
            animate="visible"
            variants={{
              ...textVariants,
              visible: {
                ...textVariants.visible,
                transition: {
                  delay: 0.4,
                  duration: 0.8,
                  ease: 'easeOut',
                },
              },
            }}
          >
            אנחנו בית קפה מוביל בתחום הקמעונאות עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
          </motion.p>
        </div>
      </div>

      {/* Neumorphic decorative element */}
      <motion.div
        className="absolute bottom-10 left-10 w-24 h-24 rounded-full hidden md:block"
        style={{
          background: 'linear-gradient(145deg, #588C7E, #4ECDC4)',
          boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 0.8, 
          y: 0,
          transition: {
            delay: 0.8,
            duration: 1,
            ease: 'easeOut'
          }
        }}
      />
    </section>
  );
};

export default GammaHero;