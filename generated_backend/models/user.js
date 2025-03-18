import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type : String , required : true} , 
    email: { type: String, unique: true, required: true },
    rollno  : {type : String , unique : true , required : true} , 
    password: { type: String, required: true },
    role : {type : String , required : true , enum : ["student" , "teacher" , "admin"] , default : "Student"}   , 
    mobile : {type :String , default : 1 }  , 
    otp :{type : String , default : "ooo" } , 
  });
  
const User = mongoose.model("user",userSchema);

export default User;