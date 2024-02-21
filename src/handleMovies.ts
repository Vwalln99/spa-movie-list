import sortBy from "sort-by";
import { matchSorter } from "match-sorter";

export type Movie = {
  id: number;
  title: string;
  director: string;
  runtime: number;
  img: string;
  social: string;
};

let fakeCache: { [key: string]: boolean } = {};

function fakeDelay(key?: string) {
  if (!key) {
    fakeCache = {};
  }
  if (fakeCache[key!]) {
    return;
  }
  fakeCache[key!] = true;
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

export async function getMovies(query?: string) {
  await fakeDelay(`getMovies:${query}`);
  const movies: Movie[] = await fetch("http://localhost:5002/movies").then(
    (res) => res.json()
  );
  if (query) return matchSorter(movies, query, { keys: ["title"] });
  return movies.sort(sortBy("title", "createdAt")) ?? [];
}

export async function getMovie(id: string) {
  await fakeDelay(`getMovie:${id}`);
  const movie: Movie = await fetch(`http://localhost:5002/movies/${id}`).then(
    (res) => res.json()
  );
  return movie;
}

export async function createMovie() {
  await fakeDelay();
  const movie = {
    id: Math.random().toString(36).substring(2, 90),
    createdAt: Date.now(),
    title: "New Movie",
    director: "New Director",
    runtime: 0,
    img: "",
    social: "",
  };
  await fetch("http://localhost:5002/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  return movie;
}

export async function deleteMovie(id: string) {
  console.log("deleteMovie", id);
  await fakeDelay();
  console.log(id);
  await fetch(`http://localhost:5002/movies/${id}`, {
    method: "DELETE",
  });
}

export async function updateMovie(id: string, movie: Movie) {
  await fakeDelay();
  await fetch(`http://localhost:5002/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  return movie;
}
