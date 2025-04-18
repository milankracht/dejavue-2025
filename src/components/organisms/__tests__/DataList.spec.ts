import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DataList from '../DataList.vue';
import DataListItem from '@/components/molecules/DataListItem.vue';

vi.mock('@/components/molecules/DataListItem.vue', () => ({
  default: {
    template: '<dt>{{ item.label }}</dt><dd>{{ item.value }}</dd>',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  },
}));

describe('DataList.vue', () => {
  const items = [
    { label: 'Item 1', value: 'Value 1' },
    { label: 'Item 2', value: 'Value 2' },
    { label: 'Item 3', value: 'Value 3' },
  ];

  it('renders a list with correct number of items', () => {
    const wrapper = mount(DataList, {
      props: { items },
      global: {
        components: { DataListItem },
      },
    });
    const dataList = wrapper.find('.data-list');
    const dataListItemLabels = dataList.findAll('dt');
    const dataListItemValues = dataList.findAll('dd');
    expect(dataList.exists()).toBe(true);
    expect(dataListItemLabels.length).toBe(items.length);
    expect(dataListItemValues.length).toBe(items.length);
  });

  it('renders first item correctly', () => {
    const wrapper = mount(DataList, {
      props: { items },
      global: {
        components: { DataListItem },
      },
    });
    const dataList = wrapper.find('.data-list');
    const dataListItemLabels = dataList.findAll('dt');
    const dataListItemValues = dataList.findAll('dd');
    expect(dataListItemLabels[0].text()).toBe(items[0].label);
    expect(dataListItemValues[0].text()).toBe(items[0].value);
  });
});
