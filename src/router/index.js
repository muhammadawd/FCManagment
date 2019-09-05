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
    // this route requires auth, check if logged in
    if (true) {
      // next({
      //   name: 'login', // query: {redirect: to.fullPath}
      // })
      next()
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});

export default router;
