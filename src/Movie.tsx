import {Form} from "react-router-dom";

export default function Movie() {
    const movie ={
        title: "Dune: part two",
        director: "Denis Villeneuve",
        img: "https://i.guim.co.uk/img/media/feb8ccbf0d9bfa8dfe6a2c5329d9351151ab043d/0_0_2764_4096/master/2764.jpg?width=445&dpr=1&s=none",
        social : "@dune_two",
        runtime: 166,   
    };
    return (
        <div id="movie">
            <div>
                <img height={300} src={movie.img} key={movie.img} />
            </div>
            <div>
                <h1>{movie.title ? movie.title : "no title"}</h1>
                <i>{movie.runtime && `Runtime: ${movie.runtime} Min.`}</i>
                {movie.social && (
                    <p>
                        <a target="_blank" href={`www.twitter.com/${movie.social}`}>
                         {movie.social}   
                        </a>
                    </p>
                )}
                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form 
                    method="post"
                    action="destroy"
                    onSubmit={(e) =>{
                        e.preventDefault();
                    }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}