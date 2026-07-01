import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import * as React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = useAuthStore((state) => state.user);
    const isInitialized = useAuthStore((state) => state.isInitialized);

    if (!isInitialized) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent dark:border-white"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};