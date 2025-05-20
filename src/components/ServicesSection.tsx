'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaCoffee, FaUtensils, FaBirthdayCake, FaGlassCheers, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl p-6 shadow-neumorphic transition-all duration-300 hover:shadow-neumorphic-hover transform hover:-translate-y-1 cursor-pointer"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5, 
            delay: delay * 0.1,
            ease: "easeOut" 
          }
        }
      }}
    >
      <div className="flex flex-col items-end text-right">
        <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#588C7E] text-white">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <FaCoffee size={24} />,
      title: "קפה מיוחד",
      description: "מגוון רחב של קפה איכותי מרחבי העולם, נטחן ומוכן במקום על ידי בריסטות מקצועיים.",
      delay: 0
    },
    {
      icon: <FaUtensils size={24} />,
      title: "ארוחות בוקר וצהריים",
      description: "תפריט עשיר של ארוחות טריות המוכנות מחומרי גלם איכותיים ומקומיים.",
      delay: 1
    },
    {
      icon: <FaBirthdayCake size={24} />,
      title: "מאפים וקינוחים",
      description: "מבחר מאפים וקינוחים ביתיים הנאפים מדי יום במקום על ידי הקונדיטורים שלנו.",
      delay: 2
    },
    {
      icon: <FaGlassCheers size={24} />,
      title: "שירותי קייטרינג",
      description: "פתרונות קייטרינג מותאמים אישית לאירועים פרטיים ועסקיים בכל גודל.",
      delay: 3
    },
    {
      icon: <FaUsers size={24} />,
      title: "אירוח אירועים פרטיים",
      description: "אפשרות להשכרת המקום לאירועים פרטיים, ימי הולדת, מפגשים עסקיים ועוד.",
      delay: 4
    },
    {
      icon: <FaChalkboardTeacher size={24} />,
      title: "סדנאות קפה",
      description: "סדנאות מקצועיות להכנת קפה, טעימות וחוויות קולינריות בהנחיית מומחים.",
      delay: 5
    }
  ];

  return (
    <section id="services-section" dir="rtl" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">השירותים שלנו</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4ECDC4] to-[#588C7E] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            בבית קפה גמא אנו מציעים מגוון שירותים איכותיים המותאמים לצרכי הלקוחות שלנו
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Add custom Tailwind styles
const addCustomStyles = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      .shadow-neumorphic {
        box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1), 
                   -6px -6px 12px rgba(255, 255, 255, 0.8);
      }
      .shadow-neumorphic-hover {
        box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), 
                   -8px -8px 16px rgba(255, 255, 255, 0.8);
      }
    `;
    document.head.appendChild(style);
  }
};

const ServicesWithStyles: React.FC = () => {
  useEffect(() => {
    addCustomStyles();
  }, []);

  return <ServicesSection />;
};

export default ServicesWithStyles;