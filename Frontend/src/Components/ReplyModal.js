import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink
} from "reactstrap";
import { replyATweet } from '../JS/Actions/tweetAction.js';
import { getUserName, getUserFullName } from "./tweetApis.js";
import $ from 'jquery';
const settings = require("../Config/settings.js");
const { processTweetText } = require('./tweetApis.js');
class ReplyModalInner extends Component {
  state = {
    currentTweet: '',
    replyText: ''
  }
  constructor(props) {
    super(props);
    //this.state.currentTweet = this.props.currentTweet;
    this.changeHandler = this.changeHandler.bind(this);
    this.replyClickHandler = this.replyClickHandler.bind(this);
  }
  replyClickHandler() {
    let tweetId = this.props.currentTweet._id;
    let { replyText } = this.state;
    //let userId = "123";
    let username = getUserName();
    let userFullName = getUserFullName();
    let data = { tweetId, replyText, username, userFullName };
    let postURL = 'http://' + settings.hostname + ':' + settings.port + '/replyATweet';
    let dataObj = { data, url: postURL };
    this.props.replyATweet(dataObj);
    this.setState({
      'replyText': ''
    });
    window.$('#replyModal').modal('hide');
  }
  changeHandler(evt) {
    let target = evt.target;
    let replyText = target.value;
    this.setState({
      replyText
    });
  }
  render() {
    if (!this.props.currentTweet) {
      return <div></div>
    }
    let { tweetText, username, userFullName } = this.props.currentTweet;
    return (
      <div className='modal fade' id='replyModal'>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title"></h4>
              <br />
              <button type="button" className="close" data-dismiss="modal">
                &times;
                  </button>
            </div>

            <div className="modal-body">

              <div className="tweet-container">
                <div className="tweet-body">
                  <Card >
                    <CardBody>
                      <CardTitle style={{ fontWeight: "bolder" }}>{userFullName}<span style={{ color: "grey", fontWeight: "normal" }}> @{username}</span></CardTitle>
                      {/* <CardSubtitle>Card subtitle</CardSubtitle>
                        
                        {<img width="100%" src="/assets/318x180.svg" alt="Card image cap" />}
                        */}
                      {processTweetText(tweetText)}
                      <br /><br />
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div>
                <br /><p className='grey'>replying to @{username}</p>
              </div>
              <div>
                <textarea id="tweetArea" className="form-control" rows="4" onChange={(evt) => this.changeHandler(evt)} style={{ borderColor: "white", fontSize: "21px" }} placeholder="Tweet Your Reply" autoFocus value={this.state.replyText}></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary btn-circle" type="submit" onClick={(evt) => this.replyClickHandler(evt)} style={{ position: 'absolute', right: '60px', fontWeight: "bold" }}>Reply</button><br /><br /><br />
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
//export default SignupBuyer;
const mapDispatchToProps = function (dispatch) {
  return {
    replyATweet: (currentTweet) => dispatch(replyATweet(currentTweet))
  }
}
let ReplyModal = connect(mapStateToProps, mapDispatchToProps)(ReplyModalInner);

export default ReplyModal;