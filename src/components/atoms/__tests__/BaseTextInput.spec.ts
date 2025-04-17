import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import BaseTextInput from '../BaseTextInput.vue';

describe('BaseTextInput.vue', () => {
  it('renders the input with the correct initial value', () => {
    const wrapper = mount(BaseTextInput, {
      props: {
        value: 'Initial Value',
      },
    });

    const input = wrapper.find('input');
    expect(input.element.value).toBe('Initial Value');
  });

  it('emits "handleChange" with the correct value after debounce', async () => {
    vi.useFakeTimers();

    const wrapper = mount(BaseTextInput, {
      props: {
        value: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('New Value');

    vi.advanceTimersByTime(300);

    expect(wrapper.emitted('handleChange')).toBeTruthy();
    expect(wrapper.emitted('handleChange')![0]).toEqual(['New Value']);

    vi.useRealTimers();
  });

  it('updates the input value when the "value" prop changes', async () => {
    const wrapper = mount(BaseTextInput, {
      props: {
        value: 'Initial Value',
      },
    });

    await wrapper.setProps({ value: 'Updated Value' });

    const input = wrapper.find('input');
    expect(input.element.value).toBe('Updated Value');
  });

  it('clears the debounce timeout when the component is destroyed', async () => {
    vi.useFakeTimers();

    const wrapper = mount(BaseTextInput, {
      props: {
        value: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('New Value');

    wrapper.unmount();

    vi.advanceTimersByTime(300);

    expect(wrapper.emitted('handleChange')).toBeFalsy();

    vi.useRealTimers();
  });
});
