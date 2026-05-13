import React,  { useState } from 'react'
import LoginSection from './LoginSection'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {

    const navigate = useNavigate(); // สร้างฟังก์ชันนำทาง
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // ป้องกันหน้าเว็บ Refresh
        try {
        const response = await axios.post('http://127.0.0.1:8081/api/v1/users/login', { username, password });
        console.log('Login Success');
        localStorage.setItem('jwt', response.data.jwtCode);
        navigate('/dashboard');
        } catch (error) {
        console.error('Login Failed:', error);
        }
    };
const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F8FAFC', // Clean White/Grey
      fontFamily: 'sans-serif',
    },
    card: {
      backgroundColor: '#FFFFFF',
      padding: '40px',
      borderRadius: '24px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      border: '1px solid #E2E8F0',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginTop: '8px',
      marginBottom: '20px',
      borderRadius: '12px',
      border: '1px solid #CBD5E1',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#10B981', // สีที่คุณเลือก
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '16px',
    },
    commitText: { color: '#1E293B' }, // Navy Slate
    wealthText: { color: '#10B981' }, // Emerald Green
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', margin: 0 }}>
            <span style={styles.commitText}>Commit</span>
            <span style={styles.wealthText}> Wealth</span>
          </h1>
          <p style={{ color: '#64748B', marginTop: '8px' }}>
            Manage your money, secure your future.
          </p>
        </div>

        <form onSubmit={ handleLogin}>
          <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Email Address</label>
          <input 
            style={styles.input} 
            type="username" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Password</label>
          <input 
            style={styles.input} 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} type="submit">Sign In</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="#" style={{ fontSize: '14px', color: '#10B981', textDecoration: 'none' }}>
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage