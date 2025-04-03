import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnnouncementDetail from './pages/AnnouncementDetail';
import Notifications from './pages/Notifications';
import Procurement from './pages/Procurement';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import About from './pages/About';
import SupplierRegister from './pages/SupplierRegister';
import Training from './pages/Training';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="announcement/:id" element={<AnnouncementDetail />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="sales" element={<Sales />} />
          <Route path="reports" element={<Reports />} />
          <Route path="about" element={<About />} />
          <Route path="supplier-register" element={<SupplierRegister />} />
          <Route path="training" element={<Training />} />
          <Route path="sales-purchase/:id" element={<AnnouncementDetail />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App; 