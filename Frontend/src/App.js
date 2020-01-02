import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home"
import Signup from "./Components/LandingPage/Signup"
import LandingPage from './Components/LandingPage/LandingPage'
import Explore from './Components/Explore';
import Messages from './Components/Messages';
import UserProfile from './Components/UserProfile/UserProfile'
import Deactivate from './Components/DeactivateAccount';
import Delete from './Components/DeleteAccount'

import UserDetails from './Components/UserDetails';
import List from './Components/MyList';
import ListSpecific from './Components/ListSpecific';
import ListInfo from './Components/ListInfo';
import Bookmarks from './Components/BookmarkMain';
import TweetDisplay from './Components/TweetDisplay';
import Analytics from './Components/Analytics';
import Follow from './Components/UserProfile/Follow'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/Signup" component={Signup}></Route>
          <Route exact path="/Explore" component={Explore}></Route>

          <Route exact path="/profile/:username" component={UserProfile}></Route>
          <Route exact path="/deactivate" component={Deactivate}></Route>
          <Route exact path="/delete" component={Delete}></Route>

          <Route exact path="/userDetailsPage/:username" component={UserDetails}></Route>
          <Route path='/tweet/:tweetId' component={TweetDisplay}></Route>
          <Route exact path="/List/:username" component={List}></Route>
          <Route path="/ListSpecific" component={ListSpecific}></Route>
          <Route path="/ListInfo" component={ListInfo}></Route>
          <Route path="/Messages" component={Messages}></Route>
          <Route path="/Bookmarks" component={Bookmarks}></Route>

          <Route exact path="/follow" component={Follow}></Route>
          <Route path="/Analytics" component={Analytics}></Route>
          

        </Switch>
      </Router>

    );
  }
}

export default App;