import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

const CoachDetail = defineAsyncComponent(() =>
  import("./views/coaches/CoachDetail.vue")
);
const CoachRegistration = defineAsyncComponent(() =>
  import("./views/coaches/CoachRegistration.vue")
);
const UserAuth = defineAsyncComponent(() =>
  import("./views/auth/UserAuth.vue")
);
const CoachesList = defineAsyncComponent(() =>
  import("./views/coaches/CoachesList.vue")
);
const ContactCoach = defineAsyncComponent(() =>
  import("./views/requests/ContactCoach.vue")
);
const RequestReceived = defineAsyncComponent(() =>
  import("./views/requests/RequestReceived.vue")
);
const NotFound = defineAsyncComponent(() => import("./views/NotFound.vue"));

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
