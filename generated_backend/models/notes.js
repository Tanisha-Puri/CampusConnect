import mongoose  from "mongoose";

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    course: { type: String , required : true },
    submittedby : {type : String , required : true } , 
    url : {type : String , required : true },
  });

  const NotesSchema = mongoose.model("notes",notesSchema);
  
  export default NotesSchema;
  