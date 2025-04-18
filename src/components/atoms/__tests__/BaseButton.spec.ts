import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../BaseButton.vue';
import Icon from '../BaseIcon.vue';

vi.mock('../BaseIcon.vue', () => ({
  default: {
    template: '<svg class="mock-icon"></svg>',
  },
}));

describe('BaseButton.vue', () => {
  it('renders with the default type class when no type is provided', () => {
    const wrapper = mount(BaseButton);
    expect(wrapper.classes()).toContain('btn--primary');
  });

  it('does not emit handleClick event when disabled', async () => {
    const handleClick = vi.fn();
    const wrapper = mount(BaseButton, {
      props: { disabled: true, handleClick },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('handleClick')).toBeFalsy();
  });

  it('applies the correct styles when an icon is provided', () => {
    const wrapper = mount(BaseButton, {
      props: { icon: 'check', iconPosition: 'left' },
      global: {
        components: { Icon },
      },
    });
    expect(wrapper.find('.btn').classes()).toContain('btn--primary');
    expect(wrapper.findComponent(Icon).exists()).toBe(true);
  });

  it('renders without an icon when no icon prop is provided', () => {
    const wrapper = mount(BaseButton);
    const icon = wrapper.findComponent(Icon);
    expect(icon.exists()).toBe(false);
  });

  it('renders custom slot content with an icon', () => {
    const wrapper = mount(BaseButton, {
      props: { icon: 'check', iconPosition: 'right' },
      slots: { default: '<span>Custom Content</span>' },
      global: {
        components: { Icon },
      },
    });
    expect(wrapper.html()).toContain('<span>Custom Content</span>');
    expect(wrapper.findComponent(Icon).exists()).toBe(true);
  });

  it('renders correctly when no slot content is provided', () => {
    const wrapper = mount(BaseButton);
    expect(wrapper.find('.btn__label').exists()).toBe(false);
  });

  it('applies the correct class when iconPosition is invalid', () => {
    const wrapper = mount(BaseButton, {
      props: { icon: 'check', iconPosition: 'invalid' },
      global: {
        components: { Icon },
      },
    });
    expect(wrapper.findComponent(Icon).exists()).toBe(false);
  });
});
