import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseHeading from '../BaseHeading.vue';

describe('BaseHeading.vue', () => {
  it('renders the correct heading tag based on the size prop', () => {
    const sizes = {
      xs: 'h6',
      sm: 'h5',
      md: 'h4',
      lg: 'h3',
      xl: 'h2',
      xxl: 'h1',
    };

    for (const [size, tag] of Object.entries(sizes)) {
      const wrapper = mount(BaseHeading, {
        props: { size: size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' },
        slots: { default: 'Test Heading' },
      });
      expect(wrapper.element.tagName.toLowerCase()).toBe(tag);
    }
  });

  it('renders slot content correctly', () => {
    const wrapper = mount(BaseHeading, {
      props: { size: 'md' },
      slots: { default: 'Test Heading' },
    });
    expect(wrapper.text()).toBe('Test Heading');
  });

  it('applies the correct class to the heading', () => {
    const wrapper = mount(BaseHeading, {
      props: { size: 'lg' },
      slots: { default: 'Test Heading' },
    });
    expect(wrapper.classes()).toContain('heading');
  });
});
