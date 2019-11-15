
import React, { Component } from 'react';
import userService from '../services/userService'
import IconButton from '@material-ui/core/IconButton';

class Archive extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {

        };

        

    }

    archive=()=>{

        console.log(" ptops ",this.props.noteData);
      const  data={
        //   "title":this.props.Title,
        //   "description":this.props.Description,
            'noteIdList':[this.props.NoteId],
            'isArchived':true
        }
        console.log(" archive notes",data);
        

        userService.archiveNote(data).then(res=>{
            console.log("Responce in Archive notes",res);

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
                <div>

                </div>
            </div>




        )
    }
}
export default Archive