import {
  Routes,
  Route,
  useNavigationType,
  useLocation,  Navigate
} from "react-router-dom";

import { useEffect, createContext, useState, useRef } from "react";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Food from "./pages/Food";
import FoodDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Manage from "./pages/ManageProduct";
import GuardedRoute from "./components/GuardedRoute";
import GuardedAdmin from "./components/GuardedAdmin";
import Admin from "./pages/Admin";
import { createClient } from "@supabase/supabase-js";
import { REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SUPABASE_URL } from "./config";

export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY);

export const useSupabase = () => {
  return supabase;
};

export const AuthContext = createContext({});

function App() {  
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const action = useNavigationType();
  const location = useLocation();
  const supabase = useSupabase();
  const pathname = location.pathname;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange", _event)
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

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

  if (isLoading) {
    return <div>Hold...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        session: session,
        user: session?.user
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/food" element={<Food />} />
        <Route path="/fooddetail" element={<FoodDetail />} />
        <Route path="/fooddetail/:foodid" element={<FoodDetail />} />
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
