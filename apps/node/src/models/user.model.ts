import type { User } from "../types";

// 模拟数据库存储
class UserModel {
  private users: User[] = [
    { id: "1", name: "张三", email: "zhangsan@example.com" },
    { id: "2", name: "李四", email: "lisi@example.com" },
    { id: "3", name: "王五", email: "wangwu@example.com" },
  ];

  /**
   * 获取所有用户
   */
  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  /**
   * 根据 ID 查找用户
   */
  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  /**
   * 根据邮箱查找用户
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  /**
   * 创建新用户
   */
  async create(userData: Omit<User, "id">): Promise<User> {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * 更新用户
   */
  async update(
    id: string,
    userData: Partial<Omit<User, "id">>
  ): Promise<User | null> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return null;
    }

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
  }

  /**
   * 删除用户
   */
  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}

// 导出单例
export const userModel = new UserModel();
