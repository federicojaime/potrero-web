// src/App.jsx
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Actividades from './pages/Actividades';
import Alojamiento from './pages/Alojamiento';
import Circuitos from './pages/Circuitos';
import Gastronomia from './pages/Gastronomia';
import Contacto from './pages/Contacto';
import Eventos from './pages/Eventos';
import Naturaleza from './pages/Naturaleza';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MaintenancePage from './components/MaintenancePage';
import MaintenanceConfig from './MaintenanceConfig';
import AutumnBanner from './components/AutumnBanner';

// Importamos los estilos del tema de otoño
import './styles/AutumnTheme.css';

// Componente que verifica el modo mantenimiento basado en la ruta actual
const MaintenanceWrapper = () => {
  const location = useLocation();
  const inMaintenance = MaintenanceConfig.isRouteInMaintenance(location.pathname);
  
  useEffect(() => {
    // Aplicar tema de otoño a todo el sitio
    document.documentElement.classList.add('autumn-theme');
    
    // Cambiar el color del tema de la barra de navegación para dispositivos móviles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#D35400'); // Color naranja otoñal
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'theme-color';
      newMeta.content = '#D35400';
      document.head.appendChild(newMeta);
    }
    
    // Agregar favicon otoñal
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      // Guardamos el favicon original para poder restaurarlo si es necesario
      if (!favicon.dataset.originalHref) {
        favicon.dataset.originalHref = favicon.href;
      }
      // Actualizar solo si es necesario
      if (favicon.href !== '/autumn-favicon.png') {
        favicon.href = '/autumn-favicon.png';
      }
    }
    
    return () => {
      // Limpiar al desmontar
      document.documentElement.classList.remove('autumn-theme');
      // Restaurar favicon original
      if (favicon && favicon.dataset.originalHref) {
        favicon.href = favicon.dataset.originalHref;
      }
    };
  }, []);
  
  if (inMaintenance) {
    return <MaintenancePage />;
  }
  
  return (
    <>
      <Navbar />
      {/* Banner de temporada de otoño */}
      <AutumnBanner />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actividades" element={<Actividades />} />
          <Route path="/gastronomia" element={<Gastronomia />} />
          <Route path="/circuitos" element={<Circuitos />} />
          <Route path="/alojamiento" element={<Alojamiento />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/naturaleza" element={<Naturaleza />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {MaintenanceConfig.enabled ? (
          <Routes>
            {/* Mantener rutas excluidas funcionando */}
            {MaintenanceConfig.excludedRoutes.map(route => (
              <Route key={route} path={`${route}/*`} element={<MaintenanceWrapper />} />
            ))}
            {/* Ruta predeterminada muestra la página de mantenimiento */}
            <Route path="*" element={<MaintenancePage />} />
          </Routes>
        ) : (
          <MaintenanceWrapper />
        )}
      </div>
    </Router>
  );
}

export default App;