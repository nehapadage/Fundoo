
import React, { Component } from 'react';
import userService from '../services/userService'
import IconButton from '@material-ui/core/IconButton';

class ArchiveNotes extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {

        };

        

    }

    componentDidMount(){

        console.log();
        
      
        userService.getArchivedNote().then(res=>{
            console.log("Responce in Getting Archive notes",res);

            // this.props.Refresh();
            
        })
        .catch(err=>{
            console.log("Error in Getting Archive notes",err);
            
        })
    }

    render() {
        return (
            <div>
                {/* <IconButton onClick={this.archive}>
                    <img src={require('../Assets/archive.svg')} alt="Logo" />
                </IconButton>
                <div>

                </div> */}
            </div>




        )
    }
}
export default ArchiveNotes