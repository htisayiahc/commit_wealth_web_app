import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WalletPage = () => {
  const [wallets, setWallets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ walletName: '', balance: '', type: 'Savings' });
  const [isLoading, setIsLoading] = useState(true); // State สำหรับรอโหลด
  const [error, setError] = useState("");
  const token = localStorage.getItem('jwt'); // หรือที่ที่คุณเก็บ Token ไว้

  useEffect(() => {
    // ฟังก์ชันสำหรับเรียก API
    const fetchWallets = async () => {
      try {        
        const response = await axios.get('http://127.0.0.1:8081/api/v1/wallets/me', {
          headers: {
            'Authorization': `Bearer ${token}` // ส่ง Token ไปยืนยันตัวตน
          }
        });

        setWallets(response.data); // เก็บข้อมูลที่ได้ลง State
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Try again...");
      } finally {
        setIsLoading(false); // เลิกโหลด ไม่ว่าจะสำเร็จหรือไม่ก็ตาม
      }
    };

    fetchWallets();
  }, []); // [] หมายถึงให้ทำงานแค่ "ครั้งเดียว" ตอนเปิดหน้าเว็บ

  const handleSave = async () => {
    if (formData.walletName && formData.balance) {
      const response = await axios.post(
        'http://127.0.0.1:8081/api/v1/wallets', 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}` // ส่ง Token ไปยืนยันตัวตน
          }
        }
      );
      console.log(response);
      setWallets([ ...wallets, response.data ]);
      setShowModal(false);
      setFormData({ walletName: '', balance: '', type: 'Savings' });
    }
  };

  // สไตล์เฉพาะตัวที่ Bootstrap ไม่มีให้ (สีแบรนด์ของคุณ)
  const brandStyles = {
    greenBtn: { backgroundColor: '#10B981', border: 'none', color: 'white' },
    navyText: { color: '#1E293B' },
    addCard: {
      border: '2px dashed #10B981',
      backgroundColor: '#f0fdf4',
      cursor: 'pointer',
      transition: '0.2s'
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center text-danger">
        <p>{error}</p>
        <button className="btn btn-outline-secondary" onClick={() => window.location.reload()}>ลองใหม่</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={brandStyles.navyText}>My Wallets</h2>
        <span className="badge rounded-pill bg-secondary">{wallets.length} Wallets</span>
      </div>

      <div className="row g-4">
        {/* Render รายการ Wallet */}
        {wallets.map((wallet) => (
          <div key={wallet.id} className="col-md-6 col-lg-4">
            <div 
              className="card h-100 shadow-sm border-0 transition-all"
              style={{ cursor: 'pointer', borderLeft: '5px solid #10B981' }}
              onClick={() => window.location.href = '/dashboard'}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1 fw-bold">{wallet.walletName}</h5>
                  <p className="card-text text-muted small mb-0">{wallet.walletType}</p>
                </div>
                <h4 className="fw-bold mb-0" style={{ color: '#10B981' }}>
                  ฿{Number(wallet.summary).toLocaleString()}
                </h4>
              </div>
            </div>
          </div>
        ))}

        {/* ปุ่ม Add Wallet */}
        <div className="col-md-6 col-lg-4">
          <div 
            className="card h-100 shadow-sm d-flex align-items-center justify-content-center p-4 text-center"
            style={brandStyles.addCard}
            onClick={() => setShowModal(true)}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="display-6 text-success mb-2">+</div>
            <div className="fw-bold text-success">Add Wallet</div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal (Pop-up) */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">สร้างกระเป๋าเงินใหม่</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">WALLET NAME</label>
                  <input 
                    type="text" className="form-control form-control-lg bg-light border-0" 
                    onChange={(e) => setFormData({...formData, walletName: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">INITIAL BALANCE</label>
                  <input 
                    type="number" className="form-control form-control-lg bg-light border-0" 
                    onChange={(e) => setFormData({...formData, balance: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">TYPE</label>
                  <select className="form-select border-0 bg-light" onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="Savings">Savings</option>
                    <option value="Investment">Investment</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0 p-4">
                <button 
                  className="btn w-100 py-3 fw-bold shadow-sm" 
                  style={brandStyles.greenBtn}
                  onClick={handleSave}
                >
                  Save Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;