import React, { Component, useState } from "react";
import "../CSS/navbar.css";
import "../CSS/List.css";
import axios from "axios";
import { hostAddress, port } from "../Constants/index";
import { Image } from "react-bootstrap";
import { Redirect } from "react-router";
const settings = require("../Config/settings.js");

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
  }
};

class SubscribedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showList: {},
      redirectflag: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick = value => {
    var x = this.state.list.filter(item => item._id == value);
    console.log(x);

    //display=(<Redirect to={{pathname:'./ListSpecific', state:{listID:x}}}/>)
    this.setState({
      showList: x,
      redirectflag: true
    });
  };

  componentWillMount() {
    const data = {
      userID:this.props.user
      // userID: localStorage.getItem("username")
      //userID: "alaukika"
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(
        "http://" +
          hostAddress +
          ":" +
          port +
          "/showSubscribedList/showSubscribedList",
        data,
        config
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          list: this.state.list.concat(response.data)
        });
      });
  }

  addDefaultSrc = event => {
    console.log("error");
    event.target.onError = null;
    event.target.src = settings.s3bucket + "profileAlias.jpeg";
  };

  render() {
    let redirectNav = null;
    if (this.state.redirectflag) {
      console.log("Hi i am here :", this.state.showList);
      //redirectNav=<Redirect to={{pathname:'/ListSpecific', state:{listID:this.state.showList}}}/>
      redirectNav = (
        <Redirect
          to={{
            pathname: "/ListSpecific",
            state: { list: this.state.showList }
          }}
        />
      );
      // redirectNav=<ListSpecific key='listspec' id={this.state.showList}/>
    }
    let display = [];
    let details;
    if (this.state.list.length != 0) {
      details = this.state.list.map(listItem => {
        // let profileImg=settings.s3bucket + "profileAlias.jpeg";

        // if(listItem.creatorImage!="profileAlias.jpeg" && listItem.creatorImage!=null )
        //     profileImg= settings.s3bucket + listItem.creatorImage;
        let profileImg = settings.s3bucket + listItem.creatorImage;

        display.push(
          <button
            name={listItem._id}
            onClick={this.handleButtonClick.bind(this, listItem._id)}
          >
            <div class="listButtonv4">
              <Image
                src={profileImg}
                //src="https://i.pinimg.com/280x280_RS/7b/8d/fe/7b8dfea729e9ff134515fef97cf646df.jpg"
                style={{
                  height: "30px",
                  width: "30px",
                  margin: "8px"
                }}
                onError={this.addDefaultSrc}
                roundedCircle
                alt=""
              ></Image>
              <b style={{ marginRight: "8px" }}>{listItem.creatorName}</b>@
              {listItem.creatorID}
              <div style={{ fontSize: "21px" }}>{listItem.listname}</div>
              <div style={{ color: "#808080", fontSize: "15px" }}>
                <b>{listItem.description}</b>
              </div>
              <div
                style={{ color: "#808080", fontSize: "15px", marginTop: "5px" }}
              >
                <b>
                  {" "}
                  <span style={{ margin: "0 0 0 0" }}>
                    {" "}
                    {listItem.memberID.length}{" "}
                  </span>
                  <span style={{ margin: "0 0 0 5px" }}>Members</span>
                  <span style={{ margin: "0 0 0 5px" }}>&#183;</span>
                  <span style={{ margin: "0 0 0 5px" }}>
                    {" "}
                    {listItem.subscriberID.length}
                  </span>
                  <span style={{ margin: "0 0 0 5px" }}> Subscribers</span>
                </b>
              </div>
            </div>
          </button>
        );
      });
    } else {
      display.push(
        <div>
          <h4
            style={{
              textAlign: "center",
              marginTop: "70px",
              marginBottom: "2px"
            }}
          >
            <b> You haven’t subscribed to any Lists yet</b>
          </h4>
          <h6 style={{ textAlign: "center", color: "#808080" }}>
            When you do, it’ll show up here.
          </h6>
        </div>
      );
    }
    return (
      <div>
        {redirectNav}
        {details}
        {display}
      </div>
    );
  }
}

export default SubscribedList;
