import React, { useState , useEffect } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';  // Make sure CSS is imported

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    // const role = ;   

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

     const [role, setRole] = useState(null);
      useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        setRole(storedRole);
      }, []);

    const handleLogout = () => {
        console.log("Logout button is clicked")
        confirmAlert({
          title: "Confirm Logout",
          message: "Are you sure you want to log out?",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                window.location.href = '/login';
              }
            },
            {
              label: "No",
              onClick: () => {}
            }
          ],
          closeOnEscape: true,
          closeOnClickOutside: true,
        });
      };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>CampusConnect</h1> 
            </div>
          
            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <Link to="/" className="nav-item">Home</Link>

                {role === "student" ? (
                <> <Link to="/course" className="nav-item">Courses</Link>
                <Link to="/faculty" className="nav-item">Faculty</Link>
                <Link to="/profile" className="nav-item">Profile</Link>
                </>
               ):

                (
                <><Link to="/notes-form" className="nav-item">Add Resouces</Link>
                <Link to="/pyq-form" className="nav-item">Add PYQs</Link>
                <Link to="/profile" className="nav-item">Profile</Link>
              </>)

                }
                
                {/* <Link to="/admin" className="nav-item">Faculty Profile<?/Link> */}
                <button className="nav-item"  onClick={handleLogout} >Logout </button> 
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
}

export default Navbar;
