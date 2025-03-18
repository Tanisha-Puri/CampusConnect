import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get slug from the URL
import Card from './Card';
import './Gridresource.css';
import Navbar from './Navbar';

const Grid = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [coursesData, setCoursesData] = useState([]); // Initialize state
  const [noDataFound, setNoDataFound] = useState(false);
  // Fetch data when component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/resource/${slug}`); // Use slug in the URL
        const data = await response.json(); 
        if (Array.isArray(data) && data.length === 0) {
          console.log("No data found");
          setNoDataFound(true);
        } else {
          setNoDataFound(false);
        }
        setCoursesData(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getData(); // Fetch data when component mounts
  }, [slug]); // Dependency array should include `slug`

  return (
    <div className="gallery-container">
      <Navbar />
      <h1>Courses</h1>
      {noDataFound && <div className='notfound'> No data found </div>}
      {!noDataFound && <div className="scroll-container">
        {coursesData.map((resource, index) => (
          <Card 
            key={index}
            year={resource.year }
            mode={resource.mode}
            title={resource.title} 
            type={resource.type} 
            marks={resource.marks} 
            time={resource.time}
            url={resource.url} 
            course={resource.course}
          />
        ))}
      </div>
}
    </div>
  );
};

export default Grid;

// export default Grid;
