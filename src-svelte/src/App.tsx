import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lovebomb from './pages/Lovebomb';
import Clear from './pages/Clear';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lovebomb" element={<Lovebomb />} />
        <Route path="/clear" element={<Clear />} />
      </Routes>
    </Router>
  );
}

export default App;

