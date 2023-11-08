import { Suspense } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/appRoutes";

function App() {
  return (
    <Suspense fallback="loading...">
      <RouterProvider router={appRouter} />{" "}
    </Suspense>
  );
}

export default App;
