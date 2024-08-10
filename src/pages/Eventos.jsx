import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaSearch, FaTicketAlt, FaTimes } from 'react-icons/fa';

const eventos = [
    {
        id: 1,
        nombre: "Festival de Música en el Lago",
        tipo: "Concierto",
        descripcion: "Disfruta de los mejores artistas locales con el lago como escenario.",
        imagen: "/images/festival-musica.jpg",
        fecha: "2024-07-15",
        hora: "20:00",
        ubicacion: "Anfiteatro del Lago",
        precio: "$500",
        organizador: "Municipalidad de Potrero de los Funes",
    },
    {
        id: 2,
        nombre: "Carrera de Mountain Bike",
        tipo: "Deportivo",
        descripcion: "Desafía las montañas en esta emocionante competencia de ciclismo.",
        imagen: "/images/carrera-mtb.jpg",
        fecha: "2024-08-22",
        hora: "09:00",
        ubicacion: "Circuito Serrano",
        precio: "$300",
        organizador: "Club Ciclista Potrero",
    },
    // Añade más eventos aquí
];

const EventoCard = ({ evento, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
        onClick={() => onClick(evento)}
    >
        <img src={evento.imagen} alt={evento.nombre} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{evento.nombre}</h3>
            <p className="text-gray-600 mb-4">{evento.descripcion}</p>
            <div className="flex flex-col text-sm text-gray-500">
                <span><FaCalendarAlt className="inline mr-2" />{new Date(evento.fecha).toLocaleDateString()}</span>
                <span><FaClock className="inline mr-2" />{evento.hora}</span>
                <span><FaMapMarkerAlt className="inline mr-2" />{evento.ubicacion}</span>
            </div>
        </div>
    </motion.div>
);

const EventoModal = ({ evento, onClose }) => (
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
                <h2 className="text-3xl font-bold text-[#00add5]">{evento.nombre}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <FaTimes size={24} />
                </button>
            </div>
            <img src={evento.imagen} alt={evento.nombre} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-gray-700 mb-4">{evento.descripcion}</p>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-[#00add5]" />
                    <span>{new Date(evento.fecha).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                    <FaClock className="mr-2 text-[#00add5]" />
                    <span>{evento.hora}</span>
                </div>
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-[#00add5]" />
                    <span>{evento.ubicacion}</span>
                </div>
                <div className="flex items-center">
                    <FaTicketAlt className="mr-2 text-[#00add5]" />
                    <span>{evento.precio}</span>
                </div>
            </div>
            <p className="text-sm text-gray-600">Organizado por: {evento.organizador}</p>
        </motion.div>
    </motion.div>
);

const NoResultsMessage = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
        <FaCalendarAlt className="text-6xl text-gray-400 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron eventos</h3>
        <p className="text-gray-500 text-center max-w-md">
            Lo sentimos, no pudimos encontrar eventos que coincidan con tu búsqueda.
            <br />
            Intenta con otros términos o explora todas nuestras opciones.
        </p>
    </div>
);

function Eventos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEvento, setSelectedEvento] = useState(null);

    const filteredEventos = eventos.filter(evento =>
        evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evento.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-[#00add5]">Eventos en Potrero de los Funes</h1>
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Buscar eventos..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00add5]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEventos.length > 0 ? (
                        filteredEventos.map(evento => (
                            <EventoCard
                                key={evento.id}
                                evento={evento}
                                onClick={() => setSelectedEvento(evento)}
                            />
                        ))
                    ) : (
                        <NoResultsMessage />
                    )}
                </div>
            </div>
            <AnimatePresence>
                {selectedEvento && (
                    <EventoModal
                        evento={selectedEvento}
                        onClose={() => setSelectedEvento(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Eventos;