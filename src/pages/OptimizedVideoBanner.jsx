// src/pages/OptimizedVideoBanner.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaSnowflake } from 'react-icons/fa';
import bannerVideo from "../assets/videos/banner.mp4";
import placeholderImage from "/src/assets/imagenes/otoño.jpg"; // Cambiado a una imagen de invierno
import { winterColors } from '../theme/WinterTheme';

// Componente de copo de nieve cayendo
const FallingSnowflake = ({ size, left, delay, duration, color }) => {
    return (
        <motion.div
            className="absolute text-blue-300 z-20"
            style={{ 
                left: `${left}%`,
                color: color || winterColors.ice1
            }}
            initial={{ 
                top: "-10%", 
                rotate: 0,
                opacity: 0.7,
                scale: size || 1
            }}
            animate={{ 
                top: "110%",
                x: ["0%", "3%", "-3%", "1%", "-1%", "0%"],
                rotate: 180,
                opacity: [0.7, 0.9, 0.8, 0.6, 0.4, 0]
            }}
            transition={{ 
                duration: duration || (12 + Math.random() * 8), 
                repeat: Infinity,
                delay: delay || 0,
                ease: "linear",
                x: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }
            }}
        >
            <FaSnowflake size={Math.random() * 8 + 10} />
        </motion.div>
    );
};

const OptimizedVideoBanner = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [currentText, setCurrentText] = useState(0);
    
    // Textos de invierno
    const texts = [
        "Explorá el paraíso invernal en las sierras de San Luis",
        "Viví la serenidad del invierno en Potrero de los Funes",
        "Sentí la paz de la naturaleza en el frío serrano"
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

    // Crear un conjunto de copos de nieve cayendo
    const winterSnowflakes = Array.from({ length: 25 }, (_, i) => {
        const snowColors = [
            winterColors.ice1,
            winterColors.ice2,
            winterColors.snow1,
            winterColors.snow2,
            winterColors.crystal
        ];
        
        return (
            <FallingSnowflake 
                key={i} 
                size={Math.random() * 0.4 + 0.6} 
                left={Math.random() * 100} 
                delay={i * 0.4} 
                duration={12 + Math.random() * 8}
                color={snowColors[i % snowColors.length]}
            />
        );
    });

    return (
        <section className="relative h-screen overflow-hidden flex flex-col justify-between">
            {/* Imagen de fondo */}
            <img
                src={placeholderImage}
                alt="Potrero de los Funes winter landscape"
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Video de fondo */}
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
            
            {/* Capa de superposición con tono invernal mejorado para mejor contraste */}
            <div 
                className="absolute inset-0" 
                style={{ 
                    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))` 
                }}
            />
            
            {/* Copos de nieve cayendo */}
            {winterSnowflakes}
            
            {/* Contenido */}
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
                        style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)' }}
                    >
                        Potrero de los Funes
                    </motion.h1>
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentText}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            {/* Etiqueta de temporada con mejor contraste */}
                            <motion.span
                                className="inline-block bg-black/60 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium mb-4 border border-white/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <FaSnowflake className="inline-block mr-2" />
                                Temporada de Invierno 2025
                            </motion.span>
                            
                            <p className="text-xl sm:text-2xl md:text-3xl"
                                style={{ 
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)' 
                                }}
                            >
                                {texts[currentText]}
                            </p>
                        </motion.div>
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
                        className="text-white hover:text-blue-200 transition duration-300 focus:outline-none"
                        aria-label="Scroll to content"
                    >
                        <FaChevronDown size={40} className="animate-bounce" />
                    </button>
                </motion.div>
            </div>

            {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-900 bg-opacity-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-200"></div>
                </div>
            )}
        </section>
    );
};

export default OptimizedVideoBanner;