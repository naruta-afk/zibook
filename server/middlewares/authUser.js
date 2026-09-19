import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const { token } = req.cookies || {};

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. Please login.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId || decoded.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        req.userId = userId;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authUser;