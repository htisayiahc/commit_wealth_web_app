import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './features/auth/LoginPage.tsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './features/auth/SignUpPage.tsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import WalletPage from './features/dashboard/WalletPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ ตัวแม่ที่ปล่อยสัญญาณให้ useNavigate() */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/register" element={<SignUpPage />}/>
        {/* หน้าแรกให้วิ่งไป Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/wallet" element={<WalletPage />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
