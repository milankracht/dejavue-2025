import { describe, it, expect, vi } from 'vitest';
import { createApp } from 'vue';
import type { App } from 'vue';
import router from '../router';

vi.mock('../router', () => ({
  default: {
    isReady: vi.fn(() => Promise.resolve()),
    install: vi.fn(),
  },
}));

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    createApp: vi.fn(() => ({
      use: vi.fn(),
      mount: vi.fn(),
    })),
  };
});

describe('main.ts', () => {
  it('should create and mount the Vue app', async () => {
    const appMock = {
      use: vi.fn(),
      mount: vi.fn(),
      version: '3.0.0',
      config: {},
      mixin: vi.fn(),
      component: vi.fn(),
      directive: vi.fn(),
      provide: vi.fn(),
    } as unknown as App<Element>;

    vi.mocked(createApp).mockReturnValue(appMock);

    await import('../main');

    expect(appMock.use).toHaveBeenCalledWith(router);
    expect(appMock.mount).toHaveBeenCalledWith('#app');
  });
});
