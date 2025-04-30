import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchView from '@/views/SearchView.vue';
import navigationHistory from '@/store/navigationHistory';
import { useRoute, useRouter } from 'vue-router';
import { searchShows } from '@/services/shows';

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router');
  return {
    ...actual,
    useRoute: vi.fn(),
    useRouter: vi.fn(),
  };
});

vi.mock('@/services/shows', () => ({
  searchShows: vi.fn(),
}));

vi.mock('@/components/atoms/BaseHeading.vue', () => ({
  default: { template: '<div><slot /></div>' },
}));
vi.mock('@/components/atoms/BaseButton.vue', () => ({
  default: { template: '<button @click="$emit(\'click\')"><slot /></button>' },
}));
vi.mock('@/components/molecules/ShowSlide.vue', () => ({
  default: { props: ['show'], template: '<div class="slide">{{ show.name }}</div>' },
}));

describe('SearchView.vue', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useRoute as unknown as vi.Mock).mockReturnValue({
      query: { q: 'test' },
    });

    (useRouter as unknown as vi.Mock).mockReturnValue({
      push: mockPush,
    });

    navigationHistory.state.navigationStack = [{ path: '/' }];
  });

  it('renders search results when searchShows returns data', async () => {
    const mockResults = [{ show: { id: 1, name: 'Mock Show' } }];
    (searchShows as vi.Mock).mockResolvedValue(mockResults);

    const wrapper = mount(SearchView);

    await Promise.resolve();
    await Promise.resolve();

    expect(wrapper.findAll('.slide')).toHaveLength(1);
    expect(wrapper.text()).toContain('Mock Show');
  });

  it('shows warning message when query is too short', async () => {
    (useRoute as vi.Mock).mockReturnValue({ query: { q: 'a' } });
    (searchShows as vi.Mock).mockResolvedValue([]);

    const wrapper = mount(SearchView);
    await Promise.resolve();
    await Promise.resolve();

    expect(wrapper.text()).toContain('Enter at least two characters');
  });

  it('shows no results message when query is valid but no matches', async () => {
    (useRoute as vi.Mock).mockReturnValue({ query: { q: 'abcdef' } });
    (searchShows as vi.Mock).mockResolvedValue([]);

    const wrapper = mount(SearchView);
    await Promise.resolve();
    await Promise.resolve();

    expect(wrapper.text()).toContain('No results found for "abcdef"');
  });

  it('navigates back when clicking the back button', async () => {
    const wrapper = mount(SearchView);
    await Promise.resolve();
    await Promise.resolve();

    await wrapper.find('button').trigger('click');

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
