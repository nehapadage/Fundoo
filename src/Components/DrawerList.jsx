import React, { Component } from 'react'
import './DrawerList.css'
import userService from '../services/userService'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class DrawerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: false,
      archive: false,
      trash: false,
      remind: false,
      label: false,
      labels:false,
      originalLabels:this.props.Labels,
      currentLabel: null
    }

  }

  componentDidMount() {
    this.setState({ notes: true, archive: false, trash: false, remind: false, label: false })
    // this.getLabel();
  }

  // getLabel = () => {



  //   userService.getLabels().then(res => {
  //     console.log("Response in Get All LABELS--->", res);

  //     console.log("Only data", res.data.data.details);
  //     this.setState({ originalLabels: [] })
  //     this.setState({ originalLabels: res.data.data.details })

  //     // this.setState({ data : res.data.data.data })

  //     // this.setState({ originalData: res.data.data.data })

  //     console.log("Original labels in drawer list", this.state.originalLabels);

  //     // var arr = []

  //     // arr = this.state.originalLabels.map(key =>

  //     //     // console.log("In Filter"); 

  //     //    key.label

  //     // );

  //     // console.log("Array is", arr);

  //     // this.setState({ data: arr })

  //     // console.log("mapped label Array is", this.state.data);


  //   })
  //     .catch(err => {
  //       console.log("Error in get all notes");
  //     })

  // }


  archive = async () => {
    console.log("In getting archive");
    this.setState({ notes: false, archive: true, trash: false, remind: false, label: false,labels:false })
    // return( <ArchiveNotes/>);
    await this.props.archive();

  }

  notes = async () => {
    console.log("In getting notes");

    this.setState({ notes: true, archive: false, trash: false, remind: false, label: false,labels:false })

    await this.props.notes();


  }

  trash = async () => {
    console.log("In getting trash notes");
    this.setState({ notes: false, archive: false, trash: true, remind: false, label: false,labels:false })
    await this.props.trash();
  }

  remind = async () => {
    console.log("In getting remind notes");
    this.setState({ notes: false, archive: false, trash: false, remind: true, label: false,labels:false })

    await this.props.remind();
  }

  editLabels = () => {
    console.log("In getting editLabels notes");
    this.setState({ notes: false, archive: false, trash: false, remind: false, label: true,labels:false })

    this.props.labels();
  }

  Label=(labelName,id)=>{
    console.log("In getting Labels");
    this.setState({currentLabel:id})
    this.setState({ notes: false, archive: false, trash: false, remind: false, label: false,labels:true })
    this.props.oneLabel(labelName);
   
  }

  render() {

    console.log("In render of drawer list",this.state.originalLabels);
    console.log("In render of drawer list**********",this.props.Labels);
    

    var style = this.state.notes ? "notes" : null;
    var style1 = this.state.archive ? "notes" : null;
    var style2 = this.state.trash ? "notes" : null;
    var style3 = this.state.remind ? "notes" : null;
    var style4 = this.state.label ? "notes" : null;
    var style5= this.state.labels ? "notes" : null;
    console.log("styles are....",style5);
    


    return (
      <div>
        <List component="nav">
          <ListItem button id={style} onClick={this.notes} >
            <ListItemIcon>
              <img src={require('../Assets/notes.svg')} id="imageFlex" />
              {/* <InboxIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button id={style3} onClick={this.remind}>
            <ListItemIcon>
              <img src={require('../Assets/remind.svg')} alt="Logo" id="imageFlex1" />
              {/* <DraftsIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Reminder" />
          </ListItem>
        </List>

        <Divider />


        <Typography id="title1" variant="h6" color="inherit" noWrap>Labels</Typography>


        {this.props.Labels.map((labeled, index) => (

          // this.setState({addLabels:labeled.label})

          <div className="input" key={index}>
            {/* {this.state.labels===index ? } */}
           {this.state.currentLabel===labeled.id ? <ListItem button id={style5} onClick={()=>this.Label(labeled.label,labeled.id)}>
          <ListItemIcon>
            <img src={require('../Assets/labels.svg')} alt="Logo" id="trash" />
            {/* <InboxIcon /> */}
          </ListItemIcon>
          <ListItemText primary={labeled.label} />
        </ListItem>
        :
        <ListItem button onClick={()=>this.Label(labeled.label,labeled.id)}>
          <ListItemIcon>
            <img src={require('../Assets/labels.svg')} alt="Logo" id="trash" />
            {/* <InboxIcon /> */}
          </ListItemIcon>
          <ListItemText primary={labeled.label} />
        </ListItem>
   }

          </div>
        ))}







        <ListItem button id={style4} onClick={this.editLabels}>
          <ListItemIcon>
            <img src={require('../Assets/edit.svg')} alt="Logo" id="trash" />
            {/* <InboxIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Edit labels" />
        </ListItem>


        <Divider />

        <List component="nav">

          <ListItem button id={style1} onClick={this.archive}>
            <ListItemIcon>
              <img src={require('../Assets/archive.svg')} alt="Logo" id="trash" />
              {/* <InboxIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>

          <ListItem button id={style2} onClick={this.trash}>
            <ListItemIcon>
              <img src={require('../Assets/trash.svg')} alt="Logo" id="trash" />
              {/* <InboxIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>

        </List>
      </div>

    );
  }
}
export default DrawerList

