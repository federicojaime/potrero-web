// src/pages/EasterEventsPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaChurch, FaTheaterMasks, FaHiking, FaMusic, 
         FaBook, FaWalking, FaMountain, FaWineGlassAlt, FaMoon, 
         FaLeaf, FaMapMarkerAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
        className={`flex items-center mb-6 pb-2 border-b ${
          isActive ? 'border-amber-500' : 'border-gray-200'
        }`}
      >
        <div className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4 ${
          isActive ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'
        }`}>
          {day.dayNumber}
        </div>
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold ${isActive ? 'text-amber-800' : 'text-gray-800'}`}>
            {day.name}
          </h2>
          <p className="text-sm text-gray-500">{day.date}</p>
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
const EasterEventsPage = () => {
  const [activeDate, setActiveDate] = useState('17/4');
  const [isMobile, setIsMobile] = useState(false);
  
  // Definición de los días
  const days = [
    { name: 'Jueves Santo', date: '17/4', dayNumber: 17 },
    { name: 'Viernes Santo', date: '18/4', dayNumber: 18 },
    { name: 'Sábado Santo', date: '19/4', dayNumber: 19 },
    { name: 'Domingo de Resurrección', date: '20/4', dayNumber: 20 },
  ];
  
  // Detectar si es móvil para ajustar la visualización y seleccionar el día actual
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Seleccionar el día actual o el más cercano
    const today = new Date();
    const dayOfMonth = today.getDate();
    const month = today.getMonth() + 1; // getMonth() devuelve 0-11
    
    // Si estamos en abril 2025 (mes 4)
    if (month === 4 && dayOfMonth >= 17 && dayOfMonth <= 20) {
      // Estamos en los días de Semana Santa, seleccionar el día actual
      setActiveDate(`${dayOfMonth}/4`);
    } else {
      // Si estamos antes del 17/4, mostrar el primer día
      if (month < 4 || (month === 4 && dayOfMonth < 17)) {
        setActiveDate('17/4');
      } 
      // Si estamos después del 20/4, mostrar el último día
      else if (month > 4 || (month === 4 && dayOfMonth > 20)) {
        setActiveDate('20/4');
      }
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Definición de los eventos para cada día
  const eventsByDate = {
    '17/4': [
      {
        title: 'Misa de lavado de pies',
        time: '20:00hs',
        location: 'Parroquia San Antonio de Padua',
        category: 'Litúrgico',
        icon: FaChurch,
        color: '#5D4037',
        highlight: true
      },
      {
        title: 'Adoración al santísimo',
        time: '21:30 a 11:00hs',
        location: 'Parroquia San Antonio de Padua',
        category: 'Litúrgico',
        icon: FaChurch,
        color: '#5D4037'
      },
      {
        title: 'Caminata saludable con yoga',
        time: '10:30hs',
        location: 'Punto de encuentro: Oficina de Turismo',
        category: 'Turístico',
        icon: FaHiking,
        color: '#27AE60',
        description: 'Actividad gratuita para todas las edades'
      },
      {
        title: 'Yamanti dúo (jazz del monte)',
        time: '21hs',
        location: 'Caja de los Trebejos - Salón de arte',
        category: 'Cultural',
        icon: FaMusic,
        color: '#8E44AD',
        highlight: true
      }
    ],
    '18/4': [
      {
        title: 'Celebración de la Pasión',
        time: '15hs',
        location: 'Parroquia San Antonio de Padua',
        category: 'Litúrgico',
        icon: FaChurch,
        color: '#5D4037',
        highlight: true
      },
      {
        title: 'Vía Crucis Viviente',
        time: '19:00hs',
        location: 'Desde el Paseo de Artesanos hasta Parroquia San Antonio de Padua',
        category: 'Litúrgico',
        icon: FaChurch,
        color: '#5D4037',
        highlight: true
      },
      {
        title: 'Trailer spoiler "el único"',
        time: '18hs',
        location: 'Caja de los Trebejos - Salón de arte',
        category: 'Cultural',
        icon: FaTheaterMasks,
        color: '#8E44AD'
      },
      {
        title: 'Caminata nocturna con antorchas',
        time: '18:30hs',
        location: 'Mirador de potrero - Salida: Oficina de turismo',
        category: 'Turístico',
        icon: FaMoon,
        color: '#27AE60',
        description: 'Recorrido nocturno con guía especializado',
        highlight: true
      },
      {
        title: 'Chelco rezzano "retratos-autorretratos"',
        time: '21hs',
        location: 'Caja de los Trebejos - Salón de arte',
        category: 'Cultural',
        icon: FaTheaterMasks,
        color: '#8E44AD'
      },
      {
        title: 'Show "caníbales" tributo a Soda Stereo',
        time: '22hs',
        location: 'Calle 7, av. del circuito (acceso a7)',
        category: 'Musical',
        icon: FaMusic,
        color: '#8E44AD',
        description: 'Reservas al 2664642151',
        highlight: true
      }
    ],
    '19/4': [
      {
        title: 'Misa',
        time: '20hs',
        location: 'Parroquia San Antonio de Padua',
        category: 'Litúrgico',
        icon: FaChurch,
        color: '#5D4037'
      },
      {
        title: 'Subasta de libros',
        time: '17hs',
        location: 'Paseo de artesanos (biblioteca urbano j. nuñez)',
        category: 'Cultural',
        icon: FaBook,
        color: '#8E44AD',
        highlight: true
      },
      {
        title: 'Plataforma polvo',
        time: '18hs',
        location: 'Caja de los Trebejos - Salón de arte',
        category: 'Cultural',
        icon: FaTheaterMasks,
        color: '#8E44AD'
      },
      {
        title: 'Caminata nocturna con antorchas',
        time: '18:30hs',
        location: 'Mirador de potrero - Salida: Oficina de turismo',
        category: 'Turístico',
        icon: FaWalking,
        color: '#27AE60'
      },
      {
        title: 'Show de "la colo martín"',
        time: '21hs',
        location: 'Caja de los Trebejos - Salón de arte',
        category: 'Musical',
        icon: FaMusic,
        color: '#8E44AD',
        highlight: true
      }
    ],
    '20/4': [
      {
        title: 'Domingo de Resurrección',
        time: '9:30hs y 20hs',
        location: 'Parroquia San Antonio de Padua',
        category: 'Litúrgico',
        icon: FaChurch,
        color: '#5D4037',
        highlight: true
      },
      {
        title: 'Trekking "salto el goteadero"',
        time: '9:30hs',
        location: 'Punto de encuentro: Consultar',
        category: 'Turístico',
        icon: FaMountain,
        color: '#27AE60',
        description: 'Contratación: 2664731804 - Franco Requelme',
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
    
    // Extraer día y mes de la fecha del evento (formato dd/m)
    const [day, month] = dayDate.split('/').map(num => parseInt(num, 10));
    
    // Comparar fechas
    if (month < currentMonth) return true;
    if (month === currentMonth && day < currentDay) return true;
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
            <span className="text-amber-800 font-medium">17-20 Abril 2025</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-amber-900">
            Semana Santa en Potrero de los Funes
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Disfrutá de una programación especial de actividades religiosas, culturales y turísticas 
            durante Semana Santa en el maravilloso entorno natural de Potrero de los Funes.
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
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center transition-colors whitespace-nowrap ${
                    activeDate === day.date
                      ? 'bg-amber-600 text-white'
                      : isPast 
                        ? 'bg-gray-100 border border-gray-300 text-gray-500 hover:bg-gray-200'
                        : 'bg-white border border-amber-300 text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mr-2 ${
                    activeDate === day.date 
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
            <FaChurch className="text-sm mr-2" style={{ color: '#5D4037' }} />
            <span className="text-sm text-gray-700">Litúrgico</span>
          </div>
          <div className="flex items-center">
            <FaHiking className="text-sm mr-2" style={{ color: '#27AE60' }} />
            <span className="text-sm text-gray-700">Turístico</span>
          </div>
          <div className="flex items-center">
            <FaMusic className="text-sm mr-2" style={{ color: '#8E44AD' }} />
            <span className="text-sm text-gray-700">Cultural</span>
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

export default EasterEventsPage;