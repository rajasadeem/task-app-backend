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
