// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMountain, FaSwimmingPool, FaRoute, FaBed, FaUtensils, FaCalendarAlt, FaMapMarkedAlt, FaCamera, FaSun, FaLeaf } from 'react-icons/fa';
import OptimizedVideoBanner from './OptimizedVideoBanner';
import AutumnActivitiesSection from '../components/AutumnActivitiesSection';
import SeccionCard from './SeccionCard';
import { autumnColors } from '../theme/AutumnTheme';

// Importamos las imágenes para cada sección
import imagenNaturaleza from '/src/assets/imagenes/naturaleza.jpg';
import imagenActividades from '/src/assets/imagenes/actividades.jpg';
import imagenCircuitos from '/src/assets/imagenes/circuitos.jpg';
import imagenAlojamiento from '/src/assets/imagenes/alojamiento.jpg';
import imagenGastronomia from '/src/assets/imagenes/gastronomia.jpg';
import imagenEventos from '/src/assets/imagenes/eventos.jpg';
import backgroundImage from '/src/assets/imagenes/otoño.jpg'; // Imagen de fondo con tema de otoño

// Definimos el array de secciones con todas las propiedades y colores otoñales
const secciones = [
    {
        titulo: 'Potrero Activa',
        icono: FaMountain,
        imagen: imagenActividades,
        color: autumnColors.forest, // Verde más otoñal
        textColor: 'text-white',
        link: '/naturaleza',
    },
    {
        titulo: 'Actividades',
        icono: FaSwimmingPool,
        imagen: imagenNaturaleza,
        color: autumnColors.primary, // Naranja otoñal
        textColor: 'text-white',
        link: '/actividades',
    },
    {
        titulo: 'Circuitos',
        icono: FaRoute,
        imagen: imagenCircuitos,
        color: autumnColors.gold, // Dorado otoñal
        textColor: 'text-black',
        link: '/circuitos',
    },
    {
        titulo: 'Alojamiento',
        icono: FaBed,
        imagen: imagenAlojamiento,
        color: autumnColors.burgundy, // Borgoña otoñal
        textColor: 'text-white',
        link: '/alojamiento',
    },
    {
        titulo: 'Gastronomía',
        icono: FaUtensils,
        imagen: imagenGastronomia,
        color: autumnColors.copper, // Cobre otoñal
        textColor: 'text-white',
        link: '/gastronomia',
    },
    {
        titulo: 'Eventos',
        icono: FaCalendarAlt,
        imagen: imagenEventos,
        color: autumnColors.amber, // Ámbar otoñal
        textColor: 'text-black',
        link: '/eventos',
        disabled: true, // Deshabilitar la sección
    },
];

const InfoCard = ({ icon: Icon, title, content }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 hover-lift">
        <div className="flex items-center mb-4">
            <div 
                className="flex items-center justify-center w-12 h-12 rounded-full mr-4"
                style={{ background: `${autumnColors.amber}20` }}
            >
                <Icon 
                    className="text-2xl" 
                    style={{ color: autumnColors.copper }}
                />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div>{content}</div>
    </div>
);

// Efecto de hoja flotante para decoración visual
const FloatingLeaf = ({ size, color, top, left, right, delay = 0 }) => (
    <motion.div
        className="absolute z-10"
        style={{ 
            top, 
            left, 
            right,
            color: color || autumnColors.copper
        }}
        animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0, -10, 0],
        }}
        transition={{
            repeat: Infinity,
            duration: 5 + Math.random() * 2,
            delay
        }}
    >
        <FaLeaf size={size || 20} />
    </motion.div>
);

