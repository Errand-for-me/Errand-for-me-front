import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import "./index.css";
import App from "./App";
import Map from "./components/map";
import { Board } from "./components/board";
import Bullet from "./components/bullet";
import BulletinWrite from "./components/bulletin-write";
import Quest from "./components/quest";
import QuestWrite from "./components/quest-write";
import SignInPage from "./components/sign-in";
import SignUpPage from "./components/sign-up";
import SignUpGooglePage from "./components/sign-up-google";
import ChatList from "./components/chat-list";
import ChatRoom from "./components/chat-room";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Route exact path="/bulletin" component={Board} />
        <Route exact path="/bulletins/:id" component={Bullet} />
        <Route exact path="/bulletin/write" component={BulletinWrite} />
        <Route exact path="/quest" component={Quest} />
        <Route exact path="/quest/write" component={QuestWrite} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/sign-up" component={SignUpPage} />
        <Route exact path="/sign-in" component={SignInPage} />
        <Route exact path="/sign-up-google" component={SignUpGooglePage} />
        <Route exact path="/chat-list" component={ChatList} />
        <Route exact path="/chat-room" component={ChatRoom} />
        <Route exact path="/" component={App} />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
