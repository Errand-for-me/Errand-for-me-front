import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import NavBar from "../nav-bar";

import CommonHeader from "../header";
import BulletList from "./bullet-list";
import AdsArea from "../advertisement";
import globalAtom from "../../loginState";
import Modal from "../utils/modal/modal";
import BeneathNavBarContainer from "../utils/beneath-nav-bar-template";

const HotBulletinContainer = styled.div`
  width: 100vw;
  margin: auto;
  margin-top: 20px;
`;

const HotBulletinHeader = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
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

function Board() {
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
        const modal = document.querySelector("#modal");
        modal.style.display = "flex";
      } else {
        setLoginInfo({ isLogin: true, nickname: data.nickname });
        history.push("/bulletin/write");
      }
    } else {
      history.push("/bulletin/write");
    }
  };

  const [bulletList, setBoard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/board`, {
        mode: "cors",
      });

      const data = await result.json();
      setBoard(data);
    }

    fetchData();
  }, []);

  return (
    <div className="bullet-board">
      <Modal />
      <StyledPlus onClick={WritePage}>글 쓰기</StyledPlus>
      <CommonHeader />
      <NavBar menu="bulletin" />
      <BeneathNavBarContainer>
        <HotBulletinContainer>
          <HotBulletinHeader>전체 게시판</HotBulletinHeader>
          <AdsArea />
          <BulletList data={bulletList} />
        </HotBulletinContainer>
      </BeneathNavBarContainer>
    </div>
  );
}

export { Board };
