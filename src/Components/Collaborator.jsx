import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import './Collaborator.css'
import Divider from '@material-ui/core/Divider';
import userService from '../services/userService'
import { loadOptions } from '@babel/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

// .--2553

const theme = createMuiTheme({
    overrides: {
        'MuiInputBase': {

            'input': {
                marginTop: '2%',
            }
        }
    }
})

class Collaborator extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            id: this.props.NoteId,
            dialog: false,
            Collaborator:""
        };

    }

    handlechangeall = async (event) => {
        console.log("calling", event.target);

        await this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount = () => {
        // this.getUserList()
    }

    // getUserList=()=>{
    //     userService.getUserList().then((data) => {
    //         console.log("Responce in delete Label On Note in child label", data);

    //         this.getLabel();

    //         // this.setState({ addLabel: "" })
    //         // this.props.refresh()
    //     }).catch((err) => {
    //         console.log(err);

    //     })
    // }

    handleDialog = () => {
        this.setState({ dialog: !this.state.dialog })
    }

    render() {
        console.log("In collaborator");

        var image = 'http://fundoonotes.incubation.bridgelabz.com/' + localStorage.getItem('imageUrl');

        return (
            <div>
                <IconButton onClick={this.handleDialog}>
                    <img src={require('../Assets/collaborator.svg')} alt="Logo" />
                </IconButton>

                <Dialog aria-labelledby="simple-dialog-title" open={this.state.dialog}   >
                    <div className="dialogBoxSize">
                        <DialogTitle>Collaborator</DialogTitle>

                        <Divider />

                        <div id="pic">
                            <div>
                                <IconButton onClick={this.handleProfileClick}>
                                    <img src={image} alt="Logo" id="profile" />
                                </IconButton>
                            </div>
                            <div id="fnlnemail">
                                <div id="fnln">
                                    {localStorage.getItem('firstName') + " " + localStorage.getItem('lastName') + " (Owner)"}
                                </div>
                                <div id="mail">
                                    {localStorage.getItem('email')}
                                </div>
                            </div>

                        </div>

                        <div id="person">
                        <div>
                            <IconButton style={{ border: "solid 1px" }}>
                                <img src={require('../Assets/collaborator.svg')} alt="Logo" />
                            </IconButton>
                        </div>
                        <div>
                        <Input
                            placeholder="Person or Email to share with"
                            // className={classes.input}
                            name="Collaborator"
                            value={this.state.Collaborator}
                            onChange={this.handlechangeall}
                            inputProps={{
                                'aria-label': 'description',
                            }}
                        />
                        </div>
                        </div>


                    </div>
                </Dialog>


            </div>



        )
    }
}
export default Collaborator