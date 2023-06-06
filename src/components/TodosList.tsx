import { useContext } from "react";
import { TodosContext } from "../store/todos-context";
import TodoItem from "./TodoItem";

const TodosList = () => {
    const todosCtx = useContext(TodosContext);
    const filteredTodos = todosCtx.items.filter((todo) => todo.status === "");

    const todosList = filteredTodos.map((todoItem) => (
        <TodoItem key={todoItem.id} id={todoItem.id} text={todoItem.text} />
    ));

    if (!todosList.length) return null;

    return (
        <div className="todos-list">
            <ul>{todosList}</ul>
        </div>
    );
};

export default TodosList;
