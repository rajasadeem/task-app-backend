import express from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import taskRouter from './task.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/task', taskRouter);

export default router;
