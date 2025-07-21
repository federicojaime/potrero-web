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
import WinterBanner from './components/WinterBanner';
import FindeXXLEventsPage from './pages/FindeXXLEventsPage';

// Importamos los estilos del tema de invierno
import './styles/WinterTheme.css';

// Componente que verifica el modo mantenimiento basado en la ruta actual
const MaintenanceWrapper = () => {
  const location = useLocation();
  const inMaintenance = MaintenanceConfig.isRouteInMaintenance(location.pathname);

  useEffect(() => {
    // Aplicar tema de invierno a todo el sitio
    document.documentElement.classList.remove('autumn-theme');
    document.documentElement.classList.add('winter-theme');

    // Cambiar el color del tema de la barra de navegación para dispositivos móviles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#2980B9'); // Color azul invernal
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'theme-color';
      newMeta.content = '#2980B9';
      document.head.appendChild(newMeta);
    }

    // Agregar favicon invernal
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      // Guardamos el favicon original para poder restaurarlo si es necesario
      if (!favicon.dataset.originalHref) {
        favicon.dataset.originalHref = favicon.href;
      }
      // Actualizar solo si es necesario
      if (favicon.href !== '/winter-favicon.png') {
        favicon.href = '/winter-favicon.png';
      }
    }

    return () => {
      // Limpiar al desmontar
      document.documentElement.classList.remove('winter-theme');
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
      {/* Banner de temporada de invierno - REMOVIDO */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actividades" element={<Actividades />} />
          <Route path="/gastronomia" element={<Gastronomia />} />
          <Route path="/circuitos" element={<Circuitos />} />
          <Route path="/alojamiento" element={<Alojamiento />} />
          <Route path="/eventos" element={<FindeXXLEventsPage />} />
          <Route path="/eventos/finde-xxl" element={<FindeXXLEventsPage />} />
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