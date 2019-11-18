
import React, { Component } from 'react';
import userService from '../services/userService'
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

class Archive extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            flag:false
        };

        

    }

    archive=()=>{

        console.log(" props ",this.props.noteData);
      const  data={
        //   "title":this.props.Title,
        //   "description":this.props.Description,
            'noteIdList':[this.props.NoteId],
            'isArchived':true
        }
        console.log(" archive notes",data);
        

        userService.archiveNote(data).then(res=>{
            console.log("Responce in Archive notes",res);
            this.setState({flag:true})

            this.props.Refresh();
            
        })
        .catch(err=>{
            console.log("Error in Archive notes",err);
            
        })
    }

    render() {
        return (
            <div>
                <IconButton onClick={this.archive}>
                    <img src={require('../Assets/archive.svg')} alt="Logo" />
                </IconButton>
                <Snackbar

                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    open={this.state.flag}
                                    autoHideDuration={6000}
                                    onClose={this.handleClose}

                                    message="Archived successfully"


                                />
                
            </div>




        )
    }
}
export default Archive