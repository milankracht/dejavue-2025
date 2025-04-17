import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import DataListItem from '../DataListItem.vue';
import DOMPurify from 'dompurify';

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((value) => value),
  },
}));

describe('DataListItem.vue', () => {
  it('renders the label and sanitized value correctly', () => {
    const mockItem = {
      label: 'Test Label',
      value: '<strong>Test Value</strong>',
    };

    const wrapper = mount(DataListItem, {
      props: {
        item: mockItem,
      },
    });

    const dt = wrapper.find('dt');
    const dd = wrapper.find('dd');

    expect(dt.text()).toBe('Test Label');
    expect(dd.html()).toContain('<strong>Test Value</strong>');
    expect(DOMPurify.sanitize).toHaveBeenCalledWith('<strong>Test Value</strong>');
  });
});
