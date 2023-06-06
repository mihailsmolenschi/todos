import { useContext } from "react";

import { TodosContext } from "../store/todos-context";
import { UiContext } from "../store/ui-context";

const CompletedTodos = () => {
    const todosCtx = useContext(TodosContext);
    const uiCtx = useContext(UiContext);

    const filteredTodos = todosCtx.items.filter(
        (todo) => todo.status === "completed"
    );

    const completeHandler = (id: string) => {
        if (uiCtx.isEditingTodos || uiCtx.isEditingTodo) return;

        const foundIndex = todosCtx.items.findIndex((todo) => todo.id === id);
        const foundItem = todosCtx.items[foundIndex];
        const toggleStatus = foundItem.status ? "" : "completed";
        todosCtx.updateTodo(id, foundItem.text, toggleStatus);
    };

    if (!filteredTodos.length) return null;

    return (
        <div className="completed-todos-list">
            <h3>Completed</h3>
            <ul>
                {filteredTodos.map((todo) => (
                    <li key={todo.id} onClick={() => completeHandler(todo.id)}>
                        <p
                            style={{
                                textDecoration: "line-through",
                            }}
                        >
                            {todo.text}
                        </p>
                        {uiCtx.isEditingTodos && (
                            <button
                                onClick={() => todosCtx.removeTodo(todo.id)}
                                title="remove"
                            >
                                🗑️
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompletedTodos;
