import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';
import authMiddLeware from './app/middlewares/auth';
import OrderController from './app/controllers/OrderController';

const routes = new Router();

const upload = multer(multerConfig);


routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddLeware);

routes.post('/products', upload.single('file'), ProductController.store); 
routes.get('/products', ProductController.index);
routes.put('/products/:id', upload.single('file'), ProductController.update);

routes.post('/categories', upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

export default routes;




























/*import { Router } from "express"; 
import {v4} from 'uuid';

import User from "./app/models/User";

const routes = Router();


routes.get('/', async (requeste,response) =>{
    const user = await User.create({
      id: v4(),
      name:'eurico1',
      email: 'euricobig2@gmsil.com',
      password_hash: '88199553',
      admin: true
    });
    return response.status(201).json(user )
});

export default routes;*/


















