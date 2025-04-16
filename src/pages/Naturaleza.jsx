import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHiking, FaSearch, FaMapMarkerAlt, FaClock, FaTimes, FaMountain,
    FaWater, FaTree, FaRoute, FaSwimmingPool, FaBiking, FaFilter,
    FaChevronDown, FaMotorcycle, FaLeaf, FaUmbrellaBeach
} from 'react-icons/fa';

// Importación de imágenes
import lagoImg from "../assets/imagenes/actividades/hidropedales.jpg";
import circuitoImg from "../assets/imagenes/actividades/rentabike.jpg";
import parqueImg from "../assets/imagenes/actividades/golfito.jpg";
import saltoImg from "../assets/imagenes/actividades/salto-moneda.jpg";
import canotajeImg from "../assets/imagenes/actividades/canotaje.jpg";
import bikingImg from "../assets/imagenes/actividades/bicis.jpg";
import salagriaImg from "../assets/imagenes/actividades/salagria.jpg";
import cuatriImg from "../assets/imagenes/actividades/cuatriciclos.jpg";

// Datos de las actividades con categorías y tags
const actividades = [
    {
        id: 1,
        nombre: "Escuela de Canotaje",
        tipo: "Deportes Acuáticos",
        descripcion: "Aprende a navegar en kayak o canoa en el hermoso lago de Potrero de los Funes. Nuestra escuela de canotaje ofrece cursos para todos los niveles, desde principiantes hasta avanzados. Con instructores certificados y equipos de calidad, aprenderás las técnicas básicas de remo, seguridad en el agua y maniobras para disfrutar de este deporte acuático en un entorno natural incomparable.",
        imagen: canotajeImg,
        icono: FaSwimmingPool,
        duracion: "2-3 horas por clase",
        dificultad: "Principiante a Avanzado",
        distancia: "Variable según nivel",
        disponibilidad: "Todo el año (sujeto a condiciones climáticas)",
        puntoPartida: "Club Náutico Potrero",
        recomendaciones: [
            "No se necesita experiencia previa para nivel principiante",
            "Usar protector solar resistente al agua",
            "Llevar ropa que pueda mojarse",
            "Gafas de sol con sujeción",
            "Calzado que pueda mojarse",
            "Traer muda de ropa seca"
        ],
        categorias: ["acuatico", "aventura", "deporte"],
        tags: ["kayak", "canotaje", "lago", "remo", "agua", "clase", "actividad acuática"],
        horarioContacto: "Consultar"
    },
    {
        id: 2,
        nombre: "Extremo-Bicis",
        tipo: "Ciclismo de Montaña",
        descripcion: "Vive la adrenalina del mountain bike extremo en nuestros circuitos especialmente diseñados para amantes de las emociones fuertes. Extremo-Bicis ofrece rutas desafiantes con descensos técnicos, saltos y obstáculos naturales en el entorno serrano de Potrero de los Funes. Contamos con guías experimentados y alquiler de bicicletas especializadas para downhill y enduro.",
        imagen: bikingImg,
        icono: FaBiking,
        duracion: "3-5 horas",
        dificultad: "Alta",
        distancia: "Circuitos de 15 a 25 km",
        disponibilidad: "Todo el año (preferentemente otoño y primavera)",
        puntoPartida: "Centro de Deportes Extremos Potrero",
        recomendaciones: [
            "Se requiere experiencia previa en mountain bike",
            "Casco integral y protecciones obligatorias",
            "Guantes de ciclismo reforzados",
            "Hidratación abundante (mínimo 2 litros)",
            "Kit básico de reparación",
            "Ropa técnica adecuada"
        ],
        categorias: ["aventura", "montaña", "deporte"],
        tags: ["bicicleta", "mountain bike", "mtb", "ciclismo", "descenso", "enduro", "adrenalina", "extremo"],
        horarioContacto: "Consultar"
    },
    {
        id: 3,
        nombre: "Hidropedales",
        tipo: "Recreación Acuática",
        descripcion: "Disfruta de un paseo relajante en hidropedales por el lago de Potrero de los Funes. Esta actividad familiar permite recorrer las aguas cristalinas del lago a tu propio ritmo, admirando el paisaje serrano desde una perspectiva única. Los hidropedales son embarcaciones seguras y fáciles de manejar, ideales para todas las edades, permitiendo disfrutar del entorno natural sin necesidad de experiencia previa.",
        imagen: lagoImg,
        icono: FaWater,
        duracion: "30 minutos a 1 hora",
        dificultad: "Muy baja",
        distancia: "A elección",
        disponibilidad: "Temporada primavera-verano-otoño",
        puntoPartida: "Muelle principal del lago",
        recomendaciones: [
            "Actividad ideal para familias con niños",
            "Usar protector solar",
            "Llevar sombrero o gorra",
            "Gafas de sol",
            "Agua para hidratarse",
            "Cámara (preferentemente resistente al agua)"
        ],
        categorias: ["acuatico", "familiar", "recreacion"],
        tags: ["hidropedal", "bote", "paseo", "lago", "relax", "familia", "niños", "agua"],
        horarioContacto: "Servicio disponible de 10:00hs a 18:00hs. Sin reserva previa."
    },
    {
        id: 4,
        nombre: "Renta-bike",
        tipo: "Ciclismo Recreativo",
        descripcion: "Explora Potrero de los Funes a tu propio ritmo con nuestro servicio de alquiler de bicicletas. Renta-bike ofrece una amplia variedad de bicicletas de montaña y paseo para recorrer los senderos y el circuito panorámico del lago. Incluimos casco, kit de reparación básico y mapa con rutas recomendadas según tu nivel. Una forma ecológica y divertida de conocer los principales atractivos de la zona.",
        imagen: circuitoImg,
        icono: FaBiking,
        duracion: "1 hora a todo el día",
        dificultad: "A elección",
        distancia: "Variable",
        disponibilidad: "Todo el año",
        puntoPartida: "Centro de Visitantes - Av. del Circuito",
        recomendaciones: [
            "Traer identificación para el alquiler",
            "Usar casco en todo momento (incluido)",
            "Hidratación suficiente",
            "Protector solar",
            "Respetar las normas de tránsito",
            "Devolver el equipo en el horario acordado"
        ],
        categorias: ["deporte", "familiar", "recreacion"],
        tags: ["bicicleta", "alquiler", "cicloturismo", "paseo", "circuito", "lago", "mountain bike", "renta"],
        horarioContacto: "Consultar"
    },
    {
        id: 5,
        nombre: "Salto de la Moneda",
        tipo: "Senderismo",
        descripcion: "Sendero ascendente con flora autóctona que lleva a un impresionante salto de agua de 10 metros de altura. El recorrido atraviesa un bosque serrano y permite observar especies nativas de flora y fauna. La cascada crea una piscina natural donde es posible refrescarse durante los meses cálidos. Esta caminata ofrece una excelente oportunidad para conectar con la naturaleza y disfrutar de un paisaje único.",
        imagen: saltoImg,
        icono: FaHiking,
        duracion: "1-2 horas",
        dificultad: "Media",
        distancia: "3 km (ida y vuelta)",
        disponibilidad: "Todo el año (caudal variable según temporada)",
        puntoPartida: "Al norte de Potrero de los Funes",
        recomendaciones: [
            "Llevar calzado con buen agarre (puede estar resbaladizo)",
            "Protector solar",
            "Agua suficiente",
            "Traje de baño en verano",
            "Cámara resistente al agua",
            "Toalla pequeña"
        ],
        categorias: ["naturaleza", "montaña", "senderismo"],
        tags: ["cascada", "trekking", "caminata", "sendero", "agua", "bosque", "flora", "fauna", "hiking"],
        horarioContacto: "Visitas recomendadas: 10:00hs a 16:00hs"
    },
    {
        id: 6,
        nombre: "Senda Tur Golfitos",
        tipo: "Recreación Familiar",
        descripcion: "Disfruta de un entretenido circuito de minigolf en un entorno natural único. Senda Tur Golfitos ofrece un recorrido de 18 hoyos temáticos inspirados en los atractivos naturales de Potrero de los Funes, como el lago, las sierras y la flora local. Una actividad divertida para todas las edades, que combina la precisión del golf en miniatura con un paseo relajante entre jardines y espacios verdes con vistas panorámicas al lago.",
        imagen: parqueImg,
        icono: FaTree,
        duracion: "1-2 horas",
        dificultad: "Muy baja",
        distancia: "Circuito de 18 hoyos",
        disponibilidad: "Todo el año",
        puntoPartida: "Complejo Recreativo Sur - Av. del Circuito",
        recomendaciones: [
            "No se requiere experiencia previa",
            "Actividad ideal para todas las edades",
            "Protector solar y gorra",
            "Calzado cómodo",
            "Disponible en horario nocturno con iluminación especial",
            "Cuenta con cafetería y zona de descanso"
        ],
        categorias: ["familiar", "recreacion"],
        tags: ["minigolf", "golf", "juego", "familia", "niños", "jardín", "diversión", "entretenimiento"],
        horarioContacto: "Abierto: 10:00hs a 23:00hs."
    },
    {
        id: 7,
        nombre: "Complejo La Salagria",
        tipo: "Centro Recreativo",
        descripcion: "Complejo recreativo ubicado en un entorno natural privilegiado de Potrero de los Funes. La Salagria ofrece diversas instalaciones y servicios para el disfrute familiar, incluyendo piscina, áreas de picnic, espacios para deportes y juegos infantiles. El complejo se encuentra rodeado de vegetación autóctona y cuenta con vistas panorámicas a las sierras, creando un ambiente ideal para desconectar y disfrutar de un día al aire libre. También dispone de tirolesa para los amantes de la aventura y la adrenalina.",
        imagen: salagriaImg,
        icono: FaTree,
        duracion: "Todo el día",
        dificultad: "Muy baja",
        distancia: "No aplica",
        disponibilidad: "Todo el año",
        puntoPartida: "Acceso por Ruta Provincial 18, km 19",
        recomendaciones: [
            "Llevar protector solar y repelente de insectos",
            "Equipamiento para piscina en temporada estival",
            "Llevar alimentos o utilizar el servicio de gastronomía en el lugar",
            "Calzado cómodo para caminar por el predio",
            "Ropa de abrigo en temporada invernal",
            "Cámara fotográfica para capturar los paisajes"
        ],
        categorias: ["familiar", "recreacion", "aventura", "naturaleza"],
        tags: ["complejo", "piscina", "picnic", "camping", "juegos", "tirolesa", "canopy", "familia", "niños", "deporte"],
        horarioContacto: "Abierto: 10:00hs a 19:00hs todos los días."
    },
    {
        id: 8,
        nombre: "Parada Uno Cuatriciclos",
        tipo: "Vehículos Todo Terreno",
        descripcion: "Parada Uno Cuatriciclos ofrece emocionantes recorridos guiados en cuatriciclos por los senderos serranos que rodean Potrero de los Funes. Esta experiencia adrenalínica permite explorar lugares de difícil acceso, atravesando terrenos diversos como arroyos, bosques y formaciones rocosas. Los recorridos están disponibles para todos los niveles de experiencia, con opción de salidas cortas para principiantes y circuitos más desafiantes para usuarios avanzados.",
        imagen: cuatriImg,
        icono: FaMotorcycle,
        duracion: "1-3 horas",
        dificultad: "Variable según circuito",
        distancia: "Circuitos de 5 a 20 km",
        disponibilidad: "Todo el año (sujeto a condiciones climáticas)",
        puntoPartida: "Base Parada Uno - Av. del Circuito 1500",
        recomendaciones: [
            "No se requiere licencia de conducir específica",
            "Edad mínima: 16 años (menores acompañados por adulto)",
            "Usar ropa cómoda y que pueda ensuciarse",
            "Calzado cerrado obligatorio",
            "Se proporciona casco y equipo de seguridad",
            "Llevar hidratación y protección solar"
        ],
        categorias: ["aventura", "montaña", "motor"],
        tags: ["cuatriciclo", "quad", "atv", "todo terreno", "off-road", "adrenalina", "motor", "barro", "recorrido"],
        horarioContacto: "Salidas programadas: 9:00hs, 11:30hs, 14:00hs y 16:30hs."
    }
];

