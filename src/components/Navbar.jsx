// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSnowflake } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logos/logo_blanco.png";
import { winterColors, winterGradients } from "../theme/WinterTheme";
import FallingSnow from "./FallingSnow";

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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Actividades", path: "/actividades" },
    { name: "Alojamiento", path: "/alojamiento" },
    { name: "Gastronomía", path: "/gastronomia" },
    { name: "Contacto", path: "/contacto" },
  ];

  // Efecto de gradiente invernal con mejor contraste
  const navbarBackground = isScrolled
    ? `bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 shadow-md backdrop-blur-sm`
    : `bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900`;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${navbarBackground} relative overflow-hidden`}
    >
      {/* Efecto de nieve cayendo */}
      <FallingSnow quantity={8} containerClassName="h-full" intensity="light" />
      
      <div className="container mx-auto px-4 py-3 relative z-20">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="h-12 mr-3 drop-shadow-md"
              alt="Potrero de los Funes Logo"
            />
            {/* Indicador de temporada invierno - MEJORADO CONTRASTE */}
            <div className="bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-bold hidden md:flex items-center shadow-md">
              <FaSnowflake className="mr-1" /> 
              Temporada de Invierno
            </div>
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
                    to={item.path}
                    className="text-white font-medium hover:text-blue-200 transition duration-300 relative group drop-shadow-md"
                  >
                    {item.name}
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
                    ></span>
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
                    to={item.path}
                    className="block text-white font-medium hover:text-blue-200 transition duration-300 relative group drop-shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
                    ></span>
                  </Link>
                </li>
              ))}
              <li>
                <div className="flex items-center py-2 text-white font-medium text-xs bg-white/20 px-3 rounded-lg">
                  <FaSnowflake className="mr-1 text-blue-200" /> 
                  Temporada de Invierno
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default CustomNavbar;