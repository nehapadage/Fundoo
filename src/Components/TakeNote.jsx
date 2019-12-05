import React, { Component } from 'react';
import userService from '../services/userService'
import Card from "@material-ui/core/Card";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import './TakeNote.css'
import Reminder from './Reminder'
import Collaborator from './Collaborator'
import Color from './Color'
import Image from './Image'
import Archive from './Archive'
import More from './More'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: "54%",
                minHeight: "25px"
                // marginTop: "-50px"
            },
            'rounded': {
                borderRadius: '8px',
            },
            'elevation1': {
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
            }
        }
    }
})



class TakeNote extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            noteViewController: false,
            title: "",
            description: "",
            noteId: "",
            Color: "",
            token: localStorage.getItem('LoginToken')
        };

    }


    handleNoteViewController = () => {

        this.setState({ noteViewController: !this.state.noteViewController });
        if ((this.state.title === "" && this.state.description === "") || (this.state.title === "")) {
            console.log("title and description is empty");
        } else {
            let noteData = {
                "title": this.state.title,
                "description": this.state.description,
                "color": this.state.Color
            }

            userService.createNote(noteData, this.state.token).then(res => {
                console.log("Response in creating notes--->", res);
                console.log("NoteId is=", res.data.status.details.id);
                // this.setState({ noteId: res.data.status.details.id })
                // this.setState({ Color: res.data.status.details.color })

                this.setState({ title: "" });
                this.setState({ description: "" });
                this.setState({ Color: "#ffffff" });

                console.log("Changed color is", this.state.Color);


                this.props.refresh()

            })
                .catch(err => {
                    console.log("Error in creation of note");
                })


        }
    }



    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleRefresh = (color) => {
        console.log("Color is", color);
        this.setState({ Color: color })
    }

    archive = () => {

        this.setState({ noteViewController: !this.state.noteViewController });
        if ((this.state.title === "" && this.state.description === "") || (this.state.title === "")) {
            console.log("title and description is empty");
        } else {
            let noteData = {
                "title": this.state.title,
                "description": this.state.description,
                "color": this.state.Color,
                "isArchived": true
            }

            userService.createNote(noteData, this.state.token).then(res => {
                console.log("Response in creating notes--->", res);
                console.log("NoteId is=", res.data.status.details.id);
                // this.setState({ noteId: res.data.status.details.id })
                // this.setState({ Color: res.data.status.details.color })

                this.setState({ title: "" });
                this.setState({ description: "" });
                this.setState({ Color: "#ffffff" });

                this.props.refresh()

            })
                .catch(err => {
                    console.log("Error in creation of note");
                })

            // this.setState({ title: null });
            // this.setState({ description: null });
        }

    }


    render() {


        return (
        // <MuiThemeProvider theme={theme}>

            <div className="createcardStyle">
                {this.state.noteViewController ?
                    <div id="card" style={{ backgroundColor: this.state.Color }}>
                        <div className="createNoteStyle">
                            <div className="createNoteStyle1">
                                <div>
                                    <TextField
                                        placeholder='Title'
                                        margin="normal"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handlechangeall}
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                    />
                                </div>
                                <div>
                                    <Button><img src={require("../Assets/pin.svg")} alt="" /></Button>
                                </div>
                            </div>

                            <TextField
                                placeholder='Take a note'
                                margin="normal"
                                multiline={true}
                                name="description"
                                value={this.state.description}
                                onChange={this.handlechangeall}
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />

                        </div>
                        <div className="displayButton">
                            {/* <div > */}
                            <Reminder />
                            {/* <Collaborator/>
                            <Collaborator note={this.props.note} NoteId={this.state.noteId} REFRESH={this.handleRefresh}/> */}
                            <Color Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} refresh={this.handleRefresh} />
                            <Image />

                            <IconButton onClick={this.archive}>
                                <img src={require('../Assets/archive.svg')} alt="Logo" />
                            </IconButton>

                            {/* <Archive Title={this.state.title} Description={this.state.description}  NoteId={this.state.noteId} Refresh={this.handleRefresh}/> */}
                            <More Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} refresh={this.handleRefresh} />
                            {/* </div> */}
                            <div>
                                <Button onClick={this.handleNoteViewController}>close</Button>
                            </div>
                        </div>

                    </div>
                    :

                    <div id="card" >
                        <div className="fieldstyle">
                            <div className="createNoteStyle">
                                <TextField
                                    onClick={this.handleNoteViewController}
                                    placeholder='Take a note..'
                                    value=''
                                    margin="normal"
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>

                            <div id="displayPaint">
                                <Button><img src={require("../Assets/list.svg")} alt="" /></Button>
                                <Button><img src={require("../Assets/paint.svg")} alt="" /></Button>
                                <Button><img src={require("../Assets/image.svg")} alt="" /></Button>
                            </div>
                        </div>
                    </div>


                }
            </div>
        // </MuiThemeProvider>

        )
    }
}
export default TakeNote