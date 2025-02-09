import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMountain, FaSearchLocation, FaWater, FaTree, FaChurch, FaHiking, FaSearch, FaMapMarkerAlt, FaRoute, FaClock, FaBinoculars, FaGraduationCap, FaChevronDown } from 'react-icons/fa';

import travesiaImg from "../assets/imagenes/actividades/travesia.jpg";
import quebradaImg from "../assets/imagenes/actividades/quebrada-condores.jpg";
import lagoImg from "../assets/imagenes/actividades/lago-potrero.jpg";
import circuitoImg from "../assets/imagenes/actividades/circuitos.jpg";
import parqueImg from "../assets/imagenes/actividades/parque-nativo.jpg";
import saltoImg from "../assets/imagenes/actividades/salto-moneda.jpg";
import capillaImg from "../assets/imagenes/actividades/capilla-san-antonio.jpg";
import cerroImg from "../assets/imagenes/actividades/cerro-retana.jpg";
import miradorImg from "../assets/imagenes/actividades/mirador-lago.jpg";
import vallePiedra from "../assets/imagenes/actividades/vallePiedra.jpeg";
import lagunaUvas from "../assets/imagenes/actividades/lagunaUvas.jpeg";


const atractivosTuristicos = [
    {
        id: 1,
        titulo: "Travesía de las Cumbres",
        descripcion: "Una ruta de alta sierra de 11 km con vistas panorámicas impresionantes. Ideal para longboard y admirar el paisaje desde 1270 metros de altura.",
        imagen: travesiaImg,
        icono: FaMountain,
        tipo: 'Ruta Escénica',
        duracion: '1:30 horas',
        ubicacion: 'Entre Potrero de los Funes y La Punta',
        comoLlegar: 'Tomá la Calle Los Paraísos desde Potrero de los Funes',
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d53418.95770388624!2d-66.2841983!3d-33.1961375!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4406c9769f4df%3A0xee2035340eca0378!2sMirador%20de%20la%20Punta!5e0!3m2!1ses!2sar!4v1727413049875!5m2!1ses!2sar',
    },
    {
        id: 2,
        titulo: "Quebrada de los Cóndores",
        descripcion: "Portal de ingreso al valle con paredes graníticas perfectas. Disfrutá de una tarde junto al río Potrero.",
        imagen: quebradaImg,
        icono: FaHiking,
        tipo: 'Área Natural',
        duracion: '1 hora',
        ubicacion: 'Entrada de Potrero de los Funes',
        comoLlegar: 'Ubicada en el acceso principal a Potrero de los Funes',
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15874.258044131051!2d-66.24929045389233!3d-33.23632971698669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d43fd45e5df31f%3A0xbcae846e2d14936a!2sQuebrada%20de%20los%20C%C3%B3ndores!5e0!3m2!1ses!2sar!4v1727414071459!5m2!1ses!2sar',
    },
    {
        id: 3,
        titulo: "Lago Potrero de los Funes",
        descripcion: "Espejo de agua de 91 hectáreas ideal para pesca, windsurf y canotaje. Rodeado por el famoso Circuito Internacional.",
        imagen: lagoImg,
        icono: FaWater,
        tipo: 'Lago',
        duracion: 'Todo el día',
        ubicacion: 'Centro de Potrero de los Funes',
        comoLlegar: 'Accesible desde el centro de la localidad',
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13349.685066952065!2d-66.24420395152288!3d-33.229265426511745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4156304a2f087%3A0x932b6ed40a2b221!2sEmbalse%20Potrero%20de%20los%20Funes!5e0!3m2!1ses!2sar!4v1727414105925!5m2!1ses!2sar',
    },
    {
        id: 5,
        titulo: "Parque Nativo",
        descripcion: "Parque Nativo es un espacio de 7 hectáreas de naturaleza que combina flora nativa y exótica, ideal para disfrutar de un día al aire libre. Perfecto para un día de campo con todas las comodidades. Cuenta con senderos señalizados, zonas de picnic con parrillas, y áreas recreativas para niños. Ofrece actividades como avistamiento de aves, paseos en bicicleta, y talleres de fotografía natural. La entrada es totalmente gratuita y está abierto todos los días de 08:00 a 19:00, incluyendo feriados.",
        imagen: parqueImg,
        icono: FaTree,
        tipo: 'Parque Natural',
        duracion: '3-4 horas',
        ubicacion: 'Sobre el Circuito Internacional',
        comoLlegar: 'Tomá el camino hacia El Volcán desde Potrero de los Funes',
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26699.364463850987!2d-66.233904!3d-33.229284!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4157a8b283eb5%3A0x7156cf6fb364fbea!2sParque%20Nativo!5e0!3m2!1ses!2sar!4v1738951966356!5m2!1ses!2sar',
    },
    {
        id: 6,
        titulo: "Salto de la Moneda",
        descripcion: "Sendero ascendente con flora autóctona que lleva a un impresionante salto de agua de 10 metros de altura.",
        imagen: saltoImg,
        icono: FaWater,
        tipo: 'Cascada',
        duracion: '1-2 horas',
        ubicacion: 'Al norte de Potrero de los Funes',
        comoLlegar: 'Seguí el sendero señalizado desde el centro de la localidad',
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13353.943771547963!2d-66.24101165154718!3d-33.20135442096605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4155361f0e58d%3A0xbdffc9171e831650!2sSalto%20de%20la%20Moneda!5e0!3m2!1ses!2sar!4v1738952023914!5m2!1ses!2sar',
    },
    {
        id: 7,
        titulo: "Capilla de San Antonio",
        descripcion: "Histórica capilla de 1957 con un pesebre electrónico único, ubicada en el corazón de Potrero de los Funes.",
        imagen: capillaImg,
        icono: FaChurch,
        tipo: 'Sitio Histórico',
        duracion: '30 minutos',
        ubicacion: 'Centro Cívico de Potrero de los Funes',
        comoLlegar: 'Ubicada en el centro de la localidad, fácilmente accesible a pie',
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13353.943771547963!2d-66.24101165154718!3d-33.20135442096605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d43e84f2bedf27%3A0xddfce233bbd733f0!2sCapilla%20San%20Antonio!5e0!3m2!1ses!2sar!4v1738952065194!5m2!1ses!2sar',
    },

    {
        id: 9,
        titulo: "Paseo del Lago",
        descripcion: "Punto panorámico con vistas impresionantes del lago y las sierras circundantes.",
        imagen: miradorImg,
        icono: FaMountain,
        tipo: 'Mirador',
        duracion: '1 hora',
        ubicacion: 'Al este del Lago Potrero de los Funes',
        comoLlegar: 'Seguí las señales desde el Circuito Internacional',
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3337.272422918556!2d-66.23616522496036!3d-33.23316578641621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4157cdf2383b5%3A0x1d8ae56ec70f82d6!2sLago%20Potrero%20De%20Los%20Funes!5e0!3m2!1ses!2sar!4v1727414266581!5m2!1ses!2sar',
    },
    {
        id: 10,
        titulo: "Valle de Piedra",
        descripcion: "Un impresionante valle con formaciones rocosas milenarias que crean un paisaje único. Ideal para trekking, fotografía y actividades al aire libre.",
        imagen: vallePiedra,
        icono: FaMountain,
        tipo: 'Área Natural',
        duracion: '2-3 horas',
        ubicacion: 'Al sureste de Potrero de los Funes',
        comoLlegar: 'Tomá la Ruta Provincial 9 en dirección al Valle de Piedra desde el centro de la localidad.',
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11233.371665180171!2d-66.23675503122277!3d-33.16946579069872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d46a9c9b80ced7%3A0x6f1782d567d7daea!2sValle%20De%20Piedra!5e0!3m2!1ses!2sar!4v1738952159702!5m2!1ses!2sar'
    },
    {
        id: 11,
        titulo: "Laguna de las Uvas",
        descripcion: "Una laguna rodeada de viñedos y paisajes pintorescos. Perfecta para un día de relajación, caminatas suaves y degustaciones de productos regionales.",
        imagen: lagunaUvas,
        icono: FaWater,
        tipo: 'Laguna',
        duracion: '2 horas',
        ubicacion: 'A 5 km al norte de Potrero de los Funes',
        comoLlegar: 'Accedé por los senderos ubicados atrás de la Capilla de la localidad.',
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3339.248200975208!2d-66.21264692496324!3d-33.18135868378072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d46b56fdc3a4a5%3A0xec2ee72efc14d5e9!2sLagunas%20de%20las%20Uvas!5e0!3m2!1ses!2sar!4v1738952201790!5m2!1ses!2sar'
    },

];


