import express from "express";
import { handleFacultySignup , getAllFaculty,getCourses ,getPYQs ,getNotes} from "../controllers/faculty.js";
import slug from 'slugify' ; 
const router = express.Router();

router.post("/signup", handleFacultySignup);
router.get("/getAll", getAllFaculty);
router.get("/:slug" , getCourses) ; 
router.get("/:name/pyq/:course" , getPYQs) ; 
router.get("/:name/notes/:course" , getNotes) ; 


export default router;  