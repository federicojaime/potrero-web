import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, right: 'auto' });
    const [isMobile, setIsMobile] = useState(false);
    const buttonRef = useRef(null);

    const languages = [
        { code: 'es', name: 'Español', flag: '🇦🇷' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    // Detectar si es móvil
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Calcular posición del dropdown
    const updateDropdownPosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const dropdownWidth = 160; // Ancho estimado del dropdown
            const viewportWidth = window.innerWidth;
            const padding = 16; // Padding desde los bordes

            let position = {
                top: rect.bottom + 8,
                right: 'auto',
                left: 'auto'
            };

            if (isMobile) {
                // En móviles, centrar o ajustar al contenedor
                const containerPadding = 16;
                position = {
                    top: rect.bottom + 8,
                    left: containerPadding,
                    right: containerPadding,
                    width: `calc(100vw - ${containerPadding * 2}px)`,
                    maxWidth: '280px',
                    margin: '0 auto'
                };
            } else {
                // En desktop, verificar si cabe a la derecha
                if (rect.right + dropdownWidth > viewportWidth - padding) {
                    // No cabe a la derecha, alinear a la derecha del botón
                    position.right = viewportWidth - rect.right;
                } else {
                    // Cabe a la derecha, alinear a la izquierda del botón
                    position.left = rect.left;
                }
            }

            setDropdownPosition(position);
        }
    };

    // Manejar click fuera del dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                const dropdownElement = document.getElementById('language-dropdown-portal');
                if (dropdownElement && !dropdownElement.contains(event.target)) {
                    setIsOpen(false);
                }
            }
        };

        const handleScroll = () => {
            if (isOpen) {
                updateDropdownPosition();
            }
        };

        const handleResize = () => {
            if (isOpen) {
                updateDropdownPosition();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleResize);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen) {
            updateDropdownPosition();
        }
        setIsOpen(!isOpen);
    };

    const handleLanguageChange = async (languageCode) => {
        try {
            await i18n.changeLanguage(languageCode);
            setIsOpen(false);
            console.log(`Idioma cambiado a: ${languageCode}`);
        } catch (error) {
            console.error('Error al cambiar idioma:', error);
        }
    };

    // Estilos dinámicos para el dropdown
    const getDropdownStyles = () => {
        const baseStyles = {
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            zIndex: 999999,
            maxHeight: '300px',
            overflowY: 'auto'
        };

        if (isMobile) {
            return {
                ...baseStyles,
                left: dropdownPosition.left,
                right: dropdownPosition.right,
                width: dropdownPosition.width,
                maxWidth: dropdownPosition.maxWidth,
                margin: dropdownPosition.margin
            };
        } else {
            return {
                ...baseStyles,
                ...(dropdownPosition.left !== 'auto' ? { left: `${dropdownPosition.left}px` } : {}),
                ...(dropdownPosition.right !== 'auto' ? { right: `${dropdownPosition.right}px` } : {}),
                minWidth: '160px'
            };
        }
    };

    // Componente del dropdown que se renderiza en un portal
    const DropdownContent = () => (
        <div
            id="language-dropdown-portal"
            className={`bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden ${
                isMobile ? 'mx-auto' : ''
            }`}
            style={getDropdownStyles()}
        >
            {languages.map((language) => (
                <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                        currentLanguage.code === language.code
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700'
                    }`}
                >
                    <span className="text-lg">{language.flag}</span>
                    <span className={`${isMobile ? 'text-base' : 'text-sm'}`}>
                        {language.name}
                    </span>
                    {currentLanguage.code === language.code && (
                        <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                </button>
            ))}
        </div>
    );

    return (
        <>
            <div className="relative">
                <button
                    ref={buttonRef}
                    onClick={handleToggle}
                    className={`flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 ${
                        isMobile ? 'px-2 py-2' : 'px-3 py-2'
                    }`}
                    aria-label="Seleccionar idioma"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <FaGlobe className={isMobile ? 'text-base' : 'text-sm'} />
                    <span className={`hidden md:block font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>
                        {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                    </span>
                    {/* En móvil mostrar solo la bandera y código */}
                    <span className={`block md:hidden font-medium text-xs`}>
                        {currentLanguage.flag}
                    </span>
                    <FaChevronDown
                        className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>

            {/* Overlay para móvil */}
            {isOpen && isMobile && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                    style={{ zIndex: 999998 }}
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Renderizar el dropdown en un portal al final del body */}
            {isOpen && createPortal(<DropdownContent />, document.body)}
        </>
    );
};

export default LanguageSelector;