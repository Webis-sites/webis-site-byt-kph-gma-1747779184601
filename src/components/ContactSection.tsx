'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface BusinessHour {
  day: string;
  hours: string;
}

const ContactSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const businessHours: BusinessHour[] = [
    { day: 'ראשון', hours: '08:00 - 22:00' },
    { day: 'שני', hours: '08:00 - 22:00' },
    { day: 'שלישי', hours: '08:00 - 22:00' },
    { day: 'רביעי', hours: '08:00 - 22:00' },
    { day: 'חמישי', hours: '08:00 - 22:00' },
    { day: 'שישי', hours: '08:00 - 16:00' },
    { day: 'שבת', hours: 'סגור' },
  ];

  const contactItems = [
    {
      id: 'phone',
      icon: <FaPhone className="ml-2 text-primary" />,
      title: 'טלפון',
      content: '03-1234567',
      link: 'tel:+97231234567',
    },
    {
      id: 'email',
      icon: <FaEnvelope className="ml-2 text-primary" />,
      title: 'אימייל',
      content: 'info@gamacafe.co.il',
      link: 'mailto:info@gamacafe.co.il',
    },
    {
      id: 'address',
      icon: <FaMapMarkerAlt className="ml-2 text-primary" />,
      title: 'כתובת',
      content: 'רחוב אלנבי 123, תל אביב',
      link: 'https://maps.google.com/?q=Allenby+123+Tel+Aviv',
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section 
      id="contact-section" 
      dir="rtl" 
      className="py-16 bg-gray-50"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        <h2 
          id="contact-heading" 
          className="text-4xl font-bold text-right mb-12 text-gray-800"
        >
          צור קשר
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Info Column */}
          <motion.div 
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-right mb-6 text-gray-700">
                פרטי התקשרות
              </h3>
              
              <div className="space-y-6">
                {contactItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <a 
                      href={item.link}
                      className="flex items-center text-right p-4 rounded-lg transition-all duration-300"
                      style={{
                        boxShadow: hoveredItem === item.id 
                          ? 'inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.9)'
                          : '4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.9)',
                        background: hoveredItem === item.id ? '#f5f5f5' : 'white',
                      }}
                      aria-label={`${item.title}: ${item.content}`}
                    >
                      {item.icon}
                      <div>
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        <p className="text-gray-600">{item.content}</p>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-10"
                variants={itemVariants}
              >
                <div 
                  className="p-4 rounded-lg"
                  style={{
                    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <div className="flex items-center text-right mb-4">
                    <FaClock className="ml-2 text-primary" />
                    <h4 className="font-medium text-gray-800">שעות פעילות</h4>
                  </div>
                  <ul className="space-y-2">
                    {businessHours.map((day, index) => (
                      <li key={index} className="flex justify-between text-gray-600">
                        <span className="font-medium">{day.day}</span>
                        <span>{day.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Map Column */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl p-4 shadow-lg h-full">
              <h3 className="text-2xl font-semibold text-right mb-6 text-gray-700">
                המיקום שלנו
              </h3>
              
              <div className="relative h-96 rounded-lg overflow-hidden">
                <iframe 
                  title="מיקום בית קפה גמא"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.0681856076!2d34.77398!3d32.066157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b82a6148a07%3A0x9f5e6e5e6f8e5e5e!2sAllenby%20St%20123%2C%20Tel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1620000000000!5m2!1sen!2sil" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  aria-label="מפת גוגל המציגה את מיקום בית קפה גמא"
                />
              </div>
              
              <div className="mt-6">
                <motion.div 
                  className="p-4 rounded-lg bg-gradient-to-br from-[#4ECDC4] to-[#588C7E] text-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="text-xl font-semibold text-right mb-2">
                    בית קפה גמא
                  </h4>
                  <p className="text-right">
                    אנחנו בית קפה מוביל בתחום הקמעונאות עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;