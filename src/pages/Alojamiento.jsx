/// src/pages/Alojamiento.jsx
import { useState, useEffect, useRef } from "react";
import {
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaCoffee,
  FaDumbbell,
  FaGlassMartini,
  FaSnowflake,
  FaFireAlt,
  FaTv,
  FaUtensils,
  FaTree,
  FaSpa,
  FaSearch,
  FaHotel,
  FaHome,
  FaBuilding,
  FaHouseUser,
  FaBed,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaSearchLocation,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaStarHalfAlt,
  FaFilter,
  FaSort,
  FaMapMarkerAlt,
  FaDollarSign,
  FaInfoCircle,
  FaTimes
} from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import alojamientosData from '../data/alojamientos.json';

// Función de aleatorización simple y efectiva que no depende de localStorage
const shuffleArray = (array) => {
  // Crea una copia para evitar modificar el original
  const shuffled = [...array];

  // Algoritmo Fisher-Yates (Knuth) para barajar
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

// Función para generar un color en base al nombre del alojamiento (consistente)
const getColorFromName = (name) => {
  // Creamos un número basado en la suma de códigos ASCII de las letras
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }

  // Paleta de colores predefinida para establecimientos de hospedaje
  const colors = [
    '#f39c12', // naranja
    '#e74c3c', // rojo
    '#3498db', // azul
    '#2ecc71', // verde
    '#9b59b6', // púrpura
    '#1abc9c', // turquesa
    '#d35400', // naranja oscuro
    '#c0392b', // rojo oscuro
    '#8e44ad', // púrpura oscuro
  ];

  // Seleccionamos un color basado en el nombre
  return colors[sum % colors.length];
};

