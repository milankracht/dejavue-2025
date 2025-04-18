import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseHeader from '../BaseHeader.vue';
import Logo from '@/components/molecules/DvLogo.vue';
import SearchBar from '@/components/molecules/SearchBar.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('BaseHeader.vue', () => {
  it('renders the BaseHeader component', async () => {
    const wrapper = mount(BaseHeader, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the Logo component inside .header-left', async () => {
    const wrapper = mount(BaseHeader, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    const logo = wrapper.findComponent(Logo);
    expect(logo.exists()).toBe(true);
    expect(wrapper.find('.header-left').exists()).toBe(true);
  });

  it('renders the SearchBar component inside .header-center', async () => {
    const wrapper = mount(BaseHeader, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    const searchBar = wrapper.findComponent(SearchBar);
    expect(searchBar.exists()).toBe(true);
    expect(wrapper.find('.header-center').exists()).toBe(true);
  });

  it('renders an empty .header-right div', async () => {
    const wrapper = mount(BaseHeader, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    const headerRight = wrapper.find('.header-right');
    expect(headerRight.exists()).toBe(true);
    expect(headerRight.text()).toBe('');
  });
});
