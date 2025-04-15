// src/components/AutumnActivitiesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaCamera, FaHiking, FaMugHot, FaFire } from 'react-icons/fa';
import { autumnColors, autumnMessages } from '../theme/AutumnTheme';

const AutumnActivityCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
      style={{ 
        borderLeft: `4px solid ${autumnColors.copper}`,
        background: `linear-gradient(to right, ${autumnColors.amber}10, white)` 
      }}
    >
      <div className="p-6">
        <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
          <Icon className="text-3xl" style={{ color: autumnColors.copper }} />
        </div>
        <h3 className="text-xl font-bold mb-2 text-center" style={{ color: autumnColors.burgundy }}>
          {title}
        </h3>
        <p className="text-gray-700 text-center">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const AutumnActivitiesSection = () => {
  // Actividades de temporada
  const activities = [
    {
      id: 1,
      icon: FaHiking,
      title: autumnMessages.activities[0].title,
      description: autumnMessages.activities[0].description,
    },
    {
      id: 2,
      icon: FaCamera,
      title: autumnMessages.activities[1].title,
      description: autumnMessages.activities[1].description,
    },
    {
      id: 3,
      icon: FaMugHot,
      title: autumnMessages.activities[2].title,
      description: autumnMessages.activities[2].description,
    },
    {
      id: 4,
      icon: FaFire,
      title: autumnMessages.activities[3].title,
      description: autumnMessages.activities[3].description,
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden" style={{ 
      background: `linear-gradient(to bottom, ${autumnColors.lightBg}, white)` 
    }}>
      {/* Decoración de hojas */}
      <div className="absolute top-0 left-0 w-24 h-24 opacity-10" style={{ 
        background: `radial-gradient(circle, ${autumnColors.copper}, transparent)` 
      }}></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10" style={{ 
        background: `radial-gradient(circle, ${autumnColors.amber}, transparent)` 
      }}></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-amber-100 rounded-full px-4 py-1 mb-4">
            <FaLeaf className="inline-block mr-2 text-amber-600" />
            <span className="text-amber-800 font-medium">Otoño 2025</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: autumnColors.secondary }}>
            Actividades de Temporada
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Disfrutá de experiencias exclusivas durante la temporada de otoño en Potrero de los Funes
            y viví momentos únicos entre los colores dorados y rojizos de nuestro paisaje serrano.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <AutumnActivityCard
              key={activity.id}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
      
      {/* Decoración de hojas flotando */}
      <motion.div
        className="absolute bottom-10 left-10 text-amber-600 opacity-20"
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
        <FaLeaf size={40} />
      </motion.div>
      
      <motion.div
        className="absolute top-20 right-20 text-amber-800 opacity-20"
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
        <FaLeaf size={30} />
      </motion.div>
    </section>
  );
};

export default AutumnActivitiesSection;