
import React, { Component } from 'react';
import userService from '../services/userService'
import './More.css'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import Popper from '@material-ui/core/Popper';
import Checkbox from '@material-ui/core/Checkbox';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '150px',
                marginLeft: '2%',

                marginTop: '7%'
            },
            'rounded': {
                borderRadius: '4px',
            },
            'elevation1': {
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
            }
        },
        'MuiButton': {
            'label': {

                textTransform: "none"
            }
        }
    }
})
const theme1 = createMuiTheme({
    overrides: {
        'MuiPopover': {
            'paper': {
                // top: '500px',
                width: '250px',
                marginTop: '7%'
            },
        }
    }
})

class More extends Component {

    constructor(props) {
        super(props);


        this.state = {
            flag: false,
            anchorEl: null,
            open: false,
            noteId: this.props.NoteId,
            label: "",
            labelArray: [],
            noteLabels: [],
            deleteSnack: false,
            addLabel: "",
            check: "",
            noteLabelArray: []
            // demo: false,
            // demo1: false
        };

    }

    more = (event) => {
        // return (
        console.log("more", event)
        console.log("Props are====>", this.props);
        console.log("NewProps", this.props.note.noteLabels);
        this.setState({ noteLabelArray: this.props.note.noteLabels })
        this.setState({ flag: !this.state.flag })
        this.setState({ anchorEl: event.currentTarget })

        // );

    }

    componentWillReceiveProps(newProps) {



    }





    handleDeleteNote = () => {

        console.log("Props are   *************  ====>", this.state.noteId);
        var deleteData = {
            'noteIdList': [this.state.noteId],
            'isDeleted': true
        }

        userService.TrashNote(deleteData).then(res => {
            console.log("Response in deleting note", res);

            this.setState({ deleteSnack: true })

            this.props.refresh();


        })
            .catch(err => {
                console.log("Error in deleting note", err);

            })

    }

    handleAddLabels = () => {
        this.setState({ open: true })
        // this.setState({ flag: !this.state.flag })



        userService.getLabels().then(res => {
            console.log("Responce in get labels", res);

            console.log("Only data", res.data.data.details);

            this.setState({ labelArray: res.data.data.details })

            // this.props.refresh();

        })
            .catch(err => {
                console.log("Error in add label");

            })
    }

    handleClose = () => {
        this.setState({ anchorEl: null, open: false, flag: false });
        // this.props.refresh();
    }

    handleCheck = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    checkedEvent = (event, labelArray) => {
        console.log('i am here');

        if (event.target.checked === true) {
            console.log("Already checked");
            let noteData = {
                "noteId": [this.state.noteId],
                "id": labelArray.id,
                // "label":labelArray.label,
                // "userId": localStorage.getItem('userId'),
                // "isDeleted": false,
            }
            userService.addLabelOnNote(noteData).then((data) => {
                console.log("*****************Responce in add Label On Note*************", data);
                this.props.refresh()
            }).catch((err) => {
                console.log(err);

            })

        }
        else if (event.target.checked === false) {
            console.log("Unchecked");
            // deleteLabelFromNotes(noteData){

            for (let i = 0; i < this.state.noteLabelArray.length; i++) {

                if (this.state.noteLabelArray[i].id === labelArray.id) {
                    this.state.noteLabelArray.splice(i, 1)
                }
            }
            this.setState({ noteLabelArray: this.state.noteLabelArray});
            
            let requestObject = {
                "noteId": [this.state.noteId],
                "id": labelArray.id,
            }
            userService.deleteLabelFromNotes(requestObject).then((data) => {
                console.log("label deleted", data);
                this.props.refresh()
                console.log("Refresh called in delete");
                
            }).catch((err) => {
                console.log(err);

            })



        }
        //     console.log("In checked event");
        //  this.setState({check:labelArray.id})    
        //     if (event.target.checked) {
        //         // this.setState({ open: false });
        //         let noteData = {
        //             "noteId": [this.state.noteId],
        //             "id": labelArray.id,
        //             // "label":labelArray.label,
        //             // "userId": localStorage.getItem('userId'),
        //         // "isDeleted": false,
        //         }
        //         userService.addLabelOnNote(noteData).then((data) => {
        //             console.log("*****************Responce in add Label On Note*************",data);
        //             // this.props.refresh()
        //         }).catch((err) => {
        //             console.log(err);

        //         })

        //     } else {
        //         for (let i = 0; i < this.state.noteLabels.length; i++) {

        //             if (this.state.noteLabels[i].id === this.state.labelArray.id) {
        //                 this.state.noteLabels.splice(i, 1)
        //             }
        //         }
        //         this.setState({ noteLabels: this.state.noteLabels });
        //         let requestObject = {
        //             noteIdList: this.state.noteId,
        //             labelId: this.state.labelArray.id
        //         }
        //         userService.deleteLabelFromNote(requestObject).then((data) => {
        //             console.log("label deleted", data);
        //             // this.props.refresh()
        //         })
        //     }

    }

