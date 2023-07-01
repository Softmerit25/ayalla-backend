import {Router} from 'express';
import { userLogin, userLogout, userRegister } from '../Controllers/userController.js';

const userRoutes = Router();

userRoutes.post('/user/register', userRegister);
userRoutes.post('/user/login', userLogin);
userRoutes.post('/user/logout', userLogout);

export default userRoutes;