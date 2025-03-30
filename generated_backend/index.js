import express from "express";
import { connectMongoDB } from "./connection.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import courseRoute from "./routes/courseRoute.js";
import userRoute from "./routes/userRoute.js" ;
import resourceRoute from "./routes/resourceRoute.js";
import facultyRoute from './routes/facultyRoute.js' ; 
import roomRoute from './routes/room.js';
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:true,
    credentials:true
})) ; 

connectMongoDB("mongodb+srv://User:User@cluster0.qlqwq2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("MongoDB connected"));

app.use(cookieParser());

app.use("/user",userRoute);
app.use("/course",courseRoute);
app.use("/resource",resourceRoute);
app.use("/faculty",facultyRoute);
app.use("/room", roomRoute);


app.listen(PORT,()=>{
    console.log("Running on port 8000");
})


