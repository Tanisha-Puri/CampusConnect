import nodemailer from "nodemailer";
import User from "../models/user.js";  
import bcrypt from "bcryptjs";
// import RecentActivity from "../Models/RecentActivity.js";
import jwt from "jsonwebtoken";
const secret = "sun#shine@1";
import crypto from "crypto";

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export async function handleUserSignUp(req, res) {
    try {
        const { name, email, password, rollno , role} = req.body;
        const mobile = email ; 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const user = await User.create({
            name , 
            email , 
            rollno , 
            password , 
            role  , 
            mobile ,
        });

        const userResponse = { 
            name: user.name,
            email: user.email,
            rollno : user.rollno ,
            role: user.role,
            mobile : user.mobile ,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return res.status(201).json(userResponse); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}


// / Store this in an environment variable
export async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare passwords (INSECURE: Plain text comparison)
        if (password !== user.password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const data = {
            user: {
                id: user._id,  
                enrollmentId: user.enrollmentId
            }
        };
        const authToken = jwt.sign(data, secret, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie("token", authToken, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === "production",  
            sameSite: "Strict",
        });

        // Send response
        return res.json({ authToken, id: user._id, role: user.role });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function handleUserLogout(req,res) {
  try{
    await res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
}

// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const handleSendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 600000); // 10 minutes validity

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: 'User Not Found' });
    }

    // Update user with OTP and expiration
    foundUser.otp = otp;
    foundUser.expiredAt = expiresAt;

    await foundUser.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ggbackup8520@gmail.com",
        pass: "swpj cbea mdni rbdv",
      },
    });

    const mailOptions = {
      from: "ggbackup8520@gmail.com",
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP for password reset is ${otp}. This OTP is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
  }
};
  
  // Verify OTP
  export const handleVerifyOtp = async (req, res) => {
    const { email, verifyOtp, newPassword } = req.body;
    if (!email || !verifyOtp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      console.log(user)
  
      if (!user || !user.otp) {
        return res.status(400).json({ message: 'Invalid Email or OTP expired' });
      }
  
      const { otp, expiresAt } = user;
      console.log()
      if (Date.now() > expiresAt) {
        
        user.otp = null; 
        await user.save();
        return res.status(400).json({ message: 'OTP has expired' });
      }
  
      if (verifyOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }

      // const salt = await bcrypt.genSalt(10);
      // const secPass = await bcrypt.hash(newPassword,salt);
  
      // OTP is valid, proceed with password reset
      user.otp = null; // Clear OTP after verification
      user.expiredAt=null;
      user.password=newPassword;
      await user.save();
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ message: 'Failed to verify OTP. Please try again later.' });
    }
  };
