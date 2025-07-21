// src/components/FindeXXLBanner.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaMusic, FaHiking, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { autumnColors } from '../theme/AutumnTheme';

const FindeXXLBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [showBanner, setShowBanner] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Eventos destacados del finde XXL
    const findeEvents = [
        {
            id: 1,
            icon: FaHiking,
            title: "Excursiones",
            description: "Salidas guiadas a lugares naturales"
        },
        {
            id: 2,
            icon: FaMusic,
            title: "Shows en vivo",
            description: "Música en vivo en diferentes locaciones"
        },
        {
            id: 3,
            icon: FaCalendarAlt,
            title: "Agenda Cultural",
            description: "Actividades para toda la familia"
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
        const bannerClosed = sessionStorage.getItem('findeXXLBannerClosed');
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
        sessionStorage.setItem('findeXXLBannerClosed', 'true');

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
                            borderTop: `2px solid ${autumnColors.amber}`
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
                                <FaCalendarAlt className="text-amber-600 mr-2" />
                                <h3 className="font-bold text-base text-amber-800">Agenda Finde XXL</h3>
                            </div>

                            <Link
                                to="/eventos"
                                className="block w-full bg-amber-800 text-white text-center py-2 px-4 rounded-lg font-medium mt-2"
                                onClick={closeBanner}
                            >
                                Ver agenda completa
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
                        background: `linear-gradient(to right, ${autumnColors.amber}, ${autumnColors.copper}, ${autumnColors.burgundy})`,
                        borderBottom: `1px solid ${autumnColors.gold}`
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
                                <FaLeaf className="text-2xl mr-3 text-amber-200" />
                                <div>
                                    <h2 className="text-xl font-bold">¡Agenda Finde XXL - 1 al 4 de Mayo!</h2>
                                    <p className="text-amber-100">No te pierdas las actividades especiales este finde largo</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {findeEvents.map((event) => (
                                    <div key={event.id} className="flex items-start">
                                        <event.icon className="text-amber-200 mt-1 mr-2 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-sm font-semibold">{event.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/eventos"
                                className="mt-4 md:mt-0 md:ml-4 px-4 py-2 t  text-white bg-amber-800  rounded-lg font-medium "
                                onClick={closeBanner}
                            >
                                Ver agenda completa
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FindeXXLBanner;