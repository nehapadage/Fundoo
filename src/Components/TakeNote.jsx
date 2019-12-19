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
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';

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
            reminder: "",
            token: localStorage.getItem('LoginToken'),
            colab: [],
            colabEmail:""

        };

    }


    handleNoteViewController = () => {

        this.setState({ noteViewController: !this.state.noteViewController });
        if ((this.state.title === "" && this.state.description === "") || (this.state.title === "")) {
            console.log("title and description is empty");
        } else {

            var array=[]

            console.log("State colab",this.state.colab);
          var info= this.state.colab.map(key=>{
                return{
                    "firstName":key.firstName,
                    "lastName":key.lastName,
                    "email":key.email,
                    "userId":key.userId
                }
            })
            // var info={
            //     "firstName":this.state.colab[0].firstName,
            //     "lastName":this.state.colab[0].lastName,
            //     "email":this.state.colab[0].email,
            //     "userId":this.state.colab[0].userId
            // }
            // let result = JSON.stringify(Object(info));



            // array.push(info)

            let noteData = {
                "title": this.state.title,
                "description": this.state.description,
                "color": this.state.Color,
                "reminder": this.state.reminder,
              
                "collaberators":JSON.stringify(info)
                   
               
            }

        //    noteData.collaberators= [
        //        JSON.stringify(
        //         "firstName"=this.state.colab[0].firstName,
        //         "lastName"=this.state.colab[0].lastName,
        //         "email"=this.state.colab[0].email,
        //         "userId"=this.state.colab[0].userId
        //     )]

            console.log("note data--> ", noteData)
            userService.createNote(noteData).then(res => {
                console.log("Response in creating notes--->", res);
                console.log("NoteId is=", res.data.status.details.id);
                // this.setState({ noteId: res.data.status.details.id })
                // this.setState({ Color: res.data.status.details.color })

                this.setState({ title: "" });
                this.setState({ description: "" });
                this.setState({ Color: "#ffffff", reminder: "",colab:[] });


                console.log("Changed color is", this.state.Color);


                this.props.refresh()

            })
                .catch(err => {
                    console.log("Error in creation of note");
                })


        }
    }



    handlechangeall = (event) => {
        console.log("tille--> ", event.target.value)
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

            var info= this.state.colab.map(key=>{
                return{
                    "firstName":key.firstName,
                    "lastName":key.lastName,
                    "email":key.email,
                    "userId":key.userId
                }
            })

            let noteData = {
                "title": this.state.title,
                "description": this.state.description,
                "color": this.state.Color,
                "reminder": this.state.reminder,
                "isArchived": true,
                "collaberators":JSON.stringify(info)
            }

            userService.createNote(noteData).then(res => {
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

    reminder = (reminder) => {
        console.log("Reminder in take note", reminder);
        this.setState({ reminder: reminder })
    }

    handleReminderDelete = () => {
        console.log("In Reminder delete");

        this.setState({ reminder: "" })
        // this.props.refresh()


    }

    colab = async(colab) => {
        console.log("Colaborator in take note", colab);
       await this.setState({ colab: colab })
//    await this.state.colab.push(colab)
        console.log("Status of colab",this.state.colab);
        console.log("Status of colab1",this.state.colab[0].email);
        // await this.setState({ colabEmail: colab.email })
        // console.log("Status of colab email",this.state.colabEmail);
        
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

                        {this.state.colab.length > 0 && <div id="label1" style={{marginLeft:'1em'}}>
                            {this.state.colab.map(item => (
                            <Tooltip title={item.email} placement="center">
                                <IconButton size="small" style={{ backgroundColor: "#a0c3ff", margin: "1%" }}>
                                    <PersonIcon size="small" color="primary" />
                                    {/* <img src={require('../Assets/smallcolab.jpg')} alt="Logo" id="profile" /> */}
                                </IconButton>
                            </Tooltip>
                           ))} 
                        </div>
                        }

                        {this.state.reminder.length > 0 && <div style={{ display: "flex", marginLeft: "1em" }}>
                            {/* {this.props.Reminder} */}

                            {/* <img src={require("../Assets/watch.svg")} alt="" />{this.state.reminder.toString().slice (4,10)+" "+this.state.reminder.toString().slice (16,21)} */}

                            <Chip
                                icon={<img src={require("../Assets/watch.svg")} alt="" />}
                                label={this.state.reminder.toString().slice(4, 10) + " " + this.state.reminder.toString().slice(16, 21)}
                                // onClick={(event) => this.handleReminderClick(event)}
                                // onClick={<Reminder event={this.state.Event} chipRemind={this.state.chipRemind} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />}
                                // onClick={<Reminder/>}
                                onDelete={this.handleReminderDelete}
                            />

                        </div>}

                        <div className="displayButton">
                            {/* <div > */}
                            <Reminder setReminder={this.reminder} />
                            <Collaborator colabs={this.colab} />
                            {/* <Collaborator note={this.props.note} NoteId={this.state.noteId} REFRESH={this.handleRefresh}/> */}
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