import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import Map from "./components/map";
import { Board } from "./components/board";
import BulletinWrite from "./components/bulletin-write";
import Quest from "./components/quest";
import QuestWrite from "./components/quest-write";
import SignInPage from "./components/sign-in";
import SignUpPage from "./components/sign-up";
import SignUpGooglePage from "./components/sign-up-google";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/bulletin" component={Board} />
      <Route exact path="/bulletin/write" component={BulletinWrite} />
      <Route exact path="/quest" component={Quest} />
      <Route exact path="/quest/write" component={QuestWrite} />
      <Route exact path="/map" component={Map} />
      <Route exact path="/sign-up" component={SignUpPage} />
      <Route exact path="/sign-in" component={SignInPage} />
      <Route exact path="/sign-up-google" component={SignUpGooglePage} />
      <Route exact path="/" component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
