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
import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@material-ui/icons/Delete';
import './ChildLabel.css'
class ChildLabel extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            originalLabels: [],
            // data: [],
            open: false,
            addLabel: "",
            addLabels: "",
            // update: false,
            currentLabel: null
        };

    }

    handlechangeall = async (event) => {
        console.log("calling", event.target);

        await this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount() {
        this.setState({ open: !this.state.open })
        this.getLabel();
    }

    getLabel = () => {



        userService.getLabels().then(res => {
            console.log("Response in Get All LABELS--->", res);

            console.log("Only data", res.data.data.details);
this.setState({ originalLabels: [] })
            this.setState({ originalLabels: res.data.data.details })

            // this.setState({ data : res.data.data.data })
            
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

    handleDone = () => {
        console.log("avxvxfg");

        this.setState({ open: !this.state.open })
        this.props.history.push('/dashboard/notes')

    }

    addLabel = () => {
        let noteData = {
            // "noteIdList": [this.state.originalLabels.id],
            "label": this.state.addLabel,
            "userId": localStorage.getItem('userId'),
            "isDeleted": false
        }
        userService.addLabel(noteData).then((data) => {
            console.log("Responce in add Label On Note in child label", data);
            this.getLabel();
            this.setState({ addLabel: "" })
            // this.props.refresh()
        }).catch((err) => {
            console.log(err);

        })
    }

    updateLabel = (label) => {
        console.log("label in update",label);
        
        let noteData = {
            // "noteIdList": [this.state.originalLabels.id],
            "label": this.state.addLabels,
            "userId": localStorage.getItem('userId'),
            "isDeleted": false,
            "id": label.id
        }
        userService.updateLabel(noteData).then((data) => {
            console.log("Responce in update Label On Note in child label", data);
        
            this.getLabel();
            // this.setState({ addLabel: "" })
            // this.props.refresh()
        }).catch((err) => {
            console.log(err);

        })

      

        this.setState({ currentLabel: null })

    }

    deleteLabel= (label)=>{
        console.log("label in update",label);
        
        let noteData = {
            // // "noteIdList": [this.state.originalLabels.id],
            // "label": this.state.addLabels,
            // "userId": localStorage.getItem('userId'),
            // "isDeleted": false,
            "id": label.id
        }
        userService.deleteLabel(noteData).then((data) => {
            console.log("Responce in delete Label On Note in child label", data);
        
            this.getLabel();

            // this.setState({ addLabel: "" })
            // this.props.refresh()
        }).catch((err) => {
            console.log(err);

        })
      
        this.setState({ currentLabel: null })
    }

    // update = () => {
    //     this.setState({ update: !this.state.update })
    // }

    changeOnlyOneLabel = (labelId) => {
        this.setState({ currentLabel: labelId })
    }

    close=()=>{
        this.setState({addLabel:""})
    }

    render() {
        console.log("In Child Label Note");

        return (

            <div className="notek">
                {/* <div> */}
                {/* <TakeNote refresh={this.getNotes} /> */}
                {/* </div> */}

                {/* id="display" */}
                {/* <div >  */}
                {/* <DisplayNotes notes={this.state.data} ref={this.DisplayNotes} Refresh={this.getNotes} /> */}
                {/* </div>  */}
                <Dialog aria-labelledby="simple-dialog-title" open={this.state.open} className="dialog">
                    <DialogTitle id="simple-dialog-title">Edit Labels</DialogTitle>
                    <div className="input">
                        <CloseIcon onClick={this.close}/>
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
                        <CheckIcon onClick={this.addLabel} />
                    </div>

                    {/* {this.state.update ?
                        <List>

                            {this.state.originalLabels.map(labeled => (
                                <div className="input">
                                    <ListItem button onClick={() => this.handleListItemClick(labeled)} key={labeled}>
                                        <img src={require('../Assets/label.svg')} alt="Logo" id="imageFlex1" />
                                        <ListItemText primary={labeled.label} style={{ marginLeft: "15%" }} />
                                        <CheckIcon onClick={this.updateLabel} />
                                    </ListItem>
                                </div>
                            ))}

                            <Divider />

                            <ListItem autoFocus button onClick={() => this.handleDone}>

                                <ListItemText primary="Done" />
                            </ListItem>
                        </List>

                        : */}

                    <List>

                        {this.state.originalLabels.map((labeled, index) => (

                            // this.setState({addLabels:labeled.label})

                            <div className="input" key={index}>
                                <ListItem button onClick={() => this.handleListItemClick(labeled)}>
                                {/* <img src={require('../Assets/trash.svg')} alt="Logo" id="imageFlex1" /> */}
                        {this.state.currentLabel === labeled.id ? <DeleteIcon onClick={()=>this.deleteLabel(labeled)} fontSize="small"/> : <img src={require('../Assets/label.svg')} alt="Logo" id="imageFlex1" /> }




                                <div  className="input1">

                               
                                    <TextField
                                    // style={{ marginLeft: "15%" }}
                                        // placeholder="Create new label"
                                       
                                        name="addLabels"
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                        defaultValue={labeled.label}
                                        onChange={this.handlechangeall}

                                        onClick={() => this.changeOnlyOneLabel(labeled.id)}
                                    />
                                     </div>
                                    {this.state.currentLabel === labeled.id ? <CheckIcon onClick={()=>this.updateLabel(labeled)} /> : <EditIcon onClick={ ()=>this.changeOnlyOneLabel(labeled.id)} />}
                                    {/*                         
                    <ListItemText primary={labeled.label} style={{ marginLeft: "15%" }} onClick={this.update} />}
                                        {this.state.update ? <CheckIcon onClick={this.updateLabel} /> : <EditIcon onClick={this.update} />} */}
                                </ListItem>
                            </div>
                        ))}


                        <Divider />

                        <ListItem autoFocus button onClick={this.handleDone}>

                            <ListItemText primary="Done" />
                        </ListItem>
                    </List>



                </Dialog>
            </div>


        );
    }
}
export default ChildLabel