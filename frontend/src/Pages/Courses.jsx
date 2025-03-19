import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import './Courses.css';

function Courses() {
  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState([]); // ✅ Use state to store courses

  const handleOpen = (title) => {
    navigate(`/grid/${slugify(title)}`); // ✅ Navigate correctly
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:8000/course/getAll');
        const data = await response.json(); 
        setCoursesData(data); // ✅ Update state with fetched data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getData(); // ✅ Fetch data when component mounts
  }, []); // ✅ Empty dependency array ensures it runs only once

  return (
    <div>
      <h1>Courses</h1>
      <div className="courses-grid">
        {coursesData.map((course, index) => (
          <div className="course-item" key={index}>
            <h3>{course.title}</h3>
            <p>{course.branch}</p>
            <div className='btn-box'> 
            <button className="open-button" onClick={() => handleOpen(course.title)}>Notes</button>
            <button className="open-button" onClick={() => handleOpen(course.title)}>PYQs</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
