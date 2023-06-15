import {
    createContext,
    FunctionComponent,
    PropsWithChildren,
    useState,
    useEffect,
} from "react";

export const UiContext = createContext({
    isEditingTodos: false,
    isRemovingPromptOpen: false,
    isLightThemeOn: false,
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
    toggleUiTheme: () => {
        return;
    },
});

const UiContextProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const loadTheme: boolean =
        JSON.parse(localStorage.getItem("isLightThemeOn")) || false;

    const [isEditingTodos, setIsEditingTodos] = useState(false);
    const [isRemovingPromptOpen, setIsRemovingPromptOpen] = useState(false);
    const [isLightThemeOn, setIsLightThemeOn] = useState(loadTheme);

    useEffect(() => {
        localStorage.setItem("isLightThemeOn", JSON.stringify(isLightThemeOn));
    });

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

    const toggleUiTheme = () => {
        setIsLightThemeOn((prev) => !prev);
    };

    const uiContextObj = {
        isEditingTodos,
        isRemovingPromptOpen,
        isLightThemeOn,
        toggleEditMode,
        closeEditMode,
        openRemovingPrompt,
        closeRemovingPrompt,
        toggleUiTheme,
    };

    return (
        <UiContext.Provider value={uiContextObj}>
            {props.children}
        </UiContext.Provider>
    );
};

export default UiContextProvider;
