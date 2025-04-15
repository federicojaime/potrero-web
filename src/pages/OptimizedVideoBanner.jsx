// src/pages/OptimizedVideoBanner.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaLeaf } from 'react-icons/fa';
import bannerVideo from "../assets/videos/banner.mp4";
import placeholderImage from "/src/assets/imagenes/otoño.jpg"; // Cambiado a una imagen de otoño
import { autumnColors } from '../theme/AutumnTheme';

// Componente de hoja cayendo
const FallingLeaf = ({ size, left, delay, duration, color }) => {
    return (
        <motion.div
            className="absolute text-amber-500 z-20"
            style={{ 
                left: `${left}%`,
                color: color || autumnColors.leaf1
            }}
            initial={{ 
                top: "-10%", 
                rotate: 0,
                opacity: 0.7,
                scale: size || 1
            }}
            animate={{ 
                top: "110%",
                x: ["0%", "5%", "-5%", "2%", "-2%", "0%"],
                rotate: 360,
                opacity: [0.7, 0.8, 0.7, 0.6, 0.5, 0]
            }}
            transition={{ 
                duration: duration || (10 + Math.random() * 5), 
                repeat: Infinity,
                delay: delay || 0,
                ease: "linear",
                x: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }
            }}
        >
            <FaLeaf size={Math.random() * 10 + 15} />
        </motion.div>
    );
};

const OptimizedVideoBanner = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [currentText, setCurrentText] = useState(0);
    
    // Textos de otoño
    const texts = [
        "Explorá el paraíso otoñal en las sierras de San Luis",
        "Viví la magia del otoño en Potrero de los Funes",
        "Sentí la naturaleza entre los colores del otoño"
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

    // Crear un conjunto de hojas cayendo
    const autumnLeaves = Array.from({ length: 15 }, (_, i) => {
        const leafColors = [
            autumnColors.leaf1,
            autumnColors.leaf2,
            autumnColors.leaf3,
            autumnColors.leaf4,
            autumnColors.leaf5
        ];
        
        return (
            <FallingLeaf 
                key={i} 
                size={Math.random() * 0.5 + 0.8} 
                left={Math.random() * 100} 
                delay={i * 0.5} 
                duration={15 + Math.random() * 10}
                color={leafColors[i % leafColors.length]}
            />
        );
    });

    return (
        <section className="relative h-screen overflow-hidden flex flex-col justify-between">
            {/* Imagen de fondo */}
            <img
                src={placeholderImage}
                alt="Potrero de los Funes landscape"
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
            
            {/* Capa de superposición con tono otoñal */}
            <div 
                className="absolute inset-0" 
                style={{ 
                    background: `linear-gradient(to bottom, rgba(211, 84, 0, 0.1), rgba(230, 126, 34, 0.3), rgba(243, 156, 18, 0.4))` 
                }}
            />
            
            {/* Hojas cayendo */}
            {autumnLeaves}
            
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
                        style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}
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
                            {/* Etiqueta de temporada */}
                            <motion.span
                                className="inline-block bg-amber-600/40 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium mb-4"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <FaLeaf className="inline-block mr-2" />
                                Temporada de Otoño 2025
                            </motion.span>
                            
                            <p className="text-xl sm:text-2xl md:text-3xl text-shadow-md"
                                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
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
                        className="text-white hover:text-amber-200 transition duration-300 focus:outline-none"
                        aria-label="Scroll to content"
                    >
                        <FaChevronDown size={40} className="animate-bounce" />
                    </button>
                </motion.div>
            </div>

            {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-amber-900 bg-opacity-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-200"></div>
                </div>
            )}
        </section>
    );
};

export default OptimizedVideoBanner;