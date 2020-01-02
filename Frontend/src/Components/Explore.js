import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl, Accordion, Card, Image, Dropdown } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import config from './../Config/settings'
import axios from 'axios';
import RightNav from "./RighNav";
import ReplyModal from './ReplyModal';
import TweetModal from './TweetModal';
import TweetComponent from './TweetComponent.js';

class Explore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: "",
            allUsers: [],
            searchList: [],
            hashTagList: [],
            topTweets: []
        }
    }

    componentWillMount() {
        if (localStorage.getItem('username')) {
            axios({
                method: 'get',
                url: 'http://' + config.hostname + ':3001/allUsers',
            }).then(response => {
                console.log(response)
                this.setState({ allUsers: response.data.details.rows });
            })
            axios({
                method: 'get',
                url: 'http://' + config.hostname + ':3001/fetchViews',
                config: { headers: { 'Content-Type': 'application/json' } },
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            }).then(async response => {
                await this.setState({ topTweets: response.data.graphData });
            })
        } else {
            this.props.history.push("/");
        }
    }
    handleChange = (event) => {
        let list;
        if (event.target.value === "") {
            list = []
        } else {
            list = this.state.allUsers.filter(user =>
                user.username.includes(event.target.value))
        }
        this.setState({
            [event.target.name]: event.target.value,
            searchList: list
        })
    }

    handleSearch = (event) => {
        if (event.key === "Enter") {
            console.log(this.state.searchText)
            let tag = this.state.searchText.split("#")[1];
            console.log(tag)
            axios({
                method: 'get',
                url: 'http://' + config.hostname + ':3001/getTweetesWithHashTags/' + tag,
            }).then(response => {
                console.log(response)
                this.setState({ hashTagList: response.data });
            })
        }
    }

    addDefaultSrc = (event) => {
        console.log("error")
        event.target.onError = null;
        event.target.src = `https://${config.imageurl}/profileAlias.jpeg`
    }

    selectUser = (user) => (event) => {
        if (user.username === localStorage.getItem("username")) {
            this.props.history.push('/profile/' + localStorage.getItem('username'));
        } else {
            this.props.history.push({
                pathname: "/userDetailsPage/" + user.username,
                state: { user: user }
            });
        }

    }
    renderTweets() {
        let tweetsMarkup = [];
        if (this.state.hashTagList && this.state.hashTagList.length > 0) {
            let i = 0;
            for (i = 0; i < this.state.hashTagList.length; i++) {
                tweetsMarkup.push(<TweetComponent key={i} tweet={this.state.hashTagList[i]} />);
            }
            tweetsMarkup.push(<ReplyModal key={i + 1} />)
            tweetsMarkup.push(<TweetModal key={i + 2} />)
            return tweetsMarkup;
        } else {
            return <div></div>;
        }
    }

    renderTopTweets() {
        let tweetsMarkup = [];
        if (this.state.topTweets && this.state.topTweets.length > 0) {
            let i = 0;
            for (i = 0; i < this.state.topTweets.length; i++) {
                tweetsMarkup.push(<TweetComponent key={i} tweet={this.state.topTweets[i]} />);
            }
            tweetsMarkup.push(<ReplyModal key={i + 1} />)
            tweetsMarkup.push(<TweetModal key={i + 2} />)
            return tweetsMarkup;
        } else {
            return <div></div>;
        }
    }

    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home" },
            { label: 'Explore', link: '/explore', className: "fas fa-hashtag", active: true },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },
            { label: 'Bookmarks', link: '/Bookmarks', className: "fas fa-bookmark" },
            { label: 'Lists', link: '/List/' + localStorage.getItem('username'), className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/' + localStorage.getItem('username'), className: "fas fa-user-circle" },
            { label: 'Analytics', link: '/Analytics', className: "fas fa-poll" },
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" }
        ];

        let serachDisplay = this.state.searchList.map(user => {
            return (
                <Dropdown.Item eventKey={user.username} onClick={this.selectUser(user)}>
                    <div>
                        <Image src={`https://${config.imageurl}/${user.profilePicture}`} style={{
                            height: "40px",
                            width: "40px",
                            marginRight: "10px"
                        }} roundedCircle alt="" onError={this.addDefaultSrc}></Image>
                        <b>{user.firstName}</b>
                    </div>
                    <b className="padLeft lightFont" style={{
                        paddingLeft: "10px"
                    }}>@{user.username}</b>
                    <hr />
                </Dropdown.Item>
            )
        })
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} history={this.props.history}></LeftNav>

                    </Col>
                    <Col className="col-sm-5 pt-3">
                        <Dropdown className="btn-block" style={{ maxHeight: "28px" }}>
                            <Dropdown.Toggle as={InputGroup}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><i className="fas fa-search"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name="searchText"
                                    placeholder="Search Twitter"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleSearch}

                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>

                                {(this.state.searchText.startsWith('#')) ? (
                                    <div>
                                        <Card.Body style={{
                                            width: "400px"
                                        }}>
                                            Searching for #Tags
                                    </Card.Body>
                                    </div>
                                ) : (<div>{this.state.searchList.length > 0 ? (
                                    <Card.Body style={{
                                        maxHeight: "400px",
                                        width: "400px",
                                        overflowY: "auto"
                                    }}>
                                        {serachDisplay}
                                    </Card.Body>
                                ) : (<Card.Body style={{ width: "400px" }}>{this.state.searchText.length > 0 ? (
                                    <div>No users with search text</div>
                                ) : (
                                        <div>Try Searching for people and topics</div>
                                    )}</Card.Body>)}</div>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <hr />
                        <div>
                            {(this.state.searchText.startsWith('#') && this.state.hashTagList.length === 0) ? (
                                <div>
                                    There are no tweets with {this.state.searchText}
                                </div>
                            ) : (<div>
                                <h3>Today's Top Tweets</h3>
                                {this.renderTopTweets()}
                            </div>)}
                        </div>
                        {this.renderTweets()}
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

export default Explore;