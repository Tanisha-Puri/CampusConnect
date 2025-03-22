import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [pyqs, setPYQs] = useState([]);
  const role = localStorage.getItem("userRole"); // Get role from localStorage

  useEffect(() => {
    // Fetch user profile details
    axios.get("http://localhost:8000/profile").then((res) => {
      setUser(res.data);
    });

    if (role === "Teacher") {
      // Fetch uploaded resources
      axios.get("http://localhost:8000/teacher/resources").then((res) => {
        setResources(res.data);
      });

      // Fetch uploaded PYQs
      axios.get("http://localhost:8000/teacher/pyqs").then((res) => {
        setPYQs(res.data);
      });
    }
  }, [role]);

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-main">
          <div className="profile-sidebar">
            <img
              className="profile-image-large"
              src={user?.image || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"}
              alt="User"
            />
            <div className="profile-name">
              <h2>{user?.name || "User Name"}</h2>
              <span>{role === "student" ? "Student" : "Teacher"}</span>
            </div>
            <div className="profile-rating">
              {role === "student" && <p>CGPA: {user?.cgpa || "N/A"}</p>}
            </div>

            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Phone: <a href={`tel:${user?.mobile}`}>{user?.mobile || "N/A"}</a></p>
              <p>Address: {user?.address || "N/A"}</p>
              <p>Email: <a href={`mailto:${user?.email}`}>{user?.email || "N/A"}</a></p>
            </div>
          </div>

          <div className="profile-details" style={{ height: "100vh" }}>
            <div className="cards-grid">
              {role === "student" ? (
                <>
                  <div className="card rectangle-card">
                    <h3>Subjects Opted</h3>
                    <ul>
                      {user?.subjects?.map((subject, index) => (
                        <li key={index}>{subject}</li>
                      )) || <p>No subjects found</p>}
                    </ul>
                  </div>

                  <div className="card square-card">
                    <h3>Doubts Asked</h3>
                    <ul>
                      {user?.doubtsAsked?.map((doubt, index) => (
                        <li key={index}>{doubt}</li>
                      )) || <p>No doubts asked</p>}
                    </ul>
                  </div>

                  <div className="card square-card">
                    <h3>Doubts Solved</h3>
                    <ul>
                      {user?.doubtsSolved?.map((doubt, index) => (
                        <li key={index}>{doubt}</li>
                      )) || <p>No doubts solved</p>}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="card rectangle-card">
                    <h3>Your Uploaded Resources</h3>
                    {resources.length > 0 ? (
                      <ul>
                        {resources.map((res, index) => (
                          <li key={index}>
                            <strong>{res.title}</strong> - <a href={res.url} target="_blank" rel="noopener noreferrer">View</a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No resources uploaded yet.</p>
                    )}
                  </div>

                  <div className="card rectangle-card">
                    <h3>Your Uploaded PYQs</h3>
                    {pyqs.length > 0 ? (
                      <ul>
                        {pyqs.map((pyq, index) => (
                          <li key={index}>
                            <strong>{pyq.title} ({pyq.year})</strong> - <a href={pyq.url} target="_blank" rel="noopener noreferrer">View</a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No PYQs uploaded yet.</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
