import React, { Component } from 'react';
import TakeNote from '../Components/TakeNote'
import userService from '../services/userService'
import DisplayNotes from './DisplayNotes'
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import './ChildLabel.css'
class ChildLabel extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            originalLabels: [],
            data: [],
            open:false,
            addLabel:"",
            update:false
        };

    }

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount() {
        this.setState({open:!this.state.open})
        this.getLabel();
    }

    getLabel = () => {



        userService.getLabels().then(res => {
            console.log("Response in Get All LABELS--->", res);

            console.log("Only data", res.data.data.details);

            this.setState({ originalLabels: res.data.data.details })

            // this.setState({ data : res.data.data.data })
            this.setState({ data: [] })
            // this.setState({ originalData: res.data.data.data })

            console.log("Original data labels is", this.state.originalLabels);

            // var arr = []

            // arr = this.state.originalLabels.map(key =>

            //     // console.log("In Filter"); 

            //    key.label

            // );

            // console.log("Array is", arr);

            // this.setState({ data: arr })

            // console.log("mapped label Array is", this.state.data);


        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }


    // handleRefresh = () => {
    //     this.props.refresh();
    // }

    //  handleClose = () => {
    //     // onClose(selectedValue);
    //   };

      handleListItemClick = value => {
        // onClose(value);
      };

      handleDone=()=>{
        this.setState({open:!this.state.open})
      }

      addLabel=()=>{
        let noteData = {
            // "noteIdList": [this.state.originalLabels.id],
           "label":this.state.addLabel,
           "userId":localStorage.getItem('userId'),
           "isDeleted":false
        }
        userService.addLabelOnNote(noteData).then((data) => {
            console.log("Responce in add Label On Note in child label",data);
            this.getLabel();
            this.setState({addLabel:""})
            // this.props.refresh()
        }).catch((err) => {
            console.log(err);

        })
      }

      updateLabel=()=>{
        let noteData = {
            // "noteIdList": [this.state.originalLabels.id],
           "label":this.state.addLabel,
           "userId":localStorage.getItem('userId'),
           "isDeleted":false
        }
        userService.addLabelOnNote(noteData).then((data) => {
            console.log("Responce in add Label On Note in child label",data);
            this.getLabel();
            this.setState({addLabel:""})
            // this.props.refresh()
        }).catch((err) => {
            console.log(err);

        })
      }

      update=()=>{
          this.setState({update:!this.state.update})
      }

    render() {
        console.log("In Child Note");
        console.log("Props in child note", this.props.notes);

        return (
            <div id="notek">
                {/* <div> */}
                {/* <TakeNote refresh={this.getNotes} /> */}
                {/* </div> */}

                {/* id="display" */}
                {/* <div >  */}
                {/* <DisplayNotes notes={this.state.data} ref={this.DisplayNotes} Refresh={this.getNotes} /> */}
                {/* </div>  */}
                <Dialog onClose={this.handleDone} aria-labelledby="simple-dialog-title" open={this.state.open}>
      <DialogTitle id="simple-dialog-title">Edit Labels</DialogTitle>
      <div className="input">
          <CloseIcon/>
      <Input 
        placeholder="Create new label"
        // className={classes.input}
        name="addLabel"
        value={this.state.addLabel}
        onChange={this.handlechangeall}
        inputProps={{
          'aria-label': 'description',
        }}
      />
      <CheckIcon onClick={this.addLabel}/>  
      </div>
      
      <List>
      {/* {this.state.update ? } */}
             {this.state.originalLabels.map(labeled => (
             <div className="input">
          <ListItem button onClick={() => this.handleListItemClick(labeled)} key={labeled}>
          <img src={require('../Assets/label.svg')} alt="Logo" id="imageFlex1" />
            <ListItemText primary={labeled.label} style={{marginLeft:"15%"}} onClick={this.update}/>
            <EditIcon onClick={this.updateLabel}/>
          </ListItem>
          </div>
        ))}
       
    <Divider />

        <ListItem autoFocus button onClick={() => this.handleDone}>
         
          <ListItemText primary="Done" />
        </ListItem>
      </List>
    </Dialog>
            </div>


        );
    }
}
export default ChildLabel