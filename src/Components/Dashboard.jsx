import React, { Component } from 'react';
import './Dashboard.css'
import userService from '../services/userService'
import DrawerList from '../Components/DrawerList'
import TakeNote from '../Components/TakeNote'
import DisplayNotes from './DisplayNotes'
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';



// const styles = {
//   navBar: { 'top': AppBar.height }
// }
const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        top: "65px",
        width: "250px"
      }

    },
    MuiSvgIcon: {
      root: {
        color: "grey"
      }
    },
    MuiButton: {
      label: {
        color: "grey",
        textTransform: "lowercase"
      }
    }
  }

});



const theme1 = createMuiTheme({
  overrides: {

    MuiTouchRipple: {
      root: {
        border: "2px solid",
        bordercolor: "grey"

      }
    }
  },

});






class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {

      open: false,
      grid: false,
      anchorEl: null,
      pop: false,
      firstName: "",
      lastName: "",
      email: "",
      originalData: [],
      data: []

    }

    this.DisplayNotes = React.createRef()
  }

  componentDidMount() {

    this.setState({
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      archiveResponse: ""
    });

    this.getNotes();

  }

  getNotes = () => {



    userService.getAllNotes().then(res => {
      console.log("Response in Get All notes--->", res);

      console.log("Only data--->", res.data.data.data);

      // this.setState({ data : res.data.data.data })
      this.setState({ data: [] })
      this.setState({ originalData: res.data.data.data })

      console.log("Original data is", this.state.originalData);

      var arr = []

      arr = this.state.originalData.filter(key =>

        // console.log("In Filter"); 

        ((key.isArchived === false) && (key.isDeleted === false))

      );

      console.log("Array is", arr);

      this.setState({ data: arr })

      console.log("Filtered Array is", this.state.data);


    })
      .catch(err => {
        console.log("Error in get all notes");
      })

  }




  toggleDrawer = () => {
    this.setState({ open: !this.state.open })
  }

  changeGrid = () => {
    this.setState({ grid: !this.state.grid })
  }

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      pop: !state.pop,
    }));
  };


  handleLogOutSubmit = () => {


    // this.setRedirect();
    localStorage.clear();
    var path = '/login'
    this.props.history.push(path)
  }

  handleRefresh = () => {
    this.getNotes()
  }


  getTrashNotes = () => {
    userService.getTrashedNotes().then(res => {
      console.log("Responce in Getting Trash notes", res.data.data.data);
      this.setState({ data: res.data.data.data })

      console.log("Responce in Getting Trash notes ***********", this.state.data);



    })
      .catch(err => {
        console.log("Error in Getting Archive notes", err);

      })

  }

  getArchive = () => {
    userService.getArchivedNote().then(res => {
      console.log("Responce in Getting Archive notes", res.data.data.data);
      this.setState({ data: res.data.data.data })

      console.log("Responce in Getting Archive notes ***********", this.state.data);



      // return (
      // // <div>
      //   <DisplayNotes/>
      //   // </div>
      //   );

      // this.props.Refresh();

    })
      .catch(err => {
        console.log("Error in Getting Archive notes", err);

      })
  }

  render() {
    let movement=this.state.open ? "movementOn" : "movementOff"

    return (
      <MuiThemeProvider theme={theme}>
        <div className="main">

          <div id="header">
            <AppBar id="app">
              <Toolbar id="tool">

                <div id="firstdiv">
                  <div>
                    <IconButton edge="start" className="menuButton" color="grey" aria-label="menu"
                      onClick={this.toggleDrawer}>
                      <MenuIcon />
                    </IconButton>
                  </div>

                  <div>
                    <img src={require('../Assets/keep.png')} alt="Logo" id="imageFlex" style={{"width": "44px","height": "40px"}}/>
                  </div>

                  <div>
                    <Typography id="title" variant="h6" color="inherit" noWrap>
                      <label id="flabel">F</label>
                      <label id="ulabel">u</label>
                      <label id="nlabel">n</label>
                      <label id="dlabel">d</label>
                      <label id="olabel">o</label>
                      <label id="o2label">o</label>
                    </Typography>
                  </div>
                </div>


                <div id="search">
                  <div className="searchIcon">
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: "inputRoot",
                      input: "inputInput",
                    }}
                  />
                </div>

                <div id="seconddiv">
                  <div>
                    <IconButton>
                      <img src={require('../Assets/refresh.svg')} alt="Logo" id="imageFlex1" />
                    </IconButton>
                  </div>

                  <div>
                    {this.state.grid ?
                      <IconButton onClick={this.changeGrid}>
                        <img src={require('../Assets/grid.svg')} alt="Logo" id="imageFlex1" />
                      </IconButton>
                      :
                      <IconButton onClick={this.changeGrid}>
                        <img src={require('../Assets/grid1.svg')} alt="Logo" id="imageFlex1" />
                      </IconButton>
                    }
                  </div>

                  <div>
                    <IconButton>
                      <img src={require('../Assets/settings.svg')} alt="Logo" id="imageFlex1" />
                    </IconButton>
                  </div>
                </div>





                <div>
                  <IconButton onClick={this.handleClick}>
                    <img src={require('../Assets/profile.png')} alt="Logo" id="profile" />
                  </IconButton>
                </div>
              </Toolbar>

            </AppBar>



            <Popper open={this.state.pop} anchorEl={this.state.anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <div className="pop">
                      <div id="fnlnemail">
                        <MuiThemeProvider theme={theme1}>
                          <div>
                            <IconButton onClick={this.handleClick}>
                              <img src={require('../Assets/profile.png')} alt="Logo" id="profile1" />
                            </IconButton>
                          </div>
                        </MuiThemeProvider>


                        <div>
                          {this.state.firstName + " " + this.state.lastName}
                        </div>

                        <div id="email">
                          {this.state.email}
                        </div>

                      </div>

                      <div>
                        <Button
                          id="logoutButton"
                          variant="contained"
                          color="primary"
                          onClick={this.handleLogOutSubmit}
                        >
                          Logout
                    </Button>
                      </div>


                    </div>
                  </Paper>
                </Fade>
              )}
            </Popper>


            <Drawer
              className="drawer"
              variant="persistent"
              anchor="left"

              open={this.state.open}
              classes={{
                paper: "drawerPaper"
              }}
            >
              <DrawerList archive={this.getArchive} notes={this.getNotes} trash={this.getTrashNotes} />

              {/* <List>
            {['Notes', 'Remainders'].map((text, index) => (
              <ListItem button key={text}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> 
                <ListItemIcon>{<img src={require('../Assets/keep.png')} alt="Logo" id="imageFlex" />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Archive', 'Trash'].map((text, index) => (
              <ListItem button key={text}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> 
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
            </Drawer>

          </div>

          <div className="mainBody-for-notes">

            <div id={movement}>
            <div>
              <TakeNote refresh={this.handleRefresh} />
            </div>

            {/* <div id="display"> */}
            <DisplayNotes notes={this.state.data} ref={this.DisplayNotes} Refresh={this.getNotes} />
            {/* </div> */}
            </div>
            


          </div>
        </div>
      </MuiThemeProvider>
    )

  }

}

export default Dashboard