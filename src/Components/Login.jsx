import React, { Component } from 'react'
import './Login.css'
import userService from '../services/userService'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';


const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                textTransform: "lowercase"
            }

        }
    }

});


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {

            email: "",
            password: "",
            emailError: "",
            passwordError: "",
            flag: false,
            progress: false,
        }
    }


    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    validateEmail(email) {
        // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        return re.test(email);
    }

    validate = () => {
        let isError = false;

        const errors = {
            emailError: "",
            passwordError: ""
        };



        if (!this.validateEmail(this.state.email)) {
            isError = true;
            errors.emailError = "Requires valid email";
        }

        if ((this.state.password.length < 6) || (this.state.password.length > 12)) {
            isError = true;

            errors.passwordError = "Password length should greater than 6 and less than 12";
        }

        this.setState({
            ...this.state,
            ...errors
        });

        console.log("In validate----->" + this.state);


        return isError;
    };

    handleloginSubmit = (event) => {



        event.preventDefault();
        this.validate()
        const err = this.validate();

        if (!err) {
            var loginData = {};
            loginData.email = this.state.email;
            loginData.password = this.state.password

            console.log("logindata--> ", JSON.stringify(loginData))






            //     const timer = setInterval(this.state.progress, 20);
            // return () => {
            //   clearInterval(timer);
            // };

            userService.login(loginData).then((res) => {
                console.log("respnse in login--> ", res)

                console.log("****respnse in login token is--> ", res.data.id)


                if (res.data.id) {

                    console.log("Flag-------------->", this.state.flag);

                    // alert("Login Successful-----");
                    localStorage.setItem('LoginToken', res.data.id);
                    localStorage.setItem('firstName', res.data.firstName)
                    localStorage.setItem('lastName', res.data.lastName)
                    localStorage.setItem('email', res.data.email)


                    var path = '/dashboard'
                    this.props.history.push(path)
                }


            }).catch((err) => {
                this.setState({ flag: true })
                console.log("error in login--> ", err)
            })

        }


        if (!err) {
            // clear form
            this.setState({
                email: "",
                emailError: "",
                password: "",
                passwordError: ""
            });
        }

        //for loading
        this.setState({ progress: true })

        this.timer = setTimeout(this.changeProgress, 700);
    }

    changeProgress = () => {
        this.setState({ progress: false })
    }

    handleCreateAccountClick = () => {
        console.log("createAccount button clicked..")
        var path = '/createAccount'
        this.props.history.push(path)
    }

    handleforgetPasswordSubmit = () => {
        console.log("forget password button clicked..")
        var path = '/forgetpassword'
        this.props.history.push(path)
    }

    handleClose = () => {
        console.log("Flag before", this.state.flag);

        this.setState({ flag: false })

        console.log("Flag after", this.state.flag);
    };

    // componentDidMount() {
    //     // function tick() {
    //     //     // reset when reaching 100%
    //     //     // (this.state.progress===100)?(this.setState({progress:0})):(this.setState({progress:this.state.progress + 1}))
    //     // }

    //     const timer = setInterval(20);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }


    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <div className="mainBody">
                <div className="adminMainDiv">
                    <div id="fundoo">
                        <label id="flabel">F</label>
                        <label id="ulabel">u</label>
                        <label id="nlabel">n</label>
                        <label id="dlabel">d</label>
                        <label id="olabel">o</label>
                        <label id="o2label">o</label>
                    </div>

                    <div>

                        <div id="login">Login </div>
                        <div id="text">Use your Fundoo Account</div>

                    </div>

                    <div className="textfields">
                        <div className="emailIdField">
                            <TextField
                                id="EmailPass"
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

                        <div className="PasswordField">
                            <TextField
                                id="EmailPass"
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
                            <Button id="forgotPass"
                                onClick={this.handleforgetPasswordSubmit}>Forgot Password?</Button>
                        </div>
                        <div id="text">Not your computer? Use Guest mode to sign in privately.</div>
                        <div>
                            <Button id="learnMore">Learn more</Button>
                        </div>
                        <div>
                            <Button id="createAccount"
                                onClick={this.handleCreateAccountClick}
                            >Create account
                        </Button>
                            <div>
                                <Button
                                    id="loginButton"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleloginSubmit}

                                >
                                    Login
                    </Button>
                            </div>
                            {this.state.progress ? <CircularProgress /> : null}

                            <div>
                                <Snackbar

                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    open={this.state.flag}
                                    autoHideDuration={6000}
                                    onClose={this.handleClose}

                                    message="Login Failed"


                                />
                            </div>

                        </div>
                    </div>



                </div>
            </div>
            </MuiThemeProvider>
        );
    }


}
export default Login