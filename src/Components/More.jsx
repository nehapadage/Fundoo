
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
            labelArray: [],
            deleteSnack: false
        };

    }

    more = (event) => {
        // return (
        console.log("more", event)
        console.log("Props are====>", this.props);
        this.setState({ flag: !this.state.flag })
        this.setState({ anchorEl: event.currentTarget })

        // );

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
            console.log("Responce in add label", res);

            console.log("Only data", res.data.data.details);

            this.setState({ labelArray: res.data.data.details })

        })
            .catch(err => {
                console.log("Error in add label");

            })
    }

    handleClose = () => {
        this.setState({ anchorEl: null, open: false , flag:false});
    }

    render() {

        var label = this.state.labelArray.map(item => {
            return (
                // <Checkbox checked={this.state.checkedA} onChange={this.handleChange('checkedA')} value="checkedA" />+
                item.label
            )
        })



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
                            <div>
                                <div className="reminderTextStyle">
                                    <label>Label note:</label>
                                </div>
                                <MenuList>

                                    <MenuItem>
                                        <div className="reminderStyle">
                                            <div id="text">Enter label name</div> <div id="text1"><SearchIcon /></div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem>
                                        {label}
                                    </MenuItem>


                                </MenuList>
                            </div>
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