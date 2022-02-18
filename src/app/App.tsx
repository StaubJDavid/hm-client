import React, {Component} from 'react';import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';

//import Routing from './modules/Routing/Routing';
import Login from './modules/Authentication/Login';
import Register from './modules/Authentication/Register';
import FirstPage from './modules/FirstPage';
import ProtectThisRoute from './modules/ProtectThisRoute';
import FileUpload from './modules/FileUpload';
import FilesUpload from './modules/FilesUpload';

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
          <Routes>
            <Route path="/" element={<FirstPage first={1}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/images" element={<FilesUpload />} />
            <Route path="/protected" element={
              <RequireAuth redirectTo="/login" >
                <ProtectThisRoute />
              </RequireAuth>
            } />

            <Route path="/image" element={
              <RequireAuth redirectTo="/login" >
                <FileUpload />
              </RequireAuth>
            } />
          </Routes>
        </Router>
      </Provider>
    );
  }
}

function RequireAuth({children, redirectTo}:any){
  let isAuthenticated = store.getState().auth.isAuthenticated;
  return isAuthenticated?children:<Navigate to={redirectTo} />;
}

export default App;
