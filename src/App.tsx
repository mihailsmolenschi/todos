import { UiContext } from "./store/ui-context.js";
import TodosList from "./components/TodosList.js";
import NewTodo from "./components/NewTodo.js";
import CompletedTodos from "./components/CompletedTodos.js";
import { TodosContext } from "./store/todos-context.js";
import { useContext } from "react";
import Prompt from "./components/Ui/Prompt.js";

function App() {
    const todosCtx = useContext(TodosContext);
    const uiCtx = useContext(UiContext);

    const itemsLength = todosCtx.items.length;
    const isEditModeOpen = uiCtx.isEditingTodos;
    const isPromptOpen = uiCtx.isRemovingPromptOpen;

    const removeAllTodosHandler = () => {
        uiCtx.openRemovingPrompt();
    };

    const toggleEditModeHandler = () => {
        uiCtx.closeRemovingPrompt();
        uiCtx.toggleEditMode();
        todosCtx.changeEditTodoId("");
    };

    // const [lightThemeOn, setIsLightThemeOn] = useState(false);

    // const themeChangeHandler = () => {
    //     const rootEl = document.getElementById("root");

    //     if (!rootEl) return;

    //     if (lightThemeOn) {
    //         rootEl.style.backgroundColor = "#000";
    //         setIsLightThemeOn(false);
    //     } else {
    //         rootEl.style.backgroundColor = "#fff";
    //         setIsLightThemeOn(true);
    //     }
    // };

    return (
        <>
            {/* <button onClick={themeChangeHandler}>
                {!lightThemeOn ? "☀️" : "🌙"}
            </button>*/}

            <h1>TODOS</h1>

            {!isPromptOpen && <NewTodo />}

            {itemsLength ? (
                <div className="edit-mode-actions">
                    {isEditModeOpen && !isPromptOpen && (
                        <button
                            type="button"
                            onClick={removeAllTodosHandler}
                            title="remove all"
                        >
                            ☠️
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={toggleEditModeHandler}
                        title="edit todos mode"
                    >
                        {!isEditModeOpen ? "⚙️" : "🔓"}
                    </button>
                </div>
            ) : null}

            {isEditModeOpen && isPromptOpen && <Prompt />}

            {!isPromptOpen && (
                <>
                    <TodosList />
                    <CompletedTodos />
                </>
            )}
        </>
    );
}

export default App;
