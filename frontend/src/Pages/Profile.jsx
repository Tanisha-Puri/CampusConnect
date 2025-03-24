import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [pyqs, setPYQs] = useState([]);
  const role = localStorage.getItem("userRole"); // Get role from localStorage

  // Fetch user profile details
  useEffect(() => {
    
    axios
      .post("http://localhost:8000/user/get-user", { id: localStorage.user })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Fetch notes and PYQs once the user data is loaded and if the role is Teacher
  // useEffect() => {
    useEffect(() => {
      if (role === "Teacher" && user?.name) {
        console.log("Teacher:", user.name);
        
        // Send POST request to fetch notes/resources
        axios.post("http://localhost:8000/faculty/notes", {
          name: user.name,
          course: "all" // modify this as needed
        })
        .then((res) => {
          console.log("Fetched resources:", res.data);
          setResources(res.data);
        })
        .catch(error => console.error("Error fetching resources:", error));
    
        // Send POST request to fetch PYQs
        axios.post("http://localhost:8000/faculty/pyq", {
          name: user.name,
          course: "all" // modify this as needed
        })
        .then((res) => {
          console.log("Fetched PYQs:", res.data);
          setPYQs(res.data);
        })
        .catch(error => console.error("Error fetching PYQs:", error));
      }
    }, [role, user]);
    

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
                        {resources.map((res, index) => {
                          const url = res.url.startsWith('http') ? res.url : `http://${res.url}`;
                          return (
                            <li key={index}>
                              <strong>{res.title}</strong> -{' '}
                              <a href={url} target="_blank" rel="noopener noreferrer">
                                View
                              </a>
                            </li>
                          );
                        })}
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
