import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import Cropper from 'react-cropper';
import './Dashboard.css'
import ChildNote from '../Components/ChildNote'
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
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

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
        width: "250px",
        height: "90vh",
        overflowY: "scroll"
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
    },
    MuiPaper: {
      root: {
        marginTop: "0px !important"
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
      data: [],
      searchText: "",
      imageFlag: false,
      pictures: [],
      dialog: false,
      imageName: '',
      Event: '',
      event:'',
      List:false

    }

    // this.onDrop = this.onDrop.bind(this);

    this.DisplayNotes = React.createRef()
  }

  handlechangeall = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {

    this.setState({
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      archiveResponse: ""
    });

    // this.getNotes();

  }

  // getNotes = () => {



  //   userService.getAllNotes().then(res => {
  //     console.log("Response in Get All notes--->", res);

  //     console.log("Only data--->", res.data.data.data);

  //     // this.setState({ data : res.data.data.data })
  //     this.setState({ data: [] })
  //     this.setState({ originalData: res.data.data.data })

  //     console.log("Original data is", this.state.originalData);

  //     var arr = []

  //     arr = this.state.originalData.filter(key =>

  //       // console.log("In Filter"); 

  //       ((key.isArchived === false) && (key.isDeleted === false))

  //     );

  //     console.log("Array is", arr);

  //     this.setState({ data: arr })

  //     console.log("Filtered Array is", this.state.data);


  //   })
  //     .catch(err => {
  //       console.log("Error in get all notes");
  //     })

  // }

  getNotes = () => {
    this.props.history.push('/dashboard/notes')
  }

  getArchive = () => {
    this.props.history.push('/dashboard/archiveNotes')
  }

  getTrashNotes = () => {
    this.props.history.push('/dashboard/trashNotes')
  }

  getRemind = () => {
    this.props.history.push('/dashboard/remindNotes')
  }

  getLabels = () => {
    this.props.history.push('/dashboard/labelNotes')
  }

  getOneLabel = (labelName) => {
    console.log("Label name in dashboard", labelName);

    this.props.history.push('/dashboard/label/' + labelName)
  }





  toggleDrawer = () => {
    this.setState({ open: !this.state.open })
  }

  changeGrid = () => {
    this.setState({ grid: !this.state.grid })
    this.setState({List:!this.state.List})
    localStorage.setItem('List',this.state.List)
  }

  handleProfileClick = event => {
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

  // handleRefresh = () => {
  //   this.getNotes()
  // }


  handleChangeProfile = () => {
    this.setState({ imageFlag: !this.state.imageFlag })
  }

  //   onDrop=(event)=> {
  //     console.log("Event in ondrop",event);

  //     console.log("Picture before ondrop ",this.state.pictures);

  //     // this.setState({
  //     //     pictures: this.state.pictures.concat(picture),
  //     // });

  //     // console.log("Picture after ondrop ",this.state.pictures);
  // }

  change = async (event) => {
    console.log("Event in ondrop", event[0]);

    // this.setState({event:event[0].name})
    // console.log("Picture before ondrop ", this.state.pictures);
    var reader = new FileReader();

    reader.readAsDataURL(event[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log('event on load',event);
      
      const url = event.target.result;
      this.setState({ Event: url })

    }

    console.log("Final event", this.state.Event);


    // await this.setState({
    //   pictures: this.state.pictures.concat(picture),
    // });

    // let x = this.state.pictures.concat(File)
    // console.log("Picture after ondrop ", this.state.pictures);
    // console.log("Picture after ondrop name ", x[0].name);
    // this.setState({ imageName: x[0].name })

    await this.setState({ dialog: !this.state.dialog })

    // console.log("Dialog status", this.state.dialog);


  }

  crop = () => {
    console.log("In crop");
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());

  }

  setProfile=()=>{

    // var data={
    //   "status":this.state.Event,
    //   "type":"formData"
    // }

    userService.setProfile(this.state.Event).then((res) => {
      console.log("respnse in setting profile--> ", res)

      // if (res.data.data.success === true) {
      //     this.setState({ flag1: true })
      //     // alert(`Registration Successful-----`);
      //     this.setRedirect();
      // }
      // else {
      //     alert(`Email Already Exists-----`);
          
      // }
  }).catch((err) => {
      // this.setState({ flag: true })
      console.log("error in registration--> ", err)
  })


}



  




  render() {

    console.log("In dashboard");

    var image = 'http://fundoonotes.incubation.bridgelabz.com' + localStorage.getItem('imageUrl');

    // let movement = this.state.open ? "movementOn" : "movementOff"

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
                    <img src={require('../Assets/keep.png')} alt="Logo" id="imageFlex" style={{ "width": "44px", "height": "40px" }} />
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
                    name="searchText"
                    value={this.state.searchText}
                    placeholder="Search…"
                    classes={{
                      root: "inputRoot",
                      input: "inputInput",
                    }}
                    onChange={this.handlechangeall}
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
                  <IconButton onClick={this.handleProfileClick}>
                    <img src={require('../Assets/profile.png')} alt="Logo" id="profile" />
                  </IconButton>
                </div>
              </Toolbar>

            </AppBar>

            <Dialog aria-labelledby="simple-dialog-title" open={this.state.dialog} className="dialog1" style={{ width: "1200px" }}>

              <DialogTitle id="simple-dialog-title">Select profile photo</DialogTitle>
              <div>
                To crop this image, drag the region below and then click "Set as profile photo"
                    </div>
              {/* <Cropper
                // ref={cropper}
                src={this.state.Event}

                style={{ height: 400, width: '100%' }}
                // Cropper.js options
                aspectRatio={16 / 9}
                guides={false}
                crop={(event) => this.crop(event)} /> */}
                <img src={this.state.Event} alt="img"/>
              {/* <img src={this.state.imageName} alt="Logo" /> */}
              {/* <img src={image}/> */}
              <Button onClick={this.setProfile}>Set as profile photo</Button>
              <button>cancel</button>
            </Dialog>



            <Popper open={this.state.pop} anchorEl={this.state.anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <div className="pop">
                      <div id="fnlnemail">
                        <MuiThemeProvider theme={theme1}>
                          <div>
                            <IconButton >
                              {this.state.imageFlag ?
                                <ImageUploader
                                  // className="imgupload"
                                  withIcon={true}
                                  buttonText='Choose images'
                                  onChange={(event) => this.change(event)}
                                  imgExtension={['.jpeg', '.jpg', '.png', '.gif']}
                                  maxFileSize={5242880}
                                />
                                // <input type="file"  alt="img"  onChange={(event) => this.change(event)}/>
                                : null}
                              <img src={require('../Assets/profile.png')} alt="Logo" id="profile1" onClick={this.handleChangeProfile} />

                              {/* <img src={require('../Assets/profile.png')} alt="Logo" id="profile1" /> */}
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
              <DrawerList oneLabel={this.getOneLabel} labels={this.getLabels} archive={this.getArchive} notes={this.getNotes} trash={this.getTrashNotes} remind={this.getRemind} />

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

          {/* <div className="mainBody-for-notes">

            <div id={movement}>
            <ChildNote refresh={this.handleRefresh} notes={this.state.data}/>
            </div>
            


          </div> */}
        </div>
      </MuiThemeProvider>
    )

  }

}

export default Dashboard