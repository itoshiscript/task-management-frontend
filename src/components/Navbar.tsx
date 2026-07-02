import {Link} from "react-router-dom";
import {useAuthStore} from "../store/authStore.ts";
import {useEffect, useState} from "react";
import {useLogout} from "../hooks/useAuth.ts";
import * as React from "react";

export const Navbar = () => {

    const user = useAuthStore((state) => state.user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const logoutMutation = useLogout();
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center md:hidden">
            <button className="text-gray-600 dark:text-gray-400">
                <span className="text-2xl">☰</span>
            </button>
        </div>
        <div className="flex flex-1 items-center px-4 md:px-0">
            <div className="relative w-full max-w-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
                <input
                    type="text"
                    className="block w-full rounded-md border border-gray-300 bg-gray-50 py-1.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:ring-gray-300"
                    placeholder="Search tasks..."
                />
            </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
            <button className="rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="text-xl">🔔</span>
            </button>
            <div className="relative ml-3" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white text-xs dark:bg-white dark:text-black">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                    <span className="ml-2 hidden text-sm font-medium text-gray-700 dark:text-gray-300 lg:block">
                                    {user?.name || "User"}
                                </span>
                    <svg className="ml-1 hidden h-4 w-4 text-gray-400 lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                        <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || "User"}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ""}</p>
                        </div>
                        <Link
                            to="/settings"
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            Settings
                        </Link>
                        <button
                            onClick={() => {
                                logoutMutation.mutate();
                            }}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    </header>
    )
}