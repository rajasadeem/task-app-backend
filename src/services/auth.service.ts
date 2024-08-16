import { sign, verify } from 'jsonwebtoken';
import config from '../config/env';
import { LoginUser, User } from '../types';
import ApiError from '../utils/ApiError';
import client from '../config/db';
import userRepository from '../repositories/user.repository';
import { validateHash } from '../utils/bcrypt';

const authService = {
  /**
   *
   * @param user
   * @returns Generate jwt
   */
  generateToken: (user: User) => {
    const { id, user_name, full_name } = user;
    const payload = {
      id,
      user_name,
      full_name,
    };
    return sign(payload, config.JWT_SECRET, { expiresIn: '7d' });
  },
  /**
   *
   * @param token
   * @returns Decode jwt
   */
  verifyToken: (token: string) => {
    return verify(token, config.JWT_SECRET);
  },
  /**
   *
   * @param loginData
   * @returns Login user
   */
  loginUser: async (loginData: LoginUser) => {
    const { user_name, password } = loginData;

    const userExist = await client.query(userRepository.getByUserName(), [
      user_name,
    ]);
    if (!userExist.rows.length) {
      throw new ApiError(404, 'No account associated with this username.');
    }

    const verifyPassword = await validateHash(
      password,
      userExist.rows[0].password,
    );
    if (!verifyPassword) {
      throw new ApiError(400, `Incorrect password for user ${user_name} `);
    }

    const token = authService.generateToken(userExist.rows[0]);
    const { password: _password, ...userWithoutPassword } = userExist.rows[0];
    return {
      token,
      user: userWithoutPassword,
    };
  },
};

export default authService;
