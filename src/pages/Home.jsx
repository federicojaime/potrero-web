// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMountain, FaSwimmingPool, FaRoute, FaBed, FaUtensils, FaCalendarAlt, FaMapMarkedAlt, FaCamera, FaSun, FaSnowflake, FaThermometerHalf } from 'react-icons/fa';
import OptimizedVideoBanner from './OptimizedVideoBanner';
import WinterActivitiesSection from '../components/WinterActivitiesSection';
import SeccionCard from './SeccionCard';
import { winterColors } from '../theme/WinterTheme';

// Importamos las imágenes para cada sección
import imagenNaturaleza from '/src/assets/imagenes/naturaleza.jpg';
import imagenActividades from '/src/assets/imagenes/actividades.jpg';
import imagenCircuitos from '/src/assets/imagenes/circuitos.jpg';
import imagenAlojamiento from '/src/assets/imagenes/alojamiento.jpg';
import imagenGastronomia from '/src/assets/imagenes/gastronomia.jpg';
import imagenEventos from '/src/assets/imagenes/eventos.jpg';
import backgroundImage from '/src/assets/imagenes/otoño.jpg'; // Imagen de fondo con tema de invierno

// Definimos el array de secciones con todas las propiedades y colores invernales
const secciones = [
    {
        titulo: 'Potrero Activa',
        icono: FaMountain,
        imagen: imagenActividades,
        color: winterColors.forest, // Verde pino
        textColor: 'text-white',
        link: '/naturaleza',
    },
    {
        titulo: 'Actividades',
        icono: FaSwimmingPool,
        imagen: imagenNaturaleza,
        color: winterColors.primary, // Azul invernal
        textColor: 'text-white',
        link: '/actividades',
    },
    {
        titulo: 'Circuitos',
        icono: FaRoute,
        imagen: imagenCircuitos,
        color: winterColors.ice, // Azul hielo
        textColor: 'text-black',
        link: '/circuitos',
    },
    {
        titulo: 'Alojamiento',
        icono: FaBed,
        imagen: imagenAlojamiento,
        color: winterColors.glacier, // Azul glaciar
        textColor: 'text-white',
        link: '/alojamiento',
    },
    {
        titulo: 'Gastronomía',
        icono: FaUtensils,
        imagen: imagenGastronomia,
        color: winterColors.secondary, // Gris azulado
        textColor: 'text-white',
        link: '/gastronomia',
    },
    {
        titulo: 'Eventos',
        icono: FaCalendarAlt,
        imagen: imagenEventos,
        color: winterColors.accent, // Azul cielo
        textColor: 'text-white',
        link: '/eventos',
        disabled: false,
    },
];

const InfoCard = ({ icon: Icon, title, content }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 hover-lift">
        <div className="flex items-center mb-4">
            <div 
                className="flex items-center justify-center w-12 h-12 rounded-full mr-4"
                style={{ background: `${winterColors.ice}50` }}
            >
                <Icon 
                    className="text-2xl" 
                    style={{ color: winterColors.primary }}
                />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div>{content}</div>
    </div>
);

