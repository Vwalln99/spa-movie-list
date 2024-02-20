import { Outlet, Link } from "react-router-dom";

export default function RootElement() {
    return(
    <>
        <div id="sidebar">
            <div>
                <form id="search-form" role="search">
                    <input type="search"
                        id="term"
                        aria-label="Search Movies"
                        placeholder="Moviename"
                        name="term"
                    />
                    <div id="search-spinner" aria-hidden={true}/>
                    <div className="sr-only" aria-live="polite"></div>
                </form>
                <form method="post">
                    <button type="submit">Add</button>
                </form>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to={`/movies/1`}>Movie</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div id="content">{<Outlet/>}</div>
    </>
    );
}