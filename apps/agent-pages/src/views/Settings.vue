<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">系统设置</h1>

      <div class="space-y-6">
        <!-- 基本设置 -->
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              基本设置
            </h3>
            <div class="space-y-4">
              <div>
                <label
                  for="appName"
                  class="block text-sm font-medium text-gray-700"
                >
                  应用名称
                </label>
                <input
                  id="appName"
                  v-model="settings.appName"
                  type="text"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  for="apiUrl"
                  class="block text-sm font-medium text-gray-700"
                >
                  API 地址
                </label>
                <input
                  id="apiUrl"
                  v-model="settings.apiUrl"
                  type="url"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 代理设置 -->
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              代理设置
            </h3>
            <div class="space-y-4">
              <div>
                <label
                  for="maxAgents"
                  class="block text-sm font-medium text-gray-700"
                >
                  最大代理数量
                </label>
                <input
                  id="maxAgents"
                  v-model="settings.maxAgents"
                  type="number"
                  min="1"
                  max="100"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  自动启动新代理
                </label>
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input
                      v-model="settings.autoStartAgents"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span class="ml-2 text-sm text-gray-900"
                      >启用自动启动功能</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 通知设置 -->
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              通知设置
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  邮件通知
                </label>
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input
                      v-model="settings.emailNotifications"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span class="ml-2 text-sm text-gray-900">启用邮件通知</span>
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  浏览器通知
                </label>
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input
                      v-model="settings.browserNotifications"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span class="ml-2 text-sm text-gray-900"
                      >启用浏览器通知</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-4">
          <button
            @click="resetSettings"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            重置设置
          </button>
          <button
            @click="saveSettings"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getEnv } from "@/utils/env";

interface Settings {
  appName: string;
  apiUrl: string;
  maxAgents: number;
  autoStartAgents: boolean;
  emailNotifications: boolean;
  browserNotifications: boolean;
}

const settings = ref<Settings>({
  appName: getEnv.appTitle(),
  apiUrl: getEnv.apiBaseUrl(),
  maxAgents: getEnv.maxAgents(),
  autoStartAgents: getEnv.autoStartAgents(),
  emailNotifications: false,
  browserNotifications: getEnv.enableNotifications(),
});

const saveSettings = () => {
  console.log("保存设置:", settings.value);
  // 这里可以添加保存逻辑
  alert("设置已保存");
};

const resetSettings = () => {
  settings.value = {
    appName: getEnv.appTitle(),
    apiUrl: getEnv.apiBaseUrl(),
    maxAgents: getEnv.maxAgents(),
    autoStartAgents: getEnv.autoStartAgents(),
    emailNotifications: false,
    browserNotifications: getEnv.enableNotifications(),
  };
};
</script>
