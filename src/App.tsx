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
  const isLightThemeOn = uiCtx.isLightThemeOn;

  const removeAllTodosHandler = () => {
    uiCtx.openRemovingPrompt();
  };

  const toggleEditModeHandler = () => {
    uiCtx.closeRemovingPrompt();
    uiCtx.toggleEditMode();
    todosCtx.changeEditTodoId("");
  };

  const changeThemeHandler = () => {
    uiCtx.toggleUiTheme();
  };

  return (
    <div className={isLightThemeOn ? "app light-theme--bg" : "app"}>
      <main>
        <h1>
          TOD
          <span
            title="toggle theme"
            className="icon--toggle-theme"
            onClick={changeThemeHandler}
          >
            {!isLightThemeOn ? "☀️" : "🌑"}
          </span>
        </h1>

        {!isPromptOpen && <NewTodo />}

        {itemsLength ? (
          <div className="edit-mode-actions">
            {isEditModeOpen && !isPromptOpen && (
              <button
                className={isLightThemeOn ? "light-theme--element" : ""}
                type="button"
                onClick={removeAllTodosHandler}
                title="remove all"
              >
                ☠️
              </button>
            )}

            <button
              className={isLightThemeOn ? "light-theme--element" : ""}
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
      </main>
    </div>
  );
}

export default App;
