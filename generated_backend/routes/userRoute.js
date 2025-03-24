import express from "express";
import User from "../models/user.js";
import { handleUserLogin , handleUserLogout , handleUserSignUp  , handleSendOtp , handleVerifyOtp , fetchUser} from "../controllers/user.js";
import { authenticateuser } from "../middlewares/auth.js";
const router = express.Router();


router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogin);
router.post("/logout",authenticateuser,handleUserLogout);
router.post("/send-code", handleSendOtp)
router.post("/verify-code", handleVerifyOtp)
router.post("/get-user" , fetchUser);


export default router;  