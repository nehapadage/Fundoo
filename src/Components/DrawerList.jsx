import React, { Component } from 'react'
import ArchiveNotes from '../Components/ArchiveNotes'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class DrawerList extends Component {

  constructor(props) {
    super(props);
    console.log("In getting archive====>");

  }


  archive = () => {
    console.log("In getting archive");
    
    // return( <ArchiveNotes/>);
    this.props.archive();
   
  }

  render() {


    return (
      <div>
        <List component="nav">
          <ListItem button >
            <ListItemIcon>
              <img src={require('../Assets/notes.svg')} id="imageFlex" />
              {/* <InboxIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <img src={require('../Assets/remind.svg')} alt="Logo" id="imageFlex1" />
              {/* <DraftsIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Remainder" />
          </ListItem>
        </List>

        <Divider />

        <Typography id="title1" variant="h6" color="inherit" noWrap>Labels</Typography>

        <ListItem button>
          <ListItemIcon>
            <img src={require('../Assets/edit.svg')} alt="Logo" id="trash" />
            {/* <InboxIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Edit labels" />
        </ListItem>


        <Divider />

        <List component="nav">

          <ListItem button onClick={this.archive}>
            <ListItemIcon>
              <img src={require('../Assets/archive.svg')} alt="Logo" id="trash" />
              {/* <InboxIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>

          <ListItem button>
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

