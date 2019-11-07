import React, { Component } from 'react';
import './ForgetPassword.css'
import { forgetpassword } from '../services/userService'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class ForgetPassword extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            emailError: "",
            flag: false,
            flag1:false
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
            emailError: ""
        };


        if (!this.validateEmail(this.state.email)) {
            isError = true;
            errors.emailError = "Requires valid email";
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

        var forgetData = {};
        forgetData.email = this.state.email;
    
        console.log("forget data--> ", forgetData)

        
        
        forgetpassword(forgetData).then((res) => {
            console.log("respnse in forget password--> ", res)
            console.log("****respnse in forget password message--> ", res.data.message)

            if(res.data.message){
                this.setState({ flag1: true })
            }
         

        //     if(res.data.success===true)
        //     alert(`Link has been sent to your email id to reset the password-----`);
        //     else
        //     alert('Entered EmailId is not in database.....Please Register first')

        //     // localStorage.setItem('ForgetToken',res.data.data.content)
           
        //   this.setRedirect();
            
            
        }).catch((err) => {
            this.setState({ flag: true })
            console.log("error in forget password--> ",err)
        })

        if (!err) {
            // clear form
            this.setState({
              email: "",
              emailError: ""
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
                    <div id="text3">Account Recovery</div>
                    {/* <div id="text3">Enter Email Id</div> */}
                    <div id="Id">
                    <TextField
                            id="email"
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
                           
                            message="Account Recovery Failed"
                       />

                       <Snackbar

                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.state.flag1}
                            autoHideDuration={6000}
                            onClose={this.handleClose1}
                           
                            message="Mail has been sent to your email id to reset password"
                       />
            </div>

        );
    }
   
}

export default ForgetPassword