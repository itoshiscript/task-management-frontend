import {useMutation} from "@tanstack/react-query";
import {login, register} from "../services/authServices.ts";
import {useNavigate} from "react-router-dom";


export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            console.log(response.data);
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    })
}

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate("/");
        }
    })
}