import Order from "../models/Order.js";
import Product from "../models/Product.js";


//Global Variable
const currency = "pkr";
const deleveryCharge = 10;
const textPrecentage = 0.02;


//PLAGE ORDER USING COD

export const placeOrderCOD = async (req, res) => {
    try {
        const {items,quantity} = req.body
        const userId = req.userId
        if(order.length === 0){
            return res.json({success : false , message : "No items in the cart"});
        }
        //calculate total amount
        let subtotal = await List.reduce(async (acc, item) => {
            const product = await Product.findById(item.product)
            return (await acc) + product.price * item.quantity
        },0);

        // calculate total 
        const taxamount = subtotal * textPrecentage;
        const totalAmount = subtotal + taxamount + deleveryCharge;
         await Order.create({
            userId,
            items,
            amount : totalAmount,
            adress ,
           paymentMethod : "COD",
         });
// clear cart
        await User.findByIdAndUpdate(userId, {cartData : {}});

        res.json({success : true , message : "Order Placed Successfully"});

    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}


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
