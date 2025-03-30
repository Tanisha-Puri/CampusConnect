import mongoose from "mongoose";
const facultySchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, unique: true, required: true },
  id: { type: String, unique: true, required: true }, 
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["student", "teacher", "admin"], default: "student" }, 
  mobile: { type: String, default: "" },  
  otp: { type: String, default: () => Math.floor(100000 + Math.random() * 900000).toString() }, 
  courses: { type: Array }, 
  position: { type: String, default: "assistant", required: true }  , 
  image : {type:String , requires : true} , 
  bookings : {type : Array},
});

  
const faculty = mongoose.model("faculty",facultySchema);

export default faculty;