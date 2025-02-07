import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { FaMapMarkedAlt, FaSun, FaCamera } from 'react-icons/fa';

const TouristInfoSection = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [weatherError, setWeatherError] = useState(false);

    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Potrero+de+los+Funes,AR&units=metric&appid=YOUR_API_KEY')
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(() => setWeatherError(true));
    }, []);

    const renderWeatherInfo = () => {
        if (weatherError) {
            return <p className="text-gray-600">Lo sentimos, no pudimos cargar la información del clima en este momento.</p>;
        }
        if (!weatherData) {
            return <p className="text-gray-600">Cargando información del clima...</p>;
        }
        return (
            <div>
                <p className="text-2xl font-bold mb-2">{Math.round(weatherData.main.temp)}°C</p>
                <p className="capitalize">{weatherData.weather[0].description}</p>
                <p>Humedad: {weatherData.main.humidity}%</p>
                <p>Viento: {weatherData.wind.speed} m/s</p>
            </div>
        );
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Información Turística</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <FaMapMarkedAlt className="text-blue-500 text-2xl mr-3" />
                                <h3 className="text-xl font-semibold">Cómo llegar</h3>
                            </div>
                            <div className="aspect-video mb-4">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26701.368796393534!2d-66.25133234090578!3d-33.22271780152669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4155ed0d7d0b7%3A0x48cf9a210e539757!2sPotrero%20de%20los%20Funes%2C%20San%20Luis!5e0!3m2!1ses!2sar!4v1727409872087!5m2!1ses!2sar"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                            <p className="text-gray-600">
                                A solo 20 km de la ciudad de San Luis. Acceso por Autopista de las Serranías Puntanas.
                            </p>
                        </div>
                    </Card>

                    <Card className="overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <FaSun className="text-yellow-500 text-2xl mr-3" />
                                <h3 className="text-xl font-semibold">Clima</h3>
                            </div>
                            <div className="mb-4">
                                {renderWeatherInfo()}
                            </div>
                            <p className="text-gray-600">
                                Consulta el pronóstico actualizado para planificar tu visita.
                            </p>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <FaCamera className="text-green-500 text-2xl mr-3" />
                                <h3 className="text-xl font-semibold">Actividades populares</h3>
                            </div>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Deportes acuáticos en el lago</li>
                                <li>• Trekking y mountain bike</li>
                                {/*<li>• Visitas al Circuito Internacional</li>*/}
                                <li>• Pesca deportiva</li>
                                <li>• Turismo aventura</li>
                            </ul>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default TouristInfoSection;