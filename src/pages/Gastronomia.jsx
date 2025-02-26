import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaClock, FaPhone, FaTimes, FaSearch, FaMapMarkerAlt, 
         FaInstagram, FaFacebook, FaCoffee, FaHamburger, FaPizzaSlice, 
         FaWineGlass, FaFire } from 'react-icons/fa';
import restaurantes from '../data/restaurantes';

// Función para obtener el ícono según el tipo de establecimiento
const getTipoIcon = (tipo) => {
    switch (tipo?.toLowerCase()) {
        case 'restaurante':
            return <FaUtensils className="text-[#00add5]" />;
        case 'cafetería':
            return <FaCoffee className="text-[#00add5]" />;
        case 'bar':
            return <FaWineGlass className="text-[#00add5]" />;
        case 'pizzería':
            return <FaPizzaSlice className="text-[#00add5]" />;
        case 'parrilla':
            return <FaFire className="text-[#00add5]" />;
        case 'comida rápida':
            return <FaHamburger className="text-[#00add5]" />;
        default:
            return <FaUtensils className="text-[#00add5]" />;
    }
};

const RestauranteCard = ({ restaurante, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow transform hover:-translate-y-1"
        onClick={() => onClick(restaurante)}
    >
        <div className="relative">
            <img 
                src={restaurante.imagen} 
                alt={restaurante.nombre} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400?text=Imagen+no+disponible';
                }}
            />
            <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg">
                {getTipoIcon(restaurante.tipo)}
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800">{restaurante.nombre}</h3>
            <p className="text-gray-600 mb-4 text-sm">{restaurante.direccion}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                {restaurante.horario && (
                    <span className="flex items-center">
                        <FaClock className="inline mr-1" />
                        Abierto
                    </span>
                )}
                {restaurante.telefono && restaurante.telefono !== 'Sin números' && (
                    <span className="flex items-center">
                        <FaPhone className="inline mr-1" />
                        Contactar
                    </span>
                )}
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
        onClick={onClose}
    >
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-3xl font-bold text-[#00add5] flex items-center gap-3">
                        {restaurante.nombre}
                        {getTipoIcon(restaurante.tipo)}
                    </h2>
                    <p className="text-gray-500 mt-1">{restaurante.direccion}</p>
                </div>
                <button 
                    onClick={onClose} 
                    className="text-gray-500 hover:text-gray-700 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <FaTimes size={24} />
                </button>
            </div>

            <img 
                src={restaurante.imagen} 
                alt={restaurante.nombre} 
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400?text=Imagen+no+disponible';
                }}
            />

            <div className="grid grid-cols-1 gap-6 mb-6">
                {restaurante.horario && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-gray-800 flex items-center gap-2">
                            <FaClock className="text-[#00add5]" />
                            Horarios
                        </h3>
                        <p className="text-gray-600">{restaurante.horario}</p>
                    </div>
                )}

                {restaurante.telefono && restaurante.telefono !== 'Sin números' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-gray-800 flex items-center gap-2">
                            <FaPhone className="text-[#00add5]" />
                            Contacto
                        </h3>
                        <p className="text-gray-600">{restaurante.telefono}</p>
                    </div>
                )}

                {restaurante.redesSociales && restaurante.redesSociales !== '' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-gray-800 flex items-center gap-2">
                            <FaInstagram className="text-[#00add5]" />
                            Redes Sociales
                        </h3>
                        <p className="text-gray-600">{restaurante.redesSociales}</p>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-2">
                <button 
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Cerrar
                </button>
                {restaurante.telefono && restaurante.telefono !== 'Sin números' && (
                    <a 
                        href={`tel:${restaurante.telefono}`}
                        className="px-4 py-2 bg-[#00add5] text-white rounded-lg hover:bg-[#008dad] transition-colors flex items-center gap-2"
                    >
                        <FaPhone />
                        Llamar
                    </a>
                )}
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
        restaurante.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-[#00add5]">
                    Gastronomía en Potrero de los Funes
                </h1>
                
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Buscar por nombre o dirección..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00add5] shadow-sm"
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