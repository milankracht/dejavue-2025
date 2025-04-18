import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNavigationHistory } from '@/composables/useNavigationHistory';
import router from './index';

vi.mock('vue-router', () => ({
  createRouter: vi.fn(() => ({
    options: {
      routes: [
        { path: '/', name: 'home', component: {} },
        { path: '/show/:id', name: 'show', component: {} },
        { path: '/search', name: 'search', component: {} },
      ],
    },
    beforeEach: vi.fn(),
  })),
  createWebHistory: vi.fn(),
}));

vi.mock('@/composables/useNavigationHistory', () => ({
  useNavigationHistory: vi.fn(),
}));

describe('Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should configure routes correctly', () => {
    const routes = router.options.routes;
    expect(routes).toEqual([
      { path: '/', name: 'home', component: expect.anything() },
      { path: '/show/:id', name: 'show', component: expect.anything() },
      { path: '/search', name: 'search', component: expect.anything() },
    ]);
  });

  it('should call nav.pop() when navigating to the last path', async () => {
    const mockNav = {
      last: vi.fn(() => ({ path: '/search' })),
      pop: vi.fn(),
      push: vi.fn(),
    };
    (useNavigationHistory as vi.Mock).mockReturnValue(mockNav);

    const next = vi.fn();
    const mockBeforeEach = router.beforeEach as vi.Mock;
    interface NavigationHistory {
      last: () => { path: string };
      pop: () => void;
      push: (path: string) => void;
    }

    interface Route {
      fullPath: string;
      name?: string;
    }

    type NextFunction = () => void;

    mockBeforeEach.mockImplementation(async (to: Route, from: Route, nextFn: NextFunction) => {
      const nav: NavigationHistory = useNavigationHistory();
      const lastPath: string = nav.last().path?.toString() || '/';
      if (to.fullPath === lastPath) {
        nav.pop();
      } else if (to.name !== from.name) {
        nav.push(from.fullPath);
      }
      nextFn();
    });

    await mockBeforeEach({ fullPath: '/search' }, { fullPath: '/home' }, next);

    expect(mockNav.last).toHaveBeenCalled();
    expect(mockNav.pop).toHaveBeenCalled();
    expect(mockNav.push).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
