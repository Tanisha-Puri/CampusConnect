import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FacultySignup.css";

const FacultyForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher"); // Default role
  const [mobile, setMobile] = useState("");
  const [courses, setCourses] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState("Professor"); // Default position
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form is being submitted...");

      const response = await axios.post("http://localhost:8000/faculty/signup", {
        name,
        email,
        id,
        password,
        role,
        mobile,
        courses: courses.split(",").map((course) => course.trim()), // Convert comma-separated string to array
        position,
        image 
      });

      setModalMessage("Signup successful!");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || "An error occurred");
      setModalMessage(error.response?.data?.message || "An error occurred");
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 3000);
    }
  };

  return (
    <>
      <div className="faculty-form-container">
        <form onSubmit={handleSubmit} className="faculty-form">
          <h2>Faculty Signup</h2>

          <div className="input-group">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
          </div>

          <div className="input-group">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter Faculty ID" required />
          </div>

          <div className="input-group">
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image url" required />
          </div>

          <div className="input-group">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
          </div>

          <div className="input-group">
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="input-group">
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile Number" required />
          </div>

          <div className="input-group">
            <input type="text" value={courses} onChange={(e) => setCourses(e.target.value)} placeholder="Enter Courses (comma-separated)" required />
          </div>

          <div className="input-group">
            <select value={position} onChange={(e) => setPosition(e.target.value)} required>
              <option value="Professor">Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <div className="button-container">
              <button onClick={closeModal} className="close-button">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyForm;
