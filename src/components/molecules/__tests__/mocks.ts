import type { Show } from '@/types';

export const mockShow: Show = {
  id: 1,
  name: 'Test Show',
  url: 'https://example.com/show/1',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama', 'Comedy'],
  status: 'Running',
  runtime: 60,
  averageRuntime: 60, // Added averageRuntime
  premiered: '2023-01-01',
  ended: '2025-01-01',
  officialSite: 'https://example.com',
  schedule: { time: '20:00', days: ['Monday'] },
  rating: { average: 8.5 },
  weight: 90,
  network: {
    id: 1,
    name: 'Test Network',
    country: { name: 'USA', code: 'US', timezone: 'America/New_York' },
    officialSite: 'https://testnetwork.com',
  },
  webChannel: null,
  dvdCountry: null,
  externals: { tvrage: null, thetvdb: 12345, imdb: 'tt1234567' },
  image: { medium: 'test-image.jpg', original: 'test-image-original.jpg' },
  summary: 'This is a test show.',
  updated: 1672531200,
  _links: { self: { href: 'https://api.example.com/shows/1' } },
};
