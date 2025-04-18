// filepath: /Users/milankracht/Sites/deja-vue/src/components/molecules/test_StarRating.vue
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import StarRating from '../StarRating.vue';
import Icon from '@/components/atoms/BaseIcon.vue';
import { GLOBAL } from '@/utils/constants';

vi.mock('../BaseIcon.vue', () => ({
  default: {
    template: '<svg class="mock-icon"></svg>',
  },
}));

describe('StarRating.vue', () => {
  it('renders correctly with a valid rating', () => {
    const wrapper = mount(StarRating, {
      props: {
        rating: 4,
      },
    });

    expect(wrapper.find('.star-rating').exists()).toBe(true);
    expect(wrapper.findComponent(Icon).exists()).toBe(true);
    expect(wrapper.find('strong').text()).toBe('4');
  });

  it('does not render when rating is null', () => {
    const wrapper = mount(StarRating, {
      props: {
        rating: null,
      },
    });

    expect(wrapper.find('.star-rating').exists()).toBe(false);
  });

  it('passes correct props to Icon component', () => {
    const wrapper = mount(StarRating, {
      props: {
        rating: 5,
      },
    });

    const icon = wrapper.findComponent(Icon);
    expect(icon.props('size')).toBe(16);
    expect(icon.props('color')).toBe(GLOBAL.COLORS.YELLOW);
  });
});
