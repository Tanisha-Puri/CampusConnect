import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    // bookmarked : {type : Boolean , default : false;}
    description: { type: String },
    course: { type: String, required: true }, // 🔹 Now references User model
    url: { type: String, required: true },
    submittedby: {type : String , required : true}
}, { timestamps: true });

const NotesSchema = mongoose.model("notes", notesSchema);
export default NotesSchema;
