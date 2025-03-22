import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    rollno: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["student", "Teacher", "Admin"], default: "student" },
    mobile: { type: String, default: null }, // 🔹 Default value changed to null
    otp: { type: String, default: "ooo" },
}, { timestamps: true }); // 🔹 Adds createdAt & updatedAt timestamps

const User = mongoose.model("user", userSchema);
export default User;
