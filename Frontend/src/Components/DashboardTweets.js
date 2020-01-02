import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap'
import axios from "axios";
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { getDashboardTweets } from '../JS/Actions/tweetAction.js';
import ReplyModal from './ReplyModal';
import TweetModal from './TweetModal';
import TweetComponent from './TweetComponent.js';
import Pagination from 'react-bootstrap/Pagination'
const settings = require("../Config/settings.js");

const { getUserName, getPageSize } = require('./tweetApis.js');

export class DashboardTweets extends Component {
    componentDidMount() {
        this.reqForDashboardTweets();
    }

    reqForDashboardTweets() {
        let postURL = "http://" + settings.hostname + ":" + settings.port + "/getDashboardTweets";
        //TODO :get userId from local storage
        //TODO :or get followers list from local storage and send it
        let username = getUserName();
        let pageSize = getPageSize();
        let pageNum = this.props.pageNum;
        let data = { username, pageNum, pageSize };
        let dataObj = { data, url: postURL };
        axios.defaults.withCredentials = true;
        this.props.getDashboardTweets(dataObj);
    }
    renderPagination() {
        debugger;
        /* <Pagination.Item  >
                                next
                        </Pagination.Item>*/
        if (this.props.dashboardTweets && this.props.dashboardTweets.length > 0) {
            return (
                <div className='offset-md-11'>
                    <button className="btn btn-primary btn-circle" onClick={() => { this.reqForDashboardTweets() }} > <i class="fas fa-angle-double-right"></i> </button>


                </div>);
        } else {
            return <div></div>;
        }
    }
    renderTweets() {
        let allTweets = this.props.dashboardTweets;
        let tweetsMarkup = [];
        if(allTweets && allTweets.length > 0){
            let i=0;
            for( i= 0; i< allTweets.length; i++){
             tweetsMarkup.push(<TweetComponent key={i} tweet = { allTweets[i] } calledFrom = 'dashboard'/>);
            }
            tweetsMarkup.push(<ReplyModal key={i + 1} />)
            tweetsMarkup.push(<TweetModal key={i + 2} />)
            return tweetsMarkup;
        } else {
            return <div></div>;
        }
    }
    render() {
        return (
            <div>
                {this.renderTweets()}
                {this.renderPagination()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        dashboardTweets: state.tweetReducer.dashboardTweets,
        pageNum: state.tweetReducer.pageNum
    }
}
//export default SignupBuyer;
const mapDispatchToProps = function (dispatch) {
    return {
        getDashboardTweets: (dataObj) => dispatch(getDashboardTweets(dataObj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardTweets);