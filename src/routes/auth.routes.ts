import express from 'express';
import authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import authValidation from '../validations/auth.validation';

const authRouter = express.Router();

authRouter.post(
  '/signup',
  validate(authValidation.signup),
  authController.signup,
);

authRouter.post(
  '/signin',
  validate(authValidation.login),
  authController.login,
);

export default authRouter;
