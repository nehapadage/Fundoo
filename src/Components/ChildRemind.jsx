import React, { Component } from 'react';
import TakeNote from '../Components/TakeNote'
import userService from '../services/userService'
import DisplayNotes from './DisplayNotes'
import IconButton from '@material-ui/core/IconButton';

class ChildRemind extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            originalData: [],
            data: []
        };

    }

    componentDidMount() {
        this.getReminderNotes();
    }

    getReminderNotes = () => {
        userService.getReminderedNotes().then(res => {
          console.log("Responce in Getting reminder notes", res.data.data.data);
          this.setState({ data: [] })
          this.setState({ data: res.data.data.data })
    
          console.log("Responce in Getting reminder notes ***********", this.state.data);
    
    
    
        })
          .catch(err => {
            console.log("Error in Getting Archive notes", err);
    
          })
    
      }



    render() {
        console.log("In Child Note");
        console.log("Props in child note", this.props.notes);

        return (
            <div id="notek">
                {/* <div> */}
                <TakeNote refresh={this.getNotes} />
                {/* </div> */}

                {/* id="display" */}
                {/* <div >  */}
                <DisplayNotes notes={this.state.data} ref={this.DisplayNotes} Refresh={this.getReminderNotes} />
                {/* </div>  */}
            </div>


        );
    }
}
export default ChildRemind