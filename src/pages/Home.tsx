import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {useLogin} from "../hooks/useAuth.ts";

interface User {
    email: string;
    password: string;
}

export const Home = () => {

    const loginMutation = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>();

    const onSubmit = (data: User)  => {
        loginMutation.mutate(data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Login
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Enter your email below to login to your account
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500 dark:focus:ring-gray-300 sm:text-sm"
                                    placeholder="m@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.email.message as string}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500 dark:focus:ring-gray-300 sm:text-sm"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.password.message as string}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white dark:focus:ring-offset-gray-900"
                        >
                            Login
                        </button>
                    </div>

                    {/*<div className="relative flex items-center py-5">*/}
                    {/*    <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>*/}
                    {/*    <span className="mx-4 flex-shrink text-xs uppercase text-gray-400">*/}
                    {/*        Or continue with*/}
                    {/*    </span>*/}
                    {/*    <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*    <button*/}
                    {/*        type="button"*/}
                    {/*        className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900 dark:focus:ring-white dark:focus:ring-offset-gray-900"*/}
                    {/*    >*/}
                    {/*        Login with Google*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    <div className="text-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                            Don't have an account?{" "}
                        </span>
                        <Link
                            to="/register"
                            className="font-medium text-gray-900 hover:underline dark:text-white"
                        >
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};