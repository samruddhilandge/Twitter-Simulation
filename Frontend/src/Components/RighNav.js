import React, { Component } from "react";
import "../CSS/navbar.css"
import { Button, Row, Col, Image } from 'react-bootstrap'
import config from '../Config/settings'
import axios from 'axios';


class RightNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allUsers: []
        }
    }
    componentWillMount() {
        let developers = ["kavya1", "keerthi", "anjali", "alaukika", "sam"]
        axios({
            method: 'get',
            url: 'http://' + config.hostname + ':3001/allUsers',
        }).then(response => {
            console.log(response)
            this.setState({
                allUsers: response.data.details.rows.filter(user => developers.includes(user.username))
            })
        })
    }

    addDefaultSrc = (event) => {
        console.log("error")
        event.target.onError = null;
        event.target.src = `https://${config.imageurl}/profileAlias.jpeg`
    }
    render() {
        let followList = this.state.allUsers.map(user => {
            return (
                <div>
                    <Row>
                        <Col className="col-sm-3">
                            <Image src={`https://${config.imageurl}/${user.profilePicture}`} style={{
                                height: "40px",
                                width: "40px",
                                marginRight: "10px"
                            }} roundedCircle alt="" onError={this.addDefaultSrc}></Image>
                        </Col>
                        <Col className="col-sm-6">
                            <Row>
                                <b>{user.firstName}</b>
                            </Row>
                            <Row>
                                <b className="padLeft lightFont" style={{
                                    paddingLeft: "10px"
                                }}>@{user.username}</b>
                            </Row>
                        </Col>
                        <Col className="col-sm-3">
                            <Button className="editButton" label="Edit Profile" onClick={this.follow}>Follow</Button>
                        </Col>
                    </Row>
                    <hr />
                </div>
            )
        })
        return (
            <div className="pt-5">
                <div className="rightNav">
                    <h4><b>Who to Follow</b></h4>
                    <hr />
                    {followList}
                    <div className="active">Show More</div>
                </div >
                <div className="pt-3" style={{
                    margin:"10px",
                    textAlign:"center",
                    fontSize: "12px"
                }}>
                    <Row>
                        <Col>
                            <p className="lightFont">Terms </p>
                        </Col>
                        <Col>
                            <p className="lightFont">Privacy policy </p>
                        </Col>
                        <Col>
                            <p className="lightFont">Cookies </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="lightFont"> Ads info </p>
                        </Col>
                        <Col>
                        <p className="lightFont"> Twitter Prototype Group12 SJSU </p>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default RightNav;