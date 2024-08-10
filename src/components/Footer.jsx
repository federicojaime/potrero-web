function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold mb-4">Potrero de los Funes</h3>
                        <p>Un paraíso serrano en San Luis, Argentina</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-xl font-semibold mb-4">Enlaces rápidos</h4>
                        <ul>
                            <li><a href="/" className="hover:text-gray-300">Inicio</a></li>
                            <li><a href="/actividades" className="hover:text-gray-300">Actividades</a></li>
                            <li><a href="/alojamiento" className="hover:text-gray-300">Alojamiento</a></li>
                            <li><a href="/contacto" className="hover:text-gray-300">Contacto</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-xl font-semibold mb-4">Contactanos</h4>
                        <p>Email: info@potrerodelosfunes.com</p>
                        <p>Teléfono: +54 266 4123456</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2024 Potrero de los Funes. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;