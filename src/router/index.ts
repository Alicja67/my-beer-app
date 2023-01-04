import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    // {
    //   path: '/beer/:id',
    //   name: 'Beers',
    //   component: BeerView,
    // },
    // {
    //   path: '/:catchAll(.*)',
    //   name: 'PageNotFound',
    //   component: PageNotFound,
    // },
  ],
});
