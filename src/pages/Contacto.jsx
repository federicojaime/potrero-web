import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Label, TextInput, Textarea, Alert } from 'flowbite-react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { HiCheck, HiInformationCircle } from 'react-icons/hi';
import emailjs from '@emailjs/browser';

// Inicializar EmailJS
emailjs.init("m2PjHdmsAy3s5UoI2");

function Contacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, submitted: false, error: null });

        try {
            const templateParams = {
                to_email: 'info@turismoenpotrerodelosfunes.com',
                from_name: formData.nombre,
                from_email: formData.email,
                phone: formData.telefono,
                message: formData.mensaje,
                reply_to: formData.email
            };

            await emailjs.send(
                'service_hevx6eh',
                'template_5vq7eie',
                templateParams,
                'm2PjHdmsAy3s5UoI2'
            );

            setStatus({
                submitting: false,
                submitted: true,
                error: null
            });

            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                mensaje: ''
            });

        } catch (error) {
            console.error('Error sending email:', error);
            setStatus({
                submitting: false,
                submitted: false,
                error: 'Hubo un error al enviar el mensaje. Por favor, intente nuevamente.'
            });
        }
    };

    return (
        <div className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#00add5]"
                >
                    Contactanos
                </motion.h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6 text-[#00add5]">Información de Contacto</h2>
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <FaPhone className="text-[#00add5] text-xl mr-4" />
                                    <div>
                                        <h3 className="font-medium">Teléfono</h3>
                                        <p className="text-gray-600">+54 266 4770432</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="text-[#00add5] text-xl mr-4" />
                                    <div>
                                        <h3 className="font-medium">Email</h3>
                                        <p className="text-gray-600">turismopotrerodelosfunes@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-[#00add5] text-xl mr-4" />
                                    <div>
                                        <h3 className="font-medium">Dirección</h3>
                                        <p className="text-gray-600">Av. del Circuito, frente accesso A2, Potrero de los Funes, 5701</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaClock className="text-[#00add5] text-xl mr-4" />
                                    <div>
                                        <h3 className="font-medium">Horarios</h3>
                                        <p className="text-gray-600">Abierto todos los días de 9:00 a 20:00 hs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-[#00add5]">Ubicación</h2>
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13235.711610033562!2d-66.23661655!3d-33.21809795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d43c01d4a92f9d%3A0x274d4123c0513d6c!2sPotrero%20de%20los%20Funes%2C%20San%20Luis!5e0!3m2!1ses-419!2sar!4v1650485000000!5m2!1ses-419!2sar"
                                    className="w-full h-full rounded-lg"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Mapa de Potrero de los Funes"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-8 rounded-lg shadow-lg"
                    >
                        <h2 className="text-2xl font-semibold mb-6 text-[#00add5]">Envíanos un mensaje</h2>

                        {status.submitted && (
                            <Alert
                                color="success"
                                icon={HiCheck}
                                className="mb-6"
                            >
                                <span className="font-medium">¡Mensaje enviado con éxito!</span>
                                <p>Gracias por contactarnos, te responderemos a la brevedad.</p>
                            </Alert>
                        )}

                        {status.error && (
                            <Alert
                                color="failure"
                                icon={HiInformationCircle}
                                className="mb-6"
                            >
                                <span className="font-medium">¡Ups! Algo salió mal</span>
                                <p>{status.error}</p>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="nombre" value="Nombre completo" />
                                <TextInput
                                    id="nombre"
                                    type="text"
                                    placeholder="Juan Pérez"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    placeholder="nombre@ejemplo.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="telefono" value="Teléfono" />
                                <TextInput
                                    id="telefono"
                                    type="tel"
                                    placeholder="+54 9 11 1234-5678"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="mensaje" value="Mensaje" />
                                <Textarea
                                    id="mensaje"
                                    placeholder="Escribí tu mensaje acá..."
                                    required
                                    rows={4}
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-[#00add5] hover:bg-[#0098b8] text-white font-medium"
                                disabled={status.submitting}
                            >
                                {status.submitting ? 'Enviando...' : 'Enviar mensaje'}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Contacto;