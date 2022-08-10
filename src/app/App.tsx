import {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';

import Login from './modules/Authentication/Login';
import Register from './modules/Authentication/Register';
import MainPage from './modules/MainPage';
import ContainerPage from './modules/Container/ContainerPage';
import Navbar from './modules/Layout/Navbar';
import CreateContainer from './modules/Container/CreateContainer';
import ApprovePage from './modules/Approve/ApprovePage';

if(localStorage.JWT){
  setAuthToken(localStorage.JWT);
  const decoded:any = jwt_decode(localStorage.JWT);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

class App extends Component  {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='container-fluid px-0 py-0 min-vh-100' >
            <div className="row g-0">
              <div className="col px-0">
                <Navbar />
              </div>
            </div>
            <div className="row g-0">
              <div className="col px-0" >
                <div className={"bg-primary"} >
                  <Routes>
                    <Route path="/" element={<MainPage />} />

                    <Route path="/login" element={
                      <RedirectIfAuth redirectTo="/" >
                        <Login />
                      </RedirectIfAuth>
                    } />

                    <Route path="/register" element={
                      <RedirectIfAuth redirectTo="/" >
                        <Register />
                      </RedirectIfAuth>
                    } />

                    <Route path="/container/:c_id" element={<ContainerPage />} />
                    <Route path="/createcontainer" element={<CreateContainer />} />
                    <Route path="/approve" element={<ApprovePage />} />
                    
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

function RequireAuth({children, redirectTo}:any){
  let isAuthenticated = store.getState().auth.isAuthenticated;
  return isAuthenticated?children:<Navigate to={redirectTo} />;
}

function RedirectIfAuth({children, redirectTo}:any){
  let isAuthenticated = store.getState().auth.isAuthenticated;
  return isAuthenticated?<Navigate to={redirectTo} />:children;
}

export default App;
