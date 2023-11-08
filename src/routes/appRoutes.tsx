import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const HomePage = lazy(() => import("../Pages/Home/Home"));
const UserPage = lazy(() => import("../Pages/Users/Users"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <HomePage />,
  },
  {
    path: "/users",
    element: <UserPage />,
    errorElement: <HomePage />,
  },
]);
