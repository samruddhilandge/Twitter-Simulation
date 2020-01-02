import React, { Component } from "react";
import {
  Row,
  Col
} from "react-bootstrap";
import "../CSS/navbar.css";
import "../CSS/List.css";
import LeftNav from "./LeftNav";
import BookmarkTweets from './BookmarkTweets';
import RightNav from "./RighNav";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

class BookmarkMain extends Component {
  constructor(props) {
    super(props);


  }
  componentWillMount() {
    if (!localStorage.getItem('username')) {
      this.props.history.push("/");
    }
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
      {label: 'Analytics', link: '/Analytics', className: "fas fa-poll" } ,
      { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
      { label: 'Delete', link: '/delete', className: "fa fa-trash-o" }

    ];


    return (
      <div>
        <Row>
          <Col className="col-sm-3 removePadding">
            <LeftNav links={links} history={this.props.history}></LeftNav>
          </Col>
          <Col className="col-sm-5">
            <BookmarkTweets />
          </Col>
          <Col className="col-sm-4 navbar-side-right">
            <div className="col-sm-10">
              <RightNav></RightNav>
            </div>

          </Col>
        </Row>
      </div >
    );
  }
}

export default BookmarkMain;
