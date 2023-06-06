import { useContext } from "react";
import { TodosContext } from "../../store/todos-context";
import { UiContext } from "../../store/ui-context";

const Prompt = () => {
    const todosCtx = useContext(TodosContext);
    const uiCtx = useContext(UiContext);

    const removeAllTodosHandler = () => {
        todosCtx.removeAllTodos();
        uiCtx.closeRemovingPrompt();
    };

    return (
        <div className="prompt-container">
            <h3>Remove all todos?</h3>

            <button
                type="button"
                onClick={removeAllTodosHandler}
                title="confirm"
                className="confirm"
            >
                ✔️
            </button>
            <button
                type="button"
                onClick={uiCtx.closeRemovingPrompt}
                title="cancel"
                className="cancel"
            >
                ✖️
            </button>
        </div>
    );
};

export default Prompt;
