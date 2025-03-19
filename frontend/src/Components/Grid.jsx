import React, { useEffect, useState } from 'react';
import { useParams ,useLocation} from 'react-router-dom';  // Import useParams to get slug from the URL
import Card from './Card';
import './Gridresource.css';
import Navbar from './Navbar';
import NotesCard from './NotesCard';

const Grid = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [coursesData, setCoursesData] = useState([]); // Initialize state
  const [noDataFound, setNoDataFound] = useState(false);
  const location = useLocation();
  // Use the built-in URLSearchParams API:
  const searchParams = new URLSearchParams(location.search);
  const view = searchParams.get('view');
  
  

  // Fetch data when component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        console.log(view);
        console.log(slug);
        const response = await fetch(`http://localhost:8000/resource/${view}/${slug}`); // Use slug in the URL
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
      {view==='pyq' && <h1>PYQ</h1>}
      {view==='notes' && <h1>Notes</h1>}
      {noDataFound && <div className='notfound'> No data found </div>}
      {!noDataFound && view==='pyq' && <div className="scroll-container">
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
} {!noDataFound && view==='notes' && <div className="scroll-container">
        {coursesData.map((resource, index) => (
          <NotesCard 
            key={index}
            
            title={resource.title} 
            submittedby={resource.submittedby}
            description={resource.description}
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
