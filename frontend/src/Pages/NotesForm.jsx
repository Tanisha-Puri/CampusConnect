import React from "react";
import axios from 'axios';
import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './BookingForm.css';

const NotesForm  = () => {
    
        const [title, setTitle] = useState("");
        // const [type, setType] = useState("");
        // const [mode, setMode] = useState("Offline"); // Default value as per schema
        // const [marks, setMarks] = useState("");
        // const [time, setTime] = useState("");
        // const [year, setYear] = useState("");
        const [url, setUrl] = useState("");
        const [course, setCourse] = useState("") ; 
        const [description, setdescription] = useState("") ; 
        const [submittedby, setsubmittedby] = useState("") ; 
        
    const [isModalOpen, setIsModalOpen] = useState(false);
        const [modalMessage, setModalMessage] = useState('');
        const navigate = useNavigate();
        const closeModal = () => {
            setIsModalOpen(false);
          };
        
          useEffect(() => {
            const userData = localStorage.getItem('user'); 
            console.log("Raw user data from localStorage:", userData); // Debugging step
        
            if (userData) {
                try {
                    const loggedInUser = JSON.parse(userData);
                    console.log("Parsed user:", loggedInUser); // Debugging step
        
                    if (loggedInUser?.name) {
                        setsubmittedby(loggedInUser.name); // Use 'name' field from schema
                    } else {
                        console.error("User data does not contain 'name'");
                    }
                } catch (error) {
                    console.error("Error parsing user data:", error);
                }
            } else {
                console.warn("No user found in localStorage");
            }
        }, []);
        

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Form is being submitted ") ; 
            const response = await axios.post('http://localhost:8000/resource/notes/submit', {title , description , submittedby , url , course } );
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
     <div className="booking-form-container">
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
    
    {/* <div className="input-group">
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
    </div> */}

    {/* <div className="input-group">
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
    </div> */}

    {/* <div className="input-group">
        <input 
            type="number" 
            id="marks" 
            name="marks" 
            value={marks} 
            onChange={(e) => setMarks(e.target.value)} 
            placeholder="Enter Marks" 
            required 
        />
    </div> */}

    {/* <div className="input-group">
        <input 
            type="number" 
            id="time" 
            name="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            placeholder="Enter Time (Optional)" 
        />
    </div> */}

    {/* <div className="input-group">
        <input 
            type="number" 
            id="year" 
            name="year" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            placeholder="Enter Year" 
            required 
        />
    </div> */}

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

    <div className="input-group">
        <input 
            type="text" 
            id="submittedby" 
            name="submittedby" 
            value={submittedby} 
            onChange={(e) => setsubmittedby(e.target.value)} 
            placeholder="Enter Your Name" 
            required 
        />
    </div>


    <div className="input-group">
    <textarea 
        id="description" 
        name="description" 
        value={description} 
        onChange={(e) => setdescription(e.target.value)} 
        placeholder="Enter Description" 
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
  
  export default NotesForm;


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