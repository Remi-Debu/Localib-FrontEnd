import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Menu from './components/menu';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
    <>
      <Menu />
      <Router>
        <Routes>
          <Route path='*' element={<p>Page non trouvée !</p>} />
          <Route path='/' element={<Navigate to="/gestion-vehicules" />} />

          <Route path='/gestion-vehicules' />
          <Route path='/gestion-locataires' />
        </Routes>
      </Router>
    </>
  );
}

export default App;
