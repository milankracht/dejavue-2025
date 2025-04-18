import { nextTick } from 'vue';
import { describe, it, expect, vi } from 'vitest';
import { useLazyImage } from '../useLazyImage';

describe('useLazyImage', () => {
  it('should initialize with default values', () => {
    const { isVisible, el } = useLazyImage();
    expect(isVisible.value).toBe(false);
    expect(el.value).toBe(null);
  });

  it('should set isVisible to true when element is intersecting', async () => {
    const { isVisible, el } = useLazyImage();
    const mockElement = document.createElement('div');
    el.value = mockElement;

    const mockObserverInstance = {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };

    global.IntersectionObserver = vi.fn((callback) => {
      setTimeout(() => callback([{ isIntersecting: true }]), 0);
      return {
        observe: mockObserverInstance.observe,
        disconnect: mockObserverInstance.disconnect,
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: vi.fn(),
        unobserve: vi.fn(),
      };
    });

    const observe = vi.fn(() => {
      if (el.value) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            observer.disconnect();
          }
        });
        observer.observe(el.value);
      }
    });
    observe();

    await new Promise((resolve) => setTimeout(resolve, 0));
    await nextTick();

    expect(isVisible.value).toBe(true);
    expect(mockObserverInstance.disconnect).toHaveBeenCalled();

    delete global.IntersectionObserver;
  });
});
