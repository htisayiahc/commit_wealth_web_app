import React, { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// อย่าลืม import CSS ของตัว Library ด้วยครับ
import "react-datepicker/dist/react-datepicker.css";

const SignUpPage = () => {
  // --- 1. State Management ---
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    salary: '',
    birthday: new Date()
  });

  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    console.log("ถอยกลับไปหน้าก่อนหน้า");
    window.history.back();
    // window.history.back(); หรือใช้ navigation.goBack() ถ้าเป็น Mobile
  }, []);

  // --- 2. Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, birthday: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // แนะนำมาตรฐานอุตสาหกรรม: ใช้ Axios สำหรับยิง API
      const response = await axios.post('http://127.0.0.1:8081/api/v1/users/register', formData);
      console.log('Success:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.page}>
      {/* 🟢 ส่วนที่เพิ่ม: แถบ Header สีเขียว */}
      <header style={styles.header}>
        <div style={styles.backButton} onClick={handleBack}>
          <span style={{ fontSize: '24px' }}>←</span>
        </div>
        <h1 style={styles.appName}>Commit wealth</h1>
      </header>

      <div style={styles.content}>
        <h2 style={{ color: '#065F46' }}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="username" placeholder="ชื่อผู้ใช้งาน" onChange={handleChange} style={styles.input} />
          <input name="password" type="password" placeholder="รหัสผ่าน" onChange={handleChange} style={styles.input} />
          <input name="salary" type="number" placeholder="เงินเดือน (บาท)" onChange={handleChange} style={styles.input} />
          
          <div style={styles.dateGroup}>
            <label>วันเกิด:</label>
            <DatePicker 
                selected={formData.birthday} 
                onChange={handleDateChange} 
                dateFormat="dd/MM/yyyy"
                className="custom-date-input"
            />
          </div>

          <button type="submit" style={styles.submitBtn}>สมัครสมาชิก</button>
        </form>
      </div>
    </div>
  );

//   return (
//     <div>
    
//     <div style={styles.container}>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
        
//         <input
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <input
//           name="salary"
//           type="number"
//           placeholder="Salary"
//           onChange={handleChange}
//           style={styles.input}
//         />

//         {/* --- 3. React Datepicker --- */}
//         <div style={styles.dateWrapper}>
//           <label>Birthday: </label>
//           <DatePicker
//             selected={formData.birthday}
//             onChange={handleDateChange}
//             dateFormat="dd/MM/yyyy"
//             maxDate={new Date()} // ป้องกันการเลือกวันที่ในอนาคต
//             className="my-date-picker" 
//           />
//         </div>

//         <button type="submit" style={styles.button}>Register</button>
//       </form>
//     </div>
//     </div>
//   );
};

// สไตล์เบื้องต้น
const styles = {
  page: { backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'sans-serif' },
  header: { 
    backgroundColor: '#10B981', // Emerald Green 
    height: '70px', 
    display: 'flex', 
    alignItems: 'center', 
    padding: '0 20px', 
    color: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  backButton: { cursor: 'pointer', marginRight: '15px', padding: '5px' },
  appName: { fontSize: '22px', fontWeight: 'bold', margin: 0 },
  content: { padding: '40px 20px', maxWidth: '400px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '16px' },
  dateGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  submitBtn: { 
    padding: '14px', 
    backgroundColor: '#10B981', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    fontWeight: 'bold', 
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default SignUpPage;