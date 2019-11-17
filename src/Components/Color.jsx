import React, { Component } from 'react';
import './Color.css'
import Button from '@material-ui/core/Button';
import userService from '../services/userService'
// import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';



// const theme = createMuiTheme({
//     overrides: {
//         'MuiPaper': {
//             'root': {
//                 width: '150px',
//                 marginLeft:'150px'
//             }
//         }
//     }
// })

const colorsPallete = [{
    colorName: "Default",
    colorCode: "#ffffff"
},
{
    colorName: "Pink",
    colorCode: "#fdcfe8"
},
{
    colorName: "Gray",
    colorCode: "#e8eaed"
},
{
    colorName: "Dark blue",
    colorCode: "#aecbfa"
},
{
    colorName: "Blue",
    colorCode: "#cbf0f8"
},
{
    colorName: "Teal",
    colorCode: "#a7ffeb"
},
{
    colorName: "Green",
    colorCode: "#ccff90"
},
{
    colorName: "Yellow",
    colorCode: "#fff475"
},
{
    colorName: "Orange",
    colorCode: "#fbbc04"
},
{
    colorName: "Red",
    colorCode: "#f28b82"
},
{
    colorName: "Purple",
    colorCode: "#d7adfb"
},
{
    colorName: "Dark Brown",
    colorCode: "#e6c9a7"
}]


class Color extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            anchorEl: null,
            currentColor: null
        };

    }



    handleClick = event => {
        console.log("In render of color code");
        this.setState({
            anchorEl: event.currentTarget,
        });
    };


    handleClose = () => {
        this.setState({ anchorEl: null, });

    };


    handleChangeColor = (colorCode) => {


        this.setState({ anchorEl: null, });

        // this.setState({currentColor:colorCode})

        console.log("Selected color is--->", colorCode);



        if (this.props.NoteId) {
            let noteData = {
                "noteIdList": [this.props.NoteId],
                "color": colorCode
            }
          

            userService.color(noteData).then((res) => {
                console.log("Response in color", res);

                this.props.REFRESH();  //for after creating notes


            }).catch((err) => {
                console.log(err);

            })
        }
        else{
            this.props.refresh(colorCode);   //changing color for before creating notes
        }


    }

    render() {

        // console.log("In render of color code");


        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton onClick={this.handleClick}>
                    <img src={require('../Assets/color.svg')} alt="Logo" />
                </IconButton>
                <Popover
                    id="simple-popper"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    // anchorOrigin={{
                    //     vertical: 'top',
                    //     horizontal: 'left',
                    // }}
                    // transformOrigin={{
                    //     vertical: 'top',
                    //     horizontal: 'left',
                    // }}
                    style={{ width: '150px', height: '350px', textAlign: "center" ,zIndex:"4001"}}
                >
                    <div className="colorDirection">
                        {colorsPallete.map((text, index) => (
                            <div key={index}>
                                <Tooltip title={text.colorName} placement="center">
                                    <IconButton style={{ backgroundColor: text.colorCode }} onClick={() => this.handleChangeColor(text.colorCode)}></IconButton>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </Popover>
            </div>




        )
    }
}
export default Color