import express from 'express';
import { UserRegister } from '../controllers/userController.js';


const userRouter = express.Router();


userRouter.post('/register', UserRegister);

export default userRouter