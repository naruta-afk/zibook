import Stripe from 'stripe';
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";
import User from "../models/User.js";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

//Global Variable
const currency = "pkr";
const deleveryCharge = 10;
const textPrecentage = 0.02;

const buildOrderDetails = async (userId, items, addressId) => {
    if(!Array.isArray(items) || items.length === 0){
        throw new Error("No items in the cart");
    }
    if(!addressId){
        throw new Error("Please choose a delivery address");
    }

    const savedAddress = await Address.findOne({_id : addressId, userId});
    if(!savedAddress){
        throw new Error("Address not found");
    }

    let subtotal = 0;
    const orderItems = [];
    const lineItems = [];

    for(const item of items){
        const quantity = Number(item.quantity);
        if(!Number.isInteger(quantity) || quantity < 1){
            throw new Error("Invalid quantity");
        }

        const product = await Product.findById(item.product);
        if(!product){
            throw new Error("A product in your cart no longer exists");
        }
        if(!product.inStock){
            throw new Error(`${product.name} is out of stock`);
        }

        const unitPrice = product.offerPrice ?? product.price;
        subtotal += unitPrice * quantity;
        orderItems.push({ product: String(product._id), quantity });
        lineItems.push({
            price_data: {
                currency,
                product_data: {
                    name: product.name,
                    images: product.image ? [product.image[0] || product.image].filter(Boolean) : [],
                },
                unit_amount: Math.round(unitPrice * 100),
            },
            quantity,
        });
    }

    const taxamount = subtotal * textPrecentage;
    const totalAmount = Math.round((subtotal + taxamount + deleveryCharge) * 100) / 100;

    return { savedAddress, subtotal, orderItems, lineItems, totalAmount };
};

//PLACE ORDER USING COD
// body: { items: [{ product: "<productId>", quantity: 2 }], address: "<addressId>" }
// Prices are always read from the database, never trusted from the client.
export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body
        const userId = req.userId

        const { savedAddress, orderItems, totalAmount } = await buildOrderDetails(userId, items, address);

        const order = await Order.create({
            userId,
            items: orderItems,
            amount: totalAmount,
            address: String(savedAddress._id),
            paymentMethod: "COD",
            status: 'Order Placed',
        });

        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully", orderId: order._id });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

export const createStripeCheckoutSession = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;

        if (!stripe) {
            return res.json({ success: false, message: 'Stripe is not configured on the server.' });
        }

        const { savedAddress, orderItems, lineItems, totalAmount } = await buildOrderDetails(userId, items, address);

        const order = await Order.create({
            userId,
            items: orderItems,
            amount: totalAmount,
            address: String(savedAddress._id),
            paymentMethod: 'Stripe',
            status: 'Awaiting Payment',
        });

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: lineItems,
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/my-orders?payment=success&orderId=${order._id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cart?payment=cancelled`,
            metadata: {
                userId,
                orderId: String(order._id),
                addressId: String(savedAddress._id),
            },
        });

        res.json({ success: true, url: session.url, orderId: order._id, sessionId: session.id });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const verifyStripePayment = async (req, res) => {
    try {
        const { orderId, sessionId } = req.body;
        const userId = req.userId;

        if (!stripe) {
            return res.json({ success: false, message: 'Stripe is not configured on the server.' });
        }

        if (!orderId || !sessionId) {
            return res.json({ success: false, message: 'Missing order or session information.' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== 'paid') {
            return res.json({ success: false, message: 'Payment is still pending or failed.' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: 'Order not found.' });
        }

        if (String(order.userId) !== String(userId)) {
            return res.json({ success: false, message: 'You cannot verify this order.' });
        }

        await Order.findByIdAndUpdate(orderId, { isPaid: true, status: 'Paid' });
        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: 'Payment confirmed.', orderId });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// get all orders for frontend by userId

export const userOrder = async (req, res) => {
    try {
        const userId = req.userId
        const orders = await Order.find({userId, $or :[{paymentMethod : "COD"} , {isPaid : true}]}).populate("items.product address").sort({createdAt : -1});
        res.json({success : true , orders});
    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}
// get all orders for Admin Panel

export const allOrder = async (req, res) => {
    try {
        const orders = await Order.find({ $or :[{paymentMethod : "COD"} , {isPaid : true}]}).populate("items.product address").sort({createdAt : -1});
        res.json({success : true , orders});
    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}


// Update Order Status from  admin panel
export const updateOrderStatus = async (req, res) => {
    try {
        const {orderId , status} = req.body
        await Order.findByIdAndUpdate(orderId, {status});
        res.json({success : true , message : "Order Status Updated Successfully"});
    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}
