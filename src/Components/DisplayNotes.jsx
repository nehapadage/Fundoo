import React, { Component } from 'react';
import './DisplayNotes.css'
import Notes from './Notes'
import userService from '../services/userService'

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import './TakeNote.css'
import TextField from "@material-ui/core/TextField";




const theme = createMuiTheme({
    overrides: {
        'MuiPaper': {
            'root': {
                width: '358px',
            },
            'rounded': {
                borderRadius: '8px',
            },
            'elevation1': {
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
            }
        },

        MuiButton: {
            root: {
                textTransform: "lowercase"
            }

        }
    }
})



class DisplayNotes extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            token: localStorage.getItem('LoginToken'),
            title: null,
            description: null,
            originalData:[],
            data:[]
        };


    }


    componentDidMount() {

        this.getNotes();

    }

    getNotes=()=>{
        userService.getAllNotes(this.state.token).then(res => {
            console.log("Response in Get All notes--->", res);

            console.log("Only data--->",res.data.data.data);

            // this.setState({ data : res.data.data.data })
            this.setState({ originalData : res.data.data.data })

            console.log("Original data is",this.state.originalData);
            
            var arr=[]

            arr=this.state.originalData.filter(key => 

                // console.log("In Filter"); 
                
                    ((key.isArchived ===false) && (key.isDeleted === false))
                    
                );

                console.log("Array is",arr);

                this.setState({data:arr})
                

        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }






    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {

        var mapCards=this.state.data.map(item=>{
            return (

                <Notes note={item} Title={item.title} Description={item.description} NoteId={item.id} Refresh={this.getNotes}/>

            );
            
        })


        return (
            <div className="cardsView">
                {mapCards}
            </div>
        )
    }
}
export default DisplayNotes