import React from 'react';
import './Profile.css';
import Navbar from '../Components/Navbar';

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-main">
          
          <div className="profile-sidebar">
            <img
              className="profile-image-large"
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
              alt="User"
            />
            <div className="profile-name">
              <h2>Rahul Kumar</h2>
              <span>Information Technology Student</span>
            </div>
            <div className="profile-rating">
              <p>CGPA: 8.62</p>
            </div>

           
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>
                Phone: <a href="tel:+912536144758"> +912536144758</a>
              </p>
              <p>Address: House No.23, Rose Colony , New Delhi</p>
              <p>
                Email: <a href="mailto:rkumar@gmail.com">rkumar@gmail.com</a>
              </p>
            </div>
          </div>

         
          
          <div className="profile-details" style={{ height: '100vh' }}>
            
            <div className="cards-grid">
              
              <div className="card rectangle-card">
                <h3>Subjects Opted</h3>
                <ul>
                  <li>Data Structures</li>
                  <li>Algorithms</li>
                  <li>Operating Systems</li>
                  <li>Database Management Systems</li>
                  <li>Machine Learning</li>
                </ul>
              </div>

             
              <div className="card square-card">
                <h3>Doubts Asked</h3>
                <ul>
                  <li>How to optimize a binary search algorithm?</li>
                  <li>Difference between REST and GraphQL?</li>
                  <li>Explain Normalization in DBMS?</li>
                  <li>What is React Hook useEffect?</li>
                </ul>
              </div>

              
              <div className="card square-card">
                <h3>Doubts Solved</h3>
                <ul>
                  <li>Understanding Big-O Notation</li>
                  <li>Implementing a Queue in Python</li>
                  <li>Difference between HTTP and HTTPS</li>
                  <li>Using Context API in React</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
