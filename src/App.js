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
      {/* <StyledHamburger src={Hamburger} onClick={toggle} /> */}
      <CommonHeader isMainPage={true} toggle={toggle} />
      <NavBar />
      <Sidebar displayType={SidebarState} toggle={toggleSidebarState} />
      <AdsArea />
      <Map />
    </div>
  );
}

export default App;
