import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../assets/logos/logo_blanco.png";

function CustomNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="max-w-40 mr-3" alt="Potrero de los Funes Logo" />
                </Link>

                {/* Botón de menú para móviles */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white focus:outline-none"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Enlaces de navegación */}
                <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                    <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
                        {['Inicio', 'Actividades', 'Alojamiento', 'Contacto'].map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                                    className="block py-2 md:py-0 text-white hover:text-gray-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default CustomNavbar;