import React, { Component } from 'react';
import './ForgetPassword.css'
import { resetpassword } from '../services/userService'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class ResetPassword extends Component{
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            passwordError: "",
            flag: false
        }
    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

  
    validate = () => {
        let isError = false;

        const errors = {
            passwordError: ""
        };


        if ((this.state.password.length < 6 ) || (this.state.password.length > 12) ){
            isError=true;
            
            errors.passwordError = "Password length should greater than 6 and less than 12";
          }


        this.setState({
            ...this.state,
            ...errors
        });

        console.log("In validate----->" + this.state);


        return isError;
    }

    handleSubmit=(event)=>{

        event.preventDefault();
       this.validate()
     const err = this.validate();

     var resetData = {};
     resetData.newPassword = this.state.password;
 
     console.log("reset data--> ", resetData)

     let url=window.location.pathname;
     let token=url.substring(15);
     console.log("TOKEN------->",token);
     
    
     
     resetpassword(resetData,token).then((res) => {
         console.log("respnse in reset password--> ", res)

       

    //   alert("Password has been reseted");  

    var path = '/login'
    this.props.history.push(path)
    
         
     }).catch((err) => {
        this.setState({ flag: true })
         console.log("error in reset--> ",err)
     })

        

        if (!err) {
            // clear form
            this.setState({
                password: "",
                passwordError: ""
            });
        }
    }


    render(){
        return (
            <div className="maindiv2">
               <div id="fundoo">
                        <label id="flabel">F</label>
                        <label id="ulabel">u</label>
                        <label id="nlabel">n</label>
                        <label id="dlabel">d</label>
                        <label id="olabel">o</label>
                        <label id="o2label">o</label>
                    </div>  
                    <div id="text3">Reset Password</div>
                    {/* <div id="text3">Enter Email Id</div> */}
                    <div id="Id">
                    <TextField
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handlechangeall}

                        />
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.passwordError}
                    </div>
                    <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}

                            >
                                Submit
                    </Button>
                        </div>

                        <Snackbar

                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.state.flag}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                           
                            message="Resetting Password Failed"
                            

                        />
            </div>

        );
    }
   
}

export default ResetPassword