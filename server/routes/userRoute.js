import express from 'express';
import { UserRegister, userLogin, logout , isAuth} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';


const userRouter = express.Router();

userRouter.post('/register', UserRegister);
userRouter.post('/login', userLogin);
userRouter.post('/logout', logout);
userRouter.get('/is-auth', authUser, isAuth);

export default userRouter