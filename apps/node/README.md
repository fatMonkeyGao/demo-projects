# Node.js Koa API 服务

基于 Koa 框架构建的现代化 Node.js API 服务，采用 TypeScript 开发。

## 📁 项目结构

```
src/
├── app.ts                 # Koa 应用实例
├── server.ts             # 服务器启动文件
├── index.ts              # 主入口文件
├── config/               # 配置文件
│   └── index.ts
├── controllers/          # 控制器
│   ├── app.controller.ts
│   ├── user.controller.ts
│   ├── agent.controller.ts
│   └── index.ts
├── routes/              # 路由定义
│   ├── user.routes.ts
│   ├── agent.routes.ts
│   └── index.ts
├── middleware/          # 中间件
│   ├── error.middleware.ts
│   ├── request.middleware.ts
│   └── index.ts
├── services/           # 业务逻辑服务
│   ├── user.service.ts
│   ├── agent.service.ts
│   └── index.ts
├── models/             # 数据模型
│   └── user.model.ts
├── utils/              # 工具函数
│   └── index.ts
├── types/              # 类型定义
│   └── index.ts
└── constants/          # 常量定义
    └── index.ts
```

## 🚀 快速开始

### 安装依赖

```bash
# 在项目根目录执行
pnpm install
```

### 环境配置

1. 复制环境变量文件：

```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，配置相关参数。

### 启动开发服务

```bash
# 开发模式（热重载）
pnpm dev

# 构建项目
pnpm build

# 生产模式
pnpm start
```

## 📋 API 接口

### 应用接口

- `GET /` - 健康检查
- `GET /info` - API 信息

### 用户接口

- `GET /api/users` - 获取用户列表
- `GET /api/users/:id` - 获取用户详情
- `POST /api/users` - 创建用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户

### AI Agent 接口

- `POST /api/agents/coze/workflow` - 执行 Coze 工作流
- `GET /api/agents/fire/config` - 获取 Fire AI 配置
- `POST /api/agents/fire/test` - 测试 Fire AI 连接

## 🛠️ 技术栈

- **框架**: Koa.js
- **语言**: TypeScript
- **路由**: @koa/router
- **中间件**:
  - koa-helmet (安全)
  - @koa/cors (跨域)
  - koa-bodyparser (请求体解析)
- **AI 服务**:
  - Coze API
  - Fire AI

## 📝 开发规范

### 目录说明

- `config/` - 应用配置和环境变量处理
- `controllers/` - 控制器层，处理 HTTP 请求
- `routes/` - 路由定义
- `middleware/` - 自定义中间件
- `services/` - 业务逻辑服务层
- `models/` - 数据模型（当前使用内存存储）
- `utils/` - 工具函数
- `types/` - TypeScript 类型定义
- `constants/` - 常量定义

### 代码风格

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 采用函数式编程和面向对象编程相结合
- 使用 async/await 处理异步操作

## 🔧 环境变量

| 变量名        | 描述          | 默认值              |
| ------------- | ------------- | ------------------- |
| PORT          | 服务端口      | 3001                |
| NODE_ENV      | 运行环境      | development         |
| API_PREFIX    | API 前缀      | /api                |
| COZE_TOKEN    | Coze AI Token | -                   |
| COZE_BASE_URL | Coze API 地址 | https://api.coze.cn |
| FIRE_API_KEY  | Fire AI 密钥  | -                   |

## 📊 项目特性

- ✅ 基于 Koa 的现代化架构
- ✅ TypeScript 类型安全
- ✅ 模块化设计
- ✅ 错误处理中间件
- ✅ 请求日志记录
- ✅ CORS 支持
- ✅ 安全头设置
- ✅ AI 服务集成
- ✅ 环境配置管理
- ✅ 优雅关闭支持
