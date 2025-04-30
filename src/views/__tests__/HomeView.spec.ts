import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '../HomeView.vue';
import Slider from '@/components/organisms/ShowSlider.vue';
import showStore from '@/store/show';

vi.mock('@/store/show', () => ({
  default: {
    state: {
      genres: ['Action', 'Comedy', 'Drama'],
    },
    loadShows: vi.fn(),
    getShowsByGenre: vi.fn(() => []),
  },
}));

describe('HomeView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a Slider component for each genre', () => {
    const wrapper = mount(HomeView);

    const sliders = wrapper.findAllComponents(Slider);
    expect(sliders).toHaveLength(showStore.state.genres.length);

    showStore.state.genres.forEach((genre, index) => {
      expect(sliders[index].props('genre')).toBe(genre);
    });
  });

  it('calls showStore.loadShows on mount', () => {
    mount(HomeView);
    expect(showStore.loadShows).toHaveBeenCalled();
  });
});
