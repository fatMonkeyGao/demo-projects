# Agent Pages

智能代理管理系统 - 基于 Vue 3 + TypeScript + Tailwind CSS 构建的现代化 Web 应用。

## 功能特性

- 🏠 **首页仪表板** - 快速访问主要功能
- 📋 **代理列表** - 查看和管理所有智能代理
- 📝 **代理详情** - 查看代理的详细信息
- ➕ **创建代理** - 创建新的智能代理
- ⚙️ **系统设置** - 配置系统参数和偏好

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 静态类型检查
- **Vue Router 4** - 路由管理
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Vite** - 下一代前端构建工具

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动测试环境
pnpm dev:test

# 构建生产版本
pnpm build

# 构建测试版本
pnpm build:test

# 构建生产版本
pnpm build:prod

# 预览构建
pnpm preview

# TypeScript 类型检查
pnpm type-check

# 清理构建文件
pnpm clean

# 环境变量配置
pnpm env:dev    # 使用开发环境配置
pnpm env:test   # 使用测试环境配置
pnpm env:prod   # 使用生产环境配置
```

## 项目结构

```
src/
├── views/           # 页面组件
│   ├── Home.vue     # 首页
│   ├── AgentList.vue    # 代理列表
│   ├── AgentDetail.vue  # 代理详情
│   ├── AgentCreate.vue  # 创建代理
│   └── Settings.vue     # 系统设置
├── components/      # 通用组件
├── router/          # 路由配置
├── enums/           # 枚举定义
├── types/           # 类型定义
├── App.vue          # 根组件
├── main.ts          # 应用入口
└── style.css        # 全局样式
```

## 路由配置

- `/` - 首页
- `/agents` - 代理列表
- `/agents/:id` - 代理详情
- `/agents/create` - 创建代理
- `/settings` - 系统设置

## 环境变量配置

项目支持多环境配置，包括：

### 配置文件
- `env.example` - 环境变量示例文件
- `env.development` - 开发环境配置
- `env.production` - 生产环境配置
- `env.test` - 测试环境配置

### 主要环境变量
- `VITE_APP_TITLE` - 应用标题
- `VITE_API_BASE_URL` - API 基础地址
- `VITE_MAX_AGENTS` - 最大代理数量
- `VITE_ENABLE_DEBUG` - 是否启用调试模式
- `VITE_ENABLE_NOTIFICATIONS` - 是否启用通知

### 使用方法
```typescript
import { getEnv } from '@/utils/env'

// 获取应用标题
const title = getEnv.appTitle()

// 获取 API 地址
const apiUrl = getEnv.apiBaseUrl()

// 检查是否为开发环境
import { isDevelopment } from '@/utils/env'
if (isDevelopment()) {
  // 开发环境逻辑
}
```

## 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 最佳实践
- 使用 Tailwind CSS 进行样式开发
- 组件文件使用 PascalCase 命名
- 路由名称使用枚举管理
- 环境变量通过 `@/utils/env` 工具函数获取 