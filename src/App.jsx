import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
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
      </div>
    </Router>
  );
}

export default App;