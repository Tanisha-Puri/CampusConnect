import React from "react";

// import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import  './PYQs.css';
// import Grid from "../Components/Grid";
// import Gridresource from "../Components/Gridresource";

import Courses from "./Courses"

function Resources() {
    
    return (
        <div>
            <Navbar></Navbar>
            <div className="pyq-content">
                <Courses></Courses>
                {/* <Filter /> */}
              {/* <Grid></Grid> */}

              {/* <button className="btn">PYQs</button>
              <button className="btn">Study Material</button> */}
            </div>
        </div>
    );
}

export default Resources;
