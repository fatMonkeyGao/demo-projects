<template>
  <div class="container">
    <div>
      <label>输入：</label><input class="input" v-model="question" />
      <button @click="handleClick">提交</button>
    </div>
    <div class="output">
      <div>
        <label>Streaming</label><input type="checkbox" v-model="stream" />
      </div>
      <div>{{ content }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
onMounted(() => {
  console.log("LLM View mounted");
});

const question = ref("");
const stream = ref(false);
const content = ref("");
const handleClick = async () => {
  const response = await fetch(
    // "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
    "http://localhost:3001/api/chat/agent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        stream: true,
        model: "doubao-seed-1-6-251015",
        messages: [{ role: "user", content: question.value }],
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
        const delta = data.choices[0].delta.content;
        if (delta) content.value += delta;
      } catch {
        buffer += `data: ${incoming}`;
      }
    }
  }
};
</script>
