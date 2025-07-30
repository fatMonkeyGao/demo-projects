# Demo Projects - Monorepo

这是一个基于 Vue 3 + TypeScript + Vite + Tailwind CSS 构建的现代化 Monorepo 项目。

## 🚀 技术栈

### 核心框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 静态类型检查
- **Vite** - 下一代前端构建工具

### 路由管理
- **Vue Router 4** - Vue.js 官方路由管理器

### 样式解决方案
- **Tailwind CSS** - 实用优先的 CSS 框架
- **PostCSS** - CSS 后处理器
- **Autoprefixer** - 自动添加 CSS 前缀

### 开发工具
- **Vue TSC** - Vue 3 TypeScript 编译器
- **Rimraf** - 跨平台文件删除工具

### 项目结构
- **Monorepo** - 使用 pnpm workspace 管理多包项目
- **@demo/shared** - 共享工具和类型
- **@demo/components** - Vue3 + Tailwind CSS 组件库

## 🚀 技术栈

### 核心框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 静态类型检查
- **Vite** - 下一代前端构建工具

### 路由管理
- **Vue Router 4** - Vue.js 官方路由管理器

### 样式解决方案
- **Tailwind CSS** - 实用优先的 CSS 框架
- **PostCSS** - CSS 后处理器
- **Autoprefixer** - 自动添加 CSS 前缀

### 开发工具
- **Vue TSC** - Vue 3 TypeScript 编译器
- **Rimraf** - 跨平台文件删除工具

### 项目结构
- **Monorepo** - 使用 workspace 管理多包项目
- **@demo/shared** - 共享包依赖

## 📁 项目结构

```
demo-projects/
├── apps/
│   ├── web/                    # Web 应用
│   │   ├── src/
│   │   │   ├── views/         # 页面组件
│   │   │   ├── router/        # 路由配置
│   │   │   └── style.css      # 全局样式
│   │   └── package.json
│   └── node/                   # Node.js 应用
│       ├── src/
│       └── package.json
├── packages/
│   ├── shared/                 # 共享工具和类型
│   │   ├── src/
│   │   └── package.json
│   └── components/             # Vue3 + Tailwind 组件库
│       ├── src/
│       │   ├── components/     # UI 组件
│       │   ├── types/         # 类型定义
│       │   ├── utils/         # 工具函数
│       │   └── style.css      # 组件库样式
│       └── package.json
├── tools/
│   └── cli/                    # 命令行工具
├── tailwind.config.js          # 统一 Tailwind 配置
├── postcss.config.js           # 统一 PostCSS 配置
├── tsconfig.json               # 统一 TypeScript 配置
└── package.json                # 根包配置
```

## 🛠️ 开发环境要求

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 或 **yarn** >= 1.22.0 或 **pnpm** >= 7.0.0

## 📦 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

## 🚀 开发命令

```bash
# 安装依赖
pnpm install

# 启动所有应用的开发服务器
pnpm dev

# 启动 Web 应用开发服务器
pnpm dev:web

# 构建所有包
pnpm build

# 构建组件库
pnpm build:components

# TypeScript 类型检查
pnpm type-check

# 清理构建文件
pnpm clean
```

## ⚙️ 统一配置规范

### 项目配置
- **统一配置管理**：所有子项目共享根目录的配置文件
- **Tailwind CSS**：统一的主题和样式规范
- **TypeScript**：统一的类型检查和路径映射
- **Vite**：统一的构建配置和别名设置

### 配置文件说明
- `tailwind.config.js` - 统一的 Tailwind CSS 配置
- `postcss.config.js` - 统一的 PostCSS 配置
- `tsconfig.json` - 统一的 TypeScript 配置
- `project.config.js` - 项目配置管理

### 路径别名
- `@/*` -> `packages/*/src`
- `@shared/*` -> `packages/shared/src`
- `@components/*` -> `packages/components/src`

### 组件库特性
- **Vue3 + TypeScript**：完整的类型支持
- **Tailwind CSS**：现代化的样式系统
- **Tree-shaking**：按需导入支持
- **Monorepo**：统一的项目管理

## 📋 开发规范

### 代码风格
- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint 和 Prettier 保持代码一致性

### 组件规范
- 组件文件使用 PascalCase 命名
- 单文件组件使用 `.vue` 扩展名
- 组件 props 必须定义类型

### 路由规范
- 路由配置集中管理
- 使用懒加载优化性能
- 路由名称使用枚举管理

### 样式规范
- 优先使用 Tailwind CSS 工具类
- 自定义样式使用 CSS 变量
- 响应式设计优先

### 类型定义
- 所有 API 接口必须定义类型
- 使用 TypeScript 严格模式
- 避免使用 `any` 类型

## 🔧 环境变量

项目支持以下环境变量：

```bash
# 开发环境
VITE_APP_TITLE=Demo Web App
VITE_API_BASE_URL=http://localhost:3000/api

# 生产环境
VITE_APP_TITLE=Demo Web App
VITE_API_BASE_URL=https://api.example.com
```

## 📦 构建部署

### 开发环境
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 预览构建
```bash
npm run preview
```

## 🧪 测试

```bash
# 运行类型检查
npm run type-check
```

## 📝 提交规范

建议使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动


