import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middlewares 
import {requireSignin,isAdmin} from '../middlewares/auth.js';

//controllers
import {create,list,read,photo,remove,update} from '../controllers/product.js';

router.post('/product',requireSignin,isAdmin,formidable(),create);
router.get('/products',list);
router.get('/products/:slug',read);
router.get('/product/photo/:productId',photo);
router.delete('/product/:productId',remove);
router.put('/product/:productId',requireSignin,isAdmin,formidable(),update);

export default router;
