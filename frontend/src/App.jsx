// import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
// import Doubts from './Pages/Doubts';
import Resources from './Pages/Resouces';
import Profile from './Pages/Profile';
import PYQs from './Pages/PYQs';
// import Fillform from './Pages/FIllform';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Admin from './Pages/Admin';
import Grid from './Components/Grid'
import FacultyResource from './Pages/FacultyResource';
import TA from './Pages/TA';
import Signup from './Pages/Signup';
import Forget from './Pages/Resetpassword';
import CouseForm from './Pages/Courseform';
import ResourceForm from './Pages/Resourceform';
import slug from 'slugify' ; 
import FacultyForm from './Pages/FacultySignup';

console.log('App component rendered');
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<YourComponent />} /> */}
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/doubts" element={<Doubts />} /> */}
        <Route path="/course" element={<PYQs />} />
        <Route path="/faculty" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/upload" element={<Fillform />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/grid/:slug" element={<Grid />} />
       

        <Route path="/faculty/:slug" element={<FacultyResource />} />
        <Route path="/TA" element={<TA />} />
        <Route path="/reset-password" element={<Forget />} />
        <Route path="/register-course" element={<CouseForm />} />
        <Route path="/resource-form" element={<ResourceForm />} />
        <Route path="/faculty-form" element={<FacultyForm />} />
        
       
       
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
console.log('App component rendered');