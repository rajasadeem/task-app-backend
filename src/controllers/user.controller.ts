import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import userService from '../services/user.service';

const userController = {
  getUser: catchAsync(async (req: Request, res: Response) => {
    if (!req.user)
      return res.status(401).json({ message: 'User not authenticated.' });
    const { id } = req.user;
    const user = await userService.getUserById(id);
    return res.status(200).json({ data: user });
  }),
  /**
   * Update user
   */
  updateUser: catchAsync(async (req: Request, res: Response) => {
    if (!req.user)
      return res.status(401).json({ message: 'User not authenticated.' });
    const { id } = req.user;
    const updateUser = await userService.updateUser(Number(id), req.body);
    return res.status(201).json({ data: updateUser });
  }),
};

export default userController;
