import React, { Component } from 'react'
import './Login.css'
import userService from '../services/userService'
import Card from '@material-ui/core/Card';
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

const theme2 = createMuiTheme({
    overrides: {
        'MuiCard': {
            'root': {
                width: '180px',
                height: '220px',
                backgroundColor: '#acacac'
            },

        }
    }
})

const theme3 = createMuiTheme({
    overrides: {
        'MuiCard': {
            'root': {
                width: '180px',
                height: '220px',
                backgroundColor: '#f7bb00'
            },

        }
    }
})

const theme1 = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '180px',
                height: '220px',
                zIndex: '10px',
            },
            'elevation1': {
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
            },
            // 'hover':{
            //     transition:'box-shadow 280ms cubic-bezier(.4,0,.2,1)'
            // }
        }
    }
})


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {

            email: "",
            password: "",
            email1: "neha7@gmail.com",
            password1: "neha123",
            emailError: "",
            passwordError: "",
            flag: false,
            progress: false,
            array: []
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
            if(localStorage.getItem('cartID')){
                loginData.cartId=localStorage.getItem('LoginCartId')
            }

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
                    localStorage.setItem('userId', res.data.userId)
                    localStorage.setItem('imageUrl', res.data.imageUrl)
                    localStorage.setItem('Grid', true)
                    //    localStorage.setItem('Drawer',false)



                    var path = '/dashboard/notes'
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

        // console.log("Flag after", this.state.flag);
    };

    componentDidMount() {
        userService.getService().then(res => {
            console.log("Response in like question--->", res);
            this.setState({ array: res.data.data.data })

            // console.log("Array is",this.state.array[0].price);


        })
            .catch(err => {
                console.log("Error in get all data");
            })
    }


    render() {
        var styles = localStorage.getItem('cartID') ? "adminMainDivService" : "adminMainDiv"
        var styles1 = localStorage.getItem('cartID') ? "combineDiv" : null

        return (
            <MuiThemeProvider theme={theme}>
                <div className="mainBody">
                    <div className={styles1}>


                        <div className={styles}>
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
                                <div id="log">
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

                            {/* here */}

                        </div>

                        {/* here */}
                        {localStorage.getItem('cartID') ?
                            <div className="adminMainDiv1">
                                <div>Service</div>

                                <div id="cardfuns" style={{ marginLeft: "-11%" }}>
                                    <MuiThemeProvider theme={theme}>
                                        {this.state.array.map(res => {
                                            return (
                                                <div id="addfun1ss">
                                                    {localStorage.getItem('cartID') === res.id ?
                                                        <MuiThemeProvider theme={theme3}>
                                                            <Card className="cardfun1s">

                                                                <div id="addfuns">SELECTED</div>

                                                            </Card>
                                                        </MuiThemeProvider>
                                                        :
                                                        <MuiThemeProvider theme={theme2}>
                                                            <Card className="cardfun1s">

                                                                <div id="addfuns">ADD TO CART</div>
                                                            </Card>
                                                        </MuiThemeProvider>}
                                                    <MuiThemeProvider theme={theme1}>
                                                        <Card style={{ position: "relative", padding: "5px" }} className="cardfun2">
                                                            <div style={{ marginLeft: "8%", marginRight: "3%", marginTop: "2%" }}>
                                                                <div id="addfun2">price: ${res.price} per month</div>
                                                                <div style={{ color: "blue", display: "flex", marginTop: "2%" }}>{res.name}</div>
                                                                <div style={{ display: "flex", flexDirection: "row", marginTop: "2%" }}>
                                                                    {/* <FiberManualRecordIcon fontSize="small" /> */}
                                                                    <div id="addfun3">.</div>
                                                                    <div id="addfun4">${res.price}/month</div>
                                                                </div>
                                                                <div style={{ display: "flex", flexDirection: "row", marginTop: "2%" }}>
                                                                    {/* <FiberManualRecordIcon fontSize="small" /> */}
                                                                    <div id="addfun3">.</div>
                                                                    <div id="addfun4">{res.description}</div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </MuiThemeProvider>

                                                </div>

                                            )
                                        })}

                                    </MuiThemeProvider>
                                </div>

                            </div>
                            : null}



                    </div>
                </div>
            </MuiThemeProvider>
        );
    }


}
export default Login