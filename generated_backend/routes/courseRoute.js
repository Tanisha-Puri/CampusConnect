import express from "express";

import { handleCourseRegister  , getAllCourses} from "../controllers/course.js";
const router = express.Router();


router.post("/register",handleCourseRegister);
router.get("/getAll" , getAllCourses) ; 


export default router;  