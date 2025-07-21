// src/components/FallingSnow.jsx
import { motion } from 'framer-motion';
import { FaSnowflake } from 'react-icons/fa';
import { winterColors } from '../theme/WinterTheme';

// Diferentes formas de copos de nieve
const SnowflakeShape = ({ type, size }) => {
    const shapes = {
        classic: '❄',
        star: '❅',
        crystal: '❆',
        dot: '•',
        asterisk: '*'
    };

    if (type === 'icon') {
        return <FaSnowflake size={size} />;
    }

    return <span style={{ fontSize: `${size}px` }}>{shapes[type] || shapes.classic}</span>;
};

const FallingSnowflake = ({ delay, index, containerHeight }) => {
    // Posición horizontal aleatoria
    const startX = Math.random() * 100;
    
    // Seleccionar tipo de copo aleatorio
    const types = ['classic', 'star', 'crystal', 'dot', 'asterisk', 'icon'];
    const snowflakeType = types[index % types.length];
    
    // Tamaño aleatorio
    const size = Math.floor(Math.random() * 8) + 8;
    
    // Velocidad aleatoria
    const duration = 8 + Math.random() * 12;
    
    // Rotación inicial aleatoria
    const initialRotate = Math.random() * 360;
    
    // Color aleatorio de la paleta invernal
    const colors = [
        winterColors.snow1,
        winterColors.snow2,
        winterColors.ice1,
        winterColors.ice2,
        winterColors.crystal
    ];
    const color = colors[index % colors.length];

    return (
        <motion.div 
            className="absolute z-20 pointer-events-none"
            initial={{ 
                x: `${startX}%`, 
                y: -20,
                rotate: initialRotate,
                opacity: 0.3
            }}
            animate={{ 
                y: containerHeight ? containerHeight + 50 : window.innerHeight + 50,
                x: [
                    `${startX}%`, 
                    `${startX + 3}%`, 
                    `${startX - 3}%`, 
                    `${startX + 1}%`, 
                    `${startX - 1.5}%`, 
                    `${startX}%`
                ],
                rotate: initialRotate + 180,
                opacity: [0.3, 0.8, 0.9, 0.7, 0.5, 0.2, 0]
            }}
            transition={{ 
                duration: duration, 
                repeat: Infinity,
                delay: delay,
                ease: "linear",
                x: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }
            }}
            style={{ color }}
        >
            <SnowflakeShape type={snowflakeType} size={size} />
        </motion.div>
    );
};

// Componente principal
const FallingSnow = ({ 
    quantity = 20, 
    containerHeight, 
    containerClassName = "",
    snowForeground = false,
    intensity = 'normal' // 'light', 'normal', 'heavy'
}) => {
    // Ajustar cantidad según intensidad
    let snowCount = quantity;
    if (intensity === 'light') snowCount = Math.max(10, quantity * 0.5);
    if (intensity === 'heavy') snowCount = quantity * 1.5;

    // Crear un array de copos con retrasos diferentes
    const snowflakes = Array.from({ length: snowCount }, (_, i) => (
        <FallingSnowflake 
            key={i} 
            index={i} 
            delay={i * 0.3} 
            containerHeight={containerHeight} 
        />
    ));

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${containerClassName}`} 
             style={{ zIndex: snowForeground ? 30 : 10 }}>
            {snowflakes}
        </div>
    );
};

export default FallingSnow;