import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';


const Card = ({ mode, year, title, type, marks, time, url, course }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-details">
          <p><strong>Year:</strong> {year}</p>
          {/* <p><strong>Category:</strong> {category}</p> */}
          <p><strong>Type:</strong> {type}</p>
          <p><strong>Mode:</strong> {mode}</p>
          <p><strong>Marks:</strong> {marks}</p>
          <p><strong>Time:</strong> {time}</p>
        </div>
        {/* Corrected Link */}
        <Link to={`${url}`} className="card-link">View Details</Link>
      </div>
    </div>
  );
};



export default Card;
