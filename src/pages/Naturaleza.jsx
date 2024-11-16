import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTree, FaLeaf, FaMountain, FaSearch, FaMapMarkerAlt, FaClock, FaTimes } from 'react-icons/fa';
import parqueImg from "../assets/imagenes/actividades/parque-nativo.jpg";

const areasNaturales = [
    {
        id: 1,
        nombre: "Reserva Natural del Lago",
        tipo: "Reserva",
        descripcion: "Área protegida que alberga diversa flora y fauna local.",
        imagen: parqueImg,
        actividades: ["Observación de aves", "Senderismo", "Fotografía"],
        ecosistema: "Lacustre y serrano",
        horario: "08:00 - 18:00",
        ubicacion: "Orilla norte del Lago Potrero de los Funes",
        recomendaciones: ["Llevar binoculares", "Usar repelente", "No alimentar a los animales"],
    },
    /*{
        id: 2,
        nombre: "Bosque de los Nogales",
        tipo: "Bosque",
        descripcion: "Antiguo bosque de nogales con senderos interpretativos.",
        imagen: "/images/bosque-nogales.jpg",
        actividades: ["Caminatas guiadas", "Meditación", "Picnic"],
        ecosistema: "Bosque serrano",
        horario: "09:00 - 17:00",
        ubicacion: "3 km al oeste del centro de Potrero de los Funes",
        recomendaciones: ["Llevar calzado cómodo", "Respetar la flora", "Llevar agua"],
    },*/
    // Añade más áreas naturales aquí
];

const AreaNaturalCard = ({ area, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
        onClick={() => onClick(area)}
    >
        <img src={area.imagen} alt={area.nombre} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{area.nombre}</h3>
            <p className="text-gray-600 mb-4">{area.descripcion}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span><FaTree className="inline mr-1" />{area.tipo}</span>
                <span><FaLeaf className="inline mr-1" />{area.ecosistema}</span>
            </div>
        </div>
    </motion.div>
);

const AreaNaturalModal = ({ area, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-[#00add5]">{area.nombre}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <FaTimes size={24} />
                </button>
            </div>
            <img src={area.imagen} alt={area.nombre} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-gray-700 mb-4">{area.descripcion}</p>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center">
                    <FaTree className="mr-2 text-[#00add5]" />
                    <span>{area.tipo}</span>
                </div>
                <div className="flex items-center">
                    <FaLeaf className="mr-2 text-[#00add5]" />
                    <span>{area.ecosistema}</span>
                </div>
                <div className="flex items-center">
                    <FaClock className="mr-2 text-[#00add5]" />
                    <span>{area.horario}</span>
                </div>
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-[#00add5]" />
                    <span>{area.ubicacion}</span>
                </div>
            </div>
            <h3 className="font-semibold mb-2">Actividades:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                {area.actividades.map((actividad, index) => (
                    <li key={index}>{actividad}</li>
                ))}
            </ul>
            <h3 className="font-semibold mb-2">Recomendaciones:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
                {area.recomendaciones.map((recomendacion, index) => (
                    <li key={index}>{recomendacion}</li>
                ))}
            </ul>
        </motion.div>
    </motion.div>
);

const NoResultsMessage = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
        <FaMountain className="text-6xl text-gray-400 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron áreas naturales</h3>
        <p className="text-gray-500 text-center max-w-md">
            Lo sentimos, no pudimos encontrar áreas naturales que coincidan con tu búsqueda.
            <br />
            Intenta con otros términos o explora todas nuestras opciones.
        </p>
    </div>
);

function Naturaleza() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArea, setSelectedArea] = useState(null);

    const filteredAreas = areasNaturales.filter(area =>
        area.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.ecosistema.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-[#00add5]">Naturaleza en Potrero de los Funes</h1>
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Buscar áreas naturales..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00add5]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAreas.length > 0 ? (
                        filteredAreas.map(area => (
                            <AreaNaturalCard
                                key={area.id}
                                area={area}
                                onClick={() => setSelectedArea(area)}
                            />
                        ))
                    ) : (
                        <NoResultsMessage />
                    )}
                </div>
            </div>
            <AnimatePresence>
                {selectedArea && (
                    <AreaNaturalModal
                        area={selectedArea}
                        onClose={() => setSelectedArea(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Naturaleza;