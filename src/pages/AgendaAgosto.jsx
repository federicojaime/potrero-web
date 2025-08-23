
// src/pages/AgendaAgosto.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaCalendarAlt, FaMusic, FaTheaterMasks, FaMapMarkerAlt, 
    FaClock, FaPhone, FaInfoCircle, FaFire, FaUsers
} from 'react-icons/fa';

// Datos de eventos basados en las imágenes
const eventosAgosto = [
    // EVENTOS DEL 15 DE AGOSTO - HOY
    {
        id: 1,
        fecha: '15',
        dia: 'Jueves',
        mes: 'AGO 2025',
        titulo: 'Maru Animaciones DÍA DEL NIÑO',
        horario: '15:00 A 18:00',
        ubicacion: 'Polideportivo Municipal Los Paraísos S/N',
        categoria: 'Familiar',
        icon: FaUsers,
        color: '#E91E63',
        destacado: true
    },
    {
        id: 2,
        fecha: '15',
        dia: 'Jueves',
        mes: 'AGO 2025',
        titulo: 'Vino, Pastelería y Arte "CARINA LEVIN"',
        horario: '20:00',
        ubicacion: 'Lunamakena - Los Membrillos y Las Higueras',
        reservas: '2664302349',
        categoria: 'Cultural',
        icon: FaTheaterMasks,
        color: '#9C27B0'
    },
    {
        id: 3,
        fecha: '15',
        dia: 'Jueves',
        mes: 'AGO 2025',
        titulo: 'Show en Vivo "LUCHO SOSA"',
        horario: '22:00',
        ubicacion: 'Calle 7 - Av. Circuito Acceso A7',
        reservas: '2664642151',
        categoria: 'Musical',
        icon: FaMusic,
        color: '#FF5722',
        destacado: true
    },

    // EVENTOS DEL 16 DE AGOSTO - MAÑANA
    {
        id: 4,
        fecha: '16',
        dia: 'Viernes',
        mes: 'AGO 2025',
        titulo: 'Show Room "CLAUDIA BUSSETTI"',
        horario: '15:30',
        ubicacion: 'Lunamakena - Los Membrillos y Las Higueras',
        reservas: '2664302349',
        categoria: 'Cultural',
        icon: FaTheaterMasks,
        color: '#9C27B0'
    },
    {
        id: 5,
        fecha: '16',
        dia: 'Viernes',
        mes: 'AGO 2025',
        titulo: 'Clases de Salsa y Bachata',
        horario: '16:00 A 18:00',
        ubicacion: 'Academia Son Melao - Paseo de los Artesanos "Laura Amaya" Acceso A9',
        inscripciones: '2665042929',
        categoria: 'Recreativo',
        icon: FaUsers,
        color: '#FF9800'
    },
    {
        id: 6,
        fecha: '16',
        dia: 'Viernes',
        mes: 'AGO 2025',
        titulo: 'Show en Vivo "SIN SALDO"',
        horario: '22:00',
        ubicacion: 'Calle 7 - Av. Circuito Acceso A7',
        reservas: '2664642151',
        categoria: 'Musical',
        icon: FaMusic,
        color: '#FF5722',
        destacado: true
    },
    {
        id: 7,
        fecha: '16',
        dia: 'Viernes',
        mes: 'AGO 2025',
        titulo: 'Fiesta Retro DJ RICHARD UN TAL RENE',
        horario: '22:00',
        ubicacion: 'Los Paraísos 915',
        reservas: '2664655509',
        categoria: 'Musical',
        icon: FaMusic,
        color: '#3F51B5'
    },

    // EVENTOS DEL 17 DE AGOSTO - SÁBADO
    {
        id: 8,
        fecha: '17',
        dia: 'Sábado',
        mes: 'AGO 2025',
        titulo: 'DÍA DEL NIÑO Paseo de los Artesanos "LAURA AMAYA" "RULO Y RAFA"',
        horario: '16:00',
        ubicacion: 'Av. Circuito Acceso A9',
        categoria: 'Familiar',
        icon: FaUsers,
        color: '#E91E63',
        destacado: true
    }
];

// Función para verificar si un evento ya pasó
const yaTranscurrio = (fechaEvento) => {
    const hoy = new Date();
    const diaHoy = hoy.getDate();
    const mesHoy = hoy.getMonth() + 1; // Agosto = 8
    
    const diaEvento = parseInt(fechaEvento);
    const mesEvento = 8; // Agosto
    
    // Si es un mes anterior o día anterior, ya transcurrió
    if (mesEvento < mesHoy) return true;
    if (mesEvento === mesHoy && diaEvento < diaHoy) return true;
    
    return false;
};

