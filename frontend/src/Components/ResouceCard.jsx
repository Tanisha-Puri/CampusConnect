import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResourceCard.css'; 
import slug from 'slugify' ; 

const ResourceCard = ({ name, image, description }) => {
  const navigate = useNavigate();

  const handleViewCourses = () => {
    navigate(`/faculty/${name}`);
  };

  const handleViewTAs = () => {
    navigate('/TA'); // You can change this to the correct route for TAs
  };

  return (
    <div className="resource-card">
      <img src={image} alt={name} className="faculty-image" />
      <h3 className="faculty-name">{name}</h3>
      <p className="faculty-description">{description}</p>
      <div className="button-group">
        <button className="faculty-button" onClick={handleViewCourses}>View Courses</button>
        <button className="faculty-button secondary" onClick={handleViewTAs}>View TAs</button>
      </div>
    </div>
  );
};

export default ResourceCard;
