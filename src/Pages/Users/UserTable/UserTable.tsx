import { useEffect, useRef, useState, useContext } from "react";
import { User, UserContext } from "./../UserContext";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import { useNavigate } from "react-router-dom";
import "rc-pagination/assets/index.css";
import "./UserTable.css";

import { allData } from "../../../Utils/data";

const tableHead = {
  name: "Name",
  email: "Email",
  age: "Age",
  action: "Actions",
};

interface IsortType {
  field: string;
  ascending: boolean;
}

const UserTable = () => {
  const countPerPage = 10;
  const { tableValue, setTableValue } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState<string>(tableValue.searchTerm);
  const [sorting, setSorting] = useState<IsortType>({
    field: tableValue.sortType,
    ascending: true,
  });
  const navigate = useNavigate();
  const [collection, setCollection] = useState<User[]>(
    cloneDeep(allData.slice(0, countPerPage))
  );
  const searchData = useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setTableValue({ ...tableValue, pageNumber: 1 });
      const data = cloneDeep(
        allData
          .filter((item) => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  useEffect(() => {
    if (!searchTerm) {
      updatePage(1);
    } else {
      searchData.current(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    const sortedUsers = sortCurrentUsers();
    setCollection(
      sorting.ascending
        ? sortedUsers.slice(0, countPerPage)
        : sortedUsers.reverse().slice(0, countPerPage)
    );
    setTableValue({ ...tableValue, pageNumber: 1 });
  }, [sorting]);

  useEffect(() => {
    updatePage(tableValue.pageNumber);
  }, []);

  /**
   *
   * @param pageNumber is a number type and update table page number
   */

  const updatePage = (pageNumber: number) => {
    setTableValue({ ...tableValue, pageNumber });
    const to = countPerPage * pageNumber;
    const from = to - countPerPage;
    const sortedUsers = sortCurrentUsers();
    setCollection(cloneDeep(sortedUsers.slice(from, to)));
  };

  /**
   *
   * @returns This function returns sorted collection w.r.t sort type
   */
  const sortCurrentUsers = () => {
    const collectionCopy = [...allData];
    return collectionCopy.sort((a, b) => {
      return a[sorting.field as keyof User]?.localeCompare(
        b[sorting.field as keyof User]
      );
    });
  };

  /**
   *
   * @param data is Object type which include user detail.
   * This FUnction will navigate to detail page of user
   */
  const handleViewAction = (data: User) => {
    navigate(`${window.location.pathname}/` + "user-detail", {
      state: { data },
    });
  };

  /**
   *
   * @param type is string type and accept sort type i.e "name, email and age"
   * @param ascending is boolean type
   */
  const sortAction = (type: string, ascending: boolean) => {
    type !== "actions" && setSorting({ field: type, ascending: ascending });
    type !== "actions" && setTableValue({ ...tableValue, sortType: type });
  };

  /**
   *
   * @param rowData is object which include data of users like "name, familyName, email, address and age"
   * @returns table row data
   */
  const tableRows = (rowData: { key: User; index: number }) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((type, i) => {
      return (
        <td key={i}>
          {""}
          {type === "action" ? (
            <button
              className="view-action"
              onClick={() => handleViewAction(key)}
            >
              View
            </button>
          ) : (
            key[type as keyof User]
          )}{" "}
        </td>
      );
    });

    return <tr key={index}>{columnData}</tr>;
  };
  /**
   *
   * @returns is array of object which include data of users
   */
  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  /**
   * This function returns table header
   */
  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td
        onClick={() =>
          sortAction(title.toLocaleLowerCase(), !sorting.ascending)
        }
        key={index}
      >
        {title}{" "}
        {sorting.ascending && sorting.field === title.toLocaleLowerCase() && (
          <span>&#8593;</span>
        )}
        {!sorting.ascending && sorting.field === title.toLocaleLowerCase() && (
          <span>&#8595;</span>
        )}
      </td>
    ));
  };

  return (
    <div className="container">
      <div className="page-label">User List Page</div>
      <div className="search">
        <input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-block">
        <table>
          <thead>
            <tr>{headRow()}</tr>
          </thead>
          <tbody className="trhover">
            {collection.length === 0 ? (
              <tr className="empty-cell">
                <td colSpan={4}>No result found</td>
              </tr>
            ) : (
              tableData()
            )}
          </tbody>
        </table>
        {collection.length > 1 && (
          <Pagination
            pageSize={countPerPage}
            onChange={updatePage}
            current={tableValue.pageNumber}
            total={allData.length}
          />
        )}
      </div>
    </div>
  );
};
export default UserTable;
