import jwt from 'jsonwebtoken';


const cookieOptions = {
    httpOnly: true,
    secure: process.env.APP_ENV === 'production',
    sameSite: process.env.APP_ENV === 'production' ? 'None' : 'strict',
};
//Admin  login Route 
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD) {
          const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
          res.cookie('admintoken', token, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
          return res.json({ success: true, message: 'Admin logged in successfully' });
        }
    else {
        return res.json({ success: false, message: 'Invalid credentials' });
    }
    
    
    }catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message })
        }
}


//CHECK AUTH
export const isAdminAuth = async (req, res) => {
    try{
       return res.json({ success: true });

    }catch(error){

        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
    
}


//LOGOUT ADMIN
export const adminLogout = async (req, res) => {
    try {
        res.clearCookie('admintoken', cookieOptions);
        return res.json({ success: true, message: 'Admin logged out successfully' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}