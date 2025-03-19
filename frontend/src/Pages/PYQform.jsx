import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './Courseform.css' ; 

const PYQForm  = () => {
    
        const [title, setTitle] = useState("");
        const [type, setType] = useState("");
        const [mode, setMode] = useState("Offline"); // Default value as per schema
        const [marks, setMarks] = useState("");
        const [time, setTime] = useState("");
        const [year, setYear] = useState("");
        const [url, setUrl] = useState("");
        const [course, setCourse] = useState("") ; 
        
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
            const response = await axios.post('http://localhost:8000/resource/pyq/submit', {title , type , mode , marks , time , year , url , course } );
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
        <input 
            type="text" 
            id="title" 
            name="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter the title" 
            required 
        />
    </div>
    
    <div className="input-group">
        <select 
            id="type" 
            name="type" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            required
        >
            <option value="">Select Type</option>
            <option value="Mid-Sem">Mid-Sem</option>
            <option value="End-Sem">End-Sem</option>
            <option value="Assignment">Assignment</option>
            <option value="Quiz">Quiz</option>
        </select>
    </div>

    <div className="input-group">
        <select 
            id="mode" 
            name="mode" 
            value={mode} 
            onChange={(e) => setMode(e.target.value)} 
            required
        >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
        </select>
    </div>

    <div className="input-group">
        <input 
            type="number" 
            id="marks" 
            name="marks" 
            value={marks} 
            onChange={(e) => setMarks(e.target.value)} 
            placeholder="Enter Marks" 
            required 
        />
    </div>

    <div className="input-group">
        <input 
            type="number" 
            id="time" 
            name="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            placeholder="Enter Time (Optional)" 
        />
    </div>

    <div className="input-group">
        <input 
            type="number" 
            id="year" 
            name="year" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            placeholder="Enter Year" 
            required 
        />
    </div>

    <div className="input-group">
        <input 
            type="url" 
            id="url" 
            name="url" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="Enter URL" 
            required 
        />
    </div>

    <div className="input-group">
        <input 
            type="text" 
            id="course" 
            name="course" 
            value={course} 
            onChange={(e) => setCourse(e.target.value)} 
            placeholder="Enter Course Name" 
            required 
        />
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
  
  export default PYQForm;


  // {
  //   "title" : "question paper" ,
  //   "type" : "Mid-Sem" , 
  //   "mode" : "Offline" , 
  //   "marks" : "40" , 
  //   "time" : "30" , 
  //   "year" : "2023" , 
  //   "url" : "www.google.com" ,
  //   "course" : "DSAbhjcbqeuk"
  // }