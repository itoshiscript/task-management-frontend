import {me} from "../services/authServices.ts";
import {useQuery} from "@tanstack/react-query";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const response = await me();
            return response.data;
        },
        retry: false,
    });
};