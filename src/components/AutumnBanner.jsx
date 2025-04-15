// src/components/AutumnBanner.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaTimes, FaMapMarkedAlt, FaMugHot, FaCamera, FaFire } from 'react-icons/fa';
import { autumnColors, autumnMessages } from '../theme/AutumnTheme';

const AutumnBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  
  // Actividades de temporada de otoño
  const autumnActivities = [
    { 
      id: 1, 
      icon: FaMapMarkedAlt, 
      title: autumnMessages.activities[0].title, 
      description: autumnMessages.activities[0].description 
    },
    { 
      id: 2, 
      icon: FaCamera, 
      title: autumnMessages.activities[1].title, 
      description: autumnMessages.activities[1].description 
    },
    { 
      id: 3, 
      icon: FaMugHot, 
      title: autumnMessages.activities[2].title, 
      description: autumnMessages.activities[2].description 
    },
    { 
      id: 4, 
      icon: FaFire, 
      title: autumnMessages.activities[3].title, 
      description: autumnMessages.activities[3].description 
    }
  ];

  useEffect(() => {
    // Verificar si ya se cerró el banner anteriormente
    const bannerClosed = localStorage.getItem('autumnBannerClosed');
    if (!bannerClosed) {
      // Mostrar banner después de 1.5 segundos para evitar desplazamientos rápidos
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    // Guardar preferencia del usuario
    localStorage.setItem('autumnBannerClosed', 'true');
    
    // Después de la animación de salida, desmontar el componente
    setTimeout(() => {
      setShowBanner(false);
    }, 500);
  };

  if (!showBanner) return null;

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
                  <h2 className="text-xl font-bold">{autumnMessages.welcomeMessage}</h2>
                  <p className="text-amber-100">{autumnMessages.subtitle}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {autumnActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <activity.icon className="text-amber-200 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold">{activity.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AutumnBanner;