// Definición de categorías disponibles con sus iconos y colores
const categorias = [
    { id: 'todos', nombre: 'Todos', icono: FaLeaf, color: '#00add5' },
    { id: 'aventura', nombre: 'Aventura', icono: FaMountain, color: '#E67E22' },
    { id: 'acuatico', nombre: 'Acuático', icono: FaWater, color: '#3498DB' },
    { id: 'familiar', nombre: 'Familiar', icono: FaUmbrellaBeach, color: '#F1C40F' },
    { id: 'deporte', nombre: 'Deporte', icono: FaBiking, color: '#27AE60' },
    { id: 'naturaleza', nombre: 'Naturaleza', icono: FaTree, color: '#2ECC71' },
    { id: 'montaña', nombre: 'Montaña', icono: FaHiking, color: '#9B59B6' },
    { id: 'motor', nombre: 'Motor', icono: FaMotorcycle, color: '#E74C3C' },
    { id: 'recreacion', nombre: 'Recreación', icono: FaRoute, color: '#16A085' }
];

// Componente para tarjetas de actividades
const ActividadCard = ({ actividad, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow transform hover:-translate-y-1"
        onClick={() => onClick(actividad)}
    >
        <div className="relative h-64 overflow-hidden">
            <img
                src={actividad.imagen}
                alt={actividad.nombre}
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-2xl font-bold text-white">{actividad.nombre}</h3>
            </div>
        </div>
        <div className="p-6">
            <div className="flex items-start mb-4">
                <actividad.icono className="text-3xl text-[#00add5] mr-4 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-sm line-clamp-3">{actividad.descripcion}</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
                <span><FaMapMarkerAlt className="inline mr-1" />{actividad.tipo}</span>
                <span><FaClock className="inline mr-1" />{actividad.duracion}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1">
                {actividad.categorias.slice(0, 3).map((cat, index) => {
                    const categoria = categorias.find(c => c.id === cat);
                    return (
                        <span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full text-white"
                            style={{ backgroundColor: categoria ? categoria.color : '#999' }}
                        >
                            {categoria ? categoria.nombre : cat}
                        </span>
                    );
                })}
                {actividad.categorias.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                        +{actividad.categorias.length - 3}
                    </span>
                )}
            </div>
        </div>
    </motion.div>
);

