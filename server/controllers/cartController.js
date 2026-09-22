import User from "../models/User.js";


//Adding to Cart
export const addToCart = async (req, res) => {
    try{
        const {itemId} = req.body
        const userId = req.userId

        if(!itemId){
            return res.json({success : false , message : "itemId is required"});
        }

        const userData = await User.findById(userId)
        if(!userData){
            return res.json({success : false , message : "User not found"});
        }

        const cartData = userData.cartData || {};
        if(cartData[itemId]){
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        await User.findByIdAndUpdate(userId, {cartData});
        res.json({success : true , message : "Item added to cart"});
    } catch(error){
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}


//UPDATE CART
export const updateCart = async (req, res) => {
    try{
        const {itemId , quantity} = req.body
        const userId = req.userId
        const qty = Number(quantity)

        if(!itemId || !Number.isInteger(qty) || qty < 0){
            return res.json({success : false , message : "itemId and a whole-number quantity (0 or more) are required"});
        }

        const userData = await User.findById(userId)
        if(!userData){
            return res.json({success : false , message : "User not found"});
        }

        const cartData = userData.cartData || {};
        if(qty === 0){
            delete cartData[itemId];   // quantity 0 removes the item
        } else {
            cartData[itemId] = qty;
        }

        await User.findByIdAndUpdate(userId, {cartData});
        res.json({success : true , message : "item quantity updated successfully"});

    } catch(error){
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}
