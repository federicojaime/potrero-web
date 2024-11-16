import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRoute, FaClock, FaMountain, FaSearch, FaRuler, FaTimes } from 'react-icons/fa';
import miradorImg from "../assets/imagenes/actividades/mirador-lago.jpg";
import travesiaImg from "../assets/imagenes/actividades/travesia.jpg";


const circuitos = [
    {
        id: 1,
        nombre: "Circuito del Lago",
        tipo: "Senderismo",
        descripcion: "Recorre los alrededores del lago disfrutando de vistas panorámicas.",
        imagen: miradorImg,
        duracion: "2 horas",
        dificultad: "Fácil",
        distancia: "5 km",
        puntoPartida: "Centro de Visitantes",
        recomendaciones: ["Llevar agua", "Usar protector solar", "Calzado cómodo"],
    },
    {
        id: 2,
        nombre: "Ruta de las Sierras",
        tipo: "Mountain Bike",
        descripcion: "Desafiante circuito para ciclistas a través de las sierras puntanas.",
        imagen: travesiaImg,
        duracion: "4 horas",
        dificultad: "Difícil",
        distancia: "25 km",
        puntoPartida: "Plaza Central",
        recomendaciones: ["Llevar kit de reparación", "Usar casco", "Hidratación abundante"],
    },
    // Añade más circuitos aquí
];

const CircuitoCard = ({ circuito, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
        onClick={() => onClick(circuito)}
    >
        <img src={circuito.imagen} alt={circuito.nombre} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{circuito.nombre}</h3>
            <p className="text-gray-600 mb-4">{circuito.descripcion}</p>
            <div className="flex flex-col text-sm text-gray-500">
                <span><FaRoute className="inline mr-2" />{circuito.tipo}</span>
                <span><FaClock className="inline mr-2" />{circuito.duracion}</span>
                <span><FaMountain className="inline mr-2" />{circuito.dificultad}</span>
            </div>
        </div>
    </motion.div>
);

const CircuitoModal = ({ circuito, onClose }) => (
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
                <h2 className="text-3xl font-bold text-[#00add5]">{circuito.nombre}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <FaTimes size={24} />
                </button>
            </div>
            <img src={circuito.imagen} alt={circuito.nombre} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-gray-700 mb-4">{circuito.descripcion}</p>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center">
                    <FaRoute className="mr-2 text-[#00add5]" />
                    <span>{circuito.tipo}</span>
                </div>
                <div className="flex items-center">
                    <FaClock className="mr-2 text-[#00add5]" />
                    <span>{circuito.duracion}</span>
                </div>
                <div className="flex items-center">
                    <FaMountain className="mr-2 text-[#00add5]" />
                    <span>{circuito.dificultad}</span>
                </div>
                <div className="flex items-center">
                    <FaRuler className="mr-2 text-[#00add5]" />
                    <span>{circuito.distancia}</span>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Punto de partida: {circuito.puntoPartida}</p>
            <h3 className="font-semibold mb-2">Recomendaciones:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
                {circuito.recomendaciones.map((recomendacion, index) => (
                    <li key={index}>{recomendacion}</li>
                ))}
            </ul>
        </motion.div>
    </motion.div>
);

const NoResultsMessage = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
        <FaRoute className="text-6xl text-gray-400 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron circuitos</h3>
        <p className="text-gray-500 text-center max-w-md">
            Lo sentimos, no pudimos encontrar circuitos que coincidan con tu búsqueda.
            <br />
            Intenta con otros términos o explora todas nuestras opciones.
        </p>
    </div>
);

function Circuitos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCircuito, setSelectedCircuito] = useState(null);

    const filteredCircuitos = circuitos.filter(circuito =>
        circuito.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        circuito.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-[#00add5]">Circuitos Turísticos de Potrero de los Funes</h1>
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Buscar circuitos..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00add5]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCircuitos.length > 0 ? (
                        filteredCircuitos.map(circuito => (
                            <CircuitoCard
                                key={circuito.id}
                                circuito={circuito}
                                onClick={() => setSelectedCircuito(circuito)}
                            />
                        ))
                    ) : (
                        <NoResultsMessage />
                    )}
                </div>
            </div>
            <AnimatePresence>
                {selectedCircuito && (
                    <CircuitoModal
                        circuito={selectedCircuito}
                        onClose={() => setSelectedCircuito(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Circuitos;