import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShowSlider from '../ShowSlider.vue';
import showStore from '@/store/show';
import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { mockShows } from './mocks';

class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

vi.mock('@/store/show', () => ({
  default: {
    getShowsByGenre: vi.fn(),
  },
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('ShowSlider.vue', () => {
  beforeEach(async () => {
    (showStore.getShowsByGenre as vi.Mock).mockReturnValue(mockShows);
    if (!router.isReady) {
      await router.push('/');
      await router.isReady();
    }
  });

  it('renders the component with the correct genre', async () => {
    const wrapper = mount(ShowSlider, {
      props: { genre: 'Action' },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('.show-slider__heading').text()).toBe('Action');
  });

  it('renders the correct number of slides', () => {
    const wrapper = mount(ShowSlider, {
      props: { genre: 'Action' },
      global: {
        plugins: [router],
        stubs: {
          Slide: true,
        },
      },
    });

    expect(wrapper.findAllComponents({ name: 'Slide' })).toHaveLength(mockShows.length);
  });

  it('shows the left and right buttons based on scroll position', async () => {
    const wrapper = mount(ShowSlider, {
      props: { genre: 'Action' },
      global: {
        plugins: [router],
        stubs: {
          Slide: true,
        },
      },
      attachTo: document.body,
    });

    const scrollable = wrapper.find(`#Action__scrollable`).element as HTMLElement;

    Object.defineProperty(scrollable, 'scrollWidth', { value: 1000, writable: true });
    Object.defineProperty(scrollable, 'clientWidth', { value: 500, writable: true });

    await nextTick();
    scrollable.dispatchEvent(new Event('scroll'));
    await nextTick();

    expect(wrapper.find('.show-slider__button-left').exists()).toBe(false);
    expect(wrapper.find('.show-slider__button-right').exists()).toBe(true);

    scrollable.scrollLeft = 500;
    scrollable.dispatchEvent(new Event('scroll'));
    await nextTick();

    expect(wrapper.find('.show-slider__button-left').exists()).toBe(true);
    expect(wrapper.find('.show-slider__button-right').exists()).toBe(false);

    wrapper.unmount();
  });

  it('scrolls correctly when buttons are clicked', async () => {
    const wrapper = mount(ShowSlider, {
      props: { genre: 'Action' },
      global: {
        plugins: [router],
        stubs: {
          Slide: true,
        },
      },
      attachTo: document.body,
    });

    const scrollable = wrapper.find(`#Action__scrollable`).element as HTMLElement;

    Object.defineProperty(scrollable, 'scrollWidth', { value: 1000, writable: true });
    Object.defineProperty(scrollable, 'clientWidth', { value: 500, writable: true });

    scrollable.scrollBy = vi.fn(function (options: { left: number }) {
      this.scrollLeft += options.left;
    });

    await nextTick();
    scrollable.dispatchEvent(new Event('scroll'));
    await nextTick();

    expect(wrapper.find('.show-slider__button-right').exists()).toBe(true);
    expect(wrapper.find('.show-slider__button-left').exists()).toBe(false);

    await wrapper.find('.show-slider__button-right').trigger('click');
    expect(scrollable.scrollLeft).toBe(500);

    scrollable.dispatchEvent(new Event('scroll'));
    await nextTick();

    await wrapper.find('.show-slider__button-left').trigger('click');
    expect(scrollable.scrollLeft).toBe(0);

    wrapper.unmount();
  });
});
