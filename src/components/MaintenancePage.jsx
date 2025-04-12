// MaintenancePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

// Importamos el logo y las imágenes necesarias
// Reemplaza estas rutas con las correctas en tu proyecto
import logoPotreroEncanta from '../assets/logos/logo_blanco.png'; // Logo "Potrero Encanta"
import backgroundImage from '../assets/images/images.jpg'; // Imagen del lago y montañas

// Colores del sitio
const colors = {
    primary: '#0096FF',
    secondary: '#0047AB',
    accent: '#FF6B35',
};

const MaintenancePage = () => {
    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center bg-center bg-cover bg-no-repeat relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            {/* Capa de superposición para mejorar la legibilidad */}
            <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-[2px]"></div>

            {/* Contenido */}
            <div className="relative z-10 w-full max-w-4xl px-4">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="flex justify-center mb-8"
                >
                    <img
                        src={logoPotreroEncanta}
                        alt="Potrero Encanta"
                        className="h-24 md:h-32 lg:h-40"
                    />
                </motion.div>

                {/* Panel principal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Encabezado */}
                    <div className="p-6 md:p-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Sitio en Mantenimiento
                        </h1>
                        <p className="text-xl text-gray-600">
                            Estamos trabajando para mejorar tu experiencia en Potrero de los Funes
                        </p>
                    </div>

                    {/* Borde de separación con degradado */}
                    <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>

                    {/* Contenido principal - Mensaje de mantenimiento */}
                    <div className="p-6 md:p-10">
                        <div className="flex flex-col md:flex-row items-center mb-6">
                            <div className="bg-orange-100 rounded-full p-4 mb-4 md:mb-0 md:mr-6">
                                <FaCalendarAlt className="text-3xl text-orange-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Volveremos pronto</h2>
                                <p className="text-gray-600">
                                    Nuestro sitio web está temporalmente fuera de servicio debido a mejoras que estamos realizando.
                                    Disculpá las molestias. ¡Volveremos con un sitio mejorado para que puedas disfrutar de todo lo que Potrero de los Funes tiene para ofrecerte!
                                </p>
                            </div>
                        </div>



                        {/* Información de contacto */}
                        <div className="text-center text-gray-600">
                            <p>Para consultas urgentes, contactanos a:</p>
                            <p className="font-semibold text-blue-600 mt-1">turismopotrerodelosfunes@gmail.com</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Elementos decorativos flotantes */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[5]">
                <motion.div
                    className="absolute top-[15%] left-[10%] w-16 h-16 rounded-full opacity-40"
                    style={{ background: `${colors.primary}` }}
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[20%] left-[15%] w-12 h-12 rounded-full opacity-30"
                    style={{ background: `${colors.accent}` }}
                    animate={{
                        y: [0, 15, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[30%] right-[15%] w-20 h-20 rounded-full opacity-20"
                    style={{ background: `${colors.secondary}` }}
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />
            </div>
            <br></br>
        </div>
    );
};

export default MaintenancePage;