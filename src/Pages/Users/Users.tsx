import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import { ITableInfo, IUserContext, UserContext } from "./UserContext";
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

const Users = () => {
  const [tableValue, setTableValue] = useState<IUserContext>({
    pageNumber: 1,
    searchTerm: "",
    sortType: "",
  });
  const value: ITableInfo = { tableValue, setTableValue };
  const { pathname } = useLocation();
  return (
    <>
      <HeaderComponent />
      <UserContext.Provider value={value}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Outlet />
        </motion.div>
      </UserContext.Provider>
    </>
  );
};

export default Users;
