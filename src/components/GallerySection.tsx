'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Define types for our gallery items
interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  description: string;
  width: number;
  height: number;
}

const GallerySection: React.FC = () => {
  // Sample gallery items with café-related images
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
      alt: 'קפה חם עם לאטה ארט',
      description: 'קפה איכותי עם אומנות לאטה מושלמת',
      width: 800,
      height: 1200,
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      alt: 'עוגת שוקולד עם פירות',
      description: 'עוגת שוקולד ביתית עם פירות טריים',
      width: 1200,
      height: 800,
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56',
      alt: 'אווירה בבית הקפה',
      description: 'האווירה הנעימה והמזמינה בבית קפה גמא',
      width: 800,
      height: 1000,
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
      alt: 'מבחר מאפים טריים',
      description: 'מבחר מאפים טריים שנאפים במקום מדי יום',
      width: 1200,
      height: 900,
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
      alt: 'סלט ירוק טרי',
      description: 'סלט ירוק טרי עם רכיבים מקומיים',
      width: 900,
      height: 1200,
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b',
      alt: 'קפה קר עם קרח',
      description: 'קפה קר מרענן לימי הקיץ החמים',
      width: 800,
      height: 1100,
    },
    {
      id: '7',
      src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0',
      alt: 'פינת ישיבה נעימה',
      description: 'פינות ישיבה נעימות לעבודה או מפגשים חברתיים',
      width: 1200,
      height: 800,
    },
    {
      id: '8',
      src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
      alt: 'ארוחת בוקר מפנקת',
      description: 'ארוחת בוקר מפנקת עם מבחר מטעמים',
      width: 900,
      height: 1000,
    },
  ];

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation for the lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateGallery('next');
          break;
        case 'ArrowRight':
          navigateGallery('prev');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  // Open lightbox with the selected image
  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  // Close the lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Navigate through images in the lightbox
  const navigateGallery = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
      );
      setSelectedImage(galleryItems[currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1]);
    } else {
      setCurrentIndex((prevIndex) => 
        prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
      );
      setSelectedImage(galleryItems[currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1]);
    }
  };

  // Animation variants for gallery items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      id="gallery-section" 
      className="py-16 px-4 md:px-8 bg-gray-50" 
      dir="rtl"
      aria-labelledby="gallery-heading"
    >
      <div className="container mx-auto">
        <motion.h2 
          id="gallery-heading"
          className="text-4xl font-bold text-right mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          הגלריה שלנו
        </motion.h2>
        
        <motion.p 
          className="text-lg text-right text-gray-600 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          צפו בתמונות מבית קפה גמא - האווירה, המאכלים והמשקאות שלנו
        </motion.p>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative overflow-hidden rounded-lg shadow-md ${
                index % 3 === 0 ? 'row-span-2' : ''
              }`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
            >
              <div 
                className="relative group cursor-pointer h-full"
                onClick={() => openLightbox(item, index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openLightbox(item, index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`פתח תמונה של ${item.alt}`}
              >
                <div className="aspect-w-1 aspect-h-1 h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    quality={85}
                  />
                </div>
                
                {/* Hover overlay with description */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-semibold">{item.alt}</h3>
                  <p className="text-white/90 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            ref={lightboxRef}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div 
              className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative w-full h-full flex items-center justify-center p-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Caption */}
                <div className="absolute bottom-8 right-0 left-0 text-center bg-black/50 p-4 mx-auto max-w-2xl rounded-lg">
                  <h3 className="text-white text-xl font-semibold mb-2">{selectedImage.alt}</h3>
                  <p className="text-white/90">{selectedImage.description}</p>
                </div>
              </motion.div>

              {/* Navigation buttons */}
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGallery('prev');
                }}
                aria-label="תמונה קודמת"
              >
                <FiChevronRight size={24} />
              </button>
              
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGallery('next');
                }}
                aria-label="תמונה הבאה"
              >
                <FiChevronLeft size={24} />
              </button>
              
              {/* Close button */}
              <button
                className="absolute top-4 left-4 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white transition-colors duration-300"
                onClick={closeLightbox}
                aria-label="סגור"
              >
                <FiX size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;