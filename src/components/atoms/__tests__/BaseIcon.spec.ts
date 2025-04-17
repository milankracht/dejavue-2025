import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import BaseIcon from '../BaseIcon.vue';

vi.mock('@/assets/icons/test-icon.svg', () => ({
  default: { name: 'test-icon' },
}));
vi.mock('@/assets/icons/another-icon.svg', () => ({
  default: { name: 'another-icon' },
}));

describe('BaseIcon.vue', () => {
  it.skip('renders the icon with the correct size and color', async () => {
    const wrapper = mount(BaseIcon, {
      props: {
        icon: 'test-icon',
        size: 32,
        color: '#ff0000',
      },
    });

    await wrapper.vm.$nextTick();

    const iconDiv = wrapper.find('.icon');
    expect(iconDiv.attributes('style')).toContain('width: 32px; height: 32px');

    const svgComponent = wrapper.findComponent({ name: 'test-icon' });
    expect(svgComponent.attributes('style')).toContain('fill: #ff0000');
  });

  it.skip('renders a default size and color when not provided', async () => {
    const wrapper = mount(BaseIcon, {
      props: {
        icon: 'test-icon',
      },
    });

    await wrapper.vm.$nextTick();

    const iconDiv = wrapper.find('.icon');
    expect(iconDiv.attributes('style')).toContain('width: 24px; height: 24px');

    const svgComponent = wrapper.findComponent({ name: 'test-icon' });
    expect(svgComponent.attributes('style')).toContain('fill: #ffffff');
  });

  it('warns when the icon is not found', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mount(BaseIcon, {
      props: {
        icon: 'non-existent-icon',
      },
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Icon not found: non-existent-icon'),
    );

    consoleWarnSpy.mockRestore();
  });
});
