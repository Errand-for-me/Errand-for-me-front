import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import CommonHeader from "./components/header";
import Sidebar from "./components/sidebar";
import AdsArea from "./components/advertisement";
import Map from "./components/map";
import NavBar from "./components/nav-bar";
import getId from "./components/utils/get-id";
import Modal from "./components/utils/modal/modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import globalAtom from "./loginState";
import BeneathNavBarContainer from "./components/utils/beneath-nav-bar-template";

function App() {
  const [SidebarState, toggleSidebarState] = useState("none");
  const setLoginInfo = useSetRecoilState(globalAtom.user);
  const loginInfo = useRecoilValue(globalAtom.user);

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

  return (
    <div className="App">
      <Modal />
      <CommonHeader isMainPage={true} toggle={toggle} />
      <NavBar />
      <BeneathNavBarContainer>
        <Sidebar displayType={SidebarState} toggle={toggleSidebarState} />
        <AdsArea />
        <Map />
      </BeneathNavBarContainer>
    </div>
  );
}

export default App;
