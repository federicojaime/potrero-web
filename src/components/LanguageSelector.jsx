import React, { useState, useRef, useEffect } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'es', name: 'Español', flag: '🇦🇷' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = async (languageCode) => {
        try {
            await i18n.changeLanguage(languageCode);
            setIsOpen(false);
            console.log(`Idioma cambiado a: ${languageCode}`);
        } catch (error) {
            console.error('Error al cambiar idioma:', error);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
                aria-label="Seleccionar idioma"
            >
                <FaGlobe className="text-sm" />
                <span className="hidden md:block text-sm font-medium">
                    {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                </span>
                <FaChevronDown
                    className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* ARREGLO DEL DROPDOWN - z-index más alto y posición fixed */}
            {isOpen && (
                <div
                    className="fixed bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[160px]"
                    style={{
                        top: dropdownRef.current?.getBoundingClientRect().bottom + 8 + 'px',
                        right: window.innerWidth - dropdownRef.current?.getBoundingClientRect().right + 'px',
                        zIndex: 9999 // ← Z-INDEX MUY ALTO
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
            )}
        </div>
    );
};

export default LanguageSelector;