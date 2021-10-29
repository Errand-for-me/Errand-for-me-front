import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from "react-router-dom"
import './index.css';
import App from './App';
import Map from './components/map';
import BulletinBoard from './components/bulletin';
import Quest from './components/quest';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/bulletin" component={BulletinBoard} />
      <Route path="/quest" component={Quest} />
      <Route path="/map" component={Map} />
      <Route exact path="/" component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
