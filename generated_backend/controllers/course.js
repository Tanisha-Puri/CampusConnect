import Course from '../models/courses.js' ; 

export  async function handleCourseRegister(req , res ) {
   try{ 
    const { title , branch  , description} = req.body ; 

    const existingCourse = await Course.findOne({title}) ;
    if(existingCourse){
        return res.status(400).json({message : "Already an existing course"}) ; 
    } 

    const course = await Course.create({
        title , 
        branch , 
        description   ,
    }) ; 

    const userResponse = { 
        title : course.title , 
        branch : course.branch , 
        description : course.description , 
        createdAt: course.createdAt,
        updatedAt: course.updatedAt
    };

    return res.status(201).json(userResponse);
}
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }

    
}; 

export async function getAllCourses(req,res){
    try{
        const list = await Course.find() ; 
        return res.status(200).json(list);
    }catch(e){
        console.log(e) ; 
        return res.status(500).json({message : "Server error "}) ; 
    }
};