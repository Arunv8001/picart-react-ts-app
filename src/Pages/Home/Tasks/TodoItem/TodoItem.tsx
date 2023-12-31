import { APIURL } from "../../../../Utils/constants";
import "./TodoItem.css";

interface Props {
  todo: Todo;
  setRefresh: (refresh: boolean) => void;
  snackBarHandler: (type: string, taskName: string) => void;
}

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const TodoItem = (props: Props) => {
  const { todo, setRefresh, snackBarHandler } = props;

  /**
   * This function calls an API which delete task from the list.
   * Important: resource will not be really delete on the server but it will be faked as if.
   */
  const deleteTodo = () => {
    fetch(APIURL + "todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      setRefresh(true);
      snackBarHandler("deleted", todo.title);
    });
  };

  return (
    <>
      <li>
        <div>{todo.title}</div>
        <span className="close" onClick={() => deleteTodo()}>
          x
        </span>
      </li>
    </>
  );
};

export default TodoItem;
