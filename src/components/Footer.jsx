// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaTiktok, FaEnvelope, FaPhone, FaSnowflake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from "../assets/logos/logo_blanco.png";
import damianGomezLogo from "../assets/logos/damian_gomez.png";
import codeoLogo from "../assets/logos/codeo_logo.png";
import FallingSnow from './FallingSnow';
import { winterColors, winterGradients } from '../theme/WinterTheme';

const Footer = () => {
    const { t, ready } = useTranslation();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { Icon: FaFacebookF, url: 'https://www.facebook.com/potrero.encanta', label: 'Facebook' },
        { Icon: FaInstagram, url: 'https://www.instagram.com/potrero.encanta/', label: 'Instagram' },
        { Icon: FaTiktok, url: 'https://www.tiktok.com/@potrero.encanta', label: 'TikTok' },
    ];

    // Si las traducciones no están listas, mostrar una versión básica
    if (!ready) {
        return (
            <footer className="relative text-white py-12 overflow-hidden" style={{ 
                background: winterGradients.footer 
            }}>
                <div className="container mx-auto px-4 relative z-20">
                    <div className="text-center">
                        <p>Cargando...</p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="relative text-white py-12 overflow-hidden" style={{ 
            background: winterGradients.footer 
        }}>
            {/* Decoración de nieve cayendo */}
            <FallingSnow quantity={12} containerClassName="h-full" intensity="light" />
            
            {/* Decoración invernal */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200"></div>
            
            <div className="container mx-auto px-4 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex flex-col items-center md:items-start">
                            <Link to="/" className="mb-4">
                                <img src={logo} alt="Potrero de los Funes Logo" className="h-20 drop-shadow-lg" />
                            </Link>
                            <img src={damianGomezLogo} alt="Damián Gómez Logo" className="h-12 drop-shadow-lg" />
                            <div className="bg-blue-800/30 rounded-lg backdrop-blur-sm mt-3 px-4 py-2 text-blue-100 text-sm">
                                <FaSnowflake className="inline mr-2" />
                                {t('footer.winter_enjoy')}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-blue-300/30">
                            {t('footer.quick_links')}
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-blue-200 transition duration-300"
                                >
                                    {t('nav.home')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/actividades"
                                    className="hover:text-blue-200 transition duration-300"
                                >
                                    {t('nav.activities')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/alojamiento"
                                    className="hover:text-blue-200 transition duration-300"
                                >
                                    {t('nav.accommodation')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/gastronomia"
                                    className="hover:text-blue-200 transition duration-300"
                                >
                                    {t('nav.gastronomy')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contacto"
                                    className="hover:text-blue-200 transition duration-300"
                                >
                                    {t('nav.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-blue-300/30">
                            {t('footer.contact_us')}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <div className="flex items-start">
                                    <FaEnvelope className="mr-2 mt-1 flex-shrink-0" />
                                    <a 
                                        href="mailto:info@turismoenpotrerodelosfunes.com" 
                                        className="hover:text-blue-200 transition duration-300"
                                    >
                                        info@turismoenpotrerodelosfunes.com
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <FaPhone className="mr-2 flex-shrink-0" />
                                    <a 
                                        href="https://wa.me/542664770432" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="hover:text-blue-200 transition duration-300"
                                    >
                                        +54 9 2664 77-0432
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className='pl-4'>
                        <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-blue-300/30">
                            {t('footer.follow_us')}
                        </h4>
                        <div className="flex space-x-4">
                            {socialLinks.map(({ Icon, url, label }) => (
                                <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-200 transition duration-300 bg-blue-800/50 p-2 rounded-full"
                                    aria-label={`${t('footer.follow_us')} ${label}`}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                
                <hr className="border-blue-300/30 my-8" />
                
                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>
                        &copy; {currentYear} Potrero de los Funes. {t('footer.all_rights_reserved')}.
                    </p>
                    <div className="flex items-center mt-4 md:mt-0">
                        <p className="mr-2">{t('footer.developed_by')}</p>
                        <a
                            href="https://www.instagram.com/codeo.ar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-200 hover:text-white transition duration-300 flex items-center"
                        >
                            <img src={codeoLogo} alt="codeo Logo" className="h-6 mr-1 drop-shadow" />
                            codeo.ar
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;