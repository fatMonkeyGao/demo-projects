// Our official coze sdk for JavaScript [coze-js](https://github.com/coze-dev/coze-js)
import { CozeAPI } from "@coze/api";

const apiClient = new CozeAPI({
  token:
    "cztei_hqiuUkSbmpWnlbS6v5B5lkJ0KkFUlmYidqN2f4jrXdYYuga8UVQTJa6hLloVk0Ws0",
  baseURL: "https://api.coze.cn",
});
const res = await apiClient.workflows.runs.create({
  workflow_id: "7522658628480155690",
  parameters: {
    input: "伏羲追日\n",
  },
});
