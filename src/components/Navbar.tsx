'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';

interface NavItem {
  id: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { id: 'about', label: 'אודות' },
    { id: 'services', label: 'שירותים' },
    { id: 'gallery', label: 'גלריה' },
    { id: 'testimonials', label: 'המלצות' },
    { id: 'booking', label: 'הזמנה' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Variants for animations
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 20
      }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      color: '#4ECDC4',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header
      id="main-navbar"
      dir="rtl"
      className={`fixed top-0 right-0 left-0 z-50 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      } transition-all duration-300`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      aria-label="ניווט ראשי"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ScrollLink
              to="hero"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="cursor-pointer"
            >
              <h1 className="text-xl md:text-2xl font-bold text-right text-gray-800">
                <span className="text-[#4ECDC4]">בית קפה</span>{' '}
                <span className="text-[#588C7E]">גמא</span>
              </h1>
            </ScrollLink>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                variants={linkVariants}
                whileHover="hover"
                className="relative"
              >
                <ScrollLink
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-700 hover:text-[#4ECDC4] font-medium text-right transition-colors duration-300 cursor-pointer"
                  activeClass="text-[#4ECDC4] font-semibold"
                >
                  {item.label}
                </ScrollLink>
                <motion.div
                  className="absolute bottom-0 right-0 h-0.5 bg-[#4ECDC4] w-0"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-[#4ECDC4] bg-opacity-10 text-[#588C7E] hover:bg-opacity-20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:ring-opacity-50"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-white shadow-lg"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col py-4 px-4 space-y-3 border-t border-gray-200">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ScrollLink
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="block py-2 px-4 text-right text-gray-700 hover:text-[#4ECDC4] hover:bg-gray-50 rounded-md transition-colors duration-300 cursor-pointer"
                    activeClass="text-[#4ECDC4] font-semibold bg-gray-50"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </ScrollLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;