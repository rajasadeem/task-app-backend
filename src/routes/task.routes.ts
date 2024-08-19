import express from 'express';
import auth from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import taskValidation from '../validations/task.validation';
import taskController from '../controllers/task.controller';

const taskRouter = express();

taskRouter.post(
  '/',
  auth,
  validate(taskValidation.add),
  taskController.createTask,
);

taskRouter.get(
  '/:id',
  auth,
  validate(taskValidation.id),
  taskController.getTaskById,
);

taskRouter.get(
  '/user/:id',
  auth,
  validate(taskValidation.id),
  taskController.getTaskOfUser,
);

taskRouter.patch(
  '/:id',
  auth,
  validate(taskValidation.update),
  taskController.updateTask,
);

taskRouter.delete(
  '/:id',
  auth,
  validate(taskValidation.id),
  taskController.deleteTask,
);

export default taskRouter;
