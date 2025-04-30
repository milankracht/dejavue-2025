import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import ShowView from '@/views/ShowView.vue';
import { fetchShowById } from '@/services/shows';
import { useRoute, useRouter } from 'vue-router';
import navigationHistory from '@/store/navigationHistory';
import { mockShow } from '@/components/molecules/__tests__/mocks';

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router');
  return {
    ...actual,
    useRoute: vi.fn(),
    useRouter: vi.fn(),
  };
});

vi.mock('@/services/shows', () => ({
  fetchShowById: vi.fn(),
}));

vi.mock('@/components/atoms/BaseHeading.vue', () => ({
  default: { template: '<div><slot /></div>' },
}));
vi.mock('@/components/atoms/BaseButton.vue', () => ({
  default: { template: '<button @click="$emit(\'click\')"><slot /></button>' },
}));
vi.mock('@/components/atoms/BaseImage.vue', () => ({
  default: { template: '<img :src="src" :alt="alt" />' },
}));
vi.mock('@/components/molecules/StarRatingWide.vue', () => ({
  default: { props: ['rating'], template: '<div class="rating">{{ rating }}</div>' },
}));
vi.mock('@/components/atoms/BaseTag.vue', () => ({
  default: { props: ['label'], template: '<span class="tag">{{ label }}</span>' },
}));
vi.mock('@/components/organisms/DataList.vue', () => ({
  default: {
    props: ['items'],
    template:
      '<div><div v-for="item in items" :key="item.label">{{ item.label }}: {{ item.value }}</div></div>',
  },
}));

describe('ShowView.vue', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useRoute as unknown as vi.Mock).mockReturnValue({
      params: { id: '123' },
    });

    (useRouter as unknown as vi.Mock).mockReturnValue({
      push: mockPush,
    });

    navigationHistory.state.navigationStack = [{ path: '/' }];
  });

  it('fetches and displays show details on mounted', async () => {
    (fetchShowById as vi.Mock).mockResolvedValue(mockShow);

    const wrapper = mount(ShowView);
    await flushPromises();

    expect(wrapper.text()).toContain('Test Show');
    expect(wrapper.find('img').attributes('src')).toBe('test-image-original.jpg');
    expect(wrapper.text()).toContain('This is a test show.');
  });

  it('handles back navigation when clicking "Back" button', async () => {
    const wrapper = mount(ShowView);
    await flushPromises();

    await wrapper.find('button').trigger('click');

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('sanitizes the show description using DOMPurify', async () => {
    const unsanitizedHtml = `<script>alert('xss')</script><p>Valid HTML</p>`;
    const mockShowUnsanitized = { ...mockShow, summary: unsanitizedHtml };

    (fetchShowById as vi.Mock).mockResolvedValue(mockShowUnsanitized);

    const wrapper = mount(ShowView);
    await flushPromises();

    expect(wrapper.html()).not.toContain('<script>alert');
    expect(wrapper.html()).toContain('Valid HTML');
  });
});
