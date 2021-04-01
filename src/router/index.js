import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './dashboard';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/race',
  },
  {
    path: '*',
    redirect: '/race',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.addRoute(Dashboard);

export default router
