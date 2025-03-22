import React, { useState } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();
    const closeModal = () => {
        setIsModalOpen(false);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Form is being submitted ") ; 
            const response = await axios.post('http://localhost:8000/user/login', { email, password }, { withCredentials: true });
            setModalMessage('Login successful!');
            localStorage.setItem('user', JSON.stringify(response.data.id));
            localStorage.setItem('userRole', response.data.role);
            setIsModalOpen(true);
            setTimeout(() => {
                setIsModalOpen(false);
                navigate('/');
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || 'An error occurred');
            setModalMessage(error.response?.data?.message || 'An error occurred');
            setIsModalOpen(true);
            setTimeout(() => setIsModalOpen(false), 3000); // Close modal after 3 seconds
        }
    };

    return (
        <>
        <div className="login-container">
            <div className="login-left">
                <div className="branding">
                    <h1>CampusConnect</h1>
                </div>
            </div>
            <div className="login-right">
                <div className="login-box">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email id" required />
                        </div>
                        <div className="input-group">
                            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                        </div>
                        <button type="submit" className="submit-btn">Login</button>
                    </form>
                    <p>Don't have an account? <Link to="/signup">Register</Link></p>
                    <Link to="/reset-password" className="forgot-password">Forgot password?</Link>
                </div>
            </div>
          
        </div>
        {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <p>{modalMessage}</p>
      <div className="button-container">
        <button onClick={closeModal} className="close-button">
          Close
        </button>
      </div>
    </div>
  </div>
)}


          </>
    );
}

export default Login;
