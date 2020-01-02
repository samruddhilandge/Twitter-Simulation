import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink
} from "reactstrap";
import { connect } from 'react-redux';
import { retweetWithComment } from '../JS/Actions/tweetAction.js';
const settings = require("../Config/settings.js");
const { processTweetText } = require('./tweetApis.js');
class TweetModalInner extends Component {
  state = {
    tweetComment: ''
  }

  constructor(props) {
    super(props);
  }
  retweetWithComment(actualTweetId) {
    debugger;
    let { tweetComment } = this.state;
    let curruserName = 'user3';
    let userId = "1000";
    let data = {
      userId,
      actualTweetId,
      tweetText: tweetComment
    };
    let postURL = "http://" + settings.hostname + ":" + settings.port + "/retweetWithComment";
    let dataObj = { data, url: postURL };
    this.props.retweetWithComment(dataObj);
  }

  changeHandler(evt) {
    let target = evt.target;
    let tweetComment = target.value;
    this.setState({
      tweetComment
    });
  }

  render() {
    if (!this.props.currentTweet) {
      return <div></div>
    }

    let tweetId = this.props.currentTweet._id;
    let { tweetText, userName, userId, userFullName } = this.props.currentTweet;
    return (

      <div class="modal fade" id="tweetModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Retweet with a comment</h4>
              <br />
              <button type="button" className="close" data-dismiss="modal">
                &times;
                  </button>
            </div>

            <div class="modal-body">
              <div>
                <textarea id="tweetArea" className="form-control" rows="4" onChange={(evt) => this.changeHandler(evt)} style={{ borderColor: "white", fontSize: "21px" }} placeholder="Add a comment" autoFocus></textarea>
              </div>
              <div class="tweet-container">
                <div class="tweet-body">
                  <Card >
                    <CardBody>
                      <CardTitle style={{ fontWeight: "bolder" }}>{userFullName}<span style={{ color: "grey", fontWeight: "normal" }}> @{userName}</span></CardTitle>
                      {/* <CardSubtitle>Card subtitle</CardSubtitle>
                        
                        {<img width="100%" src="/assets/318x180.svg" alt="Card image cap" />}
                        */}
                      {processTweetText(tweetText)}
                      <br /><br />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <i id="image" style={{ position: 'absolute', left: '60px' }} class="far fa-image fa-2x"></i>
              <button className="btn btn-primary btn-circle" type="submit" onClick={() => this.retweetWithComment(tweetId)} style={{ position: 'absolute', right: '60px', fontWeight: "bold" }}>Retweet</button><br /><br /><br />
            </div>

          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentTweet: state.tweetReducer.currentTweet
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    retweetWithComment: (currentTweet) => dispatch(retweetWithComment(currentTweet)),
  }
}
let TweetModal = connect(mapStateToProps, mapDispatchToProps)(TweetModalInner);

export default TweetModal;