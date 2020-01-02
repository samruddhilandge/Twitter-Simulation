import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink
  } from "reactstrap";
const {processTweetText} = require('./tweetApis.js');
export class TweetBody extends Component{
    state = {
        tweetText : '',
        userName : '',
        userFullName : ''
    }
    constructor(props){
        super(props);
        this.state.tweetText = this.props.tweet ? this.props.tweet.tweetText : '';
        this.state.userFullName = this.props.tweet ? this.props.userFullName : '';
        this.state.userName = this.props.tweet ? this.props.userName : '';
    }
    render(){
        let userLinkUrl = '/profile/'+this.state.userName;
        let {tweetText, userFullName, userName} = this.state;
        return(
            <Card>
                <CardBody>
                    <Link to = {userLinkUrl}>
                        <CardTitle style={{fontWeight:"bolder"}}>{userFullName}<span style={{color:"grey",fontWeight:"normal"}}> @{userName}</span></CardTitle>
                    </Link>
                    {processTweetText(tweetText)}
                    <br/><br/>
                </CardBody>
            </Card>
        );
    }
    
}