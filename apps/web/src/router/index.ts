import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/agent-chat",
      name: "agent-chat",
      component: () => import("@/views/AgentChat.vue"),
    },
    {
      path: "/mastergo",
      name: "mastergo",
      component: () => import("@/views/MasterGoDemo.vue"),
    },
    {
      path: "/components",
      name: "components",
      component: () => import("@/views/ComponentsDemo.vue"),
    },
    {
      path: "/filter-headers",
      name: "filter-headers",
      component: () => import("@/views/FilterHeaders.vue"),
    },
    {
      path: "/filter-headers2",
      name: "filter-headers2",
      component: () => import("@/views/FilterHeaders2.vue"),
    },
    {
      path: "/filter-selector",
      name: "filter-selector",
      component: () => import("@/views/FilterSelector.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Main.vue"),
    },
  ],
});

export default router;
