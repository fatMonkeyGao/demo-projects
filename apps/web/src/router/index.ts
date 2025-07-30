import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
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
      path: "/",
      name: "home",
      component: () => import("@/views/Main.vue"),
    },
  ],
});

export default router;
