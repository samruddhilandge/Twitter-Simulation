import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "./../../CSS/navbar.css";
import LeftNav from "../LeftNav";
import coverImage from "./CoverPhoto.jpg";
import "./../../CSS/ProfilePage.css";
import "./../../CSS/Signup.css";
import "../../CSS/List.css";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditProfileForm from "./EditProfileForm";
// import Tabs from "react-bootstrap/Tabs";
// import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
import RepliesTweets from './RepliesTweets';
import LikesTweets from './LikesTweets';
import MyUserTweets from './MyUserTweets';
import axios from "axios";
import { Redirect } from "react-router";
import config from "../../Config/settings.js";
import { TabProvider, Tab, Tabs, TabPanel, TabList } from "react-web-tabs";
import RightNav from "../RighNav";
const settings = require("../../Config/settings");

export class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            city: "",
            state: "",
            zipcode: "",
            userPassword: "",
            description: "",
            followers: [],
            following: [],
            profilePicture: "",
            isUser: true,
            updateDone: false,
            showEditButtonModal: false,
            thisButton: "Edit Profile",
            likes: [],
            tweets: "",
            redirectToFollowers: false,
            redirectToFollowing: false,
            reloadFlag:false
        };
        // this.updateProfile = this.updateProfile.bind(this);
        this.closeEditProfileModal = this.closeEditProfileModal.bind(this);
        this.saveEditProfileModal = this.saveEditProfileModal.bind(this);
        this.openEditProfileForm = this.openEditProfileForm.bind(this);
        // this.getLikes = this.getLikes.bind(this);
        // this.getTweets = this.getTweets.bind(this);
        this.followersClickHandler = this.followersClickHandler.bind(this);
        this.followingClickHandler = this.followingClickHandler.bind(this);
    }

    componentDidMount = () => {
        let username = localStorage.getItem("username");
        let currentUsername = this.props.match.params.username;
        console.log("Getting details of user: ");
        console.log(username);
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem("token");
        console.log(token);
        let data = {
            username: currentUsername
        };

        axios({
            method: "post",
            url: "http://" + config.hostname + ":3001/getProfileDetails",
            data
            // config: { headers: { 'Content-Type': 'application/json' } },
            // headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("response from DB: ");
                    console.log(response.data);
                    this.setState({
                        username: response.data.details.rows.username,
                        firstName: response.data.details.rows.firstName,
                        lastName: response.data.details.rows.lastName,
                        email: response.data.details.rows.email,
                        city: response.data.details.rows.city,
                        state: response.data.details.rows.state,
                        zipcode: response.data.details.rows.zipcode,
                        description: response.data.details.rows.description,
                        followers: response.data.details.rows.followers,
                        following: response.data.details.rows.following,
                        profilePicture:
                            settings.s3bucket + response.data.details.rows.profilePicture
                    });
                    // localStorage.setItem("username", response.data.info.username);
                    // localStorage.setItem("firstname", response.data.info.firstname);
                    localStorage.setItem(
                        "firstname",
                        response.data.details.rows.firstName
                    );
                    localStorage.setItem("lastname", response.data.details.rows.lastName);
                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }
            })
            .catch(error => {
                console.log(error);
            });

        axios.defaults.withCredentials = true;
        console.log(token);
        console.log("data variable");
        let tweetData = {
            currentUsername
        };

        console.log(data);
        // axios({
        //   method: "get",
        //   url: "http://" + config.hostname + ":3001/getTweets",
        //   tweetData,
        //   config: { headers: { "Content-Type": "application/json" } },
        //   headers: { Authorization: `Bearer ${token}` }
        // })
        //   .then(response => {
        //     if (response.status === 200) {
        //       console.log("response from DB: ");
        //       console.log(response.data);
        //     } else {
        //       console.log("Status Code: ", response.status);
        //       console.log(response.data.responseMessage);
        //     }
        //     this.setState({
        //       tweets: response.data.details.rows.tweets
        //     });
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });

        // console.log(data);
        // axios({
        //   method: "get",
        //   url: "http://" + config.hostname + ":3001/getLikes",
        //   data,
        //   config: { headers: { "Content-Type": "application/json" } },
        //   headers: { Authorization: `Bearer ${token}` }
        // })
        //   .then(response => {
        //     if (response.status === 200) {
        //       console.log("response from DB: ");
        //       console.log(response.data);
        //     } else {
        //       console.log("Status Code: ", response.status);
        //       console.log(response.data.responseMessage);
        //     }
        //     this.setState({
        //       likes: response.data.details.rows.likes
        //     });
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
    };

    followersClickHandler = e => {
        e.preventDefault();
        this.setState({
            redirectToFollowers: true
        });
    };

    followingClickHandler = e => {
        // e.preventDefault();
        console.log("Handling following click handler");
        this.setState({
            redirectToFollowing: true
        });
    };

    openEditProfileForm = () => {
        this.setState({
            showEditButtonModal: true
        });
    };

    closeEditProfileModal = () => {
        this.setState({
            showEditButtonModal: false
        });
    };

    saveEditProfileModal = profileDetails => {
        console.log("profileDetails");
        console.log(profileDetails);
        let username = localStorage.getItem("username");

        console.log("Getting details of user: ");
        console.log(username);
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem("token");
        console.log(token);
        console.log("data variable");
        let pic = profileDetails.profilePicture;
        console.log(pic);

        let form_data = new FormData();

        form_data.set("profileDetails", JSON.stringify(profileDetails));
        form_data.set("username", username);
        form_data.set("pic", pic);

        console.log(form_data);

        // console.log(data)
        axios({
            method: "post",
            url: "http://" + config.hostname + ":3001/updateProfile",
            data: form_data,
            config: { headers: { "Content-Type": "application/json" } },
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                debugger;
                if (response.status === 200) {
                    console.log("response from DB: ");
                    console.log(response.data);
                    this.setState({
                        username: response.data.responseMessage.data.username,
                        firstName: response.data.responseMessage.data.firstName,
                        lastName: response.data.responseMessage.data.lastName,
                        email: response.data.responseMessage.data.email,
                        city: response.data.responseMessage.data.city,
                        state: response.data.responseMessage.data.state,
                        zipcode: response.data.responseMessage.data.zipcode,
                        description: response.data.responseMessage.data.description,
                        followers: response.data.responseMessage.data.followers,
                        following: response.data.responseMessage.data.following,
                        profilePicture: response.data.responseMessage.data.profilePicture,
                        reloadFlag:true
                    });
                } else {
                    console.log("Status Code: ", response.status);
                    console.log(response.data.responseMessage);
                }
                // this.setState({
                //     username: response.data.details.rows.username,
                //     firstName: response.data.details.rows.firstName,
                //     lastName: response.data.details.rows.lastName,
                //     email: response.data.details.rows.email,
                //     city: response.data.details.rows.city,
                //     state: response.data.details.rows.state,
                //     zipcode: response.data.details.rows.zipcode,
                //     description: response.data.details.rows.description,
                //     followers: response.data.details.rows.followers,
                //     following: response.data.details.rows.following,
                //     profilePicture: response.data.details.rows.profilePicture,
                //     reloadFlag:true
                // });
            })
            .catch(error => {
                console.log(error);
            });
    };

    //   getLikes = () => {
    //     let currentUsername = this.props.match.params.username;
    //     console.log("getLikes");

    //     console.log("Getting details of user: ");
    //     console.log(currentUsername);
    //     axios.defaults.withCredentials = true;
    //     let token = localStorage.getItem("token");
    //     console.log(token);
    //     console.log("data variable");
    //     let data = {
    //       currentUsername
    //     };

    //     console.log(data);
    //     axios({
    //       method: "get",
    //       url: "http://" + config.hostname + ":3001/getLikes",
    //       data,
    //       config: { headers: { "Content-Type": "application/json" } },
    //       headers: { Authorization: `Bearer ${token}` }
    //     })
    //       .then(response => {
    //         if (response.status === 200) {
    //           console.log("response from DB: ");
    //           console.log(response.data);
    //         } else {
    //           console.log("Status Code: ", response.status);
    //           console.log(response.data.responseMessage);
    //         }
    //         this.setState({
    //           likes: response.data.details.rows.likes
    //         });
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   };

    //   getTweets = () => {
    //     let currentUsername = this.props.match.params.username;
    //     console.log("getTweets");

    //     console.log("Getting details of user: ");
    //     console.log(currentUsername);
    //     axios.defaults.withCredentials = true;
    //     let token = localStorage.getItem("token");
    //     console.log(token);
    //     console.log("data variable");
    //     let data = {
    //       currentUsername
    //     };

    //     console.log(data);
    //     axios({
    //       method: "get",
    //       url: "http://" + config.hostname + ":3001/getTweets",
    //       data,
    //       config: { headers: { "Content-Type": "application/json" } },
    //       headers: { Authorization: `Bearer ${token}` }
    //     })
    //       .then(response => {
    //         if (response.status === 200) {
    //           console.log("response from DB: ");
    //           console.log(response.data);
    //         } else {
    //           console.log("Status Code: ", response.status);
    //           console.log(response.data.responseMessage);
    //         }
    //         this.setState({
    //           tweets: response.data.details.rows.tweets
    //         });
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   };

    render() {
        let ReloadPage=null;
        if(this.state.reloadFlag){
        ReloadPage=window.location.reload();
        }
        let links = [
            { label: "Home", link: "/home", className: "fas fa-home", active: true },
            { label: "Explore", link: "/Explore", className: "fas fa-hashtag" },
            { label: "Notifications", link: "#home", className: "fas fa-bell" },
            { label: "Messages", link: "/Messages", className: "fas fa-envelope" },
            { label: "Bookmarks", link: "/Bookmarks", className: "fas fa-bookmark" },
            {
                label: "Lists",
                link: "/List/" + localStorage.getItem("username"),
                className: "fas fa-list-alt"
            },
            {
                label: "Profile",
                link: "/profile/" + localStorage.getItem("username"),
                className: "fas fa-user-circle"
            },
            {label: 'Analytics', link: '/Analytics', className: "fas fa-poll" } ,
            { label: "Deactivate", link: "/deactivate", className: "fa fa-ban" },
            { label: "Delete", link: "/delete", className: "fa fa-trash-o" }
        ];
        let currentUsername = this.props.match.params.username;
        if (this.state.redirectToFollowers) {
            console.log("Printing state information before redirecting");
            console.log(this.state);
            return (
                <Redirect
                    to={{
                        pathname: "/followers",
                        state: {
                            followers: this.state.followers,
                            showFollowers: true,
                            currentUsername: currentUsername
                        }
                    }}
                />
            );
        } else if (this.state.redirectToFollowing) {
            console.log("Printing state information before redirecting to following");
            console.log(this.state);
            return (
                <Link
                    to={{
                        pathname: "/following",
                        state: {
                            following: this.state.following,
                            currentUsername: currentUsername
                        }
                    }}
                />
            );
        }

        let EditProfileFormDOM = [];
        if (this.state.showEditButtonModal) {
            EditProfileFormDOM = (
                <EditProfileForm
                    onClose={this.closeEditProfileModal}
                    onSave={this.saveEditProfileModal}
                    profileInfo={this.state}
                />
            );
        }
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} history={this.props.history}></LeftNav>
                    </Col>
                    <Col className="col-sm-5">
                        <div style={{margin:"2% 2% 2% 0"}}>
                            {ReloadPage}
                           <h4><b><span>{this.state.firstName}</span>&nbsp;<span>{this.state.lastName}</span></b></h4> 
                            {/* <p>number of tweets</p> */}
                        </div>

                        <div>
                            <img
                                className="coverImageStyle"
                                src={coverImage}
                                alt="twitterCoverPage"
                            />
                            <Row>
                                <Col xs={6} md={4}>
                                    <Row>
                                        {/* <Image
                      src={this.state.profilePicture}
                      style={{
                        height: "100px",
                        width: "100px",
                        margin: "8px"
                      }}
                      roundedCircle
                      alt=""
                    //   onError={this.addDefaultSrc}
                    ></Image> */}

                                        <img
                                            className="img-thumbnail"
                                            src={this.state.profilePicture}
                                        />
                                    </Row>
                                    <row>{EditProfileFormDOM}</row>
                                </Col>
                                <Col xs={8}>
                                    <Button
                                        className="editButton"
                                        onClick={this.openEditProfileForm}
                                        label="Edit Profile"
                                    >
                                        {this.state.thisButton}
                                    </Button>
                                </Col>
                            </Row>
                            <div>
                                <p>@{this.state.username}</p>
                                <p>
                                    <b>Bio: </b>
                                    <i>{this.state.description}</i>
                                </p>

                                <p>
                                    <b>Location: </b>
                                    {this.state.city}
                                </p>
                                <Row>
                                    <Link
                                        class="profiletag"
                                        to={{
                                            pathname: "/follow",
                                            state: {
                                                following: this.state.following,
                                                followers: this.state.followers,
                                                showFollowers: true,
                                                currentUsername: currentUsername
                                            }
                                        }}
                                    >
                                        <b>{this.state.followers.length} Followers</b>
                                    </Link>
                                    <Link
                                        class="profiletag"
                                        to={{
                                            pathname: "/follow",
                                            state: {
                                                following: this.state.following,
                                                followers: this.state.followers,
                                                showFollowers: false,
                                                currentUsername: currentUsername
                                            }
                                        }}
                                    >
                                        <b>{this.state.following.length} Following</b>
                                    </Link>
                                </Row>
                            </div>
                            <div>
                                {/* <Tabs  defaultActiveKey="profile" id="profileTweets">
                  <Tab
                    className="profileTab"
                    onSelect={this.getTweets}
                    eventKey="tweets"
                    title="Tweets"
                    
                  >
                      <MyUserTweets user={this.props.match.params.username}/>
                   
                  </Tab>
                  <Tab
                    eventKey="replies"
                    title="Retweets & replies"
                    className="profileTab"
                  >
                      <RepliesTweets user={this.props.match.params.username}/>
                  </Tab>
                  <Tab
                    eventKey="likes"
                    title="Likes"
                    onSelect={this.getLikes}
                    className="profileTab"
                  >
                       <LikesTweets user={this.props.match.params.username}/>
                       
                  </Tab>
                </Tabs> */}
                                <Tabs
                                    defaultTab="one"
                                    class="removePadding"
                                    onChange={tabId => {
                                        console.log(tabId);
                                    }}
                                    style={{ margin: "0px", padding: "0px" }}
                                >
                                    <TabList>
                                        <Tab style={{ width: "33%" }} tabFor="one">
                                            Tweets
              </Tab>

                                        <Tab style={{ width: "33%" }} tabFor="two">
                                            Retweets
              </Tab>

                                        <Tab style={{ width: "33%" }} tabFor="three">
                                            Likes
              </Tab>
                                    </TabList>

                                    <TabPanel tabId="one">
                                        <MyUserTweets user={this.props.match.params.username} />
                                    </TabPanel>

                                    <TabPanel tabId="two">
                                        <RepliesTweets user={this.props.match.params.username} />
                                    </TabPanel>

                                    <TabPanel tabId="three">
                                        <LikesTweets user={this.props.match.params.username} />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>

                        <div></div>
                    </Col>
                    <Col className="col-sm-4 navbar-side-right">
                        <div className="col-sm-10">
                            <RightNav></RightNav>
                        </div>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserProfile;
