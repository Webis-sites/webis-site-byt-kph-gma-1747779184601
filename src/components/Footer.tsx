'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically send the email to your newsletter service
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const socialLinks = [
    { icon: <FaFacebook size={24} />, href: '#', label: 'פייסבוק' },
    { icon: <FaInstagram size={24} />, href: '#', label: 'אינסטגרם' },
    { icon: <FaTwitter size={24} />, href: '#', label: 'טוויטר' },
    { icon: <FaWhatsapp size={24} />, href: '#', label: 'וואטסאפ' },
  ];

  const navLinks = [
    { name: 'דף הבית', href: '/' },
    { name: 'תפריט', href: '/menu' },
    { name: 'אודות', href: '/about' },
    { name: 'אירועים', href: '/events' },
    { name: 'צור קשר', href: '/contact' },
  ];

  return (
    <footer 
      id="footer" 
      dir="rtl" 
      className="bg-white text-right pt-16 pb-8 shadow-inner"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">פוטר</h2>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo and About Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center justify-end mb-4">
              <div className="mr-3">
                <h3 className="text-xl font-bold text-gray-800">בית קפה גמא</h3>
                <p className="text-sm text-gray-600 mt-1">חוויית קפה מושלמת</p>
              </div>
              <div className="relative h-16 w-16 overflow-hidden rounded-full shadow-lg" style={{ boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' }}>
                <Image 
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80" 
                  alt="לוגו בית קפה גמא" 
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              אנחנו בית קפה מוביל בתחום הקמעונאות עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">ניווט מהיר</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.a 
                      className="text-gray-600 hover:text-[#4ECDC4] transition-colors duration-300 block"
                      whileHover={{ x: -5 }}
                    >
                      {link.name}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">צור קשר</h3>
            <address className="not-italic text-gray-600">
              <p className="mb-2">רחוב הרצל 123, תל אביב</p>
              <p className="mb-2">טלפון: 03-1234567</p>
              <p className="mb-2">דוא"ל: info@gamacafe.co.il</p>
            </address>
            <h4 className="text-md font-semibold text-gray-800 mt-6 mb-3">שעות פעילות</h4>
            <p className="text-gray-600">ראשון - חמישי: 08:00 - 22:00</p>
            <p className="text-gray-600">שישי - שבת: 09:00 - 23:00</p>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">הצטרפו לניוזלטר שלנו</h3>
            <p className="text-gray-600 mb-4">קבלו עדכונים על מבצעים ואירועים מיוחדים</p>
            
            {isSubscribed ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-100 text-green-800 rounded-lg"
              >
                תודה שנרשמת! בקרוב תקבל/י עדכונים מאיתנו.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="הזן/י את כתובת המייל שלך"
                    required
                    aria-label="כתובת דואר אלקטרוני לניוזלטר"
                    className="w-full px-4 py-2 text-right rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent"
                    style={{ 
                      boxShadow: 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff',
                      backgroundColor: '#f0f0f0'
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2 px-4 bg-[#4ECDC4] hover:bg-[#588C7E] text-white font-medium rounded-lg transition-colors duration-300"
                  style={{ 
                    boxShadow: '3px 3px 6px #d1d9e6, -3px -3px 6px #ffffff'
                  }}
                >
                  הרשמה
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div 
          variants={containerVariants}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div variants={itemVariants} className="mb-4 md:mb-0 order-2 md:order-1">
              <p className="text-gray-600">© 2023 בית קפה גמא. כל הזכויות שמורות.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex space-x-6 space-x-reverse order-1 md:order-2 mb-6 md:mb-0">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-600 hover:text-[#4ECDC4] transition-colors duration-300"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;