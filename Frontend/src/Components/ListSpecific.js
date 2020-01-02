import React, { Component, useState } from "react";
import { Row, Col, Modal, Image } from "react-bootstrap";
import "../CSS/navbar.css";
import "../CSS/List.css";
import LeftNav from "./LeftNav";
import RightNav from "./RighNav";
import axios from "axios";
import { hostAddress, port } from "../Constants/index";
import { Redirect } from "react-router";
import ListTweets from "./ListTweets";
const settings = require("../Config/settings.js");

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
  }
};

class ListSpecific extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goBackFlag: false,
      subscribers: [],
      infoShow: false,
      members: [],
      isModalOpen: false,
      isMember: false,
      goToListInfo: false,
      subscriberCount: this.props.location.state.list[0].subscriberID.length
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentDidMount() {
    console.log("Alaukika12");
    console.log(this.state.subscriberCount);
    console.log("Alaukika12");
  }
  handleEditClick = e => {
    this.setState({
      goToListInfo: true
    });
  };

  goToBack = e => {
    this.setState({
      goBackFlag: true
    });
  };
  handleShowMember = () => {
    const data = {
      listID: this.props.location.state.list[0]._id
    };
    console.log(data);
    console.log("blehelhe");
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/showMember/showMember",
        data,
        config
      )
      .then(response => {
        console.log("Hello Member Data received:", response.data);
        this.setState({
          isMember: true,
          isModalOpen: true,
          members: this.state.members.concat(response.data)
        });
      });
  };

  subscribeList = e => {
    const data = {
      listID: this.props.location.state.list[0]._id,
      userID: localStorage.getItem("username")
      //userID: "alaukika"
    };
    console.log(data);
    console.log(this.props.location.state.list);
    //set the with credentials to true

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/subscribeList/subscribeList",
        data,
        config
      )
      .then(response => {
        console.log("Hello Subsc Data received:", response.data);
        //alert("Yoo!")
        this.setState({
          goBackFlag: true
        });
      });
  };

  unsubscribeList = e => {
    const data = {
      listID: this.props.location.state.list[0]._id,
      userID: localStorage.getItem("username")
      //userID: "alaukika"
    };
    console.log(data);
    console.log(this.props.location.state.list);
    //set the with credentials to true

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" +
          hostAddress +
          ":" +
          port +
          "/unsubscribeList/unsubscribeList",
        data,
        config
      )
      .then(response => {
        console.log("Hello Subsc Data received:", response.data);
        this.setState({
          goBackFlag: true
        });
        //alert("Yoo!")
      });
  };
  addDefaultSrc = event => {
    console.log("error");
    event.target.onError = null;
    event.target.src = settings.s3bucket +"profileAlias.jpeg";
  };

  handleShowSubscriber = () => {
    const data = {
      listID: this.props.location.state.list[0]._id
    };
    console.log(data);
    console.log(this.props.location.state.list);
    //set the with credentials to true

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/showSubscriber/showSubscriber",
        data,
        config
      )
      .then(response => {
        console.log("Hello Subsc Data received:", response.data);
        this.setState({
          isMember: false,
          isModalOpen: true,
          subscribers: this.state.subscribers.concat(response.data)
        });
      });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false,
      isMember: false,
      subscribers: [],
      members: []
    });
  };

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    let modalTitle = "";
    let modalContent = null;
    let display = [];
    if (!this.state.isMember) {
      modalTitle = "List Subscribers";

      if (this.state.subscribers.length != 0) {
        modalContent = this.state.subscribers.map(listItem => {
          // let profileImg = settings.s3bucket + "profileAlias.jpeg";
          let userLink = "/userDetailsPage/" + listItem.username;
          // if (
          //   listItem.profilePicture != "profileAlias.jpeg" &&
          //   listItem.profilePicture != null
          // )
          //   profileImg = settings.s3bucket + listItem.profilePicture;

          let profileImg = settings.s3bucket + listItem.profilePicture;

          display.push(
            <div style={{ borderColor: "#808080" }}>
              <Image
                //src="https://i.pinimg.com/280x280_RS/7b/8d/fe/7b8dfea729e9ff134515fef97cf646df.jpg"
                src={profileImg}
                style={{
                  height: "48px",
                  width: "48px",
                  margin: "8px"
                }}
                onError={this.addDefaultSrc}
                roundedCircle
                alt=""
              ></Image>
              <a href={userLink}>
                <span>
                  <b style={{ fontSize: "16px", marginRight: "8px" }}>
                    {listItem.firstName}
                  </b>
                </span>
                <span>
                  <b style={{ fontSize: "16px", marginRight: "8px" }}>
                    {listItem.lastName}
                  </b>
                </span>
              </a>
              <span style={{ fontSize: "14px", color: "#808080" }}>
                <b>@{listItem.username}</b>
              </span>
            </div>
          );
        });
      } else {
        display.push(
          <div>
            <div style={{ fontSize: "20px", textAlign: "center" }}>
              <b>There aren't any subscribers of this list</b>
            </div>
            <p style={{ textAlign: "center" }}>
              When people subscribe, they'll show up here.
            </p>
          </div>
        );
      }
    } else {
      modalTitle = "List Members";

      if (this.state.members.length != 0) {
        modalContent = this.state.members.map(listItem => {
          // let profileImg = settings.s3bucket + "profileAlias.jpeg";
          let profileImg = settings.s3bucket + listItem.profilePicture;

          let userLink = "/userDetailsPage/" + listItem.username;
          // if (
          //   listItem.profilePicture != "profileAlias.jpeg" &&
          //   listItem.profilePicture != null
          // )
          //   profileImg = settings.s3bucket + listItem.profilePicture;

          display.push(
            <div style={{ borderColor: "#808080" }}>
              <Image
                //src="https://i.pinimg.com/280x280_RS/7b/8d/fe/7b8dfea729e9ff134515fef97cf646df.jpg"
                src={profileImg}
                style={{
                  height: "48px",
                  width: "48px",
                  margin: "8px"
                }}
                onError={this.addDefaultSrc}
                roundedCircle
                alt=""
              ></Image>
              <a href={userLink}>
                <span>
                  <b style={{ fontSize: "16px", marginRight: "8px" }}>
                    {listItem.firstName}
                  </b>
                </span>
                <span>
                  <b style={{ fontSize: "16px", marginRight: "8px" }}>
                    {listItem.lastName}
                  </b>
                </span>
              </a>
              <span style={{ fontSize: "14px", color: "#808080" }}>
                <b>@{listItem.username}</b>
              </span>
            </div>
          );
        });
      } else {
        display.push(
          <div>
            <div style={{ fontSize: "20px", textAlign: "center" }}>
              <b> There isn't anyone in this list</b>
            </div>
            <p style={{ textAlign: "center" }}>
              When people subscribe, they'll show up here.
            </p>
          </div>
        );
      }
    }

    let buttonShow = null;

    if (
      this.props.location.state.list[0].creatorID ==
      localStorage.getItem("username")
    ) {
      // if (this.props.location.state.list[0].creatorID == "alaukika") {
      buttonShow = (
        <button
          class="listSpecificButton"
          onClick={this.handleEditClick.bind(this)}
        >
          Edit List
        </button>
      );
    } else {
      var t = this.props.location.state.list[0].subscriberID.filter(
        id => id == localStorage.getItem("username")
      );
      console.log("Alaukika says:", t);
      // if(this.props.location.state.list[0].subscriberID.filter(id=>id==localStorage.getItem('username'))==null){
      if (t.length != 0) {
        buttonShow = (
          <button class="listSpecificButton" onClick={this.unsubscribeList}>
            Unsubscribe
          </button>
        );
      } else {
        buttonShow = (
          <button class="listSpecificButtonv2" onClick={this.subscribeList}>
            Subscribe
          </button>
        );
      }
    }

    let redirec = null;
    if (this.state.goBackFlag) {
      var temp="/List/"+localStorage.getItem('username')+""
      redirec = <Redirect to={temp} />;
    }
    if (this.state.goToListInfo) {
      redirec = (
        <Redirect
          to={{
            pathname: "/ListInfo",
            state: { list: this.props.location.state.list[0] }
          }}
        />
      );
    }

    let links = [
      { label: "Home", link: "/home", className: "fas fa-home", active: true },
      { label: "Explore", link: "/Explore", className: "fas fa-hashtag" },
      { label: "Notifications", link: "#home", className: "fas fa-bell" },
      { label: "Messages", link: "/Messages", className: "fas fa-envelope" },
      { label: "Bookmarks", link: "/Bookmarks", className: "fas fa-bookmark" },
      { label: "Lists", link: "/List/"+localStorage.getItem('username'), className: "fas fa-list-alt" },
      {
        label: "Profile",
        link: "/profile/" + localStorage.getItem("username"),
        className: "fas fa-user-circle"
      },
      { label: "Deactivate", link: "/deactivate", className: "fa fa-ban" },
      { label: "Delete", link: "/delete", className: "fa fa-trash-o" }
    ];
    let profileImg1 = settings.s3bucket + this.props.location.state.list[0].creatorImage;

    // let profileImg1 = settings.s3bucket + "profileAlias.jpeg";

    // if (
    //   this.props.location.state.list[0].creatorImage != "profileAlias.jpeg" &&
    //   this.props.location.state.list[0].creatorImage != null
    // )
    //   profileImg1 =
    //     settings.s3bucket + this.props.location.state.list[0].creatorImage;

    return (
      <div>
        <Row>
          <Col className="col-sm-3">
            <LeftNav links={links} history={this.props.history}></LeftNav>
          </Col>

          <Col className="col-sm-6">
            {redirec}
            <div>
              <div style={{ width: "100%", borderBottom: "solid black 2px" }}>
                <div style={{ fontSize: "18px", paddingTop: "2%" }}>
                  <i
                    style={{ colour: "blue", marginRight: "13px" }}
                    className="fas fa-arrow-left"
                    onClick={this.goToBack}
                  ></i>
                  <b>{this.props.location.state.list[0].listname}</b>
                </div>

                <div
                  style={{
                    color: "#808080",
                    fontSize: "14px",
                    marginLeft: "24px"
                  }}
                >
                  <b>@{this.props.location.state.list[0].creatorID}</b>
                </div>
              </div>
              <img
                style={{ width: "100%", height: "45%" }}
                src="https://pbs.twimg.com/media/EEDaJw0U4AADASA?format=jpg&name=medium"
              ></img>
              <div style={{ textAlign: "center" }}>
                <div>
                  <br></br>
                  <b>{this.props.location.state.list[0].listname}</b>
                </div>
                <div>
                  <br></br>
                  {this.props.location.state.list[0].description}
                  <br></br>
                  <br></br>
                </div>
                <div>
                  <span>
                    {" "}
                    <Image
                      // src="https://i.pinimg.com/280x280_RS/7b/8d/fe/7b8dfea729e9ff134515fef97cf646df.jpg"
                      src={profileImg1}
                      style={{
                        height: "30px",
                        width: "30px",
                        margin: "8px"
                      }}
                      onError={this.addDefaultSrc}
                      roundedCircle
                      alt=""
                    ></Image>
                  </span>
                  <span>
                    <b>{this.props.location.state.list[0].creatorName} </b>{" "}
                  </span>
                  <span style={{ color: "#808080" }}>
                    <b>@{this.props.location.state.list[0].creatorID}</b>{" "}
                  </span>
                </div>
                <div>
                  <button class="modalbutton" onClick={this.handleShowMember}>
                    <span style={{ margin: "10px" }}>
                      <b>{this.props.location.state.list[0].memberID.length}</b>
                    </span>
                    <span style={{ color: "#808080", margin: "10px 0 10px 0" }}>
                      <b>Members</b>
                    </span>
                  </button>

                  <button
                    class="modalbutton"
                    onClick={this.handleShowSubscriber}
                  >
                    <span style={{ margin: "10px" }}>
                      <b>
                        {this.props.location.state.list[0].subscriberID.length}
                      </b>
                    </span>
                    <span style={{ margin: "10px 0 10px 0", color: "#808080" }}>
                      <b>Subscribers</b>
                    </span>
                  </button>
                </div>
                {buttonShow}
                <hr></hr>
                <ListTweets listID={this.props.location.state.list[0]._id} />
              </div>
            </div>
          </Col>
          <Col
            className="col-sm-3"
            style={{
              borderLeft: "2px solid rgb(180, 177, 177)",
              height: "100vh"
            }}
          >
            <div className="" id="navbarSide">
              <RightNav></RightNav>
            </div>
          </Col>
        </Row>
        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent}
            {display}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ListSpecific;
