import { remoteUserServiceConfig } from "../config";
import { ERROR_MESSAGES, HTTP_STATUS } from "../constants";
import { userModel } from "../models/user.model";
import type {
  AppError,
  CreateUserParams,
  UpdateUserParams,
  User,
} from "../types";
import { dubboService } from "./dubbo.service";

/**
 * 用户服务类
 */
class UserService {
  /**
   * 获取所有用户
   */
  async getAllUsers(): Promise<User[]> {
    try {
      return await dubboService.call<User[]>(
        remoteUserServiceConfig.interfaceName,
        "getAllUsers",
        [],
        remoteUserServiceConfig.version,
        remoteUserServiceConfig.group
      );
    } catch (error) {
      console.error("Dubbo 调用失败，回退到本地模型:", error);
      // 如果 dubbo 调用失败，可以回退到本地模型
      return await userModel.findAll();
    }
  }

  /**
   * 根据ID获取用户
   */
  async getUserById(id: string): Promise<User> {
    try {
      const user = await dubboService.call<User>(
        remoteUserServiceConfig.interfaceName,
        "getUserByUserId",
        [id],
        remoteUserServiceConfig.version,
        remoteUserServiceConfig.group
      );
      if (!user) {
        const error: AppError = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
        error.status = HTTP_STATUS.NOT_FOUND;
        throw error;
      }
      return user;
    } catch (error) {
      // 如果是业务错误（如用户不存在），直接抛出
      if ((error as AppError).status) {
        throw error;
      }
      console.error("Dubbo 调用失败，回退到本地模型:", error);
      // 如果 dubbo 调用失败，回退到本地模型
      const user = await userModel.findById(id);
      if (!user) {
        const err: AppError = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
        err.status = HTTP_STATUS.NOT_FOUND;
        throw err;
      }
      return user;
    }
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

    try {
      return await dubboService.call<User>(
        remoteUserServiceConfig.interfaceName,
        "createUser",
        [userData],
        remoteUserServiceConfig.version,
        remoteUserServiceConfig.group
      );
    } catch (error) {
      // 如果是业务错误（如邮箱已存在），直接抛出
      if ((error as AppError).status) {
        throw error;
      }
      console.error("Dubbo 调用失败，回退到本地模型:", error);
      // 如果 dubbo 调用失败，回退到本地模型
      // 检查邮箱是否已存在
      const existingUser = await userModel.findByEmail(userData.email);
      if (existingUser) {
        const err: AppError = new Error("邮箱已存在");
        err.status = HTTP_STATUS.BAD_REQUEST;
        throw err;
      }
      return await userModel.create(userData);
    }
  }

  /**
   * 更新用户
   */
  async updateUser(id: string, userData: UpdateUserParams): Promise<User> {
    try {
      return await dubboService.call<User>(
        remoteUserServiceConfig.interfaceName,
        "updateUser",
        [id, userData],
        remoteUserServiceConfig.version,
        remoteUserServiceConfig.group
      );
    } catch (error) {
      // 如果是业务错误，直接抛出
      if ((error as AppError).status) {
        throw error;
      }
      console.error("Dubbo 调用失败，回退到本地模型:", error);
      // 如果 dubbo 调用失败，回退到本地模型
      // 检查用户是否存在
      await this.getUserById(id);

      // 如果更新邮箱，检查邮箱是否已被其他用户使用
      if (userData.email) {
        const existingUser = await userModel.findByEmail(userData.email);
        if (existingUser && existingUser.id !== id) {
          const err: AppError = new Error("邮箱已被其他用户使用");
          err.status = HTTP_STATUS.BAD_REQUEST;
          throw err;
        }
      }

      const updatedUser = await userModel.update(id, userData);
      if (!updatedUser) {
        const err: AppError = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
        err.status = HTTP_STATUS.NOT_FOUND;
        throw err;
      }

      return updatedUser;
    }
  }

  /**
   * 删除用户
   */
  async deleteUser(id: string): Promise<void> {
    try {
      await dubboService.call<void>(
        remoteUserServiceConfig.interfaceName,
        "deleteUser",
        [id],
        remoteUserServiceConfig.version,
        remoteUserServiceConfig.group
      );
    } catch (error) {
      // 如果是业务错误，直接抛出
      if ((error as AppError).status) {
        throw error;
      }
      console.error("Dubbo 调用失败，回退到本地模型:", error);
      // 如果 dubbo 调用失败，回退到本地模型
      const deleted = await userModel.delete(id);
      if (!deleted) {
        const err: AppError = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
        err.status = HTTP_STATUS.NOT_FOUND;
        throw err;
      }
    }
  }
}

// 导出单例
export const userService = new UserService();
