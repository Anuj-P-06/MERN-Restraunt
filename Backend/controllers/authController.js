import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
dotenv.config()

// When user logs in a unique token is generated based on which user is authenticated
// 1d -> 1 day

// Generate jwt
// payload -> will have user_id
const generateToken = (res,payload) => {
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'})
    res.cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:"lax",
        path: "/",
        maxAge:24*60*60*1000
  });
  return token;
}

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return res.json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Internal server error", success: false });
  }
};

// For user login
export const loginUser = async(req,res)=>{
    try{
        const { email,password } = req.body;
        if ( !email || !password ){
            return res.json({message:"Please fill all the fields", success:false})
    }
        const user = await User.findOne({email});
        if (!user){
            return res.json({message:"User does not exists",success:false})
    }
        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch){
            return res.json({message:'Invalid credentials', success:false})
    }

        // _id not .id because mongodb user _id not .id

        generateToken(res,{id:user._id,role:user.isAdmin? 'admin':'user'})
    res.json({
            message:"User logged in successfully",
            success:true,
            user:{
                name : user.name,
                email: user.email
            }
        })
    }
    catch (error){
    console.log(error.message);
        return res.json({message:'Internal server error', success:false})
  }
}

// For admin login/logout and it will have different token and it will only require email since it doesn;t have id
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Please fill all fields", success: false });
    }
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ✅ NOT "none" or "strict"
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Admin logged in successfully",
      admin: {
        admin: adminEmail,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Internal server error", success: false });
  }
};


export const logoutUser = async(req,res) => {
    try{
        res.clearCookie("token")
        return res.json({messge:"User logged out successfully", success:true})
    }
    catch (error){
    console.log(error.message);
        return res.json({message:'Internal server error',success:false})
  }
}

/* findById is a mongoose method
 .select(-password) means get everything besides password
*/
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.json(user);
  } catch (error) {
    return res.json({ message: "Internal server error", success: false });
  }
};

export const isAuth = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    return res.json({ message: "Internal server error", success: false });
  }
};

