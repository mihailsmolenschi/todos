import {
    FunctionComponent,
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from "react";

// import { DUMMY_TODOS } from "./dummy-todos";
import { generateId } from "../utils/generateId";

export type ItemType = { id: string; text: string; status: string };

export const TodosContext = createContext({
    items: [{ id: "", text: "", status: "" }],
    addTodo: (text: string) => {
        return;
    },
    removeTodo: (id: string) => {
        return;
    },
    updateTodo: (id: string, text: string, status?: string) => {
        return;
    },
    removeAllTodos: () => {
        return;
    },
});

const TodosContextProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const browserStorage: ItemType[] =
        JSON.parse(localStorage.getItem("todos")) || [];
    const [todos, setTodos] = useState(browserStorage);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        setTodos((prevTodos) => [
            { id: generateId(), text, status: "" },
            ...prevTodos,
        ]);
    };

    const updateTodo = (id: string, text: string, status = "") => {
        setTodos((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    item.text = text;
                    item.status = status;
                }

                return item;
            });
        });
    };

    const removeTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const removeAllTodos = () => {
        setTodos([]);
        localStorage.removeItem("todos");
    };

    const todosContextObj = {
        items: todos,
        addTodo,
        removeTodo,
        updateTodo,
        removeAllTodos,
    };

    return (
        <TodosContext.Provider value={todosContextObj}>
            {props.children}
        </TodosContext.Provider>
    );
};

export default TodosContextProvider;
