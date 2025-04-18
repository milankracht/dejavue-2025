# DejaVue

This project was created as a showcase of my front-end development skills. It’s a relatively small application inspired by TV streaming platforms like Netflix, HBO Max and Videoland. The main screen features a TV show browser that displays show posters grouped by genre and sorted by rating. Within each genre, shows can be browsed using a trackpad, mouse, or the arrow buttons. Each poster links to a dedicated show detail page.

The header contains a search bar that allows users to search across the entire show database.

Images and data in this application are provided by the [TvMaze API](https://www.tvmaze.com/api)

## Features

- Browse TV shows by genre
- Shows are sorted by rating (high to low)
- Poster images are lazy loading
- Search functionality across all shows
- Responsive design with keyboard and mouse support
- Show details page with extended information

## Stack

This application is built with the latest version of Vue.js (v3.5.13), requiring Node.js version 18.3 or higher.

I’ve kept additional dependencies to a minimum. The only ones used are:

- Vue Router – for client-side routing
- DOMPurify – for safe HTML rendering

State management is handled using a small custom service instead of Vuex or Pinia, to keep the project lightweight and straightforward. All API calls are executed using the native **fetch API**.

## Folder Structure

```sh
src/
├── assets/
├── components/
    ├── atoms/
    ├── molecules/
    ├── organisms/
    └── structures/
├── composables/
├── router/
├── services/
├── store/
├── types/
├── utils/
├── views/
├── App.vue
└── main.ts
```

## Api

Data is retrieved from the **TvMaze API**. The following endpoints are used:

- /shows – fetch all shows (limited to the first 250 entries)
- /shows/:id – fetch details for a specific show
- /search/shows?q=... – search for shows matching a query string

  ⚠️ Note: Ideally, the **/shows** endpoint would support filtering by genre and sorting by rating. Since it doesn’t, the app fetches the first 250 results and processes them on the frontend. This is not ideal and doesn’t reflect a real production scenario.

In a more advanced setup, I would have built a small Node.js service to act as an API proxy with proper filtering and sorting — but that was outside the scope of this project.

If time was not an issue, I would have built a separate NodeJS service to deliver proper data, filtered on genre and sorted on rating. But hey, that's out of scope for this project.

## Limitations

Is this application production-ready? Not quite.

- Some components are simplified and not yet scalable
- Accessibility has been considered but can still be improved
- No option of loading beyond the initial 250 shows
- Fetching shows could be more elegant if api was not a bottleneck

However, given the time constraints, this app is performant, functional, and representative of my skills as a front-end developer.

## Unit tests

Unit tests are created for all components, composables and services. Current code coverage is above 90%.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### For code coverage insights

```sh
npm run test:coverage
```

## Licence

This project is open source and available under the MIT License.
