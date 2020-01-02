/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable lines-between-class-members */
/* eslint-disable prefer-template */
/* eslint-disable react/no-unused-state */
/* eslint-disable indent */
/* eslint-disable spaced-comment */
import React, { Component } from "react";
import { Row, Col, Button } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import config from './../Config/settings'
import axios from 'axios';
import RepliesTweets from './UserProfile/RepliesTweets';
import LikesTweets from './UserProfile/LikesTweets';
import MyUserTweets from './UserProfile/MyUserTweets';
import '../CSS/List.css'
import { TabProvider, Tab, Tabs, TabPanel, TabList } from "react-web-tabs";
//import Tabs from 'react-bootstrap/Tabs'
//mport Tab from 'react-bootstrap/Tab'
import { Link } from "react-router-dom";
import coverImage from "../Components/UserProfile/CoverPhoto.jpg"
import RightNav from "./RighNav";
//eslint-disable-next-line
class UserDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            userProfile: {},
            topTweets: []
        }
    }

    componentWillMount() {
        if (localStorage.getItem('username')) {
            console.log(this.props.location.state)
            if (this.props.location.state === undefined) {

                let data = {
                    username: this.props && this.props.match.params.username ? this.props.match.params.username : ''
                }
                console.log(data)
                axios({
                    method: 'post',
                    url: 'http://' + config.hostname + ':3001/getProfileDetails',
                    data,
                    config: { headers: { 'Content-Type': 'application/json' } },
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                }).then(response => {
                    console.log(response.data.details.rows)
                    this.setState({ user: response.data.details.rows });
                })
                if (data.username === localStorage.getItem("username")) {
                    this.props.history.push("/profile/" + localStorage.getItem("username"))
                }
            } else {
                this.setState({ user: this.props.location.state.user })
                if (this.props.location.state.user.username === localStorage.getItem("username")) {
                    this.props.history.push("/profile/" + localStorage.getItem("username"))
                }
            }

            let data = {
                username: localStorage.getItem("username")
            }
            axios({
                method: 'post',
                url: 'http://' + config.hostname + ':3001/getProfileDetails',
                data,
                config: { headers: { 'Content-Type': 'application/json' } },
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            }).then(async response => {
                await this.setState({ userProfile: response.data.details.rows });
            })
        } else {
            this.props.history.push("/");
        }
        console.log(this.state.user)
    }

    back = () => {
        this.props.history.push("/Explore")
    }
    follow = () => {
        let data = {
            following: this.state.user.username,
            follower: this.state.userProfile.username
        }
        axios({
            method: 'put',
            url: 'http://' + config.hostname + ':3001/follow',
            data,
            config: { headers: { 'Content-Type': 'application/json' } },
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {
            console.log(response)
            let data = {
                username: localStorage.getItem("username")
            }
            axios({
                method: 'post',
                url: 'http://' + config.hostname + ':3001/getProfileDetails',
                data,
                config: { headers: { 'Content-Type': 'application/json' } },
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            }).then(async response => {
                await this.setState({ userProfile: response.data.details.rows });
            })
        })
    }

    unfollow = () => {
        let data = {
            following: this.state.user.username,
            follower: this.state.userProfile.username
        }
        axios({
            method: 'put',
            url: 'http://' + config.hostname + ':3001/unfollow',
            data,
            config: { headers: { 'Content-Type': 'application/json' } },
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {
            console.log(response)
            let data = {
                username: localStorage.getItem("username")
            }
            axios({
                method: 'post',
                url: 'http://' + config.hostname + ':3001/getProfileDetails',
                data,
                config: { headers: { 'Content-Type': 'application/json' } },
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            }).then(async response => {
                await this.setState({ userProfile: response.data.details.rows });
            })
        })
    }

    addDefaultSrc = (event) => {
        console.log("error")
        event.target.onError = null;
        event.target.src = `https://${config.imageurl}/profileAlias.jpeg`
    }

    lists = () => {
        this.props.history.push("/List/" + this.state.user.username)
    }
    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home" },
            { label: 'Explore', link: '/explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },
            { label: 'Bookmarks', link: '/Bookmarks', className: "fas fa-bookmark" },
            { label: 'Lists', link: '/List/' + localStorage.getItem('username'), className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/' + localStorage.getItem('username'), className: "fas fa-user-circle" },
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" }
        ];

        let followerCount = this.state.user.followers !== undefined ? this.state.user.followers.length : 0
        let followingCount = this.state.user.following !== undefined ? this.state.user.following.length : 0
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} history={this.props.history}></LeftNav>

                    </Col>
                    <Col className="col-sm-5 pt-3">
                        <div>
                            <Row>
                                <Col className="col-sm-1" style={{
                                    textAlign: "center"
                                }}>
                                    <span className="fas fa-arrow-left active" onClick={this.back}></span>
                                </Col>
                                <Col className="col-sm-11">
                                    <h3>{this.state.user.firstName}</h3>
                                </Col>
                            </Row>


                            <hr />
                        </div>
                        <div>
                            <img className="coverImageStyle" src={coverImage} alt="twitterCoverPage" />
                            <Row>
                                <Col xs={6} md={4}>
                                    <Row>
                                        <img className="img-thumbnail" src={`https://${config.imageurl}/${this.state.user.profilePicture}`} onError={this.addDefaultSrc} />
                                    </Row>
                                </Col>

                                <Col xs={8} >
                                    {this.state.userProfile.following !== undefined && this.state.userProfile.following.includes(this.state.user.username) ? (
                                        <div>

                                            <Button variant="primary" className="followButton" label="Edit Profile" onClick={this.unfollow}></Button>
                                            <Button className="editButton" onClick={this.lists}>Lists</Button>
                                        </div>
                                    ) : (
                                            <div>

                                                <Button className="editButton" label="Edit Profile" onClick={this.follow}>Follow</Button>
                                                <Button className="editButton" onClick={this.lists}>Lists</Button>
                                            </div>

                                        )}

                                </Col>
                            </Row>
                            <div>
                                <h3>{this.state.user.firstName}</h3>
                                <p className="lightFont" style={{
                                    margin: "0px"
                                }}>@{this.state.user.username}</p>
                                <p style={{
                                    margin: "0px"
                                }}><b>Bio: </b><i>{this.state.user.description}</i></p>

                                <p style={{
                                    margin: "2px"
                                }}><b>Location: </b>{this.state.user.city}</p>
                                <Row>
                                    {/* <Col><p style={{
                                        marginRight: "5px",
                                        marginLeft: "5px"
                                    }}><b>{this.state.user.followers.length || 0}</b><b className="lightFont"> Followers</b></p></Col>

                                    <Col>
                                        <p><b>{this.state.user.following.length || 0}</b><b className="lightFont"> Following</b></p>
                                    </Col> */}
                                    <Col className="col-sm-3">
                                        <Link class="profiletag"
                                            style={{
                                                marginRight: "10px"
                                            }}
                                            to={{
                                                pathname: "/follow",
                                                state: {
                                                    following: this.state.user.following,
                                                    followers: this.state.user.followers,
                                                    showFollowers: true,
                                                    currentUsername: this.state.user.username
                                                }
                                            }}
                                        >
                                           <b> {followerCount} Followers</b>
                                    </Link>
                                    </Col>
                                    <Col className="col-sm-3">
                                        <Link class="profiletag"
                                            to={{
                                                pathname: "/follow",
                                                state: {
                                                    following: this.state.user.following,
                                                    followers: this.state.user.followers,
                                                    showFollowers: true,
                                                    currentUsername: this.state.user.username
                                                }
                                            }}
                                        >
                                           <b> {followingCount || 0} Following</b>
                                    </Link>
                                    </Col>
                                </Row>
                            </div>
                            <div>
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
                                        <MyUserTweets user={this.state.user.username} />
                                    </TabPanel>

                                    <TabPanel tabId="two">
                                        <RepliesTweets user={this.state.user.username} />
                                    </TabPanel>

                                    <TabPanel tabId="three">
                                        <LikesTweets user={this.state.user.username} />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
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

export default UserDetails;