    render() {

        // var label = this.state.labelArray.map(item => {
        //     return (
        //         // <Checkbox checked={this.state.checkedA} onChange={this.handleChange('checkedA')} value="checkedA" />+

        //         <MenuItem>
        //         <div>
        //         {/* {item.id} */}
        //         <Checkbox
        //         checked={this.state.demo}
        //         onChange={this.handleCheck('demo')}
        //         value=""
        //         color="primary"
        //         inputProps={{
        //           'aria-label': 'secondary checkbox',
        //         }}
        //       />

        //       {item.label}
        //         </div>

        //         </MenuItem>

        //     )
        // })

        // return(
        //     <div>
        //         {label}
        //     </div>
        // )





        return (        //{event=>this.more(event)}>


            <div>
                <IconButton onClick={this.more}>
                    <MoreVertIcon />
                </IconButton>
                {/* <Popper open={this.state.flag} anchorEl={this.state.anchorEl} onClose={this.handleClose}>
                    <MuiThemeProvider theme={theme}>

                        <Paper >
                            <div style={{ width: 150 }}>

                                <div>
                                    <Button onClick={this.handleDeleteNote}>
                                        <div>Delete note</div>
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={this.handleAddLabels}>
                                        <div >Add Labels</div>
                                    </Button>
                                </div>

                            </div>



                        </Paper>
                    </MuiThemeProvider>

                </Popper> */}
                <MuiThemeProvider theme={theme}>
                    <Popover
                        open={this.state.flag}
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
                        <MenuList>
                            <MenuItem onClick={this.handleDeleteNote}>Delete note</MenuItem>
                            <MenuItem onClick={this.handleAddLabels}>Add label</MenuItem>
                        </MenuList>
                        {/* <div>
                                    <Button onClick={this.handleDeleteNote}>
                                        <div>Delete note</div>
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={this.handleAddLabels}>
                                        <div >Add Labels</div>
                                    </Button>
                                </div> */}
                    </Popover>
                </MuiThemeProvider>

                <div>
                    <MuiThemeProvider theme={theme1}>
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
                            {/* <div>
                                <div className="reminderTextStyle">
                                    <label>Label note:</label>
                                </div>
                                <MenuList>

                                    <MenuItem>
                                        <div className="reminderStyle"> 
                             <div id="text">Enter label name</div>  
                             <TextField 
                                                placeholder='Enter label name'
                                                // margin="normal"
                                                name="label"
                                                value={this.state.label}
                                                onChange={this.handlechangeall}
                                                InputProps={{
                                                    disableUnderline: true
                                                }}
                                            />
                                            <div id="text1"><SearchIcon /></div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem id="label">
                                        {/* {label} 
                                    </MenuItem> */}



                            <MenuList>
                                <div className="reminderTextStyle">
                                    <label>Label note:</label>
                                </div>
                                <div className="reminderStyle">
                                    <TextField
                                        placeholder='Enter label name'
                                        // margin="normal"
                                        name="label"
                                        value={this.state.addLabel}
                                        onChange={this.handlechangeall}
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                    />
                                    <div id="text1"><SearchIcon /></div>
                                </div>
                                {this.state.labelArray.map((labelObject, index) => (
                                    <div className="labelPopover" key={index}>
                                        <Checkbox
                                            checked={this.state.noteLabelArray.find((choice) => choice.id === labelObject.id)}
                                            // checked={this.state.check===labelObject.id}
                                            onClick={(event) => this.checkedEvent(event, labelObject)}
                                        />
                                        <label className="labelNameStyle" >{labelObject.label}</label>
                                    </div>
                                ))}
                            </MenuList>




                        </Popover>
                    </MuiThemeProvider>
                    <Snackbar

                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.deleteSnack}
                        autoHideDuration={6000}
                        onClose={this.handleClose}

                        message="Deleted successfully"

                    />
                </div>




            </div>







        )
    }
}
export default More