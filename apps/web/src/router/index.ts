import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/App.vue"),
    },
    {
      path: "/mastergo",
      name: "mastergo",
      component: () => import("@/views/MasterGoDemo.vue"),
    },
  ],
});

export default router;
