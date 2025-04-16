const BASE_URL = 'https://api.tvmaze.com';

export async function fetchAllShows() {
  const response = await fetch(`${BASE_URL}/shows`);
  if (!response.ok) throw new Error('Failed to fetch shows');
  const data = await response.json();
  return data;
}

export async function fetchShowById(id: number) {
  const response = await fetch(`${BASE_URL}/shows/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch show with ID ${id}`);
  return response.json();
}

export async function searchShows(entry: string) {
  const query = entry.replace(/[^a-zA-Z0-9\s]/g, '');
  const response = await fetch(`${BASE_URL}/search/shows?q=${query}`);
  if (!response.ok) throw new Error(`Failed to search shows with search string ${query}`);
  return response.json();
}
