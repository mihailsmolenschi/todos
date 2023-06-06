import { generateId } from "../utils/generateId";

export const DUMMY_TODOS = [
    { id: generateId(), text: "buy some food", status: "" },
    { id: generateId(), text: "activate windows", status: "" },
    { id: generateId(), text: "run 10km", status: "completed" },
];
