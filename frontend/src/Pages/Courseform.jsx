import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './Courseform.css' ; 

const CourseForm = () => {
    const [title, setTitle] = useState('');
    const [branch, setbranch] = useState('');
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
            const response = await axios.post('http://localhost:8000/course/register', {title , branch } );
            setModalMessage('Submission successful!');
            setIsModalOpen(true);
            setTimeout(() => {
                setIsModalOpen(false);
                navigate('/');
                window.location.reload();
            }, 2000);
            
        } catch (error) {
            console.error('Submission failed:', error.response?.data?.message || 'An error occurred');
            // console.error('Login failed:', error.response?.data?.message || 'An error occurred');
            setModalMessage(error.response?.data?.message || 'An error occurred');
            setIsModalOpen(true);
            setTimeout(() => setIsModalOpen(false), 3000);
        }
    };
    return (
        <>
     <div>
        <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input type="text" id="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title" required />
                        </div>
                        <div className="input-group">
                            <input type="text" id="Branch" name="branch" value={branch} onChange={(e) => setbranch(e.target.value)} placeholder="Enter the branch" required />
                        </div>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                  
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
  };
  
  export default CourseForm;

