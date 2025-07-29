# Demo Projects

基于 Vue3 源码组织方式的 monorepo 项目，使用 pnpm workspace 和 Lerna，支持 Node 和 Web 两套运行时。

## 🚀 技术栈

- **包管理**: pnpm + Lerna
- **语言**: TypeScript
- **前端**: Vue3 + Vite + Tailwind CSS
- **后端**: Node.js + Express
- **工具**: 自定义 CLI

## 📁 项目结构

```
demo-projects/
├── packages/          # 共享包
│   └── shared/       # 共享工具和类型
├── apps/             # 应用
│   ├── web/         # Web 应用 (Vue3)
│   └── node/        # Node.js 应用 (Express)
├── tools/            # 工具
│   └── cli/         # 命令行工具
├── package.json      # 根配置
├── pnpm-workspace.yaml
├── lerna.json
└── README.md
```

## 🛠️ 开发环境

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 安装 pnpm (如果未安装)
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 开发命令

```bash
# 启动所有应用的开发环境
pnpm dev

# 构建所有包
pnpm build

# 类型检查
pnpm type-check

# 清理构建文件
pnpm clean
```

## 📦 包说明

### @demo/shared

共享工具和类型定义包，包含：

- 通用类型定义 (`User`, `ApiResponse`)
- 工具函数 (`formatDate`, `debounce`)
- Vue composables (`useCounter`)

### @demo/web

Vue3 Web 应用，特性：

- Vue3 + TypeScript + Composition API
- Vite 构建工具
- Tailwind CSS 样式框架
- 响应式设计
- 组件示例 (计数器、用户列表、搜索)

### @demo/node

Node.js 后端应用，特性：

- Express 框架
- RESTful API
- CORS 支持
- 安全中间件 (Helmet)
- 错误处理

### @demo/cli

命令行工具，功能：

- 项目信息查询
- 开发环境管理
- 构建流程
- 测试运行

## 🚀 快速开始

### 1. 启动 Web 应用

```bash
cd apps/web
pnpm dev
```

访问 http://localhost:3000

### 2. 启动 Node.js 应用

```bash
cd apps/node
pnpm dev
```

API 服务运行在 http://localhost:3001

### 3. 使用 CLI 工具

```bash
cd tools/cli
pnpm build
node dist/index.js info
```

## 📋 可用脚本

### 根目录

- `pnpm dev` - 启动所有应用的开发环境
- `pnpm build` - 构建所有包
- `pnpm test` - 运行测试
- `pnpm lint` - 代码检查
- `pnpm clean` - 清理构建文件
- `pnpm type-check` - TypeScript 类型检查

### 各包

- `pnpm dev` - 开发模式
- `pnpm build` - 构建
- `pnpm start` - 启动 (Node.js 应用)
- `pnpm preview` - 预览 (Web 应用)

## 🔧 配置说明

### TypeScript

- 严格模式启用
- 路径别名配置
- 模块解析优化

### Vite

- Vue 插件
- 路径别名
- 构建优化

### Tailwind CSS

- 自定义颜色主题
- 响应式设计
- 组件类名

## 📝 开发规范

1. **代码风格**: 使用 TypeScript 严格模式
2. **包管理**: 统一使用 pnpm
3. **版本管理**: 使用 Lerna 管理版本
4. **类型安全**: 所有代码必须有类型定义
5. **文档**: 重要功能需要文档说明

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## �� 许可证

MIT License 