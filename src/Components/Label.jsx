import React, { Component } from 'react';
import TakeNote from '../Components/TakeNote'
import userService from '../services/userService'
import DisplayNotes from './DisplayNotes'
import IconButton from '@material-ui/core/IconButton';

class Label extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            originalData: [],
            data: [],
            username:""
        };

    }

    // componentDidMount() {
    //     this.getNotesByLabel();
    // }

    componentDidUpdate = async (prevProps)=> {
        // only update chart if the data has changed
        if (prevProps !== this.props) {
         await   this.setState({username:this.props.match.params.username}) ;
         this.getNotesByLabel();
        }
       
      }

    getNotesByLabel = () => {

       

        userService.getNotesByLabel(this.state.username).then(res => {
            console.log("Response in get Notes By Label--->", res);

            console.log("Only data--->", res.data.data.data);

            // this.setState({ data : res.data.data.data })
            this.setState({ originalData: [] })
            this.setState({ originalData: res.data.data.data })

            console.log("Original data is", this.state.originalData);

            // var arr = []

            // arr = this.state.originalData.filter(key =>

            //     // console.log("In Filter"); 

            //     ((key.isArchived === false) && (key.isDeleted === false))

            // );

            // console.log("Array is", arr);

            // this.setState({ data: arr })

            // console.log("Filtered Array is", this.state.data);


        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }


    handleRefresh = () => {
        this.props.refresh();
    }

    render() {

      
         

        console.log("In Child Label Note");
        // console.log("Props in child note", this.props.notes);
        console.log("URL username",this.props.match.params.username);
       

        return (
            <div id="notek">
                {/* <div> */}
                <TakeNote refresh={this.getNotes} />
                {/* </div> */}

                {/* id="display" */}
                {/* <div >  */}
                <DisplayNotes notes={this.state.originalData} ref={this.DisplayNotes} Refresh={this.getNotesByLabel} />
                {/* </div>  */}
            </div>


        );
    }
}
export default Label