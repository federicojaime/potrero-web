import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import logo from "../assets/logos/logo_blanco.png";
import damianGomezLogo from "../assets/logos/damian_gomez.png";
import codeoLogo from "../assets/logos/codeo_logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const colors = {
        primary: '#00ACD1',
        secondary: '#2D708F',
        cream: '#F5E6D3',
    };

    return (
        <footer style={{ backgroundColor: colors.primary }} className="text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex flex-col items-center md:items-start">
                            <Link to="/" className="mb-4">
                                <img src={logo} alt="Potrero de los Funes Logo" className="h-20 drop-shadow-lg" />
                            </Link>
                            <img src={damianGomezLogo} alt="Damián Gómez Logo" className="h-12 drop-shadow-lg" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-cream/30">Enlaces rápidos</h4>
                        <ul className="space-y-2">
                            {['Inicio', 'Actividades', 'Alojamiento', 'Contacto'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                                        className="hover:text-cream transition duration-300"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-cream/30">Contáctanos</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <FaEnvelope className="mr-2" />
                                <a href="mailto:info@potrerodelosfunes.com" className="hover:text-cream transition duration-300">
                                    info@potrerodelosfunes.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="mr-2" />
                                <a href="https://wa.me/542664123456" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition duration-300">
                                    +54 9 2664 77-0432
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-cream/30">Síguenos</h4>
                        <div className="flex space-x-4">
                            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-white hover:text-cream transition duration-300 bg-secondary p-2 rounded-full"
                                    aria-label={`Síguenos en ${Icon.name.replace('Fa', '')}`}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <hr className="border-cream/30 my-8" />
                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {currentYear} Potrero de los Funes. Todos los derechos reservados.</p>
                    <div className="flex items-center mt-4 md:mt-0">
                        <p className="mr-2">Desarrollado por</p>
                        <a
                            href="https://www.instagram.com/codeo.ar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cream hover:text-white transition duration-300 flex items-center"
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