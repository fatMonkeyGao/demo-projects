<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <!-- 主容器 -->
    <div class="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="flex flex-col md:flex-row">
        <!-- 左侧图片区域 -->
        <div class="md:w-1/2">
          <div class="relative h-80 md:h-full">
            <img
              src="https://mastergo.iflytek.com/mastergo-default/57000091966935/57000091966937/0253390f8f56dcc4e87a3061096f2ae1.png"
              alt="Featured image"
              class="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
        </div>

        <!-- 右侧内容区域 -->
        <div class="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <!-- 文本内容 -->
          <div class="space-y-6">
            <!-- 标题 -->
            <h2 class="text-2xl font-bold text-gray-900 leading-tight">
              We need to index the haptic GB card.
            </h2>

            <!-- 描述文本 -->
            <p class="text-gray-600 leading-relaxed">
              If we navigate the port, we can get to the AGP microchip through
              the bluetooth SDD alarm.
            </p>
          </div>

          <!-- 底部用户信息和箭头 -->
          <div class="flex items-center justify-between pt-6">
            <!-- 用户信息 -->
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://mastergo.iflytek.com/mastergo-default/57000091966935/57000091966937/61d8390c74588bec24c0634635cf3880.png"
                  alt="Darlene Robertson"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 text-sm">
                  Darlene Robertson
                </h4>
                <p class="text-gray-500 text-xs">March 12, 2021</p>
              </div>
            </div>

            <!-- 箭头图标 -->
            <div class="w-10 h-10 flex items-center justify-center">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="text-blue-500"
              >
                <path
                  d="M6.96159e-30 8.75158C-1.11022e-15 8.42006 0.131696 8.10212 0.366117 7.8677C0.600537 7.63328 0.918479 7.50158 1.25 7.50158C1.25 7.50158 15.7325 7.50158 15.7325 7.50158C15.7325 7.50158 10.365 2.13658 10.365 2.13658C10.1303 1.90186 9.99842 1.58352 9.99842 1.25158C9.99842 0.91964 10.1303 0.601296 10.365 0.366579C10.5997 0.131863 10.9181 0 11.25 0C11.5819 0 11.9003 0.131863 12.135 0.366579C12.135 0.366579 19.635 7.86658 19.635 7.86658C19.7514 7.98269 19.8438 8.12063 19.9068 8.2725C19.9698 8.42436 20.0022 8.58716 20.0022 8.75158C20.0022 8.916 19.9698 9.0788 19.9068 9.23066C19.8438 9.38253 19.7514 9.52047 19.635 9.63658C19.635 9.63658 12.135 17.1366 12.135 17.1366C11.9003 17.3713 11.5819 17.5032 11.25 17.5032C10.9181 17.5032 10.5997 17.3713 10.365 17.1366C10.1303 16.9019 9.99842 16.5835 9.99842 16.2516C9.99842 15.9196 10.1303 15.6013 10.365 15.3666C10.365 15.3666 15.7325 10.0016 15.7325 10.0016C15.7325 10.0016 1.25 10.0016 1.25 10.0016C0.918479 10.0016 0.600537 9.86988 0.366117 9.63546C0.131696 9.40104 -1.11022e-15 9.0831 6.96159e-30 8.75158C6.96159e-30 8.75158 6.96159e-30 8.75158 6.96159e-30 8.75158Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 组件名称
defineOptions({
  name: "MasterGoDemo",
});

// 响应式数据
const title = ref("We need to index the haptic GB card.");
const description = ref(
  "If we navigate the port, we can get to the AGP microchip through the bluetooth SDD alarm."
);
const author = ref("Darlene Robertson");
const date = ref("March 12, 2021");

// 图片URL
const featuredImage = ref(
  "https://mastergo.iflytek.com/mastergo-default/57000091966935/57000091966937/0253390f8f56dcc4e87a3061096f2ae1.png"
);
const avatarImage = ref(
  "https://mastergo.iflytek.com/mastergo-default/57000091966935/57000091966937/61d8390c74588bec24c0634635cf3880.png"
);
</script>

<style scoped>
/* 自定义样式变量 - 基于DSL中的token */
:root {
  /* Colors - 基于DSL中的paint tokens */
  --color-white: #ffffff; /* paint_1:037 - Whites/White */
  --color-high-emphasis: #313237; /* paint_1:048 - Blacks/High emphasis */
  --color-mid-emphasis: #718797; /* paint_1:054 - Blacks/Mid emphasis */
  --color-primary: #5374ff; /* paint_1:064 - AppColors/ppl */

  /* Typography - 基于DSL中的font tokens */
  --font-heading: "Amiko-Bold", sans-serif; /* font_1:070 - Headings/Heading */
  --font-body: "Inter-Regular", sans-serif; /* font_1:074 - Body/body */
  --font-body-bold:
    "Inter-SemiBold", sans-serif; /* font_1:047 - Body/BodyBold */
  --font-caption: "Inter-Regular", sans-serif; /* font_1:053 - Other/caption */
}

/* 响应式设计优化 */
@media (max-width: 768px) {
  .max-w-4xl {
    max-width: 100%;
  }
}

/* 悬停效果 */
.max-w-4xl:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

/* 图片加载优化 */
img {
  transition: opacity 0.3s ease;
}

img[src] {
  opacity: 1;
}

img:not([src]) {
  opacity: 0;
}
</style>
