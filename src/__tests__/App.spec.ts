import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Header from '@/components/structures/BaseHeader.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: { template: '<div>Home</div>' },
    },
  ],
});

describe('App.vue', () => {
  it('should render the Header component', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();
    expect(wrapper.findComponent(Header).exists()).toBe(true);
  });

  it('should render the RouterView component', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
  });
});
