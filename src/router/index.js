import Vue from 'vue';
import VueRouter from 'vue-router';
import LogIn from '../views/LogIn.vue';
import PageNotFound from '../views/PageNotFound.vue';
import { authGuard } from '../utils';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/admin/dashboard',
    name: 'Admin',
    props: true,
    beforeEnter: authGuard,
    component: () => import('../views/Admin/views/DashBoard.vue')
  },
  {
    path: '/admin/agencies',
    beforeEnter: authGuard,
    name: 'Agencies',
    component: () => import('../views/Admin/views/Agencies.vue')
  },
  {
    path: '/admin/agents',
    beforeEnter: authGuard,
    name: 'Agents',
    component: () => import('../views/Admin/views/Agents.vue')
  },
  {
    path: '/admin/metricts',
    beforeEnter: authGuard,
    name: 'Metrics',
    component: () => import('../views/Admin/views/Metrics.vue')
  },
  {
    path: '/client',
    name: 'Client',
    props: true,
    beforeEnter: authGuard,
    component: () => import('../views/Client/Client.vue')
  },
  {
    path: '/about',
    name: 'About',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound,
    props: { state: JSON.parse(localStorage.getItem('vuex')), default: true, status: 404, message: 'Page Not Found' }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
