// Shared types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

import { readonly, ref } from "vue";

// Shared utilities
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("zh-CN");
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Vue composables
export const useCounter = () => {
  const count = ref(0);

  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => (count.value = 0);

  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
  };
};

// Re-export Vue utilities
export {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  readonly,
  ref,
  watch,
} from "vue";
