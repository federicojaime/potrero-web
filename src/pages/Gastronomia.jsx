import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaCocktail, FaCoffee, FaSearch, FaMapMarkerAlt, FaClock, FaPhone, FaTimes } from 'react-icons/fa';

const restaurantes = [
    {
        id: 1,
        nombre: "Parrilla El Asador",
        tipo: "Parrilla",
        descripcion: "Exquisitas carnes a la parrilla con vista al lago.",
        imagen: "/images/parrilla-el-asador.jpg",
        platos: ["Bife de chorizo", "Costillas de cerdo", "Choripán"],
        horario: "12:00 - 23:00",
        ubicacion: "Av. del Circuito 123",
        telefono: "+54 266 123-4567",
    },
    {
        id: 2,
        nombre: "Café del Lago",
        tipo: "Cafetería",
        descripcion: "Café artesanal y pastelería casera con vista panorámica.",
        imagen: "/images/cafe-del-lago.jpg",
        platos: ["Café de especialidad", "Medialunas", "Torta de chocolate"],
        horario: "08:00 - 20:00",
        ubicacion: "Calle Los Pinos 456",
        telefono: "+54 266 765-4321",
    },
    // Añade más restaurantes aquí
];

const RestauranteCard = ({ restaurante, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
        onClick={() => onClick(restaurante)}
    >
        <img src={restaurante.imagen} alt={restaurante.nombre} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{restaurante.nombre}</h3>
            <p className="text-gray-600 mb-4">{restaurante.descripcion}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span><FaUtensils className="inline mr-1" />{restaurante.tipo}</span>
                <span><FaClock className="inline mr-1" />{restaurante.horario}</span>
            </div>
        </div>
    </motion.div>
);

const RestauranteModal = ({ restaurante, onClose }) => (
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
                <h2 className="text-3xl font-bold text-[#00add5]">{restaurante.nombre}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <FaTimes size={24} />
                </button>
            </div>
            <img src={restaurante.imagen} alt={restaurante.nombre} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-gray-700 mb-4">{restaurante.descripcion}</p>
            <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Platos destacados:</h3>
                <ul className="list-disc list-inside">
                    {restaurante.platos.map((plato, index) => (
                        <li key={index}>{plato}</li>
                    ))}
                </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                    <FaClock className="mr-2 text-[#00add5]" />
                    <span>{restaurante.horario}</span>
                </div>
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-[#00add5]" />
                    <span>{restaurante.ubicacion}</span>
                </div>
                <div className="flex items-center">
                    <FaPhone className="mr-2 text-[#00add5]" />
                    <span>{restaurante.telefono}</span>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

const NoResultsMessage = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
        <FaUtensils className="text-6xl text-gray-400 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron restaurantes</h3>
        <p className="text-gray-500 text-center max-w-md">
            Lo sentimos, no pudimos encontrar restaurantes que coincidan con tu búsqueda.
            <br />
            Intenta con otros términos o explora todas nuestras opciones.
        </p>
    </div>
);

function Gastronomia() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRestaurante, setSelectedRestaurante] = useState(null);

    const filteredRestaurantes = restaurantes.filter(restaurante =>
        restaurante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurante.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-[#00add5]">Gastronomía en Potrero de los Funes</h1>
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Buscar restaurantes..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00add5]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRestaurantes.length > 0 ? (
                        filteredRestaurantes.map(restaurante => (
                            <RestauranteCard
                                key={restaurante.id}
                                restaurante={restaurante}
                                onClick={() => setSelectedRestaurante(restaurante)}
                            />
                        ))
                    ) : (
                        <NoResultsMessage />
                    )}
                </div>
            </div>
            <AnimatePresence>
                {selectedRestaurante && (
                    <RestauranteModal
                        restaurante={selectedRestaurante}
                        onClose={() => setSelectedRestaurante(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Gastronomia;