// Filtrar solo eventos que no han transcurrido
const eventosProximos = eventosAgosto.filter(evento => !yaTranscurrio(evento.fecha));

// Componente para cada evento
const EventCard = ({ evento }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-l-4 ${
                evento.destacado ? 'ring-2 ring-yellow-400 shadow-xl' : ''
            }`}
            style={{ borderLeftColor: evento.color }}
        >
            {/* Header del evento */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center">
                    <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                        style={{ backgroundColor: `${evento.color}20` }}
                    >
                        <evento.icon style={{ color: evento.color }} size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-800">{evento.fecha}</div>
                        <div className="text-sm text-gray-600">{evento.dia}</div>
                        <div className="text-xs text-gray-500">{evento.mes}</div>
                    </div>
                </div>
                
                {evento.destacado && (
                    <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                        ⭐ Destacado
                    </div>
                )}
                
                <span 
                    className="text-xs px-2 py-1 rounded-full text-white font-medium"
                    style={{ backgroundColor: evento.color }}
                >
                    {evento.categoria}
                </span>
            </div>

            {/* Contenido del evento */}
            <div className="p-4">
                <h3 className="font-bold text-lg mb-3 text-gray-800 leading-tight">
                    {evento.titulo}
                </h3>
                
                <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                        <FaClock className="mr-2 flex-shrink-0" size={14} />
                        <span className="text-sm">{evento.horario}</span>
                    </div>
                    
                    <div className="flex items-start text-gray-600">
                        <FaMapMarkerAlt className="mr-2 mt-1 flex-shrink-0" size={14} />
                        <span className="text-sm">{evento.ubicacion}</span>
                    </div>
                    
                    {(evento.reservas || evento.inscripciones) && (
                        <div className="flex items-center text-blue-600 mt-3">
                            <FaPhone className="mr-2 flex-shrink-0" size={14} />
                            <span className="text-sm font-medium">
                                {evento.reservas ? `Reservas: ${evento.reservas}` : `Inscripciones: ${evento.inscripciones}`}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// Componente principal
const AgendaAgosto = () => {
    const [eventosDelDia, setEventosDelDia] = useState([]);
    const [otrosEventos, setOtrosEventos] = useState([]);

    useEffect(() => {
        const hoy = new Date().getDate();
        
        // Separar eventos de hoy y próximos eventos
        const hoyEventos = eventosProximos.filter(evento => parseInt(evento.fecha) === hoy);
        const proximosEventos = eventosProximos.filter(evento => parseInt(evento.fecha) > hoy);
        
        setEventosDelDia(hoyEventos);
        setOtrosEventos(proximosEventos);
    }, []);

    return (
        <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block bg-blue-100 rounded-full px-4 py-1 mb-4">
                        <FaCalendarAlt className="inline-block mr-2 text-blue-600" />
                        <span className="text-blue-800 font-medium">Agosto 2025</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                        Agenda de Eventos
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        No te pierdas los eventos más esperados en Potrero de los Funes
                    </p>
                </motion.div>

                {/* Eventos de hoy */}
                {eventosDelDia.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-12"
                    >
                        <div className="flex items-center mb-6">
                            <FaFire className="text-red-500 mr-3" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800">¡Hoy!</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {eventosDelDia.map((evento) => (
                                <EventCard key={evento.id} evento={evento} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Próximos eventos */}
                {otrosEventos.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center mb-6">
                            <FaCalendarAlt className="text-blue-500 mr-3" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800">Próximos Eventos</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otrosEventos.map((evento) => (
                                <EventCard key={evento.id} evento={evento} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Si no hay eventos próximos */}
                {eventosProximos.length === 0 && (
                    <div className="text-center py-16">
                        <FaInfoCircle className="text-6xl text-gray-400 mb-4 mx-auto" />
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            No hay eventos próximos
                        </h3>
                        <p className="text-gray-500">
                            Mantente atento a nuestras redes sociales para más novedades
                        </p>
                    </div>
                )}

                {/* Footer informativo */}
                <div className="mt-16 bg-blue-50 p-6 rounded-xl text-center">
                    <div className="flex items-center justify-center mb-2">
                        <FaInfoCircle className="text-blue-600 mr-2" />
                        <span className="text-blue-800 font-medium">Información importante</span>
                    </div>
                    <p className="text-gray-700">
                        Los eventos están sujetos a cambios por condiciones climáticas. 
                        Para más información contactá a la Oficina de Turismo.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AgendaAgosto;