import { createRouter, createWebHistory } from 'vue-router';
import navigationHistory from '@/store/navigationHistory';

import HomeView from '../views/HomeView.vue';
import ShowView from '@/views/ShowView.vue';
import SearchView from '@/views/SearchView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/show/:id',
      name: 'show',
      component: ShowView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const lastPath: string = navigationHistory.lastRoute().path?.toString() || '/';

  if (to.fullPath === lastPath) {
    navigationHistory.removeLastRoute();
  } else if (to.name !== from.name) {
    navigationHistory.addRoute(from.fullPath);
  }

  next();
});

export default router;
