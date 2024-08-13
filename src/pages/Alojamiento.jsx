/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaWifi, FaParking, FaSwimmingPool, FaCoffee, FaDumbbell, FaCocktail, FaSearch, FaBed, FaHome, FaPhoneAlt, FaEnvelope, FaGlobe, FaStar, FaSearchLocation } from 'react-icons/fa';
import { Card, Button } from 'flowbite-react';

function Alojamiento() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('todos');
    const [selectedAlojamiento, setSelectedAlojamiento] = useState(null);

    const imagenPrueba = "https://images.pxsol.com/1142/P2109/photos/e4d9a9f45353629dbfabdb616e9a733b1dd34ed6.jpg?auto=format&browser=Google%20Bot&ixlib=php-3.3.0&w=1200&s=11dd25a890f3d3ca4f47de60f99c2d32";

    const alojamientos = [
        {
            nombre: 'Hotel Internacional Potrero de los Funes',
            tipo: 'hotel',
            descripcion: 'Diseñado para ofrecer una vista panorámica privilegiada y acondicionado para la total satisfacción de los huéspedes más exigentes.',
            precio: 200,
            calificacion: 4.5,
            servicios: ['wifi', 'parking', 'pool', 'gym', 'bar'],
            imagen: imagenPrueba,
            direccion: 'Ruta 18 km.16 - Potrero de los Funes - San Luis (5701)',
            telefono: '+54 (0266) 4440038 / 4495115 / 4495043',
            email: 'reservas@hotelpotrero.sanluis.gov.ar',
            web: 'https://www.hotelpotrero.sanluis.gov.ar'
        },
        {
            nombre: 'Hotel Puntano',
            tipo: 'hotel',
            descripcion: 'Ubicado estratégicamente para disfrutar de la belleza natural de Potrero de los Funes.',
            precio: 150,
            calificacion: 4.2,
            servicios: ['wifi', 'parking', 'pool'],
            imagen: imagenPrueba,
            direccion: 'Los Paraísos 637 (esquina Los Almendros), Acceso A9',
            telefono: '+54 266 4748431',
            web: 'https://www.hotelpuntano.com.ar'
        },
        {
            nombre: 'La Quebrada - Apart Hotel',
            tipo: 'apart',
            descripcion: 'Apartamentos de dos dormitorios completamente equipados con baño y ante baño, cocina comedor.',
            precio: 180,
            calificacion: 4.3,
            servicios: ['wifi', 'parking', 'pool', 'bar'],
            imagen: imagenPrueba,
            direccion: 'Los Ciruelos Esq. Los Peros, ingreso por acceso A7',
            telefono: '266-4777751',
            email: 'laquebradapotrero@gmail.com',
            web: 'www.laquebradaapart.com.ar'
        },
        {
            nombre: 'Minincó - Hostería',
            tipo: 'hosteria',
            descripcion: 'Hostería con servicios completos y ambiente acogedor.',
            precio: 120,
            calificacion: 4.0,
            servicios: ['wifi', 'parking'],
            imagen: imagenPrueba,
            direccion: 'Los Paraísos 1103, Ingreso por Acceso A9',
            telefono: '266-4495048',
            email: 'info@mininco.com.ar',
            web: 'www.hosteriamininco.com.ar'
        },
        {
            nombre: 'Posada Valle del Sol',
            tipo: 'posada',
            descripcion: 'Posada con equipamiento completo y servicios opcionales.',
            precio: 130,
            calificacion: 4.1,
            servicios: ['wifi', 'parking', 'coffee'],
            imagen: imagenPrueba,
            direccion: 'Los Membrillos S/N, ingreso por Acceso A9',
            telefono: '266-4368288',
            email: 'posadavalledelsol@gmail.com',
            web: 'www.posadavalledelsol.com.ar'
        },
        {
            nombre: 'Hostería Los Naranjos',
            tipo: 'hosteria',
            descripcion: 'Hostería con ambiente familiar y cálido.',
            precio: 110,
            calificacion: 3.9,
            servicios: ['wifi', 'parking'],
            imagen: imagenPrueba,
            direccion: 'Los guindos 2191 Esquina los Peros',
            telefono: '266-4205210',
            email: 'losnaranjosdelpotrero@gmail.com'
        },
        {
            nombre: 'El Triunfo Apart',
            tipo: 'apart',
            descripcion: 'Apartamentos confortables para una estancia placentera.',
            precio: 160,
            calificacion: 4.2,
            servicios: ['wifi', 'parking', 'pool'],
            imagen: imagenPrueba,
            direccion: 'Las Margaritas y Cortaderas - Acceso A5',
            telefono: '2664266538',
            email: 'miguelsaad1250@gmail.com'
        },
        {
            nombre: 'Amantea Apart',
            tipo: 'apart',
            descripcion: 'Apartamentos con vista al circuito de Potrero de los Funes.',
            precio: 170,
            calificacion: 4.4,
            servicios: ['wifi', 'parking', 'pool'],
            imagen: imagenPrueba,
            direccion: 'Calle Lateral Circuito Potrero (por el Puente de Boxes)',
            telefono: '+54 911 40447644',
            email: 'amanteaapart@gmail.com',
            web: 'www.amanteaapart.com.ar'
        },
        {
            nombre: 'Altos de Aliwen',
            tipo: 'cabana',
            descripcion: 'Cabañas con vista panorámica a las sierras.',
            precio: 140,
            calificacion: 4.3,
            servicios: ['wifi', 'parking'],
            imagen: imagenPrueba,
            direccion: 'Santa Rita S/N',
            telefono: '(0266) 432-0473',
            web: 'www.altosdealiwen.com'
        },
        {
            nombre: 'Las Terrazas Posada & Spa',
            tipo: 'posada',
            descripcion: 'Posada con spa para una experiencia relajante.',
            precio: 190,
            calificacion: 4.6,
            servicios: ['wifi', 'parking', 'pool', 'gym', 'bar'],
            imagen: imagenPrueba,
            direccion: 'Av. del Circuito y Río Potrero - Acceso A10',
            telefono: '(0266) 154777751',
            web: 'www.terrazasdepotrero.com.ar'
        }
    ];

    const iconMap = {
        wifi: FaWifi,
        parking: FaParking,
        pool: FaSwimmingPool,
        coffee: FaCoffee,
        gym: FaDumbbell,
        bar: FaCocktail
    };

    const filteredAlojamientos = alojamientos.filter(alojamiento =>
        (alojamiento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alojamiento.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedType === 'todos' || alojamiento.tipo === selectedType)
    );

    const AlojamientoModal = ({ onClose, alojamiento }) => {
        if (!alojamiento) return null;

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
                        <img src={alojamiento.imagen} alt={alojamiento.nombre} className="w-full h-64 object-cover rounded-lg" />
                        <p className="text-base leading-relaxed text-gray-700">
                            {alojamiento.descripcion}
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-[#00b601]">${alojamiento.precio} por noche</span>
                            <div className="flex items-center bg-[#ffb900] text-white px-2 py-1 rounded">
                                <FaStar className="mr-1" />
                                <span>{alojamiento.calificacion}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-[#00add5]">Servicios:</h3>
                            <div className="flex flex-wrap gap-2">
                                {alojamiento.servicios.map((servicio, i) => {
                                    const Icon = iconMap[servicio];
                                    return (
                                        <span key={i} className="flex items-center text-gray-600">
                                            <Icon className="mr-1" />
                                            {servicio}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-[#00add5]">Dirección:</h3>
                            <p className="text-gray-700">{alojamiento.direccion}</p>
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
                                    <a href={alojamiento.web} target="_blank" rel="noopener noreferrer" className="hover:underline">{alojamiento.web}</a>
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
    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 bg-gray-50">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-[#00add5]">
                    Alojamiento en Potrero de los Funes
                </h2>
                <p className="font-light text-gray-500 sm:text-xl">
                    Descubre los mejores lugares para alojarte en nuestro hermoso valle
                </p>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Buscar alojamiento..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00add5]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {['todos', 'hotel', 'apart', 'hosteria', 'posada'].map((tipo) => (
                        <button
                            key={tipo}
                            onClick={() => setSelectedType(tipo)}
                            className={`px-4 py-2 rounded-full ${selectedType === tipo ? 'bg-[#00add5] text-white' : 'bg-white text-[#00add5] border border-[#00add5]'} hover:bg-[#00add5] hover:text-white transition-colors duration-300`}
                        >
                            {tipo === 'todos' ? 'Todos' :
                                tipo === 'hotel' ? <><FaBed className="inline-block mr-2" /> Hoteles</> :
                                    tipo === 'apart' ? <><FaHome className="inline-block mr-2" /> Aparts</> :
                                        tipo === 'hosteria' ? <><FaHome className="inline-block mr-2" /> Hosterías</> :
                                            <><FaHome className="inline-block mr-2" /> Posadas</>}
                        </button>
                    ))}
                </div>
            </div>

            {filteredAlojamientos.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAlojamientos.map((alojamiento, index) => (
                        <Card
                            key={index}
                            imgAlt={alojamiento.nombre}
                            imgSrc={alojamiento.imagen}
                            className="hover:shadow-lg transition-shadow duration-300"
                        >
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                                {alojamiento.nombre}
                            </h5>
                            <p className="font-normal text-gray-700 mb-3 h-20 overflow-hidden">
                                {alojamiento.descripcion.substring(0, 100)}...
                            </p>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-2xl font-bold text-[#00b601]">${alojamiento.precio}</span>
                                <div className="flex items-center bg-[#ffb900] text-white px-2 py-1 rounded">
                                    <FaStar className="mr-1" />
                                    <span>{alojamiento.calificacion}</span>
                                </div>
                            </div>
                            <div className="flex space-x-2 mb-4">
                                {alojamiento.servicios.map((servicio, i) => {
                                    const Icon = iconMap[servicio];
                                    return <Icon key={i} className="text-[#00add5]" />;
                                })}
                            </div>
                            <Button color="blue" onClick={() => setSelectedAlojamiento(alojamiento)} className="w-full">
                                Ver detalles
                            </Button>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <FaSearchLocation className="mx-auto text-6xl text-gray-400 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">No se encontraron alojamientos</h3>
                    <p className="text-gray-500">
                        Lo sentimos, no pudimos encontrar alojamientos que coincidan con tu búsqueda.
                        <br />
                        Intenta con otros términos o explora todas nuestras opciones.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedType('todos');
                        }}
                        className="mt-6 px-6 py-2 bg-[#00add5] text-white rounded-full hover:bg-[#0098b8] transition-colors duration-300"
                    >
                        Ver todos los alojamientos
                    </button>
                </div>
            )}

            {selectedAlojamiento && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#00add5] text-white p-4 rounded-t-lg">
                            <h3 className="text-2xl font-semibold">{selectedAlojamiento.nombre}</h3>
                            <button onClick={() => setSelectedAlojamiento(null)} className="absolute top-4 right-4 text-white hover:text-gray-200">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <img src={selectedAlojamiento.imagen} alt={selectedAlojamiento.nombre} className="w-full h-64 object-cover rounded-lg" />
                            <p className="text-base leading-relaxed text-gray-700">
                                {selectedAlojamiento.descripcion}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-[#00b601]">${selectedAlojamiento.precio} por noche</span>
                                <div className="flex items-center bg-[#ffb900] text-white px-2 py-1 rounded">
                                    <FaStar className="mr-1" />
                                    <span>{selectedAlojamiento.calificacion}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-[#00add5]">Servicios:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedAlojamiento.servicios.map((servicio, i) => {
                                        const Icon = iconMap[servicio];
                                        return (
                                            <span key={i} className="flex items-center text-gray-600">
                                                <Icon className="mr-1" />
                                                {servicio}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-[#00add5]">Dirección:</h3>
                                <p className="text-gray-700">{selectedAlojamiento.direccion}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-[#00add5]">Contacto:</h3>
                                {selectedAlojamiento.telefono && (
                                    <p className="flex items-center mb-2 text-gray-700">
                                        <FaPhoneAlt className="mr-2 text-[#00add5]" />
                                        <a href={`tel:${selectedAlojamiento.telefono}`} className="hover:underline">{selectedAlojamiento.telefono}</a>
                                    </p>
                                )}
                                {selectedAlojamiento.email && (
                                    <p className="flex items-center mb-2 text-gray-700">
                                        <FaEnvelope className="mr-2 text-[#00add5]" />
                                        <a href={`mailto:${selectedAlojamiento.email}`} className="hover:underline">{selectedAlojamiento.email}</a>
                                    </p>
                                )}
                                {selectedAlojamiento.web && (
                                    <p className="flex items-center text-gray-700">
                                        <FaGlobe className="mr-2 text-[#00add5]" />
                                        <a href={selectedAlojamiento.web} target="_blank" rel="noopener noreferrer" className="hover:underline">{selectedAlojamiento.web}</a>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
                            <button
                                onClick={() => setSelectedAlojamiento(null)}
                                className="w-full bg-[#00add5] text-white py-2 px-4 rounded-lg hover:bg-[#0098b8] transition duration-300"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Alojamiento;