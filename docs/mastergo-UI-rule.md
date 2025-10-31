# 基于 MasterGo MCP UI DSL 生成 Vue3 组件的提示词
请基于提供的 MasterGo MCP UI DSL 内容，生成符合以下要求的 Vue3 单文件组件（SFC）代码：
1. 技术栈规范
    * 框架：使用 Vue3 语法，采用<script setup>语法糖
    * 组件库：所有 UI 元素优先使用 Element Plus 组件（如按钮用<el-button>、输入框用<el-input>等）
    * 样式方案：完全使用 Tailwind CSS 实现样式，不编写自定义 CSS，样式类名需与 DSL 中的布局 / 间距 / 尺寸严格对应
    * 禁止使用任何 CSS 预处理器（如 SCSS/Sass）
2. 组件逻辑约束
    * 组件内部不得包含任何业务逻辑，所有动态数据必须通过 props 接收
    * 所有交互行为（点击、输入、选择等）必须通过 props 传递回调函数（如@click="props.onClick"）
    * 不允许在组件内部定义 ref/reactive 等响应式变量，不使用 watch/computed
    * 不引入任何工具函数或额外模块，仅保留组件基础结构
3. props 设计要求
    * 需根据 DSL 中的动态内容自动推断 props 类型（使用 TypeScript 接口定义）
    * 交互类 props 命名需遵循on+动作格式（如onSubmit、onChange）
    * 数据类 props 需明确类型（如title: string、list: Array<ItemType>）
4. 结构映射规则
    * 严格按照 DSL 中的层级结构生成组件嵌套关系
    * DSL 中的布局容器（如 Frame、Group）需转换为 Vue 模板中的布局标签（结合 Tailwind 的 flex/grid 类）
    * 间距 / 尺寸数值需精确转换为 Tailwind 对应的类名（如 24px 间距对应gap-6）
    * 样式属性（颜色、圆角、阴影等）需直接映射为 Tailwind 工具类
    * 布局内容间距等内容使用 px 单位
5. 输出格式
    * 仅返回完整的 Vue 单文件组件代码（.vue 文件内容）
    * 代码需包含完整的<template>、<script setup lang="ts">和<style>标签<style>标签内仅需添加@apply或基础样式引入，禁止复杂样式逻辑
6. 组件映射
    * 将 name 为 button-1 生成为 button-1 组件，引用地址为 @/components/Button.vue