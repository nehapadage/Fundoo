import React, { Component } from 'react';
import './AskQuestion.css'
import userService from '../services/userService'
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

class AskQuestion extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            Id: "",
            title: "",
            description: "",
            view:false
        };

    }

    // componentDidUpdate = async (prevProps)=> {
    //     // only update chart if the data has changed
    //     if (prevProps !== this.props) {
    //      await   this.setState({Id:this.props.match.params.id}) ;
    //      this.getNoteDetails();
    //     }

    //   }

    componentDidMount = async () => {
        await this.setState({ Id: this.props.match.params.id });
        this.getNoteDetails();
    }

    getNoteDetails = () => {
        console.log("In function");

        userService.getNoteDetails(this.state.Id).then(res => {
            console.log("Response in Get note details--->", res);

            console.log("Only data--->", res.data.data.data[0].title);
            this.setState({ title: res.data.data.data[0].title })
            this.setState({ description: res.data.data.data[0].description })







        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }

    viewHide(){
        this.setState({view:!this.state.view})
    }

    render() {
        console.log("In ask question");
        console.log("Id in ask que", this.props.match.params.id);


        return (
            <div >
                <div className="askQue">
                    <div id="title">
                        <div>{this.state.title}</div>
                        <div><Button >close</Button></div>
                    </div>
                    <div id="title">
                        {this.state.description}
                    </div>
                    <Divider style={{marginTop:"2%"}}/>
                    <div id="titles">
                    Ask a Question
                    </div>
                    <div style={{display:"flex"}}>
                    Make sure what you’re asking is unique, concise, and phrased like a question.
                    </div>




                    <div id="que">
                        <Button style={{backgroundColor:"#fa7e36"}}>Submit-Question</Button>
                    </div>

                    {this.state.view ?
                    <div id="que" onClick={this.viewHide}>
                        <div><ExpandMoreIcon/></div>
                        <div>View Reply</div>                     
                    </div>
                    :
                    <div id="que" onClick={this.viewHide}>
                        <div><KeyboardArrowUpIcon/></div>
                        <div>Hide Reply</div>
                    </div>
    }




                </div>

            </div>

            // <IconButton>
            //     <img src={require('../Assets/image.svg')} alt="Logo" />
            // </IconButton>



        )
    }
}
export default AskQuestion