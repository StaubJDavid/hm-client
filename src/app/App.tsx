import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import history from "./helpers/history";

//import {WrappedContainer} from './common/withRouter';

//import Routing from './modules/Routing/Routing';
import Login from './modules/Authentication/Login';
import Register from './modules/Authentication/Register';
import MainPage from './modules/MainPage';
import ContainerPage from './modules/Container/ContainerPage';
import ProtectThisRoute from './modules/ProtectThisRoute';
import FileUpload from './modules/FileUpload';
import FilesUpload from './modules/FilesUpload';
import Navbar from './modules/Layout/Navbar';
import MapTest from './modules/MapTest';
import MapGuide from './modules/MapGuide';
import CreateContainer from './modules/Container/CreateContainer';

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
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/*<Route path="/container/:c_id" element={<WrappedContainer />} />*/}
            {/*element={withRouter(<Container />)} */}
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

            <Route path="/container/:c_id" element={<ContainerPage />} />
            <Route path="/createcontainer" element={<CreateContainer />} />
            <Route path="/maptest" element={<MapGuide />} />
            {/*<Route path="/container/:c_id" element={
              <RequireAuth redirectTo="/login" >
                <ContainerPage />
              </RequireAuth>
            } />*/}
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

function RedirectIfAuth({children, redirectTo}:any){
  let isAuthenticated = store.getState().auth.isAuthenticated;
  return isAuthenticated?<Navigate to={redirectTo} />:children;
}

export default App;
