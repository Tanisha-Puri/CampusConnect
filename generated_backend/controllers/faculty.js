import nodemailer from "nodemailer";
import faculty from "../models/faculty.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Course from "../models/courses.js";
import PYQs from '../models/pyq.js' ; 
import Notes from '../models/notes.js';

const secret = "sun#shine@1";

export async function handleFacultySignup(req, res) {
    try {
        const { name, email, id, password, role, courses, position, mobile , image } = req.body;
        
        // Check if email or id already exists
        const existingUser = await faculty.findOne({ $or: [{ email }, { id }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or ID already in use" });
        }

        // Password strength validation
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create faculty user
        const user = new faculty({
            name, 
            email, 
            id, 
            password: password, 
            role, 
            mobile: mobile || "", 
            courses, 
            position  , 
            image 
        });

        await user.save();

        const userResponse = { 
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(201).json(userResponse); 
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: error.message || "Server error" });
    }
}

export async function getAllFaculty(req,res){
    try{
        const list = await faculty.find() ; 
        return res.status(200).json(list);
    }catch(e){
        console.log(e) ; 
        return res.status(500).json({message : "Server error "}) ; 
    }
};

export async function getCourses(req , res){
    try{
        const faculty =  req.params.slug ; 
    console.log(faculty) ; 
     const response = await Course.find({faculty: faculty }) ;
     return res.status(201).json(response);
    }catch(e){
        console.log(e) ;
        return res.status(500).json({message : "Server error"}) ; 
    }
}

export async function getNotes(req , res) {
    try{
        const name = req.params.name;
        const course = req.params.course;
        console.log(name , course) ; 
        const response = await Notes.find({submittedby : name , course : course});
        return res.status(201).json(response) ; 
    }catch(e){
        console.log(e) ;
        return res.status(500).json({message : "Server error"}) ; 
    }
}

export async function getPYQs(req , res) {
    try{
        const name = req.params.name;
        const course = req.params.course;
        console.log(name , course) ; 
        const response = await PYQs.find({submittedby : name , course : course});
        return res.status(201).json(response) ; 
    }catch(e){
        console.log(e) ;
        return res.status(500).json({message : "Server error"}) ; 
    }
}

