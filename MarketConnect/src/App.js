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

const supabaseUrl = "https://ooitkismzzkxarjmwdeb.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/food" element={<Food />} />
        <Route path="/fooddetail" element={<FoodDetail />} />
        <Route path="/fooddetail/:foodid" element={<FoodDetail />} />
        <Route path="/verify" element={<Verify />} />
        <Route element={<GuardedRoute />}>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addproduct/:foodid" element={<AddProduct />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage" element={<Manage />} />
        </Route>
        <Route element={<GuardedAdmin />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}
export default App;
