import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login, logout, me, register} from "../services/authServices.ts";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.ts";


export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: login,
        onSuccess: async () => {
            const data = await queryClient.fetchQuery({
                queryKey: ["currentUser"],
                queryFn: async () => {
                    const response = await me();
                    return response.data;
                },
            });
            setUser(data);
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });
};

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate("/");
        }
    })
}

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const clearUser = useAuthStore((state) => state.clearUser);

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["currentUser"] });
            clearUser();
            navigate("/");
        },
    });
}