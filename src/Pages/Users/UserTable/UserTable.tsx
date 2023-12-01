import { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "./../UserContext";
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

interface User {
  name: string;
  email: string;
  age: string;
  action: () => void;
}

const UserTable = () => {
  const { tableValue, setTableValue } = useContext(UserContext);
  const countPerPage = 10;
  const [searchTerm, setSearchTerm] = useState(tableValue.searchTerm);
  const [sorting, setSorting] = useState({
    field: tableValue.sortType,
    ascending: true,
  });
  const navigate = useNavigate();
  const [collection, setCollection] = useState(
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
    const collectionCopy = [...allData];
    const sortedCurrentUsers = collectionCopy.sort((a, b) => {
      return a[sorting.field]?.localeCompare(b[sorting.field]);
    });
    setCollection(
      sorting.ascending
        ? sortedCurrentUsers.slice(0, countPerPage)
        : sortedCurrentUsers.reverse().slice(0, countPerPage)
    );
    setTableValue({ ...tableValue, pageNumber: 1 });
  }, [sorting.field]);

  useEffect(() => {
    updatePage(tableValue.pageNumber);
  }, []);

  const updatePage = (p: number) => {
    setTableValue({ ...tableValue, pageNumber: p });
    const to = countPerPage * p;
    const from = to - countPerPage;
    const collectionCopy = [...allData];
    const sortedCurrentUsers = collectionCopy.sort((a, b) => {
      return a[sorting.field]?.localeCompare(b[sorting.field]);
    });
    setCollection(cloneDeep(sortedCurrentUsers.slice(from, to)));
  };

  const handleAction = (data: User) => {
    navigate(`${window.location.pathname}/` + "user-detail", {
      state: { data },
    });
  };
  const sortAction = (type: string, ascending: boolean) => {
    type !== "actions" && setSorting({ field: type, ascending: ascending });
    type !== "actions" && setTableValue({ ...tableValue, sortType: type });
  };
  const tableRows = (rowData: { key: User; index: number }) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return (
        <td key={i}>
          {""}
          {keyD === "action" ? (
            <button className="view-action" onClick={() => handleAction(key)}>
              View
            </button>
          ) : (
            key[keyD]
          )}{" "}
        </td>
      );
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

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
          <tbody className="trhover">{tableData()}</tbody>
        </table>
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={tableValue.pageNumber}
          total={allData.length}
        />
      </div>
    </div>
  );
};
export default UserTable;
