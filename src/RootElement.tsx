import { Outlet, Link, useLoaderData, Form, useSubmit } from "react-router-dom";
import { getMovies, createMovie } from "./handleMovies";
import { Movie } from "./handleMovies";
import { useEffect } from "react";

export async function loader({request}:{request:Request}) {
  const url = new URL(request.url);
  const term = url.searchParams.get("term");
  const movies = await getMovies(term!);
  return { movies, term };
}

export async function action() {
  const movie = await createMovie();
  return { movie };
}


export default function RootElement() {
  const { movies, term } = useLoaderData() as { movies: Movie[]; term:string };
  const submit = useSubmit();
  useEffect(() => {
    (document.getElementById("term")! as HTMLInputElement).value = term;
  }, [term]);
  return (
    <>
      <div id="sidebar">
        <div>
          <Form id="search-form" role="search">
            <input
              type="search"
              id="term"
              aria-label="Search Movies"
              placeholder="Moviename"
              name="term"
              defaultValue={term}
              onChange={(e) =>{
                submit(e.currentTarget.form!);
              }}
            />
            <div id="search-spinner" aria-hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">Add</button>
          </Form>
        </div>
        <nav>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  {movie.title ? movie.title : "no title"}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="content">{<Outlet />}</div>
    </>
  );
}
