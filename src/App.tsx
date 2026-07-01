import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Register} from "./pages/auth/Register.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {useAuthStore} from "./store/authStore.ts";
import {useCurrentUser} from "./hooks/useCurrentUser.ts";
import {useEffect} from "react";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import {PublicRoute} from "./components/PublicRoute.tsx";

function App() {
    const setUser = useAuthStore((state) => state.setUser);
    const {data, isLoading, isError} = useCurrentUser();

    useEffect(() => {
        if (isError) {
            setUser(null);
        } else if (data) {
            setUser(data);
        } else if (!isLoading && !data) {
            setUser(null);
        }
    }, [data, isError, isLoading, setUser]);


  return (
    <>

        <Routes>
            <Route path={"/"} element={<PublicRoute><Home /></PublicRoute>} />
            <Route path={"/register"} element={<PublicRoute><Register /></PublicRoute>} />
            <Route path={"/dashboard"} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
    </>
  )
}

export default App
