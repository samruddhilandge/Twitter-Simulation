import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import DashboardTweets from "./DashboardTweets.js";
import "../CSS/tweetArea.css";

const settings = require("../Config/settings.js");
var faker = require("faker");
const {
  getUserFullName,
  getUserName,
  TWEETCHARLIMIT
} = require("./tweetApis.js");

export class TweetContent extends Component {
  state = {
    tweetData: {},
    tweetText: "",
    tweetImages: [],
    reloadFlag:false
  };
  constructor(props) {
    super(props);
  }

  /*generateFakeData = () => {
        let postURL = "http://"+settings.hostname+":"+settings.port+"/writeATweet"; 
        for(let i=0; i< 1000; i++){
            let fakeNumber = faker.random.number({'min':1, 'max':10});
            let fakeUserId = faker.random.number({'min':1, 'max':10000});
            let fakeText = faker.random.words(fakeNumber);
            let data = {userId : fakeUserId, tweetText :fakeText};
            if(fakeText){
                //console.log(fakeText);
                axios({
                    method: 'post',
                    url: postURL,        
                    data: data,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } },
                    //headers: {"Authorization" : `Bearer ${token}`} 
                })
                    .then((response) => {
                        if (response.status >= 500) {
                            throw new Error("Bad response from server");
                        }
                        return response.data;
                    })
                    .then((responseData) => {
                        console.log(responseData.message);
                        
                    }).catch(function (err) {
                        console.log(err)
                    });
            }
                
        }
    };*/

  writeATweet = evt => {
    //TODO :get userId from local storage
    // let data = {userId : 123, tweetText :tweetObj.tweetText};
    debugger;
    evt.preventDefault();
    let { tweetText, tweetImages } = this.state;
    let form_data = new FormData();
    // let form_data = new FormData(evt.target);
    let username = getUserName();
    let userFullName = getUserFullName();
    form_data.set("userFullName", userFullName);
    form_data.set("username", username);
    //ADD LATER
    //TODO: add profile pic as well. take it from local storage
    form_data.append("tweetImages", tweetImages);
    form_data.set("tweetText", tweetText);
    let postURL =
      "http://" + settings.hostname + ":" + settings.port + "/writeATweet";
    axios.defaults.withCredentials = true;
    axios({
      method: "post",
      url: postURL,
      data: form_data,
      config: { headers: { "Content-Type": "multipart/form-data" } }
      //headers: {"Authorization" : `Bearer ${token}`}
    })
      .then(response => {
        if (response.status >= 500) {
          throw new Error("Bad response from server");
        }
        return response.data;
      })
      .then(responseData => {
        //swal(responseData.message);
        this.setState({
          tweetText: ""
        });
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({
      tweetImages: "",
      reloadFlag: true
    });
  };

  submitHandler = evt => {
    evt.preventDefault();
    let target = evt.target;
    var formData = new FormData(evt.target);
    let tweetObj = { tweetText: formData.get("tweetText") };

    this.writeATweet(tweetObj);
  };

  onFileChange(files) {
    debugger;
    if (files == null || files.length == 0) return;
    let file = files[0];
    // let tweetImages = this.state.tweetImages;
    //tweetImages.push(file);
    this.setState({
      tweetImages: file,
      imageName: file.name
    });
    /* let userId = '123';
         let tweetText = 'sample';
         const data = new FormData();
         data.append("tweetimage", file, file.name);
         data.set('userId', userId);
         //ADD LATER
         //data.append('tweetImages', tweetImages);
         data.set('tweetText',tweetText);
         let postURL = "http://"+settings.hostname+":"+settings.port+"/writeATweet";
         axios.defaults.withCredentials = true;
         axios({
             method: 'post',
             url: postURL,
             data: data,
             config: { headers: { 'Content-Type': 'multipart/form-data' } },
             //headers: {"Authorization" : `Bearer ${token}`} 
         })
             .then((response) => {
                 if (response.status >= 500) {
                     throw new Error("Bad response from server");
                 }
                 return response.data;
             })
             .then((responseData) => {
                 swal(responseData.message);
 
             }).catch(function (err) {
                 console.log(err)
             });*/
  }

  tweetTextHandler(target) {
    let tweetText = target.value;
    this.setState({
      tweetText
    });
  }

  render() {
    let ReloadPage = null;
    if (this.state.reloadFlag) {
      ReloadPage = window.location.reload();
    }
    /*
        <div>
                <Button onClick = {this.getUserTweets}>Get Tweets</Button>
                <Button onClick = {this.generateFakeData}>generateFakeData</Button>
            </div>
        */
    return (
      <div>
        {ReloadPage}
        <div className="space">
          <div>
            <form className="tweetWrite" onSubmit={this.writeATweet}>
              <textarea
                id="tweetArea"
                name="tweetText"
                onChange={e => this.tweetTextHandler(e.target)}
                className="form-control"
                rows="4"
                style={{ borderColor: "white", fontSize: "21px" }}
                placeholder="What's happening?"
                autoFocus
                value={this.state.tweetText}
                maxLength={TWEETCHARLIMIT}
              ></textarea>

              <Row>
                <Col xs={1}>
                  <div className="image-upload">
                    <label for="input-file">
                      <i id="image" className="far fa-image fa-2x"></i>
                    </label>
                    <input
                      id="input-file"
                      className="hidden"
                      type="file"
                      onChange={e => this.onFileChange(e.target.files)}
                    />
                    <span>{this.state.imageName}</span>
                  </div>
                </Col>

                <Col className="offset-md-10" xs={1}>
                  <button
                    className="btn btn-primary btn-circle"
                    type="submit"
                    style={{
                      position: "absolute",
                      right: "60px",
                      fontWeight: "bold"
                    }}
                  >
                    Tweet
                  </button>
                </Col>
              </Row>
            </form>
            <div style={{ backgroundColor: "#8080801c" }}>
              <br />
            </div>
            <DashboardTweets />
          </div>
        </div>
      </div>
    );
  }
}

export default TweetContent;
