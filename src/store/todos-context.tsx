import {
    FunctionComponent,
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from "react";

import { generateId } from "../utils/generateId";
// import { DUMMY_TODOS } from "./dummy-todos";

export type ItemType = { id: string; status: string; text: string };

export const TodosContext = createContext({
    items: [{ id: "", status: "", text: "" }],
    editTodoId: "",
    addTodo: (text: string) => {
        return;
    },
    removeTodo: (id: string) => {
        return;
    },
    updateTodo: (id: string, status: string, text?: string) => {
        return;
    },
    removeAllTodos: () => {
        return;
    },

    changeEditTodoId: (id: string) => {
        return;
    },
});

const TodosContextProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const browserStorage: ItemType[] =
        JSON.parse(localStorage.getItem("todos")) || [];

    const [todos, setTodos] = useState(browserStorage);

    const [editTodoId, setEditTodoId] = useState("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        setTodos((prevTodos) => [
            { id: generateId(), status: "in-progress", text },
            ...prevTodos,
        ]);
    };

    const updateTodo = (id: string, status: string, text?: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((item) => {
                if (item.id !== id) return item;

                if (text) {
                    item.text = text;
                }

                if (status !== item.status) {
                    item.status = status;
                }

                return item;
            })
        );

        setEditTodoId("");
    };

    const removeTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const removeAllTodos = () => {
        setTodos([]);
        localStorage.removeItem("todos");
    };

    const changeEditTodoId = (id = "") => {
        setEditTodoId(id);
    };

    const todosContextObj = {
        items: todos,
        editTodoId,
        addTodo,
        removeTodo,
        updateTodo,
        removeAllTodos,
        changeEditTodoId,
    };

    return (
        <TodosContext.Provider value={todosContextObj}>
            {props.children}
        </TodosContext.Provider>
    );
};

export default TodosContextProvider;
