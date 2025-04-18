import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DvLogo from '../DvLogo.vue';
import { RouterLink } from 'vue-router';

describe('DvLogo.vue', () => {
  it.skip('renders the logo text correctly', () => {
    const wrapper = mount(DvLogo, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });
    expect(wrapper.text()).toBe('DéjaVue');
  });

  it('renders a RouterLink with correct to attribute', () => {
    const wrapper = mount(DvLogo, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    });

    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.props('to')).toBe('/');
  });
});
