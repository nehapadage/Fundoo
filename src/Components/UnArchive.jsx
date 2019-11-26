
import React, { Component } from 'react';
import userService from '../services/userService'
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

class UnArchive extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            flag:false
        };

        

    }

    unarchive=()=>{

        console.log(" props ",this.props.noteData);
      const  data={
        //   "title":this.props.Title,
        //   "description":this.props.Description,
            'noteIdList':[this.props.NoteId],
            'isArchived':false
        }
        console.log(" Unarchive notes",data);
        

        userService.unArchiveNote(data).then(res=>{
            console.log("Responce in UnArchive notes",res);
            this.setState({flag:true})

            this.props.Refresh();
            
        })
        .catch(err=>{
            console.log("Error in UnArchive notes",err);
            
        })
    }

    render() {
        return (
            <div>
                <IconButton onClick={this.unarchive}>
                    {/* <img src={require('../Assets/archive.svg')} alt="Logo" /> */}
                    <UnarchiveIcon fontSize="medium"/>
                </IconButton>
                <Snackbar

                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    open={this.state.flag}
                                    autoHideDuration={6000}
                                    onClose={this.handleClose}

                                    message="unArchived successfully"


                                />
                
            </div>




        )
    }
}
export default UnArchive