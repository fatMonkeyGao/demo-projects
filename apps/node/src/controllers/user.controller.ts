import type {
  AppContext,
  ApiResponse,
  ExtendedApiResponse,
  CreateUserParams,
  UpdateUserParams,
} from "../types";
import { userService } from "../services";
import { HTTP_STATUS } from "../constants";

/**
 * 用户控制器
 */
export class UserController {
  /**
   * 获取所有用户
   */
  static async getUsers(ctx: AppContext): Promise<void> {
    const users = await userService.getAllUsers();

    const response: ApiResponse = {
      success: true,
      data: users,
    };

    ctx.body = response;
  }

  /**
   * 根据ID获取用户
   */
  static async getUserById(ctx: AppContext): Promise<void> {
    const { id } = ctx.params;
    const user = await userService.getUserById(id);

    const response: ApiResponse = {
      success: true,
      data: user,
    };

    ctx.body = response;
  }

  /**
   * 创建新用户
   */
  static async createUser(ctx: AppContext): Promise<void> {
    const userData: CreateUserParams = ctx.request.body as CreateUserParams;
    const user = await userService.createUser(userData);

    const response: ApiResponse = {
      success: true,
      data: user,
    };

    ctx.status = HTTP_STATUS.CREATED;
    ctx.body = response;
  }

  /**
   * 更新用户
   */
  static async updateUser(ctx: AppContext): Promise<void> {
    const { id } = ctx.params;
    const userData: UpdateUserParams = ctx.request.body as UpdateUserParams;
    const user = await userService.updateUser(id, userData);

    const response: ApiResponse = {
      success: true,
      data: user,
    };

    ctx.body = response;
  }

  /**
   * 删除用户
   */
  static async deleteUser(ctx: AppContext): Promise<void> {
    const { id } = ctx.params;
    await userService.deleteUser(id);

    const response: ExtendedApiResponse = {
      success: true,
      message: "用户删除成功",
    };

    ctx.body = response;
  }
}
