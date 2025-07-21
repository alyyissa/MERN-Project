import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// Generate JWT Token

const generateToken = (userId)=>{
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// Register User
export const registerUser = async(requestAnimationFrame, res)=>{
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password || password.length < 8){
            return res.json({success: false, message: 'Fill all the fields'})
        }

        // if user already exist
        const userExists = await User.findOne({email});
        if(userExists){return res.json({success: false, message: 'User already exists'})}

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email ,hashedPassword})
        const token = generateToken(user._id.toString())

        // Send the token to the frontEnd
        res.json({success:true, token});

    }catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// User login