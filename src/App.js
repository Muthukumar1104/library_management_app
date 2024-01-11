import React, { Suspense, useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import './App.css';
import AppContext from './Components/Context/Appcontext';

// Containers
const DefaultLayout = React.lazy(() =>
  import('./layout/DefaultLayout/DefaultLayout')
);
// Pages
const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const Signup = React.lazy(() => import('./views/Pages/Signup/Signup'));

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);

function App() {
  var li = localStorage.getItem('loggedIn');
  var logged = JSON.parse(localStorage.getItem('user_details'));
  useEffect(() => {
    setUser({
      type: 'onload',
      loggedin: li != undefined && li != 'false',
      loginfo: logged,
    });
  }, []);

  const initialprops = {
    loggedin: false,
    loginfo: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          loggedin: true,
          loginfo: action.loginfo,
        };
      case 'logout':
        return { loggedin: false };
      case 'onload':
        return {
          ...state,
          loggedin: action.loggedin,
          loginfo: action.loginfo,
        };
      default:
        return state;
    }
  };

  const [user, dispatch] = useReducer(reducer, initialprops);
  const setUser = (obj) => {
    dispatch(obj);
  };
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router basename='/crm'>
        <Suspense fallback={loading}>
          <Routes>
            {!user.loggedin ? (
              <>
                <Route path='/' name='Login Page' element={<Login />} />
                <Route
                  exact
                  path='/signup'
                  name='Signup Page'
                  element={<Signup />}
                />
                <Route
                  path='/*'
                  element={
                    <>
                      <Login />
                      <Navigate to='/login' replace />
                    </>
                  }
                />
              </>
            ) : (
              <Route path='/*' name='Home' element={<DefaultLayout />} />
            )}
          </Routes>
        </Suspense>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
