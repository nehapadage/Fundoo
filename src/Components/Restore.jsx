
import React, { Component } from 'react';
import userService from '../services/userService'
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

class Restore extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            flag:false
        };

        

    }

    restore=()=>{

        console.log(" props ",this.props.noteData);
      const  data={
        //   "title":this.props.Title,
        //   "description":this.props.Description,
            'noteIdList':[this.props.NoteId],
            'isDeleted':false
        }
        console.log(" restore notes",data);
        

        userService.TrashNote(data).then(res=>{
            console.log("Responce in restore notes",res);
            this.setState({flag:true})

            this.props.Refresh();
            
        })
        .catch(err=>{
            console.log("Error in restore notes",err);
            
        })
    }

    render() {
        return (
            <div>
                <IconButton onClick={this.restore}>
                    {/* <img src={require('../Assets/archive.svg')} alt="Logo" /> */}
                    <RestoreFromTrashIcon fontSize="medium"/>
                </IconButton>
                <Snackbar

                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    open={this.state.flag}
                                    autoHideDuration={6000}
                                    onClose={this.handleClose}

                                    message="Restored successfully"


                                />
                
            </div>




        )
    }
}
export default Restore