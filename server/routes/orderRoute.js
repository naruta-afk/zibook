import express from 'express';
import authAdmin from '../middlewares/authAdmin.js';
import { allOrder, placeOrderCOD, updateOrderStatus, userOrder } from '../controllers/orderController.js';
import authUser from '../middlewares/authUser.js';



const orderRouter = express.Router();

orderRouter.post('/list',authAdmin,allOrder);
oderRouter.post('/status',authAdmin,updateOrderStatus);

//for payment
orderRouter.post('/cod',placeOrderCOD);

//for User
orderRouter.post('/userorders',authUser,userOrder);

export default orderRouter