import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import './Collaborator.css'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import userService from '../services/userService'
import { loadOptions } from '@babel/core';
import ListItemText from '@material-ui/core/ListItemText';
import { createMuiTheme, MuiThemeProvider, Button, Paper, Menu } from "@material-ui/core";
import MenuList from '@material-ui/core/MenuList';
import PersonIcon from '@material-ui/icons/Person';
import Popover from '@material-ui/core/Popover';
import Popper from '@material-ui/core/Popper';


// .--2553

const theme = createMuiTheme({
    overrides: {
        'MuiInputBase': {

            'input': {

                marginTop: '5%',

            }
        },
        MuiButton: {
            root: {
                textTransform: "lowercase"
            }

        },
        'MuiDialog': {

            'root': {

                zIndex: '4001',

            }
        },
        
    }
})

const theme1 = createMuiTheme({
    overrides: {
'MuiPaper': {
    'root': {
        width: '400px',
        marginLeft: '400px',

        marginTop: '400px'
    },
    'rounded': {
        borderRadius: '4px',
    },
    'elevation1': {
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    }
}
    }
})

class Collaborator extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            id: this.props.NoteId,
            dialog: false,
            Collaborator: "",
            search: "",
            Suggestions: [],
            colab:[],
            open:false,
            anchorEl:null
        };

        


    }

    componentDidMount=async()=>{
        console.log("in compo did mount");
        
       await this.setState({colab:this.props.note.collaborators})
        console.log("Props in collaborator", this.state.colab);
    }

    // componentWillReceiveProps= (newProps) => {
    //     this.setState({colab:newProps.note})
    //     console.log("New props",newProps);
        
    // }

    handlechangeall = (event) => {
        console.log("calling", event);

        this.setState({ [event.target.name]: event.target.value })
        console.log("Event.target is", event.target);

        this.getUserList(event)
    }

  

    // componentWillMount(){
    //     console.log("In did mount");
        
    // }

    getUserList = async (event) => {
        console.log("Search word is", event.target.value);
        await this.setState({ search: event.target.value })
        console.log("Search", this.state.search);

        var data = {
            searchWord: this.state.search
        }

        userService.getUserList(data).then((data) => {
            console.log("Responce in get user list On Note in collaborator", data);
            console.log("Suggestions ", data.data.data.details);

            this.setState({open:!this.state.open})
            this.setState({ anchorEl: event.currentTarget })

            this.setState({ Suggestions: data.data.data.details })
          

            console.log("New suggestions are", this.state.Suggestions);




            // this.setState({ addLabel: "" })
            // this.props.refresh()
        }).catch((err) => {
            console.log(err);

        })

    }

    handleDialog = () => {
        console.log("In opening dialog box");
        
        this.setState({ dialog: !this.state.dialog })
    }

    addCollaborator = (data) => {
        console.log("All data in add collaborator", data);
        data.id = this.props.NoteId

        userService.addCollaborator(data).then((res) => {
            console.log("Responce in addCollaborator On Note in collaborator", res);
            console.log("data",data);
            


            this.setState({ Suggestions: [] })
            this.setState({ Collaborator: "" })


            // this.props.REFRESH()
            this.props.note.collaborators.push(data);
            this.setState({colab:this.props.note.collaborators})

            // console.log("After pushing props",this.props.note.collaborators);
      
        }).catch((err) => {
            console.log(err);

        })


    }

    removeColab=(data)=>{
       
        // console.log("UserId",data.userId);

        var Data={
            "id":this.props.NoteId,
            "collaboratorUserId":data.userId
        }
        console.log("Data",Data);

        userService.removeCollaborator(Data).then((res) => {
            console.log("Responce in removeCollaborator On Note in collaborator", res);
            console.log("data",data);
            
            this.props.note.collaborators.splice(data,1);
            this.setState({colab:this.props.note.collaborators})

          


            // this.props.REFRESH()

            

            // console.log("After pushing props",this.props.note.collaborators);
      
        }).catch((err) => {
            console.log(err);

        })

        
        
    }

    cancel=()=>{
        this.setState({ dialog: !this.state.dialog })  
    }

    save=()=>{
       this.props.REFRESH()
    }

    render() {

        var array = this.state.Suggestions.map((key) => {
            return (

                <ListItem style={{ backgroundColor: "#EDEDED" }}>

                    <label className="suggestion" onClick={() => this.addCollaborator(key)}>{key.email}</label>

                </ListItem>

            )
        })

        var array1 = this.state.colab.map((key) => {
            console.log("In colab map");
console.log("colab notes",this.props.note.collaborators);

            return (
                <div id="pic">
                    <div id="icon">
                        <IconButton size="small" style={{backgroundColor:"#a0c3ff"}}>
                        <PersonIcon size="small" color="primary"/>
                        {/* <img src={require('../Assets/smallcolab.jpg')} alt="Logo" id="profile" /> */}
                        </IconButton>
                    </div>
                    <div id="fnlnemail">
                        <div id="fnln1">
                            {key.firstName + " " +key.lastName}
                        </div>
                        <div id="mail">
                            {key.email}
                        </div>
                    </div>
                    <IconButton id="removeColab" onClick={()=>this.removeColab(key)}>
                        <CloseIcon fontSize="medium"/>
                    </IconButton>

                </div>
            )
        })

        console.log("In collaborator");

        var image = 'http://fundoonotes.incubation.bridgelabz.com/' + localStorage.getItem('imageUrl');

        return (
            <div>
               
                    <IconButton onClick={this.handleDialog}>
                        <img src={require('../Assets/collaborator.svg')} alt="Logo" />
                    </IconButton>
                    <MuiThemeProvider theme={theme}>
                    <Dialog aria-labelledby="simple-dialog-title" open={this.state.dialog} style={{zIndex:4001}}  >
                        <div className="box" style={{ width: "600px", height: "auto" }}>
                            <div className="dialogBoxSize">
                                <DialogTitle>Collaborator</DialogTitle>

                                <Divider />

                                <div id="pic">
                                    <div>
                                        <IconButton onClick={this.handleProfileClick}>
                                            <img src={image} alt="Logo" id="profile" />
                                        </IconButton>
                                    </div>
                                    <div id="fnlnemail">
                                        <div id="fnln1">
                                            {localStorage.getItem('firstName') + " " + localStorage.getItem('lastName') + " (Owner)"}
                                        </div>
                                        <div id="mail">
                                            {localStorage.getItem('email')}
                                        </div>
                                    </div>

                                </div>

                                <div>
                                    {array1}
                                </div>

                                <div id="person">
                                    <div id="prof">
                                        <IconButton style={{ border: "solid 1px"}} size="small">
                                            <img src={require('../Assets/collaborator.svg')} alt="Logo" />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <Input
                                            style={{ fontWeight: "500", fontSize: "15px" }}
                                            placeholder="Person or Email to share with"
                                            // className={classes.input}
                                            name="Collaborator"
                                            value={this.state.Collaborator}
                                            onChange={this.handlechangeall}
                                            inputProps={{
                                                'aria-label': 'description',
                                            }}
                                        />

                                    </div>

                                </div>

                                {this.state.Suggestions ?
                                <MuiThemeProvider theme={theme1}>
                                {/* <Popper
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                onClose={this.handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                style={{ width: '50%' }}
                            > */}
                            {/* <Paper> */}
                                {/* <Menu> */}
                                    <MenuList>

                                        {array}
                                    </MenuList>
                                    {/* </Menu> */}
                                    {/* </Paper> */}
                                    {/* </Popper> */}
                                    </MuiThemeProvider>

                                    : null}


                                <div id="save">
                                    <Button onClick={this.cancel}>Cancel</Button>
                                    <Button onClick={this.save}>Save</Button>
                                </div>


                            </div>
                        </div>
                    </Dialog>

                </MuiThemeProvider>
            </div>



        )
    }
}
export default Collaborator