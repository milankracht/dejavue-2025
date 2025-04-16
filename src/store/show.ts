import { reactive } from 'vue';
import { fetchAllShows } from '@/services/shows';
import type { Show } from '@/types';

const state = reactive<{
  shows: Show[];
  genres: string[];
}>({
  shows: [],
  genres: [],
});

const loadShows = async () => {
  try {
    const shows = await fetchAllShows();
    setShows(shows);
    setGenres(shows);
  } catch (err) {
    console.error(err);
  }
};

const setShows = (newShows: Show[]) => {
  state.shows = newShows;
};

const setGenres = (shows: Show[]) => {
  const genres = new Set<string>();
  shows.forEach((show) => {
    show.genres.forEach((g) => genres.add(g));
  });
  state.genres = Array.from(genres);
};

const getShowsByGenre = (genre: string) => {
  return state.shows
    .filter((show) => show.genres.includes(genre))
    .sort((a, b) => b.rating.average - a.rating.average);
};

export default {
  state,
  loadShows,
  setShows,
  setGenres,
  getShowsByGenre,
};
