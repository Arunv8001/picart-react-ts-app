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
  const deleteTodo = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/" + todo.id, {
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
