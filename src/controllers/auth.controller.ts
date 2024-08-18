import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import userService from '../services/user.service';
import authService from '../services/auth.service';

const authController = {
  /**
   * Register a new user.
   */
  signup: catchAsync(async (req: Request, res: Response) => {
    const { user_name, full_name, password } = req.body;
    const user = await userService.createUser({
      user_name,
      full_name,
      password,
    });
    return res.status(201).json({ data: user });
  }),
  /**
   * Login user.
   */
  login: catchAsync(async (req: Request, res: Response) => {
    const { user_name, password } = req.body;
    const loginUser = await authService.loginUser({ user_name, password });
    return res.status(200).json({ data: loginUser });
  }),
};

export default authController;
