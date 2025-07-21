// src/components/WinterBanner.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSnowflake, FaMountain, FaThermometerHalf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { winterColors } from '../theme/WinterTheme';

const WinterBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [showBanner, setShowBanner] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Eventos destacados del invierno
    const winterEvents = [
        {
            id: 1,
            icon: FaMountain,
            title: "Trekking matinal",
            description: "Caminatas con escarcha temprana"
        },
        {
            id: 2,
            icon: FaSnowflake,
            title: "Noches junto al fuego",
            description: "Fogones y asados en las cabañas"
        },
        {
            id: 3,
            icon: FaThermometerHalf,
            title: "Actividades de invierno",
            description: "Experiencias únicas en el frío serrano"
        }
    ];

    useEffect(() => {
        // Detectar si es dispositivo móvil
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Verificar si ya se cerró el banner anteriormente
        const bannerClosed = sessionStorage.getItem('winterBannerClosed');
        if (!bannerClosed) {
            // Mostrar banner después de 1.5 segundos para evitar desplazamientos rápidos
            const timer = setTimeout(() => {
                setShowBanner(true);
            }, 1500);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', checkMobile);
            };
        }
    }, []);

    const closeBanner = () => {
        setIsVisible(false);
        // Guardar preferencia del usuario
        sessionStorage.setItem('winterBannerClosed', 'true');

        // Después de la animación de salida, desmontar el componente
        setTimeout(() => {
            setShowBanner(false);
        }, 500);
    };

    if (!showBanner) return null;

    // Si es dispositivo móvil, mostramos un banner simplificado
    if (isMobile) {
        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg overflow-hidden"
                        style={{
                            borderTop: `2px solid ${winterColors.ice}`
                        }}
                    >
                        <div className="p-3 relative">
                            <button
                                onClick={closeBanner}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                aria-label="Cerrar banner"
                            >
                                <FaTimes />
                            </button>

                            <div className="flex items-center justify-center mb-2">
                                <FaSnowflake className="text-blue-600 mr-2" />
                                <h3 className="font-bold text-base text-blue-800">Invierno en Potrero</h3>
                            </div>

                            <Link
                                to="/actividades"
                                className="block w-full bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium mt-2"
                                onClick={closeBanner}
                            >
                                Descubrir actividades de invierno
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    // Versión para escritorio
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden"
                    style={{
                        background: `linear-gradient(to right, ${winterColors.glacier}, ${winterColors.primary}, ${winterColors.ice})`,
                        borderBottom: `1px solid ${winterColors.frost}`
                    }}
                >
                    <div className="container mx-auto py-6 px-4 relative">
                        <button
                            onClick={closeBanner}
                            className="absolute top-2 right-4 text-white/80 hover:text-white"
                            aria-label="Cerrar banner"
                        >
                            <FaTimes />
                        </button>

                        <div className="flex flex-col md:flex-row items-center justify-between text-white">
                            <div className="mb-4 md:mb-0 flex items-center">
                                <FaSnowflake className="text-2xl mr-3 text-blue-200" />
                                <div>
                                    <h2 className="text-xl font-bold">¡Invierno en Potrero de los Funes!</h2>
                                    <p className="text-blue-100">Viví la magia del frío serrano con paisajes únicos</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {winterEvents.map((event) => (
                                    <div key={event.id} className="flex items-start">
                                        <event.icon className="text-blue-200 mt-1 mr-2 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-sm font-semibold">{event.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/actividades"
                                className="mt-4 md:mt-0 md:ml-4 px-4 py-2 text-white bg-blue-800 rounded-lg font-medium hover:bg-blue-900 transition-colors"
                                onClick={closeBanner}
                            >
                                Ver actividades de invierno
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WinterBanner;