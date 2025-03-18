import React from "react";

// import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";

// import Grid from "../Components/Grid";
import Gridresource from "../Components/Gridresource";

function Resources() {
    
    return (
        <div>
            <Navbar></Navbar>
            <div className="pyq-content">
                {/* <Filter /> */}
              <Gridresource></Gridresource>
            </div>
        </div>
    );
}

export default Resources;
