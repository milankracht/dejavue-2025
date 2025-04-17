import { createRouter, createWebHistory } from 'vue-router';
import { useNavigationHistory } from '@/composables/useNavigationHistory';

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
  const nav = useNavigationHistory();

  const lastPath: string = nav.last().path?.toString() || '/';

  if (to.fullPath === lastPath) {
    nav.pop();
  } else if (to.name !== from.name) {
    nav.push(from.fullPath);
  }

  next();
});

export default router;
