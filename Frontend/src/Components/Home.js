import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import RightNav from './RighNav'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";

import TweetContent from "./TweetContent";

class Home extends Component {
    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },

            { label: 'Bookmarks', link: '/Bookmarks', className: "fas fa-bookmark" },
            { label: 'Lists', link: '/List/' + localStorage.getItem('username'), className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/' + localStorage.getItem('username'), className: "fas fa-user-circle" },
            {label: 'Analytics', link: '/Analytics', className: "fas fa-poll" } ,
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" }

            // { label: 'More', link: '#home', className: "fas fas fa-ellipsis-h" }
        ];
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} history={this.props.history}></LeftNav>
                    </Col>
                    <Col className="col-sm-5 homeComponent">
                        <h5 className='homeHeading' style={{ fontWeight: "bolder" }}>Home</h5>
                        <TweetContent />
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

export default Home;