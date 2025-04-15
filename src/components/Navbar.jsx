// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logos/logo_blanco.png";
import { autumnColors, autumnGradients } from "../theme/AutumnTheme";
import FallingLeaves from "./FallingLeaves";

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

  // Efecto de gradiente otoñal con opacidad agregada cuando se desplaza
  const navbarBackground = isScrolled
    ? `bg-gradient-to-r from-amber-700/90 via-orange-600/90 to-amber-800/90 shadow-md backdrop-blur-sm`
    : `bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800`;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${navbarBackground} relative overflow-hidden`}
    >
      {/* Efecto de hojas cayendo */}
      <FallingLeaves quantity={5} containerClassName="h-full" />
      
      <div className="container mx-auto px-4 py-3 relative z-20">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="h-12 mr-3 drop-shadow-md"
              alt="Potrero de los Funes Logo"
            />
            {/* Indicador de temporada otoño */}
            <div className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs font-medium hidden md:flex items-center">
              <FaLeaf className="mr-1" /> 
              Temporada de Otoño
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
                    className="text-white hover:text-amber-200 transition duration-300 relative group"
                  >
                    {item.name}
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-amber-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
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
                    className="block text-white hover:text-amber-200 transition duration-300 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    <span
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-amber-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
                    ></span>
                  </Link>
                </li>
              ))}
              <li>
                <div className="flex items-center py-2 text-white text-xs">
                  <FaLeaf className="mr-1 text-amber-200" /> 
                  Temporada de Otoño
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