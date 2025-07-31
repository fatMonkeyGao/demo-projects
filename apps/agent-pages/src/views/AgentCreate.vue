<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <router-link
          to="/agents"
          class="text-blue-600 hover:text-blue-900 text-sm font-medium"
        >
          ← 返回代理列表
        </router-link>
      </div>

      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
            创建新代理
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                代理名称
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入代理名称"
              />
            </div>

            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
              >
                描述
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入代理描述"
              />
            </div>

            <div>
              <label for="type" class="block text-sm font-medium text-gray-700">
                代理类型
              </label>
              <select
                id="type"
                v-model="form.type"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">请选择代理类型</option>
                <option value="customer-service">客服代理</option>
                <option value="data-analysis">数据分析代理</option>
                <option value="marketing">营销代理</option>
                <option value="research">研究代理</option>
              </select>
            </div>

            <div>
              <label
                for="status"
                class="block text-sm font-medium text-gray-700"
              >
                状态
              </label>
              <select
                id="status"
                v-model="form.status"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="active">激活</option>
                <option value="inactive">未激活</option>
                <option value="pending">待处理</option>
              </select>
            </div>

            <div class="flex justify-end space-x-4">
              <router-link
                to="/agents"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                取消
              </router-link>
              <button
                type="submit"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                创建代理
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  name: "",
  description: "",
  type: "",
  status: "active",
});

const handleSubmit = () => {
  // 这里可以添加表单验证逻辑
  console.log("创建代理:", form.value);

  // 模拟创建成功，跳转到代理列表
  router.push("/agents");
};
</script>
