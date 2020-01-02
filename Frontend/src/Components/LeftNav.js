import React, { Component } from "react";
import "../CSS/navbar.css"
import Dropdown from 'react-bootstrap/Dropdown'
import config from '../Config/settings'
import axios from 'axios';


class LeftNav extends Component {
    constructor(props) {
        super(props)
    }

    logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        this.props.history.push("/");
    }
    render() {
        let linksMarkup = this.props.links.map((link, index) => {
            let linkMarkup = link.active ? (
                <a className="side-link active" href={link.link}>
                    <span className={link.className} style={{ marginRight: "10px" }} ></span>
                    <span><b>{link.label}</b></span>
                </a>
            ) : (
                    <a className="side-link" href={link.link}>
                        <span className={link.className} style={{ marginRight: "10px" }} ></span>
                        <span><b>{link.label}</b></span>
                    </a>
                );

            return (
                link.active ? (<li key={index} className="navbar-side-item active">
                    {linkMarkup}
                </li>) : (<li key={index} className="navbar-side-item">
                    {linkMarkup}
                </li>)
            );
        });
        return (
            <div className="navbar-side" id="navbarSide" >
                <li className="navbar-side-item">
                    <a style={{
                        paddingLeft: "2rem"
                    }} href="/home">
                        <span className="fab fa-twitter" style={{
                            marginRight: "10px",
                            fontSize: "2rem",
                            color: "rgba(29,161,242,1.00)"
                        }}></span>
                    </a>
                </li>

                {linksMarkup}
                <li className="navbar-side-item">
                    <a className="side-link" onClick={this.logout.bind(this)}>
                        <span className="fa fa-sign-out" style={{ marginRight: "10px" }} ></span>
                        <span><b>Logout</b></span>
                    </a>
                </li>
                <button data-toggle="modal" data-target="#navTweetModal" className="btn btn-primary nav-btn-circle" type="submit" style={{position:'absolute',  left:'60px',fontWeight:"bold"   }}>Tweet</button><br/><br/><br/>
            </div >
        )
    }
}

export default LeftNav;