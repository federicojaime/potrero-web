/* eslint-disable react/prop-types */
import { useState } from 'react';
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


} from 'react-icons/fa';
import { Card, Button } from 'flowbite-react';

const AlojamientoModal = ({ onClose, alojamiento }) => {
    if (!alojamiento) return null;

    const TipoIcon = tipoAlojamientoIcon[alojamiento.tipo] || FaHome;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-[#00add5] text-white p-4 rounded-t-lg">
                    <h3 className="text-2xl font-semibold">{alojamiento.nombre}</h3>
                    <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex justify-center">
                        <TipoIcon className="text-7xl text-[#00add5]" />
                    </div>
                    <p className="text-base leading-relaxed text-gray-700">
                        {alojamiento.descripcion}
                    </p>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-[#00add5]">Servicios:</h3>
                        <div className="flex flex-wrap gap-2">
                            {alojamiento.servicios.map((servicio, i) => {
                                const Icon = iconMap[servicio];
                                return Icon ? (
                                    <span key={i} className="flex items-center text-gray-600">
                                        <Icon className="mr-1" />
                                        {servicio}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-[#00add5]">Dirección:</h3>
                        <p className="text-gray-700">{alojamiento.domicilio}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-[#00add5]">Contacto:</h3>
                        {alojamiento.telefono && (
                            <p className="flex items-center mb-2 text-gray-700">
                                <FaPhoneAlt className="mr-2 text-[#00add5]" />
                                <a href={`tel:${alojamiento.telefono}`} className="hover:underline">{alojamiento.telefono}</a>
                            </p>
                        )}
                        {alojamiento.email && (
                            <p className="flex items-center mb-2 text-gray-700">
                                <FaEnvelope className="mr-2 text-[#00add5]" />
                                <a href={`mailto:${alojamiento.email}`} className="hover:underline">{alojamiento.email}</a>
                            </p>
                        )}
                        {alojamiento.web && (
                            <p className="flex items-center text-gray-700">
                                <FaGlobe className="mr-2 text-[#00add5]" />
                                <a href={alojamiento.web} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {alojamiento.web}
                                </a>
                            </p>
                        )}
                    </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="w-full bg-[#00add5] text-white py-2 px-4 rounded-lg hover:bg-[#0098b8] transition duration-300"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
// Mapa de iconos por tipo de alojamiento
const tipoAlojamientoIcon = {
    hotel: FaHotel,
    'apart hotel': FaBuilding,
    hostería: FaHouseUser,
    posada: FaHouseUser,
    cabaña: FaHome,
    casa: FaHome,
    dormis: FaBed,
    departamento: FaBuilding,
    indeterminado: FaHome
};

const iconMap = {
    wifi: FaWifi,
    estacionamiento: FaParking,
    piscina: FaSwimmingPool,
    desayuno: FaCoffee,
    gimnasio: FaDumbbell,
    bar: FaGlassMartini,
    'aire acondicionado': FaSnowflake,
    parrilla: FaFireAlt,
    tv: FaTv,
    cocina: FaUtensils,
    jardín: FaTree,
    spa: FaSpa
};
function Alojamiento() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('todos');
    const [selectedAlojamiento, setSelectedAlojamiento] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;




    const alojamientos = [
        {
            "numero": "0000001",
            "nombre": "Aguamansa Apart Hotel",
            "titular": "Velasco Videla Maria Valeria",
            "domicilio": "Ruta N° 18 Camino a El Volcan",
            "tipo": "apart hotel",
            "descripcion": "Apart hotel con vista a las sierras, ideal para descanso.",
            "precio": 180,
            "calificacion": 4.3,
            "servicios": ["wifi", "estacionamiento", "piscina", "desayuno", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 266 4851673",
            "email": "reservas@aguamansasanluis.com.ar",
            "web": "http://www.aguamansasanluis.com.ar"
        },
        {
            "numero": "0000002",
            "nombre": "Aitue",
            "titular": "Castro Hector Ruben",
            "domicilio": "Av. del Circuito Esq. Las Lavandas",
            "tipo": "indeterminado",
            "descripcion": "Sin descripción disponible",
            "precio": null,
            "calificacion": null,
            "servicios": ["wifi", "tv por cable", "aire acondicionado", "estacionamiento"],
            "imagen": null,
            "telefono": "+54 266 4340442",
            "email": null,
            "web": null
        },
        {
            "numero": "0000003",
            "nombre": "Amantea Apart Hotel",
            "titular": "Felice Leonel",
            "domicilio": "Circuito Lateral Secc 1",
            "tipo": "apart hotel",
            "descripcion": "Apartamentos con vista al circuito de Potrero de los Funes.",
            "precio": 170,
            "calificacion": 4.4,
            "servicios": ["wifi", "estacionamiento", "piscina", "gimnasio"],
            "imagen": "/amantea-apart.jpg",
            "telefono": "+54 911 40447644",
            "email": "amanteaapart@gmail.com",
            "web": "http://www.amanteaapart.com.ar"
        },
        {
            "numero": "0000004",
            "nombre": "Antu Kuyen",
            "titular": null,
            "domicilio": "Las Lavandas 420",
            "tipo": "cabaña",
            "descripcion": "Cabaña rodeada de naturaleza y tranquilidad.",
            "precio": 150,
            "calificacion": 4.1,
            "servicios": ["wifi", "estacionamiento", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 2656 406128",
            "email": null,
            "web": null
        },
        {
            "numero": "0000005",
            "nombre": "AK Tu Lugar",
            "titular": null,
            "domicilio": "Las Lavandas 195",
            "tipo": "cabaña",
            "descripcion": "Cabaña cómoda y acogedora en un entorno natural.",
            "precio": 160,
            "calificacion": 4.0,
            "servicios": ["wifi", "cocina", "jardín"],
            "imagen": null,
            "telefono": "+54 2657 544490",
            "email": null,
            "web": "http://www.udaer.org"
        },
        {
            "numero": "0000006",
            "nombre": "Aroma de Potrero",
            "titular": null,
            "domicilio": "Los Arándanos 10",
            "tipo": "cabaña",
            "descripcion": "Sin descripción disponible",
            "precio": null,
            "calificacion": null,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2665 044950",
            "email": null,
            "web": null
        },
        {
            "numero": "0000007",
            "nombre": "Ayres de Funes",
            "titular": null,
            "domicilio": "Av. del Circuito 2920",
            "tipo": "cabañas",
            "descripcion": "Cabañas modernas con servicios de primera calidad.",
            "precio": 180,
            "calificacion": 4.2,
            "servicios": ["wifi", "estacionamiento", "desayuno", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 2664 893799",
            "email": null,
            "web": "http://www.ayresdefunes.com.ar"
        },
        {
            "numero": "0000008",
            "nombre": "Altos de Aliwen",
            "titular": null,
            "domicilio": "Santa Rita S/N",
            "tipo": "cabañas",
            "descripcion": "Espacio rodeado de naturaleza y confort.",
            "precio": 175,
            "calificacion": 4.3,
            "servicios": ["wifi", "estacionamiento", "piscina", "desayuno", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 320473",
            "email": "informes@altosdealiwen.com",
            "web": "http://www.altosdealiwen.com"
        },
        {
            "numero": "0000009",
            "nombre": "Balcones del Lago",
            "titular": null,
            "domicilio": "Barrio La Agripina",
            "tipo": "cabañas",
            "descripcion": "Cabañas con hermosas vistas al lago.",
            "precio": 190,
            "calificacion": 4.5,
            "servicios": ["wifi", "estacionamiento", "piscina"],
            "imagen": null,
            "telefono": "+54 2664 842205",
            "email": null,
            "web": null
        },
        {
            "numero": "0000010",
            "nombre": "Brisa Serrana",
            "titular": "Federico Closa",
            "domicilio": "Carpinteros 120",
            "tipo": "cabaña",
            "descripcion": "Cabaña con vistas al paisaje serrano.",
            "precio": 155,
            "calificacion": 4.2,
            "servicios": ["wifi", "estacionamiento", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4246617",
            "email": "federicoclosa@hotmail.com",
            "web": null
        },
        {
            "numero": "0000011",
            "nombre": "Brisa del Lago",
            "titular": null,
            "domicilio": "Santa Rita 84",
            "tipo": "cabaña",
            "descripcion": "Cabaña frente al lago con vistas increíbles.",
            "precio": 160,
            "calificacion": 4.0,
            "servicios": ["wifi", "estacionamiento", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 226521",
            "email": "brisadellago@hotmail.com",
            "web": "http://www.brisadellago.com.ar"
        },
        {
            "numero": "0000012",
            "nombre": "Cabañas Gallardo",
            "titular": "Vito Gallardo",
            "domicilio": "Los Arándanos 21",
            "tipo": "cabaña",
            "descripcion": "Cabañas con servicios completos para una estadía placentera.",
            "precio": 165,
            "calificacion": 4.1,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 11 2667 1472",
            "email": "vito.ga_llardo@hotmail.com",
            "web": null
        },
        {
            "numero": "0000013",
            "nombre": "Cabañas Iñaki + Anexo Cafetería",
            "titular": null,
            "domicilio": "Los Horneros 3183",
            "tipo": "cabaña",
            "descripcion": "Complejo de cabañas con cafetería anexa.",
            "precio": 170,
            "calificacion": 4.3,
            "servicios": ["wifi", "cafetería", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 869423",
            "email": "reservas@losinaki.com.ar",
            "web": "http://www.losinaki.com.ar"
        },
        {
            "numero": "0000014",
            "nombre": "Cabañas Lucero",
            "titular": null,
            "domicilio": "Los Arándanos 45",
            "tipo": "cabaña",
            "descripcion": "Cabaña equipada para el confort de los huéspedes.",
            "precio": 160,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 11 54297051",
            "email": null,
            "web": null
        },
        {
            "numero": "0000015",
            "nombre": "Carpe Diem",
            "titular": null,
            "domicilio": "Acceso 14",
            "tipo": "cabaña",
            "descripcion": "Cabaña con ambiente relajado y naturaleza alrededor.",
            "precio": 150,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 869488",
            "email": null,
            "web": "https://carpediemslcab.wixsite.com/carpediemsl"
        },
        {
            "numero": "0000016",
            "nombre": "Claro de Luna",
            "titular": null,
            "domicilio": "Cortaderas 355 – Esquina Las Lavandas A3",
            "tipo": "indeterminado",
            "descripcion": "Alojamiento con ambiente acogedor y tranquilo.",
            "precio": null,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 553033",
            "email": null,
            "web": "http://www.argentinaturismo.com.ar/clarodeluna/"
        },
        {
            "numero": "0000017",
            "nombre": "Castillo del Sol",
            "titular": null,
            "domicilio": "Circuito del Lago 3360",
            "tipo": "cabañas",
            "descripcion": "Cabañas con un ambiente estilo castillo y vista al lago.",
            "precio": 180,
            "calificacion": 4.5,
            "servicios": ["wifi", "jardín", "bar"],
            "imagen": null,
            "telefono": "+54 2664 558947",
            "email": "castillo.desol@yahoo.com.ar",
            "web": "http://www.castillodesol.com.ar"
        },
        {
            "numero": "0000018",
            "nombre": "Complejo del Lago - Anexo Dormis",
            "titular": null,
            "domicilio": "Av. Circuito Km 18",
            "tipo": "complejo",
            "descripcion": "Complejo turístico con amplias opciones de hospedaje.",
            "precio": 200,
            "calificacion": 4.3,
            "servicios": ["wifi", "estacionamiento", "piscina"],
            "imagen": null,
            "telefono": "+54 2664 229635",
            "email": "Informescomplejodellago@gmail.com",
            "web": "http://www.complejodellago.com.ar"
        },
        {
            "numero": "0000019",
            "nombre": "Complejo del Lago - Anexo Departamentos",
            "titular": null,
            "domicilio": "Av. Circuito Km 18",
            "tipo": "complejo",
            "descripcion": "Apartamentos con vista al lago en un entorno natural.",
            "precio": 210,
            "calificacion": 4.4,
            "servicios": ["wifi", "estacionamiento", "piscina"],
            "imagen": null,
            "telefono": "+54 2664 229636",
            "email": "Informescomplejodellago@gmail.com",
            "web": "http://www.complejodellago.com.ar"
        },
        {
            "numero": "0000020",
            "nombre": "Complejo El Labrador",
            "titular": null,
            "domicilio": "Juanon Lucero S/N",
            "tipo": "complejo",
            "descripcion": "Complejo con vistas panorámicas y actividades al aire libre.",
            "precio": 220,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla", "estacionamiento"],
            "imagen": null,
            "telefono": "+54 2664 611744",
            "email": "contacto@complejoellabrador.com.ar",
            "web": "http://www.complejoellabrador.com.ar"
        },
        {
            "numero": "0000021",
            "nombre": "Colibrí",
            "titular": null,
            "domicilio": "Los Castaños 33",
            "tipo": "cabaña",
            "descripcion": "Cabaña rodeada de vegetación autóctona.",
            "precio": 160,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 584169",
            "email": "elcolibripotrero@yahoo.com",
            "web": "http://www.udaer.org"
        },
        {
            "numero": "0000022",
            "nombre": "Cumelem",
            "titular": null,
            "domicilio": "Los Almendros 902",
            "tipo": "cabaña",
            "descripcion": "Sin descripción disponible",
            "precio": null,
            "calificacion": null,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 257465",
            "email": null,
            "web": "http://www.udaer.org"
        },
        {
            "numero": "0000023",
            "nombre": "Complejo El Mirador",
            "titular": null,
            "domicilio": "Av. del Circuito Esq. Las Catalpas",
            "tipo": "complejo",
            "descripcion": "Complejo turístico con vistas panorámicas y múltiples servicios.",
            "precio": 230,
            "calificacion": 4.5,
            "servicios": ["wifi", "piscina", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 668764",
            "email": "info@complejodelmirador.com.ar",
            "web": "http://www.complejodelmirador.com.ar"
        },
        {
            "numero": "0000024",
            "nombre": "Del Fuego",
            "titular": null,
            "domicilio": "Los Eucaliptos 259",
            "tipo": "cabaña",
            "descripcion": "Cabaña cálida en un entorno natural.",
            "precio": 140,
            "calificacion": 4.1,
            "servicios": ["wifi", "parrilla"],
            "imagen": null,
            "telefono": "+54 2901 468247",
            "email": "joseciccone66@gmail.com",
            "web": "http://www.cabanasdelfuego.wordpress.com"
        },
        {
            "numero": "0000025",
            "nombre": "Destello del Lago",
            "titular": null,
            "domicilio": "Av. del Circuito E/ A3 y A4",
            "tipo": "departamentos",
            "descripcion": "Departamentos frente al lago, con servicios para relajarse.",
            "precio": 200,
            "calificacion": 4.4,
            "servicios": ["wifi", "piscina", "desayuno", "bar"],
            "imagen": null,
            "telefono": "+54 2664 834995",
            "email": "info@destellosdellago.com.ar",
            "web": null
        }
        ,
        {
            "numero": "0000026",
            "nombre": "Doña Emilia",
            "titular": null,
            "domicilio": "Los Eucaliptos Bis S/N",
            "tipo": "cabaña",
            "descripcion": "Alojamiento rústico en un entorno natural.",
            "precio": null,
            "calificacion": 3.8,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null
        },
        {
            "numero": "0000027",
            "nombre": "El Caldén",
            "titular": null,
            "domicilio": "Los Piquillines 3729",
            "tipo": "cabaña",
            "descripcion": "Cabaña con ambiente familiar y tranquilidad.",
            "precio": 150,
            "calificacion": 4.0,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 2645 089754",
            "email": null,
            "web": null
        },
        {
            "numero": "0000028",
            "nombre": "El Circuito Cabañas",
            "titular": null,
            "domicilio": "Av. Circuito y Acceso 13",
            "tipo": "cabaña",
            "descripcion": "Cabañas bien equipadas, cerca del circuito turístico.",
            "precio": 180,
            "calificacion": 4.2,
            "servicios": ["wifi", "piscina", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 815304",
            "email": null,
            "web": null
        },
        {
            "numero": "0000029",
            "nombre": "El Colibrí",
            "titular": null,
            "domicilio": "Los Eucaliptos 68",
            "tipo": "cabaña",
            "descripcion": "Cabaña acogedora con vista al entorno serrano.",
            "precio": 160,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 584869",
            "email": "elcolibripotrero@yahoo.com",
            "web": null
        },
        {
            "numero": "0000030",
            "nombre": "Encanto Puntano",
            "titular": null,
            "domicilio": "Los Arandanos 15",
            "tipo": "cabaña",
            "descripcion": "Cabaña con encanto especial en un ambiente natural.",
            "precio": 175,
            "calificacion": 4.3,
            "servicios": ["wifi", "piscina", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 654244",
            "email": "Encantopuntano@gmail.com",
            "web": "http://www.encantopuntano.com.ar/"
        },
        {
            "numero": "0000031",
            "nombre": "Estación Potrero",
            "titular": null,
            "domicilio": "Los Espinillos 438",
            "tipo": "cabaña",
            "descripcion": "Cabañas con vistas al paisaje montañoso.",
            "precio": 180,
            "calificacion": 4.4,
            "servicios": ["wifi", "jardín", "parrilla", "piscina"],
            "imagen": null,
            "telefono": "+54 2664 928625",
            "email": "estacionpotrero@gmail.com",
            "web": "http://www.estacionpotrero.com/"
        },
        {
            "numero": "0000032",
            "nombre": "Eureka",
            "titular": null,
            "domicilio": "Los Piquillines 3800",
            "tipo": "complejo",
            "descripcion": "Complejo turístico ideal para familias.",
            "precio": 185,
            "calificacion": 4.2,
            "servicios": ["wifi", "piscina", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 678901",
            "email": null,
            "web": "http://www.complejoeureka.com/"
        },
        {
            "numero": "0000033",
            "nombre": "El Nogal",
            "titular": null,
            "domicilio": "Cesar Bustos S/N",
            "tipo": "cabaña",
            "descripcion": "Cabaña rústica en un entorno natural.",
            "precio": 145,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 755072",
            "email": null,
            "web": null
        },
        {
            "numero": "0000034",
            "nombre": "Del Duende",
            "titular": null,
            "domicilio": "Los Eucaliptos 150",
            "tipo": "cabaña",
            "descripcion": "Cabañas con encanto natural y tranquilidad.",
            "precio": 150,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2901 469068",
            "email": "info@cabanasdelduende.com",
            "web": "http://www.cabanasdelduende.com/"
        },
        {
            "numero": "0000035",
            "nombre": "El Reparo",
            "titular": null,
            "domicilio": "Los Piquillines Lote 4",
            "tipo": "cabaña",
            "descripcion": "Cabaña ideal para descansar rodeado de naturaleza.",
            "precio": 155,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 709284",
            "email": null,
            "web": "https://udaer.org/"
        },
        {
            "numero": "0000036",
            "nombre": "El Triunfo Apart",
            "titular": null,
            "domicilio": "Las Margaritas y Cortaderas A5",
            "tipo": "apart hotel",
            "descripcion": "Apart hotel con servicios para una estadía cómoda.",
            "precio": 165,
            "calificacion": 4.3,
            "servicios": ["wifi", "estacionamiento", "piscina"],
            "imagen": null,
            "telefono": "+54 2664 266538",
            "email": null,
            "web": "http://www.udaer.org/"
        },
        {
            "numero": "0000037",
            "nombre": "Gemas del Lago",
            "titular": null,
            "domicilio": "Los Eucaliptos S/N A14",
            "tipo": "cabaña",
            "descripcion": "Cabañas con vistas al lago y equipamiento completo.",
            "precio": 170,
            "calificacion": 4.4,
            "servicios": ["wifi", "jardín", "parrilla", "piscina"],
            "imagen": null,
            "telefono": "+54 2664 631687",
            "email": "liclauramai2@hotmail.com",
            "web": "http://www.gemasdellago.com.ar"
        },
        {
            "numero": "0000038",
            "nombre": "Hotel Potrero de los Funes",
            "titular": null,
            "domicilio": "Ruta 18 Km. 16",
            "tipo": "hotel",
            "descripcion": "Hotel con servicios de lujo y vista al lago.",
            "precio": 250,
            "calificacion": 4.8,
            "servicios": ["wifi", "piscina", "gimnasio", "spa", "bar", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 2664 440038",
            "email": "reservas@hotelpotrero.sanluis.gov.ar",
            "web": "http://www.hotelpotrero.sanluis.gov.ar/"
        },
        {
            "numero": "0000039",
            "nombre": "Hostería Lihuen",
            "titular": null,
            "domicilio": "Las Caléndulas 299",
            "tipo": "hostería",
            "descripcion": "Hostería tradicional con ambiente familiar.",
            "precio": 140,
            "calificacion": 3.9,
            "servicios": ["wifi", "estacionamiento", "desayuno"],
            "imagen": null,
            "telefono": "+54 2664 495275",
            "email": "hosterialihuen@coopenetlujan.com.ar",
            "web": "http://www.hotelesdeargentina.com.ar/san-luis/potrero-de-los-funes/hosterias-1-estrella/lihuen"
        },
        {
            "numero": "0000040",
            "nombre": "Holtfor",
            "titular": null,
            "domicilio": "Los Espinillos 434",
            "tipo": "complejo",
            "descripcion": "Complejo turístico cómodo y bien equipado.",
            "precio": 160,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 11 61471132",
            "email": null,
            "web": "http://www.udaer.org/"
        },
        {
            "numero": "0000041",
            "nombre": "Hotel Puntano",
            "titular": null,
            "domicilio": "Los Almendros 16",
            "tipo": "hotel",
            "descripcion": "Hotel con servicios de primera calidad y confort.",
            "precio": 220,
            "calificacion": 4.5,
            "servicios": ["wifi", "piscina", "desayuno", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 2664 748431",
            "email": "info@hotelpuntano.com.ar",
            "web": "http://www.hotelpuntano.com.ar"
        },
        {
            "numero": "0000042",
            "nombre": "Jaipur",
            "titular": null,
            "domicilio": "Las Tipas Esq. Los Pinos 110",
            "tipo": "cabaña",
            "descripcion": "Cabaña estilo rústico en medio de la naturaleza.",
            "precio": 130,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 555452",
            "email": "moniro.delia@hotmail.com",
            "web": "http://www.turismoenpotrerodelosfunes.com/alojamientos-habilitados"
        },
        {
            "numero": "0000043",
            "nombre": "Koba",
            "titular": null,
            "domicilio": "Los Piquillines 3540",
            "tipo": "cabaña",
            "descripcion": "Cabaña acogedora ideal para parejas.",
            "precio": 145,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2665 004996",
            "email": null,
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000044",
            "nombre": "La Quebrada Apart Hotel",
            "titular": null,
            "domicilio": "Los Ciruelos y Los Peros",
            "tipo": "apart hotel",
            "descripcion": "Apart hotel con confort y vistas a la naturaleza.",
            "precio": 180,
            "calificacion": 4.3,
            "servicios": ["wifi", "piscina", "jardín", "estacionamiento"],
            "imagen": null,
            "telefono": "+54 2664 019664",
            "email": null,
            "web": null
        },
        {
            "numero": "0000045",
            "nombre": "La Casa de Maria Delia",
            "titular": null,
            "domicilio": "Barrio Las Carolinas Mza 40 Casa 6",
            "tipo": "casa",
            "descripcion": "Casa de alquiler por día en zona tranquila.",
            "precio": 120,
            "calificacion": 3.8,
            "servicios": ["jardín", "parrilla"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null
        },
        {
            "numero": "0000046",
            "nombre": "La Casa de Muñe",
            "titular": null,
            "domicilio": "Mza G Casa 7 Bº 69 Ara Gral Belgrano",
            "tipo": "casa",
            "descripcion": "Casa acogedora para alquilar por días.",
            "precio": 125,
            "calificacion": 4.0,
            "servicios": ["jardín"],
            "imagen": null,
            "telefono": "+54 2664 649875",
            "email": null,
            "web": null
        },
        {
            "numero": "0000047",
            "nombre": "La Casa del Tata - Hostal",
            "titular": null,
            "domicilio": "Las Violetas 259",
            "tipo": "hostal",
            "descripcion": "Hostal tradicional con ambiente hogareño.",
            "precio": 135,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 209889",
            "email": null,
            "web": "https://udaer.org/"
        },
        {
            "numero": "0000048",
            "nombre": "La Lomita",
            "titular": null,
            "domicilio": "Los Paraísos y Pje. Las Calandrias",
            "tipo": "cabaña",
            "descripcion": "Cabaña en un entorno natural y tranquilo.",
            "precio": 140,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 11 22920254",
            "email": "complejolalomitaok@gmail.com",
            "web": "https://udaer.org/"
        },
        {
            "numero": "0000049",
            "nombre": "La Mamalia - Casa en Alquiler",
            "titular": null,
            "domicilio": "Bº Ara Gral. Belgrano Mza.G C.2",
            "tipo": "casa",
            "descripcion": "Casa en alquiler ideal para familias.",
            "precio": 130,
            "calificacion": 3.9,
            "servicios": ["jardín"],
            "imagen": null,
            "telefono": "+54 2664 649875",
            "email": null,
            "web": null
        },
        {
            "numero": "0000050",
            "nombre": "La Norma - Casa en Alquiler",
            "titular": null,
            "domicilio": "Mza G Casa 4 B° Ara Gral Belgrano",
            "tipo": "casa",
            "descripcion": "Casa amplia en alquiler por día.",
            "precio": 135,
            "calificacion": 3.8,
            "servicios": ["jardín"],
            "imagen": null,
            "telefono": "+54 2664 649875",
            "email": null,
            "web": null
        },
        {
            "numero": "0000051",
            "nombre": "La Soleada",
            "titular": null,
            "domicilio": "Los Ciruelos 648",
            "tipo": "cabaña",
            "descripcion": "Cabaña rodeada de vegetación y tranquilidad.",
            "precio": 150,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 11 41939061",
            "email": null,
            "web": "https://www.udaer.org/"
        },
        {
            "numero": "0000052",
            "nombre": "Las Acacias",
            "titular": null,
            "domicilio": "Los Guindos 2197",
            "tipo": "cabaña",
            "descripcion": "Cabaña acogedora en un ambiente natural.",
            "precio": 145,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2665 048624",
            "email": null,
            "web": null
        },
        {
            "numero": "0000053",
            "nombre": "Las Encinas",
            "titular": null,
            "domicilio": "Santa Rita Esq. Jazmines",
            "tipo": "cabaña",
            "descripcion": "Cabaña rodeada de encinas y naturaleza.",
            "precio": 160,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 495450",
            "email": "info@lasencinas.com.ar",
            "web": "http://lasencinas.com.ar/"
        },
        {
            "numero": "0000054",
            "nombre": "Las Mercedes",
            "titular": null,
            "domicilio": "Av. del Circuito y Cost. Los Arenales",
            "tipo": "cabaña",
            "descripcion": "Cabaña con entorno serrano y paisajes naturales.",
            "precio": 150,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2396 634651",
            "email": "cabaniaslasmercedes@hotmail.com",
            "web": null
        },
        {
            "numero": "0000055",
            "nombre": "Las Torcazas",
            "titular": null,
            "domicilio": "Los Paraísos 20",
            "tipo": "cabaña",
            "descripcion": "Cabaña ideal para descansar en la naturaleza.",
            "precio": 140,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 11 65771960",
            "email": null,
            "web": "https://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000056",
            "nombre": "Lito",
            "titular": null,
            "domicilio": "Las Margaritas 420",
            "tipo": "cabaña",
            "descripcion": "Cabaña con ambiente tranquilo y cómodo.",
            "precio": 130,
            "calificacion": 3.9,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 012298",
            "email": "andreavc30@hotmail.com",
            "web": "https://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000057",
            "nombre": "Los Fresnos",
            "titular": null,
            "domicilio": "Las Tipas 2859",
            "tipo": "cabaña",
            "descripcion": "Cabaña rodeada de fresnos y vegetación autóctona.",
            "precio": 140,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 372291",
            "email": "losfresnos-potrero@hotmail.com",
            "web": "https://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000058",
            "nombre": "Los Arroyitos",
            "titular": null,
            "domicilio": "Ruta 18 Km 20",
            "tipo": "cabaña",
            "descripcion": "Cabaña con vistas al arroyo y naturaleza.",
            "precio": 150,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "piscina"],
            "imagen": null,
            "telefono": "+54 2664 554776",
            "email": "losarroyitos.pt@gmail.com",
            "web": "http://www.losarroyitos.com"
        },
        {
            "numero": "0000059",
            "nombre": "Los Alelíes",
            "titular": null,
            "domicilio": "Los Alelíes 185 Esq. Las Petunias",
            "tipo": "complejo",
            "descripcion": "Complejo con cabañas amplias y cómodas.",
            "precio": 160,
            "calificacion": 4.3,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2604 632629",
            "email": "complejolosalelies@hotmail.com",
            "web": "http://www.alquilerargentina.com/alojamientos/wn51-Complejo-Los-Alel%C3%ADes-Complejo-de-Caba%C3%B1as-Potrero-De-Los-Funes.html"
        },
        {
            "numero": "0000060",
            "nombre": "Los Naranjos",
            "titular": null,
            "domicilio": "Los Guindos 2191",
            "tipo": "hostería",
            "descripcion": "Hostería acogedora con servicios básicos.",
            "precio": 130,
            "calificacion": 3.8,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 205210",
            "email": "losnaranjosdepotrero@gmail.com",
            "web": "http://www.potrerofunes.wixsite.com/hosterialosnaranjos"
        },
        {
            "numero": "0000061",
            "nombre": "Los Molles",
            "titular": null,
            "domicilio": "Los Molles 450",
            "tipo": "cabaña",
            "descripcion": "Cabaña cómoda con hermosas vistas a la naturaleza.",
            "precio": 140,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 659027",
            "email": "Complejolosmolles@gmail.com",
            "web": "http://www.complejolosmolles.com.ar/"
        },
        {
            "numero": "0000062",
            "nombre": "Los Pinos 1",
            "titular": null,
            "domicilio": "Los Pinos 132",
            "tipo": "cabaña",
            "descripcion": "Cabaña en un entorno natural, ideal para relajarse.",
            "precio": 145,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 678680",
            "email": "fabiomuller76@gmail.com",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000063",
            "nombre": "Los Paraísos",
            "titular": null,
            "domicilio": "Av. del Circuito 3236",
            "tipo": "complejo",
            "descripcion": "Complejo con cabañas rodeadas de naturaleza.",
            "precio": 150,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 219921",
            "email": "carlosvcaballero@gmail.com",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000064",
            "nombre": "La Lucanda",
            "titular": null,
            "domicilio": "Las Tipas 2860",
            "tipo": "complejo",
            "descripcion": "Complejo con cabañas equipadas y confortables.",
            "precio": 160,
            "calificacion": 4.3,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 244399",
            "email": null,
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000065",
            "nombre": "Luces del Lago",
            "titular": null,
            "domicilio": "Catalpas 11",
            "tipo": "cabaña",
            "descripcion": "Cabaña cómoda con vista al lago.",
            "precio": 155,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 035821",
            "email": "robyross7@gmail.com",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000066",
            "nombre": "LudMar",
            "titular": null,
            "domicilio": "Las Violetas 98 y Las Rosas",
            "tipo": "cabaña",
            "descripcion": "Cabaña confortable en zona tranquila.",
            "precio": 145,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54  2664540187",
            "email": "ludmar@hotmail.com.ar",
            "web": "http://www.ludmar.com.ar/"
        },
        {
            "numero": "0000067",
            "nombre": "Lunas y Soles",
            "titular": null,
            "domicilio": "Santa Rita 559",
            "tipo": "cabaña",
            "descripcion": "Cabaña con servicios básicos, rodeada de naturaleza.",
            "precio": 140,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 223030",
            "email": "joragueva@hotmail.com",
            "web": "http://www.cabanaslunasysoles.webnode.page/"
        },
        {
            "numero": "0000068",
            "nombre": "Mininco",
            "titular": null,
            "domicilio": "Los Paraísos 1103",
            "tipo": "hostería",
            "descripcion": "Hostería en un entorno acogedor y natural.",
            "precio": 135,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 889275",
            "email": "info@mininco.com.ar",
            "web": "http://www.hosteriamininco.com.ar/"
        },
        {
            "numero": "0000069",
            "nombre": "Mirando al Valle",
            "titular": null,
            "domicilio": "Los Eucaliptos 240",
            "tipo": "cabaña",
            "descripcion": "Cabaña ideal para disfrutar de vistas al valle.",
            "precio": 140,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 649875",
            "email": null,
            "web": "http://www.udaer.org"
        },
        {
            "numero": "0000070",
            "nombre": "Molinos de Vientos",
            "titular": null,
            "domicilio": "Carpinteros 18",
            "tipo": "cabaña",
            "descripcion": "Cabaña rodeada de naturaleza, ideal para relajarse.",
            "precio": 150,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 209889",
            "email": "molinosdevientos.sl@gmail.com",
            "web": null
        },
        {
            "numero": "0000071",
            "nombre": "Montearena",
            "titular": null,
            "domicilio": "Manantiales 383",
            "tipo": "cabaña",
            "descripcion": "Cabaña cómoda en medio de la naturaleza.",
            "precio": 145,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 888901",
            "email": "montearena.sl@gmail.com",
            "web": "http://www.udaer.org/"
        },
        {
            "numero": "0000072",
            "nombre": "Murmullo del Rio",
            "titular": null,
            "domicilio": "Rey del Bosque y Cesar Bustos",
            "tipo": "cabaña",
            "descripcion": "Cabaña cerca del río, ideal para descansar.",
            "precio": 160,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 581080",
            "email": "info@murmullodelrio.com",
            "web": "http://www.murmullodelrio.com/"
        },
        {
            "numero": "0000073",
            "nombre": "Munay",
            "titular": null,
            "domicilio": "Los Eucaliptos S/N (Los Manantiales)",
            "tipo": "cabaña",
            "descripcion": "Complejo de cabañas rodeado de naturaleza.",
            "precio": 140,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000074",
            "nombre": "Naife",
            "titular": null,
            "domicilio": "Santa Rita S/N",
            "tipo": "cabaña",
            "descripcion": "Cabaña rodeada de paisajes naturales y tranquilidad.",
            "precio": 135,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 731025",
            "email": "Naifeolivares6@gmail.com",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000075",
            "nombre": "Oliber (2) Cabañas",
            "titular": null,
            "domicilio": "A 14 - Los Eucaliptos",
            "tipo": "cabaña",
            "descripcion": "Cabañas equipadas para el confort de los visitantes.",
            "precio": 150,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2323 545732",
            "email": null,
            "web": "http://www.udaer.org"
        },
        {
            "numero": "0000076",
            "nombre": "Pauvalen 1 y 2",
            "titular": null,
            "domicilio": "Las Violetas 1252",
            "tipo": "cabaña",
            "descripcion": "Cabañas acogedoras ideales para familias.",
            "precio": 140,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 261 6589302",
            "email": null,
            "web": "http://www.pauvalen.com.ar/"
        },
        {
            "numero": "0000077",
            "nombre": "Pisco Yaku",
            "titular": null,
            "domicilio": "Los Ciruelos 331",
            "tipo": "complejo",
            "descripcion": "Complejo turístico con servicios completos.",
            "precio": 160,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "piscina", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 571344",
            "email": "info@piscoyaku.com.ar",
            "web": "http://www.piscoyaku.com.ar"
        },
        {
            "numero": "0000078",
            "nombre": "Posada Valle del Sol",
            "titular": null,
            "domicilio": "Los Membrillos S/N",
            "tipo": "posada",
            "descripcion": "Posada con servicios básicos y ambiente familiar.",
            "precio": 130,
            "calificacion": 3.9,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 368288",
            "email": "posadavalledelsol@gmail.com",
            "web": "http://www.posadavalledelsol.com.ar"
        },
        {
            "numero": "0000079",
            "nombre": "Pueblo de Jesús",
            "titular": null,
            "domicilio": "Las Fucsias 707",
            "tipo": "cabaña",
            "descripcion": "Cabaña rústica en un entorno natural y tranquilo.",
            "precio": 135,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 546507",
            "email": null,
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000080",
            "nombre": "Quela",
            "titular": null,
            "domicilio": "Las Violetas 47",
            "tipo": "cabaña",
            "descripcion": "Cabaña rodeada de naturaleza, ideal para relajarse.",
            "precio": 140,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 580392",
            "email": "info@complejoquela.com",
            "web": "http://www.complejoquela.com"
        },
        {
            "numero": "0000081",
            "nombre": "Ramadas",
            "titular": null,
            "domicilio": "Las Violetas y Los Tulipanes",
            "tipo": "complejo",
            "descripcion": "Complejo turístico en un entorno natural.",
            "precio": 155,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "piscina"],
            "imagen": null,
            "telefono": "+54 2664 234529",
            "email": "complejoramadas@hotmail.com.ar",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000082",
            "nombre": "Retana",
            "titular": null,
            "domicilio": "Reina Mora y Las Catitas",
            "tipo": "cabaña",
            "descripcion": "Cabaña con servicios completos en medio de la naturaleza.",
            "precio": 150,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 369726",
            "email": "info@complejoretana.com",
            "web": "http://www.complejoretana.com.ar"
        },
        {
            "numero": "0000083",
            "nombre": "Rincón Potrero",
            "titular": null,
            "domicilio": "Las Violetas 67",
            "tipo": "cabaña",
            "descripcion": "Cabaña acogedora en un entorno natural.",
            "precio": 140,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 338959",
            "email": "rinconpotrero@yahoo.com.ar",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000084",
            "nombre": "Ruca Kiyen",
            "titular": null,
            "domicilio": "Rey del Bosque 37",
            "tipo": "cabaña",
            "descripcion": "Cabaña en medio de la vegetación, ideal para descansar.",
            "precio": 145,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 869488",
            "email": "rkiyen@gmail.com",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000085",
            "nombre": "Sierra de los Nietos",
            "titular": null,
            "domicilio": "Los Eucaliptos S/N",
            "tipo": "cabañas",
            "descripcion": "Complejo de cabañas con vistas a la sierra y servicios básicos.",
            "precio": 130,
            "calificacion": 3.9,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4868794",
            "email": "leoespino_1978@hotmail.com",
            "web": "http://www.turismopotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000086",
            "nombre": "Sol Dorado",
            "titular": null,
            "domicilio": "Los Horneros 3427",
            "tipo": "cabaña",
            "descripcion": "Cabaña con jardín y parrilla, ideal para familias.",
            "precio": 140,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 551587",
            "email": "csoldorado@yahoo.com.ar",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000087",
            "nombre": "Solares de Potrero",
            "titular": null,
            "domicilio": "Los Alisos 45",
            "tipo": "cabaña",
            "descripcion": "Cabaña amplia y confortable en un entorno natural.",
            "precio": 145,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 2664 663410",
            "email": "solaresdepotrero@hotmail.com",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },
        {
            "numero": "0000088",
            "nombre": "Sololosta Cabañas",
            "titular": null,
            "domicilio": "Los Paraísos y Los Álamos",
            "tipo": "cabaña",
            "descripcion": "Cabaña rústica ideal para disfrutar de la tranquilidad.",
            "precio": 135,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null
        },
        {
            "numero": "0000089",
            "nombre": "Susurro del Río",
            "titular": null,
            "domicilio": "Tenor Fernandez S/N",
            "tipo": "cabaña",
            "descripcion": "Cabaña cerca del río con servicios básicos.",
            "precio": 140,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null
        },
        {
            "numero": "0000090",
            "nombre": "Tronco Silvestre",
            "titular": null,
            "domicilio": "Reina Mora Lote 8",
            "tipo": "cabaña",
            "descripcion": "Cabaña rodeada de vegetación autóctona, ideal para descansar.",
            "precio": 140,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 589087",
            "email": "complejolostroncossanluis@gmail.com",
            "web": "http://www.complejoslostroncospotrero.com.ar"
        },
        {
            "numero": "0000091",
            "nombre": "Valle La Vaguada",
            "titular": null,
            "domicilio": "Los Grateus 69",
            "tipo": "cabaña",
            "descripcion": "Cabaña en un entorno natural y tranquilo.",
            "precio": 150,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2267 475169",
            "email": "reservas@vallelavaguada.com.ar",
            "web": "http://www.vallelavaguada.com.ar"
        },
        {
            "numero": "0000092",
            "nombre": "Villa Las Lomas",
            "titular": null,
            "domicilio": "Los Espinillos Parcela 441",
            "tipo": "complejo",
            "descripcion": "Complejo turístico rodeado de naturaleza.",
            "precio": 160,
            "calificacion": 4.3,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 351 2241661",
            "email": null,
            "web": "http://www.villalaslomas.wixsite.com/misitio/contactos"
        },
        {
            "numero": "0000093",
            "nombre": "Villa King",
            "titular": null,
            "domicilio": "Las Hortensias y Av del Circuito",
            "tipo": "complejo",
            "descripcion": "Complejo turístico con ambiente familiar y servicios completos.",
            "precio": 155,
            "calificacion": 4.3,
            "servicios": ["wifi", "jardín", "piscina", "parrilla"],
            "imagen": null,
            "telefono": "+54 2664 660251",
            "email": "villakins@hotmail.com",
            "web": "http://www.villakins.com.ar/"
        },
        {
            "numero": "0000094",
            "nombre": "Yaqui",
            "titular": null,
            "domicilio": "Los Eucaliptos S/N",
            "tipo": "cabaña",
            "descripcion": "Cabaña cómoda y equipada, rodeada de naturaleza.",
            "precio": 140,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 2665 053155",
            "email": "quiroga6615@gmail.com",
            "web": "http://www.turismoenpotrerodelosfunes.com/complejos-de-cabaas"
        },

        {
            "numero": "0000095",
            "nombre": "Abuelito Antonio",
            "titular": null,
            "domicilio": "Las Margaritas 50 y Las Rosas",
            "tipo": "cabañas",
            "descripcion": "Cabañas acogedoras ideales para disfrutar en familia.",
            "precio": 120,
            "calificacion": 4.0,
            "servicios": ["wifi", "parrilla", "jardín", "piscina"],
            "imagen": null,
            "telefono": "+54 266 4678178",
            "email": "abuelitoantonio1914@yahoo.com.ar",
            "web": null,
            "instagram": "abuelitoantoniocabanas"
        },
        {
            "numero": "0000096",
            "nombre": "Antovoa Cabañas",
            "titular": null,
            "domicilio": "Los Manantiales A13",
            "tipo": "cabañas",
            "descripcion": "Cabañas completamente equipadas cerca del circuito.",
            "precio": 150,
            "calificacion": 4.2,
            "servicios": ["wifi", "piscina", "aire acondicionado", "estacionamiento"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": "cabana_antovoa"
        },
        {
            "numero": "0000097",
            "nombre": "Anali",
            "titular": null,
            "domicilio": "Las Petuñas S/N",
            "tipo": "alojamiento",
            "descripcion": "Lugar tranquilo con acceso a actividades al aire libre.",
            "precio": 100,
            "calificacion": 3.9,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4036640",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000098",
            "nombre": "Augurio del Sol",
            "titular": null,
            "domicilio": "Siete Colores y Colibri",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento con vistas impresionantes a las sierras.",
            "precio": 130,
            "calificacion": 4.1,
            "servicios": ["wifi", "piscina", "jardín"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000099",
            "nombre": "Ayres del Lago",
            "titular": null,
            "domicilio": "Loteo El Espinillo S/N A13",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento moderno cerca del lago, ideal para familias.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "aire acondicionado", "piscina climatizada", "estacionamiento"],
            "imagen": null,
            "telefono": "+54 266 4188014",
            "email": null,
            "web": null,
            "instagram": "ayres_del_lago"
        },
        {
            "numero": "0000100",
            "nombre": "Antiguo Refugio",
            "titular": null,
            "domicilio": "Los Paraisos S/N",
            "tipo": "alojamiento",
            "descripcion": "Refugio histórico rodeado de naturaleza.",
            "precio": 110,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4336830",
            "email": null,
            "web": null,
            "instagram": "antiguorefugio"
        },
        {
            "numero": "0000101",
            "nombre": "Apart 360",
            "titular": null,
            "domicilio": "Los Piquillines S/N",
            "tipo": "apart",
            "descripcion": "Departamentos modernos con vistas de 360°.",
            "precio": 180,
            "calificacion": 4.5,
            "servicios": ["wifi", "aire acondicionado", "tv", "cocina"],
            "imagen": null,
            "telefono": "+54 266 4770089",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000102",
            "nombre": "Bella Mora",
            "titular": null,
            "domicilio": "Reina Mora S/N",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento rodeado de paisajes naturales.",
            "precio": 120,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4213359",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000103",
            "nombre": "Bella Vista",
            "titular": null,
            "domicilio": "Los Manzanos 180",
            "tipo": "alojamiento",
            "descripcion": "Disfruta de vistas panorámicas únicas.",
            "precio": 140,
            "calificacion": 4.4,
            "servicios": ["wifi", "piscina", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4348132",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000104",
            "nombre": "Cefiro Cabañas",
            "titular": null,
            "domicilio": "Loteo Piquillines al lado de Elsa y Fred",
            "tipo": "cabañas",
            "descripcion": "Cabañas acogedoras cerca del centro.",
            "precio": 150,
            "calificacion": 4.3,
            "servicios": ["wifi", "piscina", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4317384",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000105",
            "nombre": "Cerro del Sol",
            "titular": null,
            "domicilio": "Los Eucaliptus S/N A14",
            "tipo": "complejo",
            "descripcion": "Complejo con servicios premium.",
            "precio": 160,
            "calificacion": 4.6,
            "servicios": ["wifi", "spa", "desayuno"],
            "imagen": null,
            "telefono": "+54 266 4220254",
            "email": null,
            "web": null,
            "instagram": "complejocerrosdelsol"
        },
        {
            "numero": "0000106",
            "nombre": "Casa Majo",
            "titular": null,
            "domicilio": "Santa Rita 481",
            "tipo": "casa",
            "descripcion": "Casa amplia y equipada para familias.",
            "precio": 180,
            "calificacion": 4.4,
            "servicios": ["wifi", "aire acondicionado", "cocina"],
            "imagen": null,
            "telefono": "+54 116 2044193",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000107",
            "nombre": "Cuatro Tesoros",
            "titular": null,
            "domicilio": "Los Manantiales A13",
            "tipo": "alojamiento",
            "descripcion": "Descubre la comodidad en un entorno único.",
            "precio": 130,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4401797",
            "email": null,
            "web": null,
            "instagram": "cuatro_tesoros_sanluis"
        },
        {
            "numero": "0000108",
            "nombre": "Colores de Los Funes",
            "titular": null,
            "domicilio": "Circuito del Lago y Rio S/N",
            "tipo": "alojamiento",
            "descripcion": "Explora los colores y paisajes de Los Funes.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "piscina", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4202422",
            "email": null,
            "web": null,
            "instagram": "COLORESDEFUNES7"
        }, {
            "numero": "0000109",
            "nombre": "Complejo Las Cabras",
            "titular": null,
            "domicilio": "Los Membrillos y Las Cabras",
            "tipo": "complejo",
            "descripcion": "Complejo con múltiples actividades para toda la familia.",
            "precio": 160,
            "calificacion": 4.5,
            "servicios": ["wifi", "piscina", "jardín", "desayuno"],
            "imagen": null,
            "telefono": "+54 112 8669826",
            "email": null,
            "web": null,
            "instagram": "LASCABRASCOMPLEJOTURISTICO"
        },
        {
            "numero": "0000110",
            "nombre": "Don Mauricio",
            "titular": null,
            "domicilio": "Loteo Los Espinillos A13",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento cómodo con vistas al lago.",
            "precio": 140,
            "calificacion": 4.2,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4614942",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000111",
            "nombre": "Don Kuinto",
            "titular": null,
            "domicilio": "Av. Circuito 2460",
            "tipo": "alojamiento",
            "descripcion": "Perfecto para disfrutar de la tranquilidad del lugar.",
            "precio": 150,
            "calificacion": 4.3,
            "servicios": ["wifi", "jardín", "tv"],
            "imagen": null,
            "telefono": "+54 266 4323819",
            "email": null,
            "web": null,
            "instagram": "cesarettioscar"
        },
        {
            "numero": "0000112",
            "nombre": "El Crepúsculo",
            "titular": null,
            "domicilio": "Los Ciruelos 645",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento rodeado de naturaleza.",
            "precio": 120,
            "calificacion": 4.1,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4560079",
            "email": null,
            "web": null,
            "instagram": "elcrepusculo.potrero"
        },
        {
            "numero": "0000113",
            "nombre": "El Fin del Afán",
            "titular": null,
            "domicilio": "Los Espinillos S/N A 250 MTS del Circ.",
            "tipo": "alojamiento",
            "descripcion": "Relájate en este alojamiento rodeado de tranquilidad.",
            "precio": 130,
            "calificacion": 4.0,
            "servicios": ["wifi", "parrilla", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 291 6456061",
            "email": null,
            "web": null,
            "instagram": "el.fin.del.afan"
        },
        {
            "numero": "0000114",
            "nombre": "El Doral",
            "titular": null,
            "domicilio": "Los Eucaliptus 2058 A14",
            "tipo": "complejo",
            "descripcion": "Un complejo con todas las comodidades modernas.",
            "precio": 170,
            "calificacion": 4.4,
            "servicios": ["wifi", "piscina", "spa", "desayuno"],
            "imagen": null,
            "telefono": "+54 266 5138498",
            "email": null,
            "web": null,
            "instagram": "complejo_eldoral"
        },
        {
            "numero": "0000115",
            "nombre": "Entre Cerros",
            "titular": null,
            "domicilio": "Entre A13 Y A14",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento ideal para los amantes del senderismo.",
            "precio": 140,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 261 5274266",
            "email": null,
            "web": null,
            "instagram": "entrecerro.potrero"
        },
        {
            "numero": "0000116",
            "nombre": "Estación del Lago",
            "titular": null,
            "domicilio": "Los Eucaliptus S/N A14",
            "tipo": "alojamiento",
            "descripcion": "Relájate con vista al lago y servicios exclusivos.",
            "precio": 150,
            "calificacion": 4.5,
            "servicios": ["wifi", "piscina", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 266 4662016",
            "email": null,
            "web": null,
            "instagram": "estaciondellago"
        },
        {
            "numero": "0000117",
            "nombre": "El Vuelo del Colibrí",
            "titular": null,
            "domicilio": "Las Dalias S/N",
            "tipo": "alojamiento",
            "descripcion": "Perfecto para desconectar y disfrutar de la naturaleza.",
            "precio": 130,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": "elvuelodelcolibisl"
        },
        {
            "numero": "0000118",
            "nombre": "Del Duende",
            "titular": null,
            "domicilio": "Los Eucaliptus 150",
            "tipo": "cabañas",
            "descripcion": "Cabañas cómodas y completamente equipadas.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "piscina", "cocina"],
            "imagen": null,
            "telefono": "+54 290 1469068",
            "email": "info@cabanasdelduende.com",
            "web": "www.cabanasdelduende.com",
            "instagram": "cabanasdelduende.potrero"
        },
        {
            "numero": "0000119",
            "nombre": "El Ombú",
            "titular": null,
            "domicilio": "El Ombú y Los Quebracho",
            "tipo": "alojamiento",
            "descripcion": "Un alojamiento clásico para disfrutar del lugar.",
            "precio": 120,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "tv"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000120",
            "nombre": "Espejo del Cielo",
            "titular": null,
            "domicilio": "Los Paraísos 3170",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento único con vistas al cielo nocturno.",
            "precio": 130,
            "calificacion": 4.2,
            "servicios": ["wifi", "piscina", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4277974",
            "email": null,
            "web": null,
            "instagram": "espejodelcieloalojamiento"
        },
        {
            "numero": "0000121",
            "nombre": "Josué",
            "titular": null,
            "domicilio": "Las Violetas 220",
            "tipo": "complejo",
            "descripcion": "Complejo ideal para disfrutar en grupo.",
            "precio": 160,
            "calificacion": 4.4,
            "servicios": ["wifi", "piscina", "jardín", "desayuno"],
            "imagen": null,
            "telefono": "+54 266 4344673",
            "email": null,
            "web": null,
            "instagram": "complejo_josue"
        },
        {
            "numero": "0000122",
            "nombre": "Krumech",
            "titular": null,
            "domicilio": "Los Piquillines 3685",
            "tipo": "cabaña",
            "descripcion": "Cabaña acogedora con servicios modernos.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "parrilla", "cocina"],
            "imagen": null,
            "telefono": "+54 266 4415544",
            "email": null,
            "web": null,
            "instagram": "cabanakrumech"
        },
        {
            "numero": "0000123",
            "nombre": "Kume",
            "titular": null,
            "domicilio": "Los Piquillines 425",
            "tipo": "complejo",
            "descripcion": "Complejo con todos los servicios para disfrutar al máximo.",
            "precio": 150,
            "calificacion": 4.4,
            "servicios": ["wifi", "piscina", "aire acondicionado", "cocina"],
            "imagen": null,
            "telefono": "+54 266 4616644",
            "email": null,
            "web": null,
            "instagram": "complejo.kume"
        }, {
            "numero": "0000124",
            "nombre": "La Familia",
            "titular": null,
            "domicilio": "Calle Proyecta Villa Magdalena",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento ideal para escapadas familiares.",
            "precio": 120,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000125",
            "nombre": "La Gringa",
            "titular": null,
            "domicilio": "Los Paraísos 186",
            "tipo": "complejo",
            "descripcion": "Complejo con servicios de primera calidad.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "piscina", "desayuno"],
            "imagen": null,
            "telefono": "+54 266 4407753",
            "email": null,
            "web": null,
            "instagram": "complejolagringa"
        },
        {
            "numero": "0000126",
            "nombre": "Las Margaritas",
            "titular": null,
            "domicilio": "Las Margaritas 348",
            "tipo": "alojamiento",
            "descripcion": "Rodeado de naturaleza para una estancia tranquila.",
            "precio": 130,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000127",
            "nombre": "La Delfina",
            "titular": null,
            "domicilio": "Los Manantiales 382",
            "tipo": "cabañas",
            "descripcion": "Cabañas acogedoras completamente equipadas.",
            "precio": 150,
            "calificacion": 4.4,
            "servicios": ["wifi", "aire acondicionado", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4004584",
            "email": null,
            "web": null,
            "instagram": "cabanias.ladelfina"
        },
        {
            "numero": "0000128",
            "nombre": "La Casona de Raki",
            "titular": null,
            "domicilio": "Los Paraísos y Siete Colores",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento amplio con vista a las sierras.",
            "precio": 140,
            "calificacion": 4.2,
            "servicios": ["wifi", "piscina", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4847239",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000129",
            "nombre": "La Colina",
            "titular": null,
            "domicilio": "Zona Boxes",
            "tipo": "alojamiento",
            "descripcion": "Perfecto para descansar en un entorno único.",
            "precio": 110,
            "calificacion": 3.9,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000130",
            "nombre": "La Serena",
            "titular": null,
            "domicilio": "Los Membrillos 257",
            "tipo": "cabañas",
            "descripcion": "Cabañas tranquilas con vistas al lago.",
            "precio": 150,
            "calificacion": 4.3,
            "servicios": ["wifi", "aire acondicionado", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4693232",
            "email": null,
            "web": null,
            "instagram": "SERENA_CABANAS"
        },
        {
            "numero": "0000131",
            "nombre": "La Perla",
            "titular": null,
            "domicilio": "Los Castaños Casa 5",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento perfecto para escapadas románticas.",
            "precio": 130,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000132",
            "nombre": "La Plaza",
            "titular": null,
            "domicilio": "Los Molles 543",
            "tipo": "alojamiento",
            "descripcion": "Lugar acogedor en el corazón de la ciudad.",
            "precio": 140,
            "calificacion": 4.2,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4881556",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000133",
            "nombre": "Las Abelias",
            "titular": null,
            "domicilio": "Los Piquillines",
            "tipo": "alojamiento",
            "descripcion": "Rodeado de naturaleza para un descanso ideal.",
            "precio": 120,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4373894",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000134",
            "nombre": "Las Moras",
            "titular": null,
            "domicilio": "Acceso 7",
            "tipo": "alojamiento",
            "descripcion": "Disfruta de la tranquilidad y el paisaje.",
            "precio": 130,
            "calificacion": 4.3,
            "servicios": ["wifi", "aire acondicionado", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4310886",
            "email": null,
            "web": null,
            "instagram": "LASMORASALOJAMIENTOS"
        },
        {
            "numero": "0000135",
            "nombre": "La Soñada",
            "titular": null,
            "domicilio": "Santa Rita 145",
            "tipo": "alojamiento",
            "descripcion": "Un lugar soñado para descansar y desconectar.",
            "precio": 140,
            "calificacion": 4.4,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 116 0498148",
            "email": null,
            "web": null,
            "instagram": "AIRES.DEPOTRERO"
        },
        {
            "numero": "0000136",
            "nombre": "Las Calandrias",
            "titular": null,
            "domicilio": "Los Ciruelos 620",
            "tipo": "alojamiento",
            "descripcion": "Perfecto para disfrutar de actividades al aire libre.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4393036",
            "email": null,
            "web": null,
            "instagram": "LASCALANDRIAS.OK"
        },
        {
            "numero": "0000137",
            "nombre": "Las Terrazas Posada Spa",
            "titular": null,
            "domicilio": "Av. del Circuito del Lago A11",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento con vistas panorámicas únicas.",
            "precio": 150,
            "calificacion": 4.5,
            "servicios": ["wifi", "aire acondicionado", "piscina"],
            "imagen": null,
            "telefono": "+54 266 4777751",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000138",
            "nombre": "Lo de Esther",
            "titular": "Lucero Raúl Alberto",
            "domicilio": null,
            "tipo": "alojamiento",
            "descripcion": "Alojamiento sencillo y acogedor.",
            "precio": 100,
            "calificacion": 3.8,
            "servicios": ["wifi"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": null
        },

        {
            "numero": "0000139",
            "nombre": "Los Ríos",
            "titular": null,
            "domicilio": "Los Piquillines 311",
            "tipo": "complejo",
            "descripcion": "Complejo familiar con múltiples servicios.",
            "precio": 150,
            "calificacion": 4.4,
            "servicios": ["wifi", "piscina", "desayuno", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4204992",
            "email": null,
            "web": null,
            "instagram": "complejolosrios"
        },
        {
            "numero": "0000140",
            "nombre": "Luján Cabañas",
            "titular": null,
            "domicilio": "Los Damascos 590",
            "tipo": "cabañas",
            "descripcion": "Cabañas equipadas para disfrutar en familia.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 115 7513242",
            "email": null,
            "web": null,
            "instagram": "cabaniaslujanpf"
        },
        {
            "numero": "0000141",
            "nombre": "Lo de Nino",
            "titular": null,
            "domicilio": "Los Zorzales 9012",
            "tipo": "alojamiento",
            "descripcion": "Un espacio tranquilo para relajarte.",
            "precio": 120,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4210705",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000142",
            "nombre": "Los Troncos",
            "titular": null,
            "domicilio": "Ruta 18 KM 15.5",
            "tipo": "complejo",
            "descripcion": "Complejo con actividades para toda la familia.",
            "precio": 160,
            "calificacion": 4.5,
            "servicios": ["wifi", "piscina", "desayuno", "bar"],
            "imagen": null,
            "telefono": "+54 266 4860747",
            "email": null,
            "web": null,
            "instagram": "complejolostroncos"
        },
        {
            "numero": "0000143",
            "nombre": "Lulú",
            "titular": null,
            "domicilio": "Juanón Lucero S/N",
            "tipo": "cabañas",
            "descripcion": "Cabañas rústicas con todas las comodidades.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "parrilla", "cocina"],
            "imagen": null,
            "telefono": "+54 266 4553972",
            "email": null,
            "web": null,
            "instagram": "lascabanasdelulu"
        },
        {
            "numero": "0000144",
            "nombre": "Lunamakena",
            "titular": null,
            "domicilio": "Los Membrillos 83",
            "tipo": "resto",
            "descripcion": "Restaurante con ambiente cálido y acogedor.",
            "precio": null,
            "calificacion": 4.6,
            "servicios": ["wifi", "bar", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 266 4302349",
            "email": null,
            "web": null,
            "instagram": "LUNAMAKENA_RESTO"
        },
        {
            "numero": "0000145",
            "nombre": "Los Cauquenes",
            "titular": null,
            "domicilio": "Av. Circuito 2918",
            "tipo": "cabañas",
            "descripcion": "Cabañas con excelente ubicación y servicios.",
            "precio": 150,
            "calificacion": 4.4,
            "servicios": ["wifi", "piscina", "cocina", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4945525",
            "email": null,
            "web": null,
            "instagram": "CABANASPOTREROSANLUIS"
        },
        {
            "numero": "0000146",
            "nombre": "Los Mimines",
            "titular": null,
            "domicilio": "Los Tilos 50 Norte",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento cálido con servicios básicos.",
            "precio": 120,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4790258",
            "email": null,
            "web": null,
            "instagram": "LOSMIMINES"
        },
        {
            "numero": "0000147",
            "nombre": "Los Chañares",
            "titular": null,
            "domicilio": "Los Hormeros A13",
            "tipo": "alojamiento",
            "descripcion": "Perfecto para escapadas relajantes.",
            "precio": 130,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 230 2342489",
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000148",
            "nombre": "Morada de la Luna",
            "titular": null,
            "domicilio": "Los Tilos 290",
            "tipo": "alojamiento",
            "descripcion": "Espacio único con vistas al cielo estrellado.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "aire acondicionado", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4269694",
            "email": null,
            "web": null,
            "instagram": "MORADADELALUNA"
        },
        {
            "numero": "0000149",
            "nombre": "Me Jui",
            "titular": null,
            "domicilio": "Los Espinillos",
            "tipo": "alojamiento",
            "descripcion": "Un lugar para desconectar y relajarte.",
            "precio": 120,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4588964",
            "email": null,
            "web": null,
            "instagram": "MEJUI_POTRERO"
        },
        {
            "numero": "0000150",
            "nombre": "Mercy",
            "titular": null,
            "domicilio": "Siete Colores Mza E Casa 20",
            "tipo": "cabañas",
            "descripcion": "Cabañas rodeadas de naturaleza.",
            "precio": 140,
            "calificacion": 4.2,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": "mercy.cabanas.56"
        },
        {
            "numero": "0000151",
            "nombre": "Mi Familia",
            "titular": null,
            "domicilio": "Colibrí Los Paraísos",
            "tipo": "alojamiento",
            "descripcion": "Ideal para disfrutar en familia.",
            "precio": 130,
            "calificacion": 4.1,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": null
        },
        {
            "numero": "0000152",
            "nombre": "Ohana",
            "titular": null,
            "domicilio": "Barrio Cerro Victoria Mza 11 Lote 5",
            "tipo": "complejo",
            "descripcion": "Un lugar para toda la familia.",
            "precio": 150,
            "calificacion": 4.5,
            "servicios": ["wifi", "piscina", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 266 4863854",
            "email": "ohanadepartamentos@gmail.com",
            "web": null,
            "instagram": "ohanacomplejo"
        },
        {
            "numero": "0000153",
            "nombre": "Pinar de la Sierra",
            "titular": null,
            "domicilio": "Los Manantiales Extremo Oeste",
            "tipo": "alojamiento",
            "descripcion": "Lugar con ambiente natural y tranquilo.",
            "precio": 140,
            "calificacion": 4.4,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4685708",
            "email": "pinardelassierras@gmail.com",
            "web": null,
            "instagram": "pinar_de_las_sierras"
        },
        {
            "numero": "0000154",
            "nombre": "Posta Don Pedro",
            "titular": null,
            "domicilio": "Los Tulipanes 26 A3",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento clásico con ambiente familiar.",
            "precio": 130,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4204654",
            "email": null,
            "web": null,
            "instagram": "POSTA_DON_PEDRO_"
        },
        {
            "numero": "0000155",
            "nombre": "Paraíso del Potrero",
            "titular": null,
            "domicilio": "Juanón Lucero S/N",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento ideal para disfrutar del Potrero.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "piscina", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4813163",
            "email": null,
            "web": null,
            "instagram": "paraiso_del_potrero"
        },
        {
            "numero": "0000156",
            "nombre": "Quimey Quipan",
            "titular": null,
            "domicilio": "Horneros S/N A12",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento con vistas únicas y tranquilidad asegurada.",
            "precio": 150,
            "calificacion": 4.5,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4756132",
            "email": null,
            "web": null,
            "instagram": "QUIMEY.QUIPAN"
        },
        {
            "numero": "0000157",
            "nombre": "Rincón del Río",
            "titular": null,
            "domicilio": "Los Almendros 113",
            "tipo": "alojamiento",
            "descripcion": "Lugar acogedor junto al río.",
            "precio": 120,
            "calificacion": 4.1,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 263 4777908",
            "email": null,
            "web": null,
            "instagram": "ricondelrio.ok"
        },
        {
            "numero": "0000158",
            "nombre": "Rincón Potrero",
            "titular": null,
            "domicilio": "Las Violetas 67",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento cómodo y moderno.",
            "precio": 130,
            "calificacion": 4.2,
            "servicios": ["wifi", "piscina", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4338959",
            "email": "rinconpotrero@yahoo.com.ar",
            "web": "www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
            "instagram": "rinconpotrero"
        },
        {
            "numero": "0000159",
            "nombre": "Ruca Kiyen",
            "titular": null,
            "domicilio": "Rey del Bosque 37",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento rodeado de naturaleza.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4869488",
            "email": "rkiyen@gmail.com",
            "web": "www.turismoenpotrerodelosfunes.com/complejos-de-cabaas",
            "instagram": null
        },
        {
            "numero": "0000160",
            "nombre": "San Francisco",
            "titular": null,
            "domicilio": "Los Papagayos",
            "tipo": "complejo",
            "descripcion": "Complejo turístico con múltiples servicios.",
            "precio": 150,
            "calificacion": 4.4,
            "servicios": ["wifi", "piscina", "desayuno", "aire acondicionado"],
            "imagen": null,
            "telefono": null,
            "email": null,
            "web": null,
            "instagram": "sanfrancisco_complejo"
        },
        {
            "numero": "0000161",
            "nombre": "Sierra Verde",
            "titular": null,
            "domicilio": "Alsaleas y Crisantemos S/N",
            "tipo": "cabañas",
            "descripcion": "Cabañas acogedoras con excelente ubicación.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 261 2482341",
            "email": null,
            "web": null,
            "instagram": "cabanas.sierraverde"
        },
        {
            "numero": "0000162",
            "nombre": "Terrasole",
            "titular": null,
            "domicilio": "Las Margaritas A5",
            "tipo": "cabañas",
            "descripcion": "Cabañas exclusivas con todas las comodidades.",
            "precio": 150,
            "calificacion": 4.5,
            "servicios": ["wifi", "piscina", "parrilla", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 266 4657373",
            "email": "info@terrasolecabanias.com",
            "web": "www.terrasolecabanias.com",
            "instagram": "TERRASOLESCABANAS"
        },
        {
            "numero": "0000163",
            "nombre": "Turmalina",
            "titular": null,
            "domicilio": "A2 Calle Dos de Abril Mza A Casa 9",
            "tipo": "hospedaje",
            "descripcion": "Hospedaje sencillo y confortable.",
            "precio": 120,
            "calificacion": 4.0,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 116 4860317",
            "email": null,
            "web": null,
            "instagram": "turmalina.hospedaje"
        },
        {
            "numero": "0000164",
            "nombre": "Tata y La Emilia",
            "titular": null,
            "domicilio": "Los Tulipanes 380",
            "tipo": "cabañas",
            "descripcion": "Cabañas perfectas para familias.",
            "precio": 140,
            "calificacion": 4.3,
            "servicios": ["wifi", "piscina", "parrilla"],
            "imagen": null,
            "telefono": "+54 261 5398831",
            "email": null,
            "web": "www.complejotata.com.ar",
            "instagram": "cabanastata_"
        },
        {
            "numero": "0000165",
            "nombre": "Tronco Silvestre",
            "titular": null,
            "domicilio": "Reina Mora Lote 8",
            "tipo": "complejo",
            "descripcion": "Complejo con vistas panorámicas.",
            "precio": 150,
            "calificacion": 4.5,
            "servicios": ["wifi", "piscina", "parrilla", "aire acondicionado"],
            "imagen": null,
            "telefono": "+54 266 4589087",
            "email": "complejolostroncossanluis@gmail.com",
            "web": "www.complejoslostroncospotrero.com.ar",
            "instagram": "complejolostroncos"
        },
        {
            "numero": "0000166",
            "nombre": "Vista Calma",
            "titular": null,
            "domicilio": "Los Paraísos 1357",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento ideal para desconectar.",
            "precio": 140,
            "calificacion": 4.2,
            "servicios": ["wifi", "jardín", "parrilla"],
            "imagen": null,
            "telefono": "+54 266 4559023",
            "email": null,
            "web": null,
            "instagram": "vista.calma22"
        },
        {
            "numero": "0000167",
            "nombre": "Vista Azul",
            "titular": null,
            "domicilio": "Catalpas 157 A10",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento con vistas impresionantes.",
            "precio": 150,
            "calificacion": 4.4,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4309597",
            "email": null,
            "web": null,
            "instagram": "vistaazulpotrerodelosfunes"
        },
        {
            "numero": "0000168",
            "nombre": "Viejo Calden",
            "titular": null,
            "domicilio": "Los Alelies 578",
            "tipo": "alojamiento",
            "descripcion": "Alojamiento rústico con encanto.",
            "precio": 130,
            "calificacion": 4.1,
            "servicios": ["wifi", "parrilla", "jardín"],
            "imagen": null,
            "telefono": "+54 266 4244773",
            "email": null,
            "web": null,
            "instagram": "caldenviejo"
        }
    ]






    const filteredAlojamientos = alojamientos.filter(alojamiento =>
        (alojamiento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alojamiento.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedType === 'todos' || alojamiento.tipo === selectedType)
    );

    const pageCount = Math.ceil(filteredAlojamientos.length / itemsPerPage);
    const currentAlojamientos = filteredAlojamientos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const Pagination = () => {
        let pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return (
            <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#00add5] hover:bg-[#00add5] hover:text-white'}`}
                >
                    <FaChevronLeft />
                </button>

                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className={`w-8 h-8 rounded-full ${1 === currentPage ? 'bg-[#00add5] text-white' : 'text-[#00add5] hover:bg-[#00add5] hover:text-white'}`}
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="text-gray-500">...</span>}
                    </>
                )}

                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded-full ${page === currentPage ? 'bg-[#00add5] text-white' : 'text-[#00add5] hover:bg-[#00add5] hover:text-white'}`}
                    >
                        {page}
                    </button>
                ))}

                {endPage < pageCount && (
                    <>
                        {endPage < pageCount - 1 && <span className="text-gray-500">...</span>}
                        <button
                            onClick={() => handlePageChange(pageCount)}
                            className={`w-8 h-8 rounded-full ${pageCount === currentPage ? 'bg-[#00add5] text-white' : 'text-[#00add5] hover:bg-[#00add5] hover:text-white'}`}
                        >
                            {pageCount}
                        </button>
                    </>
                )}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    className={`p-2 rounded-full ${currentPage === pageCount ? 'text-gray-400 cursor-not-allowed' : 'text-[#00add5] hover:bg-[#00add5] hover:text-white'}`}
                >
                    <FaChevronRight />
                </button>
            </div>
        );
    };

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 bg-gray-50">
            {/* Header section - sin cambios */}
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-[#00add5]">
                    Alojamiento en Potrero de los Funes
                </h2>
                <p className="font-light text-gray-500 sm:text-xl">
                    Descubrí los mejores lugares para alojarte en nuestro hermoso valle
                </p>
            </div>

            {/* Search and filter section - sin cambios */}
            <div className="mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Buscar alojamiento..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00add5]"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {['todos', 'hotel', 'apart hotel', 'hostería', 'posada', 'cabaña'].map((tipo) => (
                        <button
                            key={tipo}
                            onClick={() => {
                                setSelectedType(tipo);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-full ${selectedType === tipo
                                ? 'bg-[#00add5] text-white'
                                : 'bg-white text-[#00add5] border border-[#00add5]'
                                } hover:bg-[#00add5] hover:text-white transition-colors duration-300`}
                        >
                            {tipo === 'todos' ? 'Todos' : tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results section */}
            {currentAlojamientos.length > 0 ? (
                <>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {currentAlojamientos.map((alojamiento, index) => {
                            const TipoIcon = tipoAlojamientoIcon[alojamiento.tipo] || FaHome;
                            return (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex justify-center mb-4">
                                        <TipoIcon className="text-7xl text-[#00add5]" />
                                    </div>
                                    <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                                        {alojamiento.nombre}
                                    </h5>
                                    <p className="font-normal text-gray-700 mb-3 h-20 overflow-hidden">
                                        {alojamiento.descripcion}
                                    </p>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex space-x-2">
                                            {alojamiento.servicios.slice(0, 4).map((servicio, i) => {
                                                const Icon = iconMap[servicio];
                                                return Icon ? <Icon key={i} className="text-[#00add5]" /> : null;
                                            })}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedAlojamiento(alojamiento)}
                                        className="w-full bg-[#00add5] text-white py-2 px-4 rounded-lg hover:bg-[#0098b8] transition duration-300"
                                    >
                                        Ver detalles
                                    </button>
                                </Card>
                            );
                        })}
                    </div>
                    <Pagination />
                </>
            ) : (
                <div className="text-center py-12">
                    <FaSearchLocation className="mx-auto text-6xl text-gray-400 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        No se encontraron alojamientos
                    </h3>
                    <p className="text-gray-500">
                        Lo sentimos, no pudimos encontrar alojamientos que coincidan con tu búsqueda.
                        <br />
                        Intentá con otros términos o explorá todas nuestras opciones.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedType('todos');
                            setCurrentPage(1);
                        }}
                        className="mt-6 px-6 py-2 bg-[#00add5] text-white rounded-full hover:bg-[#0098b8] transition-colors duration-300"
                    >
                        Ver todos los alojamientos
                    </button>
                </div>
            )}

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