// MaintenanceConfig.js
// Archivo de configuración para el modo mantenimiento

const MaintenanceConfig = {
    // Activa o desactiva el modo mantenimiento
    enabled: false,

    // Fecha de finalización prevista (opcional)
    expectedEndDate: new Date('2025-03-15T18:00:00'),

    // Mensaje personalizado (opcional)
    customMessage: 'Estamos actualizando nuestro sistema para brindarte una mejor experiencia.',

    // Correo de contacto para consultas durante el mantenimiento
    contactEmail: 'turismopotrerodelosfunes@gmail.com ',

    // Rutas exceptuadas del modo mantenimiento (opcional, para acceso administrativo)
    // Por ejemplo: ['/admin', '/login']
    excludedRoutes: ['/probando'],

    // Función para verificar si una ruta específica debe mostrar mantenimiento
    isRouteInMaintenance: (pathname) => {
        if (!MaintenanceConfig.enabled) return false;
        return !MaintenanceConfig.excludedRoutes.some(route =>
            pathname === route || pathname.startsWith(`${route}/`)
        );
    }
};

export default MaintenanceConfig;