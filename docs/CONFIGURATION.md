# 项目配置规范

本文档描述了项目的统一配置规范，确保所有子项目使用一致的配置。

## 📁 配置文件结构

```
demo-projects/
├── tailwind.config.js          # 统一 Tailwind CSS 配置
├── postcss.config.js           # 统一 PostCSS 配置
├── tsconfig.json               # 统一 TypeScript 配置
├── project.config.js           # 项目配置管理
├── apps/
│   └── web/
│       ├── tailwind.config.js  # 继承根配置
│       ├── postcss.config.js   # 继承根配置
│       └── vite.config.ts      # Web 应用配置
└── packages/
    └── components/
        ├── tailwind.config.js  # 继承根配置
        ├── postcss.config.js   # 继承根配置
        └── vite.config.ts      # 组件库配置
```

## 🎨 Tailwind CSS 配置

### 根配置 (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./apps/web/index.html",
    "./apps/web/src/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/components/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
```

### 子项目配置

所有子项目都继承根配置：

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  ...require('../../tailwind.config.js'),
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
}
```

## 🔧 PostCSS 配置

### 根配置 (`postcss.config.js`)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 子项目配置

```javascript
export default {
  ...require('../../postcss.config.js'),
}
```

## 📝 TypeScript 配置

### 根配置 (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./packages/*/src"],
      "@shared/*": ["./packages/shared/src"],
      "@components/*": ["./packages/components/src"]
    }
  },
  "include": [
    "packages/*/src/**/*",
    "apps/*/src/**/*",
    "tools/*/src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.d.ts"
  ]
}
```

## ⚡ Vite 配置

### Web 应用配置 (`apps/web/vite.config.ts`)

```typescript
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@shared": resolve(__dirname, "../../packages/shared/src"),
      "@components": resolve(__dirname, "../../packages/components/src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

### 组件库配置 (`packages/components/vite.config.ts`)

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@shared': resolve(__dirname, '../../packages/shared/src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DemoComponents',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  }
})
```

## 🔗 路径别名

### TypeScript 路径映射

```json
{
  "@/*": ["./packages/*/src"],
  "@shared/*": ["./packages/shared/src"],
  "@components/*": ["./packages/components/src"]
}
```

### Vite 别名

```typescript
{
  "@": "src",
  "@shared": "../../packages/shared/src",
  "@components": "../../packages/components/src"
}
```

## 📦 包依赖管理

### Web 应用依赖

```json
{
  "dependencies": {
    "@demo/shared": "workspace:*",
    "@demo/components": "workspace:*",
    "vue": "^3.4.0",
    "vue-router": "4"
  }
}
```

### 组件库依赖

```json
{
  "dependencies": {
    "vue": "^3.4.0"
  },
  "peerDependencies": {
    "vue": "^3.4.0"
  }
}
```

## 🛠️ 开发脚本

### 根目录脚本

```json
{
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r build",
    "build:components": "pnpm --filter @demo/components build",
    "dev:web": "pnpm --filter @demo/web dev",
    "validate-config": "node scripts/validate-config.js"
  }
}
```

## ✅ 配置验证

运行配置验证脚本：

```bash
pnpm validate-config
```

该脚本会检查：
- 所有必需的配置文件是否存在
- 包依赖是否正确配置
- 路径别名是否正确设置

## 📋 最佳实践

### 1. 配置继承

- 所有子项目都应该继承根目录的配置
- 避免在子项目中重复定义相同的配置
- 使用 `require()` 或 `import` 来继承配置

### 2. 路径别名

- 使用统一的路径别名规范
- 确保 TypeScript 和 Vite 的别名配置一致
- 优先使用相对路径而不是绝对路径

### 3. 依赖管理

- 使用 workspace 管理包依赖
- 避免版本冲突
- 合理使用 peerDependencies

### 4. 构建配置

- 为不同用途的包使用不同的构建配置
- 组件库使用 lib 模式构建
- 应用使用标准模式构建

## 🔄 配置更新流程

1. **修改根配置**：更新根目录的配置文件
2. **更新子项目**：确保子项目继承根配置
3. **验证配置**：运行 `pnpm validate-config`
4. **测试构建**：确保所有包都能正常构建
5. **更新文档**：更新相关文档和说明

## 🚨 注意事项

- 修改配置后需要重新启动开发服务器
- 确保所有子项目的 TypeScript 配置兼容
- 注意 Tailwind CSS 的 content 配置要包含所有相关文件
- 保持 Vite 配置的别名与 TypeScript 路径映射一致 