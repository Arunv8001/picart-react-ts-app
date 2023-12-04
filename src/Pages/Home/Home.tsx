import { useState } from "react";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import "./Home.css";
import TodoList from "./Tasks/TodoList";

const Home = () => {
  const [taskName, setTaskName] = useState("");

  const [isRefresh, setIsRefresh] = useState<boolean>(true);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [addDelete, setAddDelete] = useState<string>("");

  const setRefresh = (status: boolean) => {
    setIsRefresh(status);
  };

  const snackBarHandler = (type: string, taskName: string) => {
    setShowSnackBar(true);
    setAddDelete(type);
    setTaskName(taskName);
    setTimeout(() => {
      setShowSnackBar(false);
      setTaskName("");
    }, 3000);
  };

  const addTodo = () => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskName, body: "bar", userId: 1 }),
    }).then(() => {
      snackBarHandler("added", taskName);
    });
  };

  return (
    <>
      <HeaderComponent />
      <div className="container">
        <div className="todo-header">
          <p className="info">Enter user task and click add button</p>
          <input
            className="todo-text-field"
            placeholder="Enter Task"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            disabled={showSnackBar}
          />
          <button
            className="add-button"
            onClick={addTodo}
            disabled={taskName === ""}
          >
            Add
          </button>
        </div>
        <TodoList
          setRefresh={setRefresh}
          isRefresh={isRefresh}
          snackBarHandler={snackBarHandler}
        />
        <div className={showSnackBar ? "snackbar show" : "snackbar"}>
          {taskName} Task is {addDelete}
        </div>
      </div>
    </>
  );
};

export default Home;
