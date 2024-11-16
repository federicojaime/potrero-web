import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../assets/logos/logo_blanco.png";

// Colores de la marca según el manual, con ajuste del amarillo a crema
const colors = {
  primary: '#00ACD1',
  secondary: '#2D708F',
  green: '#1BB200',
  darkGreen: '#2B9100',
  cream: '#F5E6D3', // Color crema ajustado
  orange: '#EDA000',
  beige: '#CCB99B',
  black: '#1D1D1B',
};

function CustomNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = ['Inicio', 'Actividades', 'Alojamiento', 'Contacto'];

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-opacity-90 shadow-md' : ''}`} style={{ backgroundColor: colors.primary }}>
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="h-12 mr-3" alt="Potrero de los Funes Logo" />
                    </Link>

                    {/* Botón de menú para móviles */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white focus:outline-none"
                        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Enlaces de navegación para pantallas medianas y grandes */}
                    <div className="hidden md:block">
                        <ul className="flex space-x-8">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-white hover:text-cream-300 transition duration-300 relative group"
                                        style={{ '--cream-300': colors.cream }}
                                    >
                                        {item}
                                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-cream-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" style={{ backgroundColor: colors.cream }}></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Menú móvil */}
                {isOpen && (
                    <div className="md:hidden mt-4">
                        <ul className="flex flex-col space-y-4">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                                        className="block text-white hover:text-cream-300 transition duration-300 relative group"
                                        onClick={() => setIsOpen(false)}
                                        style={{ '--cream-300': colors.cream }}
                                    >
                                        {item}
                                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-cream-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" style={{ backgroundColor: colors.cream }}></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default CustomNavbar;