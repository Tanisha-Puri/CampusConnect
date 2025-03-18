import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gridresource.css';
import ResourceCard from './ResouceCard';
import faculty from '../../../generated_backend/models/faculty';

const Gridresource = () => {
  const navigate = useNavigate();
  const [facultyData, setfacultydata] = useState([]); // ✅ Use state to store courses

  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:8000/faculty/getAll');
        const data = await response.json(); 
        setfacultydata(data); // ✅ Update state with fetched data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getData(); // ✅ Fetch data when component mounts
  }, []);

  return (
    <div className="gallery-container">
      <h1>Faculty</h1> 
      <div className="scroll-container">
       
        {facultyData.map((faculty, index) => (
            <ResourceCard 
            key = {index}
          name= {faculty.name}
          image= {faculty.image}
          description={faculty.position}
        />
          
        ))}
      </div>
    </div>
  );
};

export default Gridresource;
