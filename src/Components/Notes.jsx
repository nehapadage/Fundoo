
import React, { Component } from 'react';
import userService from '../services/userService'
import './Notes.css'
import Chip from '@material-ui/core/Chip';
import Reminder from './Reminder'
import Collaborator from './Collaborator'
import Color from './Color'
import Image from './Image'
import Archive from './Archive'
import More from './More'
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const theme2 = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '295px',
            },
            'rounded': {
                borderRadius: '8px',
            },
            'elevation1': {
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
            },
            // 'transition':{
            //     'boxShadow': '280ms'
            // }
        }
    }
})

const theme1 = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '500px',
                zIndex: 4000
            },
            'rounded': {
                borderRadius: '8px',
            },
            'elevation1': {
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
            },

        }
    }
})



class Notes extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            flag: false,
            title: this.props.Title,
            description: this.props.Description,
            color: this.props.Color,
            reminder: this.props.Reminder,
            noteId: this.props.NoteId,
            chipRemind:false
        };

        // this.displayNotes=React.createRef()

        // this.setState({title:this.props.Title})


    }




    OpenDialog = () => {
        console.log("In dialog box");



        var updateData = {
            title: this.state.title,
            description: this.state.description,
            noteId: this.state.noteId,
            color: this.state.color
        }

        userService.update(updateData).then(res => {

            console.log("Responce in updating notes", res);

            this.props.Refresh()

        })
            .catch(err => {
                console.log("Error in updating notes");

            })

    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleRefresh = () => {
        this.props.Refresh()
    }

    OpenEdit = () => {
        this.setState({ flag: !this.state.flag })
    }

    handleReminderClick = () => {
     this.setState({chipRemind:true})   
    }

    handleReminderDelete = () => {

    }

    render() {


        return (


            <MuiThemeProvider theme={theme2}>

                {this.state.flag ?
                    <MuiThemeProvider theme={theme1}>
                        <div className="style1">
                            <Card style={{ backgroundColor: this.state.color }}>
                                {/* <div className="createcardStyle4"> */}

                                <div className="createNoteStyle3" >
                                    <div className="createNoteStyle2" >
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
                                            {/* {this.props.Title} */}
                                        </div>
                                        <div>
                                            <Button><img src={require("../Assets/pin.svg")} alt="" /></Button>
                                        </div>
                                    </div>

                                    <div id="descriptiondetail" >
                                        <TextField
                                            placeholder='Description'
                                            margin="normal"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handlechangeall}
                                            InputProps={{
                                                disableUnderline: true
                                            }}
                                        />
                                        {/* {this.props.Description} */}
                                    </div>

                                </div>
                                                                        {/* chipRemind={this.state.chipRemind} */}
                                <div className="displayButton">   
                                    {/* <div > */}
                                    <Reminder Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId}  REFRESH={this.handleRefresh} />
                                    <Collaborator />
                                    <Color Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                    <Image />
                                    <Archive Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                    <More Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} refresh={this.handleRefresh} />




                                    {/* <Button><img src={require("../Assets/remind.svg")} alt="" /></Button> */}
                                    {/* <Button><img src={require("../Assets/collaborator.svg")} alt="" /></Button>
                                    <Button><img src={require("../Assets/color.svg")} alt="" /></Button>
                                    <Button><img src={require("../Assets/image.svg")} alt="" /></Button>
                                    <Button><img src={require("../Assets/archive.svg")} alt="" /></Button>
                                    <Button><MoreVertIcon /></Button> */}
                                    {/* </div> */}
                                    <div className="displayButton">
                                        <Button id="button" onClick={this.OpenDialog} >Close</Button>
                                    </div>
                                </div>
                                {/* </div> */}
                            </Card>
                        </div>
                    </MuiThemeProvider>

                    :
                    <div className="style">
                        <Card style={{ backgroundColor: this.state.color }} >
                            {/* <div className="createcardStyle4"> */}
                            <div className="createNoteStyle3">

                                <div className="createNoteStyle2" >
                                    <div onClick={this.OpenEdit}>
                                        {this.props.Title}
                                    </div>
                                    <div>
                                        <Button><img src={require("../Assets/pin.svg")} alt="" /></Button>
                                    </div>
                                </div>

                                <div id="descriptiondetail" onClick={this.OpenEdit}>
                                    {this.props.Description}
                                </div>
                                {this.state.reminder.length > 0 && <div id="reminder">
                                    {/* {this.props.Reminder} */}

                                    {/* <img src={require("../Assets/watch.svg")} alt="" />{this.state.reminder.toString().slice (4,10)+" "+this.state.reminder.toString().slice (16,21)} */}

                                    <Chip
                                        icon={<img src={require("../Assets/watch.svg")} alt="" />}
                                        label={this.state.reminder.toString().slice(4, 10) + " " + this.state.reminder.toString().slice(16, 21)}
                                        onClick={this.handleReminderClick}
                                        // onClick={<Reminder/>}
                                        onDelete={this.handleReminderDelete}
                                    />
                                </div>}


                            </div>

                            <div className="displayButton">
                                {/* <div > */}
                                <Reminder Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                <Collaborator />
                                <Color Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                <Image />
                                <Archive Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                <More Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} refresh={this.handleRefresh} />




                                {/* <Button><img src={require("../Assets/remind.svg")} alt="" /></Button> */}
                                {/* <Button><img src={require("../Assets/collaborator.svg")} alt="" /></Button>
                                <Button><img src={require("../Assets/color.svg")} alt="" /></Button>
                                <Button><img src={require("../Assets/image.svg")} alt="" /></Button>
                                <Button><img src={require("../Assets/archive.svg")} alt="" /></Button>
                                <Button><MoreVertIcon /></Button> */}
                                {/* </div> */}
                                {/* <div className="displayButton">
                                <Button id="button" onClick={this.props.getNotes} >Close</Button>
                            </div> */}
                            </div>
                            {/* </div> */}
                        </Card>
                    </div>
                }





            </MuiThemeProvider>


            // </div>


        )
    }
}
export default Notes