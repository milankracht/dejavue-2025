import { describe, it, expect, vi, beforeEach } from 'vitest';
import showStore from './show';
import { fetchAllShows } from '@/services/shows';
import { mockShows } from '@/components/organisms/__tests__/mocks.ts';

vi.mock('@/services/shows', () => ({
  fetchAllShows: vi.fn(),
}));

describe('showStore', () => {
  beforeEach(() => {
    showStore.state.shows = [];
    showStore.state.genres = [];
  });

  describe('loadShows', () => {
    it('should fetch shows and update state', async () => {
      vi.mocked(fetchAllShows).mockResolvedValue(mockShows);

      await showStore.loadShows();

      expect(fetchAllShows).toHaveBeenCalled();
      expect(showStore.state.shows).toEqual(mockShows);
      expect(showStore.state.genres).toEqual([
        'Action',
        'Adventure',
        'Science-Fiction',
        'Drama',
        'History',
      ]);
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(fetchAllShows).mockRejectedValue(new Error('Failed to fetch shows'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await showStore.loadShows();

      expect(fetchAllShows).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Failed to fetch shows'));
      expect(showStore.state.shows).toEqual([]);
      expect(showStore.state.genres).toEqual([]);

      consoleErrorSpy.mockRestore();
    });
  });

  describe('getShowsByGenre', () => {
    it('should return shows filtered by genre and sorted by rating', () => {
      showStore.setShows(mockShows);

      const result = showStore.getShowsByGenre('Drama');
      expect(result).toEqual([mockShows[1], mockShows[2]]);
    });

    it('should return an empty array if no shows match the genre', () => {
      showStore.setShows(mockShows);

      const result = showStore.getShowsByGenre('Comedy');
      expect(result).toEqual([]);
    });
  });
});
