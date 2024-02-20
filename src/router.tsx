import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import RootElement, {
  loader as rootloader,
  action as rootAction,
} from "./RootElement";
import Movie, { loader as movieLoader } from "./Movie";
import EditMovie, { action as editAction } from "./EditMovie";
import { action as deleteAction } from "./Destroy";
export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootElement />,
      errorElement: <ErrorPage />,
      loader: rootloader,
      action: rootAction,
      children: [
        {
          path: "/movies/:id",
          element: <Movie />,
          loader: movieLoader as any,
        },
        {
          path: "/movies/:id/edit",
          element: <EditMovie />,
          loader: movieLoader as any,
          action: editAction as any,
        },
        {
          path: "/movies/:id/destroy",
          action: deleteAction as any,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
