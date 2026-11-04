import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';
import AdvancedJS from './components/AdvancedJS.js';
import FAQ from './components/FAQ.js';
import Bookings from './components/Bookings.js';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advancedjs" element={<AdvancedJS />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
