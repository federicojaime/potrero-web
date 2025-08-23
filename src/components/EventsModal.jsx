// src/components/EventsModal.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaMusic, FaTheaterMasks, FaUsers, FaStar, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventsModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Eventos destacados para el modal
    const eventosDestacados = [
        {
            id: 1,
            titulo: "DÍA DEL NIÑO",
            subtitulo: "Maru Animaciones",
            fecha: "HOY - 15 AGO",
            horario: "15:00 a 18:00hs",
            ubicacion: "Polideportivo Municipal",
            icon: FaUsers,
            color: "#6B7280",
            gradiente: "from-slate-500 to-slate-600"
        },
        {
            id: 2,
            titulo: "LUCHO SOSA",
            subtitulo: "Show en Vivo",
            fecha: "HOY - 15 AGO",
            horario: "22:00hs",
            ubicacion: "Calle 7",
            icon: FaMusic,
            color: "#2563EB",
            gradiente: "from-blue-500 to-blue-600"
        },
        {
            id: 3,
            titulo: "SIN SALDO",
            subtitulo: "Show en Vivo",
            fecha: "MAÑANA - 16 AGO",
            horario: "22:00hs",
            ubicacion: "Calle 7",
            icon: FaMusic,
            color: "#059669",
            gradiente: "from-emerald-500 to-emerald-600"
        }
    ];

    useEffect(() => {
        // Detectar si es móvil
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Verificar si ya se cerró el modal anteriormente
        const modalClosed = sessionStorage.getItem('eventsModalClosed');
        if (!modalClosed) {
            // Mostrar modal después de 1.5 segundos
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', checkMobile);
            };
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const closeModal = () => {
        setIsVisible(false);
        // Guardar preferencia del usuario
        sessionStorage.setItem('eventsModalClosed', 'true');
    };

    if (!isVisible) return null;

    // Versión móvil - Banner inferior
    if (isMobile) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-2xl"
                >
                    <div className="p-4 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                        >
                            <FaTimes size={16} className="text-white" />
                        </button>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="bg-white/20 p-2 rounded-full mr-3">
                                    <FaCalendarAlt className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">¡Eventos de HOY!</h3>
                                    <p className="text-white/90 text-sm">No te los pierdas</p>
                                </div>
                            </div>

                            <Link
                                to="/eventos"
                                onClick={closeModal}
                                className="bg-white text-slate-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                                Ver agenda <FaArrowRight size={12} />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    // Versión desktop - Modal completo
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={closeModal}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl transform perspective-1000"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header con gradiente */}
                    <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 p-6 text-white overflow-hidden">
                        {/* Decoración de fondo */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors group"
                        >
                            <FaTimes size={20} className="text-white group-hover:rotate-90 transition-transform duration-200" />
                        </button>

                        <div className="relative z-10">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center mb-4"
                            >
                                <div className=" p-3 rounded-full mr-4">
                                    <FaCalendarAlt size={24} />
                                </div>
                                <div>
                                    <h2 className="text-3xl text-white/90 font-bold">¡Eventos Imperdibles!</h2>
                                    <p className="text-white/90">Este fin de semana en Potrero de los Funes</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4"
                            >
                                <div className="flex items-center text-blue-300 mb-2">
                                    <FaStar className="mr-2" />
                                    <span className="font-semibold">ESPECIAL DÍA DEL NIÑO</span>
                                </div>
                                <p className="text-white/90">
                                    Celebrá con nosotros este día especial con actividades para toda la familia
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {eventosDestacados.map((evento, index) => (
                                <motion.div
                                    key={evento.id}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className={`bg-gradient-to-br ${evento.gradiente} text-white rounded-xl p-4 hover:scale-105 transition-transform duration-200`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <evento.icon size={24} />
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                            {evento.fecha}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-white text-lg mb-1">{evento.titulo}</h4>
                                    <p className="text-sm text-white/90 mb-2">{evento.subtitulo}</p>
                                    <div className="text-xs space-y-1">
                                        <div>🕐 {evento.horario}</div>
                                        <div>📍 {evento.ubicacion}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Call to action */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-center"
                        >
                            <p className="text-gray-600 mb-4">
                                Descubrí toda la programación completa con horarios, ubicaciones y más detalles
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    to="/eventos"
                                    onClick={closeModal}
                                    className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-8 py-3 rounded-full font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <FaCalendarAlt />
                                    Ver agenda completa
                                    <FaArrowRight />
                                </Link>

                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 px-6 py-3 rounded-full border border-gray-200 hover:border-gray-300 transition-colors"
                                >
                                    Ahora no
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer con nota */}
                    <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
                        <div className="flex items-center justify-center">
                            <FaCalendarAlt className="mr-2 text-slate-500" />
                            Los eventos están sujetos a cambios. Consultá la agenda actualizada.
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EventsModal;

// INSTRUCCIONES PARA IMPLEMENTAR EL MODAL:

// 1. Crear el archivo src/components/EventsModal.jsx con el código de arriba

// 2. En src/App.jsx, añadir el import:
// import EventsModal from './components/EventsModal';

// 3. En src/App.jsx, dentro del componente MaintenanceWrapper, añadir el modal ANTES del <Navbar />:
//
// const MaintenanceWrapper = () => {
//   // ... código existente ...
//
//   return (
//     <>
//       <EventsModal />  {/* ← AÑADIR ESTA LÍNEA */}
//       <Navbar />
//       <main className="flex-grow">
//         {/* ... resto del código ... */}
//       </main>
//       <Footer />
//     </>
//   );
// };

// ¡Eso es todo! El modal aparecerá automáticamente después de 1.5 segundos y:
// - En móvil: se muestra como banner inferior elegante
// - En desktop: modal completo con efectos 3D
// - Se guarda en sessionStorage para no molestar al usuario
// - Tiene animaciones suaves y diseño profesional