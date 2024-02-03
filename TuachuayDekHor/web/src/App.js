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
import { supabaseKey, supabaseUrl } from './config';

const supabase = createClient(supabaseUrl,supabaseKey);

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
        <Route path="/" element={<Navigate to ='/home'/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/report" element={<Report />} />
        <Route path="/writeblog" element={<WriteBlog />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/profile/:userId" element={<Profile />}/>
        <Route path="/cleaning" element={<Cleaning />}/>
        <Route path="/cleaning/:id" element={<Details />}/>
        <Route path="/cooking" element={<Cooking />}/>
        <Route path="/cooking/:id" element={<Details />}/>
        <Route path="/decoration" element={<Decoration />}/>
        <Route path="/decoration/:id" element={<Details />}/>
        <Route path="/story" element={<Story />}/>
        <Route path="/story/:id" element={<Details />}/>
        <Route path="/reportfinish" element={<Reportfinish />}/>
        <Route path="/contactfinish" element={<Contactfinish />}/>
        <Route path="/blogger" element={<Blogger />}/>
        <Route path="/search" element={<Search />}/>
        {/* <Route element = {<guarderout/>}>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/writeblog" element={<WriteBlog />} />
          <Route path="/report" element={<Report />} />
        </Route> */}
      </Routes>
    </General.Provider> 
  );
}
export default App;
