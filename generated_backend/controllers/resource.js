import PyqSchema from '../models/pyq.js' ; 
import Course from '../models/courses.js';
import NotesSchema from '../models/notes.js';

export  async function handlePYQSubmision(req , res ) {
    try{ 
     const { title , type,mode , marks , time , year , url ,  course , submittedby} = req.body ; 
        
     const checkCourse = await Course.findOne({title:course }) ;

     if(!checkCourse){
        return res.status(404).json({message:"Course not found"}) ;
     }
      
 
     const resource = await PyqSchema.create({
        title , type,mode , marks , time , year , url ,  course,submittedby
        
     }) ; 
 
     const userResponse = { 
         title : resource.title , 
         type : resource.type , 
         mode : resource.mode , 
         time :  resource.time , 
         year : resource.year ,
         url : resource.url , 
         course : resource.course ,
         submittedby: resource.submittedby
     };
 
     return res.status(201).json(userResponse);
 }
     catch (error) {
         console.log(error);
         return res.status(500).json({ message: "Server error" });
     }
 
     
 }; 

 export  async function handleNotesSubmision(req , res ) {
    try{ 
     const { title , description ,course, submittedby , url} = req.body ; 
        
     const checkCourse = await Course.findOne({title:course }) ;

     if(!checkCourse){
        return res.status(404).json({message:"Course not found"}) ;
     }
      
 
     const resource = await NotesSchema.create({
        title , description ,course, submittedby , url
        
     }) ; 
 
     const userResponse = { 
         title : resource.title , 
         description : resource.description , 
         url : resource.url , 
         course : resource.course ,
         submittedby : resource.submittedby,
     };
 
     return res.status(201).json(userResponse);
 }
     catch (error) {
         console.log(error);
         return res.status(500).json({ message: "Server error" });
     }
 
     
 }; 

 export  async function getPYQs(req , res ) {
    try{ 
     const course =  req.params.slug ; 
    console.log(course) ; 
    const response = await PyqSchema.find({ course }).populate('submittedby', 'name');
     return res.status(201).json(response);
 }
     catch (error) {
         console.log(error);
         return res.status(500).json({ message: "Server error" });
     }
 
 }; 

 export  async function getNotes(req , res ) {
    try{ 
     const course =  req.params.slug ; 
    console.log(course) ; 
    const response = await NotesSchema.find({ course }).populate('submittedby', 'name');
     return res.status(201).json(response);
 }
     catch (error) {
         console.log(error);
         return res.status(500).json({ message: "Server error" });
     }
 
 }; 



//  router.post("/notes/submit",handleNotesSubmision);
// router.post("/pyq/submit",handlePYQSubmision);
// router.get("/notes/:slug" , getNotes) ; 
// router.get("/pyq/:slug" , getPYQs) ; 