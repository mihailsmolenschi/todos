import { useContext } from "react";
import { TodosContext } from "../../store/todos-context";
import { UiContext } from "../../store/ui-context";

const Prompt = () => {
    const todosCtx = useContext(TodosContext);
    const uiCtx = useContext(UiContext);

    const isLightThemeOn = uiCtx.isLightThemeOn;

    const removeAllTodosHandler = () => {
        todosCtx.removeAllTodos();
        uiCtx.closeRemovingPrompt();
    };

    return (
        <div
            className={
                isLightThemeOn
                    ? "prompt-container light-theme--container"
                    : "prompt-container"
            }
        >
            <h3>Remove all todos?</h3>

            <button
                className="confirm"
                type="button"
                onClick={removeAllTodosHandler}
                title="confirm"
            >
                ✔️
            </button>
            <button
                className="cancel"
                type="button"
                onClick={uiCtx.closeRemovingPrompt}
                title="cancel"
            >
                ✖️
            </button>
        </div>
    );
};

export default Prompt;
