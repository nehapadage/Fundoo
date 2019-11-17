
import React, { Component } from 'react';
import userService from '../services/userService'
import './More.css'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '150px',
                marginLeft: '150px'
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
class More extends Component {

    constructor(props) {
        super(props);


        this.state = {
            flag: false,
            anchorEl: null,
            noteId: this.props.NoteId
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
            this.props.refresh();

        })
            .catch(err => {
                console.log("Error in deleting note", err);

            })

    }

    render() {



        return (        //{event=>this.more(event)}>


            <div>
                <IconButton onClick={this.more}>
                    <MoreVertIcon />
                </IconButton>

                <Popper open={this.state.flag} anchorEl={this.state.anchorEl}>
                    <MuiThemeProvider theme={theme}>

                        <Paper >
                            <div style={{ width: 150 }}>

                                <div>
                                    <Button onClick={this.handleDeleteNote}>
                                        <div>Delete note</div>
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={this.handleClick}>
                                        <div >Change Labels</div>
                                    </Button>
                                </div>

                            </div>



                        </Paper>
                    </MuiThemeProvider>

                </Popper>




            </div>







        )
    }
}
export default More