import client from '../config/db';
import taskRepository from '../repositories/task.repository';
import { CreateTask, Task, TaskFilters } from '../types';
import ApiError from '../utils/ApiError';

const taskService = {
  /**
   *
   * @param taskData
   * @returns Create task
   */
  add: async (taskData: CreateTask) => {
    const { user_id, title, description, priority, due_date } = taskData;
    const newTask = await client.query(taskRepository.add(), [
      user_id,
      title,
      description,
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
   * @param task
   * @returns Update task
   */
  updateTask: async (id: number, task: Partial<Task>) => {
    const taskExist = await client.query(taskRepository.getById(), [id]);
    if (!taskExist.rows.length) throw new ApiError(404, 'Task not found.');
    const { query, values } = taskRepository.updateTask(task, id);
    const updatedTask = await client.query(query, values);
    return updatedTask.rows[0];
  },
  /**
   *
   * @param id
   * @returns Delete task
   */
  deleteTask: async (id: number) => {
    const taskExist = await client.query(taskRepository.getById(), [id]);
    if (!taskExist.rows.length) throw new ApiError(404, 'Task not found.');
    return await client.query(taskRepository.deleteTask(), [id]);
  },
  /**
   *
   * @param userId
   * @param page
   * @param pageSize
   * @param filters
   * @returns Get tasks of user
   */
  getTasksOfUser: async (
    userId: number,
    page: number,
    pageSize: number,
    filters: TaskFilters,
  ) => {
    const { query, values } = taskRepository.getTasksOfUser(
      userId,
      page,
      pageSize,
      filters,
    );
    const userTasks = await client.query(query, values);
    return userTasks.rows;
  },
};

export default taskService;
