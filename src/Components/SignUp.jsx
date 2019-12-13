import React, { Component } from 'react';
import './SignUp.css'
import IconButton from '@material-ui/core/IconButton';
import { Paper } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider,Button } from "@material-ui/core";

const theme4 = createMuiTheme({
    overrides: {
        'MuiButton':{
            'label':{
                marginTop:'-5px'
            } 
        }

        
    }
})

class SignUp extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {

        };

    }

    render() {
        return (
            <div>
                <div className="signup">
                    <Paper>
                        <div id="signup1">
                    <div id="fundoo">
                        <label id="flabel">F</label>
                        <label id="ulabel">u</label>
                        <label id="nlabel">n</label>
                        <label id="dlabel">d</label>
                        <label id="olabel">o</label>
                        <label id="o2label">o</label>
                    </div>
                    
                    </div>
                    <MuiThemeProvider theme={theme4}>
                    <div id="butfun"> 
                        <Button style={{ backgroundColor: "#acacac", height: "25px"}} onClick={this.proceed}>go to cart</Button>
                    </div>
                    </MuiThemeProvider>
                    </Paper>
                </div>
            </div>

                
            
        )
    }
}
export default SignUp