import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
    const buttonRef = useRef(null);

    const languages = [
        { code: 'es', name: 'Español', flag: '🇦🇷' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    // Calcular posición del dropdown
    const updateDropdownPosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 8,
                right: window.innerWidth - rect.right
            });
        }
    };

    // Manejar click fuera del dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                // Verificar si el click fue en el dropdown portal
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

    // Componente del dropdown que se renderiza en un portal
    const DropdownContent = () => (
        <div
            id="language-dropdown-portal"
            className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[160px]"
            style={{
                position: 'fixed',
                top: `${dropdownPosition.top}px`,
                right: `${dropdownPosition.right}px`,
                zIndex: 999999, // Z-index extremadamente alto
                maxHeight: '300px',
                overflowY: 'auto'
            }}
        >
            {languages.map((language) => (
                <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${currentLanguage.code === language.code
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700'
                        }`}
                >
                    <span className="text-lg">{language.flag}</span>
                    <span className="text-sm">{language.name}</span>
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
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
                    aria-label="Seleccionar idioma"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <FaGlobe className="text-sm" />
                    <span className="hidden md:block text-sm font-medium">
                        {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                    </span>
                    <FaChevronDown
                        className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>

            {/* Renderizar el dropdown en un portal al final del body */}
            {isOpen && createPortal(<DropdownContent />, document.body)}
        </>
    );
};

export default LanguageSelector;