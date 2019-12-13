import React, { Component } from 'react';
import './ShoppingCart.css'
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                textTransform: "nocase"
            }

        }
    }

});

class shoppingCart extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {

        };

    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <div className="mainShop">
                <div id="mainShop1">
                    <Button style={{backgroundColor:"#FFBB00"}}>FundooNotes</Button>
                </div>
            </div>
            </MuiThemeProvider>
                
            
        )
    }
}
export default shoppingCart