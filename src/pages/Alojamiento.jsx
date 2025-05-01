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
              <p className="text-white text-opacity-80">{alojamiento.tipo.charAt(0).toUpperCase() + alojamiento.tipo.slice(1)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
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
              <p className="text-gray-600">Imágenes próximamente</p>
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          {alojamiento.descripcion && (
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800 flex items-center">
                <FaInfoCircle className="mr-2" style={{ color }} />
                Acerca de:  {alojamiento.nombre}
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
                Servicios
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
              Ubicación
            </h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-700">{alojamiento.domicilio}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
              <FaPhoneAlt className="mr-2" style={{ color }} />
              Contacto
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
            Cerrar
          </button>
          {alojamiento.telefono && (
            <a
              href={`tel:${alojamiento.telefono}`}
              className="px-4 py-2 rounded-lg text-white transition duration-300 flex items-center"
              style={{ backgroundColor: color }}
            >
              <FaPhoneAlt className="mr-2" />
              Contactar
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
  cafetería: FaCoffee
};

// Componente para las tarjetas de alojamiento
const AlojamientoCard = ({ alojamiento, onClick }) => {
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
          {alojamiento.tipo.charAt(0).toUpperCase() + alojamiento.tipo.slice(1)}
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
          Ver detalles
        </button>
      </div>
    </div>
  );
};

// Componente para cuando no hay resultados
const NoResultsMessage = ({ onReset }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16">
    <FaSearchLocation className="text-6xl text-gray-400 mb-4" />
    <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron alojamientos</h3>
    <p className="text-gray-500 text-center max-w-md mb-6">
      Lo sentimos, no pudimos encontrar alojamientos que coincidan con tu búsqueda.
      <br />
      Intentá con otros términos o explorá todas nuestras opciones.
    </p>
    <button
      onClick={onReset}
      className="px-6 py-2 bg-[#00add5] text-white rounded-full hover:bg-[#0098b8] transition-colors duration-300"
    >
      Ver todos los alojamientos
    </button>
  </div>
);

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("todos");
  const [selectedAlojamiento, setSelectedAlojamiento] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("random"); // Inicializamos con orden aleatorio
  const [servicesFilter, setServicesFilter] = useState([]);
  const [alojamientosData, setAlojamientosData] = useState([]);
  const itemsPerPage = 9;

  // Referencia al contenedor de alojamientos para el scroll
  const alojamientosRef = useRef(null);

  // Aquí deberías tener tus datos reales de alojamientos
  // Voy a incluir solo algunos ejemplos para demostración
  const alojamientos = [
    {
      numero: "0000001",
      nombre: "Aguamansa Apart Hotel",
      titular: "Velasco Videla Maria Valeria",
      domicilio: "Ruta N° 18 Camino a El Volcan",
      tipo: "apart hotel",
      descripcion: "Apart hotel con vista a las sierras, ideal para descanso.",
      precio: 180,
      calificacion: 4.3,
      servicios: [
        "wifi",
        "estacionamiento",
        "piscina",
        "desayuno",
        "aire acondicionado",
      ],
      imagen: null,
      telefono: "+54 266 4851673",
      email: "reservas@aguamansasanluis.com.ar",
      web: "http://www.aguamansasanluis.com.ar",
    },
    {
      numero: "0000002",
      nombre: "Aitue",
      titular: "Castro Hector Ruben",
      domicilio: "Av. del Circuito Esq. Las Lavandas",
      tipo: "indeterminado",
      descripcion: "Sin descripción disponible",
      precio: null,
      calificacion: null,
      servicios: [
        "wifi",
        "tv por cable",
        "aire acondicionado",
        "estacionamiento",
      ],
      imagen: null,
      telefono: "+54 266 4340442",
      email: null,
      web: null,
    },
    {
      numero: "0000003",
      nombre: "Amantea Apart Hotel",
      titular: "Felice Leonel",
      domicilio: "Circuito Lateral Secc 1",
      tipo: "apart hotel",
      descripcion:
        "Apartamentos con vista al circuito de Potrero de los Funes.",
      precio: 170,
      calificacion: 4.4,
      servicios: ["wifi", "estacionamiento", "piscina", "gimnasio"],
      imagen: "/amantea-apart.jpg",
      telefono: "+54 911 40447644",
      email: "amanteaapart@gmail.com",
      web: "http://www.amanteaapart.com.ar",
    },
    {
      numero: "0000004",
      nombre: "Antu Kuyen",
      titular: null,
      domicilio: "Las Lavandas 420",
      tipo: "cabañas",
      descripcion: "Cabaña rodeada de naturaleza y tranquilidad.",
      precio: 150,
      calificacion: 4.1,
      servicios: ["wifi", "estacionamiento", "parrilla", "jardín"],
      imagen: null,
      telefono: "+54 2656 406128",
      email: null,
      web: null,
    },
    {
      numero: "0000005",
      nombre: "AK Tu Lugar",
      titular: null,
      domicilio: "Las Lavandas 195",
      tipo: "cabañas",
      descripcion: "Cabaña cómoda y acogedora en un entorno natural.",
      precio: 160,
      calificacion: 4.0,
      servicios: ["wifi", "cocina", "jardín"],
      imagen: null,
      telefono: "+54 2657 544490",
      email: null,
      web: "http://www.udaer.org",
    },
    {
      numero: "0000006",
      nombre: "Aroma de Potrero",
      titular: null,
      domicilio: "Los Arándanos 10",
      tipo: "cabañas",
      descripcion: "Sin descripción disponible",
      precio: null,
      calificacion: null,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2665 044950",
      email: null,
      web: null,
    },
    {
      numero: "0000007",
      nombre: "Ayres de Funes",
      titular: null,
      domicilio: "Av. del Circuito 2920",
      tipo: "cabañas",
      descripcion: "Cabañas modernas con servicios de primera calidad.",
      precio: 180,
      calificacion: 4.2,
      servicios: ["wifi", "estacionamiento", "desayuno", "aire acondicionado"],
      imagen: null,
      telefono: "+54 2664 893799",
      email: null,
      web: "http://www.ayresdefunes.com.ar",
    },
    {
      numero: "0000009",
      nombre: "Balcones del Lago",
      titular: null,
      domicilio: "Barrio La Agripina",
      tipo: "cabañas",
      descripcion: "Cabañas con hermosas vistas al lago.",
      precio: 190,
      calificacion: 4.5,
      servicios: ["wifi", "estacionamiento", "piscina"],
      imagen: null,
      telefono: "+54 2664 842205",
      email: null,
      web: null,
    },
    {
      numero: "0000010",
      nombre: "Brisa Serrana",
      titular: "Federico Closa",
      domicilio: "Carpinteros 120",
      tipo: "cabañas",
      descripcion: "Cabaña con vistas al paisaje serrano.",
      precio: 155,
      calificacion: 4.2,
      servicios: ["wifi", "estacionamiento", "jardín"],
      imagen: null,
      telefono: "+54 266 4246617",
      email: "federicoclosa@hotmail.com",
      web: null,
    },
    {
      numero: "0000011",
      nombre: "Brisa del Lago",
      titular: null,
      domicilio: "Santa Rita 84",
      tipo: "cabañas",
      descripcion: "Cabaña frente al lago con vistas increíbles.",
      precio: 160,
      calificacion: 4.0,
      servicios: ["wifi", "estacionamiento", "jardín"],
      imagen: null,
      telefono: "+54 2664 226521",
      email: "brisadellago@hotmail.com",
      web: "http://www.brisadellago.com.ar",
    },
    {
      numero: "0000013",
      nombre: "Cabañas Iñaki + Anexo Cafetería",
      titular: null,
      domicilio: "Los Horneros 3183",
      tipo: "cabañas",
      descripcion: "Complejo de cabañas con cafetería anexa.",
      precio: 170,
      calificacion: 4.3,
      servicios: ["wifi", "cafetería", "jardín"],
      imagen: null,
      telefono: "+54 2664 869423",
      email: "reservas@losinaki.com.ar",
      web: "http://www.losinaki.com.ar",
    },
    {
      numero: "0000014",
      nombre: "Cabañas Lucero",
      titular: null,
      domicilio: "Los Arándanos 45",
      tipo: "cabañas",
      descripcion: "Cabaña equipada para el confort de los huéspedes.",
      precio: 160,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 11 54297051",
      email: null,
      web: null,
    },
    {
      numero: "0000016",
      nombre: "Claro de Luna",
      titular: null,
      domicilio: "Cortaderas 355 – Esquina Las Lavandas A3",
      tipo: "indeterminado",
      descripcion: "Alojamiento con ambiente acogedor y tranquilo.",
      precio: null,
      calificacion: 4.2,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2664 553033",
      email: null,
      web: "http://www.argentinaturismo.com.ar/clarodeluna/",
    },
    {
      numero: "0000017",
      nombre: "Castillo de sol",
      titular: null,
      domicilio: "Circuito del Lago 3360",
      tipo: "cabañas",
      descripcion: "Cabañas con un ambiente estilo castillo y vista al lago.",
      precio: 180,
      calificacion: 4.5,
      servicios: ["wifi", "jardín", "bar"],
      imagen: null,
      telefono: "+54 266 4559847",
      email: "castillo.desol@yahoo.com.ar",
      web: "http://www.castillodesol.com.ar",
    },
    {
      numero: "0000023",
      nombre: "Complejo El Mirador",
      titular: null,
      domicilio: "Av. del Circuito Esq. Las Catalpas",
      tipo: "complejo",
      descripcion:
        "Complejo turístico con vistas panorámicas y múltiples servicios.",
      precio: 230,
      calificacion: 4.5,
      servicios: ["wifi", "piscina", "jardín"],
      imagen: null,
      telefono: "+54 2664 668764",
      email: "info@complejodelmirador.com.ar",
      web: "http://www.complejodelmirador.com.ar",
    },
    {
      numero: "0000024",
      nombre: "Del Fuego",
      titular: null,
      domicilio: "Los Eucaliptos 259",
      tipo: "cabañas",
      descripcion: "Cabaña cálida en un entorno natural.",
      precio: 140,
      calificacion: 4.1,
      servicios: ["wifi", "parrilla"],
      imagen: null,
      telefono: "+54 2901 468247",
      email: "joseciccone66@gmail.com",
      web: "http://www.cabanasdelfuego.wordpress.com",
    },
    {
      numero: "0000025",
      nombre: "Destello del Lago",
      titular: null,
      domicilio: "Av. del Circuito E/ A3 y A4",
      tipo: "departamentos",
      descripcion:
        "Departamentos frente al lago, con servicios para relajarse.",
      precio: 200,
      calificacion: 4.4,
      servicios: ["wifi", "piscina", "desayuno", "bar"],
      imagen: null,
      telefono: "+54 2664 834995",
      email: "info@destellosdellago.com.ar",
      web: null,
    },
    {
      numero: "0000026",
      nombre: "Doña Emilia",
      titular: null,
      domicilio: "Los Eucaliptos Bis S/N",
      tipo: "cabañas",
      descripcion: "Alojamiento rústico en un entorno natural.",
      precio: null,
      calificacion: 3.8,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000034",
      nombre: "Del Duende",
      titular: null,
      domicilio: "Los Eucaliptos 150",
      tipo: "cabañas",
      descripcion: "Cabañas con encanto natural y tranquilidad.",
      precio: 150,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2901 469068",
      email: "info@cabanasdelduende.com",
      web: "http://www.cabanasdelduende.com/",
    },
    {
      numero: "0000035",
      nombre: "El Reparo",
      titular: null,
      domicilio: "Los Piquillines Lote 4",
      tipo: "cabañas",
      descripcion: "Cabaña ideal para descansar rodeado de naturaleza.",
      precio: 155,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 709284",
      email: null,
      web: "https://udaer.org/",
    },
    {
      numero: "0000036",
      nombre: "El Triunfo Apart",
      titular: null,
      domicilio: "Las Margaritas y Cortaderas A5",
      tipo: "apart hotel",
      descripcion: "Apart hotel con servicios para una estadía cómoda.",
      precio: 165,
      calificacion: 4.3,
      servicios: ["wifi", "estacionamiento", "piscina"],
      imagen: null,
      telefono: "+54 2664 266538",
      email: null,
      web: "http://www.udaer.org/",
    },
    {
      numero: "0000037",
      nombre: "Gemas del Lago",
      titular: null,
      domicilio: "Los Eucaliptos S/N A14",
      tipo: "cabañas",
      descripcion: "Cabañas con vistas al lago y equipamiento completo.",
      precio: 170,
      calificacion: 4.4,
      servicios: ["wifi", "jardín", "parrilla", "piscina"],
      imagen: null,
      telefono: "+54 2664 631687",
      email: "liclauramai2@hotmail.com",
      web: "http://www.gemasdellago.com.ar",
    },
    {
      numero: "0000038",
      nombre: "Hotel Potrero de los Funes",
      titular: null,
      domicilio: "Ruta 18 Km. 16",
      tipo: "hotel",
      descripcion: "Hotel con servicios de lujo y vista al lago.",
      precio: 250,
      calificacion: 4.8,
      servicios: [
        "wifi",
        "piscina",
        "gimnasio",
        "spa",
        "bar",
        "aire acondicionado",
      ],
      imagen: null,
      telefono: "+54 2664 440038",
      email: "reservas@hotelpotrero.sanluis.gov.ar",
      web: "http://www.hotelpotrero.sanluis.gov.ar/",
    },
    {
      numero: "0000039",
      nombre: "Hostería Lihuen",
      titular: null,
      domicilio: "Las Caléndulas 299",
      tipo: "hostería",
      descripcion: "Hostería tradicional con ambiente familiar.",
      precio: 140,
      calificacion: 3.9,
      servicios: ["wifi", "estacionamiento", "desayuno"],
      imagen: null,
      telefono: "+54 2664 495275",
      email: "hosterialihuen@coopenetlujan.com.ar",
      web: "http://www.hotelesdeargentina.com.ar/san-luis/potrero-de-los-funes/hosterias-1-estrella/lihuen",
    },
    {
      numero: "0000043",
      nombre: "Koba",
      titular: null,
      domicilio: "Los Piquillines 3540",
      tipo: "cabañas",
      descripcion: "Cabaña acogedora ideal para parejas.",
      precio: 145,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2665 004996",
      email: null,
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000044",
      nombre: "La Quebrada Apart Hotel",
      titular: null,
      domicilio: "Los Ciruelos y Los Peros",
      tipo: "apart hotel",
      descripcion: "Apart hotel con confort y vistas a la naturaleza.",
      precio: 180,
      calificacion: 4.3,
      servicios: ["wifi", "piscina", "jardín", "estacionamiento"],
      imagen: null,
      telefono: "+54 2664 019664",
      email: null,
      web: null,
    },
    {
      numero: "0000046",
      nombre: "La Casa de Muñe",
      titular: null,
      domicilio: "Mza G Casa 7 Bº 69 Ara Gral Belgrano",
      tipo: "casa",
      descripcion: "Casa acogedora para alquilar por días.",
      precio: 125,
      calificacion: 4.0,
      servicios: ["jardín"],
      imagen: null,
      telefono: "+54 2664 649875",
      email: null,
      web: null,
    },
    {
      numero: "0000047",
      nombre: "La Casa del Tata - Hostal",
      titular: null,
      domicilio: "Las Violetas 259",
      tipo: "hostal",
      descripcion: "Hostal tradicional con ambiente hogareño.",
      precio: 135,
      calificacion: 4.2,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2664 209889",
      email: null,
      web: "https://udaer.org/",
    },
    {
      numero: "0000048",
      nombre: "La Lomita",
      titular: null,
      domicilio: "Los Paraísos y Pje. Las Calandrias",
      tipo: "cabañas",
      descripcion: "Cabaña en un entorno natural y tranquilo.",
      precio: 140,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 11 22920254",
      email: "complejolalomitaok@gmail.com",
      web: "https://udaer.org/",
    },
    {
      numero: "0000049",
      nombre: "La Mamalia - Casa en Alquiler",
      titular: null,
      domicilio: "Bº Ara Gral. Belgrano Mza.G C.2",
      tipo: "casa",
      descripcion: "Casa en alquiler ideal para familias.",
      precio: 130,
      calificacion: 3.9,
      servicios: ["jardín"],
      imagen: null,
      telefono: "+54 2664 649875",
      email: null,
      web: null,
    },
    {
      numero: "0000050",
      nombre: "La Norma - Casa en Alquiler",
      titular: null,
      domicilio: "Mza G Casa 4 B° Ara Gral Belgrano",
      tipo: "casa",
      descripcion: "Casa amplia en alquiler por día.",
      precio: 135,
      calificacion: 3.8,
      servicios: ["jardín"],
      imagen: null,
      telefono: "+54 2664 649875",
      email: null,
      web: null,
    },
    {
      numero: "0000051",
      nombre: "La Soleada",
      titular: null,
      domicilio: "Los Ciruelos 648",
      tipo: "cabañas",
      descripcion: "Cabaña rodeada de vegetación y tranquilidad.",
      precio: 150,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 11 41939061",
      email: null,
      web: "https://www.udaer.org/",
    },
    {
      numero: "0000052",
      nombre: "Las Acacias",
      titular: null,
      domicilio: "Los Guindos 2197",
      tipo: "cabañas",
      descripcion: "Cabaña acogedora en un ambiente natural.",
      precio: 145,
      calificacion: 4.1,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2665 048624",
      email: null,
      web: null,
    },
    {
      numero: "0000053",
      nombre: "Las Encinas",
      titular: null,
      domicilio: "Santa Rita Esq. Jazmines",
      tipo: "cabañas",
      descripcion: "Cabaña rodeada de encinas y naturaleza.",
      precio: 160,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 495450",
      email: "info@lasencinas.com.ar",
      web: "http://lasencinas.com.ar/",
    },
    {
      numero: "0000054",
      nombre: "Las Mercedes",
      titular: null,
      domicilio: "Av. del Circuito y Cost. Los Arenales",
      tipo: "cabañas",
      descripcion: "Cabaña con entorno serrano y paisajes naturales.",
      precio: 150,
      calificacion: 4.0,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2396 634651",
      email: "cabaniaslasmercedes@hotmail.com",
      web: null,
    },
    {
      numero: "0000055",
      nombre: "Las Torcazas",
      titular: null,
      domicilio: "Los Paraísos 20",
      tipo: "cabañas",
      descripcion: "Cabaña ideal para descansar en la naturaleza.",
      precio: 140,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 11 65771960",
      email: null,
      web: "https://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000057",
      nombre: "Los Fresnos",
      titular: null,
      domicilio: "Las Tipas 2859",
      tipo: "cabañas",
      descripcion: "Cabaña rodeada de fresnos y vegetación autóctona.",
      precio: 140,
      calificacion: 4.0,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 372291",
      email: "losfresnos-potrero@hotmail.com",
      web: "https://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000058",
      nombre: "Los Arroyitos",
      titular: null,
      domicilio: "Ruta 18 Km 20",
      tipo: "cabañas",
      descripcion: "Cabaña con vistas al arroyo y naturaleza.",
      precio: 150,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "piscina"],
      imagen: null,
      telefono: "+54 2664 554776",
      email: "losarroyitos.pt@gmail.com",
      web: "http://www.losarroyitos.com",
    },
    {
      numero: "0000059",
      nombre: "Los Alelíes",
      titular: null,
      domicilio: "Los Alelíes 185 Esq. Las Petunias",
      tipo: "complejo",
      descripcion: "Complejo con cabañas amplias y cómodas.",
      precio: 160,
      calificacion: 4.3,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2604 632629",
      email: "complejolosalelies@hotmail.com",
      web: "http://www.alquilerargentina.com/alojamientos/wn51-Complejo-Los-Alel%C3%ADes-Complejo-de-Caba%C3%B1as-Potrero-De-Los-Funes.html",
    },
    {
      numero: "0000060",
      nombre: "Los Naranjos",
      titular: null,
      domicilio: "Los Guindos 2191",
      tipo: "hostería",
      descripcion: "Hostería acogedora con servicios básicos.",
      precio: 130,
      calificacion: 3.8,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2664 205210",
      email: "losnaranjosdepotrero@gmail.com",
      web: "http://www.potrerofunes.wixsite.com/hosterialosnaranjos",
    },
    {
      numero: "0000061",
      nombre: "Los Molles",
      titular: null,
      domicilio: "Los Molles 450",
      tipo: "cabañas",
      descripcion: "Cabaña cómoda con hermosas vistas a la naturaleza.",
      precio: 140,
      calificacion: 4.0,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 659027",
      email: "Complejolosmolles@gmail.com",
      web: "http://www.complejolosmolles.com.ar/",
    },
    {
      numero: "0000062",
      nombre: "Los Pinos 1",
      titular: null,
      domicilio: "Los Pinos 132",
      tipo: "cabañas",
      descripcion: "Cabaña en un entorno natural, ideal para relajarse.",
      precio: 145,
      calificacion: 4.1,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2664 678680",
      email: "fabiomuller76@gmail.com",
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000063",
      nombre: "Los Paraísos",
      titular: null,
      domicilio: "Av. del Circuito 3236",
      tipo: "complejo",
      descripcion: "Complejo con cabañas rodeadas de naturaleza.",
      precio: 150,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 219921",
      email: "carlosvcaballero@gmail.com",
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000066",
      nombre: "LudMar",
      titular: null,
      domicilio: "Las Violetas 98 y Las Rosas",
      tipo: "cabañas",
      descripcion: "Cabaña confortable en zona tranquila.",
      precio: 145,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54  2664540187",
      email: "ludmar@hotmail.com.ar",
      web: "http://www.ludmar.com.ar/",
    },
    {
      numero: "0000067",
      nombre: "Lunas y Soles",
      titular: null,
      domicilio: "Santa Rita 559",
      tipo: "cabañas",
      descripcion: "Cabaña con servicios básicos, rodeada de naturaleza.",
      precio: 140,
      calificacion: 4.0,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 223030",
      email: "joragueva@hotmail.com",
      web: "http://www.cabanaslunasysoles.webnode.page/",
    },
    {
      numero: "0000069",
      nombre: "Mirando al Valle",
      titular: null,
      domicilio: "Los Eucaliptos 240",
      tipo: "cabañas",
      descripcion: "Cabaña ideal para disfrutar de vistas al valle.",
      precio: 140,
      calificacion: 4.0,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2664 649875",
      email: null,
      web: "http://www.udaer.org",
    },
    {
      numero: "0000070",
      nombre: "Molinos de Vientos",
      titular: null,
      domicilio: "Carpinteros 18",
      tipo: "cabañas",
      descripcion: "Cabaña rodeada de naturaleza, ideal para relajarse.",
      precio: 150,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 209889",
      email: "molinosdevientos.sl@gmail.com",
      web: null,
    },
    {
      numero: "0000071",
      nombre: "Montearena",
      titular: null,
      domicilio: "Manantiales 383",
      tipo: "cabañas",
      descripcion: "Cabaña cómoda en medio de la naturaleza.",
      precio: 145,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 888901",
      email: "montearena.sl@gmail.com",
      web: "http://www.udaer.org/",
    },
    {
      numero: "0000072",
      nombre: "Murmullo del Rio",
      titular: null,
      domicilio: "Rey del Bosque y Cesar Bustos",
      tipo: "cabañas",
      descripcion: "Cabaña cerca del río, ideal para descansar.",
      precio: 160,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 581080",
      email: "info@murmullodelrio.com",
      web: "http://www.murmullodelrio.com/",
    },
    {
      numero: "0000073",
      nombre: "Munay",
      titular: null,
      domicilio: "Los Eucaliptos S/N (Los Manantiales)",
      tipo: "cabañas",
      descripcion: "Complejo de cabañas rodeado de naturaleza.",
      precio: 140,
      calificacion: 4.0,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: null,
      email: null,
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000074",
      nombre: "Naife",
      titular: null,
      domicilio: "Santa Rita S/N",
      tipo: "cabañas",
      descripcion: "Cabaña rodeada de paisajes naturales y tranquilidad.",
      precio: 135,
      calificacion: 4.1,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2664 731025",
      email: "Naifeolivares6@gmail.com",
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000075",
      nombre: "Oliber Cabañas",
      titular: null,
      domicilio: "A 14 - Los Eucaliptos",
      tipo: "cabañas",
      descripcion: "Cabañas equipadas para el confort de los visitantes.",
      precio: 150,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 11 52484474",
      email: null,
      web: "http://www.udaer.org",
    },
    {
      numero: "0000076",
      nombre: "Pauvalen 1 y 2",
      titular: null,
      domicilio: "Las Violetas 1252",
      tipo: "cabañas",
      descripcion: "Cabañas acogedoras ideales para familias.",
      precio: 140,
      calificacion: 4.0,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 261 6589302",
      email: null,
      web: "http://www.pauvalen.com.ar/",
    },
    {
      numero: "0000077",
      nombre: "Pisco Yaku",
      titular: null,
      domicilio: "Los Ciruelos 331",
      tipo: "complejo",
      descripcion: "Complejo turístico con servicios completos.",
      precio: 160,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "piscina", "parrilla"],
      imagen: null,
      telefono: "+54 2664 571344",
      email: "info@piscoyaku.com.ar",
      web: "http://www.piscoyaku.com.ar",
    },
    {
      numero: "0000078",
      nombre: "Posada Valle del Sol",
      titular: null,
      domicilio: "Los Membrillos S/N",
      tipo: "posada",
      descripcion: "Posada con servicios básicos y ambiente familiar.",
      precio: 130,
      calificacion: 3.9,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2664 368288",
      email: "posadavalledelsol@gmail.com",
      web: "http://www.posadavalledelsol.com.ar",
    },
    {
      numero: "0000079",
      nombre: "Pueblo de Jesús",
      titular: null,
      domicilio: "Las Fucsias 707",
      tipo: "cabañas",
      descripcion: "Cabaña rústica en un entorno natural y tranquilo.",
      precio: 135,
      calificacion: 4.0,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2664 546507",
      email: null,
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000080",
      nombre: "Quela",
      titular: null,
      domicilio: "Las Violetas 47",
      tipo: "cabañas",
      descripcion: "Cabaña rodeada de naturaleza, ideal para relajarse.",
      precio: 140,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 580392",
      email: "info@complejoquela.com",
      web: "http://www.complejoquela.com",
    },
    {
      numero: "0000081",
      nombre: "Ramadas",
      titular: null,
      domicilio: "Las Violetas y Los Tulipanes",
      tipo: "complejo",
      descripcion: "Complejo turístico en un entorno natural.",
      precio: 155,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "piscina"],
      imagen: null,
      telefono: "+54 2664 234529",
      email: "complejoramadas@hotmail.com.ar",
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000082",
      nombre: "Retana",
      titular: null,
      domicilio: "Reina Mora y Las Catitas",
      tipo: "cabañas",
      descripcion: "Cabaña con servicios completos en medio de la naturaleza.",
      precio: 150,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 369726",
      email: "info@complejoretana.com",
      web: "http://www.complejoretana.com.ar",
    },
    {
      numero: "0000083",
      nombre: "Rincón Potrero",
      titular: null,
      domicilio: "Las Violetas 67",
      tipo: "cabañas",
      descripcion: "Cabaña acogedora en un entorno natural.",
      precio: 140,
      calificacion: 4.1,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 338959",
      email: "rinconpotrero@yahoo.com.ar",
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000084",
      nombre: "Ruca Kiyen",
      titular: null,
      domicilio: "Rey del Bosque 37",
      tipo: "cabañas",
      descripcion: "Cabaña en medio de la vegetación, ideal para descansar.",
      precio: 145,
      calificacion: 4.0,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 869488",
      email: "rkiyen@gmail.com",
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000086",
      nombre: "Sol Dorado",
      titular: null,
      domicilio: "Los Horneros 3427",
      tipo: "cabañas",
      descripcion: "Cabaña con jardín y parrilla, ideal para familias.",
      precio: 140,
      calificacion: 4.0,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 551587",
      email: "csoldorado@yahoo.com.ar",
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000087",
      nombre: "Solares de Potrero",
      titular: null,
      domicilio: "Los Alisos 45",
      tipo: "cabañas",
      descripcion: "Cabaña amplia y confortable en un entorno natural.",
      precio: 145,
      calificacion: 4.1,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: "+54 2664 663410",
      email: "solaresdepotrero@hotmail.com",
      web: "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
    },
    {
      numero: "0000088",
      nombre: "Sololosta Cabañas",
      titular: null,
      domicilio: "Los Paraísos y Los Álamos",
      tipo: "cabañas",
      descripcion: "Cabaña rústica ideal para disfrutar de la tranquilidad.",
      precio: 135,
      calificacion: 4.0,
      servicios: ["wifi", "jardín"],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000090",
      nombre: "Tronco Silvestre",
      titular: null,
      domicilio: "Reina Mora Lote 8",
      tipo: "cabañas",
      descripcion:
        "Cabaña rodeada de vegetación autóctona, ideal para descansar.",
      precio: 140,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2664 589087",
      email: "complejolostroncossanluis@gmail.com",
      web: "http://www.complejoslostroncospotrero.com.ar",
    },
    {
      numero: "0000091",
      nombre: "Valle La Vaguada",
      titular: null,
      domicilio: "Los Grateus 69",
      tipo: "cabañas",
      descripcion: "Cabaña en un entorno natural y tranquilo.",
      precio: 150,
      calificacion: 4.2,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 2267 475169",
      email: "reservas@vallelavaguada.com.ar",
      web: "http://www.vallelavaguada.com.ar",
    },
    {
      numero: "0000092",
      nombre: "Villa Las Lomas",
      titular: null,
      domicilio: "Los Espinillos Parcela 441",
      tipo: "complejo",
      descripcion: "Complejo turístico rodeado de naturaleza.",
      precio: 160,
      calificacion: 4.3,
      servicios: ["wifi", "jardín", "parrilla"],
      imagen: null,
      telefono: "+54 351 2241661",
      email: null,
      web: "http://www.villalaslomas.wixsite.com/misitio/contactos",
    },
    {
      numero: "0000093",
      nombre: "Villa King",
      titular: null,
      domicilio: "Las Hortensias y Av del Circuito",
      tipo: "complejo",
      descripcion:
        "Complejo turístico con ambiente familiar y servicios completos.",
      precio: 155,
      calificacion: 4.3,
      servicios: ["wifi", "jardín", "piscina", "parrilla"],
      imagen: null,
      telefono: "+54 2664 660251",
      email: "villakins@hotmail.com",
      web: "http://www.villakins.com.ar/",
    },
    {
      numero: "0000094",
      nombre: "Augurios del Sol 2",
      titular: "Nasisi Eduardo Orlando",
      domicilio: "Siete Colores y Colibri",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000095",
      nombre: "Bella Vista",
      titular: "Coachaca Ricardo",
      domicilio: "Los Manzanos 180",
      tipo: "cabañas",
      descripcion:
        "Cabañas Bella Vista ofrece un lugar ideal para descansar, con excelente ubicación y servicios que lo hacen el lugar perfecto.",
      precio: "Desde $50.000 por noche para 2 personas",
      calificacion: "4,3 de 6 valoraciones",
      servicios: ["Pileta exterior", "Ropa de cama", "Televisión"],
      imagen:
        "https://www.welcomeargentina.com/potrerodelosfunes/cabanas-bella-vista.html",
      telefono: "+54 9 266 4348132",
      email: null,
      web: null,
    },
    {
      numero: "0000096",
      nombre: "Casa Alquiler por Día",
      titular: "Gonzalez Rodrigo",
      domicilio: "24 Viv Mza A Casa 24 Potrero",
      tipo: "casa",
      descripcion:
        "Casa en alquiler por día en Potrero de los Funes, ideal para turismo de verano.",
      precio: null,
      calificacion: null,
      servicios: [],
      imagen:
        "https://www.parairnos.com/alquiler/potrero-de-los-funes/alquilo-casa-por-dia-en-potrero-de-los-funes-san-luis-turismo-verano-12609.html",
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000097",
      nombre: "Casa Las Flores",
      titular: "Gonzalez Josue",
      domicilio: "Las Violetas 178",
      tipo: "casa",
      descripcion:
        "La Casa de Las Flores ofrece alojamiento en Potrero de los Funes, San Luis.",
      precio: "Desde $77.999 por día",
      calificacion: null,
      servicios: ["Pileta", "WiFi", "Estacionamiento gratuito"],
      imagen: "https://www.argentinaturismo.com.ar/casadelasflores/",
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000098",
      nombre: "Casa Majo",
      titular: "Cangianno Laura Raquel",
      domicilio: "Santa Rita 481",
      tipo: "casa",
      descripcion:
        "Casa Majo ofrece alojamiento con pileta privada y WiFi gratis en Potrero de los Funes.",
      precio: null,
      calificacion: "9,7 de 68 comentarios",
      servicios: [
        "Pileta privada",
        "WiFi gratis",
        "Estacionamiento privado gratuito",
      ],
      imagen: "https://www.booking.com/hotel/ar/casa-majo.de.html",
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000099",
      nombre: "Cefiro",
      titular: "Audisio Daniel Eladio",
      domicilio: "Loteo Piquillem al Lado de Cabañas Elsa & Fred",
      tipo: "cabañas",
      descripcion:
        "Cabañas Cefiro ofrece alojamiento con pileta y vistas a las montañas en Potrero de los Funes.",
      precio: null,
      calificacion: null,
      servicios: ["Pileta", "WiFi", "Asadores", "Cocina equipada"],
      imagen:
        "https://www.parairnos.com/alquileres-en-potrero-de-los-funes-con-pileta",
      telefono: null,
      email: null,
      web: "https://www.cabaniascefiro.com.ar",
    },
    {
      numero: "0000100",
      nombre: "El Colibri",
      titular: "Bascourleguy Diego",
      domicilio: "Los Castaños 33",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000101",
      nombre: "Colores de los Funes",
      titular: "Sertrib S.A.",
      domicilio: "Circuito del Lago y Río s/n",
      tipo: "cabañas",
      descripcion:
        "Colores de los Funes Lodge ofrece alojamiento con vistas panorámicas y comodidades modernas.",
      precio: null,
      calificacion: null,
      servicios: ["Pileta exterior", "WiFi gratis", "Estacionamiento gratuito"],
      imagen:
        "https://www.tripadvisor.com.br/Hotel_Review-g2052513-d5223543-Reviews-Colores_de_los_Funes_Lodge-Potrero_de_los_Funes_Province_of_San_Luis_Cuyo.html",
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000102",
      nombre: "Cumelem",
      titular: "Ambrosini Mario",
      domicilio: "Los Almendros 902",
      tipo: "cabañas",
      descripcion:
        "Cabañas Cumelen ofrece alojamiento confortable en Potrero de los Funes.",
      precio: null,
      calificacion: null,
      servicios: ["Pileta exterior", "WiFi gratis", "Estacionamiento gratuito"],
      imagen:
        "https://www.tripadvisor.fr/Hotel_Review-g2052513-d12548724-Reviews-Cabanas_Cumelen-Potrero_de_los_Funes_Province_of_San_Luis_Cuyo.html",
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000103",
      nombre: "El Crepúsculo",
      titular: "Celi Vicenta del Rosario",
      domicilio: "Los Ciruelos 645",
      tipo: "cabañas",
      descripcion: "Dos cabañas con piscina y asador en Potrero de los Funes.",
      precio: null,
      calificacion: null,
      servicios: ["piscina", "asador"],
      imagen: null,
      telefono: null,
      email: null,
      web: "https://www.facebook.com/p/El-Crepusculo-caba%C3%B1as-100080100693330/",
    },
    {
      numero: "0000104",
      nombre: "El Fin del Afán",
      titular: "Sastre Paula",
      domicilio: "Los Espinillos s/n",
      tipo: "cabañas",
      descripcion: "Casa con piscina privada en Potrero de los Funes.",
      precio: null,
      calificacion: null,
      servicios: ["piscina privada", "jardín", "estacionamiento gratuito"],
      imagen: null,
      telefono: "+54 9 291 645-6061",
      email: null,
      web: "https://www.instagram.com/el.fin.del.afan/",
    },
    {
      numero: "0000105",
      nombre: "Encanto Puntano",
      titular: "Navarro / Bernacchini",
      domicilio: "Los Arandanos 15 ",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: "+54 9 2664 654244",
      email: null,
      web: null,
    },
    {
      numero: "0000106",
      nombre: "Estación Potrero",
      titular: "Chariano José Ángel",
      domicilio: "Los Espinillos 438",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: "+54 9 11 31023001",
      email: "estacionpotrero@gmail.com",
      web: "www.estacionpotrero.com",
    },
    {
      numero: "0004106",
      nombre: "CABAÑAS HOLTFOR",
      titular: "Chariano José Ángel",
      domicilio: "Los Espinillos 434",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [ "wifi",
        "estacionamiento",
        "piscina",
        "aire acondicionado",
        "parrilla",
        "jardín",
        ],
      imagen: null,
      telefono: "+54 9 11 61471132",
      email: null,
      web: "https://holtfor.wixsite.com/alojamiento",
    },
    {
      numero: "0000107",
      nombre: "Eureka",
      titular: "Barro Rosana Noemí",
      domicilio: "Los Piquillines 3800",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000108",
      nombre: "El Nogal",
      titular: "Torres Antonio Omar",
      domicilio: "Cesar Bustos s/n",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000109",
      nombre: "Kume",
      titular: "Zabala Gerardo Martín",
      domicilio: "Los Piquillines 425",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000110",
      nombre: "La Gringa",
      titular: "Sarmiento Judith",
      domicilio: "Los Paraísos 186",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000111",
      nombre: "La Colina",
      titular: "Gudiño Rodolfo",
      domicilio: "Zona Boxes",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000112",
      nombre: "Las Piedras",
      titular: "Caloia Gerardo",
      domicilio: "Los Damascos 453",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      "numero": "0000113",
      "nombre": "Posada Spa Terrazas",
      "titular": "Meiriño Favio",
      "domicilio": "Av. Circuito del Lago y Río, Potrero de los Funes, San Luis, Argentina",
      "tipo": "Posadas Spa",
      "descripcion": "La Posada Spa Terrazas es un encantador hotel de 3 estrellas ubicado en Potrero de los Funes, San Luis, Argentina. Ofrece modernas instalaciones que incluyen piscina climatizada (interior y exterior), centro de fitness, spa, restaurante y Wi-Fi gratuito. Su ambiente acogedor y estratégica ubicación, cerca del Circuito Internacional y de atracciones naturales, aseguran una experiencia inolvidable.",
      "precio": "",
      "calificacion": 9.6,
      "servicios": [
        "wifi",
        "estacionamiento",
        "piscina",
        "gimnasio",
        "aire acondicionado",
        "tv",
        "spa"
      ],
      "imagen": "https://www.terrazasdepotrero.com.ar/imagenes/hotel_exterior.jpg",
      "telefono": "0266 154777751",
      "email": "posadaspaterrazas@gmail.com",
      "web": "https://www.terrazasdepotrero.com.ar/"
    }
    ,
    {
      numero: "0000114",
      nombre: "Lo de Esther",
      titular: "Lucero Raúl Alberto",
      domicilio: "Barrio 69 Viv. Mza. B / Casa 11",
      tipo: "casa",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000115",
      nombre: "Lunamakena",
      titular: "Descanso y Sabores SAS",
      domicilio: "Los Membrillos 83",
      tipo: "complejo turístico",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000115",
      nombre: "Lunamakena",
      titular: "Descanso y Sabores SAS",
      domicilio: "Los Membrillos 83",
      tipo: "complejo turístico",
      descripcion:
        "Casa de té, restaurante y hospedaje con vistas al lago y a las sierras. Ofrece espacios diseñados para el descanso y la experiencia gastronómica local.",
      precio: null,
      calificacion: null,
      servicios: [
        "Piscina",
        "Restaurante",
        "Casa de té",
        "Habitaciones y departamentos de dos y tres ambientes",
      ],
      imagen: "https://lunamakena.com/images/portada.jpg",
      telefono: "+54 266 4302349",
      email: "administracion@lunamakena.com.ar",
      web: "https://lunamakena.com/",
    },
    {
      numero: "0000116",
      nombre: "Oasis Apart",
      titular: "Peñaloza Rosana",
      domicilio: "Ruta 18km 20 Paraje Los Arroyitos",
      tipo: "apart hotel",
      descripcion:
        "Hospedaje pet-friendly que ofrece desayunos orgánicos, conexión a internet de alta velocidad y estacionamiento privado.",
      precio: null,
      calificacion: null,
      servicios: [
        "Pet-friendly",
        "Desayunos orgánicos",
        "Internet de alta velocidad",
        "Estacionamiento privado",
      ],
      imagen: "https://www.instagram.com/sierrasoasis_apart/media/?size=l",
      telefono: "+54 266 4169959",
      email: null,
      web: "https://www.instagram.com/sierrasoasis_apart/",
    },
    {
      numero: "0000117",
      nombre: "Ranchito de Sueños",
      titular: "Lopez",
      domicilio: "Acceso 14",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000118",
      nombre: "Rincón del Río",
      titular: "Flores Mauricio",
      domicilio: "Los Almendros 113",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000119",
      nombre: "Tata y la Emilia",
      titular: "Federici Erica",
      domicilio: "Los Tulipanes 380",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000120",
      nombre: "Terra Soles",
      titular: "Bacchetta Maria Sonia",
      domicilio: "Las Margaritas s/n",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000121",
      nombre: "Turmalina",
      titular: "Cejas Susana Cajera Muni",
      domicilio: "Calle 2 de Abril Mza A Casa 9",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000122",
      nombre: "Vista Calma",
      titular: "Veas Juan Americo Marcelo",
      domicilio: "Los Paraísos 1357",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
    {
      numero: "0000123",
      nombre: "Vista Azul",
      titular: "Lucero Muñoz Carlos",
      domicilio: "Las Catalpas 157",
      tipo: "cabañas",
      descripcion: null,
      precio: null,
      calificacion: null,
      servicios: [],
      imagen: null,
      telefono: null,
      email: null,
      web: null,
    },
  ];
  // Cargar datos aleatorizados al inicio y cada vez que se renderiza el componente
  useEffect(() => {
    console.log("Mezclando alojamientos...");
    // En lugar de usar localStorage, hacemos una mezcla directa
    const randomizedAlojamientos = shuffleArray(alojamientos);
    console.log("Orden mezclado:", randomizedAlojamientos.map(a => a.nombre));
    setAlojamientosData(randomizedAlojamientos);
  }, []); // La dependencia vacía hace que se ejecute solo al montar el componente

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
    "departamento"
  ];

  // Filtrar alojamientos
  const filteredAlojamientos = alojamientosData.filter((alojamiento) => {
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
        alojamiento.servicios && alojamiento.servicios.includes(service)
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
    // Para "random", mantener el orden que ya está aleatorizado en alojamientosData
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
    const randomizedAlojamientos = shuffleArray(alojamientos);
    setAlojamientosData(randomizedAlojamientos);
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
          Alojamiento en Potrero de los Funes
        </h2>
        <p className="font-light text-gray-500 sm:text-xl">
          Descubrí los mejores lugares para alojarte en nuestro hermoso valle
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-8" ref={alojamientosRef}>
        {/* Búsqueda */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Buscar por nombre, descripción o ubicación..."
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
              <span>Filtros</span>
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
              <option value="random">Aleatorio</option>
              <option value="nombre">Por nombre</option>
            </select>
          </div>

          {/* Panel de filtros móvil */}
          {isFilterOpen && (
            <div className="mt-3 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
              <h4 className="font-medium mb-2">Tipo de alojamiento</h4>
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
                    {tipo === "todos" ? "Todos" : tipo}
                  </button>
                ))}
              </div>

              <h4 className="font-medium mb-2">Servicios</h4>
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
                  Limpiar filtros
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
                  {tipo === "todos" ? "Todos" : tipo}
                </button>
              ))}
            </div>

            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Ordenar por:</span>
              <select
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="random">Aleatorio</option>
                <option value="nombre">Nombre</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Filtrar por servicios</h4>
              {servicesFilter.length > 0 && (
                <button
                  onClick={() => setServicesFilter([])}
                  className="text-[#00add5] hover:underline text-sm"
                >
                  Limpiar
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
          Mostrando {filteredAlojamientos.length} {filteredAlojamientos.length === 1 ? 'alojamiento' : 'alojamientos'}
          {(selectedType !== "todos" || servicesFilter.length > 0 || searchTerm) && (
            <button
              onClick={resetFilters}
              className="ml-2 text-[#00add5] hover:underline"
            >
              Limpiar filtros
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