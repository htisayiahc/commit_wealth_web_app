import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginSection from '../features/auth/LoginSection';
import DashboardPage from '../features/dashboard/DashboardPage';
import SignUpPage from '../features/auth/SignUpPage';

// สร้าง Component เพื่อเช็กว่า Login หรือยัง
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // เช็กว่ามี token ไหม
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginSection />} />
        
        {/* หน้าที่ต้อง Login ก่อนถึงจะเข้าได้ */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/register" 
          element={
            <PrivateRoute>
              <SignUpPage />
            </PrivateRoute>
          } 
        />

        {/* ถ้าเข้าหน้าอื่นให้เด้งไป login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;