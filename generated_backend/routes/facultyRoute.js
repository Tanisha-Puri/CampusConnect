import express from "express";
import { handleFacultySignup , getAllFaculty,getCourses } from "../controllers/faculty.js";
import slug from 'slugify' ; 
const router = express.Router();

router.post("/signup", handleFacultySignup);
router.get("/getAll", getAllFaculty);
router.get("/:slug" , getCourses) ; 

export default router;  