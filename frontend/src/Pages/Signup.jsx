import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal'; // Ensure Modal component exists
import './Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [rollno, setRollno] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:8000/user/signup', { 
                name, rollno, email, password, role 
            });
            setModalMessage('Signup successful!'); 
            setModalOpen(true);
        } catch (error) {
            setModalMessage('Signup failed: ' + (error.response?.data?.message || 'An error occurred'));
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        if (modalMessage === 'Signup successful!') {
            navigate('/login');
        }
    };

    return (
        <section>
            <div className="login-container">
                <div className="login-left">
                    <div className="branding">
                        <h1>CampusConnect</h1> 
                    </div>
                </div>
                <div className="login-right">
                    <div className="login-box">
                        <h1>Sign Up</h1>
                        <form onSubmit={handleSubmit}> 
                            <div className="input-group">
                                <input type="text" id="name" name="name" placeholder="Enter your name" 
                                    value={name} onChange={ (e) => setName(e.target.value) } required />
                            </div>
                            <div className="input-group">
                                <input type="text" id="rollno" name="rollno" placeholder="Enter your roll number" 
                                    value={rollno} onChange={ (e) => setRollno(e.target.value) } required />
                            </div>
                            <div className="input-group">
                                <input type="email" id="email" name="email" placeholder="Enter your email" 
                                    value={email} onChange={ (e) => setEmail(e.target.value) } required />
                            </div>
                            <div className="input-group">
                                <input type="password" id="password" name="password" placeholder="Enter your password" 
                                    value={password} onChange={ (e) => setPassword(e.target.value) } required />
                            </div>
                            <div className="input-group">
                                <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                                    <option value="Student">Student</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-btn">Sign Up</button>
                        </form>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
            <Modal show={isModalOpen} handleClose={closeModal} message={modalMessage} />
        </section>
    );
}

export default Signup;
