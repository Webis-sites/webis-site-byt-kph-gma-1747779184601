'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaCoffee, FaAward, FaUsers } from 'react-icons/fa';

const AboutSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const featureItems = [
    {
      icon: <FaCoffee className="text-3xl text-primary mb-4" />,
      title: 'איכות מעולה',
      description: 'אנו מקפידים על חומרי גלם איכותיים ותהליכי הכנה מדויקים',
    },
    {
      icon: <FaAward className="text-3xl text-primary mb-4" />,
      title: 'ניסיון רב שנים',
      description: 'עם שנים רבות בתחום, אנו מביאים ניסיון וידע מקצועי לכל כוס קפה',
    },
    {
      icon: <FaUsers className="text-3xl text-primary mb-4" />,
      title: 'שירות מצוין',
      description: 'הלקוחות שלנו נהנים מחוויית שירות אישית ומקצועית',
    },
  ];

  return (
    <section 
      id="about-section" 
      dir="rtl" 
      className="py-16 bg-gray-50"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col lg:flex-row gap-12 items-center"
        >
          {/* Image Column */}
          <motion.div 
            variants={itemVariants} 
            className="lg:w-1/2 w-full"
          >
            <div className="relative">
              <div className="absolute -right-4 -bottom-4 w-full h-full bg-secondary rounded-lg"></div>
              <div className="relative overflow-hidden rounded-lg shadow-neumorphic">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="בית קפה גמא - אווירה" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            variants={itemVariants} 
            className="lg:w-1/2 w-full text-right"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              <span className="text-primary">בית קפה גמא</span> - החוויה שלנו
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              אנחנו בית קפה מוביל בתחום הקמעונאות עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {featureItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-neumorphic text-center"
                >
                  {item.icon}
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-lg shadow-neumorphic-button hover:bg-primary-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              קרא עוד עלינו
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Second Row with Additional Images */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div 
            variants={itemVariants}
            className="overflow-hidden rounded-lg shadow-neumorphic h-64"
          >
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="קפה איכותי" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="overflow-hidden rounded-lg shadow-neumorphic h-64"
          >
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="אווירה נעימה" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="overflow-hidden rounded-lg shadow-neumorphic h-64 md:col-span-2 lg:col-span-1"
          >
            <img 
              src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="שירות מקצועי" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .shadow-neumorphic {
          box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), 
                     -8px -8px 16px rgba(255, 255, 255, 0.7);
        }
        
        .shadow-neumorphic-button {
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), 
                     -4px -4px 8px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default AboutSection;