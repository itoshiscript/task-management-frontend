import {api} from "./api.ts";

export const getAllTasks = () => {
    return api.get("/tasks")
}