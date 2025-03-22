import React, { useState, useEffect } from 'react';
import './Home.css'; 
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  const [role, setRole] = useState(null);
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);
  return (
    <div>
        <Navbar></Navbar>
    <div className="homepage">
    
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Unlock Your Academic Potential with Past Year Questions & Resources!</h1>
          <p>Access a wide range of past year questions and study resources tailored for college students.</p>
          <div className="hero-buttons">
          {role === "student" ? (
                <>
                  <Link to="/course" className="cta-button">Explore Courses</Link>
                  <Link to="/faculty" className="cta-button">Browse Faculty Profiles</Link>
                </>
              ) : role === "Teacher" ? (
                <>
                  <Link to="/notes-form" className="cta-button">Add Resources</Link>
                  <Link to="/pyq-form" className="cta-button">Add PYQs</Link>
                </>
              ) : (
                <p>Loading...</p>
              )}
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Home;