// Función para generar un patrón de fondo para cada tipo de alojamiento
const getPatternStyle = (tipo, color) => {
  // Diferentes patrones según el tipo
  switch (tipo) {
    case 'hotel':
      return {
        backgroundImage: `linear-gradient(135deg, ${color}22 25%, transparent 25%), 
                         linear-gradient(225deg, ${color}22 25%, transparent 25%), 
                         linear-gradient(45deg, ${color}22 25%, transparent 25%), 
                         linear-gradient(315deg, ${color}22 25%, transparent 25%)`,
        backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
        backgroundSize: '20px 20px',
        backgroundRepeat: 'repeat'
      };
    case 'apart hotel':
      return {
        backgroundImage: `linear-gradient(${color}22 1px, transparent 1px), 
                         linear-gradient(to right, ${color}22 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      };
    case 'cabaña':
    case 'cabañas':
      return {
        backgroundImage: `radial-gradient(${color}33 15%, transparent 16%), 
                         radial-gradient(${color}33 15%, transparent 16%)`,
        backgroundSize: '30px 30px',
        backgroundPosition: '0 0, 15px 15px'
      };
    case 'casa':
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${color}11, ${color}11 10px, ${color}22 10px, ${color}22 20px)`
      };
    case 'hostería':
    case 'posada':
      return {
        backgroundImage: `linear-gradient(45deg, ${color}22 25%, transparent 25%, transparent 75%, ${color}22 75%, ${color}22)`,
        backgroundSize: '30px 30px'
      };
    case 'dormis':
      return {
        backgroundImage: `repeating-linear-gradient(0deg, ${color}22, ${color}22 5px, transparent 5px, transparent 20px)`
      };
    case 'departamento':
      return {
        backgroundImage: `linear-gradient(${color}22 2px, transparent 2px), 
                         linear-gradient(90deg, ${color}22 2px, transparent 2px)`,
        backgroundSize: '30px 30px'
      };
    default:
      return {
        backgroundImage: `linear-gradient(${color}22 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      };
  }
};

// Componente para generar estrellas de calificación
const RatingStars = ({ rating }) => {
  if (!rating) return null;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaStar key={`empty-${i}`} className="text-gray-300" />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

// Componente para mostrar precios con formato
const PriceDisplay = ({ precio }) => {
  if (!precio) return null;

  // Si es un número, lo formateamos
  if (typeof precio === 'number') {
    return (
      <div className="flex items-center text-green-600 font-semibold">
        <FaDollarSign className="mr-1" />
        {precio.toLocaleString('es-AR')}
      </div>
    );
  }

  // Si es una cadena, la mostramos tal cual
  return (
    <div className="flex items-center text-green-600 font-semibold">
      {precio}
    </div>
  );
};

// Componente modal de detalle de alojamiento
const AlojamientoModal = ({ onClose, alojamiento }) => {
  const { t } = useTranslation();

  if (!alojamiento) return null;

  const TipoIcon = tipoAlojamientoIcon[alojamiento.tipo] || FaHome;
  const color = getColorFromName(alojamiento.nombre);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div
          className="sticky top-0 p-6 rounded-t-lg flex items-center justify-between"
          style={{ backgroundColor: color }}
        >
          <div className="flex items-center">
            <div className="bg-white p-3 rounded-full mr-4">
              <TipoIcon className="text-2xl" style={{ color: color }} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">{alojamiento.nombre}</h3>
              <p className="text-white text-opacity-80">
                {t(`accommodation.tipos.${alojamiento.tipo}`)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors duration-200"
          >
            <FaTimes className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Vista previa de imagen */}
        <div
          className="h-48 flex items-center justify-center overflow-hidden relative"
          style={getPatternStyle(alojamiento.tipo, color)}
        >
          {alojamiento.imagen ? (
            <img
              src={alojamiento.imagen}
              alt={alojamiento.nombre}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6">
              <TipoIcon className="text-6xl mb-4" style={{ color: color }} />
              <p className="text-gray-600">{t('accommodation.imagenesPronto')}</p>
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          {alojamiento.descripcion && (
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 flex items-center">
                <FaInfoCircle className="mr-2" style={{ color }} />
                {t('accommodation.about')}: {alojamiento.nombre}
              </h4>
              <p className="text-base leading-relaxed text-gray-700">
                {alojamiento.descripcion}
              </p>
            </div>
          )}

          {alojamiento.servicios && alojamiento.servicios.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                <TipoIcon className="mr-2" style={{ color }} />
                {t('accommodation.services')}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {alojamiento.servicios.map((servicio, i) => {
                  const Icon = iconMap[servicio] || FaHome;
                  return (
                    <div key={i} className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                      <Icon className="mr-2 text-gray-500" />
                      <span className="capitalize">{servicio}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold mb-2 text-gray-800 flex items-center">
              <FaMapMarkerAlt className="mr-2" style={{ color }} />
              {t('accommodation.location')}
            </h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-700">{alojamiento.domicilio}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              <FaPhoneAlt className="mr-2" style={{ color }} />
              {t('accommodation.contact')}
            </h4>
            <div className="space-y-2">
              {alojamiento.telefono && (
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <FaPhoneAlt className="mr-3 text-gray-500" />
                  <a
                    href={`tel:${alojamiento.telefono}`}
                    className="hover:underline !text-gray-700"
                  >
                    {alojamiento.telefono}
                  </a>
                </div>
              )}

              {alojamiento.email && (
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <FaEnvelope className="mr-3 text-gray-500" />
                  <a
                    href={`mailto:${alojamiento.email}`}
                    className="hover:underline !text-gray-700"
                  >
                    {alojamiento.email}
                  </a>
                </div>
              )}

              {alojamiento.web && (
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <FaGlobe className="mr-3 text-gray-500" />
                  <a
                    href={alojamiento.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline !text-gray-700 truncate"
                  >
                    {alojamiento.web.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="mr-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            {t('accommodation.close')}
          </button>
          {alojamiento.telefono && (
            <a
              href={`tel:${alojamiento.telefono}`}
              className="px-4 py-2 rounded-lg text-white transition duration-300 flex items-center"
              style={{ backgroundColor: color }}
            >
              <FaPhoneAlt className="mr-2" />
              {t('accommodation.contact')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Mapa de iconos por tipo de alojamiento
const tipoAlojamientoIcon = {
  hotel: FaHotel,
  "apart hotel": FaBuilding,
  hostería: FaHouseUser,
  posada: FaHouseUser,
  cabaña: FaHome,
  cabañas: FaHome,
  casa: FaHome,
  dormis: FaBed,
  departamento: FaBuilding,
  departamentos: FaBuilding,
  indeterminado: FaHome,
  complejo: FaBuilding,
  "complejo turístico": FaBuilding,
  hostal: FaHouseUser,
  "Posadas Spa": FaSpa
};

// Mapa de iconos para servicios
const iconMap = {
  wifi: FaWifi,
  estacionamiento: FaParking,
  piscina: FaSwimmingPool,
  desayuno: FaCoffee,
  gimnasio: FaDumbbell,
  bar: FaGlassMartini,
  "aire acondicionado": FaSnowflake,
  parrilla: FaFireAlt,
  tv: FaTv,
  cocina: FaUtensils,
  jardín: FaTree,
  spa: FaSpa,
  "tv por cable": FaTv,
  cafetería: FaCoffee,
  "Pileta exterior": FaSwimmingPool,
  "Ropa de cama": FaBed,
  "Televisión": FaTv,
  "Pileta": FaSwimmingPool,
  "WiFi": FaWifi,
  "Estacionamiento gratuito": FaParking,
  "Pileta privada": FaSwimmingPool,
  "WiFi gratis": FaWifi,
  "Estacionamiento privado gratuito": FaParking,
  "Asadores": FaFireAlt,
  "Cocina equipada": FaUtensils,
  "piscina privada": FaSwimmingPool,
  "estacionamiento gratuito": FaParking,
  "asador": FaFireAlt,
  "Pet-friendly": FaHome,
  "Desayunos orgánicos": FaCoffee,
  "Internet de alta velocidad": FaWifi,
  "Estacionamiento privado": FaParking,
  "Piscina": FaSwimmingPool,
  "Restaurante": FaUtensils,
  "Casa de té": FaCoffee,
  "Habitaciones y departamentos de dos y tres ambientes": FaBed
};

// Componente para las tarjetas de alojamiento
const AlojamientoCard = ({ alojamiento, onClick }) => {
  const { t } = useTranslation();
  const TipoIcon = tipoAlojamientoIcon[alojamiento.tipo] || FaHome;
  const color = getColorFromName(alojamiento.nombre);

  // Obtener el estilo de patrón según el tipo
  const patternStyle = getPatternStyle(alojamiento.tipo, color);

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
      onClick={() => onClick(alojamiento)}
    >
      {/* Header con icono y tipo */}
      <div className="flex items-center p-4" style={{ backgroundColor: color }}>
        <div className="bg-white p-2 rounded-full mr-3">
          <TipoIcon className="text-xl" style={{ color: color }} />
        </div>
        <span className="font-medium text-white">
          {t(`accommodation.tipos.${alojamiento.tipo}`)}
        </span>

      </div>

      {/* Área de imagen o patrón */}
      <div className="h-32 overflow-hidden" style={patternStyle}>
        {alojamiento.imagen ? (
          <img
            src={alojamiento.imagen}
            alt={alojamiento.nombre}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <TipoIcon className="text-5xl opacity-30" style={{ color }} />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{alojamiento.nombre}</h3>
        <p className="text-gray-600 text-sm mb-3 flex items-start">
          <FaMapMarkerAlt className="mr-1 mt-1 flex-shrink-0" />
          <span className="line-clamp-2">{alojamiento.domicilio}</span>
        </p>

        {/* Servicios destacados */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(alojamiento.servicios || []).slice(0, 4).map((servicio, i) => {
            const Icon = iconMap[servicio];
            return Icon ? (
              <div key={i} className="bg-gray-100 p-1 rounded-md text-gray-600" title={servicio}>
                <Icon />
              </div>
            ) : null;
          })}
          {(alojamiento.servicios || []).length > 4 && (
            <div className="bg-gray-100 p-1 rounded-md text-gray-600">
              +{alojamiento.servicios.length - 4}
            </div>
          )}
        </div>

        {/* Botón de detalle */}
        <button
          className="w-full mt-2 py-2 rounded-lg text-white flex items-center justify-center transition-opacity hover:opacity-90"
          style={{ backgroundColor: color }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(alojamiento);
          }}
        >
          {t('accommodation.details')}
        </button>
      </div>
    </div>
  );
};

// Componente para cuando no hay resultados
const NoResultsMessage = ({ onReset }) => {
  const { t } = useTranslation();
  
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
      <FaSearchLocation className="text-6xl text-gray-400 mb-4" />
      <h3 className="text-2xl font-semibold text-gray-700 mb-2">{t('accommodation.no_results')}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        {t('accommodation.no_results_desc')}
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2 bg-[#00add5] text-white rounded-full hover:bg-[#0098b8] transition-colors duration-300"
      >
        {t('accommodation.view_all')}
      </button>
    </div>
  );
};

// Componente de paginación
const Pagination = ({ currentPage, pageCount, onPageChange }) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${currentPage === 1
          ? "text-gray-400 cursor-not-allowed"
          : "text-[#d44203] hover:bg-[##d44203] hover:text-white"
          }`}
      >
        <FaChevronLeft />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-8 h-8 rounded-full ${1 === currentPage
              ? "bg-[#00add5] text-white"
              : "text-[#d44203] hover:bg-[#d44203] hover:text-white"
              }`}
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full ${page === currentPage
            ? "bg-[#cf6f19] text-white"
            : "text-[#d44203] hover:bg-[#d44203] hover:text-white"
            }`}
        >
          {page}
        </button>
      ))}

      {endPage < pageCount && (
        <>
          {endPage < pageCount - 1 && (
            <span className="text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(pageCount)}
            className={`w-8 h-8 rounded-full ${pageCount === currentPage
              ? "bg-[#d44203] text-white"
              : "text-[#d44203] hover:bg-[#d44203] hover:text-white"
              }`}
          >
            {pageCount}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        className={`p-2 rounded-full ${currentPage === pageCount
          ? "text-gray-400 cursor-not-allowed"
          : "text-[#d44203] hover:bg-[#d44203] hover:text-white"
          }`}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

// Componente principal de alojamientos
function Alojamiento() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("todos");
  const [selectedAlojamiento, setSelectedAlojamiento] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("random"); // Inicializamos con orden aleatorio
  const [servicesFilter, setServicesFilter] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]);
  const itemsPerPage = 9;

  // Referencia al contenedor de alojamientos para el scroll
  const alojamientosRef = useRef(null);

  // Cargar y filtrar alojamientos válidos
  useEffect(() => {
    console.log("Cargando alojamientos desde JSON...");
    // Filtrar solo los objetos que tienen las propiedades necesarias
    const validAlojamientos = alojamientosData.filter(item => 
      item.numero && 
      item.nombre && 
      item.tipo &&
      item.domicilio
    );
    console.log(`Se cargaron ${validAlojamientos.length} alojamientos válidos`);
    
    // Mezclar alojamientos al cargar
    const randomizedAlojamientos = shuffleArray(validAlojamientos);
    setAlojamientos(randomizedAlojamientos);
  }, []);

  // Actualizar servicios seleccionados
  const handleServiceToggle = (service) => {
    if (servicesFilter.includes(service)) {
      setServicesFilter(servicesFilter.filter(s => s !== service));
    } else {
      setServicesFilter([...servicesFilter, service]);
    }
    setCurrentPage(1);
  };

  // Servicios disponibles para filtrar
  const availableServices = [
    "wifi",
    "estacionamiento",
    "piscina",
    "desayuno",
    "gimnasio",
    "aire acondicionado",
    "parrilla",
    "jardín",
    "spa"
  ];

  // Tipos de alojamiento para el filtro
  const tiposAlojamiento = [
    "todos",
    "hotel",
    "apart hotel",
    "hostería",
    "posada",
    "cabañas",
    "casa",
    "departamento",
    "departamentos",
    "complejo",
    "complejo turístico",
    "hostal",
    "Posadas Spa"
  ];

  // Filtrar alojamientos
  const filteredAlojamientos = alojamientos.filter((alojamiento) => {
    // Buscar por término
    const matchesSearch =
      alojamiento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alojamiento.descripcion && alojamiento.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) ||
      alojamiento.domicilio.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtrar por tipo
    const matchesType = selectedType === "todos" || alojamiento.tipo === selectedType;

    // Filtrar por servicios
    const matchesServices = servicesFilter.length === 0 ||
      servicesFilter.every(service =>
        alojamiento.servicios && alojamiento.servicios.some(s => 
          s.toLowerCase().includes(service.toLowerCase())
        )
      );

    return matchesSearch && matchesType && matchesServices;
  });

  // Ordenar alojamientos
  const sortedAlojamientos = [...filteredAlojamientos].sort((a, b) => {
    if (sortBy === "nombre") {
      return a.nombre.localeCompare(b.nombre);
    } else if (sortBy === "precio") {
      // Si no hay precio, colocarlo al final
      if (!a.precio) return 1;
      if (!b.precio) return -1;
      return a.precio - b.precio;
    } else if (sortBy === "calificacion") {
      // Si no hay calificación, colocarlo al final
      if (!a.calificacion) return 1;
      if (!b.calificacion) return -1;
      return b.calificacion - a.calificacion;
    }
    // Para "random", mantener el orden que ya está aleatorizado
    return 0;
  });

  // Calcular paginación
  const pageCount = Math.ceil(sortedAlojamientos.length / itemsPerPage);
  const currentAlojamientos = sortedAlojamientos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Resetear filtros
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("todos");
    setServicesFilter([]);
    setSortBy("random");
    setCurrentPage(1);

    // Volver a mezclar los datos
    const validAlojamientos = alojamientosData.filter(item => 
      item.numero && 
      item.nombre && 
      item.tipo &&
      item.domicilio
    );
    const randomizedAlojamientos = shuffleArray(validAlojamientos);
    setAlojamientos(randomizedAlojamientos);
  };

  // Efecto para restablecer la página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, sortBy]);

  return (
    <div className="py-12 px-4 mx-auto max-w-screen-xl lg:px-6 bg-gray-50">
      {/* Header section */}
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-[#00add5]">
          {t('accommodation.title')}
        </h2>
        <p className="font-light text-gray-500 sm:text-xl">
          {t('accommodation.subtitle')}
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-8" ref={alojamientosRef}>
        {/* Búsqueda */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder={t('accommodation.search_placeholder')}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00add5] shadow-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Filtros para móvil */}
        <div className="md:hidden mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
            >
              <FaFilter className="text-[#00add5]" />
              <span>{t('accommodation.filters')}</span>
              {(selectedType !== "todos" || servicesFilter.length > 0) && (
                <span className="flex items-center justify-center w-5 h-5 bg-[#00add5] text-white text-xs rounded-full">
                  {(selectedType !== "todos" ? 1 : 0) + servicesFilter.length}
                </span>
              )}
            </button>

            <select
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="random">{t('accommodation.random')}</option>
              <option value="nombre">{t('accommodation.by_name')}</option>
            </select>
          </div>

          {/* Panel de filtros móvil */}
          {isFilterOpen && (
            <div className="mt-3 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
              <h4 className="font-medium mb-2">{t('accommodation.tipoAlojamiento')}</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {tiposAlojamiento.map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setSelectedType(tipo)}
                    className={`px-3 py-1 rounded-full text-sm ${selectedType === tipo
                      ? "bg-[#00add5] text-white"
                      : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {t(`accommodation.tipos.${tipo}`)}
                  </button>
                ))}
              </div>

              <h4 className="font-medium mb-2">{t('accommodation.services')}</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {availableServices.map((service) => {
                  const Icon = iconMap[service];
                  return (
                    <button
                      key={service}
                      onClick={() => handleServiceToggle(service)}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${servicesFilter.includes(service)
                        ? "bg-[#00add5] text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {Icon && <Icon size={12} />}
                      <span className="capitalize">{service}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-[#00add5] hover:underline text-sm"
                >
                  {t('accommodation.clear_filters')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filtros para desktop */}
        <div className="hidden md:block mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {tiposAlojamiento.map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => setSelectedType(tipo)}
                  className={`px-4 py-2 rounded-lg ${selectedType === tipo
                    ? "bg-[#00add5] text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                    } transition-colors duration-300`}
                >
                  {t(`accommodation.tipos.${tipo}`)}
                </button>
              ))}
            </div>

            <div className="flex items-center">
              <span className="mr-2 text-gray-600">{t('accommodation.sort_by')}:</span>
              <select
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="random">{t('accommodation.random')}</option>
                <option value="nombre">{t('accommodation.nombre')}</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">{t('accommodation.filter_services')}</h4>
              {servicesFilter.length > 0 && (
                <button
                  onClick={() => setServicesFilter([])}
                  className="text-[#00add5] hover:underline text-sm"
                >
                  {t('accommodation.clear_filters')}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableServices.map((service) => {
                const Icon = iconMap[service];
                return (
                  <button
                    key={service}
                    onClick={() => handleServiceToggle(service)}
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${servicesFilter.includes(service)
                      ? "bg-[#00add5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } transition-colors duration-200`}
                  >
                    {Icon && <Icon size={12} />}
                    <span className="capitalize">{service}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredAlojamientos.length === 1 
            ? t('accommodation.showing_results', { count: filteredAlojamientos.length })
            : t('accommodation.showing_results_plural', { count: filteredAlojamientos.length })
          }
          {(selectedType !== "todos" || servicesFilter.length > 0 || searchTerm) && (
            <button
              onClick={resetFilters}
              className="ml-2 text-[#00add5] hover:underline"
            >
              {t('accommodation.clear_filters')}
            </button>
          )}
        </p>
      </div>

      {/* Resultados */}
      {currentAlojamientos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentAlojamientos.map((alojamiento, index) => (
              <AlojamientoCard
                key={`${alojamiento.numero || alojamiento.nombre}-${index}`}
                alojamiento={alojamiento}
                onClick={() => setSelectedAlojamiento(alojamiento)}
              />
            ))}
          </div>

          {pageCount > 1 && (
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <NoResultsMessage onReset={resetFilters} />
      )}

      {/* Modal de detalles */}
      {selectedAlojamiento && (
        <AlojamientoModal
          alojamiento={selectedAlojamiento}
          onClose={() => setSelectedAlojamiento(null)}
        />
      )}
    </div>
  );
}

export default Alojamiento;