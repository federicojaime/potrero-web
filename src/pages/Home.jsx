import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaMountain, FaSwimmingPool, FaRoute, FaBed, FaUtensils, FaCalendarAlt, FaChevronDown, FaMapMarkedAlt, FaCamera, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import banner from "../assets/images/images.jpg";
import galeria1 from "../assets/images/images.jpg";
import galeria2 from "../assets/images/images.jpg";
import galeria3 from "../assets/images/images.jpg";

function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const bannerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: bannerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const secciones = [
        { titulo: 'Naturaleza', icono: FaMountain, color: 'bg-emerald-100', textColor: 'text-emerald-800', link: '/naturaleza' },
        { titulo: 'Actividades', icono: FaSwimmingPool, color: 'bg-sky-100', textColor: 'text-sky-800', link: '/actividades' },
        { titulo: 'Circuitos', icono: FaRoute, color: 'bg-amber-100', textColor: 'text-amber-800', link: '/circuitos' },
        { titulo: 'Alojamiento', icono: FaBed, color: 'bg-emerald-100', textColor: 'text-emerald-800', link: '/alojamiento' },
        { titulo: 'Gastronomía', icono: FaUtensils, color: 'bg-sky-100', textColor: 'text-sky-800', link: '/gastronomia' },
        { titulo: 'Eventos', icono: FaCalendarAlt, color: 'bg-amber-100', textColor: 'text-amber-800', link: '/eventos' },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-50"
                >
                    <motion.section
                        ref={bannerRef}
                        className="relative h-screen overflow-hidden"
                        style={{ y }}
                    >
                        <img
                            src={banner}
                            alt="Potrero de los Funes"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="text-center text-white px-4"
                            >
                                <h1 className="text-5xl md:text-7xl font-bold mb-4 shadow-text">Potrero de los Funes</h1>
                                <p className="text-xl md:text-2xl mb-8 shadow-text">Descubre el paraíso en las sierras de San Luis</p>
                                <Link
                                    to="/actividades"
                                    className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300 shadow-md"
                                >
                                    Explorar Ahora
                                </Link>
                            </motion.div>
                        </div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                        >
                            <FaChevronDown className="text-white text-4xl" />
                        </motion.div>
                    </motion.section>

                    <section className="py-20 bg-white relative z-10">
                        <div className="container mx-auto px-4">
                            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Atractivos Principales</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg overflow-hidden shadow-lg text-white p-6"
                                >
                                    <FaMapMarkedAlt className="text-5xl mb-4" />
                                    <h3 className="text-2xl font-semibold mb-2">Circuito Internacional</h3>
                                    <p>Experimenta la emoción en nuestro famoso circuito de carreras.</p>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg overflow-hidden shadow-lg text-white p-6"
                                >
                                    <FaMountain className="text-5xl mb-4" />
                                    <h3 className="text-2xl font-semibold mb-2">Sierras Puntanas</h3>
                                    <p>Explora la belleza natural de nuestras majestuosas sierras.</p>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg overflow-hidden shadow-lg text-white p-6"
                                >
                                    <FaSwimmingPool className="text-5xl mb-4" />
                                    <h3 className="text-2xl font-semibold mb-2">Lago Potrero</h3>
                                    <p>Disfruta de actividades acuáticas en nuestro hermoso lago.</p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    <motion.section
                        className="py-20 bg-gradient-to-r from-sky-400 to-emerald-400 text-white overflow-hidden relative z-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="container mx-auto px-4">
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold text-center"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <p>Naturaleza, adrenalina y relax en un solo lugar</p>
                            </motion.h2>
                            <motion.p
                                className="text-xl text-center mt-4"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Descubre todo lo que Potrero de los Funes tiene para ofrecerte
                            </motion.p>
                        </div>
                    </motion.section>

                    <section className="py-20 bg-gray-100 relative z-10">
                        <div className="container mx-auto px-4">
                            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Descubre Potrero de los Funes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {secciones.map((seccion, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link to={seccion.link} className={`block ${seccion.color} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300`}>
                                            <div className="p-8 text-center">
                                                <seccion.icono className={`mx-auto ${seccion.textColor} text-5xl mb-4`} />
                                                <h3 className={`text-2xl font-semibold ${seccion.textColor}`}>{seccion.titulo}</h3>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="py-20 bg-white relative z-10">
                        <div className="container mx-auto px-4">
                            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Galería de Imágenes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <motion.img
                                    src={galeria1}
                                    alt="Paisaje de Potrero de los Funes"
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                />
                                <motion.img
                                    src={galeria2}
                                    alt="Actividades en Potrero de los Funes"
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                />
                                <motion.img
                                    src={galeria3}
                                    alt="Atardecer en Potrero de los Funes"
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="py-20 bg-gray-100 relative z-10">
                        <div className="container mx-auto px-4">
                            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Información Turística</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <FaMapMarkedAlt className="text-4xl text-sky-700 mb-4" />
                                    <h3 className="text-2xl font-semibold mb-4 text-sky-700">Cómo llegar</h3>
                                    <p className="text-gray-700">Potrero de los Funes se encuentra a solo 20 km de la ciudad de San Luis. Acceso por Autopista de las Serranías Puntanas.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <FaSun className="text-4xl text-sky-700 mb-4" />
                                    <h3 className="text-2xl font-semibold mb-4 text-sky-700">Clima</h3>
                                    <p className="text-gray-700">Temperatura promedio anual de 17°C. Veranos cálidos e inviernos frescos y secos.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <FaCamera className="text-4xl text-sky-700 mb-4" />
                                    <h3 className="text-2xl font-semibold mb-4 text-sky-700">Actividades populares</h3>
                                    <ul className="list-disc list-inside text-gray-700">
                                        <li>Deportes acuáticos en el lago</li>
                                        <li>Trekking y mountain bike</li>
                                        <li>Visitas al Circuito Internacional</li>
                                        <li>Pesca deportiva</li>
                                        <li>Turismo aventura</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-20 bg-gradient-to-r from-amber-400 to-orange-400 text-white relative z-10">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-4xl font-bold mb-4">¿Listo para tu aventura?</h2>
                            <p className="text-xl mb-8">Planifica tu visita a Potrero de los Funes y vive una experiencia inolvidable.</p>
                            <Link
                                to="/contacto"
                                className="bg-white text-orange-500 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300 shadow-md inline-block"
                            >
                                Contáctanos
                            </Link>
                        </div>
                    </section>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Home;