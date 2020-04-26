import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let auth_data = ls.getFromStorage('auth_data');
    // this route requires auth, check if logged in
    if (!auth_data) {
      next({
        name: 'login', // query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
    // next()
  } else {
    next() // make sure to always call next()!
  }
});

export default router;
