import validator from 'validator';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.APP_ENV === 'production',
    sameSite: process.env.APP_ENV === 'production' ? 'None' : 'strict',
};
// User Register
export const UserRegister  = async (req, res) => {
try{
         const  {name ,email ,password} = req.body;
         // checking if the user already exists
         const exists = await User.findOne({email}).exec();
         if(exists){
            return res.json({success : false , message : "User already exists"});
         }
         if(!validator.isEmail(email)){
            return res.json({success : false , message : "Please  enter a valid email"});
         }if(password.length < 8){
            return res.json({success : false , message : "Please enter a strong password"});
         }
         //Hash user password 
         const hashedPassword = await bcrypt.hash(password , 10);
         // Create user
         const newUser = await new User({name ,email ,password : hashedPassword});
         const user = await newUser.save();
         // Generate token
         const token = jwt.sign({userId : newUser._id} , process.env.JWT_SECRET , {expiresIn : '7d'});

         res.cookie('token', token, {
            ...cookieOptions,
            maxAge : 7 * 24 * 60 * 60 * 1000, // 7 days
         });
         return res.json({
            success: true,
            user: { email: user.email, name: user.name },
         });
        }catch (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message })
        }
}


// USER LOGIN ROUTE
export const userLogin = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if(!user){
         return res.json({success : false , message : "User not found"});

      }
      const isMatch = await bcrypt.compare(password , user.password);
      if(!isMatch){
         return res.json({success : false , message : "Invalid credentials"});
      }  
      const token = jwt.sign({userId : user._id} , process.env.JWT_SECRET , {expiresIn : '7d'});
      res.cookie('token', token, {
         ...cookieOptions,
         maxAge : 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      return res.json({
         success: true,
         user: { email: user.email, name: user.name },
      });

   } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message })
   }
}

//Check Auth
export const isAuth = async (req, res) => {
   try {
         const userId = req.userId;
         const user = await User.findById(userId).select('-password');

         if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
         }

         return res.json({ success: true, user });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
   }
}
// LOGOUT USER 
export const logout = async (req, res) => {
  try{
res.clearCookie('token', cookieOptions);
return res.json({ success: true, message: 'Logged out successfully' });

  }catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message })
  }
}




