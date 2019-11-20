import React, { Component } from 'react'
import './DrawerList.css'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class DrawerList extends Component {

  constructor(props) {
    super(props);
    
    this.state={
      notes:false,
      archive:false,
      trash:false,
      remind:false,
      label:false,
      
    }

  }


  archive = async () => {
    console.log("In getting archive");
    this.setState({notes:false,archive:true,trash:false,remind:false,label:false})
    // return( <ArchiveNotes/>);
    await this.props.archive();
   
  }

  notes= async ()=>{
    console.log("In getting notes");
    
    this.setState({notes:true,archive:false,trash:false,remind:false,label:false})
    
    await this.props.notes();
   
   
  }

  trash= async ()=>{
    console.log("In getting trash notes");
    this.setState({notes:false,archive:false,trash:true,remind:false,label:false})
    await this.props.trash();
  }

  remind=async()=>{
    console.log("In getting remind notes");
     this.setState({notes:false,archive:false,trash:false,remind:true,label:false})
    
     await  this.props.remind();
  }

  editLabels=()=>{
    console.log("In getting editLabels notes");
    this.setState({notes:false,archive:false,trash:false,remind:false,label:true})
    
      this.props.labels();
  }

  render() {
     
    var style=this.state.notes ? "notes" : null;
   var style1=this.state.archive ? "notes" : null;
    var style2=this.state.trash ? "notes" : null;
   var  style3=this.state.remind ? "notes" : null;
   var  style4=this.state.label ? "notes" : null;
   

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
            <ListItemText primary="Remainder" />
          </ListItem>
        </List>

        <Divider />

        <Typography id="title1" variant="h6" color="inherit" noWrap>Labels</Typography>

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

