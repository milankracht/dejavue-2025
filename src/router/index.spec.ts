import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';
import router from '@/router';
import navigationHistory from '@/store/navigationHistory';

vi.mock('@/views/HomeView.vue', () => ({ default: { name: 'HomeView' } }));
vi.mock('@/views/ShowView.vue', () => ({ default: { name: 'ShowView' } }));
vi.mock('@/views/SearchView.vue', () => ({ default: { name: 'SearchView' } }));

describe('Vue Router', () => {
  beforeEach(() => {
    navigationHistory.state.navigationStack = [];
  });

  it('should have the correct routes', () => {
    const routeNames = router.getRoutes().map((route) => route.name);
    expect(routeNames).toContain('home');
    expect(routeNames).toContain('show');
    expect(routeNames).toContain('search');
  });

  it('should push previous route to navigation stack', async () => {
    await router.push('/');
    await router.isReady();

    navigationHistory.state.navigationStack = [];

    await router.push('/search');

    expect(navigationHistory.state.navigationStack).toContainEqual({ path: '/' });
  });

  it('should not push the same route again', async () => {
    const localRouter = createTestRouter();
    navigationHistory.state.navigationStack = [];

    await localRouter.push('/');
    await localRouter.push('/');

    expect(navigationHistory.state.navigationStack.length).toBe(0);
  });

  it('should remove last route if navigating to the same path as last pushed route', async () => {
    const localRouter = createTestRouter();
    navigationHistory.state.navigationStack = [];

    await localRouter.push('/');
    await localRouter.push('/show/888');
    await localRouter.push('/search');

    expect(navigationHistory.state.navigationStack.length).toBe(2);

    await localRouter.push('/show/888');

    expect(navigationHistory.state.navigationStack.length).toBe(1);
    expect(navigationHistory.state.navigationStack).toEqual([{ path: '/' }]);
  });
});

function createTestRouter() {
  const localRouter = createRouter({
    history: createMemoryHistory(),
    routes: router.getRoutes(),
  });

  localRouter.beforeEach((to, from, next) => {
    const lastPath: string = navigationHistory.lastRoute().path?.toString() || '/';

    if (to.fullPath === lastPath) {
      navigationHistory.removeLastRoute();
    } else if (to.name !== from.name) {
      navigationHistory.addRoute(from.fullPath);
    }

    next();
  });

  return localRouter;
}
