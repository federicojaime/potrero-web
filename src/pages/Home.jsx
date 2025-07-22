// src/pages/Home.jsx - CON TRADUCCIONES
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ← AGREGAR ESTO
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
import backgroundImage from '/src/assets/imagenes/otoño.jpg';

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
    // ← USAR EL HOOK DE TRADUCCIONES
    const { t, ready } = useTranslation();

    // Si las traducciones no están listas, mostrar loading
    if (!ready) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <FaSnowflake className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
                    <p className="text-xl">Cargando...</p>
                </div>
            </div>
        );
    }

    // ← SECCIONES CON TRADUCCIONES DINÁMICAS
    const secciones = [
        {
            titulo: 'Potrero Activa',
            icono: FaMountain,
            imagen: imagenActividades,
            color: winterColors.forest,
            textColor: 'text-white',
            link: '/naturaleza',
        },
        {
            titulo: t('nav.activities'), // ← USAR TRADUCCIÓN
            icono: FaSwimmingPool,
            imagen: imagenNaturaleza,
            color: winterColors.primary,
            textColor: 'text-white',
            link: '/actividades',
        },
        {
            titulo: 'Circuitos',
            icono: FaRoute,
            imagen: imagenCircuitos,
            color: winterColors.ice,
            textColor: 'text-black',
            link: '/circuitos',
        },
        {
            titulo: t('nav.accommodation'), // ← USAR TRADUCCIÓN
            icono: FaBed,
            imagen: imagenAlojamiento,
            color: winterColors.glacier,
            textColor: 'text-white',
            link: '/alojamiento',
        },
        {
            titulo: t('nav.gastronomy'), // ← USAR TRADUCCIÓN
            icono: FaUtensils,
            imagen: imagenGastronomia,
            color: winterColors.secondary,
            textColor: 'text-white',
            link: '/gastronomia',
        },
        {
            titulo: 'Eventos',
            icono: FaCalendarAlt,
            imagen: imagenEventos,
            color: winterColors.accent,
            textColor: 'text-white',
            link: '/eventos',
            disabled: false,
        },
    ];

    return (
        <div className="bg-winter-theme">
            <OptimizedVideoBanner />

            <section className="py-20 bg-gray-50 relative overflow-hidden">
                <FloatingSnowflake size={24} color={winterColors.ice1} top="10%" left="5%" delay={1} />
                <FloatingSnowflake size={18} color={winterColors.ice2} top="30%" right="10%" delay={2} />
                <FloatingSnowflake size={22} color={winterColors.ice3} top="70%" left="15%" delay={3} />
                <FloatingSnowflake size={26} color={winterColors.crystal} top="50%" right="15%" delay={1.5} />

                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 section-title" style={{ color: winterColors.secondary }}>
                        {t('sections.visit_potrero')} {/* ← USAR TRADUCCIÓN */}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {secciones.map((seccion, index) => (
                            <SeccionCard key={index} seccion={seccion} index={index} />
                        ))}
                    </div>
                </div>
            </section>
            {/** 
            <WinterActivitiesSection />
            */}
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
                        {t('sections.nature_adventure')} {/* ← USAR TRADUCCIÓN */}
                    </motion.h2>
                    <motion.p
                        className="text-xl text-center mt-4"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {t('sections.discover_winter')} {/* ← USAR TRADUCCIÓN */}
                    </motion.p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
                    <div className="w-full h-8" style={{
                        background: `linear-gradient(to right, ${winterColors.ice2}, ${winterColors.crystal}, ${winterColors.ice1})`,
                        opacity: 0.3
                    }}></div>
                </div>
            </motion.section>

            <div className="bg-gray-100 py-20 relative">
                <FloatingSnowflake size={20} color={winterColors.ice3} top="10%" right="20%" delay={2.5} />
                <FloatingSnowflake size={16} color={winterColors.crystal} top="60%" left="10%" delay={3.5} />

                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 section-title" style={{ color: winterColors.secondary }}>
                        {t('sections.tourist_info')} {/* ← USAR TRADUCCIÓN */}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <InfoCard
                            icon={FaMapMarkedAlt}
                            title={t('info.how_to_arrive')} // ← USAR TRADUCCIÓN
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
                                        {t('info.how_to_arrive_desc')} {/* ← USAR TRADUCCIÓN */}
                                    </p>
                                </>
                            }
                        />

                        <InfoCard
                            icon={FaThermometerHalf}
                            title={t('info.winter_weather')} // ← USAR TRADUCCIÓN
                            content={
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaThermometerHalf className="text-blue-600 mr-2" />
                                            {t('info.temperature')} {/* ← USAR TRADUCCIÓN */}
                                        </span>
                                        <span>5°C - 15°C</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaSnowflake className="text-blue-500 mr-2" />
                                            {t('info.humidity')} {/* ← USAR TRADUCCIÓN */}
                                        </span>
                                        <span>60% - 80%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaRoute className="text-gray-500 mr-2" />
                                            {t('info.wind')} {/* ← USAR TRADUCCIÓN */}
                                        </span>
                                        <span>10 - 20 km/h</span>
                                    </div>
                                    <p className="text-gray-600 mt-4">
                                        {t('info.weather_desc')} {/* ← USAR TRADUCCIÓN */}
                                    </p>
                                </div>
                            }
                        />

                        <InfoCard
                            icon={FaCamera}
                            title={t('info.winter_activities_title')} // ← USAR TRADUCCIÓN
                            content={
                                <ul className="space-y-2 winter-list">
                                    <li className="flex items-center text-gray-700">
                                        <FaSnowflake className="text-blue-600 mr-2" />
                                        {t('info.frost_walks')} {/* ← USAR TRADUCCIÓN */}
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <FaMountain className="text-blue-700 mr-2" />
                                        {t('info.frozen_trekking')} {/* ← USAR TRADUCCIÓN */}
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <FaRoute className="text-blue-800 mr-2" />
                                        {t('info.winter_circuit')} {/* ← USAR TRADUCCIÓN */}
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <FaUtensils className="text-blue-500 mr-2" />
                                        {t('info.warm_gastronomy')} {/* ← USAR TRADUCCIÓN */}
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
                <FloatingSnowflake size={30} color="rgba(255,255,255,0.1)" top="20%" left="5%" delay={1} />
                <FloatingSnowflake size={24} color="rgba(255,255,255,0.1)" top="60%" right="8%" delay={2} />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-4">
                        {t('sections.ready_adventure')} {/* ← USAR TRADUCCIÓN */}
                    </h2>
                    <p className="text-xl mb-8">
                        {t('sections.plan_visit')} {/* ← USAR TRADUCCIÓN */}
                    </p>
                    <Link
                        to="/contacto"
                        className="bg-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300 shadow-md inline-block btn-winter"
                        style={{ color: winterColors.glacier }}
                    >
                        {t('footer.contact_us')} {/* ← USAR TRADUCCIÓN */}
                    </Link>
                </div>

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