function Home() {
    return (
        <div className="bg-autumn-theme">
            <OptimizedVideoBanner />


            <section className="py-20 bg-gray-50 relative overflow-hidden">
                {/* Decoración de hojas flotantes */}
                <FloatingLeaf size={24} color={autumnColors.leaf1} top="10%" left="5%" delay={1} />
                <FloatingLeaf size={18} color={autumnColors.leaf2} top="30%" right="10%" delay={2} />
                <FloatingLeaf size={22} color={autumnColors.leaf3} top="70%" left="15%" delay={3} />
                <FloatingLeaf size={26} color={autumnColors.leaf4} top="50%" right="15%" delay={1.5} />
                
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 section-title" style={{ color: autumnColors.secondary }}>
                        Visitá Potrero de los Funes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {secciones.map((seccion, index) => (
                            <SeccionCard key={index} seccion={seccion} index={index} />
                        ))}
                    </div>
                </div>
            </section>
            
            
            {/* Sección de actividades otoñales */}
            <AutumnActivitiesSection />
            <motion.section
                className="py-20 text-white bg-fixed bg-center bg-cover relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    backgroundImage: `
                      linear-gradient(
                        to right,
                        ${autumnColors.burgundy}70,
                        ${autumnColors.copper}70
                      ),
                      url(${backgroundImage})
                    `,
                }}
            >
                {/* Hojas decorativas en esta sección */}
                <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
                    <div className="w-full h-8" style={{ 
                        background: `linear-gradient(to right, ${autumnColors.leaf1}, ${autumnColors.leaf3}, ${autumnColors.leaf5}, ${autumnColors.leaf2})`,
                        opacity: 0.3
                    }}></div>
                </div>
                
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-center"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Naturaleza, adrenalina y relax en un solo lugar
                    </motion.h2>
                    <motion.p
                        className="text-xl text-center mt-4"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Descubrí todo lo que Potrero de los Funes tiene para ofrecerte en esta temporada de otoño
                    </motion.p>
                </div>
                
                {/* Más decoración de hojas */}
                <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
                    <div className="w-full h-8" style={{ 
                        background: `linear-gradient(to right, ${autumnColors.leaf2}, ${autumnColors.leaf4}, ${autumnColors.leaf1})`,
                        opacity: 0.3
                    }}></div>
                </div>
            </motion.section>

            <div className="bg-gray-100 py-20 relative">
                {/* Hojas decorativas */}
                <FloatingLeaf size={20} color={autumnColors.leaf3} top="10%" right="20%" delay={2.5} />
                <FloatingLeaf size={16} color={autumnColors.leaf5} top="60%" left="10%" delay={3.5} />
                
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 section-title" style={{ color: autumnColors.secondary }}>
                        Información Turística
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Tarjeta 1: Cómo llegar */}
                        <InfoCard
                            icon={FaMapMarkedAlt}
                            title="Cómo llegar"
                            content={
                                <>
                                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.8252917127594!2d-66.24163838484965!3d-33.24331398083207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d41573b7a25fb9%3A0x20846ae174b18de5!2sPotrero%20de%20los%20Funes%2C%20San%20Luis!5e0!3m2!1ses!2sar!4v1727409872087!5m2!1ses!2sar"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                    <p className="text-gray-600">
                                        A solo 20 km de la ciudad de San Luis. Acceso por Autopista de las Serranías Puntanas.
                                    </p>
                                </>
                            }
                        />

                        {/* Tarjeta 2: Clima típico de otoño */}
                        <InfoCard
                            icon={FaSun}
                            title="Clima otoñal"
                            content={
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaMountain className="text-amber-600 mr-2" />
                                            Temperatura
                                        </span>
                                        <span>10°C - 18°C</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaSwimmingPool className="text-blue-500 mr-2" />
                                            Humedad
                                        </span>
                                        <span>40% - 60%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaRoute className="text-gray-500 mr-2" />
                                            Viento
                                        </span>
                                        <span>15 - 25 km/h</span>
                                    </div>
                                    <p className="text-gray-600 mt-4">
                                        Clima templado con noches frescas. Ideal para actividades al aire libre y contemplar los colores otoñales.
                                    </p>
                                </div>
                            }
                        />

                        {/* Tarjeta 3: Actividades populares de otoño */}
                        <InfoCard
                            icon={FaCamera}
                            title="Actividades de otoño"
                            content={
                                <ul className="space-y-2 autumn-list">
                                    <li className="flex items-center text-gray-700">
                                        <FaLeaf className="text-amber-600 mr-2" />
                                        Paseos para fotografiar el follaje otoñal
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <FaMountain className="text-amber-700 mr-2" />
                                        Trekking entre hojas doradas y rojas
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <FaRoute className="text-amber-800 mr-2" />
                                        Circuito panorámico de las sierras
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <FaUtensils className="text-amber-500 mr-2" />
                                        Gastronomía de temporada
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                </div>
            </div>

            <section className="py-20 text-white relative overflow-hidden" style={{ 
                background: `linear-gradient(135deg, ${autumnColors.amber}, ${autumnColors.burgundy}, ${autumnColors.copper})` 
            }}>
                {/* Decoración de hojas */}
                <FloatingLeaf size={30} color="rgba(255,255,255,0.1)" top="20%" left="5%" delay={1} />
                <FloatingLeaf size={24} color="rgba(255,255,255,0.1)" top="60%" right="8%" delay={2} />
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-4">¿Listo para tu aventura otoñal?</h2>
                    <p className="text-xl mb-8">Planificá tu visita a Potrero de los Funes y viví una experiencia inolvidable rodeado de los colores del otoño.</p>
                    <Link
                        to="/contacto"
                        className="bg-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300 shadow-md inline-block btn-autumn"
                        style={{ color: autumnColors.burgundy }}
                    >
                        Contactanos
                    </Link>
                </div>
                
                {/* Decoración de hojas en el fondo */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-10 right-10 text-white opacity-10">
                        <FaLeaf size={80} />
                    </div>
                    <div className="absolute top-10 left-10 text-white opacity-10">
                        <FaLeaf size={60} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;