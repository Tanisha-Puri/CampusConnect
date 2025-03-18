import StudyMaterial from '../models/studymaterial.js' ; 
import Course from '../models/courses.js';

export  async function handleResourceSubmision(req , res ) {
    try{ 
     const { title , type,mode , marks , time , year , url ,  course} = req.body ; 
        
     const checkCourse = await Course.findOne({title:course }) ;

     if(!checkCourse){
        return res.status(404).json({message:"Course not found"}) ;
     }
      
 
     const resource = await StudyMaterial.create({
        title , type,mode , marks , time , year , url ,  course
     }) ; 
 
     const userResponse = { 
         title : resource.title , 
         type : resource.type , 
         mode : resource.mode , 
         time :  resource.time , 
         year : resource.year ,
         url : resource.url , 
         course : resource.course ,
     };
 
     return res.status(201).json(userResponse);
 }
     catch (error) {
         console.log(error);
         return res.status(500).json({ message: "Server error" });
     }
 
     
 }; 

 export  async function getResources(req , res ) {
    try{ 
     const course =  req.params.slug ; 
    console.log(course) ; 
     const response = await StudyMaterial.find({course: course }) ;
     return res.status(201).json(response);
 }
     catch (error) {
         console.log(error);
         return res.status(500).json({ message: "Server error" });
     }
 
 }; 

