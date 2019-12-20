import React, { Component } from 'react';
import TakeNote from '../Components/TakeNote'
import userService from '../services/userService'
import DisplayNotes from './DisplayNotes'
import IconButton from '@material-ui/core/IconButton';
import './ChildLabel.css'

class ChildNote extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            originalData: [],
            data: [],
            data1: []
        };

    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes = () => {



        userService.getAllNotes().then(res => {
            console.log("Response in Get All notes--->", res);

            console.log("Only data--->", res.data.data.data);

            // this.setState({ data : res.data.data.data })
            this.setState({ data: [],data1:[] })
            this.setState({ originalData: res.data.data.data.reverse() })

            console.log("Original data is", this.state.originalData);

            var arr = []

            arr = this.state.originalData.filter(key =>

                // console.log("In Filter"); 

                ((key.isArchived === false) && (key.isDeleted === false) && (key.isPined === false))

            );

            console.log("Array is", arr);

            this.setState({ data: arr })

            console.log("Filtered Array is", this.state.data);


            var arr1 = []
            arr1 = this.state.originalData.filter(key =>

                // console.log("In Filter"); 

                (key.isPined === true)

            );
            console.log("Array of pined is", arr1);

            this.setState({ data1: arr1 })

            console.log("Filtered pined Array is", this.state.data1);


        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }


    handleRefresh = () => {
        this.props.refresh();
    }

    render() {
        console.log("In Child Note");
        // console.log("Props in child note", this.props.notes);

        return (
            <div className="notek">
                {/* <div> */}
                <TakeNote refresh={this.getNotes} note={this.state.data} />
                {/* </div> */}

                {/* id="display" */}
                {/* <div >  */}
                <DisplayNotes props={this.props} notes={this.state.data} pined={this.state.data1} ref={this.DisplayNotes} Refresh={this.getNotes} />
                {/* </div>  */}
            </div>


        );
    }
}
export default ChildNote