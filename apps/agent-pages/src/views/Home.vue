<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ appTitle }}</h1>
        <p class="text-xl text-gray-600 mb-12">{{ appDescription }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-2">代理列表</h3>
            <p class="text-gray-600 mb-4">查看和管理所有智能代理</p>
            <router-link
              to="/agents"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              查看代理
            </router-link>
          </div>

          <div
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-2">创建代理</h3>
            <p class="text-gray-600 mb-4">创建新的智能代理</p>
            <router-link
              to="/agents/create"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              创建代理
            </router-link>
          </div>

          <div
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-2">系统设置</h3>
            <p class="text-gray-600 mb-4">配置系统参数和偏好</p>
            <router-link
              to="/settings"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              系统设置
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getEnv } from '@/utils/env'

// 首页组件逻辑
const appTitle = getEnv.appTitle()
const appDescription = getEnv.appDescription()
</script>
