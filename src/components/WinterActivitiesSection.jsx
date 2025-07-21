// src/components/WinterActivitiesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaSnowflake, FaCamera, FaHiking, FaMugHot, FaFire, FaMountain, FaThermometerHalf } from 'react-icons/fa';
import { winterColors, winterMessages } from '../theme/WinterTheme';

const WinterActivityCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 winter-card"
      style={{ 
        borderLeft: `4px solid ${winterColors.primary}`,
        background: `linear-gradient(to right, ${winterColors.ice}10, white)` 
      }}
    >
      <div className="p-6">
        <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
          <Icon className="text-3xl" style={{ color: winterColors.primary }} />
        </div>
        <h3 className="text-xl font-bold mb-2 text-center" style={{ color: winterColors.secondary }}>
          {title}
        </h3>
        <p className="text-gray-700 text-center">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const WinterActivitiesSection = () => {
  // Actividades de temporada de invierno
  const activities = [
    {
      id: 1,
      icon: FaHiking,
      title: winterMessages.activities[0].title,
      description: winterMessages.activities[0].description,
    },
    {
      id: 2,
      icon: FaCamera,
      title: winterMessages.activities[1].title,
      description: winterMessages.activities[1].description,
    },
    {
      id: 3,
      icon: FaFire,
      title: winterMessages.activities[2].title,
      description: winterMessages.activities[2].description,
    },
    {
      id: 4,
      icon: FaMountain,
      title: winterMessages.activities[3].title,
      description: winterMessages.activities[3].description,
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden" style={{ 
      background: `linear-gradient(to bottom, ${winterColors.lightBg}, white)` 
    }}>
      {/* Decoración invernal */}
      <div className="absolute top-0 left-0 w-24 h-24 opacity-10" style={{ 
        background: `radial-gradient(circle, ${winterColors.ice2}, transparent)` 
      }}></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10" style={{ 
        background: `radial-gradient(circle, ${winterColors.primary}, transparent)` 
      }}></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-blue-100 rounded-full px-4 py-1 mb-4">
            <FaSnowflake className="inline-block mr-2 text-blue-600" />
            <span className="text-blue-800 font-medium">Invierno 2025</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: winterColors.secondary }}>
            Actividades de Temporada Invernal
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Descubrí experiencias únicas durante el invierno en Potrero de los Funes.
            Viví la serenidad y belleza del frío serrano en un entorno natural incomparable.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <WinterActivityCard
              key={activity.id}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
      
      {/* Decoración de copos de nieve flotando */}
      <motion.div
        className="absolute bottom-10 left-10 text-blue-600 opacity-20"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaSnowflake size={40} />
      </motion.div>
      
      <motion.div
        className="absolute top-20 right-20 text-blue-800 opacity-20"
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -5, 0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <FaSnowflake size={30} />
      </motion.div>
    </section>
  );
};

export default WinterActivitiesSection;