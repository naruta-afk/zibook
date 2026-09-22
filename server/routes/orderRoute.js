import express from 'express';
import authAdmin from '../middlewares/authAdmin.js';
import authUser from '../middlewares/authUser.js';
import {
    allOrder,
    createStripeCheckoutSession,
    placeOrderCOD,
    updateOrderStatus,
    userOrder,
    verifyStripePayment,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Admin
orderRouter.post('/list', authAdmin, allOrder);
orderRouter.post('/status', authAdmin, updateOrderStatus);

// Payment (needs a logged-in user so req.userId is set)
orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/stripe/create-checkout-session', authUser, createStripeCheckoutSession);
orderRouter.post('/stripe/verify', authUser, verifyStripePayment);

// User
orderRouter.post('/userorders', authUser, userOrder);

export default orderRouter
