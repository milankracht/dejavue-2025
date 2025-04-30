import { describe, it, expect } from 'vitest';
import navigationHistory from './navigationHistory';

describe('navigationHistory', () => {
  it('should return "/" when the navigation stack is empty', () => {
    expect(navigationHistory.lastRoute()).toBe('/');
  });

  it('should return the last pushed path when the stack is not empty', () => {
    navigationHistory.addRoute('/home');
    navigationHistory.addRoute('/about');
    expect(navigationHistory.lastRoute()).toEqual({ path: '/about' });
  });

  it('should update the last path after popping an entry', () => {
    navigationHistory.addRoute('/home');
    navigationHistory.addRoute('/about');
    navigationHistory.removeLastRoute();
    expect(navigationHistory.lastRoute()).toEqual({ path: '/home' });
  });
});