// Efecto de copo de nieve flotante para decoración visual
const FloatingSnowflake = ({ size, color, top, left, right, delay = 0 }) => (
    <motion.div
        className="absolute z-10"
        style={{ 
            top, 
            left, 
            right,
            color: color || winterColors.primary
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
        <FaSnowflake size={size || 20} />
    </motion.div>
);

function Home() {
    return (
        <div className="bg-winter-theme">
            <OptimizedVideoBanner />

            <section className="py-20 bg-gray-50 relative overflow-hidden">
                {/* Decoración de copos de nieve flotantes */}
                <FloatingSnowflake size={24} color={winterColors.ice1} top="10%" left="5%" delay={1} />
                <FloatingSnowflake size={18} color={winterColors.ice2} top="30%" right="10%" delay={2} />
                <FloatingSnowflake size={22} color={winterColors.ice3} top="70%" left="15%" delay={3} />
                <FloatingSnowflake size={26} color={winterColors.crystal} top="50%" right="15%" delay={1.5} />
                
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 section-title" style={{ color: winterColors.secondary }}>
                        Visitá Potrero de los Funes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {secciones.map((seccion, index) => (
                            <SeccionCard key={index} seccion={seccion} index={index} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Sección de actividades invernales */}
            <WinterActivitiesSection />
            
            <motion.section
                className="py-20 text-white bg-fixed bg-center bg-cover relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    backgroundImage: `
                      linear-gradient(
                        to right,
                        rgba(0, 0, 0, 0.6),
                        rgba(0, 0, 0, 0.4)
                      ),
                      url(${backgroundImage})
                    `,
                }}
            >
                {/* Decoración invernal en esta sección */}
                <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
                    <div className="w-full h-8" style={{ 
                        background: `linear-gradient(to right, ${winterColors.ice1}, ${winterColors.ice3}, ${winterColors.crystal}, ${winterColors.ice2})`,
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
                        Naturaleza, aventura y serenidad invernal en un solo lugar
                    </motion.h2>
                    <motion.p
                        className="text-xl text-center mt-4"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Descubrí todo lo que Potrero de los Funes tiene para ofrecerte en esta temporada de invierno
                    </motion.p>
                </div>
                
                {/* Más decoración de copos */}
                <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
                    <div className="w-full h-8" style={{ 
                        background: `linear-gradient(to right, ${winterColors.ice2}, ${winterColors.crystal}, ${winterColors.ice1})`,
                        opacity: 0.3
                    }}></div>
                </div>
            </motion.section>

            <div className="bg-gray-100 py-20 relative">
                {/* Copos decorativos */}
                <FloatingSnowflake size={20} color={winterColors.ice3} top="10%" right="20%" delay={2.5} />
                <FloatingSnowflake size={16} color={winterColors.crystal} top="60%" left="10%" delay={3.5} />
                
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 section-title" style={{ color: winterColors.secondary }}>
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

                        {/* Tarjeta 2: Clima típico de invierno */}
                        <InfoCard
                            icon={FaThermometerHalf}
                            title="Clima invernal"
                            content={
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaThermometerHalf className="text-blue-600 mr-2" />
                                            Temperatura
                                        </span>
                                        <span>5°C - 15°C</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaSnowflake className="text-blue-500 mr-2" />
                                            Humedad
                                        </span>
                                        <span>60% - 80%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaRoute className="text-gray-500 mr-2" />
                                            Viento
                                        </span>
                                        <span>10 - 20 km/h</span>
                                    </div>
                                    <p className="text-gray-600 mt-4">
                                        Clima fresco y seco con mañanas heladas. Ideal para actividades al aire libre y contemplar los paisajes invernales cristalinos.
                                    </p>
                                </div>
                            }
                        />

                        {/* Tarjeta 3: Actividades populares de invierno */}
                        <InfoCard
                            icon={FaCamera}
                            title="Actividades de invierno"
                            content={
                                <ul className="space-y-2 winter-list">
                                    <li className="flex items-center text-gray-700">
                                        <FaSnowflake className="text-blue-600 mr-2" />
                                        Caminatas matutinas con escarcha
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <FaMountain className="text-blue-700 mr-2" />
                                        Trekking con paisajes helados
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <FaRoute className="text-blue-800 mr-2" />
                                        Circuito panorámico invernal
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <FaUtensils className="text-blue-500 mr-2" />
                                        Gastronomía caliente de temporada
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                </div>
            </div>

            <section className="py-20 text-white relative overflow-hidden" style={{ 
                background: `linear-gradient(135deg, ${winterColors.ice}, ${winterColors.glacier}, ${winterColors.primary})` 
            }}>
                {/* Decoración de copos */}
                <FloatingSnowflake size={30} color="rgba(255,255,255,0.1)" top="20%" left="5%" delay={1} />
                <FloatingSnowflake size={24} color="rgba(255,255,255,0.1)" top="60%" right="8%" delay={2} />
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-4">¿Listo para tu aventura invernal?</h2>
                    <p className="text-xl mb-8">Planificá tu visita a Potrero de los Funes y viví una experiencia inolvidable rodeado de la serenidad del invierno serrano.</p>
                    <Link
                        to="/contacto"
                        className="bg-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300 shadow-md inline-block btn-winter"
                        style={{ color: winterColors.glacier }}
                    >
                        Contactanos
                    </Link>
                </div>
                
                {/* Decoración de copos en el fondo */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-10 right-10 text-white opacity-10">
                        <FaSnowflake size={80} />
                    </div>
                    <div className="absolute top-10 left-10 text-white opacity-10">
                        <FaSnowflake size={60} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;