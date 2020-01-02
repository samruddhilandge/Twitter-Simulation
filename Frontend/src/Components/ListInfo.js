import React, { Component, useState } from "react";
import { Row, Col, Modal, Form, Image, Button } from "react-bootstrap";
import { Input } from "reactstrap";
import "../CSS/navbar.css";
import "../CSS/List.css";
import LeftNav from "./LeftNav";
import RightNav from "./RighNav";
import axios from "axios";
import { hostAddress, port } from "../Constants/index";
import { Redirect } from "react-router";
const settings = require("../Config/settings.js");

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
  }
};
class ListInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listname: "",
      description: "",
      members: [],
      tags: ["alaukika"],
      suggestions: [],
      subscribers: [],
      goBackFlag: false,
      modalType: "",
      isModalOpen: false,
      changeFlag: false,
      memberSearch: "",
      addMemberList: []
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentWillMount() {}

  inputChangeHandler = e => {
    console.log("Hiiii");

    this.setState({
      [e.target.name]: e.target.value,
      changeFlag: true
    });
  };

  handleShowMember = () => {
    const data = {
      listID: this.props.location.state.list._id
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
          modalType: "member",
          isModalOpen: true,
          members: this.state.members.concat(response.data)
        });
      });
  };
  handleShowSubscriber = () => {
    const data = {
      listID: this.props.location.state.list._id
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
          modalType: "subscriber",
          isModalOpen: true,
          subscribers: this.state.subscribers.concat(response.data)
        });
      });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false,
      modalType: "",
      subscribers: [],
      members: [],
      addMemberList: []
    });
  };

  saveList = e => {
    if (this.state.changeFlag) {
      const data = {
        listID: this.props.location.state.list._id,
        listname: this.state.listname,
        description: this.state.description
      };
      console.log(data);
      console.log(this.props.location.state.list);
      //set the with credentials to true

      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post(
          "http://" + hostAddress + ":" + port + "/updateList/updateList",
          data,
          config
        )
        .then(response => {
          console.log("Hello Subsc Data received:", response.data);
          this.setState({
            modalType: "",
            isModalOpen: false,
            goBackFlag: true,
            changeFlag: false
          });
        });
    }
  };

  handleAddMember = e => {
    this.setState({
      modalType: "addMember",
      isModalOpen: true
    });
  };

  deleteList = e => {
    const data = {
      listID: this.props.location.state.list._id
    };
    console.log(data);
    console.log(this.props.location.state.list);
    //set the with credentials to true

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/deleteList/deleteList",
        data,
        config
      )
      .then(response => {
        console.log("Hello delete Data received:", response.data);
        this.setState({
          modalType: "",
          isModalOpen: false,
          goBackFlag: true,
          changeFlag: false
        });
      });
  };

  goToBack = e => {
    this.setState({
      goBackFlag: true
    });
  };

  removeMemberFromList = value => {
    const data = {
      memberID: value,
      listID: this.props.location.state.list._id
    };
    console.log("Data for remove member from list", data);

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/removeMember/removeMember",
        data,
        config
      )
      .then(response => {
        console.log("Hello add member Data received:", response.data);
        this.goToBack();
      });
  };

  removeMember = value1 => {
    console.log(value1);

    var t = this.state.addMemberList.filter(
      value => value.username != value1.username
    );
    console.log(t);
    this.setState({
      addMemberList: t
    });
  };

  addMembersToList = () => {
    var t2 = new Set();
    this.state.addMemberList.map(item => {
      t2.add(item.username);
    });

    var t1 = [...t2];
    console.log(t1);
    const data = {
      members: t1,
      listID: this.props.location.state.list._id
    };
    console.log(data);

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/addMember/addMember",
        data,
        config
      )
      .then(response => {
        console.log("Hello add member Data received:", response.data);
        this.goToBack();
      });
  };

  searchMember = () => {
    const data = {
      username: this.state.memberSearch
    };
    console.log(data);
    console.log(this.props.location.state.list);
    //set the with credentials to true
    if (this.state.memberSearch != "") {
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post(
          "http://" + hostAddress + ":" + port + "/findMember/findMember",
          data,
          config
        )
        .then(response => {
          console.log("Hello find member Data received:", response.data);

          var obj;
          if (response.data[0] == null) {
            obj = null;
          } else {
            obj = {
              firstName: response.data[0].firstName,
              lastName: response.data[0].lastName,
              username: response.data[0].username,
              img: response.data[0].profilePicture
            };
          }
          console.log(this.state.addMemberList);

          var t = this.state.addMemberList.concat(obj);
          console.log("Hello find member Data received:", obj);
          this.setState({
            addMemberList: t
          });
        });
    }
  };
  addDefaultSrc = event => {
    console.log("error");
    event.target.onError = null;
    event.target.src = settings.s3bucket +"profileAlias.jpeg";
  };

  render() {
    let showbutton = null;
    if (!this.state.changeFlag) {
      showbutton = (
        <button onClick={this.saveList.bind(this)} disabled class="savebutton">
          {" "}
          <b>Save</b>
        </button>
      );
    } else {
      showbutton = (
        <button onClick={this.saveList.bind(this)} class="savebutton">
          {" "}
          <b>Save</b>
        </button>
      );
    }

    let modalTitle = "";
    let modalContent = null;
    let display2 = [];
    if (this.state.modalType == "subscriber") {
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
          display2.push(
            <div style={{ borderColor: "#808080" }}>
              <Image
                src={profileImg}
                // src="https://i.pinimg.com/280x280_RS/7b/8d/fe/7b8dfea729e9ff134515fef97cf646df.jpg"
                style={{
                  height: "48px",
                  width: "48px",
                  margin: "8px"
                }}
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
        display2.push(
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
    } else if (this.state.modalType == "member") {
      modalTitle = "List Members";

      if (this.state.members.length != 0) {
        modalContent = this.state.members.map(listItem => {
          let removeButtonShow = null;
          if (
            this.props.location.state.list.creatorID ==
            localStorage.getItem("username")
          ) {
            // if (this.props.location.state.list.creatorID == "alaukika") {
            console.log("I am here");
            removeButtonShow = (
              <button
                class="removeButton"
                onClick={this.removeMemberFromList.bind(
                  this,
                  listItem.username
                )}
              >
                <b>Remove</b>
              </button>
            );
          }
         // let profileImg = settings.s3bucket + "profileAlias.jpeg";
          let userLink = "/userDetailsPage/" + listItem.username;
          let profileImg = settings.s3bucket + listItem.profilePicture;
          // if (
          //   listItem.profilePicture != "profileAlias.jpeg" &&
          //   listItem.profilePicture != null
          // )
          //   profileImg = settings.s3bucket + listItem.profilePicture;

          display2.push(
            <div style={{ borderColor: "#808080" }}>
              <Image
                src={profileImg}
                // src="https://i.pinimg.com/280x280_RS/7b/8d/fe/7b8dfea729e9ff134515fef97cf646df.jpg"
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
              <span style={{ fontSize: "14px" }}>{removeButtonShow}</span>
            </div>
          );
        });
      } else {
        display2.push(
          <div>
            <div style={{ fontSize: "20px", textAlign: "center" }}>
              <b> There isn't anyone in this list</b>
            </div>
            <p style={{ textAlign: "center" }}>
              When people are added, they'll show up here.
            </p>
          </div>
        );
      }
    } else if (this.state.modalType == "addMember") {
      modalTitle = "Add Members";

      let memberDetails = [];
      console.log("bleh:", this.state.addMemberList);
      if (this.state.addMemberList != "") {
        this.state.addMemberList.map(listItem => {
          console.log("Hello:", listItem);
          let profileImg = settings.s3bucket + listItem.profilePicture;
          // let profileImg = settings.s3bucket + "profileAlias.jpg";

          // if (
          //   listItem.profilePicture != "profileAlias.jpg" &&
          //   listItem.profilePicture != null
          // )
          //   profileImg = settings.s3bucket + listItem.profilePicture;

          memberDetails.push(
            <span>
              <button
                class="tagbutton"
                name={listItem.username}
                onClick={this.removeMember.bind(this, listItem)}
              >
                <Image
                  src={profileImg}
                  //src="https://i.pinimg.com/280x280_RS/7b/8d/fe/7b8dfea729e9ff134515fef97cf646df.jpg"
                  style={{
                    height: "20px",
                    width: "20px",
                    margin: "4px"
                  }}
                  roundedCircle
                  alt=""
                ></Image>

                <span>
                  <b style={{ fontSize: "12px", marginRight: "3px" }}>
                    {listItem.firstName}
                  </b>
                </span>
                <span>
                  <b style={{ fontSize: "12px", marginRight: "2px" }}>
                    {listItem.lastName}
                  </b>
                </span>

                <span
                  style={{ fontSize: "14px", marginTop: "2%", float: "right" }}
                >
                  <i class="far fa-times-circle"></i>
                </span>
              </button>
            </span>
          );
        });
      }

      display2.push(
        <div>
          <Form>
            <Form.Row>
              <Col class="col-10">
                <Input
                  className="ip2 inputList wideinput"
                  onChange={this.inputChangeHandler}
                  name="memberSearch"
                  onChange={this.inputChangeHandler.bind(this)}
                  placeholder="Enter username"
                />
              </Col>
              <Col class="col-2">
                <i
                  class="fas fa-search levelClass"
                  onClick={this.searchMember.bind(this)}
                ></i>
                {/* <Button  className="fas fa-search" onClick={this.searchMember.bind(this)}>
              
            </Button> */}
              </Col>
            </Form.Row>
          </Form>
          <div>
            <ul>{memberDetails}</ul>
          </div>
          <div>
            <br></br>
            <br></br>

            <br></br>
            <br></br>
          </div>
          <button class="savebutton" onClick={this.addMembersToList}>
            <b> Add</b>
          </button>
        </div>
      );
    }

    let redirec = null;
    if (this.state.goBackFlag) {
      var temp="/List/"+localStorage.getItem('username')+""
      redirec = <Redirect to={temp} />;
    }
    let display = null;
    // if(this.state.listCreatorID==localStorage.getItem(username))
    // if (false) {
    display = (
      <div>
        <div style={{ marginTop: "2%" }}>
          <span>
            <i className="fas fa-arrow-left" onClick={this.goToBack}></i>
          </span>
          <span
            style={{ paddingTop: "2%", marginLeft: "7%", fontSize: "23px" }}
          >
            <b>List Info</b>
          </span>
          <span>{showbutton}</span>
        </div>

        <hr></hr>
        <Form>
          <Input
            className="ip2 inputList"
            onChange={this.inputChangeHandler}
            name="listname"
            onChange={this.inputChangeHandler.bind(this)}
            placeholder={this.props.location.state.list.listname}
          />

          <div style={{ padding: "4%" }}></div>
          {/* <InputGroup className="ip2"> */}

          <Input
            className="ip2 inputList"
            onChange={this.inputChangeHandler}
            name="description"
            placeholder={this.props.location.state.list.description}
            onChange={this.inputChangeHandler.bind(this)}
          />
        </Form>
        <br></br>
        <hr style={{ weight: "50px" }}></hr>
        <span style={{ paddingTop: "2%", fontSize: "23px" }}>
          <b>People</b>
        </span>
        <hr></hr>

        <div>
          <button className="listbutton" onClick={this.handleShowMember}>
            {" "}
            <span>Members</span>
            <span style={{ float: "right" }}>
              <b>{this.props.location.state.list.memberID.length}</b>
            </span>
          </button>
          <button className="listbutton" onClick={this.handleShowSubscriber}>
            {" "}
            <span>Subscribers</span>
            {console.log(this.props.location.state.list)}
            <span style={{ float: "right" }}>
              <b>{this.props.location.state.list.subscriberID.length}</b>
            </span>
          </button>
        </div>
        <button className="listbutton1" onClick={this.handleAddMember}>
          {" "}
          <b>Add Member</b>
        </button>
        <hr></hr>
        <button className="listbutton2" onClick={this.deleteList.bind(this)}>
          {" "}
          <b>Delete List</b>
        </button>
      </div>
    );

    // const { tags, suggestions } = this.state;
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

    return (
      <div>
        <Row>
          <Col className="col-sm-3">
            <LeftNav links={links} history={this.props.history}></LeftNav>
          </Col>
          <Col className="col-sm-6">
            {display}
            {redirec}
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
            {display2}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ListInfo;
