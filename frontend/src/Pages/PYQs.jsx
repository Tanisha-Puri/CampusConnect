import React from "react";

// import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";

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
            </div>
        </div>
    );
}

export default Resources;
