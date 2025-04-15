// src/theme/AutumnTheme.js
// Este archivo contiene constantes para el tema de otoño usado en toda la aplicación

export const autumnColors = {
    primary: "#E67E22", // Naranja otoñal
    secondary: "#8E4400", // Marrón oscuro
    accent: "#D35400", // Naranja quemado
    cream: "#F5E6D3", // Crema (mantiene el original)
    amber: "#F39C12", // Ámbar otoñal
    burgundy: "#C0392B", // Borgoña otoñal
    gold: "#F1C40F", // Dorado otoñal
    copper: "#D35400", // Cobre
    forest: "#27AE60", // Verde bosque
    // Fondos y gradientes
    lightBg: "#FFF8E1", // Fondo claro crema
    darkBg: "#5D4037", // Fondo marrón oscuro
    // Hojas y decoraciones
    leaf1: "#FF7043", // Naranja brillante
    leaf2: "#FFA000", // Ámbar
    leaf3: "#8D6E63", // Marrón suave
    leaf4: "#C62828", // Rojo oscuro
    leaf5: "#EF6C00", // Naranja oscuro
  };
  
  // Gradientes predefinidos para reutilizar
  export const autumnGradients = {
    primary: `linear-gradient(to right, ${autumnColors.secondary}, ${autumnColors.primary}, ${autumnColors.secondary})`,
    navbar: `linear-gradient(to right, ${autumnColors.amber}dd, ${autumnColors.copper}dd, ${autumnColors.amber}dd)`,
    banner: `linear-gradient(to right, ${autumnColors.burgundy}cc, ${autumnColors.copper}cc, ${autumnColors.amber}cc)`,
    card: `linear-gradient(145deg, ${autumnColors.amber}33, ${autumnColors.copper}33)`,
  };
  
  // Mensajes específicos de temporada
  export const autumnMessages = {
    welcomeMessage: "Bienvenido al otoño en Potrero de los Funes, San Luis",
    subtitle: "Colores tenues, aire fresco y tiempo para recorrer con calma",
    activities: [
      {
        title: "Caminata entre hojas",
        description: "Recorré los senderos y sentí el crujir de las hojas secas bajo tus zapatillas"
      },
      {
        title: "Fotografía de paisaje",
        description: "Registrá con tu cámara o celular los tonos ocres sobre las sierras y el lago"
      },
      {
        title: "Café y mate junto al lago",
        description: "Hacé una pausa en los paradores, probá un café o un mate y mirá el agua tranquila"
      },
      {
        title: "Salida en kayak",
        description: "Paseá por el lago en una travesía guiada y observá los hermosos atardeceres"
      }
    ]
  };
  