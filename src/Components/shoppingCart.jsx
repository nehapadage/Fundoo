import React, { Component } from 'react';
import './ShoppingCart.css'
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import userService from '../services/userService'
import Snackbar from '@material-ui/core/Snackbar';

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                textTransform: "nocase",
                minWidth: "fit-content",
                height: "fit-content"
            }

        },
        MuiSvgIcon: {
            root: {
                color: "black"
            }
        }
    }

});

class shoppingCart extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            price: '',
            color: false,
            color1: false,
            color2: false,
            cart: false,
            cart1: false,
            cart2: false,
            description: '',
            status: '',
            address: '',
            snack: false
        };

    }

    componentDidMount=async()=>{
    //     this.setState({ color: true })
    //    await this.setState({ cart: true, cart1: false })
    //     console.log("status of cart",this.state.cart,this.state.cart1,this.state.cart2);

        

        userService.getShop().then(async(res) => {
            console.log("Response in get shopping details", res);

          await  this.setState({ price: res.data.data[0].price })
            console.log("Description is", res.data.data.product);
            this.setState({ description: res.data.data[0].product.description })
            this.setState({ status: res.data.data[0].status })

            if(res.data.data.isOrderPlaced===false){
                this.setState({ color: true })
                 this.setState({ cart: true, cart1: false })
                 console.log("status of cart",this.state.cart,this.state.cart1,this.state.cart2);
            }
            else{
                console.log("In else");
                
                this.setState({ color2: true })
                 this.setState({ cart: false, cart1: false, cart2: true })
                 console.log("status of cart2",this.state.cart,this.state.cart1,this.state.cart2);
            }


        }).catch((err) => {
            console.log(err);
        })
       
        
    }

    proceed = async() => {
        this.setState({ color1: true })
       await this.setState({ cart: false, cart1: true })
        console.log("status of cart1",this.state.cart,this.state.cart1,this.state.cart2);
        
    }

    place = async() => {
        if (this.state.address === '') {
            this.setState({ snack: true })
        }
        else {

        //     this.setState({ color2: true })
        //    await this.setState({ cart: false, cart1: false, cart2: true })
        //     console.log("status of cart2",this.state.cart,this.state.cart1,this.state.cart2);

            var data = {
                cartId: localStorage.getItem('LoginCartId'),
                address: this.state.address,
            }

            userService.placeOrder(data).then(async(res) => {
                console.log("Response in place order", res);


                this.setState({ color2: true })
               await this.setState({ cart: false, cart1: false, cart2: true })
                console.log("status of cart2",this.state.cart,this.state.cart1,this.state.cart2);

            }).catch((err) => {
                console.log(err);
            })





        }
    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClose = () => {
        this.setState({ snack: !this.state.snack })
    }

   

    render() {
        var colorStyle = this.state.color ? "colorStyle" : null
        var colorStyle1 = this.state.color1 ? "colorStyle" : null
        var colorStyle2 = this.state.color2 ? "colorStyle" : null
        var cartStyle = this.state.cart===true ? "cart" : this.state.cart1===true ? "cart1" : "cart2"
        var VALUE= this.state.cart ? 0 : this.state.cart1 ? 50 : 100;
        // var cartStyle= this.state.cart1 ? "cart1" : null
        return (
           
            <MuiThemeProvider theme={theme}>
                {/* {localStorage.getItem('cartID') ?  */}
                <div className="mainShop">
                    <div id="mainShop1">
                        <Button style={{ backgroundColor: "#FFBB00", width: "fit-content" }}>FundooNotes</Button>
                        <div id="cartNames">
                            {/* <div id="cartbar"> 
                                <ShoppingCartIcon id={cartStyle} />
                             </div> */}



                            <LinearProgress
                            id="cartbar"
                                // className={classes.margin}
                                variant="determinate"
                                color="primary"
                                value={VALUE}
                            />
                             <ShoppingCartIcon id={cartStyle} />


                            <div id="cartNames1">
                                <div id={colorStyle}>signin</div>
                                <div id={colorStyle1}>review</div>
                                <div id={colorStyle2}>complete</div>
                            </div>

                        </div>
                    </div>

                    {this.state.cart2 ? <div id="mainShop2">Order List</div> :
                        <div id="mainShop2">Review your Order</div>}

                    <Divider id="divider" />

                    <div id="items">
                        <div id="item1">
                            <div style={{ marginLeft: "0.5em", padding: "0.2em", marginTop: "0.5em" }}> ${this.state.price} per month advance</div>
                        </div>
                        <div id="item2">
                            <div id="subItem1">Advance Pack Details</div>
                            <div id="subItem2">
                                <div id="dot">.</div>
                                <div style={{ marginLeft: "0.5em", width: "15em" }}>{this.state.description}</div>
                            </div>
                        </div>

                        {this.state.cart1 == true ?
                            <div id="item3">
                                <div id="subItem3">${this.state.price}</div>
                                <div id="subItem4">per month</div>
                            </div> :
                            <div id="items">
                                <div id="item3">
                                    <div id="subItem3">price</div>
                                    <div id="subItem4">${this.state.price}</div>
                                </div>
                                {this.state.cart == true ?
                                    <div id="item3">
                                        <div id="subItem3">Validity</div>
                                        <div id="subItem4">per month</div>
                                    </div> : null}

                            </div>}

                        {this.state.cart1 == true ?
                            <div style={{ marginLeft: "3em" }}>
                                <div id="item4">
                                    <div>Subtotal(1 item) : ${this.state.price}</div>
                                    <div id="subItem6" onClick={this.place}>Place your Order</div>
                                </div>
                            </div>
                            :

                            <div style={{ marginLeft: "3em" }}>
                                {this.state.cart == true ?
                                    <div id="item4">
                                        <div id="price">Subtotal(1 item) : ${this.state.price}</div>
                                        <div id="subItem6" onClick={this.proceed}>Proceed to Checkout</div>
                                    </div> : null}
                            </div>
                        }

                        {this.state.cart2 == true ?
                            <div id="status">{this.state.status}</div> : null}





                    </div>
                    <Divider id="divider" />

                    {this.state.cart1 ?
                        <div id="additems">
                            <div id="additems1">
                                <TextField
                                    id="outlined-multiline-static"
                                    name='address'
                                    value={this.state.address}
                                    // label="Multiline"
                                    multiline
                                    rows="4"
                                    // defaultValue="Default Value"
                                    variant="outlined"

                                    onChange={this.handlechangeall}
                                />
                            </div>
                            <div id="additems2">
                                <div id="payment">payment method</div>
                                <div id="payment" style={{ color: "#0E89C2" }}>Cash on Delivery</div>
                            </div>
                        </div>

                        : <div> {this.state.cart == true ?
                            <div id="subItem5">Subtotal(1 item) : ${this.state.price}</div> : null}
                        </div>}

                    <Snackbar

                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.snack}
                        autoHideDuration={6000}
                        onClose={this.handleClose}

                        message="Please enter address "


                    />
                </div>
                {/* :
                    <h1 id="emptyCart">Your Cart is Empty</h1> } */}
            </MuiThemeProvider>


        )
    }
}
export default shoppingCart