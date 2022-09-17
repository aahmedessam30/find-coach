import { createRouter, createWebHistory } from "vue-router";
import UserAuth from "./views/auth/UserAuth.vue";
import CoachesList from "./views/coaches/CoachesList.vue";
import CoachDetail from "./views/coaches/CoachDetail.vue";
import CoachRegistration from "./views/coaches/CoachRegistration.vue";
import ContactCoach from "./views/requests/ContactCoach.vue";
import RequestReceived from "./views/requests/RequestReceived.vue";
import NotFound from "./views/NotFound.vue";
import store from "./store/index.js";

const routes = [
  { path: "/", redirect: "/coaches" },
  { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
  { path: "/coaches", component: CoachesList },
  {
    path: "/coaches/:id",
    component: CoachDetail,
    props: true,
    children: [{ path: "contact", component: ContactCoach }],
  },
  {
    path: "/register",
    component: CoachRegistration,
    meta: { requiresAuth: true },
  },
  {
    path: "/requests",
    component: RequestReceived,
    meta: { requiresAuth: true },
  },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});
    
export default router;
