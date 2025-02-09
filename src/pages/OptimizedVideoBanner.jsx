import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import bannerVideo from "../assets/videos/banner.mp4";
import placeholderImage from "../assets/images/images.jpg";

const OptimizedVideoBanner = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [currentText, setCurrentText] = useState(0);
    const texts = [
        "Explorá el paraíso en las sierras de San Luis",
        "Viví la aventura en Potrero de los Funes",
        "Sentí la naturaleza, adrenalina y relax en un solo lugar"
    ];

    useEffect(() => {
        const videoElement = document.getElementById('background-video');
        videoElement.addEventListener('canplay', () => setVideoLoaded(true));

        const textInterval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % texts.length);
        }, 5000);

        return () => clearInterval(textInterval);
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <section className="relative h-screen overflow-hidden flex flex-col justify-between">
            <img
                src={placeholderImage}
                alt="Potrero de los Funes landscape"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <video
                id="background-video"
                src={bannerVideo}
                autoPlay
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    videoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-100 opacity-40" />
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full pb-1">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center text-white px-4 max-w-4xl"
                >
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold mb-6 text-shadow-lg"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}
                    >
                        Potrero de los Funes
                    </motion.h1>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentText}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-xl sm:text-2xl md:text-3xl mb-12 text-shadow-md"
                            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
                        >
                            {texts[currentText]}
                        </motion.p>
                    </AnimatePresence>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-8"
                >
                    <button
                        onClick={scrollToContent}
                        className="text-white hover:text-gray-200 transition duration-300 focus:outline-none"
                        aria-label="Scroll to content"
                    >
                        <FaChevronDown size={40} className="animate-bounce" />
                    </button>
                </motion.div>
            </div>

            {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                </div>
            )}
        </section>
    );
};

export default OptimizedVideoBanner;