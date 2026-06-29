import {api} from "./api.ts";

interface LoginForm {
    email: string;
    password: string;
}

interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

export const login = (data: LoginForm) => {
    return api.post("/auth/login", data)
}

export const register = (data: RegisterForm) => {
    return api.post("/auth/register", data)
}