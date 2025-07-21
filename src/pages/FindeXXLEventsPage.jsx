// src/pages/FindeXXLEventsPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaCalendarAlt, FaMusic, FaHiking, FaLeaf, FaTheaterMasks,
    FaWineGlassAlt, FaMapMarkerAlt, FaClock, FaArrowLeft,
    FaGraduationCap
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { autumnColors } from '../theme/AutumnTheme';

// Componente de tarjeta para cada evento
const EventCard = ({ event, isHighlighted }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow 
        ${isHighlighted ? 'ring-2 ring-amber-500 transform hover:-translate-y-1' : ''}`}
        >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                    <event.icon className="text-lg mr-3" style={{ color: event.color }} />
                    <h3 className="font-medium">{event.title}</h3>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{event.category}</span>
            </div>

            <div className="p-4">
                <div className="flex items-start mb-2">
                    <FaClock className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{event.time}</span>
                </div>

                {event.location && (
                    <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{event.location}</span>
                    </div>
                )}

                {event.description && (
                    <p className="mt-3 text-gray-600 text-sm">{event.description}</p>
                )}

                {event.reservations && (
                    <div className="mt-2 text-sm text-amber-800">
                        <span className="font-medium">Reservas: </span>
                        {event.reservations}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Componente de sección para cada día
const DaySection = ({ day, events, activeDate }) => {
    const isActive = activeDate === day.date;

    return (
        <div className="mb-10">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`flex items-center mb-6 pb-2 border-b ${isActive ? 'border-amber-500' : 'border-gray-200'
                    }`}
            >
                <div className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4 ${isActive ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                    {day.dayNumber}
                </div>
                <div>
                    <h2 className={`text-xl sm:text-2xl font-bold ${isActive ? 'text-amber-800' : 'text-gray-800'}`}>
                        {day.name}
                    </h2>
                    <p className="text-sm text-gray-500">{day.date} de Mayo</p>
                </div>
            </motion.div>

            {/* Grilla de eventos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        event={event}
                        isHighlighted={event.highlight}
                    />
                ))}
            </div>
        </div>
    );
};

// Componente principal de la página de eventos
const FindeXXLEventsPage = () => {
    const [activeDate, setActiveDate] = useState('1');
    const [isMobile, setIsMobile] = useState(false);

    // Definición de los días
    const days = [
        { name: 'Jueves', date: '1', dayNumber: 1 },
        { name: 'Viernes', date: '2', dayNumber: 2 },
        { name: 'Sábado', date: '3', dayNumber: 3 },
        { name: 'Domingo', date: '4', dayNumber: 4 },
    ];

    // Detectar si es móvil y seleccionar el día actual
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Obtener fecha actual del sistema
        const today = new Date();
        // Usamos un ejemplo para mayo 2025 pero consideramos la fecha actual para demo
        const currentDay = today.getDate();

        // Determinar qué día mostrar al inicio
        let dayToShow;

        // Para demostración, tomamos la fecha actual y simulamos que estamos en mayo
        // Esto permite a la demo mostrar el día "actual" incluso fuera del rango del evento
        if (currentDay >= 1 && currentDay <= 4) {
            // Si la fecha actual está entre 1 y 4, usamos ese día
            dayToShow = String(currentDay);
        } else if (currentDay > 4) {
            // Si es después del 4, mostramos el día 4 (último día)
            dayToShow = '4';
        } else {
            // En cualquier otro caso, mostramos el día 1 (primer día)
            dayToShow = '1';
        }

        // Establecer el día activo
        setActiveDate(dayToShow);

        // En móviles, hacer scroll al contenido después de seleccionar el día
        if (isMobile) {
            setTimeout(() => {
                const contentElement = document.getElementById('day-content');
                if (contentElement) {
                    contentElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, [isMobile]);

    // Definición de los eventos para cada día (basado en las imágenes compartidas)
    const eventsByDate = {
        '1': [
            {
                title: 'Salidas Astronómicas',
                time: '18:00hs',
                location: 'Mirador de Potrero',
                category: 'Turístico',
                icon: FaHiking,
                color: '#27AE60',
                reservations: '2346-482385 (Cupos limitados)',
                highlight: true
            },
            {
                title: 'Show "Mariela Herrera"',
                time: '22:30hs',
                location: 'Calle 7',
                category: 'Musical',
                icon: FaMusic,
                color: '#8E44AD',
                reservations: '2664642151',
                description: 'Av del Circuito y Acceso A7',
                highlight: true
            }
        ],
        '2': [
            {
                title: 'La Variante Fusion Latinoamericana',
                time: '17:00hs',
                location: 'Paseo de Artesanos "Laura Amaya"',
                category: 'Cultural',
                icon: FaMusic,
                color: '#8E44AD',
                description: 'Acceso A9',
                highlight: true
            },
            {
                title: 'Excursión "Noches Mágicas"',
                time: '18:00hs',
                location: 'Oficina de Turismo Acceso A2',
                category: 'Turístico',
                icon: FaHiking,
                color: '#27AE60',
                reservations: '2664731804',
                highlight: true
            },
            {
                title: 'Salidas Astronómicas',
                time: '18:30hs',
                location: 'Mirador de Potrero',
                category: 'Turístico',
                icon: FaHiking,
                color: '#27AE60',
                reservations: '2346-482385 (Cupos limitados)',
                highlight: true
            },
            {
                title: 'Show "No va más"',
                time: '22:30hs',
                location: 'Calle 7',
                category: 'Musical',
                icon: FaMusic,
                color: '#8E44AD',
                reservations: '2664642151',
                description: 'Av del Circuito y Acceso A7',
                highlight: true
            }

        ],
        '3': [
            {
                title: 'Excursión "Laguna de las Uvas"',
                time: '09:30hs',
                location: 'Salidas desde la Comisaría',
                category: 'Turístico',
                icon: FaHiking,
                color: '#27AE60',
                reservations: '2664731804',
                highlight: true
            },
            {
                title: 'Show "La Variante Fusion Latinoamericana"',
                time: '17:00hs',
                location: 'Paseo de Artesanos "Laura Amaya"',
                category: 'Cultural',
                icon: FaMusic,
                color: '#8E44AD',
                description: 'Acceso A9',
                highlight: true
            },
            {
                title: 'Salidas Astronómicas',
                time: '18:30hs',
                location: 'Mirador de Potrero',
                category: 'Turístico',
                icon: FaHiking,
                color: '#27AE60',
                reservations: '2346-482385 (Cupos limitados)',
                highlight: true
            }, {
                title: 'Show "Maxi"',
                time: '22:30hs',
                location: 'Un Tal Rene',
                category: 'Musical',
                icon: FaMusic,
                color: '#8E44AD',
                reservations: '2664211335',
                description: 'Los Paraísos 915',
                highlight: true
            },
            {
                title: 'Show "La Colo"',
                time: '23:00hs',
                location: 'Calle 7',
                category: 'Musical',
                icon: FaMusic,
                color: '#8E44AD',
                reservations: '2664642151',
                description: 'Av del Circuito y Acceso A7',
                highlight: true
            },
        ],
        '4': [

            {
                title: 'Feria Emprendedora "Edición Otoño"',
                time: '14:00hs',
                location: 'Parque Nativo',
                category: 'Feria',
                icon: FaLeaf,
                color: '#D35400',
                description: 'Entrada sin costo - Av del Circuito y Acceso A1',
                highlight: true
            },
            {
                title: 'Salidas Astronómicas',
                time: '18:30hs',
                location: 'Mirador de Potrero',
                category: 'Turístico',
                icon: FaHiking,
                color: '#27AE60',
                reservations: '2346-482385 (Cupos limitados)',
                highlight: true
            }
        ]
    };

    // Cambiar la fecha activa
    const handleDateChange = (date) => {
        setActiveDate(date);

        // En móviles, hacer scroll al contenido
        if (isMobile) {
            setTimeout(() => {
                const contentElement = document.getElementById('day-content');
                if (contentElement) {
                    contentElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    // Función para verificar si un día ya pasó
    const isDayPassed = (dayDate) => {
        // Obtener fecha actual
        const today = new Date();
        const currentMonth = today.getMonth() + 1; // getMonth() devuelve 0-11
        const currentDay = today.getDate();

        // Comparar fechas (asumiendo mayo)
        if (currentMonth > 5) return true;
        if (currentMonth === 5 && currentDay > parseInt(dayDate)) return true;
        return false;
    };

    return (
        <div className="min-h-screen py-6 sm:py-16 bg-gradient-to-b from-amber-50 to-white">
            <div className="container mx-auto px-4">
                {/* Botón para volver */}
                <div className="mb-6">
                    <Link to="/eventos" className="inline-flex items-center text-amber-700 hover:text-amber-900">
                        <FaArrowLeft className="mr-2" />
                        <span>Volver a Eventos</span>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <span className="inline-block bg-amber-100 rounded-full px-4 py-1 mb-4">
                        <FaCalendarAlt className="inline-block mr-2 text-amber-600" />
                        <span className="text-amber-800 font-medium">1-4 Mayo 2025</span>
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-amber-900">
                        Agenda Finde XXL
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
                        Disfrutá de una programación especial de actividades culturales, musicales y turísticas
                        durante el finde largo de Mayo en el maravilloso entorno natural de Potrero de los Funes.
                    </p>
                </motion.div>

                {/* Navegación de fechas */}
                <div className="mb-8 sm:mb-12 overflow-x-auto pb-2">
                    <div className="flex flex-nowrap justify-start sm:justify-center gap-3 min-w-min">
                        {days.map((day) => {
                            const isPast = isDayPassed(day.date);

                            return (
                                <button
                                    key={day.date}
                                    onClick={() => handleDateChange(day.date)}
                                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center transition-colors whitespace-nowrap ${activeDate === day.date
                                        ? 'bg-amber-600 text-white'
                                        : isPast
                                            ? 'bg-gray-100 border border-gray-300 text-gray-500 hover:bg-gray-200'
                                            : 'bg-white border border-amber-300 text-amber-800 hover:bg-amber-50'
                                        }`}
                                >
                                    <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mr-2 ${activeDate === day.date
                                        ? 'bg-amber-500'
                                        : isPast
                                            ? 'bg-gray-200'
                                            : 'bg-amber-100'
                                        }`}>
                                        {day.dayNumber}
                                    </span>
                                    <span className="text-sm sm:text-base">
                                        {isPast ? (
                                            <span className="flex items-center">
                                                {day.name}
                                                <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-1 rounded">Pasado</span>
                                            </span>
                                        ) : (
                                            day.name
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Leyenda de categorías */}
                <div className="mb-6 sm:mb-10 flex flex-wrap justify-center gap-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span className="text-sm text-gray-700">Eventos destacados</span>
                    </div>
                    <div className="flex items-center">
                        <FaMusic className="text-sm mr-2" style={{ color: '#8E44AD' }} />
                        <span className="text-sm text-gray-700">Musical</span>
                    </div>
                    <div className="flex items-center">
                        <FaHiking className="text-sm mr-2" style={{ color: '#27AE60' }} />
                        <span className="text-sm text-gray-700">Turístico</span>
                    </div>
                    <div className="flex items-center">
                        <FaLeaf className="text-sm mr-2" style={{ color: '#D35400' }} />
                        <span className="text-sm text-gray-700">Feria</span>
                    </div>
                </div>

                {/* Contenido del día seleccionado */}
                <div id="day-content">
                    {days.map((day) => (
                        activeDate === day.date && (
                            <DaySection
                                key={day.date}
                                day={day}
                                events={eventsByDate[day.date]}
                                activeDate={activeDate}
                            />
                        )
                    ))}
                </div>

                {/* Nota al pie */}
                <div className="mt-10 sm:mt-16 bg-amber-50 p-4 sm:p-6 rounded-xl shadow-inner text-center">
                    <p className="flex items-center justify-center text-amber-800 text-sm sm:text-base">
                        <FaLeaf className="mr-2" />
                        Actividades sujetas a cambios por condiciones climáticas. Consultar en la Oficina de Turismo.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FindeXXLEventsPage;