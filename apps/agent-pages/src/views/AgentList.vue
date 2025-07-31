<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">代理列表</h1>
        <router-link
          to="/agents/create"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          创建代理
        </router-link>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li
            v-for="agent in agents"
            :key="agent.id"
            class="px-6 py-4 hover:bg-gray-50"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center"
                  >
                    <span class="text-white font-medium">{{
                      agent.name.charAt(0)
                    }}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ agent.name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ agent.description }}
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <span
                  :class="getStatusClass(agent.status)"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ agent.status }}
                </span>
                <router-link
                  :to="`/agents/${agent.id}`"
                  class="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  查看详情
                </router-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Agent {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "pending";
}

const agents = ref<Agent[]>([
  {
    id: "1",
    name: "客服代理",
    description: "智能客服助手，提供24/7客户支持",
    status: "active",
  },
  {
    id: "2",
    name: "数据分析代理",
    description: "数据分析专家，提供深度洞察",
    status: "active",
  },
  {
    id: "3",
    name: "营销代理",
    description: "营销策略专家，优化推广效果",
    status: "inactive",
  },
]);

const getStatusClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>
