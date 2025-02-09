import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SeccionCard = ({ seccion, index }) => {
 const [isHovered, setIsHovered] = useState(false);
 const controls = useAnimation();

 const onHoverStart = () => {
   setIsHovered(true);
   controls.start("hover");
 };

 const onHoverEnd = () => {
   setIsHovered(false);
   controls.start("initial");
 };

 const cardVariants = {
   initial: { y: 0 },
   hover: { 
     y: -10,
     transition: {
       duration: 0.4,
       ease: "easeOut"
     }
   }
 };

 const contentVariants = {
   initial: { y: 0 },
   hover: {
     y: -20,
     transition: {
       duration: 0.4,
       ease: "easeOut"
     }
   }
 };

 const buttonVariants = {
   initial: { opacity: 0, y: 20 },
   hover: {
     opacity: 1,
     y: 0,
     transition: {
       duration: 0.3,
       delay: 0.1
     }
   }
 };

 const glowVariants = {
   initial: { opacity: 0 },
   hover: {
     opacity: [0, 0.5, 0],
     transition: {
       duration: 2,
       repeat: Infinity,
       ease: "easeInOut"
     }
   }
 };

 return (
   <motion.div
     initial="hidden"
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     transition={{ duration: 0.8, delay: index * 0.2 }}
     className="perspective-1000"
   >
     <motion.div
       variants={cardVariants}
       initial="initial"
       whileHover="hover"
       onHoverStart={onHoverStart}
       onHoverEnd={onHoverEnd}
       className="relative h-[28rem] group cursor-pointer"
     >
       <Link
         to={seccion.disabled ? '#' : seccion.link}
         className="block h-full"
         onClick={e => seccion.disabled && e.preventDefault()}
       >
         <div className="relative h-full overflow-hidden rounded-3xl">
           {/* Card Background */}
           <motion.div
             className="absolute inset-0 bg-cover bg-center transform"
             style={{
               backgroundImage: `url(${seccion.imagen})`
             }}
             animate={{
               scale: isHovered ? 1.15 : 1,
               filter: isHovered ? 'brightness(1)' : 'brightness(0.7)'
             }}
             transition={{ duration: 0.4 }}
           />

           {/* Color Overlay */}
           <motion.div
             className="absolute inset-0"
             animate={{
               backgroundColor: isHovered ? seccion.color : 'transparent',
               opacity: isHovered ? 0.2 : 0
             }}
             transition={{ duration: 0.4 }}
           />

           {/* Glow Effect */}
           <motion.div
             variants={glowVariants}
             className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent"
           />

           {/* Glass Container */}
           <div className="absolute inset-0">
             <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
           </div>

           {/* Content Container */}
           <motion.div
             variants={contentVariants}
             className="relative h-full flex flex-col justify-end p-8 text-white"
           >
             {/* Icon */}
             <motion.div
               animate={{
                 y: isHovered ? [-4, 4, -4] : 0
               }}
               transition={{
                 duration: 2,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
               className="mb-6"
             >
               <seccion.icono className="text-6xl mb-4 drop-shadow-glow" />
             </motion.div>

             {/* Title */}
             <h3 className="text-3xl font-bold mb-4 tracking-tight">
               {seccion.disabled ? 'Próximamente' : seccion.titulo}
             </h3>

             {/* Action Button */}
             {!seccion.disabled && (
               <motion.div
                 variants={buttonVariants}
                 className="transform"
               >
                 <div 
                   className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                   style={{
                     backgroundColor: isHovered ? `${seccion.color}20` : 'rgba(255,255,255,0.1)'
                   }}
                 >
                   <span className="text-sm font-medium">Descubrir</span>
                   <svg 
                     className="w-4 h-4" 
                     fill="none" 
                     stroke="currentColor" 
                     viewBox="0 0 24 24"
                   >
                     <path 
                       strokeLinecap="round" 
                       strokeLinejoin="round" 
                       strokeWidth={2} 
                       d="M17 8l4 4m0 0l-4 4m4-4H3" 
                     />
                   </svg>
                 </div>
               </motion.div>
             )}
           </motion.div>
         </div>
       </Link>
     </motion.div>
   </motion.div>
 );
};

export default SeccionCard;