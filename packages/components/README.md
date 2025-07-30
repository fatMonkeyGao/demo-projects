# @demo/components

基于 Vue3 和 Tailwind CSS 的公共 UI 组件库。

## 特性

- 🎨 基于 Tailwind CSS 设计系统
- ⚡ 使用 Vue3 Composition API
- 📦 支持 Tree-shaking
- 🔧 完整的 TypeScript 支持
- 🎯 现代化组件设计

## 安装

```bash
pnpm add @demo/components
```

## 使用

### 全局注册

```typescript
import { createApp } from 'vue'
import DemoComponents from '@demo/components'
import '@demo/components/dist/style.css'

const app = createApp(App)
app.use(DemoComponents)
app.mount('#app')
```

### 按需导入

```vue
<template>
  <Button type="primary" size="large" @click="handleClick">
    点击我
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@demo/components'

const handleClick = () => {
  console.log('按钮被点击了！')
}
</script>
```

## 组件

### Button 按钮

支持多种类型和尺寸的按钮组件。

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 'primary' \| 'secondary' \| 'danger' \| 'success' | 'primary' | 按钮类型 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 按钮尺寸 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | event: MouseEvent | 点击事件 |

#### 示例

```vue
<template>
  <div class="space-x-4">
    <Button type="primary">主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="danger">危险按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button loading>加载中</Button>
    <Button disabled>禁用按钮</Button>
  </div>
</template>
```

## 开发

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 类型检查

```bash
pnpm type-check
```

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── Button.vue      # 按钮组件
│   └── index.ts        # 组件导出
├── types/              # 类型定义
│   └── index.ts
├── utils/              # 工具函数
│   └── index.ts
└── index.ts            # 主入口文件
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT 