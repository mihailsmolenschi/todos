import { generateId } from "../utils/generateId";

export const DUMMY_TODOS = [
    { id: generateId(), text: "buy some food", status: "in-progress" },
    { id: generateId(), text: "activate windows", status: "in-progress" },
    { id: generateId(), text: "run 10km", status: "completed" },
];
