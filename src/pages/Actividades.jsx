import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Parallax } from 'react-parallax';
import { useInView } from 'react-intersection-observer';
import { FaMountain, FaSearchLocation, FaWater, FaTree, FaChurch, FaHiking, FaSearch, FaMapMarkerAlt, FaRoute, FaClock, FaBinoculars, FaGraduationCap, FaChevronDown } from 'react-icons/fa';

const imagenPrueba = "https://www.caminosanluis.com.ar/wp-content/uploads/2014/12/Lago-y-circuito-potrero-y-pueblo.jpg";

const atractivosTuristicos = [
    {
        id: 1,
        titulo: "Travesía de las Cumbres",
        descripcion: "Una ruta de alta montaña de 11 km con vistas panorámicas impresionantes. Ideal para longboard y admirar el paisaje desde 1270 metros de altura.",
        imagen: imagenPrueba,
        icono: FaMountain,
        tipo: 'Ruta Escénica',
        duracion: '3-4 horas',
        ubicacion: 'Entre Potrero de los Funes y La Punta',
        comoLlegar: 'Tomar la Ruta Provincial 18 desde Potrero de los Funes',
        mapaUrl: 'https://goo.gl/maps/example1',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    },
    {
        id: 2,
        titulo: "Quebrada de los Cóndores",
        descripcion: "Portal de ingreso al valle con paredes graníticas perfectas para escalada y rappel. Disfruta de una tarde junto al río Potrero.",
        imagen: imagenPrueba,
        icono: FaHiking,
        tipo: 'Área Natural',
        duracion: '2-3 horas',
        ubicacion: 'Entrada de Potrero de los Funes',
        comoLlegar: 'Ubicada en el acceso principal a Potrero de los Funes',
        mapaUrl: 'https://goo.gl/maps/example2',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    },
    {
        id: 3,
        titulo: "Lago Potrero de los Funes",
        descripcion: "Espejo de agua de 91 hectáreas ideal para pesca, windsurf y canotaje. Rodeado por el famoso Circuito Internacional.",
        imagen: imagenPrueba,
        icono: FaWater,
        tipo: 'Lago',
        duracion: 'Todo el día',
        ubicacion: 'Centro de Potrero de los Funes',
        comoLlegar: 'Accesible desde el centro de la localidad',
        mapaUrl: 'https://goo.gl/maps/example3',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    },
    {
        id: 4,
        titulo: "Circuito Internacional de Potrero",
        descripcion: "Famoso circuito de carreras que rodea el lago, escenario de competencias internacionales.",
        imagen: imagenPrueba,
        icono: FaRoute,
        tipo: 'Atracción Deportiva',
        duracion: '1-2 horas',
        ubicacion: 'Alrededor del Lago Potrero de los Funes',
        comoLlegar: 'Sigue las indicaciones al Circuito desde el centro de la localidad',
        mapaUrl: 'https://goo.gl/maps/example4',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    },
    {
        id: 5,
        titulo: "Parque Nativo",
        descripcion: "7 hectáreas de naturaleza con flora nativa y exótica. Perfecto para un día de campo con todas las comodidades.",
        imagen: imagenPrueba,
        icono: FaTree,
        tipo: 'Parque Natural',
        duracion: '3-4 horas',
        ubicacion: 'Sobre el Circuito Internacional',
        comoLlegar: 'Tomar el camino hacia El Volcán desde Potrero de los Funes',
        mapaUrl: 'https://goo.gl/maps/example5',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    },
    {
        id: 6,
        titulo: "Salto de la Moneda",
        descripcion: "Sendero ascendente con flora autóctona que lleva a un impresionante salto de agua de 10 metros de altura.",
        imagen: imagenPrueba,
        icono: FaWater,
        tipo: 'Cascada',
        duracion: '1-2 horas',
        ubicacion: 'Al norte de Potrero de los Funes',
        comoLlegar: 'Seguir el sendero señalizado desde el centro de la localidad',
        mapaUrl: 'https://goo.gl/maps/example6',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    },
    {
        id: 7,
        titulo: "Capilla de San Antonio",
        descripcion: "Histórica capilla de 1957 con un pesebre electrónico único, ubicada en el corazón de Potrero de los Funes.",
        imagen: imagenPrueba,
        icono: FaChurch,
        tipo: 'Sitio Histórico',
        duracion: '30 minutos',
        ubicacion: 'Centro Cívico de Potrero de los Funes',
        comoLlegar: 'Ubicada en el centro de la localidad, fácilmente accesible a pie',
        mapaUrl: 'https://goo.gl/maps/example7',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    },
    {
        id: 8,
        titulo: "Cerro Retana",
        descripcion: "Uno de los picos más altos de las Sierras de San Luis (2152m). Perfecto para trekking con vistas espectaculares.",
        imagen: imagenPrueba,
        icono: FaMountain,
        tipo: 'Montaña',
        duracion: 'Todo el día',
        ubicacion: 'Al oeste de Potrero de los Funes',
        comoLlegar: 'Acceso por sendero desde Potrero de los Funes o El Suyuque',
        mapaUrl: 'https://goo.gl/maps/example8',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    },
    {
        id: 9,
        titulo: "Mirador del Lago",
        descripcion: "Punto panorámico con vistas impresionantes del lago y las montañas circundantes.",
        imagen: imagenPrueba,
        icono: FaMountain,
        tipo: 'Mirador',
        duracion: '1 hora',
        ubicacion: 'Al este del Lago Potrero de los Funes',
        comoLlegar: 'Seguir las señales desde el Circuito Internacional',
        mapaUrl: 'https://goo.gl/maps/example9',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    },
    {
        id: 10,
        titulo: "Centro de Interpretación Ambiental",
        descripcion: "Espacio educativo interactivo sobre la flora, fauna y geología de la región.",
        imagen: imagenPrueba,
        icono: FaTree,
        tipo: 'Centro Educativo',
        duracion: '1-2 horas',
        ubicacion: 'Cerca del ingreso a Potrero de los Funes',
        comoLlegar: 'Ubicado junto al Centro de Visitantes en la entrada de la localidad',
        mapaUrl: 'https://goo.gl/maps/example10',
        imagenesAdicionales: [imagenPrueba, imagenPrueba, imagenPrueba]
    }
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
            <Parallax bgImage={atractivo.imagen} strength={200} className="h-64 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-2xl font-bold text-white text-center">{atractivo.titulo}</h3>
                </div>
            </Parallax>
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

                        <div>
                            <h4 className="font-semibold text-[#00add5] mb-4 text-xl">Galería de imágenes</h4>
                            <div className="grid grid-cols-3 gap-4">
                                {atractivo.imagenesAdicionales.map((img, index) => (
                                    <img key={index} src={img} alt={`${atractivo.titulo} ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" />
                                ))}
                            </div>
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
    const categoriasPrincipales = ['todos', 'Área Natural', 'Montaña', 'Lago'];
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
            case 'Montaña': return FaMountain;
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
                    Descubre la Magia de Potrero de los Funes
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg text-center mb-8 text-gray-700"
                >
                    Explora nuestros increíbles atractivos turísticos y vive experiencias únicas en el corazón de las sierras puntanas.
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