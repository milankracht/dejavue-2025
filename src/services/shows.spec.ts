import { describe, it, expect, vi } from 'vitest';
import { fetchAllShows, fetchShowById, searchShows } from './shows';

global.fetch = vi.fn();

describe('fetchShowById', () => {
  it('should fetch all shows and return data', async () => {
    const mockResponse = [{ id: '1', name: 'Test Show' }];
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchAllShows();
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows');
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the response is not ok', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchAllShows()).rejects.toThrow('Failed to fetch shows');
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows');
  });

  it('should fetch a show by ID and return data', async () => {
    const mockResponse = { id: '1', name: 'Test Show' };
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchShowById('1');
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1');
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the response is not ok', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchShowById('1')).rejects.toThrow('Failed to fetch show with ID 1');
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1');
  });

  it('should search for shows and return data', async () => {
    const mockResponse = [{ show: { id: '1', name: 'Test Show' } }];
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await searchShows('Test');
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=Test');
    expect(result).toEqual(mockResponse);
  });

  it('should sanitize the search query and fetch the data', async () => {
    const mockResponse = [{ show: { id: '1', name: 'Test Show' } }];
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await searchShows('Test@123!');
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=Test123');
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the response is not ok', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(searchShows('Test')).rejects.toThrow(
      'Failed to search shows with search string Test',
    );
    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=Test');
  });
});
