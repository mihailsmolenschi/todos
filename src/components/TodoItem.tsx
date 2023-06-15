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

    const isLightThemeOn = uiCtx.isLightThemeOn;

    const foundItem = todosCtx.items.find((item) => item.id === id);
    const isButtonDisabled = inputStateText === foundItem?.text;

    const isEditModeOpen = uiCtx.isEditingTodos;

    const currentEditTodoId = todosCtx.editTodoId;

    const isCurrentEditingTodo = currentEditTodoId === id;

    const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const inputValue = event.currentTarget.value;
        setInputStateText(inputValue);
    };

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        todosCtx.updateTodo(id, "in-progress", inputStateText);
    };

    const cancelEditingTodo = () => {
        setInputStateText(text);
        todosCtx.changeEditTodoId("");
    };

    const changeTodoStatusToComplete = () => {
        todosCtx.updateTodo(id, "completed");
    };

    const startEditingTodo = () => {
        todosCtx.changeEditTodoId(id);
    };

    const revertInputHandler = () => {
        setInputStateText(text);
    };

    const removeTodoHandler = () => {
        todosCtx.removeTodo(id);
    };

    return (
        <li>
            {!isEditModeOpen && (
                <p
                    className={isLightThemeOn ? "light-theme--element" : ""}
                    onClick={changeTodoStatusToComplete}
                >
                    {inputStateText}
                </p>
            )}

            {isEditModeOpen && !isCurrentEditingTodo && (
                <>
                    <p
                        className={isLightThemeOn ? "light-theme--element" : ""}
                        onClick={startEditingTodo}
                    >
                        {inputStateText}
                    </p>

                    <button
                        className={isLightThemeOn ? "light-theme--element" : ""}
                        title="remove"
                        onClick={removeTodoHandler}
                    >
                        🗑️
                    </button>

                    <button
                        className={isLightThemeOn ? "light-theme--element" : ""}
                        title="edit"
                        onClick={startEditingTodo}
                    >
                        ✍️
                    </button>
                </>
            )}

            {isEditModeOpen && isCurrentEditingTodo && (
                <form onSubmit={formSubmitHandler}>
                    <input
                        className={isLightThemeOn ? "light-theme--element" : ""}
                        autoFocus
                        value={inputStateText}
                        onChange={inputChangeHandler}
                    />
                    <button
                        className={isLightThemeOn ? "light-theme--element" : ""}
                        type="submit"
                        title="confirm"
                        disabled={isButtonDisabled}
                    >
                        ✔️
                    </button>
                    <button
                        className={isLightThemeOn ? "light-theme--element" : ""}
                        type="button"
                        title="revert"
                        disabled={isButtonDisabled}
                        onClick={revertInputHandler}
                    >
                        ➰
                    </button>
                    <button
                        className={isLightThemeOn ? "light-theme--element" : ""}
                        type="reset"
                        title="cancel"
                        onClick={cancelEditingTodo}
                    >
                        ✖️
                    </button>
                </form>
            )}
        </li>
    );
};

export default TodoItem;
