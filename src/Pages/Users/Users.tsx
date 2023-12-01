import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import { ITableInfo, IUserContext, UserContext } from "./UserContext";

const Users = () => {
  const [tableValue, setTableValue] = useState<IUserContext>({
    pageNumber: 1,
    searchTerm: "",
    sortType: "",
  });
  const value: ITableInfo = { tableValue, setTableValue };
  return (
    <>
      <HeaderComponent />
      <UserContext.Provider value={value}>
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

export default Users;
