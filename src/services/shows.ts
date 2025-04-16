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
