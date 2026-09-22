import { upload } from '../middlewares/multer.js'
import { addProduct , listProducts, singleProduct , changeStock} from '../controllers/productController.js'
import authAdmin from '../middlewares/authAdmin.js'
import express from 'express';
const productRouter = express.Router();

// authAdmin runs first so unauthenticated requests never get to upload files
productRouter.post('/add', authAdmin, upload.array("images"), addProduct);
productRouter.get('/list', listProducts);
productRouter.post('/single', singleProduct);
productRouter.post('/stock', authAdmin, changeStock);

export default productRouter
