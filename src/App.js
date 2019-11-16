import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from './Components/Login';
import createAccount from './Components/createAccount'
import ForgetPassword from './Components/ForgetPassword'
import Dashboard from './Components/Dashboard'
import ResetPassword from './Components/ResetPassword'

import './App.css';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('LoginToken')
      ? <Component {...props} />
      : <Redirect to='/login'/>
  )} />
)

class App extends Component {
  render(){
    return (
      <div className="App">
        <Router>
            <Route path="/login" exact component={Login} />
             <Route path="/register" component={createAccount} />
          <Route path="/forgetpassword" component={ForgetPassword} />
             <Route path="/resetpassword" component={ResetPassword} />
            {/* <Route path="/dashboard" component={Dashboard} /> */}
            <PrivateRoute path='/dashboard' exact component={Dashboard} />
            {/* <Route path='/dashboard' exact component={Dashboard} /> */}
           
          </Router>
      </div>
    );
  }
 
}

export default App;
