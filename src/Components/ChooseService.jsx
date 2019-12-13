import React, { Component } from 'react';
import './ChooseService.css'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { createMuiTheme, MuiThemeProvider, Paper, Button } from "@material-ui/core";
import userService from '../services/userService'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';


const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '240px',
                height: '260px'
            },

            'elevation1': {
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
            },
        },
       
    }
})

const theme2 = createMuiTheme({
    overrides: {
        'MuiCard': {
            'root': {
                width: '240px',
                height: '260px',
                backgroundColor: '#acacac'
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
                width: '240px',
                height: '260px',
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

// transition: box-shadow 280ms cubic-bezier(.4,0,.2,1);

class ChooseService extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            array: [],
            dialog: false,
            price: 0,
            value: 0,
            color: false,
            color1: false,
            color2: false,
            ID: '',
            message: '',
            message1: '',
            message2: ''

        };

    }

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

    handleLogin = () => {
        this.props.history.push('/login')
    }

    handleDialog = async (key) => {
        this.setState({ dialog: true })
       await this.setState({ price: key.price })
        localStorage.setItem('price',this.state.price)
        await this.setState({ ID: key.id })
        console.log("ID is", this.state.ID);
        localStorage.setItem('cartID',this.state.ID)

        this.setState({ color: true, color1: false, color2: false })
        if (this.state.price === 99) {
            this.setState({ message: "Ability to create note with title and Description" })

        } else if (this.state.price === 49) {
            this.setState({ message: "Ability to create note with title and Description" })
        }

    }

    // handleChange=(newValue)=>{
    //     this.setState({value:newValue})
    //     console.log("In handle change",this.state.value);

    // }

    // handleChangeIndex=(index)=>{
    //     this.setState({value:index})
    //     console.log("In handle change index",this.state.value);
    // }

    // a11yProps(index) {
    //     return {
    //       id: `full-width-tab-${index}`,
    //       'aria-controls': `full-width-tabpanel-${index}`,
    //     };
    //   }

    change = () => {
        this.setState({ color: true, color1: false, color2: false })
        if (this.state.price === 99) {
            this.setState({ message: "Ability to create note with title and Description" })
            // this.setState({message1:"Ability to add images and labels"})
            // this.setState({message2:"Ability to add checklist and colors"})
        } else if (this.state.price === 49) {
            this.setState({ message: "Ability to create note with title and Description" })
            // this.setState({message1:" "})
            // this.setState({message2:" "})
        }

    }
    change1 = () => {
        this.setState({ color: false, color1: true, color2: false })
        if (this.state.price === 99) {
            this.setState({ message: "Ability to add images and labels" })

        } else if (this.state.price === 49) {
            this.setState({ message: "Ability to change image" })
            // this.setState({message1:" "})
            // this.setState({message2:" "})
        }
    }
    change2 = () => {
        this.setState({ color: false, color1: false, color2: true })
        if (this.state.price === 99) {
            this.setState({ message: "Ability to add checklist and colors" })

        } else if (this.state.price === 49) {
            this.setState({ message: " xyz" })
            // this.setState({message1:" "})
            // this.setState({message2:" "})
        }
    }

    remove=()=>{
        localStorage.clear();
        this.setState({dialog:!this.state.dialog})
    }

    proceed=()=>{
        this.props.history.push('/register')
    }





    render() {
        var style = this.state.color === true ? "bgcolor" : null;
        var style1 = this.state.color1 === true ? "bgcolor" : null;
        var style2 = this.state.color2 === true ? "bgcolor" : null;
        return (

            <div className="headerfun">
                <div className="header">
                    <Typography id="name">FundooNotes</Typography>
                </div>
                <div id="titlefun">fundooNotes offered. Choose below service to Register.</div>

                <div id="cardfun">
                    <MuiThemeProvider theme={theme}>
                        {this.state.array.map(res => {
                            return (
                                <div id="addfun1" onClick={() => this.handleDialog(res)}>
                                    <MuiThemeProvider theme={theme2}>
                                        <Card className="cardfun1">

                                            <div id="addfun">ADD TO CART</div>
                                        </Card>
                                    </MuiThemeProvider>
                                    <MuiThemeProvider theme={theme1}>
                                        <Card style={{ position: "relative", padding: "5px" }} className="cardfun2">
                                            <div style={{ marginLeft: "8%", marginRight: "3%", marginTop: "8%" }}>
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
                <div id="sign" onClick={this.handleLogin}>Sign in instead</div>

                <Dialog aria-labelledby="simple-dialog-title" open={this.state.dialog} style={{ zIndex: 4001 }}  >
                    <div className="box" style={{ width: "600px", height: "auto" }}>
                        <div className="dialogBoxSize">
                            <div id="dialogfun">
                                <div>
                                    <DialogTitle>Advance pack details</DialogTitle></div>
                                <div id="dialogfun1">${this.state.price}/Month</div>
                            </div>
                            {/* <AppBar position="static" color="default"> */}
                            <Paper>
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    indicatorColor="#0E89C2"
                                    textColor="white"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab id={style} onClick={this.change} label="Feature 1" />
                                    <Tab id={style1} onClick={this.change1} label="Feature 2" />
                                    {this.state.price === 99 ?
                                        <Tab id={style2} onClick={this.change2} label="Feature 3" />
                                        : null}
                                </Tabs>
                            </Paper>
                            <div id="msgfun">
                                {this.state.message}
                            </div>
                            <MuiThemeProvider theme={theme4}>
                            <div id="buttonfun">
                                <div id="buttonfun1">
                                    <Button style={{ backgroundColor: "#0E89C2", height: "25px" }} onClick={this.remove}>Remove</Button>
                                </div>
                                <div id="buttonfun2">
                                    <Button style={{ backgroundColor: "#0E89C2", height: "25px" }} onClick={this.proceed}>Proceed to Checkout</Button>
                                </div>
                            </div>
                            </MuiThemeProvider>
                            {/* #0E89C2 sky blue*/}
                            {/* #673AB7 jabla */}















                        </div>
                    </div>
                </Dialog>
            </div>



        )
    }
}
export default ChooseService