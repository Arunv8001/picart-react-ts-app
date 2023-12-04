import React, { SetStateAction, Dispatch } from "react";

export interface IUserContext {
  pageNumber: number;
  searchTerm: string;
  sortType: string;
}

export interface User {
  name: string;
  email: string;
  age: string;
  address: string;
  familyName: string;
  profilePicture: string;
}

export interface ITableInfo {
  tableValue: IUserContext;
  setTableValue: Dispatch<SetStateAction<IUserContext>>;
}
// set the defaults
export const UserContext = React.createContext<ITableInfo>({
  tableValue: { pageNumber: 1, searchTerm: "", sortType: "name" },
  setTableValue: () => {},
});
