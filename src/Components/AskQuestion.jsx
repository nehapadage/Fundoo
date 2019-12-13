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
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { array, element } from 'prop-types';
import FroalaEditor from 'react-froala-wysiwyg';
import { show } from '../Actions/Action'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import StarRatings from 'react-star-ratings';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

class AskQuestion extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        // this.handleModelChange = this.handleModelChange.bind(this);

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
            onlyMessage: [],
            ask: false,
            reply: false,
            flag: false,
            reply1: false,
            quelikes: [],
            LIKES: 0,
            showLike: '',
            count: 0,
            rating: 0,
            liked: 0
            // star_rating:0
            // currentId: ""

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

    handleModelChange = (event) => {
        console.log("Event in handleModelChange", event);
        this.setState({ question: event })
        console.log("Content is", this.state.question);
        // this.setState({que:this.state.question})
        //     console.log("Que is", this.state.que);

    }

    // changeRating=()=>{
    //     console.log("");

    // }

    componentDidMount = async () => {
        await this.setState({ Id: this.props.match.params.id });
        await this.getNoteDetails();

        // this.count();



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

        userService.getNoteDetails(this.state.Id).then(async (res) => {
            console.log("Response in Get note details--->", res);

            console.log("Only data--->", res.data.data.data[0].title);
            this.setState({ title: res.data.data.data[0].title })
            this.setState({ description: res.data.data.data[0].description })
            this.setState({ answer: res.data.data.data[0].questionAndAnswerNotes })

            await this.setState({ que: this.state.answer[0] })
            await this.setState({ quelikes: this.state.answer[0].like })



            var count = this.state.answer[0].rate.map(res => {
                return (
                    res.rate
                )
            })

            console.log("Question rates are", count[0]);
            if (count[0] > 0) {
                this.setState({ rating: count[0] })
            } else {
                this.setState({ rating: 0 })
            }

            // console.log("rated ques count ", this.state.rating);


            var count1 = this.state.answer[0].like.map(res => {
                return (
                    res.like === true
                )
            })

            console.log("Question likes are", count1[0]);

            if (count1[0] === true) {
                this.setState({ liked: count1.length })
            }
            else {
                this.setState({ liked: 0 })
            }

            console.log("liked ques count ", this.state.liked);





            // this.count();



            if (this.state.answer.length) {
                this.setState({ submit: true })
            } else {
                this.setState({ submit: false })
            }


            var arr = []
            arr = this.state.answer.slice(1, this.state.answer.length)
            console.log("Spliced array", arr);
            this.setState({ answer: arr })


            var array = this.state.answer.filter(res =>
                (res.isApproved === true)
            )

            console.log("Array of que and ans", this.state.answer);
            this.setState({ answer: array })

            console.log("Array of filtered que and ans", this.state.answer);

            this.count1();


            //     console.log("Que is", this.state.que);

        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }

    viewHide = async () => {



        await this.setState({ view: !this.state.view })
        console.log("State of view", this.state.view);




        // var arr = []
        // arr = this.state.answer.slice(1, this.state.answer.length)
        // console.log("Spliced array", arr);
        // await this.setState({ answer: arr })


        // var array = this.state.answer.filter(res =>
        //     (res.isApproved === true)
        // )

        // console.log("Array of que and ans", this.state.answer);
        // this.setState({ answer: array })

        // console.log("Array of filtered que and ans", this.state.answer);

    }

    handleClose = () => {
        this.props.history.push('/dashboard/notes')
    }

    handleClose1 = () => {
        this.setState({ flag: !this.state.flag })
    }

    submit = () => {

        // this.setState({ submit: !this.state.submit })

        var data = {
            message: this.state.question,
            notesId: this.state.Id
        }
        userService.askQuestion(data).then(async (res) => {
            console.log("Response in ask question--->", res);

            await this.setState({ que: res.data.data.details })

            //    console.log("State of ask",this.state.ask);


            //   await this.props.show(this.state.ask)

            this.setState({ submit: !this.state.submit })


        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }

    submit1 = (id) => {

        // this.setState({ submit: !this.state.submit })

        var data = {
            "message": this.state.question,
            "id": id
        }
        userService.reply(data).then(async (res) => {
            console.log("Response in reply question--->", res);

            // await this.setState({ que: res.data.data.details })

            //    console.log("State of ask",this.state.ask);


            //   await this.props.show(this.state.ask)

            this.setState({ reply: !this.state.reply })
            this.setState({ flag: !this.state.flag })
            this.setState({ view: !this.state.view })


        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }



    handleLike = async (para, key) => {

        console.log("Like status", key);

        //   await  this.setState({like:key.like.length})

        //   console.log("After setting value of like",this.state.like);



        var data = {
            "like": true,
            "id": key.id
        }

        userService.Like(data).then(async(res) => {
            console.log("Response in like question--->", res);

            console.log("Only data of like", res.config.data);
            var ans = JSON.parse(res.config.data)
            console.log("Like status", ans.like);

            this.setState({ liked: 1 })

            console.log("Likes are", this.state.liked);

          await  this.setState({ [para]: key.id })

            // key.like[0].like = ans.like;

            // console.log("Like status stored",key.like[0].like);
            




        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }


    handleLikeAns = async (para,key) => {

        console.log("Like status", key);

        if(key.like.length>0){
            key.like[0].like=true
        }
        

        var data = {
            "like": true,
            "id": key.id
        }

        userService.Like(data).then(res => {
            console.log("Response in like question--->", res);

            console.log("Only data of like", res.config.data);
            var ans = JSON.parse(res.config.data)
            console.log("Like status", ans.like);

            // this.setState({ liked: 1 })

            // console.log("Likes are", this.state.liked);

            key.like[0].like = ans.like;

            console.log("Like status stored in like ans",key.like[0].like);

            this.setState({[para]:key.id})

        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }

    handleUnLikeAns = async (para,key) => {

        console.log("Like status", key);

        //   await  this.setState({like:key.like.length})

        //   console.log("After setting value of like",this.state.like);

        key.like[0].like=false

        var data = {
            "like": false,
            "id": key.id
        }

        userService.Like(data).then(res => {
            console.log("Response in like question--->", res);

            console.log("Only data of like", res.config.data);
            var ans = JSON.parse(res.config.data)
            console.log("Like status", ans.like);

            // this.setState({ liked: 1 })

            // console.log("Likes are", this.state.liked);

            key.like[0].like = ans.like;
           

            console.log("Like status stored in unlike ans",key.like[0].like);

            this.setState({[para]:" "})



            // if (this.state.LIKES === 0) {
            //     this.setState({ LIKES: 1 })
            // }
            // else {
            //     this.setState({ LIKES: 0 })
            // }

            // this.setState({ showLike: !this.state.showLike })

            // this.setState({ [para]: key.id })



        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }




    handleUnLike = async (para, key) => {

        console.log("Like status", key);

        var data = {
            "like": false,
            "id": key.id
        }

        userService.Like(data).then(res => {
            console.log("Response in unlike question--->", res);

            console.log("Only data of unlike", res.config.data);
            var ans = JSON.parse(res.config.data)
            console.log("Like status", ans.like);

            this.setState({ liked: 0 })

            console.log("unLikes are", this.state.liked);
           

           


        })
            .catch(err => {
                console.log("Error in get all notes");
            })

    }

    reply = () => {
        this.setState({ reply: !this.state.reply })
        this.setState({ question: "" })
    }

    reply1 = async (para, id) => {
        this.setState({ [para]: id })
        this.setState({ question: "" })
        // this.setState({ [para]: "" })
        // this.setState({reply1:!this.state.reply1})
    }

    close = () => {
        this.setState({ reply: !this.state.reply })
    }
    close1 = () => {
        this.setState({ currentId: "" })
        // this.setState({ reply1: !this.state.reply1 })
    }
    close2 = () => {
        this.setState({ currentId1: "" })
        // this.setState({ reply1: !this.state.reply1 })
    }
    close3 = () => {
        this.setState({ currentId2: "" })
        // this.setState({ reply1: !this.state.reply1 })
    }

    count = async () => {


        console.log("In like count question", this.state.quelikes);

        var likes = this.state.quelikes.filter(res => {
            return (
                res.like === true
            )
        })

        console.log("Likes in count", likes);

        await this.setState({ LIKES: likes.length })

        console.log("LIKES are", this.state.LIKES);


        // return likes
    }

    count1 = () => {
        console.log("In count1", this.state.answer);

        var anslikes = this.state.answer.map(res => {

            return res.like.filter((lik) => {
                if (lik.like === true && res.userId === lik.userId) {
                    var liked = true
                }
                if (res.like.like) {
                    this.setState({ count: this.state.count + 1 })
                }
            })

        })

        console.log("Count is", this.state.count);


 
    }

    changeRating = async (newRating, id) => {
        console.log("In ans change rating", newRating);
        console.log("id" + id);
        // console.log("Parameter", para);

        // await this.setState({ rating: newRating })

        // console.log("In change rating1", this.state.rating);


        var data = {
            "id": id,
            "rate": newRating
        }
        userService.Rate(data).then(res => {
            console.log("Response in rating question--->", res);

            console.log("Only rate", res.config.data);
            var ans = JSON.parse(res.config.data)
            console.log("Answer", ans.rate);

            this.setState({ rating: ans.rate })

            // console.log("Ratings are", this.state.);
            // this.setState({ showLike: !this.state.showLike })

            // this.setState({ [para]: id })
        })
            .catch(err => {
                console.log("Error in rate");
            })

    }

    changeRatingAns = async (newRating, para, paraValue, id, key) => {
        console.log("In ans change rating", newRating);
        // console.log("key is ", key.rate[0].rate);
       
        console.log("Parameter", para);

        // await this.setState({ rating: newRating })

        // console.log("In change rating1", this.state.rating);


        var data = {
            "id": id,
            "rate": newRating
        }
        userService.Rate(data).then(async(res) => {
            console.log("Response in rating question--->", res);

            console.log("Only rate", res.config.data);
            var ans =await JSON.parse(res.config.data)
            console.log("Answer", ans.rate);

           await this.setState({ [paraValue]: ans.rate })

            // console.log("Ratings are", this.state.);
            // this.setState({ showLike: !this.state.showLike })

            key.rate[0].rate = ans.rate;

            // this.setState({ [para]: id })
        })
            .catch(err => {
                console.log("Error in rate");
            })

    }
    getLikeCount=(arr)=>{
        console.log("like is working",arr);
        var sum=0;
        var array=arr.map(res=>(
            res.like===true
        ))
        console.log("Array of true likes",array[0]);
        if(array[0]===true){
            sum++;
        }
        console.log("Sum is",sum);
        
        
        return sum;
    }


    // handleStar = (event, id) => {
    //     // event.preventDefault();
    //     console.log("In handle star", id);

    // }

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
                                <ReplyIcon style={{ margin: "1.5%" }} onClick={() => this.reply(this.state.que.id)} />
                                {this.state.que.like.length === undefined ?
                                    <div style={{ marginTop: "2%" }}>{0}</div> :
                                    <div style={{ marginTop: "2%" }}>{this.state.liked}</div>}
                                {/* {this.state.showLike !== this.state.que.id ? */}
                                {this.state.liked === 0 ?
                                    <ThumbUpAltOutlinedIcon style={{ margin: "1.5%" }} onClick={() => this.handleLike("showLike", this.state.que)} /> :
                                    <ThumbUpIcon size="large" style={{ margin: "1.5%" }} onClick={() => this.handleUnLike("showLike", this.state.que)} />}
                            </div>
                            <div id="profName">
                                <ArrowRightIcon fontSize="large" />
                                <div style={{ fontWeight: "bold", color: "black", fontSize: "x-large", marginTop: "-20px" }}
                                    dangerouslySetInnerHTML={{ __html: this.state.que.message }}></div>

                                <div id="starRatings">
                                    <StarRatings
                                        style={{ fontSize: "small" }}
                                        rating={this.state.rating}
                                        starRatedColor="orange"
                                        changeRating={(event) => this.changeRating(event, this.state.que.id)}
                                        // onClick={(event)=>this.handleStar( event,'hell')}
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension='20px'
                                    // starSpacing='5px'
                                    // starWidthAndHeight='10px'

                                    />

                                </div>

                                <div style={{ margin: "1%" }}>{this.state.rating}</div>
                                {/* <div style={{ fontWeight: "bold", color: "blue", fontSize: "x-large" }}>{this.state.que.message}</div> */}
                            </div>



                            {this.state.reply === true ?
                                <div>
                                    <div style={{ marginLeft: "5%", cursor: "default", marginTop: "1%", fontWeight: "700", marginLeft: "-94%" }} onClick={this.close}>Close</div>
                                    <div style={{ marginTop: "2%" }}>
                                        <FroalaEditor
                                            tag='textarea'
                                            config={this.config}
                                            model={this.state.question}
                                            onModelChange={this.handleModelChange}
                                        />
                                    </div>
                                    <div id="que" style={{ marginTop: "2%" }}>
                                        <Button style={{ backgroundColor: "#fa7e36" }} onClick={() => this.submit1(this.state.que.id)}>Submit-Answer</Button>
                                    </div></div> : null}



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

                                console.log("Inside map",keys.like.length);

                                return (

                                    <div>
                                        {this.state.que.id === keys.parentId ?

                                            <div style={{ marginLeft: "2%" }}>
                                                <div id="profName">
                                                    <div><IconButton>
                                                        <img src={image} alt="Logo" id="profile" />
                                                    </IconButton></div>
                                                    <div style={{ margin: "2%" }}>{localStorage.getItem('firstName') + " " + localStorage.getItem('lastName')}</div>
                                                    <div style={{ marginTop: "2%" }}>{keys.createdDate.slice(0, 10) + " " + keys.createdDate.slice(11, 19)}</div>
                                                    <ReplyIcon style={{ margin: "1.5%" }} onClick={() => this.reply1("currentId", keys.id)} />
                                                    <div style={{ marginTop: "2%" }}>{keys.like.length > 0 ? this.getLikeCount(keys.like) :0 }</div>
                                                    {/* <ThumbUpIcon style={{ margin: "1.5%" }} onClick={() => this.handleLike(keye)} /> */}
                                                    {this.state.key1===keys.id || (keys.like.length>0 && keys.like[0].like===true)? 
                                                     <ThumbUpIcon size="large" style={{ margin: "1.5%" }} onClick={() => this.handleUnLikeAns("key1",keys)} />

                                                    : <ThumbUpAltOutlinedIcon style={{ margin: "1.5%" }} onClick={() => this.handleLikeAns("key1",keys)} /> }

                                                        <div id="starRatings">

                                                        <StarRatings
                                                            style={{ fontSize: "small" }}
                                                            rating={keys.rate.length > 0 ? keys.rate[0].rate : 0}
                                                            starRatedColor="orange"
                                                            changeRating={(event) => this.changeRatingAns(event, "showRate1", "showRateValue1", keys.id, keys)}
                                                            // onClick={(event)=>this.handleStar( event,'hell')}
                                                            numberOfStars={5}
                                                            name='rating'
                                                            starDimension='20px'
                                                        // starSpacing='5px'
                                                        // starWidthAndHeight='10px'

                                                        />

                                                    </div>
                                                    <div style={{ margin: "1%" }}>{keys.rate.length > 0 ? keys.rate[0].rate : 0}</div>

                                                
                                                </div>
                                                <div id="profName1">
                                                    <ArrowRightIcon fontSize="large" />
                                                    <div id="data"
                                                        dangerouslySetInnerHTML={{ __html: keys.message }}></div>
                                                    {/* <div style={{ color: "grey", fontSize: "large" }}>{this.state.onlyMessage[index]}</div> */}

                                                </div>

                                                {this.state.currentId === keys.id ?
                                                    <div>
                                                        <div style={{ marginLeft: "5%", cursor: "default", marginTop: "1%", fontWeight: "700", marginLeft: "-94%" }} onClick={this.close1}>Close</div>
                                                        <div style={{ marginTop: "2%" }}>
                                                            <FroalaEditor
                                                                tag='textarea'
                                                                config={this.config}
                                                                model={this.state.question}
                                                                onModelChange={this.handleModelChange}
                                                            />
                                                        </div>
                                                        <div id="que" style={{ marginTop: "2%" }}>
                                                            <Button style={{ backgroundColor: "#fa7e36" }} onClick={() => this.submit1(keys.id)}>Submit-Answer</Button>
                                                        </div></div> : null}


                                                {this.state.view === true ? this.state.answer.map((key) => {

                                                    // console.log("Inside map", keys.parentId ,this.state.que.id);

                                                    return (

                                                        <div>
                                                            {keys.id === key.parentId ?

                                                                <div style={{ marginLeft: "2%" }}>
                                                                    <div id="profName">
                                                                        <div><IconButton>
                                                                            <img src={image} alt="Logo" id="profile" />
                                                                        </IconButton></div>
                                                                        <div style={{ margin: "2%" }}>{localStorage.getItem('firstName') + " " + localStorage.getItem('lastName')}</div>
                                                                        <div style={{ marginTop: "2%" }}>{key.createdDate.slice(0, 10) + " " + key.createdDate.slice(11, 19)}</div>
                                                                        <ReplyIcon style={{ margin: "1.5%" }} onClick={() => this.reply1("currentId1", key.id)} />
                                                                        <div style={{ marginTop: "2%" }}>{key.like.length > 0 ? this.getLikeCount(key.like) : 0}</div>
                                                    {/* <ThumbUpIcon style={{ margin: "1.5%" }} onClick={() => this.handleLike(keye)} /> */}
                                                    {this.state.key2===key.id || (key.like.length>0 && key.like[0].like===true)? 
                                                     <ThumbUpIcon size="large" style={{ margin: "1.5%" }} onClick={() => this.handleUnLikeAns("key2",key)} />

                                                    : <ThumbUpAltOutlinedIcon style={{ margin: "1.5%" }} onClick={() => this.handleLikeAns("key2",key)} /> }
                                                                        <div id="starRatings">
                                                                            <StarRatings
                                                                                style={{ fontSize: "small" }}
                                                                                rating={key.rate.length > 0 ? key.rate[0].rate : 0}
                                                                                starRatedColor="orange"
                                                                                changeRating={(event) => this.changeRatingAns(event, "showRate2", "showRateValue2", key.id,key)}
                                                                                // onClick={(event)=>this.handleStar( event,'hell')}
                                                                                numberOfStars={5}
                                                                                name='rating'
                                                                                starDimension='20px'
                                                                            // starSpacing='5px'
                                                                            // starWidthAndHeight='10px'

                                                                            />

                                                                        </div>

                                                                        <div style={{ margin: "1%" }}>{key.rate.length > 0 ? key.rate[0].rate : 0}</div>
                                                                    </div>



                                                                    <div id="profName1">
                                                                        <ArrowRightIcon fontSize="large" />
                                                                        <div id="data"
                                                                            dangerouslySetInnerHTML={{ __html: key.message }}></div>
                                                                        {/* <div style={{ color: "grey", fontSize: "large" }}>{this.state.onlyMessage[index]}</div> */}

                                                                    </div>

                                                                    {this.state.currentId1 === key.id ?
                                                                        <div>
                                                                            <div style={{ marginLeft: "5%", cursor: "default", marginTop: "1%", fontWeight: "700", marginLeft: "-94%" }} onClick={this.close2}>Close</div>
                                                                            <div style={{ marginTop: "2%" }}>
                                                                                <FroalaEditor
                                                                                    tag='textarea'
                                                                                    config={this.config}
                                                                                    model={this.state.question}
                                                                                    onModelChange={this.handleModelChange}
                                                                                />
                                                                            </div>
                                                                            <div id="que" style={{ marginTop: "2%" }}>
                                                                                <Button style={{ backgroundColor: "#fa7e36" }} onClick={() => this.submit1(key.id)}>Submit-Answer</Button>
                                                                            </div></div> : null}


                                                                    {this.state.view === true ? this.state.answer.map((keye) => {

                                                                        // console.log("Inside map", keys.parentId ,this.state.que.id);

                                                                        return (

                                                                            <div>
                                                                                {key.id === keye.parentId ?

                                                                                    <div style={{ marginLeft: "2%" }}>
                                                                                        <div id="profName">
                                                                                            <div><IconButton>
                                                                                                <img src={image} alt="Logo" id="profile" />
                                                                                            </IconButton></div>
                                                                                            <div style={{ margin: "2%" }}>{localStorage.getItem('firstName') + " " + localStorage.getItem('lastName')}</div>
                                                                                            <div style={{ marginTop: "2%" }}>{keye.createdDate.slice(0, 10) + " " + keye.createdDate.slice(11, 19)}</div>
                                                                                            <ReplyIcon style={{ margin: "1.5%" }} onClick={() => this.reply1("currentId2", keye.id)} />
                                                                                            <div style={{ marginTop: "2%" }}>{keye.like.length > 0 ? this.getLikeCount(keye.like) : 0}</div>
                                                    {/* <ThumbUpIcon style={{ margin: "1.5%" }} onClick={() => this.handleLike(keye)} /> */}
                                                    {this.state.key3===keye.id || (keye.like.length>0 && keye.like[0].like===true)? 
                                                     <ThumbUpIcon size="large" style={{ margin: "1.5%" }} onClick={() => this.handleUnLikeAns("key3",keye)} />

                                                    : <ThumbUpAltOutlinedIcon style={{ margin: "1.5%" }} onClick={() => this.handleLikeAns("key3",keye)} /> }
                                                                                            <div id="starRatings">
                                                                                                <StarRatings
                                                                                                    style={{ fontSize: "small" }}
                                                                                                    rating={keye.rate.length > 0 ? keye.rate[0].rate : 0}
                                                                                                    starRatedColor="orange"
                                                                                                    changeRating={(event) => this.changeRatingAns(event, "showRate3", "showRateValue3", keye.id,keye)}
                                                                                                    // onClick={(event)=>this.handleStar( event,'hell')}
                                                                                                    numberOfStars={5}
                                                                                                    name='rating'
                                                                                                    starDimension='20px'
                                                                                                // starSpacing='5px'
                                                                                                // starWidthAndHeight='10px'

                                                                                                />

                                                                                            </div>

                                                                                            <div style={{ margin: "1%" }}>{keye.rate.length > 0 ? keye.rate[0].rate : 0}</div>

                                                                                        </div>
                                                                                        <div id="profName1">
                                                                                            <ArrowRightIcon fontSize="large" />
                                                                                            <div id="data"
                                                                                                dangerouslySetInnerHTML={{ __html: keye.message }}></div>
                                                                                            {/* <div style={{ color: "grey", fontSize: "large" }}>{this.state.onlyMessage[index]}</div> */}

                                                                                        </div>

                                                                                        {this.state.currentId2 === keye.id ?
                                                                                            <div>
                                                                                                <div style={{ marginLeft: "5%", cursor: "default", marginTop: "1%", fontWeight: "700", marginLeft: "-94%" }} onClick={this.close3}>Close</div>
                                                                                                <div style={{ marginTop: "2%" }}>
                                                                                                    <FroalaEditor
                                                                                                        tag='textarea'
                                                                                                        config={this.config}
                                                                                                        model={this.state.question}
                                                                                                        onModelChange={this.handleModelChange}
                                                                                                    />
                                                                                                </div>
                                                                                                <div id="que" style={{ marginTop: "2%" }}>
                                                                                                    <Button style={{ backgroundColor: "#fa7e36" }} onClick={() => this.submit1(keye.id)}>Submit-Answer</Button>
                                                                                                </div></div> : null}

                                                                                    </div>
                                                                                    : null}


                                                                            </div>



                                                                        )
                                                                    })

                                                                        : null}

                                                                </div>
                                                                : null}


                                                        </div>



                                                    )
                                                })

                                                    : null}

                                            </div>
                                            : null}


                                    </div>



                                )
                            })

                                : null}



                            <div>
                                <Snackbar

                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    open={this.state.flag}
                                    autoHideDuration={6000}
                                    onClose={this.handleClose1}

                                    message="Thank You for your answer"


                                />
                            </div>

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

                            <div style={{ marginTop: "2%" }}>
                                <FroalaEditor
                                    tag='textarea'
                                    config={this.config}

                                    model={this.state.question}
                                    onModelChange={this.handleModelChange}
                                />
                            </div>


                            {/* <Input
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
                            /> */}




                            <div id="que" style={{ marginTop: "2%" }}>
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
// const mapDispatchToProps =
//   {
// show    
//   }
export default AskQuestion