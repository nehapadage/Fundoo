import React, { Component } from 'react'
import './createAccount.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider, Paper} from "@material-ui/core";
import userService from '../services/userService'
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';

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

const theme4 = createMuiTheme({
    overrides: {
        'MuiButton':{
            'label':{
                marginTop:'-5px'
            } 
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

class createAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array:[],
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
            flag1:false,
            flagButton:"",
            flagButtonError:""
        }
    }

    componentDidMount(){
        userService.getService().then(res => {
            console.log("Response in like question--->", res);
            this.setState({ array: res.data.data.data })

            // console.log("Array is",this.state.array[0].price);


        })
            .catch(err => {
                console.log("Error in get all data");
            })

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
            // flagButtonError:""
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


           if(this.state.password !== this.state.confirmPassword){
            isError=true;
            
            errors.confirmPasswordError = "Password mismatch"; 
           }

        //   if(this.state.flagButton===""){
        //       errors.flagButtonError="Please select basic or advance"
        //   }
    
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

      if(!err)
      {
        var registerData = {};
        registerData.firstName = this.state.firstName;
        registerData.lastName = this.state.lastName;
        registerData.email = this.state.email;
        registerData.password = this.state.password;

        if(localStorage.getItem('cartID')){
            localStorage.getItem('price')===99 ? 
            registerData.service = "advance" : registerData.service = "basic"
        } 
       else{
        registerData.service = this.state.flagButton 
       } 

        // registerData.service = this.state.flagButton

        console.log("registerData--> ", JSON.stringify(registerData))



        userService.register(registerData).then((res) => {
            console.log("respnse in register--> ", res)

            if (res.data.data.success === true) {
                this.setState({ flag1: true })
                this.props.history.push('/login')
                // alert(`Registration Successful-----`);
                // this.setRedirect();
            }
            // else {
            //     alert(`Email Already Exists-----`);
                
            // }
        }).catch((err) => {
            this.setState({ flag: true })
            console.log("error in registration--> ", err)
        })


      }
      

    

           
        

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
            //   flag:"",
            //   flagButton:""
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

    handleBasic=async()=>{

 await this.setState({flagButton:"basic"})
console.log("Button clicked=",this.state.flagButton);

    }

    handleAdvance= async()=>{
        await this.setState({flagButton:"advance"})
        console.log("Button clicked=",this.state.flagButton);
    }

    cart=()=>{
        this.props.history.push('/')
    }

    render() {

        // var styles = localStorage.getItem('cartID') === true ? theme2 : theme3

        return (
            <div className="regdiv">
            <MuiThemeProvider theme={theme}>
                <div className="maindiv1">
                    {/* <Paper> */}
                {/* <form onSubmit={this.handlesubmit} ></form> */}
                <div id="fundoo">
                    <label id="flabel">F</label>
                    <label id="ulabel">u</label>
                    <label id="nlabel">n</label>
                    <label id="dlabel">d</label>
                    <label id="olabel">o</label>
                    <label id="o2label">o</label>
                </div>
                {localStorage.getItem('cartID') ?
                <MuiThemeProvider theme={theme4}>
                    <div id="butfun"> 
                        <Button style={{ backgroundColor: "#acacac", height: "25px"}} onClick={this.cart}>go to cart</Button>
                    </div>
                    </MuiThemeProvider>
                    : null}
                <div id="textfun">Create your Fundoo Account</div>

                 <div id="fnln">
                    <div  >
                    <TextField
                    id="fnfun"
                        // id="firstName"
                        label="First name"
                        type="string"
                        name="firstName"
                        value={this.state.firstName}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handlechangeall}
                        errorText={this.state.firstNameError}

                    />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div >
                    <TextField
                    id="lnfun"
                        // id="lastName"
                        label="Last name"
                        type="string"
                        name="lastName"
                        value={this.state.lastName}
                        // error={this.state.lastNameError}
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
                    <div style={{ fontSize: 12, color: "red", marginLeft: "-5%"}}>
            {this.state.emailError}
          </div>
                    <div id="text2">You can use letters and numbers</div>

                    <div id="passcon">
                        <div>
                        <TextField
                            // id="pass"
                            id="fnfun"
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
                            // id="conpass"
                            id="lnfun"
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

                     
                         {localStorage.getItem('cartID') ? 
                        //  <div>neha here should b mapping</div>

                        <div id="cardfun" style={{marginLeft:"-5%"}}>
                    <MuiThemeProvider theme={theme}>
                        {this.state.array.map(res => {
                            return (
                                <div id="addfun1s">
                                    {localStorage.getItem('cartID')===res.id ? 
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
                            </MuiThemeProvider> }
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
                         :    
                         <div id="basic_adv_button">              
                    <Button id="bas"
                            onClick={this.handleBasic}
                        >Basic
                        </Button>
                        <Button id="adv"
                            onClick={this.handleAdvance}
                        >Advance
                        </Button> </div>}
                    
                    <div style={{ fontSize: 12, color: "red",marginLeft: "-36%" }}>
            {this.state.flagButtonError}
          </div>
    
                    <div id="lastrow">
                    
                        <Button id="login1"
                            onClick={this.handleLoginClick}
                        >Log in instead
                        </Button>
                    
                        <div>
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
                        
                        {/* </Paper> */}
            </div>
            </MuiThemeProvider>
            </div>

                
            
            
        );
    }
};

export default createAccount;