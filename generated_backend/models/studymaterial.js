import mongoose  from "mongoose";

const StudyMaterialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ["Mid-Sem", "End-Sem", "Assignment", "Quiz"], required: true },
    mode : {type : String  , enum : ["Online" , "Offline"] , required : true  , default : "Offline"},
    marks : {type : Number , required : true },
    time : {type : Number } ,
    year : {type : Number , required : true}  , 
    url: { type: String, required: true }, 
    course: { type: String , required : true }
  });

  const StudyMaterial = mongoose.model("studymaterial",StudyMaterialSchema);
  
  export default StudyMaterial;
  