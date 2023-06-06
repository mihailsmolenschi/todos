import {
    createContext,
    FunctionComponent,
    PropsWithChildren,
    useState,
} from "react";

export const UiContext = createContext({
    isEditingTodos: false,
    isEditingTodo: false,
    currentEditingTodoId: "",
    isRemovingPromptOpen: false,
    toggleEditMode: () => {
        return;
    },
    toggleEditTodo: (id?: string) => {
        return;
    },
    closeEditMode: () => {
        return;
    },
    openRemovingPrompt: () => {
        return;
    },
    closeRemovingPrompt: () => {
        return;
    },
});

const UiContextProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [isEditingTodos, setIsEditingTodos] = useState(false);
    const [isEditingTodo, setIsEditingTodo] = useState(false);
    const [currentEditingTodoId, setCurrentEditingTodoId] = useState("");
    const [isRemovingPromptOpen, setIsRemovingPromptOpen] = useState(false);

    const toggleEditMode = () => {
        console.log("- TOGGLE EDIT MODE");
        if (isEditingTodos) {
            setIsEditingTodo(false);
        }
        setCurrentEditingTodoId("");
        setIsEditingTodos((prevIsEditing) => !prevIsEditing);
    };

    const closeEditMode = () => {
        setIsEditingTodos(false);
        setIsEditingTodo(false);
        setCurrentEditingTodoId("");
    };

    const toggleEditTodo = (id = "") => {
        console.log("- TOGGLE EDIT TODO");

        if (currentEditingTodoId !== id) {
            setIsEditingTodo(true);
        } else {
            setIsEditingTodo((prevIsEditing) => !prevIsEditing);
        }

        setCurrentEditingTodoId(id);
    };

    const closeRemovingPrompt = () => {
        setIsRemovingPromptOpen(false);
    };

    const openRemovingPrompt = () => {
        setIsRemovingPromptOpen(true);
    };

    const uiContextObj = {
        isEditingTodos,
        isEditingTodo,
        currentEditingTodoId,
        isRemovingPromptOpen,
        toggleEditMode,
        closeEditMode,
        toggleEditTodo,
        openRemovingPrompt,
        closeRemovingPrompt,
    };

    return (
        <UiContext.Provider value={uiContextObj}>
            {props.children}
        </UiContext.Provider>
    );
};

export default UiContextProvider;
