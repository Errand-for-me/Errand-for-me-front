import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import NavBar from "../nav-bar";

import CommonHeader from "../header";
import BulletList from "./bullet-list";
import AdsArea from "../advertisement";
import globalAtom from "../../loginState";
import PlusImg from "../../images/plus.svg";
import Modal from "../utils/modal/modal";

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

const StyledPlus = styled.img`
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
      <StyledPlus src={PlusImg} onClick={WritePage} />
      <CommonHeader />
      <NavBar menu="bulletin" />
      <HotBulletinContainer>
        <HotBulletinHeader>전체 게시판</HotBulletinHeader>
        <AdsArea />
        <BulletList data={bulletList} />
      </HotBulletinContainer>
      <div></div>
    </div>
  );
}

export { Board };
