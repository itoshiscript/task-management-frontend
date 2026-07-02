import {useQuery} from "@tanstack/react-query";
import {getAllTasks} from "../services/taskServices.ts";

export const useGetAllTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getAllTasks,
        staleTime: 1000 * 60 * 5,
    });
}