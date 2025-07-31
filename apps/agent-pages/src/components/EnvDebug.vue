<template>
  <div v-if="showDebug" class="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-md">
    <h4 class="font-bold mb-2">环境变量调试</h4>
    <div class="space-y-1">
      <div><strong>环境:</strong> {{ envVars.mode }}</div>
      <div><strong>应用标题:</strong> {{ envVars.app.title }}</div>
      <div><strong>API地址:</strong> {{ envVars.api.baseUrl }}</div>
      <div><strong>最大代理数:</strong> {{ envVars.agents.maxAgents }}</div>
      <div><strong>调试模式:</strong> {{ envVars.features.debug ? '开启' : '关闭' }}</div>
      <div><strong>通知:</strong> {{ envVars.features.notifications ? '开启' : '关闭' }}</div>
    </div>
    <button 
      @click="showDebug = false" 
      class="mt-2 text-blue-300 hover:text-white"
    >
      关闭
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllEnvVars, isDevelopment } from '@/utils/env'

const showDebug = ref(false)
const envVars = ref(getAllEnvVars())

onMounted(() => {
  // 只在开发环境显示调试信息
  if (isDevelopment()) {
    showDebug.value = true
  }
})
</script> 