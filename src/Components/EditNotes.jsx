

import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import '../App.css';
import TextField from "@material-ui/core/TextField";
import MoreButton from './moreMenu'
// import { Archive } from './archive'
// import { updateNoteStatus } from '../services/services'

const theme = createMuiTheme({
  overrides: {
    'MuiPaper': {
      'root': {
        width: '35%',
        minHeight: "55px",
        margin: '18px auto',
        // paddingBottom: '20px'
      },
      'elevation1': {
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
      }
    },
    'MuiDialog': {
      'paper': {
        width: "35%",
      }
    }
  }
});

class EditNotes extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      showDialogBox: false,
      title: "",
      description: "",
      noteId: ""
    }
    console.log("note data", this.props.noteDetails);
  }

  handleUpdateNote = () => {
    this.props.closeProps()
    let updateData = {
      "title": this.state.title,
      "description": this.state.description,
      "noteId": this.state.noteId
    }
  //    updateNoteStatus(updateData).then((data) => {
  //     console.log(data);
  //     this.props.refresh()
  //   }).catch((err) => {
  //     console.log(err);

  //   })

  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ title: nextProps.noteDetails.title });
  //   this.setState({ description: nextProps.noteDetails.description });
  //   this.setState({ noteId: nextProps.noteDetails._id });
  // }

  /**
     * @description : handle Drawer view as open close
     * drawerController : change value when event happened
     */
  // handleTitle = (event) => {
  //   let titleValue = event.target.value;
  //   this.setState({ title: titleValue });
  // };


  /**
    * @description : handle Drawer view as open close
    * drawerController : change value when event happened
    */
  // handleDescription = (event) => {
  //   let descriptionValue = event.target.value;
  //   this.setState({ description: descriptionValue });
  // };


  render() 
  {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Dialog
            open={this.props.showDialogBoxProps}
            onClose={this.props.showDialogBoxProps}
          >
            <div className="dialogdisplayNoteStyle">
              <TextField
                value={this.state.title}
                onChange={this.handleTitle}
                margin="normal"
                InputProps={{
                  disableUnderline: true
                }}
              />
              <TextField
                value={this.state.description}
                onChange={this.handleDescription}
                multiline={true}
                margin="normal"
                InputProps={{
                  disableUnderline: true
                }}
              />
            </div>
            <div className="dialogdisplayButton">
              <div className="buttons">
                <Button><img src={require("../Assets/remind.svg")} alt="" /></Button>
                <Button><img src={require("../Assets/color.svg")} alt="" /></Button>
                {/* <Archive noteProps={this.props.noteDetails} refresh={this.props.refresh}></Archive> */}
                <MoreButton noteProps={this.props.noteDetails} refresh={this.props.refresh} labelArray={this.props.labelArray} />
              </div>
              <div className="closeBtn">
                <Button onClick={this.handleUpdateNote} color="primary">
                  close
                                </Button>
              </div>
            </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );

  }
}
export default EditNotes