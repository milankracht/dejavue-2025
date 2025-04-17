import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseTag from '../BaseTag.vue';

describe('BaseTag.vue', () => {
  it('renders the correct label', () => {
    const wrapper = mount(BaseTag, {
      props: {
        label: 'Test Tag',
      },
    });

    expect(wrapper.text()).toBe('Test Tag');
  });

  it('has the correct structure and class', () => {
    const wrapper = mount(BaseTag, {
      props: {
        label: 'Test Tag',
      },
    });

    const tagDiv = wrapper.find('.tag');
    expect(tagDiv.exists()).toBe(true);
    expect(tagDiv.classes()).toContain('tag');
  });
});
