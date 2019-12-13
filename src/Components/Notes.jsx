
import React, { Component } from 'react';
import userService from '../services/userService'
import './Notes.css'
import Chip from '@material-ui/core/Chip';
import Reminder from './Reminder'
import Collaborator from './Collaborator'
import Divider from '@material-ui/core/Divider';
import Color from './Color'
import Image from './Image'
import Archive from './Archive'
import More from './More'
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UnArchive from '../Components/UnArchive'
import Restore from '../Components/Restore'
import Typography from '@material-ui/core/Typography';
import DeleteForever from '../Components/DeleteForever'
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';

import { connect } from 'react-redux'

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

const theme3 = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '600px',
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
                width: '600px',
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

const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {

            'rounded': {
                borderRadius: '8px',
            }
        }
    }
})

const mapStateToProps = (state) => {
    console.log("In map state to props in notes", state);

    return {
        viewStatus: state.gridData

    }
};



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
            chipRemind: false,
            wholeData: this.props.note,
            Event: "",
            List: localStorage.getItem('List'),
            Grid: localStorage.getItem('Grid')
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

    handleReminderClick = async (event) => {
        console.log("In handle Reminder Click");
        console.log("Event is", event.currentTarget);


        this.setState({ chipRemind: !this.state.chipRemind })
        await this.setState({ Event: event.target })

        console.log("status of reminder chip", this.state.chipRemind);
        console.log("status of event", this.state.Event);


    }

    handleReminderDelete = () => {
        console.log("In Reminder delete");

        var Data = {
            "noteIdList": [this.state.noteId]
        }
        userService.removeReminder(Data).then(res => {

            console.log("Responce in deleting reminder notes", res);

            this.props.Refresh()

        })
            .catch(err => {
                console.log("Error in updating notes");

            })



    }

    handleLabel = () => {
        console.log("In handle label");

    }

    handleLabelDelete = (id) => {
        console.log("In label delete");

        let requestObject = {
            "noteId": [this.state.noteId],
            "id": id
        }
        userService.deleteLabelFromNotes(requestObject).then((data) => {
            console.log("label deleted", data);
            this.props.Refresh()

        }).catch((err) => {
            console.log(err);

        })

    }

    gotoAsk=()=>{
        this.props.props.props.history.push("/dashboard/AskQuestion/"+this.props.NoteId)
    }

    render() {

        // console.log("Array is in Notes",this.props.note.questionAndAnswerNotes[0].message);
        


        // console.log("In notes");
        // console.log("grid status", typeof (localStorage.getItem('Grid')));
        // console.log("state", this.state.Grid);

        // console.log("View Status",this.props.viewStatus);




        var GridList = this.props.viewStatus === true ? theme2 : theme3


        return (


            <MuiThemeProvider theme={theme}>

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
                                    {this.state.reminder.length > 0 && <div id="reminder1">
                                        {/* {this.props.Reminder} */}

                                        {/* <img src={require("../Assets/watch.svg")} alt="" />{this.state.reminder.toString().slice (4,10)+" "+this.state.reminder.toString().slice (16,21)} */}

                                        <Chip
                                            icon={<img src={require("../Assets/watch.svg")} alt="" />}
                                            label={this.state.reminder.toString().slice(4, 10) + " " + this.state.reminder.toString().slice(16, 21)}
                                            onClick={(event) => this.handleReminderClick(event)}
                                            // onClick={<Reminder event={this.state.Event} chipRemind={this.state.chipRemind} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />}
                                            // onClick={<Reminder/>}
                                            onDelete={this.handleReminderDelete}
                                        />

                                    </div>}
                                    <div id="label1">
                                        {this.state.wholeData.noteLabels.map(item => (

                                            <Chip
                                                label={item.label}
                                                onClick={this.handleLabel}

                                                onDelete={() => this.handleLabelDelete(item.id)}
                                            />
                                        ))}
                                    </div>

                                    <div id="label1">
                                        {this.state.wholeData.collaborators.map(item => (
                                            <Tooltip title={item.email} placement="center">
                                                <IconButton size="small" style={{ backgroundColor: "#a0c3ff", margin: "1%" }}>
                                                    <PersonIcon size="small" color="primary" />
                                                    {/* <img src={require('../Assets/smallcolab.jpg')} alt="Logo" id="profile" /> */}
                                                </IconButton>
                                            </Tooltip>
                                        ))}
                                    </div>



                                </div>
                                {/* chipRemind={this.state.chipRemind} */}
                                <div className="displayButton" style={{marginLeft:"5%"}}>
                                    {/* <div > */}

                                    {(this.state.wholeData.isArchived === false && this.state.wholeData.isDeleted === false) ?
                                        < div style={{ display: "flex" }}>
                                            <Reminder event={this.state.Event} chipRemind={this.state.chipRemind} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Collaborator note={this.props.note} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Color Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Image />
                                            <Archive Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                            <More note={this.props.note} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} refresh={this.handleRefresh} />
                                        </div>
                                        : null
                                    }
                                    {this.state.wholeData.isArchived === true ?
                                        < div style={{ display: "flex" }}>

                                            <Reminder event={this.state.Event} chipRemind={this.state.chipRemind} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Collaborator note={this.props.note} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Color Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Image />
                                            <UnArchive Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                            <More note={this.props.note} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} refresh={this.handleRefresh} />
                                        </div>
                                        : null
                                    }

                                    {this.state.wholeData.isDeleted === true ?
                                        < div style={{ display: "flex" }}>
                                            <DeleteForever note={this.props.note} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                            <Restore Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                        </div>
                                        : null
                                    }



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

                        <MuiThemeProvider theme={GridList}>
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
                                    {this.props.Reminder.length > 0 && <div id="reminder">
                                        {/* {this.props.Reminder} */}

                                        {/* <img src={require("../Assets/watch.svg")} alt="" />{this.state.reminder.toString().slice (4,10)+" "+this.state.reminder.toString().slice (16,21)} */}

                                        <Chip
                                            icon={<img src={require("../Assets/watch.svg")} alt="" />}
                                            label={this.state.reminder.toString().slice(4,10) + " " + this.state.reminder.toString().slice(16,21)}
                                            onClick={(event) => this.handleReminderClick(event)}
                                            // onClick={<Reminder event={this.state.Event} chipRemind={this.state.chipRemind} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />}
                                            // onClick={<Reminder/>}
                                            onDelete={this.handleReminderDelete}
                                        />

                                    </div>}

                                    {/* {this.state.wholeData.noteLabels.map(item=>
                                     (item.length > 0 && <div id="reminder">
                                     {/* {this.props.Reminder} */}

                                    {/* <img src={require("../Assets/watch.svg")} alt="" />{this.state.reminder.toString().slice (4,10)+" "+this.state.reminder.toString().slice (16,21)} */}
                                    {/*  
                                     <Chip
                                         // icon={<img src={require("../Assets/watch.svg")} alt="" />}
                                         label={item.label}
                                         // onClick={this.handleReminderClick}
                                         // onClick={<Reminder/>}
                                         // onDelete={this.handleReminderDelete}
                                     />
                                 </div>)
                                // )} */}
                                    <div id="label">
                                        {this.state.wholeData.noteLabels.map(item => (

                                            <Chip
                                                label={item.label}
                                                onClick={this.handleLabel}

                                                onDelete={() => this.handleLabelDelete(item.id)}
                                            />
                                        ))}
                                    </div>

                                    <div id="label2">
                                        {this.state.wholeData.collaborators.map(item => (
                                            <Tooltip title={item.email} placement="center">
                                                <IconButton size="small" style={{ backgroundColor: "#a0c3ff", margin: "1%", border: "2px solid", borderColor: "white" }}>
                                                    <PersonIcon size="small" color="primary" />
                                                    {/* <img src={require('../Assets/smallcolab.jpg')} alt="Logo" id="profile" /> */}
                                                </IconButton>
                                            </Tooltip>
                                        ))}
                                    </div>



                                    {/* #a0c3ff */}



                                </div>

                                <div className="displayButton">
                                    {/* <div > */}
                                    {(this.state.wholeData.isArchived === false && this.state.wholeData.isDeleted === false) ?
                                        < div style={{ display: "flex" }}>
                                            <Reminder note={this.props.note} event={this.state.Event} chipRemind={this.state.chipRemind} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Collaborator note={this.props.note} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Color note={this.props.note} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Image />
                                            <Archive note={this.props.note} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                            <More note={this.props.note} Title={this.state.title} props={this.props}
                                                Description={this.state.description} NoteId={this.state.noteId}
                                                refresh={this.handleRefresh} />
                                        </div>
                                        : null
                                    }
                                    {this.state.wholeData.isArchived === true ?
                                        < div style={{ display: "flex" }}>

                                            <Reminder note={this.props.note} event={this.state.Event} chipRemind={this.state.chipRemind} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Collaborator note={this.props.note} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Color note={this.props.note} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} REFRESH={this.handleRefresh} />
                                            <Image />
                                            <UnArchive note={this.props.note} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                            <More note={this.props.note} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} refresh={this.handleRefresh} />
                                        </div>
                                        : null
                                    }

                                    {this.state.wholeData.isDeleted === true ?
                                        < div style={{ display: "flex" }}>
                                            <DeleteForever note={this.props.note} Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                            <Restore Title={this.state.title} Description={this.state.description} NoteId={this.state.noteId} Refresh={this.handleRefresh} />
                                        </div>
                                        : null
                                    }

                                    




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
                                {/* <Divider/> */}
                                <div id="label3"> 
                                         {/* {this.props.note.questionAndAnswerNotes.map(item => ( */}
                                             {this.props.note.questionAndAnswerNotes.length ?
                                            <div onClick={this.gotoAsk} style={{cursor:"default"}}>
                                                <Divider/>
                                                <div style={{ fontWeight: "bold",width:"150px",margin:"2%" }}>Question Asked</div>
                                                <div style={{width:"200px",marginLeft:"10%",display:"flex",marginBottom:"2%"}}
                                                dangerouslySetInnerHTML={{ __html: this.props.note.questionAndAnswerNotes[0].message }}></div>
                                                
                                            </div>
                                            : null } 
                                        {/* ))}  */}
                                     </div> 
                                {/* </div> */}
                            </Card>
                        </MuiThemeProvider>


                    </div>
                }





            </MuiThemeProvider>


            // </div>


        )
    }
}



export default connect(mapStateToProps)(Notes)