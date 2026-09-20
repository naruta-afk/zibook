import Address from "../models/Address.js";


// ADD ADDRESS
export const addAddress = async (req, res) => {
    try {
            const {address} = req.body
        const userId = req.userId
        await Address.create({...address,userId});
        res.json({success : true , message : "Address added successfully"});
    } catch (error) {
    console.log(error.message);
    res.json({success : false , message : error.message})
    }
}

    //get addresses
    export const getAddresses = async (req, res) => {
        try {
            const userId = req.userId
            const addresses = await Address.find({userId});
            res.json({success : true , addresses});
        } catch (error) {
            
        }
    }
