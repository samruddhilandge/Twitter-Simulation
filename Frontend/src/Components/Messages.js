import React, { Component } from "react";
import { Row, Col, InputGroup, FormControl, Image, Form, Modal, Button, FormLabel, Dropdown, Card, Accordion } from 'react-bootstrap'
import "../CSS/navbar.css"
import LeftNav from "./LeftNav";
import profile from "../Images/kavya.jpg"
import profileAlias from "../Images/profileAlias.jpeg"
import config from './../Config/settings'
import axios from 'axios';

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: "",
            newMessageFlag: false,
            userMessageList: [],
            messageSelected: false,
            currentMessage: "",
            currentMessager: "",
            userImage: "",
            otherUserImage: "",
            userProfile: {},
            message: "",
            allUsers: [],
            searchList: []
        }
    }

    componentWillMount() {
        if (localStorage.getItem('username')) {
            axios({
                method: 'get',
                url: 'http://' + config.hostname + ':3001/messages/getMessages/' + localStorage.getItem("username"),
            }).then(response => {
                console.log(response)
                this.setState({ userMessageList: response.data });
            })
            let data = {
                username: localStorage.getItem("username")
            }
            axios({
                method: 'post',
                url: 'http://' + config.hostname + ':3001/getProfileDetails',
                data,
                config: { headers: { 'Content-Type': 'application/json' } },
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            }).then(response => {
                console.log(response)
                this.setState({ userProfile: response.data.details.rows });
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangePeople = (event) => {
        let list;
        console.log(event.target.value)
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
        }
    }

    handleNewMessage = () => {
        this.setState({
            newMessageFlag: true
        })
        axios({
            method: 'get',
            url: 'http://' + config.hostname + ':3001/allUsers',
        }).then(response => {
            console.log(response)
            this.setState({ allUsers: response.data.details.rows.filter(user => user.username !== localStorage.getItem("username")) });
        })
    }
    handleClose = () => {
        this.setState({
            newMessageFlag: false,
            searchText: "",
            searchList: []
        })
    }

    setCurrentMessager = (messages) => {
        if (messages.user1.username === localStorage.getItem("username")) {
            this.setState({
                messageSelected: true,
                currentMessage: messages,
                currentMessager: messages.user2.username,
                userImage: messages.user1.image,
                otherUserImage: messages.user2.image
            })
        } else {
            this.setState({
                messageSelected: true,
                currentMessage: messages,
                currentMessager: messages.user1.username,
                userImage: messages.user2.image,
                otherUserImage: messages.user1.image
            })
        }
    }

    selectMessage = (messages) => (event) => {
        this.setCurrentMessager(messages)
    }
    addDefaultSrc = (event) => {
        console.log("error")
        event.target.onError = null;
        event.target.src = `https://${config.imageurl}/profileAlias.jpeg`
    }

    sendMessage = () => {
        if (this.state.message.trim().length > 0) {
            let data = {
                message: this.state.message,
                sent: this.state.userProfile.username,
                senderId: this.state.userProfile.username,
                recieverId: this.state.currentMessager
            }
            console.log(data)
            axios({
                method: 'post',
                url: 'http://' + config.hostname + ':3001/messages/postMessages',
                data: data
            }).then(response => {
                console.log(response)
                axios({
                    method: 'get',
                    url: 'http://' + config.hostname + ':3001/messages/getMessages/' + localStorage.getItem("username"),
                }).then(response2 => {
                    console.log(response2)
                    console.log(response2.data.filter(message =>
                        (message.user1.username === this.state.currentMessager || message.user2.username === this.state.currentMessager)))
                    this.setState({ userMessageList: response2.data });
                    this.setState({
                        currentMessage: response2.data.filter(message =>
                            message.user1.username === this.state.currentMessager || message.user2.username === this.state.currentMessager)[0],
                        message: ""
                    })
                })
            })

        }
    }
    renderMessage = (message) => {
        if (message.sent === localStorage.getItem("username")) {
            return (
                <li key={message.time} className="pt-3" style={{
                    textAlign: "right",
                    paddingRight: "10px",
                    marginRight: "10px"
                }}>
                    <FormLabel style={{
                        backgroundColor: "rgba(29, 161, 242, 1)",
                        borderRadius: "25px",
                        padding: "5px"
                    }}>{message.message}</FormLabel>
                    <Image src={`https://${config.imageurl}/${this.state.userImage}`} style={{
                        height: "40px",
                        width: "40px",
                        marginLeft: "10px"
                    }} roundedCircle alt="" onError={this.addDefaultSrc}></Image>

                </li>
            )
        } else {
            return (
                <li key={message.time} className="pt-3">
                    <Image src={`https://${config.imageurl}/${this.state.otherUserImage}`} style={{
                        height: "40px",
                        width: "40px",
                        marginRight: "10px"
                    }} roundedCircle alt="" onError={this.addDefaultSrc}></Image>
                    <FormLabel style={{
                        backgroundColor: "rgb(230, 236, 240)",
                        borderRadius: "25px",
                        padding: "5px"
                    }}>{message.message}</FormLabel>
                </li>
            )
        }

    }
    selectUser = (user) => (event) => {
        console.log(user)
        let messageChain = this.state.userMessageList.filter(users =>
            users.user1.username === user.username || users.user2.username === user.username)[0]
        if (messageChain) {
            console.log("exists");
            this.handleClose();
            this.setCurrentMessager(messageChain);
        } else {
            console.log("not exists")
            let newMessageChain = {
                messages: [],
                user1: {
                    username: this.state.userProfile.username,
                    firstName: this.state.userProfile.firstName,
                    lastName: this.state.userProfile.lastName,
                    image: this.state.userProfile.profilePicture,
                    _id: this.state.userProfile._id
                },
                user2: {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.profilePicture,
                    _id: user._id
                },
                _id: "1234"
            }
            let list = this.state.userMessageList;
            list.push(newMessageChain);
            console.log(list);
            this.setState({
                userMessageList: list
            })
            this.handleClose();
            this.setCurrentMessager(newMessageChain);
        }
    }
    render() {
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home" },
            { label: 'Explore', link: '/explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope", active: true },
            { label: 'Bookmarks', link: '/Bookmarks', className: "fas fa-bookmark" },
            { label: 'Lists', link: '/List/'+localStorage.getItem('username'), className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/' + localStorage.getItem('username'), className: "fas fa-user-circle" },
            {label: 'Analytics', link: '/Analytics', className: "fas fa-poll" } ,
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" }
        ];
        let listMessages = this.state.userMessageList.map(messages => {
            return (
                <div>{(messages.user1.username === localStorage.getItem("username")) ? (
                    <div>
                        {(this.state.currentMessager === messages.user2.username) ? (
                            <div className="messageActive" onClick={this.selectMessage(messages)}>
                                <Image src={`https://${config.imageurl}/${messages.user2.image}`} style={{
                                    height: "40px",
                                    width: "40px"
                                }} roundedCircle alt="" onError={this.addDefaultSrc}></Image>
                                <b className="padLeft">{messages.user2.firstName}</b>
                                <b className="padLeft lightFont">@{messages.user2.username}</b>
                            </div>
                        ) : (
                                <div onClick={this.selectMessage(messages)}>
                                    <Image src={`https://${config.imageurl}/${messages.user2.image}`} style={{
                                        height: "40px",
                                        width: "40px"
                                    }} roundedCircle alt="" onError={this.addDefaultSrc}></Image>
                                    <b className="padLeft">{messages.user2.firstName}</b>
                                    <b className="padLeft lightFont">@{messages.user2.username}</b>
                                </div>
                            )}
                        <hr />
                    </div>
                ) : (
                        <div>
                            {(this.state.currentMessager === messages.user2.username) ? (
                                <div className="messageActive" onClick={this.selectMessage(messages)}>
                                    <Image src={`https://${config.imageurl}/${messages.user1.image}`} style={{
                                        height: "40px",
                                        width: "40px"
                                    }} roundedCircle alt="" onError={this.addDefaultSrc}></Image>
                                    <b className="padLeft">{messages.user1.firstName}</b>
                                    <b className="padLeft lightFont">@{messages.user1.username}</b>
                                </div>
                            ) : (
                                    <div onClick={this.selectMessage(messages)}>
                                        <Image src={`https://${config.imageurl}/${messages.user1.image}`} style={{
                                            height: "40px",
                                            width: "40px"
                                        }} roundedCircle alt="" onError={this.addDefaultSrc}></Image>
                                        <b className="padLeft">{messages.user1.firstName}</b>
                                        <b className="padLeft lightFont">@{messages.user1.username}</b>
                                    </div>
                                )}
                            <hr />
                        </div>
                    )}

                </div>)
        })
        const MessageDisplay = () => {
            console.log(this.state.currentMessage)
            if (this.state.currentMessage) {
                if (this.state.currentMessage.user2.username !== localStorage.getItem("username")) {
                    return (
                        <div className="pt-3 padLeft">
                            <h4 className="padLeft"><b>{this.state.currentMessage.user2.firstName}</b></h4>
                            <b className="padLeft lightFont">@{this.state.currentMessage.user2.username}</b>
                            <hr></hr>
                            <ul style={{
                                listStyle: "none",
                                verticalAlign: "bottom",
                                overflowY: "auto",
                                maxHeight: "600px"
                            }}>
                                {this.state.currentMessage.messages.map(message => {
                                    return this.renderMessage(message)
                                })}

                            </ul>
                        </div>)
                } else {
                    // return (<div className="pt-3 padLeft">
                    //     <h4 className="padLeft"><b>{this.state.currentMessage.user1.firstName}</b></h4>
                    //     <b className="padLeft lightFont">@{this.state.currentMessage.user1.username}</b>
                    //     <hr></hr>
                    // </div>)
                    return (
                        <div className="pt-3 padLeft">
                            <h4 className="padLeft"><b>{this.state.currentMessage.user1.firstName}</b></h4>
                            <b className="padLeft lightFont">@{this.state.currentMessage.user1.username}</b>
                            <hr></hr>
                            <ul style={{
                                listStyle: "none",
                                verticalAlign: "bottom",
                                overflowY: "auto",
                                maxHeight: "600px"
                            }}>
                                {this.state.currentMessage.messages.map(message => {
                                    return this.renderMessage(message)
                                })}

                            </ul>
                        </div>)
                }
            }
        }
        let currentMessageDisplay = (<div>
            <MessageDisplay />
            <InputGroup className="messageText">
                <FormControl name="message" onChange={this.handleChange} value={this.state.message}></FormControl>

                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon1" onClick={this.sendMessage}><i className="fas fa-greater-than"></i></InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        </div>)

        let serachDisplay = this.state.searchList.map(user => {
            return (
                <div className="searchPeople" onClick={this.selectUser(user)}>
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
                </div>
            )
        })
        return (
            <div>
                <Row style={{
                    overflowX: "hidden"
                }}>
                    <Col className="col-sm-3 fixed">
                        <LeftNav links={links} history={this.props.history} ></LeftNav>

                    </Col>
                    <Col className="col-sm-3 pt-3 fixed" >
                        <h4><b>Messages</b><i className="fas fa-edit float-right message" onClick={this.handleNewMessage} ></i></h4>
                        <hr></hr>
                        {listMessages}
                    </Col>
                    <Col className="col-sm-6" style={{
                        borderLeft: " 2px solid rgb(180, 177, 177)",
                        height: "100%",
                        width: "50%",
                        position: "fixed",
                        top: "0",
                        right: "0",
                        padding: "0"
                    }}>
                        {this.state.messageSelected ? (
                            <div>
                                {currentMessageDisplay}

                            </div>
                        ) : (
                                <div className="vertical-center" style={{ textAlign: "center" }}>
                                    <b>You don’t have a message selected</b>
                                    <p>Choose one from your existing messages, or start a new one.</p>
                                    <Button style={{ borderRadius: "25px", backgroundColor: "rgba(29, 161, 242, 1)" }}
                                        onClick={this.handleNewMessage}>New Message</Button>
                                </div>
                            )}

                    </Col>
                </Row>
                <Accordion className="btn-block" style={{ maxHeight: "28px" }}>
                    <Modal show={this.state.newMessageFlag} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{}}>

                            <Accordion.Toggle as={InputGroup}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><i className="fas fa-search"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name="searchText"
                                    placeholder="Search Twitter"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={this.handleChangePeople}
                                    value={this.state.searchText}
                                />
                            </Accordion.Toggle>
                            <Accordion.Collapse>

                                <div>{this.state.searchList.length > 0 ? (
                                    <div style={{
                                        maxHeight: "400px",
                                        overflowY: "auto"
                                    }}>
                                        {serachDisplay}
                                    </div>
                                ) : (<div style={{ width: "400px" }}>{this.state.searchText.length > 0 ? (
                                    <div>No users with search text</div>
                                ) : (
                                        <div>Try Searching for people and topics</div>
                                    )}</div>)}</div>
                            </Accordion.Collapse>

                        </Modal.Body>
                    </Modal>
                </Accordion>
            </div >
        )
    }
}

export default Messages;