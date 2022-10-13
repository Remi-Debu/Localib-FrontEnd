import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GestionLocataires from './pages/locataire/gestion-locataires';
import LocataireAdd from './pages/locataire/locataire-add';
import LocataireUpdate from './pages/locataire/locataire-update';
import GestionVehicules from './pages/vehicule/gestion-vehicules';
import VehiculeAdd from './pages/vehicule/vehicule-add';
import VehiculeUpdate from './pages/vehicule/vehicule-update';


function App() {
  return (
    <>
      <Menu />
      <Router>
        <Routes>
          <Route path='*' element={<p>Page non trouvée !</p>} />
          <Route path='/' element={<Navigate to="/gestion-vehicules" />} />

          <Route path='/gestion-vehicules' element={<GestionVehicules />} />
          <Route path='/gestion-vehicules/ajouter' element={<VehiculeAdd />} />
          <Route path='/gestion-vehicules/modifier' element={<VehiculeUpdate />} />

          <Route path='/gestion-locataires' element={<GestionLocataires />} />
          <Route path='/gestion-locataires/ajouter' element={<LocataireAdd />} />
          <Route path='/gestion-locataires/modifier' element={<LocataireUpdate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
