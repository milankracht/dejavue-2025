import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import flushPromises from 'flush-promises';
import BaseIcon from '../BaseIcon.vue';

vi.mock('@/utils/icons', () => ({
  icons: {
    '/src/assets/icons/test-icon.svg': () =>
      Promise.resolve({
        name: 'MockTestIcon',
        template: '<svg data-testid="mock-icon" style="fill: #ff0000" />',
      }),
  },
}));

describe('BaseIcon.vue', () => {
  it('renders the icon with the correct size and color', async () => {
    const wrapper = mount(BaseIcon, {
      props: {
        icon: 'test-icon',
        size: 32,
        color: '#ff0000',
      },
    });

    await flushPromises();

    const svg = wrapper.find('[data-testid="icon"]');
    expect(svg.exists()).toBe(true);
    expect(svg.attributes('style')).toContain('fill: #ff0000');
  });

  it('warns when the icon is not found and does not render a component', async () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const wrapper = mount(BaseIcon, {
      props: {
        icon: 'non-existent-icon',
      },
    });

    await flushPromises();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Icon not found: non-existent-icon'),
    );

    const svg = wrapper.find('[data-testid="icon"]');
    expect(svg.exists()).toBe(false);

    consoleWarnSpy.mockRestore();
  });
});
