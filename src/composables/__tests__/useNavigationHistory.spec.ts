import { describe, it, expect } from 'vitest';
import { useNavigationHistory } from '../useNavigationHistory';

describe('useNavigationHistory', () => {
  it('should return "/" when the navigation stack is empty', () => {
    const { last } = useNavigationHistory();
    expect(last()).toBe('/');
  });

  it('should return the last pushed path when the stack is not empty', () => {
    const { push, last } = useNavigationHistory();
    push('/home');
    push('/about');
    expect(last()).toEqual({ path: '/about' });
  });

  it('should update the last path after popping an entry', () => {
    const { push, pop, last } = useNavigationHistory();
    push('/home');
    push('/about');
    pop();
    expect(last()).toEqual({ path: '/home' });
  });
});
