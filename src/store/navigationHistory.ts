import { reactive } from 'vue';
import type { RouteParamsRaw } from 'vue-router';

/**
 * Sets up a navigation history stack using Vue Router.
 * This allows you to push new routes onto the stack, pop the last route off, depending on the flow user follows.
 * Needed to handle the back button in certain views.
 */

const state = reactive<{
  navigationStack: RouteParamsRaw[];
}>({
  navigationStack: [],
});

const addRoute = (path: string): void => {
  state.navigationStack.push({ path });
};

const removeLastRoute = () => {
  return state.navigationStack.pop();
};

const lastRoute = () => {
  return state.navigationStack[state.navigationStack.length - 1] || '/';
};

export default {
  state,
  addRoute,
  removeLastRoute,
  lastRoute,
};
