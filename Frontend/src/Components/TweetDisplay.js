import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import IndividualTweet from "./IndividualTweet";
import RightNav from "./RighNav";

class TweetDisplay extends Component {
    state = {
        tweetId: ''
    }
    constructor(props) {
        super(props);
        console.log(props);
        this.state.tweetId = this.props && this.props.match.params.tweetId ? this.props.match.params.tweetId : '';
    }
    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },
            { label: 'Bookmarks', link: '/Bookmarks', className: "fas fa-bookmark" },
            { label: 'Lists', link: '/List/' + localStorage.getItem('username'), className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/' + localStorage.getItem('username'), className: "fas fa-user-circle" },
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" }
        ];
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} history={this.props.history}></LeftNav>

                    </Col>
                    <Col className="col-sm-6 tweetComponent">
                        <h5 style={{ fontWeight: "bolder" }} className="tweetHeading ">Tweet</h5>
                        <IndividualTweet tweetId={this.state.tweetId} />
                    </Col>
                    <Col className="col-sm-4 navbar-side-right">
                        <div className="col-sm-10">
                            <RightNav></RightNav>
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default TweetDisplay;