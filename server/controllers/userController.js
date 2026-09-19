import validator from 'validator';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
         const token = jwt.sign({userId : newUser._id} , process.env.JWT_SECRET , {expiresIn : '1h'});

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



