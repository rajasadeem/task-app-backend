import client from '../config/db';
import taskRepository from '../repositories/task.repository';
import { CreateTask } from '../types';
import ApiError from '../utils/ApiError';

const taskService = {
  /**
   *
   * @param taskData
   * @returns Create task
   */
  add: async (taskData: CreateTask) => {
    const { user_id, title, description, status, priority, due_date } =
      taskData;
    const newTask = await client.query(taskRepository.add(), [
      user_id,
      title,
      description,
      status,
      priority,
      due_date,
      new Date(), // created_at
      new Date(), // updated_at
    ]);
    return newTask.rows[0];
  },
  /**
   *
   * @param id
   * @returns Find task by ID
   */
  getTaskById: async (id: number) => {
    const task = await client.query(taskRepository.getById(), [id]);
    if (!task.rows.length) throw new ApiError(404, 'Task not found.');
    return task.rows[0];
  },
  /**
   *
   * @param id
   * @returns Delete task
   */
  deleteTask: async (id: number) => {
    const taskExist = await client.query(taskRepository.getById(), [id]);
    if (!taskExist.rows.length) throw new ApiError(404, 'Task not exist.');
    return await client.query(taskRepository.deleteTask(), [id]);
  },
};

export default taskService;
