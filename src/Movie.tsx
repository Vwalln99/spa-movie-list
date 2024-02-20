import { Form, useLoaderData } from "react-router-dom";
import { getMovie } from "./handleMovies";

export async function loader ({params}:{params:{id:string}}){
    const movie = await getMovie(params.id);
    return {movie};
}

type MovieType ={
    id:string;
    title:string;
    runtime:number;
    img:string;
    social: string;
};

export default function Movie() {
    const { movie } = useLoaderData() as { movie: MovieType }

    return (
        <div id="movie">
            <div>
                <img height={300} src={movie.img} key={movie.img} alt={movie.title} />
            </div>
            <div>
                <h1>{movie.title ? movie.title : "no title"}</h1>
                <i>{movie.runtime && `Runtime: ${movie.runtime} Min.`}</i>
                {movie.social && (
                    <p>
                        <a target="_blank" href={`https://www.twitter.com/${movie.social}`}>
                         {movie.social}   
                        </a>
                    </p>
                )}
               
                    <Form action='edit'>
                        <button type="submit">Edit</button>
                    </Form>
                    <Form action='destroy'>
                        <button type="submit">Delete</button>
                    </Form>
               
            </div>
        </div>
    );
}
