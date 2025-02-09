import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMountain, FaSwimmingPool, FaRoute, FaBed, FaUtensils, FaCalendarAlt, FaMapMarkedAlt, FaCamera, FaSun } from 'react-icons/fa';
import OptimizedVideoBanner from './OptimizedVideoBanner';
// Importamos las imágenes para cada sección
import imagenNaturaleza from '/src/assets/imagenes/naturaleza.jpg';
import imagenActividades from '/src/assets/imagenes/actividades.jpg';
import imagenCircuitos from '/src/assets/imagenes/circuitos.jpg';
import imagenAlojamiento from '/src/assets/imagenes/alojamiento.jpg';
import imagenGastronomia from '/src/assets/imagenes/gastronomia.jpg';
import imagenEventos from '/src/assets/imagenes/eventos.jpg';
import backgroundImage from '../assets/images/images.jpg';
import SeccionCard from './SeccionCard';
import { Card } from 'flowbite-react';

// Definimos los colores de la marca según el manual
const colors = {
    primary: '#0096FF', // Azul más brillante
    secondary: '#0047AB', // Azul real profundo
    green: '#00B140', // Verde esmeralda vibrante
    yellow: '#FFD700', // Amarillo dorado
    orange: '#FF6B35', // Naranja coral vibrante
    beige: '#FFF8DC', // Beige más luminoso
    black: '#1C1C1C', // Negro suave para contraste
};
// Definimos el array de secciones con todas las propiedades
const secciones = [
    {
        titulo: 'Naturaleza',
        icono: FaMountain,
        imagen: imagenNaturaleza,
        color: colors.green,
        textColor: 'text-white',
        link: '/naturaleza',
    },
    {
        titulo: 'Actividades',
        icono: FaSwimmingPool,
        imagen: imagenActividades,
        color: colors.primary,
        textColor: 'text-white',
        link: '/actividades',
    },
    {
        titulo: 'Circuitos',
        icono: FaRoute,
        imagen: imagenCircuitos,
        color: colors.yellow,
        textColor: 'text-black',
        link: '/circuitos',
    },
    {
        titulo: 'Alojamiento',
        icono: FaBed,
        imagen: imagenAlojamiento,
        color: colors.secondary,
        textColor: 'text-white',
        link: '/alojamiento',
    },
    {
        titulo: 'Gastronomía',
        icono: FaUtensils,
        imagen: imagenGastronomia,
        color: colors.orange,
        textColor: 'text-white',
        link: '/gastronomia',
        disabled: true, // Deshabilitar la sección
    },
    {
        titulo: 'Eventos',
        icono: FaCalendarAlt,
        imagen: imagenEventos,
        color: colors.beige,
        textColor: 'text-black',
        link: '/eventos',
        disabled: true, // Deshabilitar la sección
    },
];

