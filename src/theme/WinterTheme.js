// src/theme/WinterTheme.js
// Este archivo contiene constantes para el tema de invierno usado en toda la aplicación

export const winterColors = {
    primary: "#2980B9", // Azul invernal
    secondary: "#34495E", // Gris azulado
    accent: "#3498DB", // Azul cielo
    cream: "#F8F9FA", // Blanco crema nieve
    ice: "#E3F2FD", // Azul hielo
    frost: "#ECEFF1", // Escarcha
    snow: "#FFFFFF", // Blanco nieve
    glacier: "#1565C0", // Azul glaciar
    forest: "#2E7D32", // Verde pino
    // Fondos y gradientes
    lightBg: "#F1F8FF", // Fondo claro invernal
    darkBg: "#263238", // Fondo gris oscuro
    // Elementos invernales y decoraciones
    ice1: "#B3E5FC", // Hielo claro
    ice2: "#81D4FA", // Hielo medio
    ice3: "#4FC3F7", // Hielo oscuro
    snow1: "#FAFAFA", // Nieve brillante
    snow2: "#F5F5F5", // Nieve opaca
    crystal: "#E1F5FE", // Cristal de hielo
    frost1: "#CFD8DC", // Escarcha clara
    frost2: "#B0BEC5", // Escarcha media
};

// Gradientes predefinidos para reutilizar
export const winterGradients = {
    primary: `linear-gradient(to right, ${winterColors.glacier}, ${winterColors.primary}, ${winterColors.glacier})`,
    navbar: `linear-gradient(to right, ${winterColors.ice}dd, ${winterColors.primary}dd, ${winterColors.ice}dd)`,
    banner: `linear-gradient(to right, ${winterColors.glacier}cc, ${winterColors.primary}cc, ${winterColors.ice}cc)`,
    card: `linear-gradient(145deg, ${winterColors.ice}33, ${winterColors.frost}33)`,
    snow: `linear-gradient(180deg, ${winterColors.snow}, ${winterColors.ice})`,
    footer: `linear-gradient(135deg, ${winterColors.glacier}, ${winterColors.primary}, ${winterColors.accent})`,
};

// Mensajes específicos de temporada invernal
export const winterMessages = {
    welcomeMessage: "Bienvenido al invierno en Potrero de los Funes, San Luis",
    subtitle: "Aire fresco, paisajes escarchados y la magia del frío serrano",
    activities: [
        {
            title: "Caminatas matutinas con escarcha",
            description: "Disfrutá de senderos cubiertos por la escarcha matinal y respirá el aire puro del invierno"
        },
        {
            title: "Fotografía de paisajes helados",
            description: "Capturá la belleza única del lago con reflejos cristalinos y las sierras cubiertas de rocío helado"
        },
        {
            title: "Fogones junto al lago",
            description: "Calentate junto al fuego mientras contemplás las aguas tranquilas en las noches invernales"
        },
        {
            title: "Aventuras en el frío",
            description: "Explorá los senderos con el aire fresco del invierno y viví la serenidad de la temporada"
        }
    ]
};

// Efectos visuales específicos del invierno
export const winterEffects = {
    snowflakes: {
        count: 50,
        colors: [winterColors.snow1, winterColors.snow2, winterColors.ice1],
        sizes: [8, 12, 16, 20],
        speeds: [2, 4, 6]
    },
    frost: {
        opacity: 0.1,
        colors: [winterColors.frost1, winterColors.frost2, winterColors.crystal]
    }
};