// Componente para modal de detalle de actividad
const ActividadModal = ({ actividad, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-50 flex items-center justify-center" onClick={onClose}>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full mx-4 bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
        >
            {/* Header con imagen de fondo */}
            <div className="relative h-80">
                <img
                    src={actividad.imagen}
                    alt={actividad.nombre}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full transition-colors"
                >
                    <FaTimes className="text-white text-xl" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="flex items-center gap-2 bg-[#00add5] px-3 py-1 rounded-full text-sm">
                            <actividad.icono />
                            {actividad.tipo}
                        </span>
                        <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                            <FaClock />
                            {actividad.duracion}
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold">{actividad.nombre}</h2>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
                {/* Categorías */}
                <div className="mb-4 flex flex-wrap gap-2">
                    {actividad.categorias.map((cat, index) => {
                        const categoria = categorias.find(c => c.id === cat);
                        return (
                            <span
                                key={index}
                                className="text-sm px-3 py-1 rounded-full text-white flex items-center gap-1"
                                style={{ backgroundColor: categoria ? categoria.color : '#999' }}
                            >
                                {categoria && <categoria.icono className="text-xs" />}
                                {categoria ? categoria.nombre : cat}
                            </span>
                        );
                    })}
                </div>

                {/* Descripción */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Acerca de esta actividad</h3>
                    <p className="text-gray-700 leading-relaxed">{actividad.descripcion}</p>
                </div>

                {/* Detalles y datos prácticos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-[#00add5] mb-2 flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> Detalles
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                            <li><span className="font-medium">Dificultad:</span> {actividad.dificultad}</li>
                            <li><span className="font-medium">Duración:</span> {actividad.duracion}</li>
                            <li><span className="font-medium">Distancia:</span> {actividad.distancia}</li>
                            <li><span className="font-medium">Punto de partida:</span> {actividad.puntoPartida}</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-[#00add5] mb-2 flex items-center">
                            <FaClock className="mr-2" /> Información práctica
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                            <li><span className="font-medium">Disponibilidad:</span> {actividad.disponibilidad}</li>
                            <li><span className="font-medium">Horario:</span> {actividad.horarioContacto}</li>
                        </ul>
                    </div>
                </div>

                {/* Recomendaciones */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-[#00add5] mb-2 flex items-center">
                        <FaRoute className="mr-2" /> Recomendaciones:
                    </h4>
                    <ul className="list-disc list-inside text-gray-600">
                        {actividad.recomendaciones.map((recomendacion, index) => (
                            <li key={index}>{recomendacion}</li>
                        ))}
                    </ul>
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <h4 className="font-semibold text-[#00add5] mb-2 flex items-center">
                        <FaLeaf className="mr-2" /> Relacionado con:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {actividad.tags.map((tag, index) => (
                            <span key={index} className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cerrar
                    </button>
                    <a
                        href="/contacto"
                        className="px-4 py-2 bg-[#00add5] text-white rounded-lg hover:bg-[#008dad] transition-colors flex items-center gap-2"
                    >
                        <FaMapMarkerAlt />
                        Reservar
                    </a>
                </div>
            </div>
        </motion.div>
    </div>
);

// Componente para mensaje de no resultados
const NoResultsMessage = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
        <FaMountain className="text-6xl text-gray-400 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron actividades</h3>
        <p className="text-gray-500 text-center max-w-md">
            Lo sentimos, no pudimos encontrar actividades que coincidan con tu búsqueda.
            <br />
            Intenta con otros términos o explora todas nuestras opciones.
        </p>
    </div>
);

// Componente principal
function Naturaleza() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedActividad, setSelectedActividad] = useState(null);
    const [selectedCategoria, setSelectedCategoria] = useState('todos');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dificultadFilter, setDificultadFilter] = useState('todas');
    const dropdownRef = useRef(null);

    // Opciones de dificultad
    const dificultades = [
        { id: 'todas', nombre: 'Todas las dificultades' },
        { id: 'baja', nombre: 'Dificultad baja' },
        { id: 'media', nombre: 'Dificultad media' },
        { id: 'alta', nombre: 'Dificultad alta' }
    ];

    // Filtrar actividades según búsqueda, categoría y dificultad
    const filteredActividades = actividades.filter(actividad => {
        // Filtro por texto de búsqueda
        const matchesSearch =
            actividad.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            actividad.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            actividad.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            actividad.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        // Filtro por categoría
        const matchesCategoria = selectedCategoria === 'todos' ||
            actividad.categorias.includes(selectedCategoria);

        // Filtro por dificultad
        let matchesDificultad = true;
        if (dificultadFilter !== 'todas') {
            if (dificultadFilter === 'baja')
                matchesDificultad = actividad.dificultad.toLowerCase().includes('baja') ||
                    actividad.dificultad.toLowerCase().includes('muy baja');
            else if (dificultadFilter === 'media')
                matchesDificultad = actividad.dificultad.toLowerCase().includes('media');
            else if (dificultadFilter === 'alta')
                matchesDificultad = actividad.dificultad.toLowerCase().includes('alta');
        }

        return matchesSearch && matchesCategoria && matchesDificultad;
    });

    // Cerrar dropdown al hacer clic fuera
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
    }, []);

    return (
        <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center pt-8 mb-4 text-[#00add5]"
                >
                    Aventurate con Potrero Activa
                </motion.h1>                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg text-center mb-8 text-gray-700"
                >
                    Viví experiencias únicas en el corazón de las sierras puntanas.
                </motion.p>
                {/* Barra de búsqueda */}
                <div className="mb-6 flex justify-center">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Buscar actividades (ej: tirolesa, cuatriciclos, bicicleta...)."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00add5]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Filtros por categoría y dificultad */}
                <div className="mb-8">
                    {/* Filtros por categoría - versión móvil */}
                    <div className="md:hidden mb-4">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white"
                            >
                                <span className="flex items-center">
                                    <FaFilter className="mr-2 text-[#00add5]" />
                                    {categorias.find(cat => cat.id === selectedCategoria)?.nombre || 'Categorías'}
                                </span>
                                <FaChevronDown className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {categorias.map(categoria => (
                                        <button
                                            key={categoria.id}
                                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${selectedCategoria === categoria.id ? 'bg-gray-100 font-medium' : ''
                                                }`}
                                            onClick={() => {
                                                setSelectedCategoria(categoria.id);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <categoria.icono className="mr-2" style={{ color: categoria.color }} />
                                            {categoria.nombre}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Filtro de dificultad móvil */}
                        <div className="mt-2">
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                                value={dificultadFilter}
                                onChange={(e) => setDificultadFilter(e.target.value)}
                            >
                                {dificultades.map(dif => (
                                    <option key={dif.id} value={dif.id}>
                                        {dif.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Filtro de categorías - escritorio */}
                    <div className="hidden md:flex flex-wrap justify-center gap-2 mb-4">
                        {categorias.map(categoria => (
                            <button
                                key={categoria.id}
                                onClick={() => setSelectedCategoria(categoria.id)}
                                className={`px-4 py-2 rounded-full flex items-center transition-colors ${selectedCategoria === categoria.id
                                    ? 'text-white'
                                    : 'text-gray-700 border border-gray-300 bg-white hover:bg-gray-100'
                                    }`}
                                style={{
                                    backgroundColor: selectedCategoria === categoria.id ? categoria.color : ''
                                }}
                            >
                                <categoria.icono className="mr-2" />
                                {categoria.nombre}
                            </button>
                        ))}
                    </div>

                    {/* Filtro de dificultad - escritorio */}
                    <div className="hidden md:flex justify-center">
                        <div className="inline-flex rounded-md shadow-sm">
                            {dificultades.map(dif => (
                                <button
                                    key={dif.id}
                                    onClick={() => setDificultadFilter(dif.id)}
                                    className={`px-4 py-2 text-sm ${dif.id === 'todas' ? 'rounded-l-lg' : ''
                                        } ${dif.id === 'alta' ? 'rounded-r-lg' : ''
                                        } ${dificultadFilter === dif.id
                                            ? 'bg-[#00add5] text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                        } border border-gray-300`}
                                >
                                    {dif.nombre}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contador de resultados */}
                <div className="mb-6 text-center">
                    <p className="text-gray-600">
                        {filteredActividades.length === 0
                            ? 'No se encontraron actividades'
                            : `Mostrando ${filteredActividades.length} ${filteredActividades.length === 1 ? 'actividad' : 'actividades'}`}
                    </p>
                </div>

                {/* Grilla de actividades */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredActividades.length > 0 ? (
                        filteredActividades.map(actividad => (
                            <ActividadCard
                                key={actividad.id}
                                actividad={actividad}
                                onClick={() => setSelectedActividad(actividad)}
                            />
                        ))
                    ) : (
                        <NoResultsMessage />
                    )}
                </div>
            </div>
            <AnimatePresence>
                {selectedActividad && (
                    <ActividadModal
                        actividad={selectedActividad}
                        onClose={() => setSelectedActividad(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Naturaleza;