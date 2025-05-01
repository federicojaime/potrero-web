// src/components/EasterModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCross, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EasterModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Mostrar el modal después de 1 segundo
    const timer = setTimeout(() => {
      // Verificar si ya se cerró el modal anteriormente en esta sesión
      const modalClosed = sessionStorage.getItem('easterModalClosed');
      if (!modalClosed) {
        setIsVisible(true);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    // Guardar en sessionStorage para no mostrar de nuevo en esta sesión
    sessionStorage.setItem('easterModalClosed', 'false');
  };

  // Si es dispositivo móvil, mostramos un banner en lugar de un modal
  if (isMobile) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-amber-300 overflow-hidden"
          >
            <div className="p-4 relative">
              <button 
                onClick={closeModal}
                className="absolute top-2 right-2 bg-amber-50 p-2 rounded-full"
                aria-label="Cerrar"
              >
                <FaTimes size={16} className="text-amber-800" />
              </button>
              
              <div className="flex items-center justify-center mb-2">
                <FaCross className="text-amber-600 mr-2" />
                <h3 className="font-bold text-lg text-amber-800">Semana Santa 2025</h3>
              </div>
              
              <Link 
                to="/eventos/semana-santa" 
                className="block w-full bg-amber-500 text-white text-center py-2 px-4 rounded-lg font-medium mt-2"
                onClick={closeModal}
              >
                Ver agenda completa
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Versión para escritorio (modal completo)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 overflow-auto"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-amber-50 rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del modal */}
            <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 p-4 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-amber-200 transition-colors bg-black/20 p-2 rounded-full"
                aria-label="Cerrar modal"
              >
                <FaTimes size={20} />
              </button>
              <div className="flex items-center justify-center">
                <FaCross className="text-3xl mr-3" />
                <h2 className="text-3xl font-bold text-center">Semana Santa en Potrero de los Funes</h2>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="p-6 md:flex">
              {/* Imagen */}
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
                <img 
                  src="/img/semana-santa-potrero.jpg"
                  alt="Semana Santa en Potrero de los Funes" 
                  className="w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Semana+Santa+2025';
                  }}
                />
              </div>
              
              {/* Agenda resumida */}
              <div className="md:w-1/2 md:pl-4">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaCalendarAlt className="mr-2 text-amber-600" />
                  Agenda de Actividades Destacadas
                </h3>
                
                <div className="mb-4">
                  <h4 className="font-medium text-amber-800">Agenda Litúrgica</h4>
                  <ul className="pl-6 space-y-1 text-gray-700">
                    <li>• Jueves 17/4 - 20HS: Misa de lavado de pies</li>
                    <li>• Viernes 18/4 - 15HS: Celebración de la Pasión</li>
                    <li>• Domingo 20/4 - 9:30HS: Domingo de Resurrección</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-amber-800">Agenda Turística y Cultural</h4>
                  <ul className="pl-6 space-y-1 text-gray-700">
                    <li>• Jueves - 21HS: Yamanti dúo (jazz del monte)</li>
                    <li>• Viernes - 18:30HS: Caminata nocturna con antorchas</li>
                    <li>• Sábado - 17HS: Subasta de libros</li>
                    <li>• Domingo - 9:30HS: Trekking "salto el goteadero"</li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/eventos/semana-santa" 
                    className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
                    onClick={closeModal}
                  >
                    Ver agenda completa
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Pie del modal */}
            <div className="bg-amber-100 p-4 text-center text-gray-700">
              <p className="flex items-center justify-center">
                <FaCross className="text-amber-600 mr-2" />
                Viví la magia de Semana Santa en un entorno natural único
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterModal;