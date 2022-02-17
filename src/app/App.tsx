import React, {Component} from 'react';import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';

import FirstPage from './modules/FirstPage';

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
    return (<Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<FirstPage first={1}/>} />
          </Routes>
        </Router>
      </Provider>
    );
  }
}

export default App;
