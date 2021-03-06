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
import CloseIcon from '@material-ui/icons/Close';
import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { file } from '@babel/types';
import { search } from '../Actions/Action'
import { drawer } from '../Actions/Action'
import { view } from '../Actions/Action'
import { connect } from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';



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
        overflowY: "auto"
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
        textTransform: "lowercase",
      },
      root: {
        minWidth: "fit-content",
        height: "fit-content"
      }
    },
    MuiPaper: {
      root: {
        marginTop: "0px !important"
      }
    },
    MuiInputBase: {
      root: {
        width: "100%"
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
      event: '',
      propic: "",
      originalLabels: [],
      flag: false


    }



    // this.onDrop = this.onDrop.bind(this);

    this.DisplayNotes = React.createRef()
  }

  searchRedirect = () => {
    this.setState({ searchText: "" })
    this.props.history.push('/dashboard/notes')

  }

  searching = () => {
    // this.setState({flag:!this.state.flag})
    this.props.history.push('/dashboard/search')

  }

  handlechangeall = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    this.props.search(event.target.value)

  }

  componentDidMount() {

    this.setState({
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      archiveResponse: ""
    });

    // this.getNotes();
    this.getLabel();

  }

  getLabel = () => {



    userService.getLabels().then(res => {
      console.log("Response in Get All LABELS in dashboard--->", res);

      console.log("Only data", res.data.data.details);
      // this.setState({ originalLabels: [] })
      this.setState({ originalLabels: res.data.data.details })

      // this.setState({ data : res.data.data.data })

      // this.setState({ originalData: res.data.data.data })

      console.log("Original labels in drawer list", this.state.originalLabels);

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

  handleCart = () => {
    this.props.history.push('/dashboard/shoppingCart')
  }

  getOneLabel = (labelName) => {
    console.log("Label name in dashboard", labelName);

    this.props.history.push('/dashboard/label/' + labelName)
  }





  toggleDrawer = () => {
    this.setState({ open: !this.state.open }) // first false ---> true
    console.log("State of drawer in dashboard", this.state.open);
    this.props.drawer(this.state.open)

    // const data = {

    // }
    // this.props.dispatch({
    //   type:'ADD_POST',
    //   data});

    // localStorage.setItem('Drawer',this.state.open)
  }

  changeGrid = () => {
    this.setState({ grid: !this.state.grid })
    this.props.view(this.state.grid)

    // localStorage.setItem('Grid',this.state.grid)

    // this.setState({List:!this.state.List})

    //  localStorage.setItem('List',!(localStorage.getItem('List')))

    // this.props.history.push('/dashboard/notes')

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
    var fil = document.getElementById("myFile");
    console.log("File", fil);

    console.log(" select file event ", event);

    console.log("Event in ondrop", event[0]);

    this.setState({ event: event[0] })

    // this.setState({event:event[0].name})
    // console.log("Picture before ondrop ", this.state.pictures);
    var reader = new FileReader();

    reader.readAsDataURL(event[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log('event on load', event);

      const url = event.target.result;
      this.setState({ Event: url })
      console.log("Final event", this.state.Event);

      this.setState({ imageFlag: !this.state.imageFlag })
      this.setState({ pop: !this.state.pop })


    }







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

  setProfile = async () => {

    // var data={
    //   "status":this.state.Event,
    //   "type":"formData"
    // }

    // this.b64toBlob(this.state.Event)
    // console.log("B64 conversion",this.b64toBlob(this.state.Event));


    console.log("Final event in set profile", this.state.Event);

    var pic = new FormData();
    console.log("formdata before append", pic);



    await pic.append('file', this.state.event);

    // pic.append('file', pic)
    console.log(" appended ", pic.append('file', this.state.event));

    await this.setState({ propic: pic })

    console.log("Propic", this.state.propic);



    userService.setProfile(this.state.propic).then((res) => {
      console.log("respnse in setting profile--> ", res)

      localStorage.setItem('imageUrl', res.data.status.imageUrl)

      this.setState({ dialog: !this.state.dialog })

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

  cancel = () => {
    this.setState({ dialog: !this.state.dialog })

  }

  // b64toBlob(b64Data, contentType, sliceSize) {
  //   contentType = contentType || '';
  //   sliceSize = sliceSize || 512;

  //   var byteCharacters = atob(b64Data);
  //   var byteArrays = [];

  //   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //       var slice = byteCharacters.slice(offset, offset + sliceSize);

  //       var byteNumbers = new Array(slice.length);
  //       for (var i = 0; i < slice.length; i++) {
  //           byteNumbers[i] = slice.charCodeAt(i);
  //       }

  //       var byteArray = new Uint8Array(byteNumbers);

  //       byteArrays.push(byteArray);
  //   }

  // var blob = new Blob(byteArrays, {type: contentType});
  // return blob;
  // }










  render() {

    console.log("In dashboard");

    var image = 'http://fundoonotes.incubation.bridgelabz.com/' + localStorage.getItem('imageUrl');

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
                    onClick={this.searching}
                  />

                  <CloseIcon fontSize="small" onClick={this.searchRedirect} />

                </div>

                <div id="seconddiv">
                  <div>
                    <IconButton onClick={this.handleCart}>
                      <ShoppingCartIcon />
                    </IconButton>
                  </div>


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




                {localStorage.getItem('imageUrl') === '' ?
                  <IconButton onClick={this.handleProfileClick} size="small" style={{ backgroundColor: "#a0c3ff", margin: "1%", border: "2px solid", borderColor: "white" }}>
                    <PersonIcon size="small" color="primary" />
                  </IconButton>
                  : <div>
                    <IconButton onClick={this.handleProfileClick}>
                      <img src={image} alt="Logo" id="profile" />
                    </IconButton>
                  </div>}

              </Toolbar>

            </AppBar>

            <Dialog aria-labelledby="simple-dialog-title" open={this.state.dialog} className="dialog1">
              <div id="simple-dialog-title" style={{ width: '50%', height: '50%' }}>
                <div id="title">
                  <DialogTitle>Selected profile photo</DialogTitle>
                </div>
                {/* <div>
                To crop this image, drag the region below and then click "Set as profile photo"
                    </div> */}
                {/* <Cropper
                // ref={cropper}
                src={this.state.Event}

                style={{ height: 400, width: '100%' }}
                // Cropper.js options
                aspectRatio={16 / 9}
                guides={false}
                crop={(event) => this.crop(event)} /> */}
                <div id="image" style={{ width: '100%', height: '100%' }} >
                  <img src={this.state.Event} alt="img" />
                </div>
                {/* <img src={this.state.imageName} alt="Logo" /> */}
                {/* <img src={image}/> */}
                <div id="buttons">
                  <div id="set">
                    <Button onClick={this.setProfile}>Set as profile photo</Button>
                  </div>
                  <div>
                    <button onClick={this.cancel}>cancel</button>
                  </div>
                </div>
              </div>
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
                                  id="myFile"
                                  imgExtension={['.jpeg', '.jpg', '.png', '.gif']}
                                  maxFileSize={5242880}

                                />
                                // <input type="file"  alt="img"  onChange={(event) => this.change(event)}/>
                                :
                                <div>
                                  {localStorage.getItem('imageUrl') === '' ?
                                    // <IconButton onClick={this.handleChangeProfile} size="large" style={{ backgroundColor: "#a0c3ff", margin: "1%", border: "2px solid", borderColor: "white" }}>
                                      <PersonIcon size="large" color="primary" />
                                    // </IconButton>
                                     : <img src={image} alt="Logo" id="profile1" onClick={this.handleChangeProfile} />
                                  }
                                </div>



                              }


                              {/* <img src={require('../Assets/profile.png')} alt="Logo" id="profile1" /> */}
                            </IconButton>
                          </div>
                        </MuiThemeProvider>
                        {/* <input type="file" onClick={(event) => this.change(event)}></input> */}

                        <div>
                          {this.state.firstName + " " + this.state.lastName}
                        </div>

                        <div id="email">
                          {this.state.email}
                        </div>

                      </div>

                      <div>
                        <Button
                          style={{ height: "35px" }}
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
              <DrawerList Labels={this.state.originalLabels} oneLabel={this.getOneLabel} labels={this.getLabels} archive={this.getArchive} notes={this.getNotes} trash={this.getTrashNotes} remind={this.getRemind} />

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

const mapStateToProps = (state) => {
  console.log("In map state to props", state);

  return {
    drawerValue: state

  }
};

const mapDispatchToProps =
{
  search,
  view,
  drawer

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)