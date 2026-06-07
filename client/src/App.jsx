import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import LatestFares from './pages/LatestFares';
import Destinations from './pages/Destinations';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminLayout from './pages/admin/AdminLayout';
import Analytics from './pages/admin/Analytics';
import Inquiries from './pages/admin/Inquiries';
import Bookings from './pages/admin/Bookings';
import Fares from './pages/admin/Fares';
import PromotionalFares from './pages/admin/PromotionalFares';
import Content from './pages/admin/Content';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="fares" element={<LatestFares />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="inquiry" element={<Inquiry />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="analytics" replace />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="fares" element={<Fares />} />
          <Route path="promotional-fares" element={<PromotionalFares />} />
          <Route path="content" element={<Content />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
