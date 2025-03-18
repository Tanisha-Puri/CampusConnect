import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type : String , default: ""},
    branch: {type : String, required : true , default:"IT" } , 
    studyMaterials: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudyMaterial" }],
    faculty: [{ type: String }]
  });

  const Course = mongoose.model("course",CourseSchema);
  
  export default Course;