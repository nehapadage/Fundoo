import React, { Component } from 'react'
import './createAccount.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import { register } from '../services/userService'
import Snackbar from '@material-ui/core/Snackbar';

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                textTransform: "lowercase",
                fontsize: 0.875
            }

        }
    }

});

class createAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
            redirect: false,
            flag: false,
            flag1:false
        }
    }


    setRedirect = () => {
        this.setState({
            redirect: true
        })

    }

    renderRedirect = () => {
        if (this.state.redirect) {
            var path = '/login'
            this.props.history.push(path)
        }
    }

    handleLoginClick = () => {
        var path = '/login'
        this.props.history.push(path)
    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    validateEmail(email){
        // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re=/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        return re.test(email);
      }
    

    validate = () => {
        let isError=false;
        const errors={

            firstNameError : "",
         lastNameError : "",
         emailError : "",
         passwordError : "",
         confirmPasswordError: "",

        };

    
    
        if (this.state.firstName.length < 4) {
            isError=true;
          errors.firstNameError = "First name needs to be atleast 5 characters long";
        }

        if (this.state.lastName.length < 4) {
            isError=true;
            errors.lastNameError = "Last name needs to be atleast 5 characters long";
          }
    
        // if (!this.state.email.includes("@")) {
        //     isError=true;
        //   errors.emailError = "Requires valid email";
        // }

        if (! this.validateEmail(this.state.email)) {
            isError = true;
            errors.emailError = "Requires valid email";
        }

        if ((this.state.password.length < 6 ) || (this.state.password.length > 12) ){
            isError=true;
            
            errors.passwordError = "Password length should greater than 6 and less than 12";
          }

          if ((this.state.confirmPassword.length < 6 ) || (this.state.confirmPassword.length > 12) ){
            isError=true;
            
            errors.confirmPasswordError = "Password length should greater than 6 and less than 12";
          }
    
          this.setState({
            ...this.state,
            ...errors
          });

          console.log("In validate----->"+this.state);
          
      
          return isError;
      };

      handleCreateAccountSubmit = (event) => {

        event.preventDefault();
       this.validate()
     const err = this.validate();

    //   if(this.state.password===this.state.confirmPassword)
    //   {
        var registerData = {};
        registerData.firstName = this.state.firstName;
        registerData.lastName = this.state.lastName;
        registerData.email = this.state.email;
        registerData.password = this.state.password
        registerData.service = 'basic'

        console.log("registerData--> ", JSON.stringify(registerData))



        register(registerData).then((res) => {
            console.log("respnse in register--> ", res)

            if (res.data.data.success === true) {
                this.setState({ flag1: true })
                // alert(`Registration Successful-----`);
                this.setRedirect();
            }
            // else {
            //     alert(`Email Already Exists-----`);
                
            // }
        }).catch((err) => {
            this.setState({ flag: true })
            console.log("error in registration--> ", err)
        })


    //   }
      

    

           
        

       if (!err) {
            // clear form
            this.setState({
              firstName: "", 
              firstNameError: "",
              lastName: "",
              lastNameError: "",
              email: "",
              emailError: "",
              password: "",
              passwordError: "",
              confirmPassword: "",
              confirmPasswordError: "",
            });
        }
        
        

    }

    handleClose = () => {
        console.log("Flag before",this.state.flag);
             
        this.setState({ flag: false})

        console.log("Flag before",this.state.flag);
    };

    handleClose1 = () => {
    
        console.log("Flag1 before",this.state.flag1);
        
        this.setState({flag1:false })


        console.log("Flag1 before",this.state.flag1);
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="maindiv1">
                {/* <form onSubmit={this.handlesubmit} ></form> */}
                <div id="fundoo1">
                    <label id="flabel">F</label>
                    <label id="ulabel">u</label>
                    <label id="nlabel">n</label>
                    <label id="dlabel">d</label>
                    <label id="olabel">o</label>
                    <label id="o2label">o</label>
                </div>
                <div id="text1">Create your Fundoo Account</div>

                <div id="fnln">
                    <div >
                    <TextField
                        id="firstName"
                        label="First name"
                        type="string"
                        name="firstName"
                        value={this.state.firstName}
                        // autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handlechangeall}
                        errorText={this.state.firstNameError}

                    />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div>
                    <TextField
                        id="lastName"
                        label="Last name"
                        type="string"
                        name="lastName"
                        value={this.state.lastName}
                        // autoComplete="email"
                        error={this.state.lastNameError}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handlechangeall}
                        errorText={this.state.lastNameError}

                    />
                        </div> 
                                      
                   
                </div>

                <div id="fnlnerr">
                <div style={{ fontSize: 12, color: "red" }}>
            {this.state.firstNameError}
          </div>
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.lastNameError}
          </div>
                </div>
                <div id="email1">
                        <TextField
                            id="emailText"
                            label="Email Id"
                            type="email"
                            name="email"
                            value={this.state.email}
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handlechangeall}
                            errorText={this.state.emailError}
                        />
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
          </div>
                    <div id="text2">You can use letters and numbers</div>

                    <div id="passcon">
                        <div>
                        <TextField
                            id="pass"
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
                        &nbsp;&nbsp;&nbsp;
                        <div>
                        <TextField
                            id="conpass"
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handlechangeall}

                        />
                        </div>
                    </div>

                    <div id="passconerr">
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.passwordError}
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.confirmPasswordError}
                    </div>
                    </div>
                    <div id="lastrow">
                    
                        <Button id="login1"
                            onClick={this.handleLoginClick}
                        >Log in instead
                        </Button>
                    
                        <div>
                        {/* {this.renderRedirect()} */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleCreateAccountSubmit}

                            >Create account
                                
                    </Button>
                        </div>
                    </div>

                     <Snackbar

                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.state.flag}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                           
                            message="Registration Failed"
                       />

                       <Snackbar

                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.state.flag1}
                            autoHideDuration={6000}
                            onClose={this.handleClose1}
                           
                            message="Registration Successful"
                       />
                        

            </div>
            </MuiThemeProvider>

                
            
            
        );
    }
};

export default createAccount;