import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import './Courses.css';

function Courses() {
  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenNotes = (title) => {
    navigate(`/grid/${slugify(title)}?view=notes&faculty=all`);
  };
  
  const handleOpenPYQ = (title) => {
    navigate(`/grid/${slugify(title)}?view=pyq&faculty=all`);
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

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div>
      <h1>Courses</h1>
      
      <input
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div className="course-item" key={index}>
              <h3>{course.title}</h3>
              <p>{course.branch}</p>
              <div className='btn-box'> 
                <button className="open-button" onClick={() => handleOpenNotes(course.title)}>Notes</button>
                <button className="open-button" onClick={() => handleOpenPYQ(course.title)}>PYQs</button>
                </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
}


export default Courses;
