<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Demo Projects</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">
              {{ formatDate(new Date()) }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Vue3 + TypeScript + Tailwind CSS
          </h2>

          <div class="space-y-6">
            <!-- Counter Component -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">计数器示例</h3>
              <div class="flex items-center space-x-4">
                <button @click="counter.decrement" class="btn btn-secondary">
                  -
                </button>
                <span class="text-2xl font-bold text-gray-900">
                  {{ counter.count }}
                </span>
                <button @click="counter.increment" class="btn btn-primary">
                  +
                </button>
                <button @click="counter.reset" class="btn btn-secondary">
                  重置
                </button>
              </div>
            </div>

            <!-- User List -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">用户列表</h3>
              <div class="space-y-2">
                <div
                  v-for="user in users"
                  :key="user.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <p class="font-medium text-gray-900">{{ user.name }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                  <span class="text-xs text-gray-400">ID: {{ user.id }}</span>
                </div>
              </div>
            </div>

            <!-- Search Input -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-4">搜索功能</h3>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="输入搜索内容..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p class="mt-2 text-sm text-gray-600">
                搜索结果: {{ searchResults }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { debounce, formatDate, useCounter, type User } from "@shared";
import { computed, ref, watch } from "vue";

// Counter logic
const counter = useCounter();

// User data
const users = ref<User[]>([
  { id: "1", name: "张三", email: "zhangsan@example.com" },
  { id: "2", name: "李四", email: "lisi@example.com" },
  { id: "3", name: "王五", email: "wangwu@example.com" },
]);

// Search functionality
const searchQuery = ref("");
const searchResults = computed(() => {
  if (!searchQuery.value) return "请输入搜索内容";
  const filtered = users.value.filter(
    (user) =>
      user.name.includes(searchQuery.value) ||
      user.email.includes(searchQuery.value)
  );
  return filtered.length > 0
    ? `找到 ${filtered.length} 个结果`
    : "未找到匹配结果";
});

// Debounced search
const debouncedSearch = debounce((query: string) => {
  console.log("搜索:", query);
}, 300);

// Watch search query changes
watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
});
</script>
