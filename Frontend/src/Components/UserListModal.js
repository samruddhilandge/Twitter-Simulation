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
const settings = require("../Config/settings.js");

export class UserListModal extends Component{
    render(){
        let {allUsers, modalId} = this.props;
        if(!allUsers){
            return <div></div>;
        } else {
            let usersListMarkup = [];
            if(allUsers && allUsers.length > 0){
                for( let i= 0; i< allUsers.length; i++){
                 usersListMarkup.push(<UserComponent key={i} user= { allUsers[i] }/>);
                }
                return (
                    <div className='modal fade' id={modalId}>
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
                               {usersListMarkup}
                            </div>
                        </div>
                        </div>
                    </div>
                );
            } else {
                return <div></div>;
            }
        }
        
    }
}

class UserComponent extends Component{
    //<img src = {profileImg} style={{width:'100%'}}/>
    render(){
        if(!this.props.user){
            return <div></div>;
        } else {
            let {profilePic, userFullName, username} = this.props.user;
            let profileImg = settings.s3bucket + profilePic;
            let userLinkUrl = '/profile/'+username;
            return(
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
                    </Col>
                    </Row>
                </CardBody>
            </Card>
            );
        }
    }
}

export default UserListModal;