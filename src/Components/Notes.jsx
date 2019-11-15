
import React, { Component } from 'react';
import userService from '../services/userService'
import './Notes.css'
import EditNote from './EditNote'
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

const theme = createMuiTheme({
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
            }
        }
    }
})

const theme1 = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '500px',
                zIndex:4000
            }
        }
    }
})



class Notes extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            flag: false,
            title:this.props.Title,
            description:this.props.Description,
            noteId:this.props.NoteId
        };

        // this.displayNotes=React.createRef()

        // this.setState({title:this.props.Title})


    }

    
    OpenDialog = () => {
        console.log("In dialog box");
        this.setState({ flag:!this.state.flag })

        
        var updateData={
            title:this.state.title,
            description:this.state.description,
            noteId:this.state.noteId
        }

        userService.update(updateData).then(res=>{

            console.log("Responce in updating notes",res);

            this.props.Refresh()
            
        })
        .catch(err=>{
            console.log("Error in updating notes");
            
        })

    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleRefresh=()=>{
        this.props.Refresh()
    }

    render() {


        return (
           

                <MuiThemeProvider theme={theme}>

                    {this.state.flag ?
                    <MuiThemeProvider theme={theme1}>
                         <div className="style1">
                        <Card  >
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

                            <div className="displayButton">
                                {/* <div > */}
                                <Reminder />
                                <Collaborator />
                                <Color />
                                <Image />
                                <Archive/>
                                <More Title={this.state.title} Description={this.state.description}  NoteId={this.state.noteId}/>




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
                        <Card  >
                            {/* <div className="createcardStyle4"> */}
                            <div className="createNoteStyle3">

                                <div className="createNoteStyle2" >
                                    <div onClick={this.OpenDialog}>
                                        {this.props.Title}
                                    </div>
                                    <div>
                                        <Button><img src={require("../Assets/pin.svg")} alt="" /></Button>
                                    </div>
                                </div>

                                <div id="descriptiondetail" onClick={this.OpenDialog}>
                                    {this.props.Description}
                                </div>

                            </div>

                            <div className="displayButton">
                                {/* <div > */}
                                <Reminder />
                                <Collaborator />
                                <Color />
                                <Image />
                                <Archive Title={this.state.title} Description={this.state.description}  NoteId={this.state.noteId} Refresh={this.handleRefresh}/>
                                <More Title={this.state.title} Description={this.state.description}  NoteId={this.state.noteId} refresh={this.handleRefresh}/>




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