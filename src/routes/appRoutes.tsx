import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { suspenseWrapper } from "../Utils/suspenseWrapper";
import { UserDetailRoute } from "./userRoute";
const HomePage = lazy(() => import("../Pages/Home/Home"));
const UserPage = lazy(() => import("../Pages/Users/Users"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: suspenseWrapper(<HomePage />),
    errorElement: suspenseWrapper(<HomePage />),
  },
  {
    path: "/users",
    element: suspenseWrapper(<UserPage />),
    children: UserDetailRoute,
    errorElement: <UserPage />,
  },
]);
