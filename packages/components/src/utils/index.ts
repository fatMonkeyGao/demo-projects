// 组件库工具函数

/**
 * 合并 CSS 类名
 * @param classes 类名数组或字符串
 * @returns 合并后的类名字符串
 */
export function mergeClasses(...classes: (string | string[] | undefined | null)[]): string {
  return classes
    .filter(Boolean)
    .flat()
    .join(' ')
}

/**
 * 生成组件 ID
 * @param prefix 前缀
 * @returns 唯一的组件 ID
 */
export function generateId(prefix = 'component'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param limit 限制时间
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
} 