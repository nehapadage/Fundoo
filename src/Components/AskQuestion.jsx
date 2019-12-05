import React, { Component } from 'react';
import './AskQuestion.css'
import userService from '../services/userService'
import IconButton from '@material-ui/core/IconButton';
import { Button, Input } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TextField from "@material-ui/core/TextField";
import ReplyIcon from '@material-ui/icons/Reply';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { array } from 'prop-types';

class AskQuestion extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {
            Id: "",
            title: "",
            description: "",
            view: false,
            question: "",
            submit: false,
            currentDateTime: "",
            like: 0,
            answer: [],
            que: [],
            onlyMessage: []
        };

    }

    // componentDidUpdate = async (prevProps)=> {
    //     // only update chart if the data has changed
    //     if (prevProps !== this.props) {
    //      await   this.setState({Id:this.props.match.params.id}) ;
    //      this.getNoteDetails();
    //     }

    //   }

  

    handlechangeall = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount = async () => {
        await this.setState({ Id: this.props.match.params.id });
        this.getNoteDetails();

        // var today = new Date();
        // let day = today.getDate(); /** day of current date */
        // let month = today.getMonth();/** month of current date */
        // let year = today.getFullYear();/** year of current date */
        // let hour = today.getHours();
        // let minute = today.getMinutes();
        // let sec = today.getSeconds();
        // today = today.toString();
        // console.log("Today", +day + "-" + month + "-" + year + " " + hour + "-" + minute + "-" + sec);
        // console.log("Todays", today);

        // console.log("Today dates n time", today.slice(4, 10) + "," + today.slice(11, 15) + ", " + today.slice(16, 24));

        // var dates = today.slice(4, 10) + "," + today.slice(11, 15) + ", " + today.slice(16, 24)
        // this.setState({ currentDateTime: dates })


        // let reminderDate; /** common variable for collecting reminder time */
    }

    getNoteDetails = async () => {
        console.log("In function");

        userService.getNoteDetails(this.state.Id).then(res => {
            console.log("Response in Get note details--->", res);

            console.log("Only data--->", res.data.data.data[0].title);
            this.setState({ title: res.data.data.data[0].title })
            this.setState({ description: res.data.data.data[0].description })
            this.setState({ answer: res.data.data.data[0].questionAndAnswerNotes })

            this.setState({ que: this.state.answer[0] })
            console.log("Que is", this.state.que);

        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }

    viewHide = async () => {



        await this.setState({ view: !this.state.view })
        console.log("State of view", this.state.view);




        var arr = []
        arr = this.state.answer.slice(1, this.state.answer.length)
        console.log("Spliced array", arr);
        await this.setState({ answer: arr })


        var array = this.state.answer.filter(res =>
            (res.isApproved === true)
        )

        console.log("Array of que and ans", this.state.answer);
        this.setState({ answer: array })

        console.log("Array of filtered que and ans", this.state.answer);

    }

    handleClose = () => {
        this.props.history.push('/dashboard/notes')
    }

    submit = () => {

        this.setState({ submit: !this.state.submit })

        var data = {
            message: this.state.question,
            notesId: this.state.Id
        }
        userService.askQuestion(data).then(res => {
            console.log("Response in ask question--->", res);

            // this.setState({submit:!this.state.submit})


        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }

    handleLike = (id) => {

        var data = {
            "like": true,
            "parentId": id
        }

        userService.Like(data).then(res => {
            console.log("Response in ask question--->", res);



        })
            .catch(err => {
                console.log("Error in get all notes");
            })
        this.setState({ like: this.state.like + 1 })
    }

    render() {

        var image = 'http://fundoonotes.incubation.bridgelabz.com/' + localStorage.getItem('imageUrl');


        console.log("In ask question");
        console.log("Id in ask que", this.props.match.params.id);



        return (

            <div >
                {
                    this.state.submit ?
                        <div className="askQue">
                            <div id="title">
                                <div>{this.state.title}</div>
                                <div><Button onClick={this.handleClose}>close</Button></div>
                            </div>
                            <div id="title">
                                {this.state.description}
                            </div>
                            <Divider style={{ marginTop: "2%" }} />
                            <div id="titles">
                                Asked Questions
                    </div>

                            <div id="profName">
                                <div><IconButton onClick={this.handleProfileClick}>
                                    <img src={image} alt="Logo" id="profile" />
                                </IconButton></div>
                                <div style={{ margin: "2%" }}>{localStorage.getItem('firstName') + " " + localStorage.getItem('lastName')}</div>
                                <div style={{ marginTop: "2%" }}>{this.state.que.createdDate.slice(0, 10) + " " + this.state.que.createdDate.slice(11, 19)}</div>
                                <ReplyIcon style={{ margin: "1.5%" }} />
                                <div style={{ marginTop: "2%" }}>{this.state.like}</div>
                                <ThumbUpIcon style={{ margin: "1.5%" }} onClick={() => this.handleLike(this.state.que.id)} />
                            </div>
                            <div id="profName">
                                <ArrowRightIcon fontSize="large" />
                                <div style={{ fontWeight: "bold", color: "blue", fontSize: "x-large" }}>{this.state.que.message}</div>
                            </div>

                            {this.state.view ?
                                <div id="que" onClick={this.viewHide}>
                                    <div><KeyboardArrowUpIcon /></div>
                                    <div>Hide Reply</div>
                                </div>
                                :
                                <div id="que" onClick={this.viewHide}>

                                    <div><ExpandMoreIcon /></div>
                                    <div>View Reply</div>
                                </div>
                            }

                            {this.state.view === true ? this.state.answer.map((keys) => {

                                console.log("In map", keys.message);

                                return (
                                    <div>
                                        <div id="profName">
                                            <div><IconButton>
                                                <img src={image} alt="Logo" id="profile" />
                                            </IconButton></div>
                                            <div style={{ margin: "2%" }}>{localStorage.getItem('firstName') + " " + localStorage.getItem('lastName')}</div>
                                            <div style={{ marginTop: "2%" }}>{keys.createdDate.slice(0, 10) + " " + keys.createdDate.slice(11, 19)}</div>
                                            <ReplyIcon style={{ margin: "1.5%" }} />
                                            <div style={{ marginTop: "2%" }}>{this.state.like}</div>
                                            <ThumbUpIcon style={{ margin: "1.5%" }} onClick={() => this.handleLike(keys.id)} />
                                        </div>
                                        <div id="profName">
                                            <ArrowRightIcon fontSize="large" />
                                            <div dangerouslySetInnerHTML={{ __html: keys.message }}></div>
                                            {/* <div style={{ color: "grey", fontSize: "large" }}>{this.state.onlyMessage[index]}</div> */}

                                        </div>
                                    </div>

                                )


                            })
                                : null}

                            {/* {this.state.view === true ? this.state.onlyMessage.map(msg => {
                                
                                console.log("In map1", msg);

                                return (
                                    <div>
                                        
                                        <div id="profName">
                                            <ArrowRightIcon fontSize="large" />
                                            <div style={{ color: "grey", fontSize: "large" }}>{msg}</div>
                                            
                                        </div>
                                    </div>

                                )


                            }) 
                            : null} */}

                            {/* {ansMap} */}
                        </div>

                        :

                        <div className="askQue">
                            <div id="title">
                                <div>{this.state.title}</div>
                                <div><Button onClick={this.handleClose}>close</Button></div>
                            </div>
                            <div id="title">
                                {this.state.description}
                            </div>
                            <Divider style={{ marginTop: "2%" }} />
                            <div id="titles">
                                Ask a Question
                    </div>
                            <div style={{ display: "flex" }}>
                                Make sure what you’re asking is unique, concise, and phrased like a question.
                    </div>


                            <Input
                                id="ask"
                                placeholder='Type something...'
                                margin="normal"
                                multiline={true}
                                name="question"
                                value={this.state.question}
                                onChange={this.handlechangeall}
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />




                            <div id="que">
                                <Button style={{ backgroundColor: "#fa7e36" }} onClick={this.submit}>Submit-Question</Button>
                            </div>

                            {this.state.view ?
                                <div id="que" onClick={this.viewHide}>
                                    <div><KeyboardArrowUpIcon /></div>
                                    <div>Hide Reply</div>
                                </div>

                                :
                                <div id="que" onClick={this.viewHide}>
                                    <div><ExpandMoreIcon /></div>
                                    <div>View Reply</div>
                                </div>

                            }

                        </div>

                }

            </div >

            // <IconButton>
            //     <img src={require('../Assets/image.svg')} alt="Logo" />
            // </IconButton>



        )
    }
}
export default AskQuestion