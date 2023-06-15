import { useContext } from "react";

import { TodosContext } from "../store/todos-context";
import { UiContext } from "../store/ui-context";

const CompletedTodos = () => {
    const todosCtx = useContext(TodosContext);
    const uiCtx = useContext(UiContext);

    const isLightThemeOn = uiCtx.isLightThemeOn;

    const filteredTodos = todosCtx.items.filter(
        (todo) => todo.status === "completed"
    );

    const changeTodoStatusToInProgress = (id: string) => {
        if (uiCtx.isEditingTodos) return;

        todosCtx.updateTodo(id, "in-progress");
    };

    if (!filteredTodos.length) return null;

    return (
        <div className="completed-todos-list">
            <h3>Completed</h3>
            <ul>
                {filteredTodos.map((todo) => (
                    <li
                        key={todo.id}
                        onClick={() => changeTodoStatusToInProgress(todo.id)}
                    >
                        <p
                            className={
                                isLightThemeOn ? "light-theme--element" : ""
                            }
                            style={{
                                textDecoration: "line-through",
                            }}
                        >
                            {todo.text}
                        </p>
                        {uiCtx.isEditingTodos && (
                            <button
                                className={
                                    isLightThemeOn ? "light-theme--element" : ""
                                }
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
