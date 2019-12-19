import React, { Component } from 'react';
import './Reminder.css'
import userService from '../services/userService'
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
    overrides: {
        'MuiPopover': {
            'paper': {
                Width: "200px"
            }
        },
        MuiButton: {
            root: {
                textTransform: "lowercase"
            }

        }
    }
});

class Reminder extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            anchorEl: null,
            open: false,
            openChildMenu: false,
            noteLabels: [],
            userReminderDate: "",
            userReminderTime: ""
        };
        // console.log(" propsin constructor", this.props);

    }
    // componentDidUpdate() {
    //     console.log(" props ", this.props);

    // }

    // componentWillReceiveProps = () => {
    //     console.log("In componentWillReceiveProps of reminder");
    //     console.log("props in reminder are", this.props.event);

    //     if (this.props.chipRemind === false) {
            
    //          this.handleClick(!this.props);
    //     }


    // }

    handleClick = event => {
        console.log("Handle click called");
        console.log("Current target b4", event.currentTarget);
        console.log("State of anchorEl",this.state.anchorEl);
        console.log("props in reminder are  ********************88", this.props.event);
        


        // this.state={anchorEl: null,
        //     open: false,
        //     openChildMenu: false,
        //     noteLabels: [],
        //     userReminderDate: "",
        //     userReminderTime: ""}

        console.log("Current target after", event);

        this.setState({
            anchorEl: event.currentTarget, open: true
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null, open: false, openChildMenu: false });
    };

    handleChildMenu = () => {
        this.setState({ open: false, openChildMenu: true });
    }

    backClick = () => {
        this.setState({ open: true, openChildMenu: false });
    }

    handleDate = (event) => {
        this.setState({ userReminderDate: event.target.value });
        console.log(this.state.userReminderDate);

    }

    handleTime = (event) => {
        this.setState({ userReminderTime: event.target.value });
        console.log(this.state.userReminderTime);

    }


    /**new Date(year, month{start from 0}, day, hours, minutes, seconds, milliseconds) */
    addReminder = (requestValue) => {
        this.setState({ anchorEl: null, open: false, openChildMenu: false });
        /**@param today current date with current system time  */
        var today = new Date();
        let day = today.getDate(); /** day of current date */
        let month = today.getMonth();/** month of current date */
        let year = today.getFullYear();/** year of current date */
        let reminderDate; /** common variable for collecting reminder time */

        /** for reminder setting for today itself with 8 PM */
        if (requestValue === 1) {
            reminderDate = (new Date(year, month, day, 20, 0, 0)).toString();
            console.log("today date", reminderDate);


        } /** for reminder setting for tomorrow with time 8 AM */
        else if (requestValue === 2) {
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            tomorrow.setHours(8);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);
            reminderDate = tomorrow.toString()
            console.log("tomorrow date ", reminderDate);

        } /** for reminder setting for next week with time 8 AM */
        else if (requestValue === 3) {

            var date = new Date();
            date.setDate(today.getDate() + 8);
            date.setHours(8);
            date.setMinutes(0);
            date.setSeconds(0);
            reminderDate = date.toString();
            console.log("next monday date", reminderDate);


        } /** for reminder setting for user selected date and time*/
        else {
            let concatDate = this.state.userReminderDate + " " + this.state.userReminderTime;
            console.log("Concated date",concatDate);
            
            let newDate = new Date(concatDate)
            reminderDate = newDate.toString();
            console.log("new date", reminderDate);
        }

        if (this.props.NoteId) {
            let noteReminderUpdate = {
                "noteIdList": [this.props.NoteId],
                "reminder": [reminderDate],

            }
            userService.reminder(noteReminderUpdate).then((res) => {
                console.log("Response in reminder", res);
                // console.log("Only data in reminder",res.config.data);

                this.props.REFRESH()
            }).catch((err) => {
                console.log(err);
            })
        }
         else {
            this.props.setReminder(reminderDate);
        }


    }




    render() {
        // console.log("props are",this.props);
        // if(this.props.chipRemind){
        //     this.handleClick();
        // }
        // console.log("chip clicked",this.props.chipRemind);
        return (
            <div>
                <IconButton onClick={this.handleClick}>
                    <img src={require('../Assets/remind.svg')} alt="Logo" />
                </IconButton>

                <div>
                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        style={{ width: '50%' }}
                    >
                        <div>
                            <div className="reminderTextStyle">
                                <label>Reminder:</label>
                            </div>
                            <MenuList>

                                <MenuItem onClick={() => this.addReminder(1)}>
                                    <div className="reminderStyle">
                                        <div id="text">Later today</div> <div id="text1">8 PM</div>
                                    </div>
                                </MenuItem>

                                <MenuItem onClick={() => this.addReminder(2)}>
                                    <div className="reminderStyle">
                                        <div id="text">Tomorrow</div>    <div id="text1">8 AM</div>
                                    </div></MenuItem>

                                <MenuItem onClick={() => this.addReminder(3)}>
                                    <div className="reminderStyle">
                                        <div id="text"> Next week</div>  <div id="text1">Mon,8 AM</div>
                                    </div></MenuItem>

                                <div >
                                    <MenuItem onClick={this.handleChildMenu}><img src={require("../Assets/watch.svg")} alt="" />  <div id="text">  Pick date & time</div> </MenuItem>
                                </div>
                            </MenuList>
                        </div>
                    </Popover>
                </div>

                <MuiThemeProvider theme={theme}>
                    <Popover
                        open={this.state.openChildMenu}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        style={{ width: '50%' }}
                    >
                        <div>
                            <div className="reminderTextStyle" onClick={this.backClick}>
                                <IconButton>
                                    <img src={require("../Assets/back.svg")} alt="" /> </IconButton><label>Pick date & time:</label>
                            </div>

                            <MenuList>
                                <div className="dateTimeStyle">
                                    {/* <TextField
                                    label="Date"
                                    type="date"
                                    value={this.state.userReminderDate}
                                    onChange={this.handleDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                /> */}
                                    <form className="container" noValidate>
                                        <TextField
                                            id="date"
                                            label="Date"
                                            type="date"
                                            value={this.state.userReminderDate}
                                            onChange={this.handleDate}
                                            defaultValue="2019-11-18"
                                            className="textField"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                    <TextField
                                        label="Time"
                                        type="time"
                                        value={this.state.userReminderTime}
                                        onChange={this.handleTime}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Button id="save" variant="contained"
                                        size="large"
                                        color="primary"
                                        onClick={this.addReminder}>save</Button>

                                </div>
                            </MenuList>
                        </div>
                    </Popover>
                </MuiThemeProvider>

            </div>




        )
    }
}
export default Reminder