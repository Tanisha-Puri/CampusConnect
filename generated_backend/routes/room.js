import express from "express";
import { Bookroom } from "../controllers/room.js";
const router = express.Router();

router.post("/submit",Bookroom);

export default router ; 