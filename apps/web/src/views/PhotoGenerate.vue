<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="flex flex-row items-center justify-around w-full">
      <p>
        <label>输入：</label
        ><input
          class="border-2 border-gray-300 rounded-md p-2"
          v-model="question"
        />
      </p>
      <button @click="handleClick">提交</button>
    </div>
    <div class="output">
      <div>{{ content }}</div>
      <img class="w-1/2" :src="content" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const question = ref("");
const content = ref("");
const handleClick = async () => {
  content.value = "";

  const response = await fetch(
    "http://localhost:3001/api/photos/generatePhoto",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: question.value,
      }),
    }
  );

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let buffer = "";
  while (!done) {
    const { value, done: doneReading } = await (reader?.read() as Promise<{
      value: Uint8Array;
      done: boolean;
    }>);
    done = doneReading;
    const chunkValue = buffer + decoder.decode(value);
    buffer = "";
    const lines = chunkValue
      .split("\n")
      .filter((line) => line.startsWith("data: "));
    for (const line of lines) {
      const incoming = line.slice(6);
      if (incoming === "[DONE]") {
        done = true;
        break;
      }
      try {
        const data = JSON.parse(incoming);
        if (data.type === "image_generation.partial_succeeded") {
          content.value = data.url;
        }
      } catch {
        buffer += `data: ${incoming}`;
      }
    }
  }
};
</script>
