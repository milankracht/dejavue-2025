import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DvLogo from '../DvLogo.vue';
import { RouterLink, createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('DvLogo.vue', () => {
  it('renders the logo text correctly', () => {
    const wrapper = mount(DvLogo, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toBe('DéjaVue');
  });

  it('renders a RouterLink with correct to attribute', () => {
    const wrapper = mount(DvLogo, {
      global: {
        plugins: [router],
      },
    });

    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.props('to')).toBe('/');
  });
});
