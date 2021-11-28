import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import globalAtom from "../../loginState";
import NavBar from "../nav-bar";
import CommonHeader from "../header";
import QuestList from "./quest-list";
import Modal from "../utils/modal/modal";
import AdsArea from "../advertisement";
import BeneathNavBarContainer from "../utils/beneath-nav-bar-template";

const HotBulletinContainer = styled.div`
  width: 90vw;
  text-align: center;
  margin: auto;
  margin-top: 20px;
  padding-top: 10px;
`;

const HotBulletinHeader = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const StyledPlus = styled.div`
  font-family: "one_mobile";
  color: #fd8f00;
  position: fixed;
  padding: 10px;
  margin: 20px;
  margin-top: 17vh;
  margin-left: 71vw;
  border: solid 3px #fd8f00;
  border-radius: 20px;
  padding-height: 60px;
  background-color: white;
  width: 60px;
  height: 17px;
  text-align: center;
  cursor: pointer;
  z-index: 2;
`;

function Quest() {
  const history = useHistory();
  const loginInfo = useRecoilValue(globalAtom.user);
  const setLoginInfo = useSetRecoilState(globalAtom.user);

  const WritePage = async () => {
    if (loginInfo.isLogin === false) {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/isLogin`, {
        method: "GET",
        headers: {
          "Conent-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await result.json();
      if (data.name === null) {
        document.body.style.overflow = "hidden";
        const modal = document.querySelector("#modal");
        modal.style.display = "flex";
      } else {
        setLoginInfo({ isLogin: true, nickname: data.nickname });
        history.push("/quest/write");
      }
    } else {
      history.push("/quest/write");
    }
  };

  const [questList, setQuest] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/quest`, {
        mode: "cors",
      });

      const data = await result.json();
      setQuest(data);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Modal />
      <StyledPlus onClick={WritePage}>등록하기</StyledPlus>
      <CommonHeader />
      <NavBar menu="quest" />
      <BeneathNavBarContainer>
        <HotBulletinContainer>
          <HotBulletinHeader>심부름 찾기</HotBulletinHeader>
        </HotBulletinContainer>
        <AdsArea />
        <QuestList data={questList} />
      </BeneathNavBarContainer>
    </div>
  );
}

export default Quest;
