import React from 'react';
import './Home.css'; 
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
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
          <Link to="/course" className="cta-button">Explore Courses</Link>
          <Link to="/faculty" className="cta-button">Browse Faculty Profiles</Link>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Home;
