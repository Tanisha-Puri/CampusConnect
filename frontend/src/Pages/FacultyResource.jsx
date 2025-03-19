import React from "react";
import { useState ,useEffect} from "react";
import { useNavigate  , useParams} from 'react-router-dom';
import Navbar from "../Components/Navbar";
import slugify from 'slugify' ; 

// import Grid from "../Components/Grid";
// import Gridresource from "../Components/Gridresource";

  
  function FacultyResource() {
    const navigate = useNavigate();
    const { slug } = useParams();
     
      const handleOpenNotes = (title) => {
          navigate(`/grid/${slugify(title)}?view=notes&faculty=${slug}`);
        };
        
        const handleOpenPYQ = (title) => {
          navigate(`/grid/${slugify(title)}?view=pyq&faculty=${slug}`);
        };
    

    const [coursesData, setCoursesData] = useState([]); // Initialize state
    const [noDataFound, setNoDataFound] = useState(false);

    useEffect(() => {
       const getData = async () => {
         try {
           const response = await fetch(`http://localhost:8000/faculty/${slug}`); // Use slug in the URL
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
     }, [slug]);
  
    return (
      <div>
        <Navbar />
        <h1>Faculty Courses</h1>
        <div className="courses-grid">
        {noDataFound && <div className='notfound'> No data found </div>}
          {!noDataFound && coursesData.map((course, index) => (
            <div className="course-item" key={index}>
            <h3>{course.title}</h3>
            <p>{course.branch}</p>
            <div className="btn-box">
            <button className="open-button" onClick={() => handleOpenNotes(course.title)}>Notes</button>
            <button className="open-button" onClick={() => handleOpenPYQ(course.title)}>PYQs</button>
            </div>
          </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default FacultyResource;

  // [
  //   {
  //     "_id": "67a86260d22cf24b60d3b743",
  //     "title": "Object Orineted Programming",
  //     "description": "",
  //     "branch": "IT",
  //     "studyMaterials": [],
  //     "__v": 0,
  //     "faculty": [
  //       "Anjali Gautam"
  //     ]
  //   }
  // ]
  