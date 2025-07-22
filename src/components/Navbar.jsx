// src/components/Navbar.jsx - VERSIÓN QUE FUNCIONA 100%
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSnowflake } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import logo from "../assets/logos/logo_blanco.png";
import { winterColors } from "../theme/WinterTheme";
import FallingSnow from "./FallingSnow";
import LanguageSelector from "./LanguageSelector";

function CustomNavbar() {
  // CAMBIO CRÍTICO: Usar ready para asegurar que las traducciones estén cargadas
  const { t, ready } = useTranslation();
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

  // ESPERAMOS A QUE LAS TRADUCCIONES ESTÉN LISTAS
  if (!ready) {
    return (
      <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                className="h-12 mr-3 drop-shadow-md"
                alt="Potrero de los Funes Logo"
              />
            </Link>
            <div className="text-white">Cargando...</div>
          </div>
        </div>
      </nav>
    );
  }

  // NAVEGACIÓN CON TRADUCCIONES (solo cuando ready = true)
  const navItems = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.activities'), path: "/actividades" },
    { name: t('nav.accommodation'), path: "/alojamiento" },
    { name: t('nav.gastronomy'), path: "/gastronomia" },
    { name: t('nav.contact'), path: "/contacto" },
  ];

  const navbarBackground = isScrolled
    ? `bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 shadow-md backdrop-blur-sm`
    : `bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900`;

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-300 ${navbarBackground} relative overflow-hidden`}>
      <FallingSnow quantity={8} containerClassName="h-full" intensity="light" />

      <div className="container mx-auto px-4 py-3 relative z-20">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="h-12 mr-3 drop-shadow-md"
              alt="Potrero de los Funes Logo"
            />
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
          <div className="hidden md:flex items-center space-x-6">
            {/* Links de navegación */}
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-white font-medium hover:text-blue-200 transition duration-300 relative group drop-shadow-md"
                  >
                    {item.name}
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* SELECTOR DE IDIOMA */}
            <LanguageSelector />
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
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                  </Link>
                </li>
              ))}

              {/* SELECTOR DE IDIOMA EN MÓVIL */}
              <li className="pt-4">
                <LanguageSelector />
              </li>

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