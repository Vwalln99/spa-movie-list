import {redirect} from "react-router-dom";
import { deleteMovie } from "./handleMovies";


export async  function action(params: {id: string}) {
    await deleteMovie(params.id);
    return redirect("/");
}

export default function Delete() {
    return <h1>Object deleted</h1>
}