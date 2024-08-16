import express from 'express';
import auth from '../middlewares/auth';
import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/me', auth, userController.getUser);

userRouter.patch('/', auth, userController.updateUser);

export default userRouter;
