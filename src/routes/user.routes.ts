import express from 'express';
import auth from '../middlewares/auth';
import userController from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import userValidation from '../validations/user.validation';

const userRouter = express.Router();

userRouter.get('/me', auth, userController.getUser);

userRouter.patch(
  '/',
  auth,
  validate(userValidation.update),
  userController.updateUser,
);

userRouter.delete(
  '/:id',
  auth,
  validate(userValidation.delete),
  userController.deleteUser,
);

export default userRouter;
