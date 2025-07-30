// 组件相关的类型定义

// 基础组件属性
export interface BaseComponentProps {
  class?: string | string[]
  style?: string | Record<string, any>
}

// 按钮组件属性
export interface ButtonProps extends BaseComponentProps {
  type?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

// 输入框组件属性
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  value?: string | number
  disabled?: boolean
  readonly?: boolean
}

// 卡片组件属性
export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  shadow?: boolean
  bordered?: boolean
} 