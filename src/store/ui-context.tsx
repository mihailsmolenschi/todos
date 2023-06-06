import {
    createContext,
    FunctionComponent,
    PropsWithChildren,
    useState,
} from "react";

export const UiContext = createContext({
    isEditingTodos: false,
    isRemovingPromptOpen: false,
    toggleEditMode: () => {
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
    const [isRemovingPromptOpen, setIsRemovingPromptOpen] = useState(false);

    const toggleEditMode = () => {
        setIsEditingTodos((prevIsEditing) => !prevIsEditing);
    };

    const closeEditMode = () => {
        setIsEditingTodos(false);
    };

    const closeRemovingPrompt = () => {
        setIsRemovingPromptOpen(false);
    };

    const openRemovingPrompt = () => {
        setIsRemovingPromptOpen(true);
    };

    const uiContextObj = {
        isEditingTodos,
        isRemovingPromptOpen,
        toggleEditMode,
        closeEditMode,
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
