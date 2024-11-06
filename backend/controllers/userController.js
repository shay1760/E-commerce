import userModel from "../models/userModel.js"
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const userLogin=async(req, res)=>{

    try {
        const {email, password}=req.body;

        const user=await userModel.findOne({email});

        if(!user)
        {
            return res.json({success:false, message:"User doesn't exists"})
        }

        const isMatch=await bcrypt.compare(password, user.password);

        if(isMatch)
        {
            const token=createToken(user._id)
            return res.json({success:true, token})
        }
        else{
            return res.json({success:false, message:"Inavlid credentials"})
        }

    } catch (error) {
        
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please provide a valid email" });
        }

        // Validate phone number length
        if (!phone || phone.length < 10) {
            return res.status(400).json({ success: false, message: "Please provide a valid phone number" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must contain at least 8 characters" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance without storing confirmPassword
        const newUser = new userModel({
            name,
            email,
            phone,
            password: hashedPassword
        });

        // Save user to the database
        const user = await newUser.save();

        // Create a token for the new user
        const token = createToken(user._id);

        // Respond with success and the token
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
    }
};


const adminLogin=async(req, res)=>{
    try {
        const {email, password}=req.body

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
        {
            const token=jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token})
        }
        else{
            res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {userLogin, registerUser, adminLogin}