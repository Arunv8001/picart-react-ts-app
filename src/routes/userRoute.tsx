import { lazy } from "react";
import { suspenseWrapper } from "../Utils/suspenseWrapper";

const UserDetail = lazy(() => import("./../Pages/Users/UserDetail/UserDetail"));
const UserTable = lazy(() => import("../Pages/Users/UserTable/UserTable"));

export const UserDetailRoute = [
  {
    path: "",
    element: suspenseWrapper(<UserTable />),
  },
  {
    path: "user-detail",
    element: suspenseWrapper(<UserDetail />),
  },
];
