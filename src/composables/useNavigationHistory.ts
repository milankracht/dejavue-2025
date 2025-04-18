import { ref } from 'vue';
import type { RouteParamsRaw } from 'vue-router';

const navigationStack = ref<RouteParamsRaw[]>([]);

/**
 * Sets up a navigation history stack using Vue Router.
 * This allows you to push new routes onto the stack, pop the last route off, depending on the flow user follows.
 * Needed to handle the back button in certain views.
 * @returns { navigationStack: Ref<RouteParamsRaw[]>, push: (path: string) => void, pop: () => RouteParamsRaw | undefined, last: () => string }
 */

export function useNavigationHistory() {
  function push(path: string): void {
    navigationStack.value.push({ path });
  }

  function pop() {
    return navigationStack.value.pop();
  }

  function last() {
    return navigationStack.value[navigationStack.value.length - 1] || '/';
  }

  return {
    navigationStack,
    push,
    pop,
    last,
  };
}
