import { Suspense } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/appRoutes";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.5,
};

function App() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Suspense fallback="loading...">
        <RouterProvider router={appRouter} />{" "}
      </Suspense>
    </motion.div>
  );
}

export default App;
