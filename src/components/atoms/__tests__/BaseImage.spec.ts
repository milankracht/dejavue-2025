import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseImage from '../BaseImage.vue';

describe('BaseImage.vue', () => {
  it('renders an image with the correct src and alt attributes', () => {
    const wrapper = mount(BaseImage, {
      props: {
        src: '/path/to/image.jpg',
        alt: 'Test Image',
      },
    });

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('/path/to/image.jpg');
    expect(img.attributes('alt')).toBe('Test Image');
  });

  it('applies default width and height when not provided', () => {
    const wrapper = mount(BaseImage, {
      props: {
        src: '/path/to/image.jpg',
      },
    });

    const img = wrapper.find('img');
    expect(img.attributes('width')).toBe('100%');
    expect(img.attributes('height')).toBe('100%');
  });

  it('applies custom width and height when provided', () => {
    const wrapper = mount(BaseImage, {
      props: {
        src: '/path/to/image.jpg',
        width: 200,
        height: 150,
      },
    });

    const img = wrapper.find('img');
    expect(img.attributes('width')).toBe('200');
    expect(img.attributes('height')).toBe('150');
  });

  it('renders without an alt attribute if not provided', () => {
    const wrapper = mount(BaseImage, {
      props: {
        src: '/path/to/image.jpg',
      },
    });

    const img = wrapper.find('img');
    expect(img.attributes('alt')).toBeUndefined();
  });
});
