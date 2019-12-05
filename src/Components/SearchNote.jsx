import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux'
import userService from '../services/userService'
import DisplayNotes from '../Components/DisplayNotes'

class SearchNote extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            searchData:"",
            originalData:[],
            data:[],
            
            // searchValue:""
        };

        console.log(" search data",);

    }

    
    
    componentWillReceiveProps(){
      this.getNotes(); 
        
    }

    getNotes = () => {



    userService.getAllNotes().then(res => {
      console.log("Response in Get All notes in searching notes--->", res);

      console.log("Only data--->", res.data.data.data);

      // this.setState({ data : res.data.data.data })
      this.setState({ data: [] })
      this.setState({ originalData: res.data.data.data })

      console.log("Original data is", this.state.originalData);

      var arr = []
        if(this.props.searchValue !== ""){
      arr = this.state.originalData.filter(key =>

        // console.log("In Filter"); 

        ((key.title === this.props.searchValue) || (key.description === this.props.searchValue))

      );
        }

      console.log("Array is", arr);

      this.setState({ data: arr })

      console.log("Filtered Array is", this.state.data);


    })
      .catch(err => {
        console.log("Error in get all notes");
      })

  }


    render() {
        console.log("Props in search",this.props.searchValue);
        
        return (
            
                // <IconButton>
                //     <img src={require('../Assets/image.svg')} alt="Logo" />
                // </IconButton>
            <div>
                  <DisplayNotes notes={this.state.data}  Refresh={this.getNotes} />
            </div>
                
            
        )
    }
}

const mapStateToProps = (state) => {
    console.log("In map state to props in search note",state);

  let searchvalue=state;
  console.log(" serach value ",searchvalue);
  
    
    return{
      searchValue:state.searchData
  
    }
  };


export default connect(mapStateToProps) (SearchNote)