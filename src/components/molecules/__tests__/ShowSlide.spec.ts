import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import ShowSlide from '../ShowSlide.vue';
import { RouterLinkStub } from '@vue/test-utils';
import { mockShow } from './mocks';

global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

const isVisibleMock = ref(true);
const elMock = ref(null);

vi.mock('@/composables/useLazyImage', () => {
  return {
    useLazyImage: () => ({
      isVisible: isVisibleMock,
      el: elMock,
    }),
  };
});

describe('ShowSlide.vue', () => {
  beforeEach(() => {
    isVisibleMock.value = true;
    elMock.value = null;
  });

  it('renders correctly with required props', () => {
    const wrapper = mount(ShowSlide, {
      props: { show: mockShow },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          BaseImage: true,
          PosterPlaceholder: true,
          BaseHeading: true,
          StarRating: true,
        },
      },
    });

    expect(wrapper.find('.show-slide').exists()).toBe(true);
    expect(wrapper.find('.show-slide__heading').text()).toContain(mockShow.name);
  });

  it('renders the image when visible', () => {
    isVisibleMock.value = true;

    const wrapper = mount(ShowSlide, {
      props: { show: mockShow },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          BaseImage: {
            template: '<div class="base-image"></div>',
            name: 'BaseImage',
          },
          PosterPlaceholder: true,
        },
      },
    });

    expect(wrapper.findComponent({ name: 'BaseImage' }).exists()).toBe(true);
  });

  it('renders the placeholder when not visible', () => {
    isVisibleMock.value = false;

    const wrapper = mount(ShowSlide, {
      props: { show: mockShow },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          BaseImage: true,
          PosterPlaceholder: {
            template: '<div class="poster-placeholder"></div>',
            name: 'PosterPlaceholder',
          },
        },
      },
    });

    expect(wrapper.findComponent({ name: 'PosterPlaceholder' }).exists()).toBe(true);
  });

  it('navigates to the correct route', () => {
    const wrapper = mount(ShowSlide, {
      props: { show: mockShow },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const link = wrapper.findComponent(RouterLinkStub);
    expect(link.props().to).toBe(`/show/${mockShow.id}`);
  });

  it('renders the rating component with correct value', () => {
    const wrapper = mount(ShowSlide, {
      props: { show: mockShow },
      global: {
        stubs: {
          StarRating: {
            template: '<div class="star-rating">{{ rating }}</div>',
            props: ['rating'],
          },
          RouterLink: RouterLinkStub,
        },
      },
    });

    const rating = wrapper.find('.star-rating');
    expect(rating.text()).toBe(`${String(mockShow.rating.average)}/10`);
  });
});
