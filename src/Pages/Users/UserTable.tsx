import React, { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./UserTable.css";

import { allData } from "../../Utils/data";

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
  const countPerPage = 10;
  const [value, setValue] = useState("");
  const [sorting, setSorting] = useState({ field: "name", ascending: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );
  const searchData = useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        allData
          .filter((item) => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

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
    setCurrentPage(1);
  }, [sorting]);

  const updatePage = (p: number) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    const collectionCopy = [...allData];
    const sortedCurrentUsers = collectionCopy.sort((a, b) => {
      return a[sorting.field]?.localeCompare(b[sorting.field]);
    });
    setCollection(cloneDeep(sortedCurrentUsers.slice(from, to)));
  };

  const handleAction = (data: User) => {
    console.log(data, "data");
  };
  const sortAction = (type: string, ascending: boolean) => {
    setSorting({ field: type, ascending: ascending });
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
        {title}
      </td>
    ));
  };

  return (
    <div className="table-block">
      <div className="search">
        <input
          placeholder="Search by name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={allData.length}
      />
    </div>
  );
};
export default UserTable;
