import jwt from 'jsonwebtoken';

const authAdmin = (req, res, next) => {
    const { adnmintoken } = req.cookies || {};

    if (!adminttoken) {
        return res.status(401).json({ success: false, message: 'Not authorized. Please login.' });
    }

    try {
        const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);
       

        if (decoded.email === process.env.ADMIN_EMAIL) {
            next();
           
        }else {
            return res.json({ success: false, message: 'Not authorized as admin' });
        }
           

        
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authAdmin;