import React from 'react';
import './NotesCard.css';
import { Link } from 'react-router-dom';


const NotesCard = ({ title, submittedby ,  url, course , description  }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-details">
          <p><strong>Description:</strong> {description}</p>
          {/* <p><strong>Category:</strong> {category}</p> */}
          <p><strong>Course:</strong> {course}</p>
          {/* <p><strong>Mode:</strong> {mode}</p> */}
          {/* <p><strong>Marks:</strong> {marks}</p> */}
          <p><strong>Submitted By:</strong> {submittedby}</p>
        </div>
        {/* Corrected Link */}
        <Link to={`${url}`} className="card-link">View Details</Link>
      </div>
    </div>
  );
};



export default NotesCard;
