import express from "express";
import { handleResourceSubmision , getResources } from "../controllers/resource.js";
import slug from 'slugify' ; 
const router = express.Router();


router.post("/submit",handleResourceSubmision);
router.get("/:slug" , getResources) ; 


export default router;  