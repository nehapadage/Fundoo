import React, { Component } from 'react';
import './DisplayNotes.css'
import Notes from './Notes'
import userService from '../services/userService'
import Masonry from 'react-masonry-component'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import './TakeNote.css'
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux'




// const theme = createMuiTheme({
//     overrides: {
//         'MuiPaper': {
//             'root': {
//                 width: '358px',
//             },
//             'rounded': {
//                 borderRadius: '8px',
//             },
//             'elevation1': {
//                 boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
//             }
//         },

//         MuiButton: {
//             root: {
//                 textTransform: "lowercase"
//             }

//         }
//     }
// })



class DisplayNotes extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            token: localStorage.getItem('LoginToken'),
            title: null,
            description: null,
            originalData: [],
            data: [],
            // Note:this.props.notes
        };




    }

    handle = () => {
        this.props.Refresh()
    }


    // componentDidMount() {

    //     this.getNotes();

    // }

    // getNotes=()=>{

    //     console.log("*******************",this.state.arcRes);

    //     userService.getAllNotes(this.state.token).then(res => {
    //         console.log("Response in Get All notes--->", res);

    //         console.log("Only data--->",res.data.data.data);

    //         // this.setState({ data : res.data.data.data })
    //         this.setState({ originalData : res.data.data.data })

    //         console.log("Original data is",this.state.originalData);

    //         var arr=[]

    //         arr=this.state.originalData.filter(key => 

    //             // console.log("In Filter"); 

    //                 ((key.isArchived ===false) && (key.isDeleted === false))

    //             );

    //             console.log("Array is",arr);

    //             this.setState({data:arr})

    //             console.log("Filtered Array is",this.state.data);


    //     })
    //         .catch(err => {
    //             console.log("Error in get all notes");
    //         })

    // }






    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {

        console.log("Drawer Status in display notes", this.props.drawerValue);
        console.log("Grid Status in display notes", this.props.gridValue);


        let movement = this.props.drawerValue === true ? "movementOff" : "movementOn"


        console.log("Before mapping", this.props.notes);



        var mapCards = this.props.notes.map(item => {
            return (

                <Notes note={item} 
                    props = {this.props}
                Title={item.title} 
                Description={item.description}
                 NoteId={item.id} Color={item.color}
                  Reminder={item.reminder}
                   Refresh={this.handle} />

            );

        })


        return (
            <div> 
            
                {this.props.gridValue ?
                <div className={movement}>
                <Masonry className="cardsView">
                    {mapCards}
                    {/* <Notes filteredData={this.state.data}/> */}
                </Masonry>
                </div>
                :
                <div className="cardsView1">
                    {mapCards}
                    {/* <Notes filteredData={this.state.data}/> */}
                </div>
    }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("In map state to props drawer value in display notes", state);

    return {
        drawerValue: state.drawerData,
        gridValue:state.gridData

    }
};
export default connect(mapStateToProps)(DisplayNotes)