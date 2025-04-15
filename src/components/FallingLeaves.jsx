// src/components/FallingLeaves.jsx
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import { autumnColors } from '../theme/AutumnTheme';

// Diferentes tipos de hojas para más variedad visual
const leafColors = [
  autumnColors.leaf1,
  autumnColors.leaf2, 
  autumnColors.leaf3,
  autumnColors.leaf4,
  autumnColors.leaf5
];

const FallingLeaf = ({ delay, index, containerHeight }) => {
  // Posición horizontal aleatoria
  const startX = Math.random() * 100;
  // Color aleatorio de nuestras opciones
  const color = leafColors[index % leafColors.length];
  // Tamaño aleatorio
  const size = Math.floor(Math.random() * 10) + 15;
  // Rotación inicial aleatoria
  const initialRotate = Math.random() * 360;
  
  return (
    <motion.div 
      className="absolute z-20"
      initial={{ 
        x: `${startX}%`, 
        y: -20,
        rotate: initialRotate,
        opacity: 0.7
      }}
      animate={{ 
        y: containerHeight ? containerHeight + 50 : window.innerHeight + 50,
        x: [
          `${startX}%`, 
          `${startX + 5}%`, 
          `${startX - 5}%`, 
          `${startX + 2}%`, 
          `${startX - 3}%`, 
          `${startX}%`
        ],
        rotate: initialRotate + 360,
        opacity: [0.7, 0.8, 0.7, 0.6, 0.5, 0]
      }}
      transition={{ 
        duration: 15 + Math.random() * 10, 
        repeat: Infinity,
        delay: delay,
        ease: "linear",
        x: {
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }
      }}
      style={{ color }}
    >
      <FaLeaf size={size} />
    </motion.div>
  );
};

// Componente principal
const FallingLeaves = ({ 
  quantity = 10, 
  containerHeight, 
  containerClassName = "",
  leavesForeground = false 
}) => {
  // Crear un array de hojas con retrasos diferentes
  const leaves = Array.from({ length: quantity }, (_, i) => (
    <FallingLeaf 
      key={i} 
      index={i} 
      delay={i * 2} 
      containerHeight={containerHeight} 
    />
  ));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${containerClassName}`} style={{ zIndex: leavesForeground ? 30 : 10 }}>
      {leaves}
    </div>
  );
};

export default FallingLeaves;