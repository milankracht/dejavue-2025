import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import StarRatingWide from '../StarRatingWide.vue';
import Icon from '@/components/atoms/BaseIcon.vue';
import { GLOBAL } from '@/utils/constants';

vi.mock('@/components/atoms/BaseIcon.vue', () => ({
  default: {
    props: ['icon', 'size', 'color'],
    template: '<svg :icon="icon" :size="size" :color="color" class="mock-icon"></svg>',
  },
}));

describe('StarRatingWide.vue', () => {
  it('renders the correct number of full, half, and empty stars for a given rating', async () => {
    const wrapper = mount(StarRatingWide, {
      props: {
        rating: 7,
      },
      global: {
        components: { Icon },
      },
    });

    // Check for full stars
    const fullStars = wrapper.findAll('[icon="star-solid"]');
    expect(fullStars.length).toBe(3);

    // Check for half stars
    const halfStars = wrapper.findAll('[icon="star-semi"]');
    expect(halfStars.length).toBe(1);

    // Check for empty stars
    const emptyStars = wrapper.findAll('[icon="star"]');
    expect(emptyStars.length).toBe(1);
  });

  it('renders nothing if the rating is null', () => {
    const wrapper = mount(StarRatingWide, {
      props: {
        rating: null,
      },
    });

    expect(wrapper.find('.star-rating').exists()).toBe(false);
  });

  it('renders the correct rating text', () => {
    const wrapper = mount(StarRatingWide, {
      props: {
        rating: 8,
      },
    });

    const ratingText = wrapper.find('span strong');
    expect(ratingText.text()).toBe('8');
  });

  it('applies the correct icon size and color', () => {
    const wrapper = mount(StarRatingWide, {
      props: {
        rating: 10,
      },
      global: {
        components: { Icon },
      },
    });

    const icons = wrapper.findAllComponents(Icon);
    icons.forEach((icon) => {
      expect(icon.props('size')).toBe(20);
      expect(icon.props('color')).toBe(GLOBAL.COLORS.YELLOW);
    });
  });
});
