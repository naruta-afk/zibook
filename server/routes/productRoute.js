import { upload } from '../middlewares/multer.js'
import { addProduct , listProducts, singleProduct , changeStock} from '../controllers/productController.js'
import authAdmin from '../middlewares/authAdmin.js'
import express from 'express';
const productRouter = express.Router();


productRouter.post('/add', upload.array("images"),authAdmin  ,addProduct);
productRouter.get('/list'  ,listProducts);
productRouter.post('/single'  , singleProduct);
productRouter.post('/stock'  , changeStock);

export default productRouter
