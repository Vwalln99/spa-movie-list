import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();

    return(
        <div id="error-page">
            <h1>Sorry, wie couldn't handle yor request!</h1>
            <p>
                {isRouteErrorResponse(error)
                ? `${error.status} ${error.statusText}`
                : (error as Error).message}
            </p>
        </div>
    )
}