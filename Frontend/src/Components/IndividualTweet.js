import React, { Component } from "react";
import TweetComponent from './TweetComponent';
import { connect } from 'react-redux';
import {getTweetDetails} from '../JS/Actions/tweetAction.js';
import { Row, Col, Image } from 'react-bootstrap';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink
} from "reactstrap";
import UserListModal from './UserListModal';
import ReplyModal from './ReplyModal';
import TweetModal from './TweetModal';

const settings = require("../Config/settings.js");

class IndividualTweetInner extends Component {
    componentDidMount() {
        console.log(this.props);
        let data = { tweetId: this.props.tweetId };
        let getURL = 'http://' + settings.hostname + ':' + settings.port + '/getTweetDetails';
        let url = getURL;
        let dataObj = {
            data,
            url
        };
        this.props.getTweetDetails(dataObj);
    }
    state = {

    }
    constructor(props) {
        super(props);
        console.log("props...");
        console.log(props);
    }

    render() {
        if (!this.props.currentTweet) {
            return <div></div>;
        } else {
            let likesNum = this.props.currentTweet.likes.length;
            let retweetsNum = this.props.currentTweet.retweets.length;
            let { replies, likes, retweets } = this.props.currentTweet;
            return (
                <div>
                    <TweetComponent tweet={this.props.currentTweet} />
                    <ReplyModal />
                    <TweetModal />
                    <Card>
                        <Row className='likeRetweetCount'>
                            &nbsp;  &nbsp; 
                            <div className = 'col-xs-2'> 
                                <CardLink href='#' data-toggle='modal' data-target='#likesModal'><span> {likesNum} </span> Likes</CardLink> 
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                            <div className = 'col-xs-2'> 
                                <CardLink href='#' data-toggle='modal' data-target='#retweetsModal'> <span> {retweetsNum} </span>Retweets</CardLink> 
                            </div>
                        </Row>
                    </Card>
                    <ReplyList replies={replies} />
                    <UserListModal modalId='likesModal' allUsers={likes}></UserListModal>
                    <UserListModal modalId='retweetsModal' allUsers={retweets}></UserListModal>
                </div>
            );
        }
    }
}

class ReplyList extends Component {
    render() {
        debugger;
        let allReplies = this.props.replies;
        let repliesMarkup = [];
        if (allReplies && allReplies.length > 0) {
            let i = 0;
            for (i = 0; i < allReplies.length; i++) {
                repliesMarkup.push(<ReplyComponent key={i} reply={allReplies[i]} />);
            }
            return repliesMarkup;
        } else {
            return <div></div>;
        }
    }

}

class ReplyComponent extends Component{
// <img src = {profileImg} style={{width:'100%'}}/>
    render(){
        let {profilePic, userFullName, username, replyText} = this.props.reply;
        let profileImg = settings.s3bucket + profilePic;
        let userLinkUrl = '/profile/' + username;
        return (
            <Card>
            <CardBody>
                <Row>
                <Col xs={2}>
                    <Image  src={profileImg}
                        style={{
                        height: "100px",
                        width: "100px",
                        margin: "8px"
                        }}
                        roundedCircle
                        alt=""
                        ></Image>
                    
                </Col>
                <Col xs= {10}>
                    <a href = {userLinkUrl}>
                        <CardTitle style={{fontWeight:"bolder"}}>{userFullName}<span style={{color:"grey",fontWeight:"normal"}}> @{username}</span></CardTitle>
                    </a>
                    {replyText}
                    <br/><br/>
                    
                </Col>
                </Row>
            </CardBody>

            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentTweet: state.tweetReducer.currentTweet
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getTweetDetails: (dataObj) => dispatch(getTweetDetails(dataObj))
    }
}
let IndividualTweet = connect(mapStateToProps, mapDispatchToProps)(IndividualTweetInner);
export default IndividualTweet;