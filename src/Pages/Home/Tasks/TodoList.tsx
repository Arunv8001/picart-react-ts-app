import { useEffect, useState } from "react";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";
import { APIURL } from "../../../Utils/constants";

interface Props {
  isRefresh: boolean;
  setRefresh: (refresh: boolean) => void;
  snackBarHandler: (type: string, taskName: string) => void;
}

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const TodoList = (props: Props) => {
  const { isRefresh, setRefresh, snackBarHandler } = props;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (isRefresh) {
      fetch(APIURL + "todos?userId=1")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  return (
    <ul className="todo-list">
      <div className="page-header">To-do List</div>
      {todos.length === 0 && <h1>Loading...</h1>}
      {todos.map((todo: Todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          setRefresh={setRefresh}
          snackBarHandler={snackBarHandler}
        />
      ))}
    </ul>
  );
};

export default TodoList;
