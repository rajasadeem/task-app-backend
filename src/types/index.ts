export type User = {
  id: number;
  user_name: string;
  full_name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateUser = {
  user_name: string;
  full_name: string;
  password: string;
};

export type LoginUser = {
  user_name: string;
  password: string;
};

export type TaskStatus = 'to_do' | 'in_progress' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: Date;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
};

export type CreateTask = {
  user_id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: Date;
};
