import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from './Components/Login';
import createAccount from './Components/createAccount'
import ForgetPassword from './Components/ForgetPassword'
import Dashboard from './Components/Dashboard'
import ResetPassword from './Components/ResetPassword'
import ChildNote from './Components/ChildNote'
import ChildArchive from './Components/ChildArchive'
import ChildTrash from './Components/ChildTrash'
import ChildRemind from './Components/ChildRemind'
import ChildLabel from './Components/ChildLabel'
import Label from './Components/Label'
import ChooseService from './Components/ChooseService'
import {Provider} from 'react-redux'
import './App.css';
import  store  from './Store/Store';
import SearchNote from './Components/SearchNote'
import AskQuestion from './Components/AskQuestion'
import SignUp from './Components/SignUp'
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import shoppingCart from './Components/shoppingCart'



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
    
   



      <Provider store={store}>

        <Router>
          <Route path="/" exact component={ChooseService} />
          <Route path="/signUp" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
             <Route path="/register" component={createAccount} />
             <Route path="/forgetpassword" component={ForgetPassword} />
             <Route path="/resetpassword" component={ResetPassword} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/dashboard/notes' component={ChildNote} />
            <Route path='/dashboard/archiveNotes' component={ChildArchive} />
            <Route path='/dashboard/trashNotes' component={ChildTrash} />
            <Route path='/dashboard/remindNotes' component={ChildRemind} />
            <Route path='/dashboard/labelNotes' component={ChildLabel} />
            <Route path='/dashboard/label/:username' component={Label} />
            <Route path='/dashboard/search' component={SearchNote} />
            <Route path='/dashboard/AskQuestion/:id' component={AskQuestion} />
            <Route path='/dashboard/shoppingCart' component={shoppingCart} />
            

          </Router>
          
          </Provider>

         
      </div>
    );
  }
  
 
}



export default App;
