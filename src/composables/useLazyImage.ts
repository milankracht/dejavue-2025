import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Check if an element is in the viewport and set a ref to it.
 * This is useful for lazy loading images or other elements.
 * @returns { isVisible: Ref<boolean>, el: Ref<HTMLElement | null> }
 */

export function useLazyImage() {
  const isVisible = ref(false);
  const el = ref<HTMLElement | null>(null);

  let observer: IntersectionObserver | null;

  const observe = () => {
    if (!el.value) return;

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer?.disconnect();
      }
    });

    observer.observe(el.value);
  };

  onMounted(observe);
  onUnmounted(() => observer && observer.disconnect());

  return { isVisible, el };
}
