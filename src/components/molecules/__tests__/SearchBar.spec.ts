import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from '../SearchBar.vue';
import TextInput from '../../atoms/BaseTextInput.vue';
import Button from '../../atoms/BaseButton.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('SearchBar.vue', () => {
  const mockPush = vi.fn();
  const mockCurrentRoute = ref({ query: { q: '' } });

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockPush,
      currentRoute: mockCurrentRoute,
    });
  });

  it('renders the TextInput and Button components', () => {
    const wrapper = mount(SearchBar, {
      global: {
        components: {
          TextInput,
          Button,
        },
      },
    });

    expect(wrapper.findComponent(TextInput).exists()).toBe(true);
    expect(wrapper.findComponent(Button).exists()).toBe(true);
  });

  it('updates the query and calls router.push when input changes', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        components: {
          TextInput,
          Button,
        },
      },
    });

    const textInput = wrapper.findComponent(TextInput);
    await textInput.vm.$emit('handleChange', 'test query');

    expect(wrapper.vm.query).toBe('test query');
    expect(mockPush).toHaveBeenCalledWith({ name: 'search', query: { q: 'test query' } });
  });

  it('clears the query and calls router.push when the clear button is clicked', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        components: {
          TextInput,
          Button,
        },
      },
    });

    wrapper.findComponent(TextInput).vm.$emit('handleChange', 'test query');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(TextInput).props('value')).toBe('test query');

    const clearButton = wrapper.findComponent(Button);
    await clearButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(TextInput).props('value')).toBe('');
    expect(mockPush).toHaveBeenCalledWith({ name: 'search', query: { q: '' } });
  });

  it('renders the correct button based on the query value', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        components: {
          TextInput,
          Button,
        },
      },
    });
    expect(wrapper.findComponent(Button).props('icon')).toBe('search');

    wrapper.vm.query = 'test query';
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(Button).props('icon')).toBe('close');
  });
});
