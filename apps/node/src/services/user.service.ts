import type {
  User,
  CreateUserParams,
  UpdateUserParams,
  AppError,
} from "../types";
import { userModel } from "../models/user.model";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";

/**
 * 用户服务类
 */
class UserService {
  /**
   * 获取所有用户
   */
  async getAllUsers(): Promise<User[]> {
    return await userModel.findAll();
  }

  /**
   * 根据ID获取用户
   */
  async getUserById(id: string): Promise<User> {
    const user = await userModel.findById(id);
    if (!user) {
      const error: AppError = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }
    return user;
  }

  /**
   * 创建新用户
   */
  async createUser(userData: CreateUserParams): Promise<User> {
    // 验证必填字段
    if (!userData.name || !userData.email) {
      const error: AppError = new Error(ERROR_MESSAGES.NAME_EMAIL_REQUIRED);
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    // 检查邮箱是否已存在
    const existingUser = await userModel.findByEmail(userData.email);
    if (existingUser) {
      const error: AppError = new Error("邮箱已存在");
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    return await userModel.create(userData);
  }

  /**
   * 更新用户
   */
  async updateUser(id: string, userData: UpdateUserParams): Promise<User> {
    // 检查用户是否存在
    await this.getUserById(id);

    // 如果更新邮箱，检查邮箱是否已被其他用户使用
    if (userData.email) {
      const existingUser = await userModel.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        const error: AppError = new Error("邮箱已被其他用户使用");
        error.status = HTTP_STATUS.BAD_REQUEST;
        throw error;
      }
    }

    const updatedUser = await userModel.update(id, userData);
    if (!updatedUser) {
      const error: AppError = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    return updatedUser;
  }

  /**
   * 删除用户
   */
  async deleteUser(id: string): Promise<void> {
    const deleted = await userModel.delete(id);
    if (!deleted) {
      const error: AppError = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      throw error;
    }
  }
}

// 导出单例
export const userService = new UserService();
