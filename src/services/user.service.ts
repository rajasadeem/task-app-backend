import userRepository from '../repositories/user.repository';
import client from '../config/db';
import ApiError from '../utils/ApiError';
import { CreateUser, User } from '../types';
import { hashPassword } from '../utils/bcrypt';

const userService = {
  /**
   *
   * @param userData
   * @returns Create new user
   */
  createUser: async (userData: CreateUser) => {
    const { user_name, full_name, password } = userData;
    const userExist = await client.query(userRepository.getByUserName(), [
      user_name,
    ]);
    if (userExist.rows.length)
      throw new ApiError(
        400,
        'This username is already taken. Please choose a different one.',
      );
    const hashedPassword = await hashPassword(password);

    await client.query(userRepository.add(), [
      user_name,
      full_name,
      hashedPassword,
      new Date(), // created_at
      new Date(), // updated_at
    ]);
  },
  /**
   *
   * @param id
   * @returns Find user by ID
   */
  getUserById: async (id: number) => {
    const user = await client.query(userRepository.getUserById(), [id]);
    if (!user.rows.length) throw new ApiError(404, 'User not found.');
    const { password: _password, ...userWithoutPassword } = user.rows[0];
    return { ...userWithoutPassword };
  },
  /**
   *
   * @param id
   * @param user
   * @returns Update user
   */
  updateUser: async (id: number, user: Partial<User>) => {
    const userExist = await client.query(userRepository.getUserById(), [id]);
    if (!userExist.rows.length) throw new ApiError(404, 'User not found.');

    const { text, values } = userRepository.updateUser(user, id);

    const updatedUser = await client.query(text, values);

    const { password: _password, ...userWithoutPassword } = updatedUser.rows[0];
    return { ...userWithoutPassword };
  },
};

export default userService;
