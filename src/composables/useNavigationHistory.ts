import { ref } from 'vue';
import type { RouteParamsRaw } from 'vue-router';

const navigationStack = ref<RouteParamsRaw[]>([]);

export function useNavigationHistory() {
  function push(path: string): void {
    navigationStack.value.push({ path });
  }

  function pop() {
    return navigationStack.value.pop();
  }

  function last() {
    return navigationStack.value[navigationStack.value.length - 1];
  }

  return {
    navigationStack,
    push,
    pop,
    last,
  };
}
