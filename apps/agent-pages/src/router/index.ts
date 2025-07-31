import { RouteName, RoutePath } from "@/enums/router";
import AgentCreate from "@/views/AgentCreate.vue";
import AgentDetail from "@/views/AgentDetail.vue";
import AgentList from "@/views/AgentList.vue";
import Home from "@/views/Home.vue";
import Settings from "@/views/Settings.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: RoutePath.HOME,
      name: RouteName.HOME,
      component: Home,
    },
    {
      path: RoutePath.AGENT_LIST,
      name: RouteName.AGENT_LIST,
      component: AgentList,
    },
    {
      path: RoutePath.AGENT_DETAIL,
      name: RouteName.AGENT_DETAIL,
      component: AgentDetail,
    },
    {
      path: RoutePath.AGENT_CREATE,
      name: RouteName.AGENT_CREATE,
      component: AgentCreate,
    },
    {
      path: RoutePath.SETTINGS,
      name: RouteName.SETTINGS,
      component: Settings,
    },
  ],
});

export default router;
