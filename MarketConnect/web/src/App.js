import {
    Routes,
    Route,
    useNavigationType,
    useLocation,
} from "react-router-dom";

import { useEffect, createContext, useState, useRef } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Food from "./pages/Food";
import FoodDetail from "./pages/FoodDetail";
import AddProduct from "./pages/AddProduct";
import Verify from "./pages/Verify";
import Manage from "./pages/Manage";
import GuardedRoute from "./components/GuardedRoute";
import GuardedAdmin from "./components/GuardedAdmin";
import Admin from "./pages/Admin";
import Chatpage from "./pages/Chatpage";
import { createClient } from "@supabase/supabase-js";

import { BASE_WEB_PATH, SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const useSupabase = () => {
    return supabase;
};

export const AuthContext = createContext({});

function App() {
    const [session, setSession] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const didMount = useRef(false);
    const action = useNavigationType();
    const location = useLocation();
    const supabase = useSupabase();
    const pathname = location.pathname;

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (!didMount.current) {
            return () => (didMount.current = true);
        }
        setIsFetching(false);
    }, [session]);

    useEffect(() => {
        if (action !== "POP") {
            window.scrollTo(0, 0);
        }
    }, [action, pathname]);

    useEffect(() => {
        let title = "";
        let metaDescription = "";

        switch (pathname) {
            case "/":
                title = "MarketConnect";
                metaDescription = "";
                break;
        }

        if (title) {
            document.title = title;
        }

        if (metaDescription) {
            const metaDescriptionTag = document.querySelector(
                'head > meta[name="description"]'
            );
            if (metaDescriptionTag) {
                metaDescriptionTag.content = metaDescription;
            }
        }
    }, [pathname]);
    return (
        <AuthContext.Provider
            value={{
                isFetching: isFetching,
                session: session,
                user: session?.user,
            }}
        >
            <Routes>
                <Route path={`${BASE_WEB_PATH}`} element={<Login />} />
                <Route path={`${BASE_WEB_PATH}/home`} element={<Home />} />
                <Route path={`${BASE_WEB_PATH}/register`} element={<Register />} />
                <Route path={`${BASE_WEB_PATH}/login`} element={<Login />} />
                <Route path={`${BASE_WEB_PATH}/food`} element={<Food />} />
                <Route path={`${BASE_WEB_PATH}/fooddetail`} element={<FoodDetail />} />
                <Route path={`${BASE_WEB_PATH}/fooddetail/:foodid`} element={<FoodDetail />} />
                <Route path={`${BASE_WEB_PATH}/verify`} element={<Verify />} />
                <Route element={<GuardedRoute />}>
                    <Route path={`${BASE_WEB_PATH}/addproduct`} element={<AddProduct />} />
                    <Route path={`${BASE_WEB_PATH}/addproduct/:foodid`} element={<AddProduct />} />
                    <Route path={`${BASE_WEB_PATH}/support`} element={<Support />} />
                    <Route path={`${BASE_WEB_PATH}/profile`} element={<Profile />} />
                    <Route path={`${BASE_WEB_PATH}/manage`} element={<Manage />} />
                </Route>
                <Route element={<GuardedAdmin />}>
                    <Route path={`${BASE_WEB_PATH}/admin`} element={<Admin />} />
                </Route>
            </Routes>
        </AuthContext.Provider>
    );
}
export default App;
