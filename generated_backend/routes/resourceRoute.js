import express from "express";
import { handleNotesSubmision , handlePYQSubmision , getNotes , getPYQs } from "../controllers/resource.js";
import slug from 'slugify' ; 
const router = express.Router();


router.post("/notes/submit",handleNotesSubmision);
router.post("/pyq/submit",handlePYQSubmision);
router.get("/all/notes/:slug" , getNotes) ; 
router.get("/all/pyq/:slug" , getPYQs) ; 


export default router;  