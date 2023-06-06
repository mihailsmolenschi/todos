import { useState, useContext, FunctionComponent } from "react";
import { UiContext } from "../store/ui-context";
import { TodosContext } from "../store/todos-context";

const TodoItem: FunctionComponent<{
    id: string;
    text: string;
}> = ({ id, text }) => {
    const [inputStateText, setInputStateText] = useState(text);
    const uiCtx = useContext(UiContext);
    const todosCtx = useContext(TodosContext);

    const isEditModeOpen = uiCtx.isEditingTodos;
    const isEditingTodo = uiCtx.isEditingTodo;
    const todoEditId = uiCtx.currentEditingTodoId;

    const currentTodoIndex = todosCtx.items.findIndex((item) => item.id === id);

    const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value;
        setInputStateText(inputValue);
    };

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        todosCtx.updateTodo(id, inputStateText);
        uiCtx.toggleEditTodo();
    };

    const cancelHandler = () => {
        setInputStateText(text);
        uiCtx.toggleEditTodo();
    };

    const toggleCompleted = (id: string) => {
        if (isEditModeOpen || isEditingTodo) return;

        const foundIndex = todosCtx.items.findIndex((todo) => todo.id === id);
        todosCtx.updateTodo(id, todosCtx.items[foundIndex].text, "completed");
    };

    const startEditingTodo = () => {
        if (isEditModeOpen) {
            uiCtx.toggleEditTodo(id);
            return;
        }
        toggleCompleted(id);
    };

    if (isEditModeOpen && isEditingTodo && id === todoEditId) {
        return (
            <li>
                <form onSubmit={formSubmitHandler}>
                    <input
                        autoFocus
                        value={inputStateText}
                        onChange={inputChangeHandler}
                    />
                    <button
                        type="submit"
                        disabled={
                            inputStateText ===
                            todosCtx.items[currentTodoIndex].text
                        }
                        title="confirm"
                    >
                        ✔️
                    </button>
                    <button
                        type="button"
                        disabled={
                            inputStateText ===
                            todosCtx.items[currentTodoIndex].text
                        }
                        onClick={() => {
                            setInputStateText(
                                todosCtx.items[currentTodoIndex].text
                            );
                        }}
                        title="revert"
                    >
                        ➰
                    </button>
                    <button type="reset" onClick={cancelHandler} title="cancel">
                        ✖️
                    </button>
                </form>
            </li>
        );
    }

    if (isEditModeOpen && isEditingTodo && id !== todoEditId) {
        return (
            <li>
                <p onClick={startEditingTodo}>{inputStateText}</p>

                <button title="remove" onClick={() => todosCtx.removeTodo(id)}>
                    🗑️
                </button>

                <button title="edit" onClick={() => uiCtx.toggleEditTodo(id)}>
                    ✍️
                </button>
            </li>
        );
    }

    if (isEditModeOpen && !isEditingTodo && id !== todoEditId) {
        return (
            <li>
                <p onClick={startEditingTodo}>{inputStateText}</p>

                <button title="remove" onClick={() => todosCtx.removeTodo(id)}>
                    🗑️
                </button>

                <button title="edit" onClick={() => uiCtx.toggleEditTodo(id)}>
                    ✍️
                </button>
            </li>
        );
    }

    if (!isEditModeOpen && !isEditingTodo && id !== todoEditId) {
        return (
            <li>
                <p onClick={startEditingTodo}>{inputStateText}</p>
            </li>
        );
    }

    return (
        <li>
            <p onClick={startEditingTodo}>{inputStateText}</p>
        </li>
    );
};

export default TodoItem;

// -- pseudo code, to fix
// return (
//     <li>
//         {isEditing
//             ? isCurrentEditingTodo
//                 ? "render edit todo (with 3 buttons)"
//                 : "render edit mode todo (with 2 buttons)"
//             : "render simple todo ( with no buttons)"}
//     </li>
// );
