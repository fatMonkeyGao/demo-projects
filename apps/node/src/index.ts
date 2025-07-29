import cors from "cors";
import express from "express";
import helmet from "helmet";
import {
  formatDate,
  type ApiResponse,
  type User,
} from "../../../packages/shared/src";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Mock data
const users: User[] = [
  { id: "1", name: "张三", email: "zhangsan@example.com" },
  { id: "2", name: "李四", email: "lisi@example.com" },
  { id: "3", name: "王五", email: "wangwu@example.com" },
];

// Routes
app.get("/", (_req, res) => {
  res.json({
    message: "Demo Projects API",
    timestamp: formatDate(new Date()),
    version: "1.0.0",
  });
});

app.get("/api/users", (_req, res) => {
  const response: ApiResponse<User[]> = {
    success: true,
    data: users,
  };
  res.json(response);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    const response: ApiResponse = {
      success: false,
      error: "用户未找到",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<User> = {
    success: true,
    data: user,
  };
  res.json(response);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    const response: ApiResponse = {
      success: false,
      error: "姓名和邮箱是必填项",
    };
    return res.status(400).json(response);
  }

  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email,
  };

  users.push(newUser);

  const response: ApiResponse<User> = {
    success: true,
    data: newUser,
  };
  res.status(201).json(response);
});

// Error handling middleware
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    const response: ApiResponse = {
      success: false,
      error: "服务器内部错误",
    };
    res.status(500).json(response);
  }
);

// 404 handler
app.use("*", (_req, res) => {
  const response: ApiResponse = {
    success: false,
    error: "接口不存在",
  };
  res.status(404).json(response);
});

app.listen(PORT, () => {
  console.log(`🚀 Node.js 服务器运行在 http://localhost:${PORT}`);
  console.log(`📅 启动时间: ${formatDate(new Date())}`);
});
