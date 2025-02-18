import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/vendor-dashboard" element={<VendorDashboard />} /> */}
    </Routes>
  );
}

export default AppRoutes;
