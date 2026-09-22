import { v2 as cloudinary  } from "cloudinary";
import Product from "../models/Product.js";


//controller function for adding product
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);

        const files = req.files || [];
        if (files.length === 0) {
            return res.json({success : false , message : "At least one product image is required"});
        }

        //upload images to cloudinary
        const imageUrl = await Promise.all(
            files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {resource_type : "image"});
                return result.secure_url
            })
        );

        await Product.create({...productData , image : imageUrl});
        res.json({success : true , message : "Product added successfully"});
    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}


//controller function for getting all products
export const listProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({success : true , products});
    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}

//controller function for getting single product
export const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await Product.findById(productId);
        res.json({success : true , product});
    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}


//controller function for changing product stock
export const changeStock = async (req, res) => {
    try {
        const {productId , inStock} = req.body
        await Product.findByIdAndUpdate(productId, {inStock});
        res.json({success : true , message : "Stock Updated Successfully"});
    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}