const AtractiveCard = ({ icon: Icon, title, description }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-lg overflow-hidden shadow-lg p-6 text-center"
        style={{ borderColor: colors.primary, borderWidth: 2 }}
    >
        <Icon className="text-5xl mb-4" style={{ color: colors.primary }} />
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const SeccionCarda = ({ seccion, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative group"
    >
        <Link
            to={seccion.disabled ? '#' : seccion.link}
            className={`block rounded-xl overflow-hidden shadow-lg transform transition-transform duration-500 group-hover:scale-105 ${seccion.disabled ? 'cursor-not-allowed' : ''}`}
            onClick={e => seccion.disabled && e.preventDefault()}
        >
            <div className="relative">
                {/* Fondo con imagen y degradado */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),
                url(${seccion.imagen})
              `,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>

                {/* Contenido de la tarjeta */}
                <div className="relative z-10 p-8 text-center text-white">
                    <motion.div
                        whileHover={!seccion.disabled ? { rotate: [0, 15, -15, 0], scale: 1.1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <seccion.icono className="mx-auto text-6xl mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold">
                        {seccion.disabled ? 'Próximamente' : seccion.titulo}
                    </h3>
                </div>
            </div>
        </Link>
    </motion.div>
);

const GaleriaImage = ({ src, alt }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="overflow-hidden rounded-lg shadow-md"
    >
        <img
            src={src}
            alt={alt}
            className="w-full h-64 object-cover"
        />
    </motion.div>
);

const InfoCard = ({ icon: Icon, title, content }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6">
        <div className="flex items-center mb-4">
            <Icon className="text-3xl text-primary mr-3" />
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="text-gray-600">{content}</div>
    </div>
);

function Home() {
    return (
        <div className="bg-gray-50">
            <OptimizedVideoBanner />

            {/* <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Atractivos Principales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AtractiveCard
                            icon={FaMapMarkedAlt}
                            title="Circuito Internacional"
                            description="Experimentá la emoción en nuestro famoso circuito de carreras."
                        />
                        <AtractiveCard
                            icon={FaMountain}
                            title="Sierras Puntanas"
                            description="Explorá la belleza natural de nuestras majestuosas sierras."
                        />
                        <AtractiveCard
                            icon={FaSwimmingPool}
                            title="Lago Potrero"
                            description="Disfrutá de actividades acuáticas en nuestro hermoso lago."
                        />
                    </div>
                </div>
            </section>*/}



            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16">Visitá Potrero de los Funes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {secciones.map((seccion, index) => (
                            <SeccionCard key={index} seccion={seccion} index={index} />
                        ))}
                    </div>
                </div>
            </section>
            <motion.section
                className="py-20 text-white bg-fixed bg-center bg-cover"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    backgroundImage: `
                      linear-gradient(
                        to right,
                        ${colors.primary}40,
                        ${colors.secondary}70
                      ),
    url(${backgroundImage})
                    `,
                }}
            >
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
                        Descubrí todo lo que Potrero de los Funes tiene para ofrecerte
                    </motion.p>
                </div>
            </motion.section>

            {/**  <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Galería de Imágenes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <GaleriaImage src={galeria1} alt="Paisaje de Potrero de los Funes" />
                        <GaleriaImage src={galeria2} alt="Actividades en Potrero de los Funes" />
                        <GaleriaImage src={galeria3} alt="Atardecer en Potrero de los Funes" />
                    </div>
                </div>
            </section>*/}
            (
            <div className="bg-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Información Turística</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                        {/* Tarjeta 1: Cómo llegar (Google Maps directo a Potrero de los Funes) */}
                        <InfoCard
                            icon={FaMapMarkedAlt}
                            title="Cómo llegar"
                            content={
                                <>
                                    <div className="aspect-video mb-4">
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
                                    <p>
                                        A solo 20 km de la ciudad de San Luis. Acceso por Autopista de las Serranías Puntanas.
                                    </p>
                                </>
                            }
                        />

                        {/* Tarjeta 2: Clima típico */}
                        <InfoCard
                            icon={FaSun}
                            title="Clima típico"
                            content={
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <FaMountain className="text-green-500 mr-2" />
                                            Temperatura
                                        </span>
                                        <span>15°C - 25°C</span>
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
                                        <span>10 - 20 km/h</span>
                                    </div>
                                    <p className="text-gray-600 mt-4">
                                        Clima templado y seco la mayor parte del año. Ideal para actividades al aire libre.
                                    </p>
                                </div>
                            }
                        />

                        {/* Tarjeta 3: Actividades populares */}
                        <InfoCard
                            icon={FaCamera}
                            title="Actividades populares"
                            content={
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <FaSwimmingPool className="text-blue-500 mr-2" />
                                        Deportes acuáticos en el lago
                                    </li>
                                    <li className="flex items-center">
                                        <FaMountain className="text-green-500 mr-2" />
                                        Trekking y mountain bike
                                    </li>
                                    <li className="flex items-center">
                                        <FaRoute className="text-red-500 mr-2" />
                                        Visitas al Circuito Internacional
                                    </li>
                                    <li className="flex items-center">
                                        <FaUtensils className="text-orange-500 mr-2" />
                                        Gastronomía local
                                    </li>
                                    <li className="flex items-center">
                                        <FaCalendarAlt className="text-purple-500 mr-2" />
                                        Eventos culturales
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                </div>
            </div>

            <section className="py-20 text-white" style={{ background: `linear-gradient(to right, ${colors.yellow}, ${colors.orange})` }}>
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4 text-black">¿Listo para tu aventura?</h2>
                    <p className="text-xl mb-8 text-black">Planificá tu visita a Potrero de los Funes y viví una experiencia inolvidable.</p>
                    <Link
                        to="/contacto"
                        className="bg-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300 shadow-md inline-block"
                        style={{ color: colors.primary }}
                    >
                        Contactanos
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
