import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import taskService from '../services/task.service';
import {
  CreateTask,
  Task,
  TaskFilters,
  TaskPriority,
  TaskStatus,
} from '../types';

const taskController = {
  /**
   * Create task
   */
  createTask: catchAsync(async (req: Request, res: Response) => {
    const task = await taskService.add(req.body as CreateTask);
    return res.status(201).json({ data: task });
  }),
  /**
   * Get task by ID
   */
  getTaskById: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await taskService.getTaskById(Number(id));
    return res.status(200).json({ data: task });
  }),
  /**
   * Update task
   */
  updateTask: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTask = await taskService.updateTask(
      Number(id),
      req.body as Partial<Task>,
    );
    return res.status(201).json({ data: updatedTask });
  }),
  /**
   * Delete task
   */
  deleteTask: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await taskService.deleteTask(Number(id));
    return res.status(200).json({ message: 'Task deleted successfully' });
  }),
  /**
   * Get tasks of user
   */
  getTaskOfUser: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      page = '1',
      pageSize = '10',
      status,
      priority,
      due_date,
    } = req.query as Partial<{
      page: string;
      pageSize: string;
      status: TaskStatus;
      priority: TaskPriority;
      due_date: Date;
    }>;
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);

    // Build filters object based on provided query parameters
    const filters: TaskFilters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (due_date) filters.due_date = due_date;

    const tasks = await taskService.getTasksOfUser(
      Number(id),
      pageNumber,
      pageSizeNumber,
      filters,
    );
    return res.status(200).json({ data: tasks });
  }),
};

export default taskController;
