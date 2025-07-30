<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">组件库演示</h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/"
              class="text-sm text-blue-600 hover:text-blue-800"
            >
              返回首页
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            @demo/components 组件库
          </h2>

          <div class="space-y-8">
            <!-- Button Components -->
            <section class="border rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Button 按钮组件
              </h3>

              <div class="space-y-4">
                <!-- Button Types -->
                <div>
                  <h4 class="text-lg font-medium text-gray-700 mb-3">
                    按钮类型
                  </h4>
                  <div class="flex flex-wrap gap-3">
                    <Button
                      type="primary"
                      @click="handleButtonClick('primary')"
                    >
                      主要按钮
                    </Button>
                    <Button
                      type="secondary"
                      @click="handleButtonClick('secondary')"
                    >
                      次要按钮
                    </Button>
                    <Button type="danger" @click="handleButtonClick('danger')">
                      危险按钮
                    </Button>
                    <Button
                      type="success"
                      @click="handleButtonClick('success')"
                    >
                      成功按钮
                    </Button>
                  </div>
                </div>

                <!-- Button Sizes -->
                <div>
                  <h4 class="text-lg font-medium text-gray-700 mb-3">
                    按钮尺寸
                  </h4>
                  <div class="flex flex-wrap items-center gap-3">
                    <Button
                      type="primary"
                      size="small"
                      @click="handleButtonClick('small')"
                    >
                      小按钮
                    </Button>
                    <Button
                      type="primary"
                      size="medium"
                      @click="handleButtonClick('medium')"
                    >
                      中按钮
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      @click="handleButtonClick('large')"
                    >
                      大按钮
                    </Button>
                  </div>
                </div>

                <!-- Button States -->
                <div>
                  <h4 class="text-lg font-medium text-gray-700 mb-3">
                    按钮状态
                  </h4>
                  <div class="flex flex-wrap gap-3">
                    <Button
                      type="primary"
                      loading
                      @click="handleButtonClick('loading')"
                    >
                      加载中
                    </Button>
                    <Button
                      type="primary"
                      disabled
                      @click="handleButtonClick('disabled')"
                    >
                      禁用按钮
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Component Info -->
            <section class="border rounded-lg p-6 bg-blue-50">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">组件信息</h3>
              <div class="space-y-2 text-sm text-gray-700">
                <p><strong>包名：</strong>@demo/components</p>
                <p><strong>版本：</strong>1.0.0</p>
                <p><strong>技术栈：</strong>Vue3 + TypeScript + Tailwind CSS</p>
                <p>
                  <strong>特性：</strong>支持 Tree-shaking、完整的 TypeScript
                  支持
                </p>
              </div>
            </section>

            <!-- Usage Example -->
            <section class="border rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">使用示例</h3>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre
                  class="text-green-400 text-sm overflow-x-auto"
                ><code>&lt;template&gt;
  &lt;Button type="primary" size="large" @click="handleClick"&gt;
    点击我
  &lt;/Button&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { Button } from '@demo/components'

const handleClick = () => {
  console.log('按钮被点击了！')
}
&lt;/script&gt;</code></pre>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@components";

const handleButtonClick = (type: string) => {
  console.log(`按钮被点击: ${type}`);
  alert(`你点击了 ${type} 按钮！`);
};
</script>
