import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BulletImage from "./images/bullet.svg";
import MapImage from "./images/map.svg";
import AskImage from "./images/ask.svg";
import ChatImage from "./images/chat.png";
import "./App.css";
import CommonHeader from "./components/header";
import Sidebar from "./components/sidebar";
import HotBullet from "./components/main";
import AdsArea from "./components/advertisement";
import Hamburger from "./images/hamburger.png";
import Map from "./components/map";
import getId from "./components/utils/get-id";
import { useRecoilValue, useSetRecoilState } from "recoil";
import globalAtom from "./loginState";
import { useHistory } from "react-router";

const StyledHamburger = styled.img`
  position: fixed;
  padding: 10px;
  margin: 20px;
  margin-top: 85vh;
  margin-left: 76vw;
  padding-height: 60px;
  background-color: white;
  border-radius: 50px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  box-shadow: 2px 5px 5px rgb(0 0 0 / 50%);
  z-index: 3;
`;

const ButtonsContainer = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-evenly;
`;

const StyledMenu = styled.img`
  width: 36px;
  height: 36px;
  margin: 20px;
  cursor: pointer;
`;

function App() {
  const [SidebarState, toggleSidebarState] = useState("none");
  const setLoginInfo = useSetRecoilState(globalAtom.user);
  const loginInfo = useRecoilValue(globalAtom.user);
  const history = useHistory();

  useEffect(() => {
    async function fetchDate() {
      if (loginInfo.isLogin === false) {
        const result = await getId();
        setLoginInfo(result);
      }
    }
    fetchDate();
  }, []);

  const toggle = () => {
    if (SidebarState === "none") {
      toggleSidebarState("flex");
    } else toggleSidebarState("none");
  };

  const RoutePage = async (url) => {
    const loginData = await getId();
    if (loginData.isLogin === false && (url === "map" || url === "chat-list")) alert("로그인 해주세요.");
    else history.push("/" + url);
  };

  return (
    <div className="App">
      <StyledHamburger src={Hamburger} onClick={toggle} />
      <CommonHeader />
      <ButtonsContainer>
        <StyledMenu
          src={BulletImage}
          onClick={() => {
            RoutePage("bulletin");
          }}
        ></StyledMenu>
        <StyledMenu
          src={AskImage}
          onClick={() => {
            RoutePage("quest");
          }}
        ></StyledMenu>
        <StyledMenu
          src={ChatImage}
          onClick={() => {
            RoutePage("chat-list");
          }}
        ></StyledMenu>
      </ButtonsContainer>
      <Sidebar displayType={SidebarState} toggle={toggleSidebarState} />
      <AdsArea />
      <Map />
      {/* <HotBullet /> */}
    </div>
  );
}

export default App;