const AtractivoCard = ({ atractivo, onClick }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
            onClick={() => onClick(atractivo)}
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={atractivo.imagen}
                    alt={atractivo.titulo}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-2xl font-bold text-white text-center">{atractivo.titulo}</h3>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-start mb-4">
                    <atractivo.icono className="text-3xl text-[#00add5] mr-4 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{atractivo.descripcion.substring(0, 100)}...</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span><FaMapMarkerAlt className="inline mr-1" />{atractivo.tipo}</span>
                    <span><FaClock className="inline mr-1" />{atractivo.duracion}</span>
                </div>
            </div>
        </motion.div>
    );
};

const AtractivoDetalle = ({ atractivo, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-3xl leading-6 font-bold text-[#00add5] mb-4">{atractivo.titulo}</h3>
                    <div className="mt-2 px-7 py-3">
                        <div className="relative h-96 mb-6">
                            <img src={atractivo.imagen} alt={atractivo.titulo} className="w-full h-full object-cover rounded-lg shadow-lg" />
                            <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow">
                                <span className="text-sm font-semibold text-gray-800">{atractivo.tipo}</span>
                            </div>
                        </div>

                        <p className="text-gray-700 text-lg mb-6">{atractivo.descripcion}</p>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h4 className="font-semibold text-[#00add5] mb-2 flex items-center">
                                    <FaClock className="mr-2" /> Duración
                                </h4>
                                <p>{atractivo.duracion}</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h4 className="font-semibold text-[#00add5] mb-2 flex items-center">
                                    <FaMapMarkerAlt className="mr-2" /> Ubicación
                                </h4>
                                <p>{atractivo.ubicacion}</p>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg mb-6">
                            <h4 className="font-semibold text-[#00add5] mb-2 flex items-center">
                                <FaRoute className="mr-2" /> Cómo llegar
                            </h4>
                            <p>{atractivo.comoLlegar}</p>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-[#00add5] mb-4 text-xl">Mapa</h4>
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <iframe
                                    src={atractivo.mapaUrl}
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        <div className="items-center px-4 py-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-[#00add5] text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-[#0098b8] focus:outline-none focus:ring-2 focus:ring-[#00add5]"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NoResultsMessage = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
        <FaSearchLocation className="text-6xl text-gray-400 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron atractivos</h3>
        <p className="text-gray-500 text-center max-w-md">
            Lo sentimos, no pudimos encontrar atractivos que coincidan con tu búsqueda.
            <br />
            Intenta con otros términos o explora todas nuestras opciones.
        </p>
    </div>
);

function QueVisitar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAtractivo, setSelectedAtractivo] = useState(null);
    const [selectedType, setSelectedType] = useState('todos');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const tiposUnicos = ['todos', ...new Set(atractivosTuristicos.map(atractivo => atractivo.tipo))];
    const categoriasPrincipales = ['todos', 'Área Natural', 'Sierra', 'Lago'];
    const categoriasSecundarias = tiposUnicos.filter(tipo => !categoriasPrincipales.includes(tipo));

    const filteredAtractivos = atractivosTuristicos.filter(atractivo =>
        (atractivo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            atractivo.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedType === 'todos' || atractivo.tipo === selectedType)
    );

    const getIconForType = (tipo) => {
        switch (tipo) {
            case 'Ruta Escénica': return FaRoute;
            case 'Área Natural': return FaTree;
            case 'Lago': return FaWater;
            case 'Atracción Deportiva': return FaRoute;
            case 'Parque Natural': return FaTree;
            case 'Cascada': return FaWater;
            case 'Sitio Histórico': return FaChurch;
            case 'Sierra': return FaMountain;
            case 'Mirador': return FaBinoculars;
            case 'Centro Educativo': return FaGraduationCap;
            default: return FaMapMarkerAlt;
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen">
            <div className="container mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center pt-8 mb-4 text-[#00add5]"
                >
                    Descubrí la Magia de Potrero de los Funes
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg text-center mb-8 text-gray-700"
                >
                    Explorá nuestros increíbles atractivos turísticos y viví experiencias únicas en el corazón de las sierras puntanas.
                </motion.p>
                <div className="mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="Buscar atractivos..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00add5]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 items-center">
                        {categoriasPrincipales.map((tipo) => {
                            const Icon = getIconForType(tipo);
                            return (
                                <button
                                    key={tipo}
                                    onClick={() => setSelectedType(tipo)}
                                    className={`px-4 py-2 rounded-full ${selectedType === tipo ? 'bg-[#00add5] text-white' : 'bg-white text-[#00add5] border border-[#00add5]'} hover:bg-[#00add5] hover:text-white transition-colors duration-300`}
                                >
                                    <Icon className="inline-block mr-2" />
                                    {tipo === 'todos' ? 'Todos' : tipo}
                                </button>
                            );
                        })}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="px-4 py-2 rounded-full bg-white text-[#00add5] border border-[#00add5] hover:bg-[#00add5] hover:text-white transition-colors duration-300"
                            >
                                Más categorías <FaChevronDown className="inline-block ml-2" />
                            </button>
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                    >
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            {categoriasSecundarias.map((tipo) => {
                                                const Icon = getIconForType(tipo);
                                                return (
                                                    <button
                                                        key={tipo}
                                                        onClick={() => {
                                                            setSelectedType(tipo);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                                        role="menuitem"
                                                    >
                                                        <Icon className="inline-block mr-2" />
                                                        {tipo}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                    {filteredAtractivos.length > 0 ? (
                        filteredAtractivos.map((atractivo) => (
                            <AtractivoCard
                                key={atractivo.id}
                                atractivo={atractivo}
                                onClick={() => setSelectedAtractivo(atractivo)}
                            />
                        ))
                    ) : (
                        <NoResultsMessage />
                    )}
                </div>
            </div>
            {selectedAtractivo && (
                <AtractivoDetalle
                    atractivo={selectedAtractivo}
                    onClose={() => setSelectedAtractivo(null)}
                />
            )}
        </div>
    );
}

export default QueVisitar;
