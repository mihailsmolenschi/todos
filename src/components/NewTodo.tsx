import React, { useState, useContext } from "react";
import generateTodos from "../utils/generateTodos";
import { TodosContext } from "../store/todos-context";
import { UiContext } from "../store/ui-context";

const NewTodo = () => {
    const [inputText, setInputText] = useState("");
    const todoCtx = useContext(TodosContext);
    const uiCtx = useContext(UiContext);

    const isLightThemeOn = uiCtx.isLightThemeOn;

    const formSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!inputText) return;

        todoCtx.addTodo(inputText);

        setInputText("");
        uiCtx.closeEditMode();
    };

    const randomizeHandler = () => {
        setInputText(generateTodos());
        uiCtx.closeEditMode();
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const inputClearHandler = () => {
        setInputText("");
        uiCtx.closeEditMode();
    };

    const onFocusHandler = () => {
        uiCtx.closeEditMode();
    };

    return (
        <form className="new-todo-container" onSubmit={formSubmit}>
            <input
                className={isLightThemeOn ? "light-theme--element" : ""}
                autoFocus
                type="text"
                value={inputText}
                onFocus={onFocusHandler}
                onChange={inputChangeHandler}
            />
            <button
                className={isLightThemeOn ? "light-theme--element" : ""}
                type="submit"
                title="add"
            >
                ➕
            </button>

            <button
                className={isLightThemeOn ? "light-theme--element" : ""}
                type="button"
                onClick={randomizeHandler}
                title="randomize"
            >
                🎲
            </button>

            <button
                className={isLightThemeOn ? "light-theme--element" : ""}
                type="reset"
                onClick={inputClearHandler}
                title="clear"
                disabled={!inputText}
            >
                🧹
            </button>
        </form>
    );
};

export default NewTodo;
