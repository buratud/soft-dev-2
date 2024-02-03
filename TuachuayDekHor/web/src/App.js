import React, { useEffect,useState ,createContext,useRef} from 'react';
import {Routes,Route,Navigate,useNavigationType,useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Report from "./pages/Report";
import WriteBlog from './pages/WriteBlog';
import Contact from "./pages/Contact";
import Profile from './pages/Profile';
import Cleaning from './pages/Cleaning';
import Cooking from './pages/Cooking';
import Decoration from './pages/Decoration';
import Story from './pages/Story';
import Details from './pages/Details';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reportfinish from './pages/Reportfinish';
import Contactfinish from './pages/Contactfinish';
import Blogger from './pages/Blogger';
import Search from './pages/Search';
import { createClient } from '@supabase/supabase-js';
import guarderout from './component/guarderout';
import { BASE_WEB_PATH, SUPABASE_URL, SUPABASE_ANON_KEY } from './config';

const supabase = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

export const General =createContext({});

function App() {
  const [session,setSession] =useState(null);
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const[isFetching,setFetching] = useState(true);
  const didMount = useRef(false);

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
  useEffect(()=>{
    if (!didMount.current){
      return() =>(didMount.current = true);
    }
    setFetching(false);
  },[session]);

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
        title = "";
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

  const value = {
    isFetching: isFetching,
    supabase_for_use: supabase,
    session: session,
    user: session?.user,
  };

  return (
    <General.Provider
      value = {value}
    >
      <Routes>
        <Route path={`${BASE_WEB_PATH}`} element={<Navigate to ={`${BASE_WEB_PATH}/home`}/>} />
        <Route path={`${BASE_WEB_PATH}/home`} element={<Home />} />
        <Route path={`${BASE_WEB_PATH}/login`} element={<Login />} />
        <Route path={`${BASE_WEB_PATH}/signup`} element={<Signup />} />
        <Route path={`${BASE_WEB_PATH}/report`} element={<Report />} />
        <Route path={`${BASE_WEB_PATH}/writeblog`} element={<WriteBlog />} />
        <Route path={`${BASE_WEB_PATH}/contact`} element={<Contact />}/>
        <Route path={`${BASE_WEB_PATH}/profile/:userId`} element={<Profile />}/>
        <Route path={`${BASE_WEB_PATH}/cleaning`} element={<Cleaning />}/>
        <Route path={`${BASE_WEB_PATH}/cleaning/:id`} element={<Details />}/>
        <Route path={`${BASE_WEB_PATH}/cooking`} element={<Cooking />}/>
        <Route path={`${BASE_WEB_PATH}/cooking/:id`} element={<Details />}/>
        <Route path={`${BASE_WEB_PATH}/decoration`} element={<Decoration />}/>
        <Route path={`${BASE_WEB_PATH}/decoration/:id`} element={<Details />}/>
        <Route path={`${BASE_WEB_PATH}/story`} element={<Story />}/>
        <Route path={`${BASE_WEB_PATH}/story/:id`} element={<Details />}/>
        <Route path={`${BASE_WEB_PATH}/reportfinish`} element={<Reportfinish />}/>
        <Route path={`${BASE_WEB_PATH}/contactfinish`} element={<Contactfinish />}/>
        <Route path={`${BASE_WEB_PATH}/blogger`} element={<Blogger />}/>
        <Route path={`${BASE_WEB_PATH}/search`} element={<Search />}/>
        {/* <Route element = {<guarderout/>}>
          <Route path={`${BASE_WEB_PATH}/profile`} element={<Profile />}/>
          <Route path={`${BASE_WEB_PATH}/writeblog`} element={<WriteBlog />} />
          <Route path={`${BASE_WEB_PATH}/report`} element={<Report />} />
        </Route> */}
      </Routes>
    </General.Provider> 
  );
}
export default App;
